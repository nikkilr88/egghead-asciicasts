Instructor: [00:01] For this lesson, we're going to simulate an external system calling a REST API on our Express server. The Express server will then use the socket.io connection to cause a pop-up to be displayed on all the connected clients. The pop-up is going to be a view component. An example could be a server monitoring system which has triggered a webhook on your server.

[00:22] We're going to start with the server. The first thing we're going to do to simulate the external system is update our basic HTML page to allow us to trigger a notification via a normal REST API to our server, which then in turn will send out socket information.

[00:40] The first thing I'm going to do in out `index.html` file is add a `script` tag that's going to reference the [axios](https://github.com/axios/axios) library. 

### index.html
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
```

Now we need to create a function which is going to `post` to our Express server with some information, which then in turn will trigger the socket message.

[00:58] Using the `axios.post` method, we're going to create a new route on our Express server. For now, we'll just call it `notification`. We're going to pass a couple of values. 

```html
<script>
  function send_message() {
    axios.post('/notification', {
              
    })
  }
</script>
```

This is going to be an object that consists of two properties, the actual `message` that we want to display in our pop-up. I'm going to create a form in a second. For now, I'm just going to create this in advance.

[01:28] We're also going to allow the user to select a `color`. The color will be on the pop-up that's displayed to the user, will change. This is to demonstrate that we don't have to just send a string via the socket. We can actually send an object.

[01:43] I'm using a `querySelector` here because actually we're going to use a radio button in our HTML form. 

```javascript
  function send_message() {
    axios.post('/notification', {
      message: document.getElementById('message').value,
      color: document.querySelector('input[name="color"]:checked').value
    })
  }
```

Now we just need to create our simple form. I've got some markup all ready to copy in from the clipboard. It's a simple `form` with an `input` field for the message and a `radio` button. The `onclick` event will call our function.

```html
<body>
    <div>
        <label>Message</label>
        <input name="message" id="message" type="text"><br />
        <input type="radio" name="color" value="success" checked>Success<br />
        <input type="radio" name="color" value="info">Info<br />
        <input type="radio" name="color" value="error">Error<br />

        <button onclick="send_message(); return false">Send Message</button>
    </div>

</body>
```

[02:00] Let's have a quick look and see what that looks like. I've started my server up. I have opened the url `http://localhost:8500`. Remember, Express is serving up static web files for me. I've got my `message` input field. I've got a radio button for the `color`. I can send a message. Now we just need to update the server side to handle the post.

![Initial HTML form](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025881/transcript-images/04_egghead-display-a-broadcast-message-using-a-vuetify-snackbar-component-which-is-sent-via-socket-io-html-form.jpg)

[02:22] Popping back into our `server.js` file, the first thing we need to do is install `body-parser` as we're doing a HTTP post to our Express server. Once that's done, we then need to make a reference to it inside our `server.js` file.

### server.js
```javascript
const bodyParser = require('body-parser');
```

[02:38] Normally, you would have a separate routes file in your Express application to keep things neat and tidy. For this case, we can just actually get away with putting our `post` or our route directly in the `server.js` file.

[02:52] We need to listen for a `post`. The route is going to be `/notification`. We'll have a request and a response. We don't need to worry about next. The first thing we're going to do is log out the fact that we have a message. Now we need to send the contents of the message on the socket.

```javascript
app.post('/notification',
    function (req, res) {
        logger.debug(`Message Recieved: ${req.body.message}`);
    }
)
```

[03:14] Like previously, we're going to use a `socket.emit` method. We need to use the `global_socket` because we want to do this to all connected clients. Just close that string. Again, we need a custom event name. This time, I'm going to call it `POPUP_NOTIFICATION`, just to keep it fairly obvious what's going on.

[03:35] This time, instead of a string, we're going to be sending an object. The object will have two properties. One will be `message`. The other will be `color`. Lastly, we're going to return something to our response, else the client will hang in the browser. That's it for our server.

```javascript
app.post('/notification',
    function (req, res) {
      logger.debug(`Message Recieved: ${req.body.message}`);
      global_socket.emit('POPUP_NOTIFICATION', {
        message: req.body.message,
        color: req.body.color
      })
      res.send();
    }
)
```

[03:51] Now we can go ahead and look at the Vue application itself. For reference, we're going to be using the [Vuetify snackbar component](https://vuetifyjs.com/en/components/snackbars#snackbar) inside our Vue application. Now we can hook it up. Coming back into our Vue application, we're going to create a new component. Within our `components` folder, we'll create a new file.

[04:09] We're going to call this component `PopupMessage.vue`. Within our Vue component, the `template` section will contain a Vuetify `snackbar`. The visibility of the snackbar will be bound to a property called `snackbar`.

### PopupMessage.vue
```html
<template>
  <v-snackbar v-model="snackbar" :timeout="timeout"></v-snackbar>
</template>
```

[04:25] The actual `color` of the snackbar will be driven by what's been sent within the socket message. The contents of the snackbar will be sent via the socket. We're going to have a close button. This is simply going to set the `snackbar` property to `false`.

```html
<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>
    {{notification_text}}
    <v-btn flat @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>
```
[04:39] Coming into our component `script` block, we're going to start with a `data` block. By default, our `snackbar` is going to be hidden. We'll set it to `false`. Our `notification_text` is going to be blank. Our snackbar `timeout` will be `300` milliseconds or 3 seconds. Our default `color` will be `success`, which is a CSS class in Vuetify which makes it green.

```javascript
<script>
export default {
  data: () => ({
    snackbar: false,
    notification_text: "",
    timeout: 3000,
    color: "success"
  })
};
</script>
```

[05:06] Now we need to include the socket information. We will use the custom `sockets` block. We will have a label which matches our custom event name, which was called `POPUP_NOTIFICATION`. That will give us access to the `socket_data`. From that, we can set the snackbar `notification_text` and `color`. Finally, we then need to display the snackbar itself.

```javascript
  sockets: {
    POPUP_NOTIFICATION: function(socket_data) {
      this.notification_text = socket_data.message;
      this.color = socket_data.color || "success";
      // Display
      this.snackbar = true;
    }
  }
```

[05:32] That's the Vue component built. The last thing we need to do before we can test this component is update our `App.vue` file. We need to make a reference to our new component in three different places, once to `import` it. We then need to `export` it. Finally, we need to reference it within our `template`. In this case, this component can sit outside of the containers.

### App.vue
```html
<template>
  <v-app>
    <v-toolbar dark fixed app></v-toolbar>
    <v-content></v-content>
    <v-footer dark></v-footer>
    <PopupMessage></PopupMessage>
  </v-app>
</template>

<script>
import Graph from "@/components/Graph";
import PopupMessage from "@/components/PopupMessage";
export default {
  components: {
    Graph,
    PopupMessage
  }
};
</script>
```

[06:03] Now we can test it. To test this, I've got three connected clients which are connected to my socket server. They're receiving the heartbeat information from our previous lesson already. That's why they're all synchronized.

![Initial Demo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025885/transcript-images/04_egghead-display-a-broadcast-message-using-a-vuetify-snackbar-component-which-is-sent-via-socket-io-initial-demo.jpg)

[06:16] In this corner, we have the HTML page, which is acting as our external system. If I enter a message, I'll make this `Info`. I'll click send message. All three clients have now received the information via the socket server. 

![Info Demo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025884/transcript-images/04_egghead-display-a-broadcast-message-using-a-vuetify-snackbar-component-which-is-sent-via-socket-io-info-demo.jpg)

If I choose `Error`, the color will change. Now red. Notice they all appear at the same time. That seems to be working fine.

![Error Message Demo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025885/transcript-images/04_egghead-display-a-broadcast-message-using-a-vuetify-snackbar-component-which-is-sent-via-socket-io-error-demo.jpg)