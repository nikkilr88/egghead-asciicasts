Instructor: 00:00 If we click really quickly, you can see this request being made over and over and over again, even if we click before the data has loaded. We can disable this button while the data is loading by creating a `disable$` stream based on this `click$` stream and the `luke$` stream, essentially, we'll say that our `disable$` stream is a combination or an `Observable.merge` of the `click` of the dot click, and when the `like$` stream is ready.

#### App.vue
```javascript
const diabled$ = Observable.merge(
  this.click$,
  luke$
)
```

00:31 When a value gets pushed through here or a value gets pushed through here. When a value gets pushed through from `click$`, we'll `mapTo` to `true`, and when a value gets pushed through `luke$` and is done with the stream, we'll `mapTo` `false`.

```javascript
const diabled$ = Observable.merge(
  this.click$.mapTo(true),
  luke$.mapTo(false)
)
```

00:46 Then, we can `return` the stream in our object here. 

```javascript
return {
  name$,
  image$, 
  disabled$
}
```

Then, I'm gonna put that on the `disabled` property or the button, we'll bind `disabled` to our `disabled$` stream. 

```html
<button class="button" :disabled="disabled$" v-stream:click="click$">Clicked</button>
```

To make this more obvious, I'm going to come into the performance tab, go into my settings and change the network to 'slow 3G'.

01:10 When I click on that button, you'll notice it goes disabled until the data is done loading. I'll do that now. You could see grays out, and then the day comes in and then it's enabled again. If you look at the network, I'll clear this out, I'll click and you'll see the request go out and the response come back, and then the button re-enables.

01:30 Disabled response comes back enabled. Now we can make this more apparent, a `buttonText$` stream based on our `disabled$` stream. I'll say `buttonText$` is our `disabled$` stream `map` to, and we'll just have a `bool` value here.

01:49 If this is true, if it is disabled, we'll say it's `"Loading..."`. And if it's false, we'll say `Load`. 

```javascript
const buttonText$ = disabled$.map(bool => (bool ? "Loading..." : "Load"))
```

Then, we can `return` our `buttonText$` down in our object here.

```javascript
return {
  name$,
  image$, 
  disabled$,
  buttonText$
}
```

Use our `buttonText$` inside of our button.

```html
<button class="button" :disabled="disabled$" v-stream:click="click$">{{buttonText$}}</button>
```

02:11 You'll notice right now, there is no text in the button, but I'll click it and you'll see it turns to 'loading' and then now it's back at 'load'. Click again, turns to 'loading' and goes to 'load'.

02:22 To fix that empty text at the beginning, I'll go back down to my `buttonText$` stream and I'll tell it to `startWith(false)`. 

```javascript
const buttonText$ = disabled$
  .startWith(false)
  .map(bool => (bool ? "Loading..." : "Load")
)
```

Hit save, and now, you see the text defaults to 'load' because false comes through right away.

02:38 I'll click changes to 'loading' and goes back to 'load'. Now, because we're basing this `buttonText$` on the `disabled$` stream, it probably makes more sense to grab this `startWith` and move it up to the `disabled$` stream. In case anything else relies on the disabled stream, they'll all stay in sync there.

```javascript
const diabled$ = Observable.merge(
  this.click$.mapTo(true),
  luke$.mapTo(false)
).startWith(false)

const buttonText$ = disabled$
 .map(bool => (bool ? "Loading..." : "Load")
)
```

02:55 Hit save now and get that same result. Now, it says 'load' at the beginning because our `disabled$` stream is starting with false and pushing that value through so that our `disabled$` handles that first false, and gives us 'load' and right click goes to 'loading' and it's done and shows 'load'.