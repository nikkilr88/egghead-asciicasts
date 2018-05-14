Instructor: [00:00] In this file, we have a stub service function. In a real app, this would make a call to an API, but in this example, we'll just use this hard-coded result value as the API response. 

#### service.js
```javascript
const prop = require('crocks/Maybe/prop')
const getUser = id => 
    new Promise((resolve, reject) => {
        const result = {
            status: 200, 
            body: {
                id: 1, 
                username: 'tester', 
                email: 'test@gmail.com',
                address: {
                    street: '111 E. West St',
                    city: 'Anywhere', 
                    state: 'PA',
                    postalCode: '19123-4567'
                }
            }
        }
        resolve(prop('body', result))
    })

module.exports = { getUser }
```

[00:10] Our function uses the `prop` utility from Crox to return a maybe that wraps the result's body property. In our `index.js`, we import this `getUser` function, and then we're calling it, and we're just running `console.log` on the then. 

#### index.js
```javascript
const { getUser } = require('./service')

getUser(1).then(console.log)
```

[00:24] If I save this file, open the terminal, I can run it, `node .`,and we'll say that our promise results to a just of an object, `Just {}`. The object that's wrapped in our just is the `body` property from our result. 

[00:34] If we go back to `service.js`, we're going to see that we have a `Just` of this `body` object. What we want to do in our consuming code is just get the `postalCode` for this user. 

[00:46] We're going to come back to `index.js`, and I'm going to `import` a utility from `crocks` called `propPath`. We'll use require for this, and we'll grab `crox/Maybe/propPath`. 

```javascript
const propPath = require('crox/Maybe/propPath')
```

[01:00] Then we'll come down to `getUser`, and I'm going to add a `.then` before our `console.log` and our promise chain. I'm going to take the `res` that I get back, which is a just of our value. 

[01:17] We're going to use `map` to invoke a function on it, and the function I want to invoke is going to be a call to `propPath` that's going to have our path predefined. 

```javascript
getUser(1)
    .then(res => res.map())
    .then(console.log)
```

[01:26] I'm going to jump up above that, and I'm going to create a new function, and I'll call it `getPostalCode`. That's going to be a call to `propPath`, and we're going to define our path. We're going to leave the data argument off of it. 

[01:41] We're just going to look for `'addresss='`, and then `postalCode`. Now we can pass `getPostalCode` into `map`. 

```javascript
const getPostalCode = propPath(['address', 'postalCode'])

getUser(1)
    .then(res => res.map(getPostalCode))
    .then(console.log)
```

We'll save this, and back in our terminal, we'll run this again. 

[01:58] You'll see this time we get our ZIP code back, but we get a Just Just and our ZIP code, `Just Just "191234-4567"`. What we've essentially done is taken our `Maybe`, and we've unwrapped the value. 

[02:08] We've got a new `Maybe` by running this call to `propPath`, and then we re-wrapped it in another `Maybe`. Now we have a nested `Maybe`. 

[02:16] Working with nested types like this is going to get cumbersome, especially if we start nesting even more levels deep. But this is not uncommon, so there's an easy solution for this. 

[02:26] We can replace `.map` with chain, and `chain` is essentially flatMap. It'll apply our function, but it'll also deal with flattening out that nested structure. 

```javascript
getUser(1)
    .then(res => res.chain(getPostalCode))
    .then(console.log)
```

[02:37] If I save this, and I go back into the terminal and run this again, you'll see that this time, we're only getting one maybe rather than a maybe nested inside of another maybe, `Just "19123-4567"`.