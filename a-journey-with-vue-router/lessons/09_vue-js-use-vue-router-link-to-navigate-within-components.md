Instructor: [00:02] Vue has a tag built in called `router-link`, which can help with all of your router template needs.

[00:12] We'll start with the `router-link` and put an internal `<h3>` tag so that it will expand to meet the space of the text. **Now we want to add a `to` path, which is where this `router-link` will take us**. We'll send it to `/egghead`. If we refresh our page and click on the link, we'll go to our Egghead page.
  
#### Home.vue

```html
<template>
  <div id="home">
    <h1>Home Page</h1>
    <router-link :to="'/egghead'">
      <h3>go elsewhere</h3>
    </router-link>
  </div>
</template>
```

[00:46] If we want to change the styling of the `router-link`, there are many API options. `tag="button"` is one of them. Now our link appears as a button.

```html
<template>
  <div id="home">
    <h1>Home Page</h1>
    <router-link tag="button" :to="'/egghead'">
      <h3>go elsewhere</h3>
    </router-link>
  </div>
</template>
```

[01:00] If we want to navigate to blog and handle parameters in our navigation, we need to navigate using an object. We use the name that we've set for the blog route record, blog, and send `params` as another object with key `id` and a value of `1234`. If we click on the `router-link`, we see that we've successfully navigated to blog `1234`.

```html
<template>
  <div id="home">
    <h1>Home Page</h1>
    <router-link tag="button" :to="{name: 'blog', params: {id: 1234}}">
      <h3>go elsewhere</h3>
    </router-link>
  </div>
</template>
```
