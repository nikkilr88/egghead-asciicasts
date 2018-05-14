Instructor: 00:00 Streams often start with events. I'm going to create a button with class of `<button>` and say click, and then say whenever we click, we'll fire off a `click$` stream, but the syntax, instead of this `@`, is going to be `v-stream:click`. 

#### App.vue
```html
<template>
  <section class="section">
    <button class="button" v-stream:click="click$">Click</button>
    <h1 class="title">{{message$}}</h1>
  </section>
</template>
```

This will automatically set up a stream for us, as long as we define a `domStreams` array that lists `click$` as a stream we can access.

00:27 Now I have `this.click$` available to me, because this is listed here, and it's triggered here. I can create a `random$` number, and just say `random$` is coming from `this.click$` and mapping to a `Math.random`. Every time we click that, we're going to return a random value, and this `random$` stream is going to stream values into here. We'll hit save, start clicking, and you'll see random numbers show up.

```html
<template>
  <section class="section">
    <button class="button" v-stream:click="click$">Click</button>
    <h1 class="title">{{random$}}</h1>
  </section>
</template>

<script>
import { Observable } from "rxjs"

export default {
  domStreams: ["click$"],
  subscriptions() {
    const random$ = this.click$.map(() =>
      Math.random()
    )

    return {
      random$
    }
  }
}
</script>
```