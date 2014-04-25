function Overlap(area_id, work_id, tray_id, model_id) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
}

Overlap.REGEX = /Part is overlapped, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Overlap.from_message = function(message) {
  var matches;
  if ( matches = message.match(Overlap.REGEX) ) {
    return new Overlap(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Overlap;
