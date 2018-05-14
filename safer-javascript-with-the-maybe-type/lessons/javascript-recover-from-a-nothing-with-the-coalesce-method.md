Instructor: [00:00] We're importing the `Maybe` type from `crocks` and we're pulling in some functions from a `utils` file. Our article object is being passed into `getArticleName`, which returns a maybe that contains the `name` property from the `article`. 

[00:11] The `alt` method recovers from a nothing here by replacing the nothing with a just of the hard-coded value. Then, the resulting maybe is mapped over `createUrl` to give us a full URL with the article name as a slug. 

#### index.js
```javascript
const Maybe = require('crocks/Maybe')
const { createUrl, getDefaultPageName, getArticleName } = require('./utils')

const article = {
    id: 1, 
    name: 'Learn FP with this one weird trick'
}

const abFlag = true

const url = getArticleName(article)
    alt(Maybe.of('Page Not Found))
    .map(createUrl)
    .option('default')
```

[00:23] Instead of using this hard-coded value for our default page name, let's use the `abFlag` variable that we have here and a function to get that value dynamically. We're going to use the `getDefaultPageName` function that we've imported from `utils`. I'm going to make a call to that, so we can see what that does. 
 
[00:41] We're going to pass in the `abFlag`. 

```javascript
getDefaultPageName(abFlag)()
```

We'll see that the result of this is a function. Passing in our flag is going to result in a function being returned. That function is going to take no arguments, but when we call it, it's going to give us back our default value. We'll see if we change this true to a false, we're going to get a different value for our default page name. 

```javascript
const abFlag = true
getDefaultPageName(abFlag)() === Page Not Found
```

[01:05] Now that we understand how this works, let's take off the additional call. We want to call this with the first argument and get our function back. Let's assign this to a constant. I'll define a constant here and we'll call it `getDefaultFromNothing`. 

```javascript
const abFlag = true
const getDefaultFromNothing = getDefaultPageName(abFlag)() === Page Not Found
```

[01:20] Now that we have this set up, let's see how we can use it to recover from a `nothig`, coming from `getArticleName`. I'm going to come down here, and I'm going to replace this call to `alt` with a call to a method called `coalesce`. We can see from the error message that we're getting, that coalesce requires both left and right functions. 

```javascript
const url = getArticleName(article)
    .coalesce(

    )
    .map(createUrl)
    .option('default') === 'Maybe.coalesce: Require both left and right funcitons'
```

[01:40] What does that mean? What it means is we're going to pass two functions in as arguments. The first one is going to be considered our left. The second one will be considered our right. 

[01:49] The left function will be invoked in the case of a nothing and the right function will be invoked in the case of a just. In the case of a nothing, we want to recover from this with a value that we're going to get from our `getDefaultFromNothing` function. 

[02:02] We're going to put that here. That's going to be our left function. 

```javascript
const url = getArticleName(article)
    .coalesce(
        getDefaultFromNothing
    )
    .map(createUrl)
    .option('default')
```

You'll notice that we have it set up so that `getDefaultPageName` takes the value ahead of time and returns a function that accepts no values. 

[02:14] The reason for that is that when we get a nothing here, we're going to have no value to pass along. We have to have that ready to go, so that we have a function that takes no arguments and returns the value. 

[02:24] Now, we can define our right function. In the case of a just, we don't really want to do anything with it yet. We're going to take that value and we're going to return it. We'll define a quick little identity function inline here. 

```javascript
const url = getArticleName(article)
    .coalesce(
        getDefaultFromNothing,
        x => x
    )
    .map(createUrl)
    .option('default')
```

[02:36] Whatever we return from coalesce is going to be wrapped in a just. In the case of a nothing, it will get a value from `getDefaultFromNothing`. It will return that as a just, which means it's going to continue through our transformations. 

[02:49] In the case of a just, in this case, we're passing it through using that identity function on the right. Let's see this work. 

[02:54] I'm going to update the article `name`, so that we get a nothing from `getArticleName`. We'll see that we're getting page not found as our slug, `https://egghead.io/articles/page-not-found`. 

[03:04] Now, if I come down here and I update `abFlag` to `false`, you'll see that our slug is now uh-oh, `https://egghead.io/articles/uh-oh`, because `getDefaultFromNothing` is returning a different value based on our `abFlag`. 

[03:14] Now, let's say we have a situation where instead of `getDefaultPageName`, we have a function coming in from our utility, `getDefaultPageURL`. 

```javascript
const { createUrl, getDefaultPageUrl, getArticleName } = require('./utils')
```

It's going to return the entire URL instead of just a name that needs transformation. 

```javascript
const getDefaultFromNothing = getDefaultPageUrl(abFlag)()
```

[03:28] Now, I end up in this situation where we recover from the nothing and it still goes through our transformation. We end up appending a URL to the end of a URL, `https://egghead.io/articles/https://egghead.io/articles.....`. That's obviously not what we want. 

[03:39] What we can do is, we can come down to `map`, and instead of passing whatever we get from `coalesce` through our mapping, we can replace the right with the mapping function itself. We're going to recover and we're going to get that URL out. 

```javascript
const url = getArticleName(article)
    .coalesce(
        getDefaultFromNothing,
        createUrl
    )
    .option('default')
```

[03:54] That's going to be the end of it, but if we go back to a situation where we have our `name`, then that's going to be passed through our transformation in `coalesce` and come out the other end as a Just.