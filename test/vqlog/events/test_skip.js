var Skip = require('../../lib/vqlog/events/skip.js'),
    assert = require('assert');

describe('vqlog', function() {
  describe('log', function() {
    describe('events', function() {
      describe('skip', function() {
        var skip;

        describe('#fromMessage', function() {
          describe('exit boundary message', function() {
            beforeEach(function() {
              skip = Skip.fromMessage("Part is skipped (exit boundary), area 2, work_id 34, tray 0, model_id 1, cur_x 955, bound 945");
            });

            it('has the right reason', function() {
              assert.equal('exit boundary', skip.reason);
            });

            it('has the right area', function() {
              assert.equal(2, skip.areaId);
            });

            it('has the right workId', function() {
              assert.equal(34, skip.workId);
            });

            it('has the right tray id', function() {
              assert.equal(0, skip.trayId);
            });

            it('has the right model id', function() {
              assert.equal(1, skip.modelId);
            });

            it('has the right currentX', function() {
              assert.equal(955, skip.currentX);
            });

            it('has the right bound', function() {
              assert.equal(945, skip.bound);
            });
          }); /* exit boundary */

          describe('npicked > n2pick message', function() {
            beforeEach(function() {
              skip = Skip.fromMessage("Part is skipped (npicked > n2pick), area 1, work_id 99, tray 0, model_id 1");
            });

            it('has the right reason', function() {
              assert.equal('npicked > n2pick', skip.reason);
            });

            it('has the right area', function() {
              assert.equal(1, skip.areaId);
            });

            it('has the right workId', function() {
              assert.equal(99, skip.workId);
            });

            it('has the right tray id', function() {
              assert.equal(0, skip.trayId);
            });

            it('has the right model id', function() {
              assert.equal(1, skip.modelId);
            });

            it('has the right currentX', function() {
              assert.equal(null, skip.currentX);
            });

            it('has the right bound', function() {
              assert.equal(null, skip.bound);
            });
          }); /* exit boundary */

        });
      }); /* skip */
    }); /* events */
  }); /* log */
}); /* vqlog */
