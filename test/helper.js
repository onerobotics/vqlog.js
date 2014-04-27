var path = require('path');

function Helper() {
}

Helper.fixturePath = function(filename) {
  return path.resolve(__dirname,'fixtures', filename);
}

module.exports = Helper;
