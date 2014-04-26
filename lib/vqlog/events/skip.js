function Skip(areaId, workId, trayId, modelId) {
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
}

Skip.REGEX = /Part is skipped \(npicked > n2pick\), area (\d+), work_id (\d+), tray (\d+), model_id (\d+)/

Skip.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Skip.REGEX) ) {
    return new Skip(matches[1],matches[2],matches[3],matches[4]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Skip;
