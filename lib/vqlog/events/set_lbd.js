function SetLBD(lineId) {
  this.lineId = parseInt(lineId);
}

/* 2094476, Receive SETLBD, line 1 */
SetLBD.REGEX = /Receive SETLBD, line (\d+)/

SetLBD.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(SetLBD.REGEX) ) {
    return new SetLBD(matches[1]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = SetLBD;

