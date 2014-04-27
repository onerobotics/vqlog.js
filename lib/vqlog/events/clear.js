function Clear(areaId, npicked_num, npicked_den) {
  this.areaId = parseInt(areaId);
  this.npicked_num = parseInt(npicked_num);
  this.npicked_den = parseInt(npicked_den);
}

Clear.REGEX = /Clear load stat, area (\d+), npicked (\d+)\/(\d+)/

Clear.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Clear.REGEX) ) {
    return new Clear(matches[1],matches[2],matches[3]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Clear;

