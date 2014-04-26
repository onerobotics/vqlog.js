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
