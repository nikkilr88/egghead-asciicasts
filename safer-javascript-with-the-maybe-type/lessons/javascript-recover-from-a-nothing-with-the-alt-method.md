Instructor: [00:01] We're importing `crocks` as a whole and then using destructuring to grab several of its functions, as well as the `Maybe` type. We also have a couple of utilities being pulled in from the `ramda` library, and we have three functions already defined. 

[00:12] `isNonEmptyString` as a predicate function that checks that a value is both a string and that it contains some characters. `createUrlSlug` will take in a string, convert it to lowercase, and replace the spaces with dashes. Then finally, `createUrl` takes in a slug and appends it to the end of our base URL. 

#### index.js
```javascript
const crocks = require('crocks')
const { and, compose, isEmpty, isString, Maybe, not, prop, safe } = crocks
const { join, split, toLower } = require('ramda')

const isNonEmptyString = and(not(isEmpty), isString)
const createUrlSlug = compose(join('-'), split(' '), toLower)
const createUrl = slug => `https://egghead.io/articles/${slug}`

const article = {
    id: 1, 
    name: 'Learn FP with this on weird trick'
}
```

[00:30] Our goal is to take this `article` object and get a URL that contains the name as a slug. We want to do this all within the safe confines of the `Maybe` type. 

[00:39] Let's start by collapsing this imports region so we have a little more space. Then, under the `article` object, I'm going to start by defining a new concept. We'll call this `getArticleName`, and `getArticleName` is going to take in an `obj`. Then, we're going to use the `prop` function from crocks to get the `name` property from it. This should return us a maybe with that name. 

[01:02] Then, we're going to use this to get our URL. 

```javascript
const getArticleName = obj => prop('name', obj)
```

Let's start defining that. We'll define a constant called `url`. That's going to equal a call to `getArticleName`. We're going to pass in our `article` object from above. We'll see that our article name has been wrapped in a `Just`. 

```javascript
const url = getArticleName(article) === Just "Learn FP with this one weird trick"
```

[01:22] Let's verify that this works if `name` isn't available. I'll rename that. We'll see that we get a `Nothing`. That's where it came, but what happens if our `name` is an empty string? You'll see down here when we call `getArticleName`, we get a `Just` of an empty string, `Just ""`. 

[01:37] We'd like to make sure that there's actually a value in this title before we do any transformations to it. We're going to update `getArticleName` to do an extra check. `prop` will give us back the property on the object as long as it exists, but it's not going to do any additional checks. 

[01:52] What we want to do is `.chain` another call. This time we're going to call `safe`. It's going to take that property it got from the object. It will pass it into the `chain`, which is going to call `safe`, and we're going to use our `isNonEmptyString` predicate. That's going to return a maybe of its own. 

[02:10] That's why we use chain here instead of map, so that it flattens that out and we don't get a nested just.

```javascript
const getArticleName = obj = prop('name', obj)
    .chain(safe(isNonEmptyString))
```

Now, we'll see we're getting our `Just ` with our title. If I come up here and I make `name` an empty string, we get a `Nothing`. 

[02:26] We know that any transformation we apply to a just is only going to be applied to a value. Let's add a `map` on our `url` assignment. We're going to `map` our returned article name over our `createUrlSlug` function. 

```javascript
const url = getArticleName(article)
    .map(createUrlSlug)
```

[02:41] Now, we're going to get back a `Just` with our url slug. We want to create a full URL from that slug. We'll call `map` again, this time passing it `createUrl`. You'll see that we get a full URL with our slug wrapped in a just. 

```javascript
const url = getArticleName(article)
    .map(createUrlSlug)
    .map(createUrl)
```

[02:58] Now that we've successfully created our URL, we're going to unwrap it and get the string back. We're going to reach for `.option` here. For now, we'll pass it an empty string as the default.

[03:08] You'll see the result of this is just our URL. 

```javascript
const url = getArticleName(article)
    .map(createUrlSlug)
    .map(createUrl)
    .option('') === 'https://egghead.io/articles/learn-fp-with-this-one-weird-trick'
```

If I come up here and I get rid of the `name` property, we'll get a `Nothing` and our output is going to be an empty string. If I update `option`, it will be a default value. 

[03:25] In order for the consuming code to continue to work as expected, this default really should be a URL. I could hard code a URL here, but the problem now is that base URL is being duplicated. If that changes, I have to remember to update it here. I really don't want to have to do all of that. 

[03:40] Luckily, the `Maybe` from `crocks` gives us an easy way to recover from a `Nothing`. I'm going to come up there between `createUrlSlug` and our `map` to `createUrl`. I'm going to call the `.alt` method on our Maybe. 

[03:53] `alt` is actually going to take a maybe. In the case of a nothing, we're going to get that maybe back, and then it will continue processing. 

[04:01] I'm going to use `Maybe`. I'm going to call the `of` method on that, which is a constructor that's going to take whatever value we give it and put it into a just. I'm going to give this a string, which is going to be a slug for `'page-not-found'`. 

```javascript
const url = getArticleName(article)
    .map(createUrlSlug)
    .alt(Maybe.of('page-not-found'))
    .map(createUrl)
    .option('')
```

You'll see that now our result is our URL with the `page-not-found` slug. 

[04:21] We get a `Nothing`. We skip this first `map`. We recover from it. Now, we have a `Just` again, so the next map is going to be invoked, which is going to create our URL with this default value. 

[04:33] We've recovered and this works, but the problem we have now is that we've basically taken this hard-coded value. We're in a position where we have to make sure that this hard-coded value adheres to whatever logic is used in this `createUrlSlug`. 

[04:47] A better option would be move this `alt` up. Then we can pass it a value that we would expect to be passed through the create URL slug, and then we can run our transformations on that default value. We don't have to know about the logic that comes after that. We know that we're recovering with a reasonable default. 

```javascript
const url = getArticleName(article)
    .alt(Maybe.of('Page Not Found'))
    .map(createUrlSlug)
    .map(createUrl)
    .option('default')
```

[05:10] The other thing we can do is, if this default is going to be applicable any time we use that `getArticleName` function, we can move it up there. Then, our consuming code doesn't have to worry about recovering at that point in the pipeline. 

```javascript
const getArticleName = obj = prop('name', obj)
    .chain(safe(isNonEmptyString))
    .alt(Maybe.of('Page Not Found'))

const url = getArticleName(article)
    .map(createUrlSlug)
    .map(createUrl)
    .option('default')
```

[05:23] Now that our recovery isn't splitting up our two maps, we can consolidate these using composition. We can compose and we can call `createUrl` after we call `createUrlSlug`, and get rid of that second map. 

```javascript
const url = getArticleName(article)
    .map()
    .option('default')
```

[05:36] We can verify that that's still working and we can make this a little more declarative by cutting this out, moving it into its own utility function. We'll assign that composition to create URL from name. Then, we can use that down here. 

```javascript
const createUrlFromName = compose(createUrl, createUrlSlug)
const getArticleName = obj = prop('name', obj)
    .chain(safe(isNonEmptyString))
    .alt(Maybe.of('Page Not Found'))

const url = getArticleName(article)
    .map(createUrlFromName)
    .option('default')
```

Everything works and our code is nice and clean.