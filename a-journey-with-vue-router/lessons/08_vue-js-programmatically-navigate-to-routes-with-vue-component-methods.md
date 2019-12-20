Instructor: [0:01] We'll start by navigating with a template button. We'll map this using the `onClick` to a function called `toEgghead`. We'll define the function as a method. Inside the function, we'll use JavaScript to access our router object, `this.$router`. Then, we can push a new route onto our router `/egghead`. If we refresh the page and click on the button, we'll be navigated to our egghead page.

#### Home.vue

```html
<template>
  <div id="home">
    <h1>Home Page</h1>
    <button v-on:click="toEgghead()"> Go elsewhere</button>
  </div>
</template>
```

```js
<script>
  export default {
    name: "home",
    methods: {
      toEgghead() {
        this.$router.push('/egghead')
      }
    }
  };
</script>
```

[0:54] Alternatively, we may want to access our blog page, which comes with an `id` parameter. Let's change our function to `toBlog`.

#### Home.vue

```html
<template>
  <div id="home">
    <h1>Home Page</h1>
    <button v-on:click="toBlog()"> Go elsewhere</button>
  </div>
</template>
```

```js
<script>
  export default {
    name: "home",
    methods: {
      toBlog() {
        this.$router.push('/egghead')
      }
    }
  };
</script>
```

[1:07] Now, instead of pushing `/egghead`, we'll push `/blog` with the argument `id`. We can set a constant that will pass in and set that `id` for us. In this case the constant will be `1234`. If we refresh and click again, we'll see that we navigated to `blog/1234`.

#### Home.vue

```js
<script>
  export default {
    name: "home",
    methods: {
      toBlog() {
        const id = 1234
        this.$router.push('/blog/$[id]')
      }
    }
  };
</script>
```

[1:42] **Alternatively, we can push an object onto our router array**. Let's try doing that with path blog and param ID. **If we try again, we realize that it doesn't work. This is because path and params can't be combined**. If we want to do it in this manner, we need a name on our route record.

#### Home.vue

```js
<script>
  export default {
    name: "home",
    methods: {
      toBlog() {
        const id = 1234
        this.$router.push({path: '/blog', params: {id: id}})
      }
    }
  };
</script>
```

[2:22] We'll call it blog. Now we can set `name` to `blog` and use params, and we'll navigate there successfully.

#### main.js

```js
const routes = [
  ...
  {
    path: '/blog:id',
    name: 'blog',
    component: Blog,
    children: [
      {path: '/guest', components: {
        first: GuestPost,
        second: Egghead
      }}
    ]
  }
  ...
]
```

#### Home.vue

```js
<script>
  export default {
    name: "home",
    methods: {
      toBlog() {
        const id = 1234
        this.$router.push({name: 'blog', params: {id: id}})
      }
    }
  };
</script>
```
