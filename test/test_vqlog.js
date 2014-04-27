var Helper = require('./helper'),
    vqlog = require('../lib/vqlog'),
    assert = require('assert');

describe('vqlog', function() {
  it('gives access to Entry', function() {
    assert.equal("Entry", vqlog.Entry.name);
  });

  it('gives access to Event', function() {
    assert.equal('Event', vqlog.Event.name);
  });

  it('gives access to Log', function() {
    assert.equal('Log', vqlog.Log.name);
  });

  it('gives access to Utilities', function() {
    assert.equal('Utilities', vqlog.Utilities.name);
  });
});
