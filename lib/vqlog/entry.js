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
