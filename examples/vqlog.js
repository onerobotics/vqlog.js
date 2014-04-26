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
  this.event   = Event.fromMessage(message);
}

Entry.fromString = function(string) {
  var commaPosition = string.indexOf(",");
  var tick = parseInt(string.substring(0, commaPosition));
  var message = string.substring(commaPosition+2, string.length);

  return new Entry(tick, message);
}

Entry.prototype.timeSince = function(tick) {
  return utilities.timeInterval(tick, this.tick);
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

Event.fromMessage = function(message) {
  var event;
  Event.CLASSES.some(function(klass) {
    if ( message.match(klass.REGEX) ) {
      event = klass.fromMessage(message);
      return true;
    }
  });

  if ( event ) return event;
  if ( message.length == 0 ) return null;

  throw new Error("Unrecognized event with message: " + message);
}

module.exports = Event;

},{"./events/acknowledgement":5,"./events/addition":6,"./events/allocation":7,"./events/load_balance":8,"./events/overlap":9,"./events/request":10,"./events/skip":11,"./events/timeout":12}],5:[function(require,module,exports){
function Acknowledgement(areaId, workId, trayId, modelId, ack) {
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
  this.ack = parseInt(ack);
}

Acknowledgement.REGEX = /Receive ACKQUE, area (\d+), work_id (\d+), tray (\d+), model_id (\d+), ack (\d+)/

Acknowledgement.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Acknowledgement.REGEX) ) {
    return new Acknowledgement(matches[1],matches[2],matches[3],matches[4],matches[5]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Acknowledgement;

},{}],6:[function(require,module,exports){
function Addition(areaId, workId, trayId, modelId) {
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
}

Addition.REGEX = /Put a part to queue, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Addition.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Addition.REGEX) ) {
    return new Addition(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Addition;

},{}],7:[function(require,module,exports){
function Allocation(areaId, workId, trayId, modelId) {
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
}

Allocation.REGEX = /Part is allocated, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Allocation.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Allocation.REGEX) ) {
    return new Allocation(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Allocation;

},{}],8:[function(require,module,exports){
function LoadBalance(areaId, modelId, npickedNum, npickedDen, n2pickNum, n2pickDen) {
  this.areaId = parseInt(areaId);
  this.modelId = parseInt(modelId);
  this.npickedNum = parseInt(npickedNum);
  this.npickedDen = parseInt(npickedDen);
  this.n2pickNum = parseInt(n2pickNum);
  this.n2pickDen = parseInt(n2pickDen);
}

LoadBalance.REGEX = /Load-balance, area (\d+), model_id (\d+), npicked (\d+)\/(\d+), n2pick (\d+)\/(\d+)/

LoadBalance.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(LoadBalance.REGEX) ) {
    return new LoadBalance(matches[1],matches[2],matches[3],matches[4],matches[5],matches[6]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = LoadBalance;

},{}],9:[function(require,module,exports){
function Overlap(areaId, workId, trayId, modelId) {
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
}

Overlap.REGEX = /Part is overlapped, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Overlap.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Overlap.REGEX) ) {
    return new Overlap(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Overlap;

},{}],10:[function(require,module,exports){
function Request(areaId, timeout, consec, modelId, workId) {
  this.areaId = parseInt(areaId);
  this.timeout = parseInt(timeout);
  this.consec = parseInt(consec);
  this.modelId = parseInt(modelId);
  this.workId = parseInt(workId);
}

Request.REGEX = /Receive GETQUE, area (\d+), timeout (\d+), consec (\d+), model_id (\d+|\*+), work_id (\d+|\*+)/

Request.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Request.REGEX) ) {
    return new Request(matches[1],matches[2],matches[3],matches[4],matches[5]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Request;

},{}],11:[function(require,module,exports){
function Skip(areaId, workId, trayId, modelId) {
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
}

Skip.REGEX = /Part is skipped \(npicked > n2pick\), area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Skip.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Skip.REGEX) ) {
    return new Skip(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Skip;

},{}],12:[function(require,module,exports){
function Timeout(areaId) {
  this.areaId = parseInt(areaId);
}

Timeout.REGEX = /Get_queue timeout, area (\d+)/

Timeout.fromMessage = function(message) {
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

},{"./entry":3,"./utilities":14,"fs":15}],14:[function(require,module,exports){
function utilities() {
}

utilities.timeInterval = function(startTick, endTick) {
  return (endTick - startTick) * 2.0 / 1000;
}

module.exports = utilities;

},{}],15:[function(require,module,exports){

},{}]},{},[1])