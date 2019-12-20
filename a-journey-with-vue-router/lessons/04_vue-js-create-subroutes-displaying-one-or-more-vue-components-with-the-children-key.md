Instructor: [00:03] We're going to start by importing a new component called `GuestPost` that will act as a sub-component on our page. **In order to add a sub-component to routing, we need to use the key `children` that takes an array**.

[00:22] Inside the array, we'll make an object, which is a new route record. This pattern follows the same one that we use for our parent routes array. We'll set the path to `guest` and the component to `GuestPost`. However, we won't see anything.

#### main.js

```js
const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/blog:id',
    component: Blog,
    children: [
      {path: 'guest', component: GuestPost}
    ]
  }, {
    path: '/egghead',
    component: Egghead
  }
]
```

[00:42] **That's because inside blog, we need a `router-view` tag that will act as a mapping to the sub navigation that we've created**. However, if we refresh the page, we still won't see anything. That's because our `path` is set to `guest`. We need to append `guest` to the URL.

#### Blog.vue

```html
<template>
  <div id="blog">
    <h1>This is blog number {{this.$route.params.id}}</h1>
    <router-view></router-view>
  </div>
</template>
```

[01:08] Alternatively, we can set our `path` to `/guest`. That means that we can access the sub navigation directly using guest instead of `blog/id/guest`. **If we remove the `path` entirely and go back to `blog/id`, we will always see a component rendered in our sub navigation by default**.

#### main.js

```js
const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/blog:id',
    component: Blog,
    children: [
      {path: '/guest', component: GuestPost}
    ]
  }, {
    path: '/egghead',
    component: Egghead
  }
]
```

[01:38] **We also have the ability to use multiple sub navigation components at the same time**. We'll add another `router-view` and set the `name` to `second`. If we go back to our navigation, we have to change our route record to render `components` instead of `component`. `components` is a key and the value is an object.

#### Blog.vue

```
<template>
  <div id="blog">
    <h1>This is blog number {{this.$route.params.id}}</h1>
    <router-view></router-view>
    <router-view name="second"></router-view>
  </div>
</template>
```

[02:07] The first component that we want to render is `default` in our unnamed component. We'll set that to `GuestPost`. The second is using the term `second` because that's what we've set as our `name`. Now we see both sub navigations.

#### main.js

```js
const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/blog:id',
    component: Blog,
    children: [
      {path: '/guest', components: {
        default: GuestPost,
        second: Egghead
      }}
    ]
  }, {
    path: '/egghead',
    component: Egghead
  }
]
```

[02:27] If we to go to the first router view and give that a `name` as well, we no longer have the term `default`. We'll replace that with the key `first`. There we have it, we now have sub navigation.

#### Blog.vue

```html
<template>
  <div id="blog">
    <h1>This is blog number {{this.$route.params.id}}</h1>
    <router-view name="first"></router-view>
    <router-view name="second"></router-view>
  </div>
</template>
```

#### main.js

```js
const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/blog:id',
    component: Blog,
    children: [
      {path: '/guest', components: {
        first: GuestPost,
        second: Egghead
      }}
    ]
  }, {
    path: '/egghead',
    component: Egghead
  }
]
```
