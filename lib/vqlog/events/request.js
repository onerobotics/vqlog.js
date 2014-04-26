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
