Instructor: 00:00 now we'll break our URL and when I click, our data will fail to load. You'll see errors in the console. The way we usually handle this is by `.catch`ing the error. This will give us an error and will want to switch over to an observable.

00:18 The observable that we'll create is going to be an `Observable.of` an object that has a `name` of `"Failed"`, and maybe a frowny face for good measure. 

#### App.vue
```js
const luke$ = this.click$
  .mapTo(
    "https://starwars.egghead.trainin/people/1"
  )
  .switchMap(createLoader)
  .catch(err =>
    Observable.of({name:"Failed...:("})
  )
```

We'll hit Save here, clear out console, click, and you can see that it properly failed. My image service also captured the failure to load an unnamed image.

00:39 Now the cool thing about this is if this fails to load, we can switch over to a different request entirely. I can do a `createLoader`, and then we'll load the other person and make sure and fix the URL. Put the G there, and two will be C-3PO. We'll hit Save there, clear out the console, click, and you'll see that we gracefully handled the error and made a separate request over to loading C-3PO.

```js
const luke$ = this.click$
  .mapTo(
    "https://starwars.egghead.training/people/1"
  )
  .switchMap(createLoader)
  .catch(err =>
    createLoader(
"https://starwars.egghead.training/people/2"
)
  )
```

01:07 If I fix this by fixing the URL when hitting Save, then going back and clicking, it'll load Luke. Inside of this catch, simply return an observable that gives us an object with a `name` on it and an `image` on it, too, if you wanted. 

```js
const name$ = luke$.pluck("name")
const loadImage$ = luke$
  .pluck("image")
  .map(
    image =>
      `https://starwars.egghead.training/${image}`
  )
```

Then, you can gracefully handle any errors that may come your way...