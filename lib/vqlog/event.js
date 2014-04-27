var Acknowledgement = require('./events/acknowledgement'),
    Addition = require('./events/addition'),
    Allocation = require('./events/allocation'),
    Clear = require('./events/clear'),
    LoadBalance = require('./events/load_balance'),
    Overlap = require('./events/overlap'),
    Request = require('./events/request'),
    SetLBD = require('./events/set_lbd'),
    Skip = require('./events/skip'),
    Timeout = require('./events/timeout');

function Event() {
}

Event.CLASSES = [
  Acknowledgement,
  Addition,
  Allocation,
  Clear,
  LoadBalance,
  Overlap,
  Request,
  SetLBD,
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
