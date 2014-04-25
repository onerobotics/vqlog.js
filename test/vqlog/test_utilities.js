var Helper = require('../helper'),
    utilities = require('../../lib/vqlog/utilities.js'),
    assert = require('assert');

describe('vqlog', function() {
  describe('utilities', function() {
    describe("#time_interval", function() {
      it("works", function() {
        assert.equal(1.0, utilities.time_interval(0,500));
      });
    });
  });
});

