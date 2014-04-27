function Utilities() {
}

Utilities.timeInterval = function(startTick, endTick) {
  return (endTick - startTick) * 2.0 / 1000;
}

module.exports = Utilities;
