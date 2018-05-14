Instructor: 00:00 You'll notice on the initial page load, if I refresh here, you will see that it automatically loads in this Luke Skywalker data even though I haven't clicked anything yet. That's because my promise here is being invoked and executing even though I haven't clicked, because this function is executed inside of this observable.

#### App.vue
```js
const person$ = Observable.from(
  this.$http.get(
    "https://starwars.egghead.training/people/1"
  )
).pluck("data")
```

00:19 The way to defer that is I'll extract this and just call it `url`. Then say this `url` is an argument, which returns an observable. That means that, instead of this being a stream, this would be a function which I'll name `createLoader`. This can be `createLoader`, and then I could paste the URL in there. You'll see, when I click, everything loads fine.

```js
const createLoader = url =>
  Observable.from(this.$http.get(url)).pluck(
    "data"
  )

const luke$ = this.click$.switchMap(() => 
  createLoader(
    "https://starwars.egghead.training/people/1"
  )
)
```

00:42 Rather than pasting it in there, what I want to do is extract it even further up. I'll say URL, and then the `switchMap` will take URL, because I'll want to map these clicks to that URL. Now if you look at it, I'll click, and that maps to a string. That string is passed to a `switchMap`, which creates the loader.

01:04 I'll click, and then it loads in just fine, because this function takes one argument, there's one argument there, and it's passed in there. We can even delete this here, delete this here, make sure that's closed off, and click. 

```js
const luke$ = this.click$
.mapTo(
  "https://starwars.egghead.training/people/1"
)
.switchMap(createLoader)
```

Everything works the exact same way. Now when we open up the network tools, when I refresh, you won't see any initial request for that data, because it's not loaded until you click.