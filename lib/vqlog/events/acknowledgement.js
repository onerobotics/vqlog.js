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
