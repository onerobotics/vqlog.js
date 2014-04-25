function LoadBalance(area_id, model_id, npicked_num, npicked_den, n2pick_num, n2pick_den) {
  this.area_id = parseInt(area_id);
  this.model_id = parseInt(model_id);
  this.npicked_num = parseInt(npicked_num);
  this.npicked_den = parseInt(npicked_den);
  this.n2pick_num = parseInt(n2pick_num);
  this.n2pick_den = parseInt(n2pick_den);
}

LoadBalance.REGEX = /Load-balance, area (\d+), model_id (\d+), npicked (\d+)\/(\d+), n2pick (\d+)\/(\d+)/

LoadBalance.from_message = function(message) {
  var matches;
  if ( matches = message.match(LoadBalance.REGEX) ) {
    return new LoadBalance(matches[1],matches[2],matches[3],matches[4],matches[5],matches[6]);
  }

  throw new Error("Message not recognized: " + message);
}

module.exports = LoadBalance;
