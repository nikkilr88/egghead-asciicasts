Instructor: [00:01] Begin by installing `vue-router` using npm. **We'll use the save flag to automatically add it to our package.json**.

#### Terminal

```
npm install --save vue-router
```

[00:12] Now, we'll run our Vue application using the command `npm run serve`. As we can see, our application is running.

#### Terminal

```
npm run serve
```

[00:33] In our `main.js` file, we're going to `import VueRouter from 'vue-router'`. Next, we'll add `vue-router` to our Vue application with the `Vue.use` function. We'll create an array of routes that we'll leave empty for the moment.

#### main.js

```js
import VueRouter from 'vue-router'
```

```js
Vue.use(VueRouter)
```

[00:56] We'll create a new router as an instance of `vue-router`. In it, we'll add our routes array and we'll set the mode to `history`. Finally, we'll add our router to our Vue application. **In order to see our routing, we need to use the `<router-vue>` tag which will act as the window in which all of our route components appear**.
  
#### main.js

```js
const routes = []

const router = new VueRouter({
  routes,
  mode: 'history'
})
```

```js
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
```

#### App.vue

```
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```

[01:32] We'll start by creating a route record, which is an object. **It requires a path and a component**. In this case, we'll set our path to `/` and we'll use our `Home` component, which we need to import from a pre-existing component page that we've already created.

#### main.js

```js
const routes = [
  {
    path: '/',
    component: Home
  }
]
```

```js
import Home from './components/Home'
```

[01:58] When we refresh, we see that our `/` path navigates us to our home page, which appears inside the window of the `<router-vue>` tag we added to our `App.vue` file.
