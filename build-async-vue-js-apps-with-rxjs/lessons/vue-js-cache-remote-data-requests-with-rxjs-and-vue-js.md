Instructor: 00:00 To create a caching behavior, I'm going to create an object called `cache` and a function, which we'll call `cachePerson`. Which takes a `cache` then returns a function that takes the `url`. Later on, we're going to call this `cachePerson` function and pass in this `cache`. Then that will return this function which will expect a URL.

#### App.vue
```javascript
subscriptions() {
  const cache = {}
  const cachePerson = cache => url => {

  }
}
```

00:23 This will simply `return cache[url]` and check that property. If that exists, it will just return it. If it doesn't exist, we'll set the `cache[url]` to our `createLoader` which is down here. Let me delete all of this example stuff. To our `createLoader`, where we pass in the `url`.

```javascript
subscriptions() {
  const cache = {}
  const cachePerson = cache => url => {
    return cache[url]
    ? cache[url]
    : (cache[url] = createLoader(url))
  }
}
```

00:48 With all of this intact, all we have to do is come into where I said `exhaustMap` and `createLoader`. Now, we're going to `switchMap` on `cachePerson`, where we pass in our `cache`. 

```javascript
.switch(cachePerson(cache))
```

It's saved there, and you'll see the same behavior.

01:08 The difference now is, if I look at the network tab, I'll refresh and clear everything out. If I click on C3PO, you'll see he was requested. 

![network tab](../images/vue-js-cache-remote-data-requests-with-rxjs-and-vue-js-network-tab.png)

R2D2 was also requested. If I go back to C3PO, you'll see there is no request for number two, yet it's still showing up -- because that data is cached.

01:31 If I go to Darth Vader, I'll make a request for four. Back to C3PO, no request, then back to Vader, no request. I can load all of these up and switch over to slow 3G, but because everything is cached, it behaves super-responsively because it doesn't have to load anything.

01:52 Let me clear this out, and you can see the requests are only for images that are already cached from the disk. Since the browser handles the image caching. Looking at how this works, `switchMap` will take this url that `map` generates and pass the url to the `cachePerson` function.

02:13 You can see in `cachePerson`, it's this `return` function that's getting the URL. The cache is coming from `switchMap` and, again, returning that function. There's the `cache`, the url coming from the `map`. Each of these urls are just the url to the person to load.

02:33 I use those as keys inside of an object. You can think of this `cache` of having properties of https, then `https://starwars.egghead.training/person` number. Then the values are going to be the observable that's loading in that url.

02:49 The caching is possible because of the promise behavior we discussed, where promises will always return that same value that it resolved. Otherwise, if you're not using a promise in this scenario, you'd have to chain on something like `shareReplay`.

03:03 Which could store that value inside of a subject. Then anytime that observable was accessed, it would give that replay value. Because we're using promises, we can live with just the simple behavior.

03:17 Anytime `cachePerson` is called again on that `switchMap`, it's going to look up that url and grab that observable off of our `cache` object. If the syntax is a bit unfamiliar, I can write it like this. Where I say this is a `function` that takes the `cache` and `returns` a `function` that takes a `url`.

03:38 This will check `if` the `cache` has that property already set on it. If it does, `return` that. Otherwise, make sure that the `cache[url]` is set to our `createLoader(url)`, then return `cache[url]`.

```javascript
const cachePerson = function(cache) {
  return function(url) {
    if (cache[url]) {
      return cache[url]
    }

    cache[url] = createLoader(url)

    return cache[url]
  }
}
```

04:00 You'll see that same behavior where, if I click on a few of the pictures and go back, it's not making those requests again because they're cached. If I click a new one I haven't gone to yet, I'll make that request. Click, it did not make either of those requests, because our cache has keys of the URL.

04:19 Which was storing the observables, and the promises always return what was resolved.