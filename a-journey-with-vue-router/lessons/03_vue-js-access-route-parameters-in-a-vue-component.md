Instructor: [00:02] We'll start by adding a parameter to our URL navigation, in this case, `id`. We'll go to the component `Blog.vue` and access that parameter directly in the template using `this.$route.params.id`. **If we append our URL with a `/1234`, that acts as the ID and it appears in our view**.

#### main.js

```js
const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/blog:id',
    component: Blog,
  }, {
    path: '/egghead',
    component: Egghead
  }
]
```

#### Blog.vue

```
<template>
  <div id="blog">
    <h1>This is blog number {{this.$route.params.id}}</h1>
  </div>
</template>
```

[00:34] Alternatively, we can access this ID through a JavaScript function. We'll call it `id` and return the same information as before. **Now, we can access the ID using `id` that corresponds to the function name**. If we refresh, it's still in our view.

#### Blog.vue

```js
<script>
  export default {
    name: "blog",
    computed: {
      id() {
        return this.$route.params.id
      }
    }
  };
</script>
```

```html
<template>
  <div id="blog">
    <h1>This is blog number {{id}}</h1>
  </div>
</template>
```

[00:59] Our final option is to head to the route record `main.js` and **set `props` to `true`. Now, our param is set as a prop that gets passed into our component**. We can set `props` so that `id` is the keyword that we're accessing. Using the same template property, we can refresh.

#### main.js

```js
const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/blog:id',
    component: Blog,
    props: true
  }, {
    path: '/egghead',
    component: Egghead
  }
]
```

#### Blog.vue

```js
<script>
  export default {
    name: "blog",
    props: ["id"]
  };
</script>
```

[01:24] We'll see `1234` appear as our ID on our page. **These are three different ways to accomplish the same thing**.
