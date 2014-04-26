var Helper = require('../helper'),
    utilities = require('../../lib/vqlog/utilities.js'),
    assert = require('assert');

describe('vqlog', function() {
  describe('utilities', function() {
    describe("#timeInterval", function() {
      it("works", function() {
        assert.equal(1.0, utilities.timeInterval(0,500));
      });
    });
  });
});

