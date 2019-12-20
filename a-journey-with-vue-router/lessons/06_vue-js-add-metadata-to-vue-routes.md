Instructor: [0:00] We're going to add more information for our route records to carry. **We'll use the `meta` keyword and set a new object which will include `requiresAuth` is `false`**. We can take this same information and add it to another route. In this case, we'll add it to `/egghead`, but we'll set `requiresAuth` to `true`.

#### main.js

```js
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: false
    }
  }
  ...
  {
    path: '/egghead',
    component: Egghead,
     meta: {
      requiresAuth: true
    }
  }
]
```

[0:28] If we navigate to our `Home` component, we'll see that we can access this information in the component itself. **This will be similar to the way that we access params**. In the template, we'll use `this.$route.meta.requiresAuth`. If we refresh our page and navigate to `/home`, we'll see that it shows up on our view.

#### Home.vue

```html
<template>
  <div id="home">
    <h1>Home Page {{this.$route.meta.requiresAuth}}</h1>
  </div>
</template>
```

[1:02] Alternatively, we can access this through JavaScript. **As before, with our params, we'll create a function that will return the same information that we put in our template**. Now, we'll access that information using the function name `requiresAuth`, and that's it.

#### Home.vue

```js
<script>
  export default {
    name: "home",
    computed: {
      requiresAuth() {
        return this.$route.meta.requiresAuth
      }
    }
  };
</script>
```

```html
<template>
  <div id="home">
    <h1>Home Page {{requiresAuth}}</h1>
  </div>
</template>
```
