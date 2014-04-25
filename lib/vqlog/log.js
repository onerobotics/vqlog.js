var utilities = require('./utilities'),
    fs = require('fs'),
    Entry = require('./entry');

function Log() {
  this.entries = [];
  this._start_tick = null;
  this._end_tick = null;

  this.add_entry = function(entry) {
    this.entries.push(entry);
  }

  this.start_tick = function() {
    this._start_tick = this._start_tick || this.entries[0].tick;
    return this._start_tick;
  }

  this.end_tick = function() {
    this._end_tick = this._end_tick || this.entries[this.entries.length-1].tick;
    return this._end_tick;
  }
}

Log.from_string = function(string) {
  var log = new Log();
  var entry;

  var lines = string.split(/\n/);
  lines.forEach(function(line) {
    if (line.length > 0) {
      log.add_entry(Entry.from_string(line));
    }
  });

  return log;
}

Log.from_path = function(path) {
  var data = fs.readFileSync(path).toString();
  return Log.from_string(data);
}

Log.prototype.duration = function() {
  return utilities.time_interval(this.start_tick(), this.end_tick());
}

Log.prototype.entries_by_event_type = function(type) {
  return this.entries.filter(function(entry) { return entry.event.constructor.name === type });
}

Log.prototype.entries_by_area_id = function(area_id) {
  return this.entries.filter(function(entry) { return entry.event.area_id === area_id });
}

Log.prototype.entries_by_work_id = function(work_id) {
  return this.entries.filter(function(entry) { return entry.event.work_id == work_id; });
}

Log.prototype.time_until = function(entry) {
  return utilities.time_interval(this.start_tick(), entry.tick);
}

module.exports = Log;
