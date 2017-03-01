Say we have a `Map` of this object `home` that gives a route to the index page, maybe `about`. It goes to a route `'/about-us'`, and `blog` goes `/blog`. Now, we're putting this in a `Map`, so we can have the ability to `map` over it.

```javascript
Map({home: '/', about: '/about-us', blog: '/blog'})
.map
```

When you `.map` over a `Map`, it gives you each value. We get our `route` here inside the function. What we want to do is do an `httpGet`, which just pops it in a `Task` and giving us fake results here, these are `path` results. 

```javascript
const httpGet = (path, params) => 
    Task.ofA('${path}: result')

Map({home: '/', about: '/about-us', blog: '/blog'})
.map(route => 
```

Now, we have our `route`. We'll call `httpGet` with our `route`, and no parameters. We have a similar situation as we've seen before. Each of these inner values will be a `Task` now. We'd end up with a `Map` with `home`. Instead of this string here, we have our `Task` of `'/ result'`

```javascript
Map({home: '/', about: '/about-us', blog: '/blog'})
.map(route => httpGet(route, {}))

Map({home: Task('/ result')
```

We would rather, instead of a bunch of these key be tasks, we would want one `Task` on the outside and all these keys to be already resolved. We can do that again with this lovely `traverse` function, which we have to give `Task.of` as the first argument, which matches the return type of this function.

```javascript
Map({home: '/', about: '/about-us', blog: '/blog'})
.traverse(Task.of, route => httpGet(route, {}))
```

With that, we end up with a `console.error`, `console.log` here. One `Task` on the outside and then `Map` of results.

```javascript
Map({home: '/', about: '/about-us', blog: '/blog'})
.traverse(Task.of, route => httpGet(route, {}))
.fork(console.error, console.log)
```

Let's go and run this. There we are. We have a `home` and it has a `result` and `'/about-us'` which has `result`, and so on and so forth. It's very nice. It gives us the ability to hold a structure in place. Then, we can go ahead and `traverse` within that.

####Terminal Output
```Bash
Map { "home": "/ result", "about": "/about-us result",
"blog": "/blog result" }
```

In fact, we can `traverse` as much as we'd like. We can actually throw another `traverse` inside this. Let's say each of these had an array of routes. There's that and `home`, and so on and so forth. Let's just pop this an array, and let's get rid of this one.

```javascript
Map({home: ['/' '/home'], about: ['/about-us']})
.traverse(Task.of, routes => 
    httpGet(route, {}))
.fork(console.error, console.log)
```

Now, since we are trying to run each, instead of mapping and then mapping again, we just `traverse` and `traverse` again. We get these `routes`, and we can go ahead and call `routes.traverse`, `Task.of`, and we get a `route` here. There we go.

```javascript
Map({home: ['/' '/home'], about: ['/about-us']})
.traverse(Task.of, routes => 
    routes.traverse(Task.of, route => httpGet(route, {})))
.fork(console.error, console.log)
```

Now, of course, this array does not have a `traverse` function, so we have to put this in a `List`. There we go. Let's give ourselves some room here, and there we are. This goes through each at these nested structures, and then propagates the `Task` all the way to the outside, so we know when it's totally finished.

```javascript
Map({home: ['/' '/home'], about: ['/about-us']})
.traverse(Task.of, routes => 
    List(routes)
    .traverse(Task.of, route => httpGet(route, {})))
.fork(console.error, console.log)
```

There we are. We have a `home` of a list of each results. This is very powerful if you have a big nested tree or file system, and you want to `traverse` the structure without having to do any bookkeeping, taking it apart and putting it back together, or any mutation at all.