(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
vqlog = require('./vqlog');

},{"./vqlog":2}],2:[function(require,module,exports){
var Log = require('./vqlog/log');

module.exports = Log;

},{"./vqlog/log":13}],3:[function(require,module,exports){
var Event = require('./event'),
    utilities = require('./utilities');

function Entry(tick, message) {
  this.tick    = tick;
  this.message = message;
  this.event   = Event.from_message(message);
}

Entry.from_string = function(string) {
  var comma_position = string.indexOf(",");
  var tick = parseInt(string.substring(0, comma_position));
  var message = string.substring(comma_position+2, string.length);

  return new Entry(tick, message);
}

Entry.prototype.time_since = function(tick) {
  return utilities.time_interval(tick, this.tick);
}

module.exports = Entry;

},{"./event":4,"./utilities":14}],4:[function(require,module,exports){
var Acknowledgement = require('./events/acknowledgement'),
    Addition = require('./events/addition'),
    Allocation = require('./events/allocation'),
    LoadBalance = require('./events/load_balance'),
    Overlap = require('./events/overlap'),
    Request = require('./events/request'),
    Skip = require('./events/skip'),
    Timeout = require('./events/timeout');

function Event() {
}

Event.CLASSES = [
  Acknowledgement,
  Addition,
  Allocation,
  LoadBalance,
  Overlap,
  Request,
  Skip,
  Timeout
];

Event.from_message = function(message) {
  var event;
  Event.CLASSES.some(function(klass) {
    if ( message.match(klass.REGEX) ) {
      event = klass.from_message(message);
      return true;
    }
  });

  if ( event ) return event;
  if ( message.length == 0 ) return null;

  throw new Error("Unrecognized event with message: " + message);
}

module.exports = Event;

},{"./events/acknowledgement":5,"./events/addition":6,"./events/allocation":7,"./events/load_balance":8,"./events/overlap":9,"./events/request":10,"./events/skip":11,"./events/timeout":12}],5:[function(require,module,exports){
function Acknowledgement(area_id, work_id, tray_id, model_id, ack) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
  this.ack = parseInt(ack);
}

Acknowledgement.REGEX = /Receive ACKQUE, area (\d+), work_id (\d+), tray (\d+), model_id (\d+), ack (\d+)/

Acknowledgement.from_message = function(message) {
  var matches;
  if ( matches = message.match(Acknowledgement.REGEX) ) {
    return new Acknowledgement(matches[1],matches[2],matches[3],matches[4],matches[5]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Acknowledgement;

},{}],6:[function(require,module,exports){
function Addition(area_id, work_id, tray_id, model_id) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
}

Addition.REGEX = /Put a part to queue, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Addition.from_message = function(message) {
  var matches;
  if ( matches = message.match(Addition.REGEX) ) {
    return new Addition(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Addition;

},{}],7:[function(require,module,exports){
function Allocation(area_id, work_id, tray_id, model_id) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
}

Allocation.REGEX = /Part is allocated, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Allocation.from_message = function(message) {
  var matches;
  if ( matches = message.match(Allocation.REGEX) ) {
    return new Allocation(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Allocation;

},{}],8:[function(require,module,exports){
function LoadBalance(area_id, model_id, npicked_num, npicked_den, n2pick_num, n2pick_den) {
  this.area_id = parseInt(area_id);
  this.model_id = parseInt(model_id);
  this.npicked_num = parseInt(npicked_num);
  this.npicked_den = parseInt(npicked_den);
  this.n2pick_num = parseInt(n2pick_num);
  this.n2pick_den = parseInt(n2pick_den);
}

LoadBalance.REGEX = /Load-balance, area (\d+), model_id (\d+), npicked (\d+)\/(\d+), n2pick (\d+)\/(\d+)/

LoadBalance.from_message = function(message) {
  var matches;
  if ( matches = message.match(LoadBalance.REGEX) ) {
    return new LoadBalance(matches[1],matches[2],matches[3],matches[4],matches[5],matches[6]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = LoadBalance;

},{}],9:[function(require,module,exports){
function Overlap(area_id, work_id, tray_id, model_id) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
}

Overlap.REGEX = /Part is overlapped, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Overlap.from_message = function(message) {
  var matches;
  if ( matches = message.match(Overlap.REGEX) ) {
    return new Overlap(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Overlap;

},{}],10:[function(require,module,exports){
function Request(area_id, timeout, consec, model_id, work_id) {
  this.area_id = parseInt(area_id);
  this.timeout = parseInt(timeout);
  this.consec = parseInt(consec);
  this.model_id = parseInt(model_id);
  this.work_id = parseInt(work_id);
}

Request.REGEX = /Receive GETQUE, area (\d+), timeout (\d+), consec (\d+), model_id (\d+|\*+), work_id (\d+|\*+)/

Request.from_message = function(message) {
  var matches;
  if ( matches = message.match(Request.REGEX) ) {
    return new Request(matches[1],matches[2],matches[3],matches[4],matches[5]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Request;

},{}],11:[function(require,module,exports){
function Skip(area_id, work_id, tray_id, model_id) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
}

Skip.REGEX = /Part is skipped \(npicked > n2pick\), area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Skip.from_message = function(message) {
  var matches;
  if ( matches = message.match(Skip.REGEX) ) {
    return new Skip(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Skip;

},{}],12:[function(require,module,exports){
function Timeout(area_id) {
  this.area_id = parseInt(area_id);
}

Timeout.REGEX = /Get_queue timeout, area (\d+)/

Timeout.from_message = function(message) {
  var matches;
  if ( matches = message.match(Timeout.REGEX) ) {
    return new Timeout(matches[1]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Timeout;

},{}],13:[function(require,module,exports){
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

},{"./entry":3,"./utilities":14,"fs":15}],14:[function(require,module,exports){
function utilities() {
}

utilities.time_interval = function(start_tick, end_tick) {
  return (end_tick - start_tick) * 2.0 / 1000;
}

module.exports = utilities;

},{}],15:[function(require,module,exports){

},{}]},{},[1])