Instructor: 00:00 In this lesson, we'll update our Socket server to respond to a URL being called to load a random image from the filesystem. This image will then be sent over the socket to two connected clients. These clients will have a new Vue component to display these images, as well as the ability to select what the image is, and send this answer back to the server, again, using the socket.

00:24 To start with, we've copied in some example images into the server's filesystem in preparation for the quiz. 

![Example Images](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025885/transcript-images/08_egghead-sending-an-image-from-express-to-a-vue-component-using-socket-io-example-images.jpg)

The next thing we're going to do is update our simple `index.html` file. We're going to add a button to this page which will then start the quiz, which in turn will send an image to the connected clients over the socket.

00:45 We already have the axios library added for doing a HTTP `get` to our server. We now add an HTML `button` with an `onclick` event handler which in turn will call a new JavaScript function called `send_image`.

00:59 The function will use the axios library to call a new route on the server called `send_image`. 

### index.html
```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
   <script>
   function send_image(){
       axios.get('/send_image');
   }
   </script>
</head>

<body>
<button onclick="send_image(); return false">Send Image</button>
</body>

</html>
```

We'll quickly fire up a server and have a look and see what it looks like. Here, we have the browser open. If I click the button, we can see that it does a `get` call to `send_image`.

![Initial index.html](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025886/transcript-images/08_egghead-sending-an-image-from-express-to-a-vue-component-using-socket-io-initial-index.jpg)

01:18 Next, we'll add the route to the `server.js` file. The first thing we're going to need is the `fs` package, as we'll be dealing with files from the filesystem. Don't forget to install that using `npm`. We'll now add the route handler for `send_image`. We'll add a `logger` statement to indicate that we're actually calling this function, just to help out in the console.

### server.js
```javascript
const fs = require('fs');
app.get('/send_image', function (req,res){
    logger.debug(`Send Image Called`);
})
```
01:40 Next, we need to get a handle on the image file name. We're going to do that by using a combination of Node.js property, which is a `__dirname`, which gives you the directory in the current module and a new function, which we're going to create in a second, which will return a random image file name.

01:59 We'll then log the file name that's been generated. We use the `fs.readFile` method, which is an asynchronous method. We pass it the generated file name, including the file path, and it's going to return to us either an error or the raw data. We then use the socket to `emit`, using our new custom event, which is called `SHOW_IMAGE`.

```javascript
app.get('/send_image', function (req,res){
    logger.debug(`Send Image Called`);
    const image_file_path = __dirname + get_random_image();
    logger.debug(`Sending Image ${image_file_path}`);
    fs.readFile(image_file_path, function (err, buf) {
        socket.emit('SHOW_IMAGE', {
        })
    })
    res.send();
})
```
02:21 Our socket payload is going to include a property to indicate it's an `image`. We'll set that to `true` and have a `buffer` property, which will be the base64 encoded raw data. We'll also use the `response.send` method so the test client doesn't actually hang while clicking the button.

```javascript
app.get('/send_image', function (req,res){
    logger.debug(`Send Image Called`);
    const image_file_path = __dirname + get_random_image();
    logger.debug(`Sending Image ${image_file_path}`);
    fs.readFile(image_file_path, function (err, buf) {
        socket.emit('SHOW_IMAGE', {
            image: true,
            buffer: buf.toString('base64')
        })
    })
    res.send();
})
```

02:40 Our `get_random_image` function will return a random number between `1` and `6`, as we have six images, which are called `image1`, `image2`, `image3`, `image4`, `image5`, `image6`. We will then return the full file name, including the file path, and we'll use the `path.normalize` method, so that it's operating system independent.

```javascript
function get_random_image(){
    const index = Math.ceil(Math.random() * (6-1) + 1);
    return path.normalize(`/images/image${index}.jpg`)
}
```

03:01 One last thing to do while we're in the server side. We're going to add to the `io.js` file a new event listener for our socket. We're going to add a new custom event, and it's going to be called `QUIZ_RESPONSE`.

03:14 This will be when the user has answered the quiz, so in other words, identified what the image is. The payload will be returned to us. We're going to also try and work out who the user is using our `ids` map, and pass it the `socket.id`. If we have a `user`, we will then output to the logger their answer and their `name`.

### io.js
```javascript
socket.on('QUIZ_RESPONSE', function (data) {
  const user_data = ids.get(socket.id);
  if (user_data) {
    logger.debug(`${user_data.name} has pressed ${data.response}`);
  }
})
```

03:37 On the Vue side, we're now going to create a new component, and it's going to be called `Quiz`. Within the Vue component we'll scaffold out the `template` and `script` blocks. We're then going to copy in some preexisting markup. 

### Quiz.vue
```html
<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">Select what the Image is</v-card-title>
      <v-img :src="image" aspect-ratio="2"></v-img>
      <v-layout row>
        <v-flex xs5 offset-xs1>
          <v-select :items="['Dog', 'Cat', 'Bird']" v-model="answer" label="Image" required></v-select>
        </v-flex>
        <v-flex xs4 offset-xs1>
          <v-btn color="green darken-1" @click="send_response()" >Send Answer</v-btn>
        </v-flex>
      </v-layout>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  sockets: {
    
  },
  data: () => ({
   
  }),
  methods: {
 
  }
};
</script>

```

This is a [Vuetify dialog](https://vuetifyjs.com/en/components/dialogs#dialog), which is bound to a property called `dialog`. We have our title and a [Vuetify image](https://vuetifyjs.com/en/components/images#image) tag, which is bound to the `image` `data` property.

04:03 We have an ability for the user to select an answer describing what the image actually is, and then we have a method called `send_response`, which we're going to write in a second. This will send the answer back to server via the socket.

04:17 We also have a `Close` button, which just sets the `dialog` property to `false` to close the dialog. 

We're just going to now initialize our data properties, so that they have default values. We're going to set our `dialog` property to `false`, so the Vuetify dialog is initially hidden. We're going to have a blank `answer` initially, and the `image` property also will be set to blank.

```javascript
  data: () => ({
    dialog: false,
    answer: "",
    image: ""
  }),
```

04:39 I'm going to populate the `sockets` block, starting with the `SHOW_IMAGE`, which is the custom event being sent via the socket from our socket server. It's going to be passed some socket data. We'll set our `image` property to be a specific syntax. It's the `buffer` data. Then set the `dialog` property to `true`, to show the Vuetify dialog.

04:59 We blank the `answer` again, just to make sure we reset it, in case this is the second time the dialog's been displayed.

```javascript
  sockets: {
    SHOW_IMAGE: function(socket_data) {
      this.image = "data:image/jpeg;base64," + socket_data.buffer;
      this.dialog = true;
      this.answer = "";
    }
  }
```

05:07 We will now add our method, which is `send_response`. This method will send the data back to the server over the socket. The first thing we're going to do is construct a `message_data` object. That will be the payload we'll send over the socket.

05:23 We're going to set a property on there called `response`, and that will contain, or be bound to the `answer` that the user selected. We'll then use the `$socket.emit` method, and we'll use our custom event `QUIZ_RESPONSE` to actually send to the socket. We will then pass the payload, which is `message_data`.

```javascript
  methods: {
    send_response() {
      const message_data = {};
      message_data.response = this.answer;
      this.$socket.emit("QUIZ_RESPONSE", message_data)
    }
  }
```

05:46 Now we can see it in action. Here we have two clients connected and open. I'm going to bring up my button to send and trigger the image sending. The clients have both received the image at the same time, which is a cat, in this case.

![Quiz Cat](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025889/transcript-images/08_egghead-sending-an-image-from-express-to-a-vue-component-using-socket-io-quiz-cat.jpg)

06:03 I'm going to select an answer and send it, the `Dog` and `Cat`. If we look at the server console, we can see where `UPDATE_USER` is called, where the image was called, and we can see the fact that the `Judy Mason` has pressed `Dog` and `John Adams` has pressed `Cat`.

![Quiz Console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025886/transcript-images/08_egghead-sending-an-image-from-express-to-a-vue-component-using-socket-io-quiz-console.jpg)

06:21 Clicking the Close button. If I click the button again, we get a different picture. I can keep clicking it, and the picture will change.

![Different Picture](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025887/transcript-images/08_egghead-sending-an-image-from-express-to-a-vue-component-using-socket-io-different-picture.jpg)