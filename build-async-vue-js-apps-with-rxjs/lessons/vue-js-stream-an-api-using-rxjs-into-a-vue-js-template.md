Instructor: 00:06 I'm also going to install `axios`, and `vue-axios`. 

#### Terminal
```bash
npm i axios vue-axios
```

I can configure these by importing `axios` from axios, and importing `VueAxios` from `vue-axios`, and telling vue to `use` `VueAxios` and provide `axios`.

#### main.js
```js
import VueAxios from "vue-axios"

Vue.use(VueAxios, axios)
```

00:20 This simply gives me on my components and HTTP service to make the request that I need. Let me start with a stream called `people$`, and say this is `Observable.from(this.$http)`, `$http` and `get`, and the data I want to get is `"https://starwars.egghead.training/people/1"`.

#### App.vue
```html
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

    const random$ = this.click$.map(() =>
      Math.random()
    )

    return {
      random$,
      people$
    }
  }
}
</script>
```

00:49 All I have to do is add this `people$` to a returned value here that I can render out people.

```html
<template>
  <section class="section">
    <button class="button" v-stream:click="click$">Click</button>
    <h1 class="title">{{people$}}</h1>
  </section>
</template>
```

Hit save, and you'll see the response is all of this, and what I really want off of this is the data.

#### Request Response
```json
{"data":
  {
    "edited": "2014-12-20T21:17:56.891Z",
    "name": "Luke Skywalker",
    "created": "2014-12-09T13:50:51.644Z",
    "gender": "male",
    "skin_color": "fair",
    "hair_color": "blond",
    "height": "172",
    ...
  }
}
```

I can tell my stream to `pluck` the `data` off the response. 

```js
const people$ = Observable.from(
      this.$http.get(
        "https://starwars.egghead.training/people/1"
      )
    ).pluck("data")
```

Hit save, and you can see the data we have here.

```json
{
  "edited": "2014-12-20T21:17:56.891Z",
  "name": "Luke Skywalker",
  "created": "2014-12-09T13:50:51.644Z",
  "gender": "male",
  "skin_color": "fair",
  "hair_color": "blond",
  "height": "172",
  ...
}
```

01:16 Since what I really want is this `name`, I can do a comma name, hit save and you'll see `Luke Skywalker`. 

```js
const people$ = Observable.from(
      this.$http.get(
        "https://starwars.egghead.training/people/1"
      )
    ).pluck("data", "name")
```
```
Luke Skywalker
```

That's all from the stream `Observable.from`, and this is just `axios`, which is like fetch with a lot more features, this is returning a promise, we're wrapping the promise within observable, plucking the `data` may be off of it.

01:37 Then, we're passing this in to the return object, then simply rendering it up.