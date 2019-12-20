Instructor: [00:00] By default, socket.io will give each user a unique identifier, as you can see here with the four connected clients. 

![4 Clients Connected](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025886/transcript-images/05_egghead-mapping-a-socket-io-id-to-a-known-user-using-an-example-vue-component-4-clients.jpg)

That's OK if you wanted to broadcast a message to all the clients at the same time with the same message, but more often than not, you want to target either an individual user or groups of users.

[00:18] To handle this, we need to update our server code. We're going to update the `io.js` file, which we produced in a previous lesson. I'm going to maintain a new memory map of known users against the socket.io identifier.

[00:32] We'll have a map of `users`. In addition, we're going to have another map, which will be keyed on the ID. We do this for speed of looking up a user, either by the username or by the Socket ID. When the client connects to the socket server, you may not know who they are yet. You may need to wait until they log in, or some other method.

### io.js
```javascript
const users = new Map();
const ids = new Map();
```

[00:55] What we need is a new custom event that's tied to this specific socket. This isn't a global event. This is unique to this connected client. We will use the `socket.on` method. We pass it a custom event name. In this case, we're going to have `UPDATE_USER`. The client is going to send us an object with a `name` property and a `group` property. To help us with debugging, I'm going to log out the `name`.

```javascript
exports.initialize = function (server) {
  io = sio(server);
  io.on('connection', (socket) => {
    logger.debug(`A user connected with ${socket.id}`);

    socket.on('UPDATE_USER', function (data) {
      logger.debug(`UPDATE_USER triggered for ${data.name}`)
    });

  })
};
```

[01:22] Now we can set our `users` map, and we're going to key on the `name` of the user. We're also going to include the `socket.id`, and then we'll use the rest syntax to populate the rest of the `data` properties.

```javascript
    socket.on('UPDATE_USER', function (data) {
      logger.debug(`UPDATE_USER triggered for ${data.name}`)
      
      // Map Socket ID with a User
      users.set(data.name, {
        socket_id: socket.id,
        ...data
      });
    });
```

[01:34] We're also now going to update the `ids` map. Again, this is just for speed if we're looking up based on a `socket.id`.

```javascript
    socket.on('UPDATE_USER', function (data) {
      logger.debug(`UPDATE_USER triggered for ${data.name}`)
      
      // Map Socket ID with a User
      users.set(data.name, {
        socket_id: socket.id,
        ...data
      });

      ids.set(socket.id, data);
    });
```

[01:40] Finally, we're going to use an inbuilt socket.io method called `join`. This allows you to group individuals and therefore target them in one go for any messages. We're going to use the `group` name that's been sent from the client.

```javascript
    socket.on('UPDATE_USER', function (data) {
      logger.debug(`UPDATE_USER triggered for ${data.name}`)
      
      // Map Socket ID with a User
      users.set(data.name, {
        socket_id: socket.id,
        ...data
      });

      ids.set(socket.id, data);
      // Also join a room / group - inbuilt socket functionality
      socket.join(data.group);
    });
```

[01:53] Let's now look at the client side. So opening up our Vue application, we're going to add a new component, and we're going to call this `UserProfile`. Let's start with the `template` for this component.

[02:06] I have some template code I've already created in the clipboard, so I'll just paste that in. 

### UserProfile
```html
<template>
  <v-card color="blue-grey darken-2" class="mx-auto white--text">
    <v-card-title primary-title>
      <v-icon large left dark>portrait</v-icon>
      <div class="title font-weight-light text-md-left">
        User Profile
        <div class="caption text-md-right">{{socket_id}}</div>
      </div>
      <v-container>
        <v-layout row wrap>
          <v-flex md6 xs12 class="pr-2">
            <v-select dark :items="names" label="Person" v-model="name"></v-select>
          </v-flex>
          <v-flex md6 xs12>
            <v-select dark :items="items" label="Group" v-model="group"></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>

    <v-card-actions>
      <v-btn color="orange" dark @click="saveUserDetails()">Update</v-btn>
    </v-card-actions>
  </v-card>
</template>
```

This component is going to be used to allow the user to define who they are. They're going to select their `name` and also what `group` they're a member of.

[02:19] Normally in your application, you'd already know who they are by the fact that they've logged in, but for our lesson, we're going to be using this component to allow the user to say who they are. We've got a new method here called `saveUserDetails`. Let's build out the `script` area.

[02:35] Let's start with our `data` block. We're going to have a hard-coded list of groups that the user can select from. To make things slightly easier, we're also going to have a hard-coded list of `names` that they will select from.

[02:48] We'll set the default `name` value to be blank, the default selected `group` to be blank. We're also going to show the current `socket_id`. Let me add `export default` before I forget.

```javascript
<script>
export default {
  data: () => ({
    items: ["Alpha", "Beta", "Charlie"],
    names: ["John Adams", "Judy Mason", "Amy Smith", "Jack White"],
    name: "",
    group: "",
    socket_id: ""
  })
};
</script>
```

[03:01] Now we want to add the `methods` for our component. There are three methods we want to use. The first one is going to be sending the user details to our socket server. We're going to be sending an object called `user_data`. The `name` is going to be coming from our `data`, as will the `group`.

```javascript
<script>
export default {
  methods: {
    sendUserDetails() {
      const user_data = {};
      user_data.name = this.name;
      user_data.group = this.group;
    },
  }
};
</script>
```

[03:23] We now need to get the data to our socket server. We're going to use something called `$socket`. This is available to us because we installed the [vue-socket.io](https://github.com/MetinSeylan/Vue-Socket.io) package. It has a method called `emit`. We're going to use the same custom event name that we defined on our socket server, and it's going to be called `UPDATE_USER`. Its payload is going to be the object.

```javascript
<script>
export default {
  methods: {
    sendUserDetails() {
      const user_data = {};
      user_data.name = this.name;
      user_data.group = this.group;
      this.$socket.emit("UPDATE_USER", user_data);
    },
  }
};
</script>
```

[03:48] The next two methods are used to store in the local `sessionStorage` what's the username and `group` the user selected. This means if the browser is refreshed, they don't have to reselect. I'm going to start with a method called `saveUserDetails`. We'll be using the `sessionStorage`. If the browser is closed, this information will be lost.

```javascript
saveUserDetails() {
    sessionStorage.name = this.name;
    sessionStorage.group = this.group;
    this.sendUserDetails();
},
```

[04:11] The last thing to do is call our `sendUserDetails` function. The sequence of events will be save it then send it.

[04:20] The last method will be called when the socket is first connected to the server and we check to see if we have any `name` and `group` within our `sessionStorage`. We're going to call this one `readLocalUser`, and we're just going to set the data properties for any values stored in the local `sessionStorage`. If we have any values, we're going to then send them to the server.

```javascript
readLocalUser() {
    this.name = sessionStorage.name;
     this.group = sessionStorage.group;
    if (this.name || this.group){
        this.sendUserDetails();
    }
}
```

[04:44] We're now going to include the `sockets` block, which is given to us by the vue-socket.io package. We're going to be listening for the inbuilt standard event `connect`. This means we are connected to our socket server, and we can then send on our data with the `socket.id`, which we can then display.

[05:04] This is available to us from the `$socket` object. At the same time, once we're connected, we can then `readLocalUser` if we have any values, which then in turn we'll send back to the socket server the selected user.

```javascript
sockets: {
    connect: function(){
        this.socket_id = this.$socket.id;
        this.readLocalUser();
    }
}, 
```

[05:19] To be able to test this component, we now need to just wire it up into our `App.vue` file. If we go in there, we `import` it first, add a reference inside our component's block, and add the component within our layout container.

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
export default {
  components: {
    PopupMessage,
    UserProfile
  }
};
</script>
```


[05:37] We can go ahead and test this component now. To test this component, we're going to use the Vue CLI development server. We say `npm run serve`.

[05:52] I have my Express socket server on the right-hand side -- it's not running yet -- and an open browser. I'm going to go to my Vue development server, which is `localhost:8080`. My new component now is displayed.

![User Profile](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025883/transcript-images/05_egghead-mapping-a-socket-io-id-to-a-known-user-using-an-example-vue-component-user-profile.jpg)

[06:06] There is no socket displayed yet, but if I start my socket server, the `connect` event fires, we get given an ID, which appears here, and is now updated on the socket server itself. 

![Client Connected](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025886/transcript-images/05_egghead-mapping-a-socket-io-id-to-a-known-user-using-an-example-vue-component-client-connected.jpg)

If I select a `Person` and a `Group`, click `UPDATE`, the socket event fires, and now the socket ID is associated with `John Adams`.

![John Adams](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025887/transcript-images/05_egghead-mapping-a-socket-io-id-to-a-known-user-using-an-example-vue-component-john-adams.jpg)

[06:28] If I refresh my browser, the local `sessionStorage` has been used to pick up my user profile information, has been reset on the component, and then sent to the server with the updated information. Within the development tools under `sessionStorage`, we can now see our group and our name being set.

![Session Storage](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025887/transcript-images/05_egghead-mapping-a-socket-io-id-to-a-known-user-using-an-example-vue-component-session-storage.jpg)

[06:51] To summarize, we have a Vue component with a method that's using the `$socket` object with an `emit` method, calling a custom event called `UPDATE_USER` with a payload of an object, which is containing a `name` and a `group`.

[07:09] Within the socket server, within our `io` file, we listen for the `UPDATE_USER` custom event on that specific subject. We get passed an object which contains a `name`, and the ID, and some other information, and we set it on a `map` called `users` and `ids`.

[07:30] Going back to the Vue component, we save the user details into `sessionStorage` and then when the actual Vue component is launched and connected, we attempt to read those values back into the component in case the browser is refreshed.
