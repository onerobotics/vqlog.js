function Addition(areaId, workId, trayId, modelId) {
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
}

Addition.REGEX = /Put a part to queue, area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Addition.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Addition.REGEX) ) {
    return new Addition(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Addition;
