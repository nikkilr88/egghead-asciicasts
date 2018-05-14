Instructor: 00:00 Now, instead of directly loading the person.

#### App.vue
```js
const people$ = Observable.from(
      this.$http.get(
        "https://starwars.egghead.training/people/1"
      )
    ).pluck("data", "name")
```

Let's click and then load it. The way that we do that is by, instead of mapping, we do what's called a `switchMap`, and the switch map takes a function and returns an observable. I'm going to return the observable of `people$`.

00:17 Instead of calling this `random$`, let's call it something like `luke$`, because that's who it's going to load. We'll put in Luke here, and make sure that Luke shows up here. 

```html
<template>
  <section class="section">
    <button class="button" v-stream:click="click$">Click</button>
    <h1 class="title">{{luke$}}</h1>
  </section>
</template>

<script>
import { Observable } from "rxjs"

export default {
  domStreams: ["click$"],
  subscriptions() {
    const people$ = Observable.from(
      this.$http.get(
        "https://starwars.egghead.training/people/1"
      )
    ).pluck("data", "name")

    const luke$ = this.click$.switchMap(
      () => people$
    )

    return {
      luke$
    }
  }
}
</script>
```

Now, when I click on this button, you'll see that `Luke Skywalker` loads in. If I change this to a 2 (https://starwars.egghead.training/people/2),  it won't load Luke anymore.

00:38 Instead, when I click, it'll load `C-3PO`. But we'll go ahead and keep that one for now. I'll click and load in Luke.