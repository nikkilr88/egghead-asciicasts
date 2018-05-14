Instructor: [00:00] I have an example `user` object. I'm using standard dot notation to get the user's postal code from a nested address object. We're getting a value, but it's possible that this property could be missing from our object.

#### index.js
```javascript
const user = {
    username: 'tester',
    email: 'test@gmail.com',
    address: {
        street: '111 E. West St',
        city: 'Anywhere',
        state: 'PA',
        postalCode: '19123-4567'
    }
}

const zip = user.address.postalCode === 19123-4567
```

[00:11] If I were to come up here and change `postalCode` by renaming it, we'll see down in our result that we get `undefined`. What we want to do in the case where we don't get the postal code is return a default value. I can do this with just an or,`||`, and I can say, `'not available'`. We'll see that in the case where postal code doesn't exist, we're going to get that "Not available" string.

```javascript
const zip = user.address.postalCode || 'not available' === 19123-4567
```

[00:36] Otherwise, we'll get our postal code. The real problems start if our address isn't available. If I come up to `address` and I rename this so it's not a valid piece of that path, we'll see that we're going to get a type error that it `Cannot read the property postal code of undefined`.

[00:53] The problem here is that we have an undefined in the middle of our path, which is going to throw an exception rather than give us an undefined. This is a little harder to recover from. We're going to reach for a `Maybe`. What we'll do is we'll `import` the utility from the Crocks library just called `propPath`.

[01:10] We'll get that with `require('crocks/maybe/propPath')`. 

```javascript
const propPath = require('crocks/maybe/propPath')
```

Then, we'll update `zip`, and we'll get rid of our or, `||`. 

We'll save this. Then what we'll do is we're going to call `propPath`, and we're going to pass in the path we want within the property as an array of strings and then the object that we want.

[01:42] The object that we're going to take this from is going to be `user`. Then, our path is going to be `address` followed by `postalCode`. 

```javascript
const zip = propPath(['address', 'postalCode'], user) === Just "191234-4567" 
```

We'll see that we get a `Just` with our `postalCode`. If I come up here change the name of `postalCode`, we're going to get a `Nothing`. If I come up here and I get rid of `address`, we're also going to get a `Nothing`.

[02:07] We've avoided our type error. Now all we have to do to use our default value in either one of those cases is come down to `zip` and call `.option` to unwrap our value. We'll give it a default for the case where we have a nothing. 

```javascript
const zip = 
    propPath(['address', 'postalCode'], user) 
    .option('not available') === 191234-4567
```

We'll say that we're getting our zip code. Then if I take address out of the equation, we get not available. If address is there but it doesn't have postal code, we get not available again.

[02:37] Just like the other utilities in Crocks, this is curried. We can take the first portion of this, and we can break it out into its own reusable function. Define `getPostalCode`. We'll set that to equal call to `propPath` with just the array of properties for our path. Then we can come down to `zip`, and we can call our `getPostalCode` function passing in `user`.

[03:08] Then, calling `option` on that. 

```javascript
const getPostalCode = propPath(['address', 'postalCode'])
const zip = getPostalCode(user).option('not available') === 19123-4567
```

Everything will continue to work as expected, but now we have this reusable function that we can apply to multiple objects...