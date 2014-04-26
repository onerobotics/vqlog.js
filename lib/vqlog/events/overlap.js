function Overlap(areaId, workId, trayId, modelId) {
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
}

Overlap.REGEX = /Part is overlapped, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Overlap.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Overlap.REGEX) ) {
    return new Overlap(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Overlap;
