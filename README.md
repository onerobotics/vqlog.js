# vqlog

vqlog is a tool for analyzing VQLOGs from FANUC Visual Line Tracking
applications.

## Usage:

```js

  var vqlog = require("vqlog");
  var my_log = vqlog.from_path('./vqlog.txt');

  console.log('Duration: ' + my_log.duration());
  console.log('Entries: ' + my_log.entries);

  // filter by event type
  console.log('Acks: ' + my_log.entries_by_event_type('Acknowledgement'));
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
