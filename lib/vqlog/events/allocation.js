function Allocation(area_id, work_id, tray_id, model_id) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
}

Allocation.REGEX = /Part is allocated, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Allocation.from_message = function(message) {
  var matches;
  if ( matches = message.match(Allocation.REGEX) ) {
    return new Allocation(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Allocation;
