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
