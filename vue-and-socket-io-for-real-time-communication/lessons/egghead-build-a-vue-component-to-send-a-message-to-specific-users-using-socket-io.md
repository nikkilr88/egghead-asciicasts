Instructor: [00:00] In this lesson we're going to create a new Vue component which will allow you to create the message and send it via the socket server either to an individual or to groups of people. The important thing to note, we are using the socket to send and receive information in real time. There's no HTTP traffic involved.

[00:18] To be able to send a message to a targeted user or group, first thing we're going to do is update the `io.js` file in our server. We're going to listen for a new event on the socket and we're going to call this `SEND_MESSAGE`.

### io.js
```javascript
exports.initialize = function (server) {
  io = sio(server);
  io.on('connection', (socket) => {
    logger.debug(`A user connected with ${socket.id}`);
    // Send from the ComposeMessage Vue component
    socket.on('SEND_MESSAGE', function (data) {
     
    });

  })
};
```

[00:34] We need to determine who the message is for, which could either be an individual or it could be a group. We check on the `data` that we've been sent over the socket to see if we have a `name`. If we do have a `name`, we'll extract the user from our map using the `name` as the key.

[00:54] We now can have a handle on the actual `socket_id` which we need to target, as this is part of our `user` object. If we don't have a `name`, then we know the `recipient` is going to be `group`. 

```javascript
    socket.on('SEND_MESSAGE', function (data) {
      let recipient = '';
      if (data.name) {
        const user = users.get(data.name);
        recipient = user.socket_id;
      } else {
        recipient = data.group;
      }
    });
```

What we're going to do now is reuse a custom event that we used previously to send information to the client. We're going to output to the console first just so that we know what's going on.

[01:19] We use the global `io` object. We use the `to` method and it will be our `recipient`. If it's a user, it will be a socket ID, and if it's a group it will be a group name. Then we use the `emit` method, passing it the custom event name which is `POPUP_NOTIFICATION` and we just pass through the `data` object which has been given to us previously.

```javascript
    socket.on('SEND_MESSAGE', function (data) {
      let recipient = '';
      if (data.name) {
        const user = users.get(data.name);
        recipient = user.socket_id;
      } else {
        recipient = data.group;
      }
      logger.debug(`POPUP_NOTIFICATION triggered for ${recipient}`)
      io.to(recipient).emit('POPUP_NOTIFICATION', data);
    });
```

[01:44] That's it for the server side. We can now look at the Vue component. I'm going to create a new component called `ComposeMessage` and it's going to be used to send messages to either users or groups. Starting with adding a `template` block, copying some markup from the clipboard I've prepared earlier.

### ComposeMessage.vue
```html
<template>
  <v-card color="indigo" class="white--text mx-auto">
    <v-card-title class="mb-0 pb-0">
      <v-icon large left dark>record_voice_over</v-icon>
      <div class="title font-weight-light text-md-left">Send Message</div>
      <v-container>
        <v-layout row wrap>
          <v-flex md6 xs12 class="pr-2">
            <v-select dark :items="names" label="Person" v-model="name"></v-select>
          </v-flex>
          <v-flex md6 xs12>
            <v-select dark :items="groups" label="Group" v-model="group"></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md12 xs12>
            <v-textarea outline dark label="Message to send" v-model="message"></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md6 xs12>
            <v-select dark :items="colors" label="Message Color" v-model="color"></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>

    <v-card-actions class="mt-0 pt-0">
      <v-btn color="green" dark @click="sendMessage()">Send Message To User</v-btn>
      <v-btn color="purple" dark @click="sendMessage(true)">Send Message To Group</v-btn>
    </v-card-actions>
  </v-card>
</template>
```

[02:03] Here we have a select for selecting usernames, another one for selecting groups.

```html
<v-layout row wrap>
    <v-flex md6 xs12 class="pr-2">
        <v-select dark :items="names" label="Person" v-model="name"></v-select>
    </v-flex>
    <v-flex md6 xs12>
        <v-select dark :items="groups" label="Group" v-model="group"></v-select>
    </v-flex>
</v-layout>
```

We have a text area for entering the message we want to send. We also have a select for selecting the color of the message that will be displayed. 

```html
<v-layout row wrap>
    <v-flex md12 xs12>
        <v-textarea outline dark label="Message to send" v-model="message"></v-textarea>
    </v-flex>
</v-layout>
<v-layout row wrap>
    <v-flex md6 xs12>
        <v-select dark :items="colors" label="Message Color" v-model="color"></v-select>
    </v-flex>
</v-layout>
```

We have a `sendMessage` function which we'll write in a second and we can call the same with a parameter to indicate whether we're sending it to a `group` or a `user`.

```html
<v-card-actions class="mt-0 pt-0">
    <v-btn color="green" dark @click="sendMessage()">Send Message To User</v-btn>
    <v-btn color="purple" dark @click="sendMessage(true)">Send Message To Group</v-btn>
</v-card-actions>
```

[02:29] Let's now add our `script` block. We're going to start with the `data` block. These will add our reactive properties. We're going to set the `message` we're going to send to a default to be a blank string initially. We're also going to define our `groups`. These will be selected from the select.

[02:55] We're also going to define our list of `names`. These are the individual users that may potentially log in. Define an array of `colors`, and these colors match Vuetify CSS names so that will change the color of the popup message.

[03:12] Our initial `name` will be blank as will our `group` and our default `color` will be `red`. 

```html
<script>
export default {
  data: () => ({
    message: "",
    groups: ["Alpha", "Beta", "Charlie"],
    names: ["John Adams", "Judy Mason", "Amy Smith", "Jack White"],
    colors: ["red", "pink", "purple", "black"],
    name: "",
    group: "",
    color: "red"
  }),
}
</script>
```

We now need to add our `methods`. We actually only need one method for this. We're going to call it `sendMessage`. We're going to reuse this method depending on if we send it to a `user` or `group`.

[03:33] By default we're going to say `send_to_group` equals `false`. Then we're going to create a new object called `message_data` and this will be the payload that we're going to be sending via the socket to the server.

```javascript
  methods: {
    sendMessage(send_to_group = false) {
      const message_data = {};
    }
  }
```

[03:47] If `send_to_group` is `true`, we're going to set a new property called `group` on our object and we'll bind this to the `group` that's been selected in the Vue component. `else` we're going to create a new property called `name`, and yes you've guessed it, we're going to bind this to the selected `name` for the Vue component.

```javascript
  methods: {
    sendMessage(send_to_group = false) {
      const message_data = {};
      if (send_to_group) {
        message_data.group = this.group;
      } else {
        message_data.name = this.name;
      }
    }
  }
```

[04:05] We also set the `color` property which comes from the Vue component and the `message` that we're actually going to send. 

```javascript
  methods: {
    sendMessage(send_to_group = false) {
      const message_data = {};
      if (send_to_group) {
        message_data.group = this.group;
      } else {
        message_data.name = this.name;
      }
      message_data.color = this.color;
      message_data.message = this.message;
    }
  }
```

Finally, we use the `$socket` object which is available to us because we installed the vue-socket.io package and we `emit` a custom event called `SEND_MESSAGE` along with the `message_data` object as its payload. This then will be received on our socket server.

```javascript
  methods: {
    sendMessage(send_to_group = false) {
      const message_data = {};
      if (send_to_group) {
        message_data.group = this.group;
      } else {
        message_data.name = this.name;
      }
      message_data.color = this.color;
      message_data.message = this.message;
      this.$socket.emit("SEND_MESSAGE", message_data);
    }
  }
```

[04:33] We're going to update the `App.vue` file to include our new `ComposeMessage` component. The first thing we're going to do is `import` it. Then we're going to include it within our `components` block.

[04:55] You'll notice that the `PopupMessage` component is here as well. This is what we'll be using the display the message. Finally, we're going to include the `ComposeMessage` component within our actual Vuetify layout.

### App.vue
```html

<template>
  <v-app>
    <v-toolbar dark fixed app>
      <v-icon>speaker_phone</v-icon>
      <v-toolbar-title>Power Vuejs using Socket.io</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout row mb-4>
          <v-flex class="mx-1">
            <UserProfile></UserProfile>
           </v-flex>
           <v-flex>
            <ComposeMessage></ComposeMessage> 
           </v-flex>  
        </v-layout>
      </v-container>
    </v-content>
    <v-footer dark></v-footer>
    <PopupMessage></PopupMessage>
  </v-app>
</template>

<script>
import PopupMessage from "@/components/PopupMessage";
import UserProfile from "@/components/UserProfile";
import ComposeMessage from "@/components/ComposeMessage";
export default {
  components: {
    PopupMessage,
    UserProfile,
    ComposeMessage
  }
};
</script>
```

[05:10] Let's have a look and see what it looks like. Using the `npm run serve`, we can start our Vue development server. Here we have our browser open and the left hand side has the user profile which was our original `UserProfile` component from the previous lesson. On the right hand side we have our new `ComposeMessage` component to send the message.

[05:35] I've updated and selected myself as Judy Mason. I'm now going to send a test message in effect to myself. I'm going to make sure I select a `black` one to start with.

[05:47] I'll send the message and up pops the notification at the top. 

![Judy Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025886/transcript-images/06_egghead-build-a-vue-component-to-send-a-message-to-specific-users-using-socket-io-judy-test.jpg)

We change the color and we're going to change the message. We send the message again and again the snack bar component has displayed the message.

![Second Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025884/transcript-images/06_egghead-build-a-vue-component-to-send-a-message-to-specific-users-using-socket-io-judy-2nd-test.jpg)

[06:02] We now have three browsers open. It's a bit crowded. I'm going to change this particular browser screen to `John Adams` and he's going to be a member of the `Alpha` group. This browser down here, we're going to set that person to be `Amy Smith`. Again, `Alpha` group, and update that user profile. Then finally what we're going to do is send a message to everyone in the `Alpha` group.

![Alpha Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025887/transcript-images/06_egghead-build-a-vue-component-to-send-a-message-to-specific-users-using-socket-io-alpha-test.jpg)

[06:30] There we can see the snack bar message has appeared to everyone in the `Alpha` group at the same time. I'm now going to send a message directly to Amy, so only Amy should get this message. A snack bar has appeared just for Amy. We're going to do that again, change the color, and a snack bar has appeared again.

![Test to Amy](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025887/transcript-images/06_egghead-build-a-vue-component-to-send-a-message-to-specific-users-using-socket-io-amy.jpg)

[06:55] For reference, here is the socket server console and we can see where various users are `connected`. Users have been updated. Then where a `POPUP_NOTIFICATION` has been triggered. Where the `POPUP_NOTIFICATION` is for `Alpha`, that's a group. Where it's for the socket id, that's an individual user.

![Server Console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025889/transcript-images/06_egghead-build-a-vue-component-to-send-a-message-to-specific-users-using-socket-io-console-log.jpg)