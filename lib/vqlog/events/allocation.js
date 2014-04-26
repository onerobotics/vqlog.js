function Allocation(areaId, workId, trayId, modelId) {
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
}

Allocation.REGEX = /Part is allocated, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Allocation.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Allocation.REGEX) ) {
    return new Allocation(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Allocation;
