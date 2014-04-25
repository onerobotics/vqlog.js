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
