function Acknowledgement(area_id, work_id, tray_id, model_id, ack) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
  this.ack = parseInt(ack);
}

Acknowledgement.REGEX = /Receive ACKQUE, area (\d+), work_id (\d+), tray (\d+), model_id (\d+), ack (\d+)/

Acknowledgement.from_message = function(message) {
  var matches;
  if ( matches = message.match(Acknowledgement.REGEX) ) {
    return new Acknowledgement(matches[1],matches[2],matches[3],matches[4],matches[5]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Acknowledgement;
