function utilities() {
}

utilities.time_interval = function(start_tick, end_tick) {
  return (end_tick - start_tick) * 2.0 / 1000;
}

module.exports = utilities;
