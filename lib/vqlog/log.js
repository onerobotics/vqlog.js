var utilities = require('./utilities'),
    fs = require('fs'),
    Entry = require('./entry');

function Log() {
  this.entries = [];
  this._startTick = null;
  this._endTick = null;

  this.addEntry = function(entry) {
    this.entries.push(entry);
  }

  this.startTick = function() {
    this._startTick = this._startTick || this.entries[0].tick;
    return this._startTick;
  }

  this.endTick = function() {
    this._endTick = this._endTick || this.entries[this.entries.length-1].tick;
    return this._endTick;
  }
}

Log.fromString = function(string) {
  var log = new Log();
  var entry;

  var lines = string.split(/\n/);
  lines.forEach(function(line) {
    if (line.length > 0) {
      log.addEntry(Entry.fromString(line));
    }
  });

  return log;
}

Log.fromPath = function(path) {
  var data = fs.readFileSync(path).toString();
  return Log.fromString(data);
}

Log.prototype.duration = function() {
  return utilities.timeInterval(this.startTick(), this.endTick());
}

Log.prototype.entriesByEventType = function(type) {
  return this.entries.filter(function(entry) { return entry.event.constructor.name === type });
}

Log.prototype.entriesByAreaId = function(areaId) {
  return this.entries.filter(function(entry) { return entry.event.areaId === areaId });
}

Log.prototype.entriesByWorkId = function(workId) {
  return this.entries.filter(function(entry) { return entry.event.workId == workId; });
}

Log.prototype.timeUntil = function(entry) {
  return utilities.timeInterval(this.startTick(), entry.tick);
}

module.exports = Log;
