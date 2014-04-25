function Addition(area_id, work_id, tray_id, model_id) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
}

Addition.REGEX = /Put a part to queue, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Addition.from_message = function(message) {
  var matches;
  if ( matches = message.match(Addition.REGEX) ) {
    return new Addition(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Addition;
