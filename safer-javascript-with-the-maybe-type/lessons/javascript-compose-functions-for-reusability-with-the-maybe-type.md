Instructor: [00:00] I've defined a function that takes in an object, extracts the `name` property, and verifies that it's not empty, giving us back a maybe. In the case where this results in a nothing, we use the `alt` method to recover with a just of `'Nope'`. 

[00:13] Then, we apply the create URL utility function to the result and extract the value with the option method. We can see that calling this with the article object results in a URL. 

```javascript
const crocks = require('crocks')
const { Maybe, prop, safe } = crocks
const { createUrl, isNonEmptyString } = require('./utils')

const article = {
    id: 1, 
    name: 'Learn FP with this one weird trick'
}

const getUrl = obj => 
    prop('name', obj)
        .chain(safe(isNonEmptyString))
        .alt(Maybe.of('Nope'))
        .map(createUrl)
        .option('default')

const url = getUrl(article)
```

If I set `url` to an empty object that doesn't have a `name` property, we'll see that we get the default of nope as our URL slug, `https://egghead.io/articles/nope`. 

[00:30] I'd like to break this process down into smaller pieces of functionality, so I can reuse those pieces and easily create new functions with slight variations. To make this easier, crocks provides functions that coincide with the maybe methods we're using. These point free utilities provide the same functionality, but instead of hanging off an instance of maybe, they accept an instance as their last argument. 

[00:53] Let's import the functions we need to turn this URL creation process into a function composition. We'll jump up to the top of the file where we're already importing `Maybe`, `prop` and `safe` from crocks. Then we're going to add `compose`, because that's what we're going to use to put these together. 

```javascript
const { Maybe, prop, safe, compose } = crocks
```

Then, we're going to import functions that represent each of these methods. 

[01:10] If we look at our existing `getUrl` function, we're using `chain`, `alt`, `map`, and `option` as methods of that maybe instance. We're going to have a corresponding point free utility functions to match each of these. We can pull in `chain`, `alt`, `map`, and `option`. 

```javascript
const { Maybe, prop, safe, compose, chain, alt, map, option } = crocks
```

Then, I'm going to come down to getUrl. I'm going to take this existing `getUrl` function. I'm just going to comment that out for reference. 

[01:35] We're going to declare `getUrl` again. This time it's going to equal call to `compose`. `compose` is going to get the functions that we need to rebuild this functionality using those point free utilities. A composition is going to go from right to left. We're going to reverse the order of what we already have. 

[01:54] We're going to start. We're going to say `option` gets called with `'default'` after `map` is called with `createUrl`. That happened after our `alt` with our maybe of our default value of `'Nope'` which is being called after `chain`. We're chaining our call to `safe` because it's going to return a nest of maybe. 

[02:25] We'll do is not empty string there. Then that's being called after `prop` for `name`. We're going to leave the object out of it, because that's going to be the argument that gets passed in to get URL. That'll be the first thing. 

```javascript
const getUrl = compose (
    option('default'),
    map(createUrl),
    alt(Maybe.of('Nope')),
    chain(safe(isNonEmptyString)),
    prop('name')
)
```

[02:38] It'll hit this curried version of `prop`. Then it's going to pass those values until we get our URL out on the other side. We'll see that get URL is still working as it did before. If we pass in an object that doesn't have a name, we get our nothing. It recovers using that alt with a maybe of `'Nope'`. 

[03:03] Let's say I wanted to be able to get the name in the same exact way for use in other places in my code. Because we're using a function composition here, it's going to be easy to pull these things apart, make smaller building blocks, and then snap them back together in different ways. 

[03:18] Let's start by creating the function that represents this `prop` and `chain` combination. I'm going to cut those. I'm going to come up here. I'm going to define this. I'll call it `getSluggableName`. This is going to be a `compose` where I'm just going to use my `prop` and `chain`. 

[03:37] Then, I'm going to call this as the first piece of this composition to get the url. 

```javascript
const getSluggableName = compose(
    chain(safe(isNonEmptyString)),
    prop('name')
)
const getUrl = compose (
    option('default'),
    map(createUrl),
    alt(Maybe.of('Nope')),
    getSluggableName
)
```

By putting `getSluggableName` there, we're right back to where we were. But now, we have this reusable piece that we can use in other compositions. We can do the same thing here where we create our URL and then extract the value. Let's cut `option` and `map`. 

[03:58] I'm going to come up here. I'm going to define another function. I'm going to call this `getUrlOrDefault`. That's going to equal another `compose`. I'm just going to paste those functions in here. Now, we have a composition that's going to take a maybe, `map` it over to create our url, and then extract that value with default as the value. 

[04:23] We can put that right back in `getUrl`. 

```javascript
const getSluggableName = compose(
    chain(safe(isNonEmptyString)),
    prop('name')
)
const getUrlOrDefault = compose(
    option('default'),
    map(createUrl),
)
const getUrl = compose (
    getUrlOrDefault
    alt(Maybe.of('Nope')),
    getSluggableName
)
```

Our original function goes back to doing exactly what it did before. But now, it's just three functions and a composition. I have these other two functions that are easily reusable in other parts of my code base. Now, I can easily reuse these functions to create different composition. 

[04:43] I can come in here. Let's duplicate `getUrl`. We're going to call this new copy `getUrlOrNope`. We're going to leave that with the original functionality. We'll come back to that in a second. We're going to take the `alt` out of here. Let's say we want this process where if we get a nothing, we actually show this `'default'` value from option. 

```javascript
const getUrl = compose (
    getUrlOrDefault
    getSluggableName
)
const getUrlOrNope = compose (
    getUrlOrDefault
    alt(Maybe.of('Nope')),
    getSluggableName
)
```

[05:04] I can come down to `url` and if I change this and pass in an object without the `name`, we'll see that we don't get a URL at all. Now, we have the option of doing it with the actual default value from `option` or doing the version with the recovery. If I update url with `getUrlOrNope`, then we're going to get that version. 

[05:25] Or we can come in here. We could create another function. Let's say `getUrlOrWoops`. We'll change this default value here to `'Woops'`. 

```javascript
const getUrlOrWoops = compose (
    getUrlOrDefault
    alt(Maybe.of('Woops')),
    getSluggableName
)
```

Then we can come back down. Now, you see we have the same exact functionality except for the recovery step which we changed. 

[05:49] We didn't have to redefine the portion where we get the name off the object or create the URL and extract the value. We just changed the part that we cared about changing. Now, we have more functions, but each one is more specialized. We can put them together in whatever combination makes the most sense for us...