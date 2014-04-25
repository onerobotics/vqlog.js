var path = require('path');

function Helper() {
}

Helper.fixture_path = function(filename) {
  return path.resolve(__dirname,'fixtures', filename);
}

module.exports = Helper;
