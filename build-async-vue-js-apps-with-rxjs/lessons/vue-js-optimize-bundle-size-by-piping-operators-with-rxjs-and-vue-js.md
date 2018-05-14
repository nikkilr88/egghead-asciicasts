Instructor: 00:00 Instead of importing all of RxJS, I'm going to `import` just some pieces of it to save on some file size. I'm going to import `Observable`, `Subscription`, and `Subject` are the main pieces we'll need. Then, to configure vue-rx, we'll say vue.use vue-rx. Then, an object with observable, subscription, and subject.

#### main.js
```javascript
import {
  Observable,
  Subscription,
  Subject
} from "rxjs"

Vue.use(VueRx, {Observable, Subscription, Subject})
```

00:24 This will save on a lot of file size because our previous approach of importing all of Rx and just doing Rx like this included the entire library. To optimize, we pick and choose the things we need and leave out the things we don't.

00:37 The latest versions of our RxJS introduce pipeable operators, which let us pick out only the functions or methods we need to save even more on file size. For example, to rebuild our functionality in `App.vue`, the template is still intact. I'm just going to build out the `subscriptions` function again.

00:54 I can start with our `createLoader`, which takes the URL and will return an observable. Before it was `Observable.from`, but now it needs to be just `from`. 

#### App.vue
```javascript
subscriptions() {
  const createLoader = url => from 

}
```

We `import {from} from "rxjs"`. 

```javascript
import { from } from "rxjs"
```

We'll say `from(this.$http) `, which is Axios `.get(url)`.

01:19 Then, instead of `.pluck("data")` which we did before, now, we need to `.pipe` and then pass in `.pluck("data")` as a function that's piped through there. 

```javascript
subscriptions() {
  const createLoader = url => from(this.$http.get(url)).pipe(.pluck("data"))
}
```

We'll also need to `import {pluck}`, so import from RxJS/operators. We'll import pluck. 

```javascript
import { pluck } from "rxjs/operators"
```

We'll save there and let it reformat.

```javascript
subscriptions() {
  const createLoader = url => 
    from(this.$http.get(url)).pipe(
      .pluck("data")
    )
}
```
  
01:42 You'll notice that this was `Observable.from`, now it's just `from`. This used to be `.pluck`, and then you'd chain on other methods, but now it's `.pipe`. You pass in as many methods or operators as you're going to use.

01:54 Our `cache` will pretty much look the same. That's just an object. `cachePerson` just takes the `cache`, returns a function that takes the `url`, and then we return `cache[url]`. If that exists, we return `cache[url]`. Otherwise, we assign `cache[url]` to `createLoader` and return `url`.

```javascript
const cache = {}
const cachePerson = cache => url => {
  reutrn cache[url]
  ? cache[url]
  : (cache[url] = createLoader(url))
}
```

02:19 There's nothing new in that because that's all just JavaScript, so no imports needed. Then, our `people$` is going to be `createLoader` with the url `/people`, so nothing new there. I do need to start returning stuff, so return people. Let's save there.

```javascript
const people$ = createLoader(
  `https://starwars.egghead.training/people`
)

reutrn {
  people$
}
```

02:38 Now, we're returning the people stream, so you'll see that people start to show up. Now, our `activeTab$` stream is going to be `this.$watchAsObservable` as it was before. We'll watch `activeTab` and configure it to immediately fire, so `{immediate:true}`.

02:56 Now, instead of `.pluck`, we're doing the same thing where we do `.pipe`, then pass in pluck and we're plucking off the `"newValue"`. 

```Javascript
const adctiveTab$ = this.$watchAsObservable(
  "activeTab",
  { immediate: true } 
).pipe(pluck("newValue"))
```

Now, we'll create some streams off of active tab. One will be `person$`. Called this Luke before, I'm renaming it to person because that makes way more sense.

03:14 Before, this was `activeTab$.combineLatest`, but now these operators like `combineLatest` need to be creation operators where I'll import `combineLatest` from RxJS.

```javascript
import { from, combineLatest } from "rxjs"
```

Then come down here and I'll say `combineLatest` the `activeTab$` stream and the `people$` stream.

```javascript
const person$ = combineLatest(activeTab$, people$)
```

03:38 Before it was `activeTab.combineLatest`, now it's `combineLatest` and you pass an `activeTab$` and the `people$`. Then, I'll combine them with this function of `tabId` and `people`. Then, I'll say grab the `[tabId].id` of that person. Let that reformat.

```javascript
const person$ = combineLatest(
  activeTab$, 
  people$,
  (tabId, people) => people[tabId].id
)
```

03:55 Then, before, we `map` this to a URL, but now we need to `pipe` it and then we'll `map` in here which we need to `import` from our list of operators. 

```javascript
import { pluck, map } from "rxjs/operators"
```

Map and come back down and we're mapping this people `id` to the `url`.

```javascript
const person$ = combineLatest(
  activeTab$, 
  people$,
  (tabId, people) => people[tabId].id
).pipe(
  map(id => `https://starwars.egghead.training/people/${id}`
  )
)
```

04:19 Then, instead of `.switchMap`, we're going to `,switchMap`. We'll need to `import` `switchMap` as an operator as well. 

```javascript
import { pluck, map, switchMap } from "rxjs/operators"
```

Come on down and we're switch mapping to `cachePerson` and passing in the `cache`. Then, the last one would have been `.catch`, but now since it's a standalone operator, it's been renamed to `catchError`.

04:43 I'll go ahead and scroll up to that and `import` `catchError`. 

```javascript
import { pluck, map, switchMap, catchError } from "rxjs/operators"
```

Scroll back down and `catchError`, which takes the `err` and returns an observable. We'll just return `createLoader()` and we'll just return the second person in case anything went wrong.

```javascript
const person$ = combineLatest(
  activeTab$, 
  people$,
  (tabId, people) => people[tabId].id
).pipe(
  map(id => `https://starwars.egghead.training/people/${id}`),
  switchMap(cachePerson(cache)),
  catchError(err => createLoader(`https://starwars.egghead.training/people/2`))
  )
)
```

05:07 You obviously could return whatever data you wanted for that. Then, instead of `.share`, we are going to `, share` and `import` the `share` operator. 

```javascript
const person$ = combineLatest(
  activeTab$, 
  people$,
  (tabId, people) => people[tabId].id
).pipe(
  map(id => `https://starwars.egghead.training/people/${id}`),
  switchMap(cachePerson(cache)),
  catchError(err => createLoader(`https://starwars.egghead.training/people/2`)),
  share()
  )
)
```

Scroll back up, `import` `share`. We'll hit Save there.

```javascript
import { pluck, map, switchMap, catchError, share } from "rxjs/operators"
```

05:26 Now, with our person stream, we can grab our `name` and our `image`. The name was a simple one because it was just `const name` is the `person$` stream. We'll `pipe` and `pluck` `"name"` and we'll `return name`. 

```javascript
const name$ = person$.pipe(pluck("name"))

return {
  people$, name$
}
```

Hit Save. You can see we got Luke down here. I'll click here. It's C3PO, R2D2, and Luke.

![Name in bold](../images/vue-js-optimize-bundle-size-by-piping-operators-with-rxjs-and-vue-js-name-in-bold.png)

05:49 Then, our `loadImage$` stream was `person$` and, again, `pipe` and `pluck` `image`, and then, `map`. We've already imported those. Map `image` to where the images are hosted, `starwars.egghead.training/${image}`.


```javascript
const loadImage$ = person$.pipe(
  pluck("image"),
  map(image => `starwars.egghead.training/${image}`)
)
```

06:11 Then, the `failImage$` is `this.imageError$.pipe`. We'll just `mapTo`, and this is just the placeholder service `400x400`. 

```javascript
const failImage$ = this.imageError$.pipe(
  mapTo(`http://via.placeholder.com/400x400`)
)
```

I'll need to import `mapTo`. 

```javascript
import { pluck, map, switchMap, catchError, share, mapTo } from "rxjs/operators"
```

Scroll back down.

06:39 Then, our `image$` used to be `Obersvable.merge`, the fail on the load but now it's just `merge`. We'll have to `import` `merge` as one of our creation operators. `merge` is there. 

```javascript
import { from, combineLatest, merge } from "rxjs"
```

Scroll back down. Now, we're merging `loadImage$` and `failImage$` and `return` `image`.

```javascript
const image$ = merge(loadImage$, failImage$)

return {
  people$, 
  name$,
  image$
}
```

07:04 Hit Save. Everything should be back to working, the data nice and cached. 

![back to working](../images/vue-js-optimize-bundle-size-by-piping-operators-with-rxjs-and-vue-js-back-to-working.png)

All the streams hooked together properly. Now, using piping and importing operators and passing them into the pipe, saving us from the heavy baggage of importing every single operator and also allowing us to more easily write custom operators.