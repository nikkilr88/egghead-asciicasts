Instructor: [00:00] We're going to get our socket.io code working with our client-side application. The first thing we need to do though is update the server-side. I always find it easier to do the server-side code first.

[00:12] Within our `io` logic file, I'm going to add a event listener on the global Socket.io object. We're going to listen for when clients connect. The syntax is `io`, as in the Socket.io object, `on`, and then the name of the event, in this case, it's `connection`, which is an in-built event name. This will pass us a `socket`.

### io.js
```javascript
exports.initialize = function (server) {
  io = sio(server);
  io.on('connection', (socket) => {
  })
};
```

[00:35] That `socket` object will have an `id` which we can then console out. Once we have the `socket` object, we can then listen for other events which are only specific for that client. 

```javascript
exports.initialize = function (server) {
  io = sio(server);
  io.on('connection', (socket) => {
    logger.debug(`A user connected with ${socket.id}`);
  })
};
```

In this case, I think we're going to listen also for when that client disconnects.

[00:51] Again, it's `socket.on`, event name `disconnects`. Again, we're going to log out which particular `socket` has disconnected. 

```javascript
exports.initialize = function (server) {
  io = sio(server);
  io.on('connection', (socket) => {
    logger.debug(`A user connected with ${socket.id}`);

    socket.on('disconnect', function () {
     logger.debug(`A user disconnected with ${socket.id}`);
    })

  })
};
```

That's it for our Express server for this instance.

[01:04] The next step is to get the client-side application built. For our simple client application, we're going to use the Express server to host it. We'll create a new folder called `public`. Inside `public`, we'll create a new basic `index.html` file. We have pasted in a basic HTML markup.

### index.html
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Egghead Socket.io</title>
</head>

<body></body>

</html>
```

[01:28] The next step is to reference the actual client-side library that socket.io provides. As mentioned previously, it's bundled with the package. The syntax we're referencing it is like this. 

```html
<script src="/socket.io/socket.io.js"></script>
```

This will actually be pulled from our Express server. We now make a reference to the `io` object, which is available from this library. That will trigger a connection to the server.

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Egghead Socket.io</title>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
    </script>

</head>

<body>
</body>

</html>
```
[01:53] We can now start the server up and test it. I've started my server up. I've got rid of the date and time in front of the console logging, just to make it a bit smaller. You can see it's running fine. I'm now going to bring up a browser running on the `8500` port.

[02:07] As you can see, I'm just going to bring it across. As it starts up, we get the server indicating a user connected with our socket ID. 

![Client Connected](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025887/transcript-images/02_egghead-set-up-a-simple-socket-io-client-to-connect-to-the-server-client-connected.jpg)

This code's working. If I do another one -- I just put the URL in there -- we get a different socket ID. Another client's connected. 

![Second Client](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025884/transcript-images/02_egghead-set-up-a-simple-socket-io-client-to-connect-to-the-server-2nd-client.jpg
)
If I close this one, the user disconnected. The event is fired on the socket itself.

![Client Disconnect](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025885/transcript-images/02_egghead-set-up-a-simple-socket-io-client-to-connect-to-the-server-disconnect.jpg)

[02:34] The first thing we want to demonstrate is a real-time push to all connected clients. They're all going to receive the same information at the same time. We're going to modify the `server.js` file and give it a reference to the initialized socket.io object.

[02:51] We start by making a reference to the `io` file which contains our logic. Then we call our `io` function, which in turn returns the Socket.IO object which has been initialized in the line above. 

### server.js
```javascript
const global_socket = require('./io').io();
```

What I'm going to do is paste in a function called `heartbeat`. This is just going to generate a random number that's going to seem like a heartbeat or a pulse.

[03:13] We're also going to log this out to the server console so that we can see the value that's then going to be sent to all the connected clients. 

```javascript
function heartbeat() {
    // Retun a random number between 60 (inc) and max (exc)
    const pulse = Math.ceil(Math.random() * (160 - 60) + 60);
    logger.debug(`Heartbeat ${pulse}`);
    return pulse;
}
```
Finally, we're going to use a standard JavaScript `setInterval`. We want to do this because we're going to want to transmit or broadcast all the connected clients, every second, a random number.

[03:37] Within our `setInterval` function, we're going to call or use our `global_socket`. We use the standard socket.io `emit` method, which is used to broadcast to all connected clients. We're going to have a custom event. We're going to call it `PULSE`. We're using uppercase just for convention. We call our `heartbeat` function. Finally, we're going to do that every second.

```javascript
setInterval(function () {
    global_socket.emit('PULSE', heartbeat())
}, 1000);
```

[04:02] The next step is to update our client script so that we can listen for this custom `PULSE` event. We have our `index.html` file open. We are now just going to use our `socket` object. We'll use the `on` method that's provided to us.

[04:19] We're going to pass in the custom event name, which is PULSE. In this case, what we're going to do is get hold of the value that's sent to us within that custom event. We should `log` it out to the `console`.

### index.html

```html
<script>
    const socket = io();
    socket.on('PULSE', function (msg) {
        console.log(msg);
    })
</script>
```

[04:34] That's done. We can fire our server up and test it and see how it looks. I've got my terminal open. I'm going to start my server with `node server`. We have two browsers already open. They have connected with two socket IDs. We have the heartbeat, coming out from our server, which is the random number.

![Server Heartbeat](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025885/transcript-images/02_egghead-set-up-a-simple-socket-io-client-to-connect-to-the-server-server-heartbeat.jpg)

[04:53] If I open the two browser windows and bring them forward with their consoles, we can see that the heartbeat `PULSE` is being console logged out. They are synchronized between the two clients and the server. That all seems to be working fine.

![Console Heartbeat](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025887/transcript-images/02_egghead-set-up-a-simple-socket-io-client-to-connect-to-the-server-browser-heartbeat.jpg)

[05:08] In summary, the server starts. The client connects. For each client that does connect, socket.io will return a `socket` object with a unique identifier. For the server to broadcast to all connected clients, we use the `io.emit` method. We use a custom event along with a value. On the client side, we listen for that event using the `on` method. That gives us the value.
