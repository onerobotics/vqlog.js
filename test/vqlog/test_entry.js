var Helper = require('../helper'),
    Entry = require('../../lib/vqlog/entry.js'),
    assert = require('assert');

describe('vqlog', function() {
  describe('entry', function() {
    var entry;

    describe("from constructor", function() {
      beforeEach(function() {
        entry = new Entry(100, "Get_queue timeout, area 1");
      });

      it("has the right tick", function() {
        assert.equal(100, entry.tick);
      });

      it('is a timeout', function() {
        assert.equal('Timeout', entry.event.constructor.name);
      });

      describe("#time_since", function() {
        it('works', function() {
          assert.equal(0.2, entry.time_since(0));
        });
      });
    }); /* from constructor */

    describe('#from_string', function() {
      it('works', function() {
        entry = Entry.from_string('100, Get_queue timeout, area 1');
        assert.equal(100, entry.tick);
        assert.equal('Timeout', entry.event.constructor.name);
      });
    }); /* #from_string */
  });
});


