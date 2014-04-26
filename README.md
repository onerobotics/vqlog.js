# vqlog

vqlog is a tool for analyzing VQLOGs from FANUC Visual Line Tracking
applications.

## Usage:

```js

  var vqlog = require("vqlog");
  var myLog = vqlog.fromPath('./vqlog.txt');

  console.log('Duration: ' + myLog.duration());
  console.log('Entries: ' + myLog.entries);

  // filter by event type
  console.log('Acks: ' + myLog.entriesByEventType('Acknowledgement'));
```


## Examples:

There are a couple examples in the `/examples` directory. Use the
[http-server](https://www.npmjs.org/package/http-server) node package
to serve the examples:

```
   > npm install -g http-server
   > http-server examples
```

Open `http://localhost:8080` in your browser.

![timeline example](https://github.com/onerobotics/vqlog.js/raw/master/doc/timeline.png "Timeline Example")
