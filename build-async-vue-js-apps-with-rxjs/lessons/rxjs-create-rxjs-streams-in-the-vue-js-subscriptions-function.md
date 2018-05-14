nstructor: 00:00 rather than using a `subscription`'s object, it's more common to use a `subscription`'s function. The function returns an object with those streams on it. If I create another `interval$` here and say this is `Observable.interval` of one second, then I can create a `timesTwo$`, which is interval and mapped to that value `timesTwo$`.

#### App.vue
```html
<script>
import { Observable } from "rxjs"

export default {
  subscriptions() {
    const interval$ = Observable.interval(1000)

    const timesTwo$ = interval$.map(i => i * 2)
    return {}
  }
}
</script>
```

00:28 We'll duplicate this line and create a `timesThree$`, which is the same but `timesThree$`. Then, I can return an object with both of these on there, so times two and `timesThree$` and render them both out. Instead of `message$`, we'll render out times two and `timesThree$`.

```html
<template>
  <section class="section">
    <h1 class="title">{{timesTwo$}}</h1>
    <h1 class="title">{{timesThree$}}</h1>
  </section>
</template>

<script>
import { Observable } from "rxjs"

export default {
  subscriptions() {
    const interval$ = Observable.interval(1000)

    const timesTwo$ = interval$.map(i => i * 2)
    const timesThree$ = interval$.map(i => i * 3)
    return {
      timesTwo$,
      timesThree$
    }
  }
}
</script>
```

00:50 Hit Save here, and you'll see these will update by twos and threes because we have a function returning an object with multiple streams on it...