var Helper = require('../helper'),
    Log = require('../../lib/vqlog/log.js'),
    assert = require('assert');

describe('vqlog', function() {
  describe('log', function() {
    var log;

    describe('#from_string', function() {
      beforeEach(function() {
        log = Log.from_string('49035926, Receive GETQUE, area 1, timeout 0, consec 1, model_id ********, work_id ********');
      });

      it('returns a log', function() {
        assert.equal('Log', log.constructor.name);
      });
    });

    describe('#from_path', function() {
      beforeEach(function() {
        log = Log.from_path(Helper.fixture_path('vqlog.txt'));
      });

      it('returns a log', function() {
        assert.equal('Log', log.constructor.name);
      });

      describe('#start_tick', function() {
        it('works', function() {
          assert.equal(49035926, log.start_tick());
        });
      });

      describe('#end_tick', function() {
        it('works', function() {
          assert.equal(49052319, log.end_tick());
        });
      });

      describe("duration", function() {
        it('works', function() {
          assert.equal(32.786, log.duration());
        });
      });

      describe('#entries_by_event_type', function() {
        it('works for acknowledgement', function() {
          assert.equal(14, log.entries_by_event_type('Acknowledgement').length);
        });

        it('works for addition', function() {
          assert.equal(30, log.entries_by_event_type('Addition').length);
        });
      });

      describe('#entries_by_area_id', function() {
        it('works', function() {
          assert.equal(0, log.entries_by_area_id(0).length);
          assert.equal(462, log.entries_by_area_id(1).length);
        });
      });

      describe("#entries_by_work_id", function() {
        it('works', function() {
          assert.equal(0, log.entries_by_work_id(0).length);
          assert.equal(3, log.entries_by_work_id(96).length);
        });
      });

      describe('#time_until', function() {
        it('works', function() {
          assert.equal(0, log.time_until(log.entries[0]));
          assert.equal(log.duration(), log.time_until(log.entries[log.entries.length-1]));
        });
      });

    }); /* #from_path */
  }); /* log */
});
