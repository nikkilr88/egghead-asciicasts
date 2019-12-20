Instructor: [00:00] To add an acknowledgement function or callback function, the first thing we're going to do is update the `io.js` file on the socket server. Here, we're going to update our previous lessons code, which was handling a response from the client to a quiz.

[00:14] First, we added a second argument for the callback function, seen when we have a callback function. 

### io.js
```javascript
socket.on('QUIZ_RESPONSE', function (data, fn) {
  const user_data = ids.get(socket.id);
  if (user_data) {
    logger.debug(`${user_data.name} has pressed ${data.response}`);
  }
})
```

For this example, we're going to simulate as if the server is checking to see if the answer is correct. We'll add a random `yes_no` check.

[00:34] We then output to the console the `result`. Finally, we call the actual passed in callback function, and we pass back the actual `result` we want to send to the client. In this case, we're going to send a string, which has already been constructed with a correct or incorrect answer, and this then will be displayed on the client.

```javascript
socket.on('QUIZ_RESPONSE', function (data, fn) {
  const user_data = ids.get(socket.id);
  if (user_data) {
    logger.debug(`${user_data.name} has pressed ${data.response}`);
  }
  if (fn) {
    const yes_no = Math.floor(Math.random() * Math.floor(2));
    const result = (yes_no > 0) ? 'Correct' : 'Incorrect';
    logger.debug(`Calling callback function with ${data.response} was ${result}`);
    fn(`Your answer is ${data.response} which is ${result}`)
  }
})
```

[00:52] Once that's done, we can look at the client code to see how we implement the callback function.

[00:58] Opening our Vue application and looking at our `Quiz.vue` component from the previous lesson, we're going to set a property that's going to hold the result from the server. We need to make sure it's blank every time the image is shown so that it resets the answer from the server.

[01:13] We do that within the sockets `SHOW_IMAGE` event block. We also need to set this property within our `data` block so that we can bind the result. Again, we will set it initially to blank.

### Quiz.vue
```html
<script>
export default {
  sockets: {
    SHOW_IMAGE: function(socket_data) {
      this.image = "data:image/jpeg;base64," + socket_data.buffer;
      this.dialog = true;
      this.answer = "";
      this.server_result = "";
    }
  },
  data: () => ({
    dialog: false,
    answer: "",
    image: "",
    server_result: ""
  }),
};
</script>
```

[01:28] Finally, within our method, within the `$socket.emit` method, we're going to add a third argument, which will be the result of our callback function. Once the server returns the result, we can set our `server_result` property and then bind this to our display.

```javascript
send_response() {
  const message_data = {};
  message_data.response = this.answer;
  this.$socket.emit("QUIZ_RESPONSE", message_data, result => {
    this.server_result = result;
  });
}
```

[01:45] Now, within our Vue component, we can have a visual representation of the result. We're going to use [Vuetify Alert](https://vuetifyjs.com/en/components/alerts#alert) box here and within the alert box, we will bind to our `server_result` property. 

```html
<v-alert
    :value="server_result"
    type="success"
    icon="check_circle"
    outline
>{{ server_result }}</v-alert>
```
The visibility of the alert box will be based on the fact that we have a `server_result` value, add some styling, which you may wish to change based on whether we get an incorrect or correct result.

[02:09] We can now fire up the socket server and a couple of clients, and test this.

[02:14] I have two clients running. I send the test image. I select an answer, and the callback fires and the answer comes back correct. 

![correct answer](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025891/transcript-images/09_egghead-building-an-acknowledgement-function-to-a-vue-socket-io-emit-method-correct.jpg)

I select an answer, and again it comes back correct, even though I selected cat. It's because we're just using a random generator. Eventually, we get incorrect if we hit it enough times.

[02:33] I close these and we just do it again. If I keep hitting the button, we get different images each time, just like we did last time. If I selected cats, again, incorrect. Select bird, and incorrect again, because it's random.

![Bird](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025884/transcript-images/09_egghead-building-an-acknowledgement-function-to-a-vue-socket-io-emit-method-bird.jpg)

[02:53] Clicking the button again, and we get a new image, but you noticed the server-side property has been reset, so it seems to be working fine.
