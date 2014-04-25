function Skip(area_id, work_id, tray_id, model_id) {
  this.area_id = parseInt(area_id);
  this.work_id = parseInt(work_id);
  this.tray_id = parseInt(tray_id);
  this.model_id = parseInt(model_id);
}

Skip.REGEX = /Part is skipped \(npicked > n2pick\), area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Skip.from_message = function(message) {
  var matches;
  if ( matches = message.match(Skip.REGEX) ) {
    return new Skip(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Skip;
