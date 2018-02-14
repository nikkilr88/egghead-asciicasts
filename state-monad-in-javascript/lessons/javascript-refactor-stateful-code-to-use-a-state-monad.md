Instructor: [00:00] One of the strengths of `state` is that it takes care of all our state management for us. This starts to show up in our code when we start to build collections of functions that work on a share date type to see how `state` could be used in situations like this. We'll start with the family of functions that work on a partial user record.

[00:17] Here, we have a function called `updateFirstName` which is defined as the curried function that takes the string followed by a user record, and gives us back a user record. We pass to `curry` a function that takes a `firstName` and returns a partially applied `assign` function. Ready to take a user record which it'll merge with our object to `firstName`.

#### user.js
```javascript
// updateFirstName :: String -> User -> User
const updateFirstName = curry(
    firstName => assign({ firstName })
)
```

[00:38] To get a feel of how we would work with a function like this, we can log out the result of calling `updateFirstName`, passing in `Jimmy`, followed by our user record and saving it down. 

index.js
```javascript
log(
    updateFirstName('Jimmy', user)
)
```

Looks like we've updated our first name as expected, but we have a problem Mr. Lawrence, `fullName` was not updated with `Jimmy`.

```
{
    firstName: 'Jimmy',
    lastName: 'Pickles',
    fullName: 'Bobby Pickles'
}
```

[00:57] We can remedy that by creating a function will call `buildFullName`, which will take a user record that we name `user`. As we need both the first and last names, we'll plug them off our `user` record using a bit of destructuring, like so. Declare another string that matches our key of full name in our user record that will hold the result of calling `joinWords` that will join our two names with the space.

[01:23] Now with our `fullName` all built out in our desired format we just `return` the result of calling update `fullName` passing in our new string followed by our user record. 

#### user.js
```javascript
function buildFullName(user) {
    const { firstName, lastName } = user

    const fullName = 
        joinWords(firstName, lastName)
}
```

By the by, we define `buildFullName` as a unary function that takes a user record giving us back a new user record with our full name modified.

```javascript
// buildFullName :: User -> User
```

[01:43] We now need to make sure that this modification happens every time we update our `firstName`. To do this, we'll extend `updateFirstName` with some function composition using the `compose` helper function. We need this to happen after our `firstName` assignment, so we drop it in as the first argument to compose.

```javascript
const updateFirstName = curry(
    firstName => compose(
        buildFullName, 
        assign({ firstName })
    )
)
```

[02:02] Give it a mighty little save. Now, we see that we get back our `'Jimmy Pickles'` as the `fullName`. 

```
{
    firstName: 'Jimmy',
    lastName: 'Pickles',
    fullName: 'Jimmy Pickles'
}
```

Taking a quick tour of the functions in this `user.js` file, a common pattern starts to rear its ugly little head. Every function here requires and returns a `user` record. Putting the responsibility of managing our record on the shoulders of our functions, the implications of this start to become clear in our new `buildFullName` function.

[02:28] It can cause us to have to needlessly create variables just to work on portions of our `user`. It also locks us in to having to hold on to our `user` as we needed later to merge the result of our computation into the original value. Over time as this file grows, very simple functions will become tainted with this filth and will result in hard to manage code.

[02:51] Let's take a look at how `state` can help to clean up this mess. In `model.js`, we have an analog to the original `updateFirstName` function taking in a string. Using `modify`, we kick back a `state` instance that will use assign to merge our new name into the `state`. We need to update our edge call to accommodate our new function.

[03:10] We'll remove user from this `log` call as it is no longer needed. Then, we just point our `require` to the `model` file to pull it in, 

#### index.js
```javascript
const {
    updateFirstName
} = require('./model')
```

seeing we get back our lazy old state. As we only care adopt the state portion, we'll run our instance with `.execWith`, providing our `user` record setting it down,

```javascript
log(
    updateFirstName('Jimmy')
        .execWith(user)
)
```

seeing we've updated it `'Jimmy'`, and like before `'Jimmy'` does not appear in our `fullName`.

```
{
    firstName: 'Jimmy',
    lastName: 'Pickles',
    fullName: 'Bobby Pickles'
}
```

[03:33] Now, in `model.js`, let's assemble our state base version of `buildFullName` which will define as a state transition going from unit to a new state user of unit. We can implement by starting with a function that takes nothing as the `user` is in the state. We now need to access our first and last names to join them for our `fullName`, like we did in our old function.

[03:54] We have some accessors already defined that use `get` to plug their respective values plopping them into the resultant. Because we need both of them to be applied to our joinWords function, we reach for the `liftA2` helper as a means to lift our `joinWords` function and apply to it, the result of calling our two name accessors.

[04:14] `firstName` first followed by the last. 

#### model.js
```javascript
const getFirstName = () => 
    get(propOr('firstName', ''))

const getLastName = () => 
    get(propOr('lastName', ''))
   
const buildFullName = () =>
    liftA2(joinWorsd, getFirstName(), getLastName())
```

This will return us a new state instance with our `fullName` in the resultant, but we're not quite finished. We need to take this string and use it to update our user with our new full name. As we have an update full name transition already defined in our file, we just `.chain` it in to complete this stateful transaction.

```javascript
const buildFullName = () =>
    liftA2(joinWorsd, getFirstName(), getLastName())
        .chain(updateFullName)
```

[04:35] Extending our name update is both simple and clean. We just meander up to our `getFirstName` function and `chain` in our shiny new stateful transaction, describing what we want done to the state without having to do it ourselves. 

```javascript
const updateFirstName = firstName => 
    modify(assign({ firstName }))
        .chain(buildFullName)
```

We save it down again and find that much to our delight `fullName` now reflects the name of our good friend Mr. Jimmy Pickles.

```
{
    firstName: 'Jimmy',
    lastName: 'Pickles',
    fullName: 'Jimmy Pickles'
}
```