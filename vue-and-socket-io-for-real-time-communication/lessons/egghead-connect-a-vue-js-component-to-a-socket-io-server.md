Instructor: [00:01] For this lesson, we need a basic [Vue](https://vuejs.org/) application, which you can either create using the [Vue CLI](https://cli.vuejs.org/) or using the Vue UI. In addition, we're going to install two additional dependencies. We're going to use the [Vuetify](https://vuetifyjs.com/en/) material design component framework, and we're also going to make a reference to [vue-socket.io](https://github.com/MetinSeylan/Vue-Socket.io) package.

[00:24] I've opened my Vue project, and if I just go into the `package.json` to confirm I have installed `vue-socket.io` and Vuetify's dependencies. 

### package.json
```javascript
  "dependencies": {
    "vue": "^2.5.21",
    "vue-router": "^3.0.1",
    "vue-socket.io": "^3.0.4",
    "vuetify": "^1.4.1"
  },
```

Now, if I go into my `src/main.js`, I'm going to make a reference to the `vuetify` package and also a reference to the Vue Socket.IO package.

### main.js
```javascript
import Vue from "vue";
import App from "./App.vue";
// Vuetify Package
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
// VueSocketIO packagae
import VueSocketIO from "vue-socket.io";
```

[00:51] We're going to tell `Vue` to `use` `Vuetify` and also tell Vue to `use` the Vue Socket.IO package. The syntax for the socket.io package needs to pass in the connection for the socket.io server and whether you want to be debugging.

```javascript
Vue.use(Vuetify);
Vue.use(
  new VueSocketIO({})
);
```

[01:08] We're going to set `debug:  true`, and this will output more information to the browser console. The connection will be to our Express server, which we defined and set up in the previous lesson. It was running on `localhost:8500`.

```javascript
Vue.use(Vuetify);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:8500" // Local Express Server
  })
);
```

[01:27] That's it for the `main.js` file. We won't be touching this file again. Let's now open the `App.vue` file, which has been generated for us by the Vue CLI. We're going to get rid of all this and put our own markup in.

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
          <v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer dark></v-footer>
  </v-app>
</template>
```

[01:43] Initially, I've created a template using the Vuetify framework. If I start the Vue application now, I'll quickly show what that looks like.

![Basic layout](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025883/transcript-images/03_egghead-connect-a-vue-js-component-to-a-socket-io-server-basic-layout.jpg)

[01:56] As you can see, it's a very basic application layout that we're going to use. We're going to be putting components within this central section of this layout. This is an example of the Vue component we're going to build.

![Example Component](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025884/transcript-images/03_egghead-connect-a-vue-js-component-to-a-socket-io-server-example.jpg)

[02:09] Our socket.io server is emitting a random number, and we are going to use the Vuetify [sparkline](https://vuetifyjs.com/en/components/sparklines) component to graph it in real time. Let's see how we build it. To start with, we're going to create a `components` folder within our `src` directory.

[02:24] Within that folder, we'll create a new file called `Graph.vue`. This will be our graph component. To start with, I've got some markup I'm just going to paste in. This will be the Vuetify layout and components. This represents a card, and inside the card, we've got some information displayed, the heart rate.

[02:46] Then we've got the sparkline component itself. At the moment, this isn't hooked up to any sort of `data` or `socket`. 

### Graph.vue
```html
<template>
  <v-card class="mx-auto" color="grey lighten-4" max-width="400">
    <v-card-title>
      <v-icon :color="'red'" class="mr-5" size="64">favorite</v-icon>
      <v-layout column align-start>
        <div class="caption grey--text text-uppercase">Heart rate</div>
        <div>
          <span class="display-2 font-weight-black" v-text="display_beat || '—'"></span>
          <strong v-if="display_beat">BPM</strong>
        </div>
      </v-layout>
    </v-card-title>

    <v-sheet color="transparent">
      <v-sparkline
        :smooth="16"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="3"
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
    <v-card-actions></v-card-actions>
  </v-card>
</template>
```

Now, we can start with the script itself. We'll build our `script` block. We're going to start by holding inside our `data` block an array of `heartbeats`.

[03:05] This is what we're going to use to bind the graph. 

```javascript
<script>
export default {
  data: () => ({
    heartbeats: []
  })
};
</script>
```
Coming back up to the sparkline, and we can use the `value` property to bind to `heartbeats`. 

```html
<v-sparkline
        :smooth="16"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="3"
        :value="heartbeats"
        stroke-linecap="round"
></v-sparkline>
```
Now, I want my graph to have an initial array of 10 heartbeats, which we're going to display.

[03:26] This will be before we receive any data from the server. To do that, we will set up a couple of methods. This method, `random_heartbeat`, just generates a random number, similar to what the server did before. This method, `takeInitialPulse`, will populate our array with 10 random numbers.

```javascript
methods: {
    takeInitialPulse() {
      this.heartbeats = Array.from({ length: 10 }, this.random_heartbeat);
    },
    random_heartbeat() {
      return Math.ceil(Math.random() * (120 - 80) + 80);
    }
}
```

[03:47] We need to call the `takeInitialPulse` when our Vue component is first created. We'll hook into the `created` life cycle. 

```javascript
created() {
    this.takeInitialPulse();
}
```

We'll have a quick look and see what this component looks like in its current state.

![Initial Graph](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025883/transcript-images/03_egghead-connect-a-vue-js-component-to-a-socket-io-server-initial-graph.jpg)

[04:08] Here, we can see the component being populated with the initial 10 random values. If I refresh the page, we get 10 different values. We now want to get the data from our socket.io server into our component.

[04:20] We do that by first creating a block called `sockets`. Then we have a label which matches the custom event name. In our case, that's going to be `PULSE`. We have a function, and in that function then we have the value that's within the socket itself, that's being sent.

[04:37] We can take that value, and all we need to do then is `push` it into our `heartbeats` array. Heartbeats is reactive because it's within our data block, which means Vue will automatically update the graph with the new value.

[04:50] We also want to make sure that our array only has 10 values. We use the array.`shift` method. 

```javascript
sockets: {
    PULSE: function(beat) {
      this.heartbeats.push(beat);
      this.heartbeats.shift();
    }
},
```

Let's bring up our browser and see that work running. Here, we have our Node server, and you can see we've got our custom event being fired, called `PULSE`.

![Server Pulse](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025886/transcript-images/03_egghead-connect-a-vue-js-component-to-a-socket-io-server-server-pulse.jpg)

[05:07] If I start the server up, heartbeats gets sent. If I bring up my browser, which has my Vue component in there, we can see that the graph has been updated. 

![Graph Updated](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025884/transcript-images/03_egghead-connect-a-vue-js-component-to-a-socket-io-server-graph-updated.jpg)

The last step is to actually display the heart rate, so we'll do that now.

[05:22] We're going to add a new `computed` method, which is going to display the heartbeat.

```javascript
computed: {
    display_beat() {
      return this.heartbeats[this.heartbeats.length - 1];
    }
},
```
Then within the sparkline component, we can display it using the `key` property. 

```javascript
<v-sparkline
        :smooth="16"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="3"
        :key="String(display_beat)"
        :value="heartbeats"
        stroke-linecap="round"
></v-sparkline>
```

Let's now retest our component and see what it looks like.

[05:45] I've restarted my server, refreshed the Vue component page, and as you can see, we can now see the heartbeat being displayed. If I bring across another connected client, we can see that both graphs are now synchronized with their values.

![Sync Graphs](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025885/transcript-images/03_egghead-connect-a-vue-js-component-to-a-socket-io-server-sync-graph.jpg)

[06:01] In summary, the Socket server will start. It will emit a custom `PULSE` event with a value of `110`, in this case. The Vue single-file component will have a `sockets` block along with a `PULSE` function. It will take the `110` value and push it to the `heartbeats` array, which is contained within the `data` block.

[06:20] The `data` block is reactive, and the `sparkline` component is bound that `heartbeats` array. This means the graph will be automatically updated as the value from the Socket server is sent. 

![Summary 1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025885/transcript-images/03_egghead-connect-a-vue-js-component-to-a-socket-io-server-summary1.jpg)

Because it's a Socket server, all connected clients will receive the data at the same time.

![Summary 2](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562025884/transcript-images/03_egghead-connect-a-vue-js-component-to-a-socket-io-server-summary2.jpg)