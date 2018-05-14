Instructor: 00:00 now imagine that there's an error in our URL and our image fails to load. If I click here and you can see that the image fails to load in the console. 

You can actually handle that in an interesting way because image has an `error` event. I'm going to `v-stream` this in as an observable.

#### App.vue
```html
<template>
  <section class="section">
    <button class="button" v-stream:click="click$">Click</button>
    <h1 class="title">{{name$}}</h1>
    <img v-stream:error="imageError$" :src="image$" alt="">
  </section>
</template>
```

00:19 This domstream can be `imageError$`, and make sure to define it in our `domStreams`, so `imageError$`. 

```js
export default {
  domStreams: ["click$", "imageError$"],
  subscriptions() {
   ...
  }
}
```

Then, our `image` can be an observable merge of this stream and an `error$` stream. I'm going to extract this out real quick. I'll call this, `loadImage$` stream. Then, I want a `failImage$` stream, so I'll call this, `failImage$`.

```js
const loadImage$ = luke$
  .pluck("image")
  .map(
    image =>
      `https://starwars.egghead.training/${image}`
  )

const failImage$ = 
```

00:45 The `failImage$` is this `.imageError$` mapped to whatever image you want to provide as a default. I'm going to copy and paste a placeholder service. Now our `image$` stream becomes a merge, so `Observable.merge` of `loadImage$` and `failImage$`.

```js
const failImage$ = this.imageError$.mapTo(
  `http://via.placeholder.com/400x400`
)

const image$ = Observable.merge(
  loadImage$,
  failImage$
)
```

01:09 Now if I click, you see we get our image failure. It failed, and we handled it with a placeholder. If I put my proper URL back in and hit Save and click, it'll properly load the image...