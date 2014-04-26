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
