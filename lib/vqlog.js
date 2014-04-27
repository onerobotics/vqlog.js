var Entry = require('./vqlog/entry');
var Event = require('./vqlog/event');
var Log = require('./vqlog/log');
var Utilities = require('./vqlog/utilities');

function vqlog() {
}

vqlog.Entry = Entry;
vqlog.Event = Event;
vqlog.Log = Log;
vqlog.Utilities = Utilities;

module.exports = vqlog;
