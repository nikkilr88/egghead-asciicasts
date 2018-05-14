Instructor: [00:00] Here, we have an object that represents a query string for paged records. We're getting the page property from the object, and passing that into our increment utility to get the next page. 

[00:09] As we can see, the `page` property on the query string object has a value of two, and after calling inc on that value, we get back three. 

#### index.js
```javascript
const { inc } = require('../utils')

const qs = { page: 2, pageSize: 10, totalPages: 203 }

const page = qs.page
const nextPage = inc(page) === 3
```

This works fine right up till that object gets sent to us without that page property, then we're going to get not a number, `NaN`. 

[00:24] Let's use a `Maybe` type to avoid this unexpected result. I'm going to come up here to the top, and I'm going to pull in the `safe` utility from `crocks`. 

```javascript
const safe = require('crocks/Maybe/safe')
```
[00:38] As `safe` is going to require a predicate function, I'm going to pull in a couple utilities from Ramda so that we can build up the predicate that we need. I'll pull in `compose`, `isNil` and `not`. Those are all going to come in from the `ramda` library. 

```javascript
const { compose, isNil, not } = require('ramda')
```

[00:58] Then, I'm going to create a new function which I'm going to call `isNotNil`. I'm going to set that to equal `compose`, and I'm going to compose and say that we're going to call `(not, IsNil)`. 

```javascript
const isNotNil = compose(not, isNil)
```

[01:10] Now, I have a predicate that I can use for `safe`, I'll come down to `page` and we'll call `safe` with our `isNotNil` predicate. Passing in `qs.page`. 

```javascript
const page = safe(isNotNil, qs.page)
```

We'll see down in our result, we're going to get `[object, Object]1`, let's take `inc` off of here and just make sure we're getting the object we expect. We're getting a Nothing. 

```javascript
const nextPage = page === Nothing
```

[01:29] If I come up to `qs` and I put this page property back on the object, and I give it a value, you're going to see we'll get a `Just` of that value. Everything's working. To get the next page, we'll call this `page.map`. We'll map that over `inc`, 

```javascript
const nextPage = page.map(inc) === Just 4
```

we'll get a `Just 4`. 

[01:48] We want to unwrap that, we'll use `.option`. We'll give it a default value of `1`, and we'll get out just the `4`. 

```javascript
const nextPage = page.map(inc).option(1) === 4
```

If we go back to our object, we remove that `page` property altogether. We'll get that default value of `1`. 

[02:02] Now that we have this working, let's take it one step further and create a generic utility that we can use to grab a property off of any object in a `safe` manner. I'm going to come down here, and I'm going to define `prop`. This is going to be our utility function. 

[02:17] We're going to accept a property name, which we'll call `propName`, then `obj`. In our function, we're going to call `Safe` using our `isNotNil` predicate. Then we're going to reference that object, and we're going to grab it to `propName`. 

```javascript
const prop = (propName, obj) => safe(isNotNil, obj[propName])
```

[02:33] This will pull the property off of the object, and if it's not nil, it will give us a Just wrapping the value that was in that property. If it is, we'll get back a Nothing. We can make sure this works by replacing our call to `Safe` down herein `page` with a call to our new `prop` utility. Passing in `page` as our property name and `qs` as our object. 

```javascript
const page = prop('page', qs)
```

[02:54] We'll see down here in the result we still got our default of `1`. If I update the object up here, have a `page` property with a value, we're going to get that incremented value. This is a fairly common use of the `Maybe` type. 

[03:08] Crocks comes with its own `prop` utility. Let's pull that in. I'm going to pull in `cons prop`, and that's going to equal call to `require('crocks/Maybe/prop')`. 

```javascript
const prop = require('crocks/Maybe/prop')
```

Then we can comment out our implementation of `prop`, and we can also comment out our `imports` from `Ramda` and our `isNotNil` predicate. 

[03:29] You'll see down here everything's still working as it was, because the `Crocks` implementation of `prop` is going to do the same thing for us. If I come down to `qs` and I get the `page` property off of this object, we'll see that we still get a `Nothing`, resulting in our default value. 

[03:51] The added benefit to using the `Crocks` implementation, aside from the fact that you don't have to implement it yourself, is that it's curried. Which means I can come up here and I can call it with one argument, just the property name. And I get this reusable function that it's just waiting for an object. 

```javascript
const safePage = prop('page')
```

[04:09] Now, you can come down to `page`, and I can call `safePage`, passing in query string. 

```javascript
const page = safePage(qs)
```

Everything will work as expected. If I wanted to use this on multiple objects that had a page property, I could just reuse the `safePage` function wherever I needed.