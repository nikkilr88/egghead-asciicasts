Instructor: 00:00 After creating a new project with a `vue-cli`, just go ahead and npm install `rxjs` and `vue-rx`. 

#### Terminal
```js
$ npm i rxjs vue-rx
```

Then, we can simply `import Rx from "rxjs"`, `import VueRx from "vue-rx"`, tell vue to `use` `VueRx`, and provide `Rx` as the library.

#### main.js
```js
import Rx from "rxjs"
import VueRx from "vue-rx"

Vue.use(VueRx, Rx)
```

00:25 These lines are all the configuration you need, and additional capabilities are added to your components. In here, we can create a subscriptions object and create an `interval$` property. Dollar signs, `$`, are a standard naming conventions for naming streams.

00:44 We'll import `Observable` from RxJS and set the value to `Observable.interval` with a time of one second. 

#### App.vue
```html
<template>
  <section>
    <h1>vue-rx lessons</h1>
  </section>
</template>

<script>
import { Observable } from "rxjs"

export default {
  subscriptions: {
    interval$: Observable.interval(1000)
  }
}
</script>
```

Then we can simply render out this `interval$`. Here, so use the `{{interval$}}`, hit save, and you'll see an interval counting up from zero and changing every second.

```html
<template>
  <section>
    <h1>{{interval$}}</h1>
  </section>
</template>
```

01:07 To give myself a couple components and some CSS to work with, I'm going to install `bueify` as well. 

#### Terminal
```bash
$ npm i buefy
```

I'll import the `buefy` style sheet, so import `buefy/lib/buefy.css`. Then I'll `import Buefy from "buefy"`, and I'll `use` buefy here as well. 

#### main.js
```js

import Buefy from "buefy"

Vue.use(Buefy)
```

This will simply give us some default styling and some components to use as we write our code.