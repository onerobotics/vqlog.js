function LoadBalance(areaId, modelId, npickedNum, npickedDen, n2pickNum, n2pickDen) {
  this.areaId = parseInt(areaId);
  this.modelId = parseInt(modelId);
  this.npickedNum = parseInt(npickedNum);
  this.npickedDen = parseInt(npickedDen);
  this.n2pickNum = parseInt(n2pickNum);
  this.n2pickDen = parseInt(n2pickDen);
}

LoadBalance.REGEX = /Load-balance, area (\d+), model_id (\d+), npicked (\d+)\/(\d+), n2pick (\d+)\/(\d+)/

LoadBalance.fromMessage = function(message) {
  var matches;
  if ( matches = message.match(LoadBalance.REGEX) ) {
    return new LoadBalance(matches[1],matches[2],matches[3],matches[4],matches[5],matches[6]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = LoadBalance;
