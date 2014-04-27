var Helper = require('../helper'),
    Log = require('../../lib/vqlog/log.js'),
    assert = require('assert');

describe('vqlog', function() {
  describe('log', function() {
    var log;

    describe('#fromString', function() {
      beforeEach(function() {
        log = Log.fromString('49035926, Receive GETQUE, area 1, timeout 0, consec 1, model_id ********, work_id ********');
      });

      it('returns a log', function() {
        assert.equal('Log', log.constructor.name);
      });
    });

    describe('#fromPath', function() {
      beforeEach(function() {
        log = Log.fromPath(Helper.fixturePath('vqlog.txt'));
      });

      it('returns a log', function() {
        assert.equal('Log', log.constructor.name);
      });

      it('works for another vqlog', function() {
        log = Log.fromPath(Helper.fixturePath('vqlog1.txt'));
      });

      describe('#startTick', function() {
        it('works', function() {
          assert.equal(49035926, log.startTick());
        });
      });

      describe('#endTick', function() {
        it('works', function() {
          assert.equal(49052319, log.endTick());
        });
      });

      describe("duration", function() {
        it('works', function() {
          assert.equal(32.786, log.duration());
        });
      });

      describe('#entriesByEventType', function() {
        it('works for acknowledgement', function() {
          assert.equal(14, log.entriesByEventType('Acknowledgement').length);
        });

        it('works for addition', function() {
          assert.equal(30, log.entriesByEventType('Addition').length);
        });
      });

      describe('#entriesByAreaId', function() {
        it('works', function() {
          assert.equal(0, log.entriesByAreaId(0).length);
          assert.equal(462, log.entriesByAreaId(1).length);
        });
      });

      describe("#entriesByWorkId", function() {
        it('works', function() {
          assert.equal(0, log.entriesByWorkId(0).length);
          assert.equal(3, log.entriesByWorkId(96).length);
        });
      });

      describe('#timeUntil', function() {
        it('works', function() {
          assert.equal(0, log.timeUntil(log.entries[0]));
          assert.equal(log.duration(), log.timeUntil(log.entries[log.entries.length-1]));
        });
      });

    }); /* #fromPath */
  }); /* log */
});
