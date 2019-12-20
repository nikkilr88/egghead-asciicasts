Instructor: [00:00] To deal with a client disconnecting, we'll go into our socket server and open our `io.js` file. This will be where a client has actually closed their browser and therefore the socket has disconnected.

[00:14] We're going to listen for an inbuilt event, specifically on the socket, called `disconnect`.

[00:23] We're then going to use our `ids` map to get hold of the `user_data`, based on the passed in `socket.id`. If we have some `user_data`, we're just going to log it out to the console for now and we'll actually output the user `name`.

### io.js
```javascript
    socket.on('disconnect', function () {
      // Updated to get real username
      const user_data = ids.get(socket.id);
      if (user_data) {
        logger.debug('USER DISCONNECTED ' + user_data.name)
      }
    })
```

[00:39] It could be quite useful to know which user has closed their browser. You could even use the socket server to broadcast all the ever connected clients, the fact that that user has closed their browser.

[00:50] On the client side, it might be useful to know when the socket server is disconnected. To demonstrate that, we're going to modify our `PopupMessage` view component.

[01:00] Within the `sockets` block, we can now add the standard `disconnect` event. When the server disconnects, we're actually going to display our pop-up message. We'll also set a `notifications_text` to warn the user the fact the server is no longer available.

[01:17] We'll set the `color` to be `red`. We'll set the `snackbar` property to `true` to display it. 

### PopupMessage.vue
```javascript
  sockets: {
    disconnect: function(){
      this.notification_text = "CAUTION SERVER DISCONNECTED";
      this.color = "red";
      this.snackbar = true;
    }
  },
```

Let's now see it in action.

[01:28] Here, we have four connected clients. They've each got their own individual socket ID. My socket server is running. It shows them as connected.

[01:36] If I just bring the server out of the way a second and if I actually close the server, we get the error message being displayed using our snackbar component. It seems to work fine.

![Disconnect Message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025883/transcript-images/07_egghead-handle-client-and-server-disconnects-using-socket-io-disconnect.jpg)
