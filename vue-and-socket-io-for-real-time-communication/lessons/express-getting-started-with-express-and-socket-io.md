Instructor: [00:00] The [socket.io](https://socket.io/) framework comes in two parts, a [node.js](https://nodejs.org) server and a client-side library. In this lesson, we're going to get our Node.js server set up for working with [socket.io](https://socket.io/).

[00:13] We're going to get our packages installed for our Node application. 

![Packages](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025884/transcript-images/01_express-getting-started-with-express-and-socket-io-packages.jpg)

We're going to start with `express`. [Express](https://expressjs.com) we're going to use because it's a well-understood framework and we need to host some static files. Also, in later lessons, we're going to be triggering or simulating the triggering of an external system which then needs to send messages to connected clients.

[00:35] We have the `socket.io` package itself which is for the server but also comes bundled with the client library. We're going to be using `dotenv` because for best practice for Node applications we're going to be hosting our configuration in an external variables file. I have a [lesson](https://egghead.io/lessons/node-js-setup-local-configuration-with-node-js-applications) about that.

[00:50] We're also going to use `winston` for logging. Again, I have another lesson to talk about [winston and winston-papertrail](https://egghead.io/lessons/javascript-nodejs-logging-using-winston-and-papertrail). We're going to be doing a lot of logging as information is flowing between the client and the server.

[01:01] The first thing we're going to need to do is create our `server.js` file which is going to be used in the actual Express application. Within the application, the first thing we're going to put in is our reference to the `variables.env` file. 

### server.js

```javascript
const dotenv = require("dotenv").config({
    path: "variables.env"
});
```

The `variables.env` file is our local configuration which is loaded at runtime. 

We're just setting our `NODE_ENV` to `local` here and a `PORT`.

### variables.env

```javascript
NODE_ENV=local
PORT=8500
```

[01:23] I've copied in some boilerplate Express code, so I'm just going to run through it very quickly. We've got a custom `logger`, which I mentioned previously. We have a reference to `express`.

### server.js

```javascript
const dotenv = require("dotenv").config({
    path: "variables.env"
});

const logger = require('./logger');
const express = require('express');
const app = express();
```

[01:32] The `port` that we're going to run on, which is `8500`. This is coming from the `variables.env` file. 

```javascript
const port = process.env.PORT || 8500;
```

We're going to be using Express as our static file hosting server, so we've got a reference to the `express.static` method there. 

```javascript
// Static file service
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
```

Finally, the actual Express server is started.

```javascript
app.listen(port);
```

[01:46] Below here we have our custom `logger` being used to output the fact the server has started and what `port` it's running on. 

```javascript
const pjson = require("./package.json");
logger.info(`${pjson.name} Server Started >> `);
logger.info(`running in ${process.env.NODE_ENV}`);
logger.info(`running on port ${port}`);
```

If you run the server now, it should run fine. Our server started successfully.

![Server started](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025886/transcript-images/01_express-getting-started-with-express-and-socket-io-server-started.jpg)

[02:02] Now we can start to get socket.io working with our Express server. The first thing we need to do is get a handle on the Node HTTP server, and we can do that by first requiring the `http` module, calling the `Server` method, and passing the Express object.

```javascript
const express = require('express');
const app = express();
const http = require('http').Server(app);
```

[02:20] To make the socket.io functionality available to be used throughout our Express application, the best thing to do is create it in its own file. We're going to create a new file called `io.js`. 

First, we'll `require` our `socket.io` package.

### io.js

```javascript
const sio = require('socket.io');
```

Then we're going to make an object at the top called `io`. 

```javascript
let io = null;
```

This is what we're going to be returning and available to the rest of our Express application.

[02:46] We need to create a new method which we're going to export called `initialize`. It's going to be passed the Node HTTP `server` and we instantiate our `io` object by using the socket.io package and pass it that `http` server. 

```javascript
exports.initialize = function (server) {
  io = sio(server);
}
```

Finally, to make this `io` object available we're going to export it.

```javascript
exports.io = function () {
  return io;
}
```
 You'll see in future lessons where this becomes useful.

[03:18] Now what we need to do is get a handle on the `io` object in our `server.js` file. Going into our `server.js` file, I'm going to set a new variable called `io`. That's going to be set to our `io` file. We're going to call the `initialize` method and pass it the `http` server.

### server.js

```javascript
const io = require('./io').initialize(http);
```

[03:42] That should be it for setting up our Express server. In the next lesson, we can crack on and actually start using the Socket.IO functionality. I'm just going to fire up our server to make sure it runs OK. Yep, no errors. We can move on.

![Server Started Ok](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025887/transcript-images/01_express-getting-started-with-express-and-socket-io-server-ok.jpg)