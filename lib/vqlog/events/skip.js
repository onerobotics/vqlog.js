function Skip(reason, areaId, workId, trayId, modelId, currentX, bound) {
  this.reason = reason;
  this.areaId = parseInt(areaId);
  this.workId = parseInt(workId);
  this.trayId = parseInt(trayId);
  this.modelId = parseInt(modelId);
  this.currentX = parseInt(currentX);
  this.bound = parseInt(bound);
}

Skip.REGEX = /Part is skipped \((exit boundary|npicked > n2pick)\), area (\d+), work_id (\d+), tray (\d+), model_id (\d+)(, cur_x (\d+), bound (\d+))?/

Skip.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(Skip.REGEX) ) {
    return new Skip(matches[1],matches[2],matches[3],matches[4],matches[7],matches[8]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = Skip;
