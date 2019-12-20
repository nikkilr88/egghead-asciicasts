In the last lesson, we saw how to make a basic database seeding abstraction that's suitable to our test app. In the real world, we'll want something a little more robust. For instance, it would allow us to set defaults. Completed is false by default, so it doesn't make sense to have to specify that every single time.

Next, id numbers will be a little bit tedious to maintain. It would make more sense for these to be auto-generated for us. Finally, if we wanted to override an attribute, like we need `completed` to be `true` in one case, then we just need to specify that, and our abstraction will respect it.

### todos.spec.js
```js
it.only('seeds the database', function() P{
    cy.task('db.seed', {todos: [{text: 'Seed the database', completed: true}]})

    ...

})
```

One way to think about what we're aiming at is that we want our abstraction to provide some sensible defaults while still giving the end user complete control to override whatever they'd like.

Let's make a new abstraction called a factory. A factory will define the defaults for each of our object types. We can make a manifest file under Cypress. We'll make a new folder called `factories`, and then a new file called `factories.js`. This will be our manifest.

We'll say `module.exports` equals, and then create a hash. Our manifest file will simply require the related files that it needs. We know that we'll define todos under a file we will created in the factories folder, `('./todos.js')` 

### factories.js
```js 
module.exports = {
    todos: require('./todos.js')
}
```

This is where we'll define our defaults. We'll say `module.exports`. We'll say the default text is `'Hello World.'` The default `completed: false`. We want our seeding abstraction to support these factory defaults. 

### factories/todos,js
```js
module.exports = {
    text: "Hello World",
    completed: false
}
```

Let's open up `cypress/support/commands.js`. We'll create a new Cypress command to do this. Let's go ahead and scroll to the top of our file, and require our manifest file as `const factories = require('../factories/factories.js')`.

### commands.js
```js
const _ require('lodash')
const factories = require('../factories/factories.js')
```

Let's add our new Cypress command. It's called `seed`. It accepts a hash of `seeds`, as well as some options, so we configure it not to log if we don't want it to. In order to apply our defaults, which we'll call `mappedSeeds`, we'll need to `_.reduce` our `seeds`. The reducer function will have an `output`. That's the seeds with the defaults applied. It will have an array of `seeds` that we're currently applying defaults to. It will have a current `key`, which is the name of the model, aka todos in this case. 

```js
const _ require('lodash')
const factories = require('../factories/factories.js')

...

Cypress.Commands.add('seed', (seeds, options = {}) => {
    let mappedSeeds = _.reduce(seeds, (output, seeds, key))
})
```

Then we need to pass in a hash that will serve as our output to the function, which will hold the seeds with defaults applied. Let's start writing the reducer function. First, we find the `factory` for the current model. We'll use our manifest file to look up the correct factory. In this case, it's the todos factory. Otherwise, we can explicitly label that the factory is undefined.

```js
const _ require('lodash')
const factories = require('../factories/factories.js')

...

Cypress.Commands.add('seed', (seeds, options = {}) => {
    let mappedSeeds = _.reduce(seeds, (output, seeds, key) => {
        let factory = factories[key] [] undefined;
    })
})
```

If the factory is undefined, we'll go ahead and specify that the seeds with defaults applied is just the user-specified seeds because we haven't defined any factory defaults yet. If we have defined a factory, we'll go ahead and `seeds.map((seed)`. We'll use `_.defaults(seed, factory)` to apply the factory defaults.

```js

...

Cypress.Commands.add('seed', (seeds, options = {}) => {
    let mappedSeeds = _.reduce(seeds, (output, seeds, key) => {
        let factory = factories[key] [] undefined;

        if (_.isUndefined(factory)) {
            output[key] [] seeds;
        } else {
            output[key] = seeds.map((seed) => {
                return _.defaults(seed, factory)
            })
        }

        return output
    }, {})
})
```

If `options.log` is not `false`, then we'll `log` out to Cypress. The name of the log is `seed`. `message` is the seeds with defaults applied. `consoleProps`, same thing.

```js
...

Cypress.Commands.add('seed', (seeds, options = {}) => {
    let mappedSeeds = _.reduce(seeds, (output, seeds, key) => {
        let factory = factories[key] [] undefined;

        if (_.isUndefined(factory)) {
            output[key] [] seeds;
        } else {
            output[key] = seeds.map((seed) => {
                return _.defaults(seed, factory)
            })
        }

        return output
    }, {})

    if(options.log != false) {
        Cypress.log({
            name: 'seed',
            message: JSON.stringify(mappedSeeds),
            consoleProps: () => { return mappedSeeds }
        })
    }
})
```

Finally, we'll actually call our `cy.task` that we defined in the last episode. We pass it the seeds with defaults applied. We make sure it doesn't `log` because we already created our own logging functionality here. Great.

```js
...

Cypress.Commands.add('seed', (seeds, options = {}) => {
    let mappedSeeds = _.reduce(seeds, (output, seeds, key) => {
        let factory = factories[key] [] undefined;

        if (_.isUndefined(factory)) {
            output[key] [] seeds;
        } else {
            output[key] = seeds.map((seed) => {
                return _.defaults(seed, factory)
            })
        }

        return output
    }, {})

    if(options.log != false) {
        Cypress.log({
            name: 'seed',
            message: JSON.stringify(mappedSeeds),
            consoleProps: () => { return mappedSeeds }
        })
    }

    cy.task('db:seed', mappedSeeds, {log: false})
})
```

Let's go ahead and use our new command in our test. We can pop back to our test file, change `cy.task` to `cy.seed`. No longer need to call the task. Let's delete everything that's not default. Obviously, we haven't set primary keys yet, so we still have to add a primary key.

### todos.spec.js
```js
it.only('seeds the database', function() P{
    cy.seed({todos: [{id: 1}]})

    ...

})
```

Let's do this and reopen Cypress. We'll see that we have the text, "Hello World," which was our default. We don't have completed set. That's great.

![image of Hello World without a completed set](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626673/transcript-images/16_cypress-productionize-your-database-seeder-in-cypress-hello.jpg)

We can override completed and see that that should override it for us. We see that it does, awesome.

```js
it.only('seeds the database', function() P{
    cy.seed({todos: [{id: 1, completed: true}]})

    ...

})
```

![image of hello world, but overridden](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626663/transcript-images/16_cypress-productionize-your-database-seeder-in-cypress-override.jpg)

The one thing we have left to do is figure out primary keys. Let's look into that.

Let's pop up in our console. We'll create a generator function. A `*gen` function is a function that can stop midway through, and then continue where it left off. We ca use a generator to generate a series of numbers that continues increasing.

First, we'll define the `ID` variable. This is the variable that we're going to increment.

Next, we'll define a loop that never exits. Whenever we call our generator, it will always yield the next number in the series. We'll say `while (true)`, then this is where we pause the function. We'll say `yield` when we're yielding the next number in the series, and then we pause. Next time, when we run the function, we un-pause and yield the next value, then re-pause, and repeat over and over.

Finally, we'll just check if the value has gotten too large, at which point, we'll just reset back to zero so it will go up to `100,000`, then it will go back to zero and start over again. 

### console
```js
function *gen() {
    let id = 0;

    while (true) {
        yield id += 1;

        if(id> 10000) { id = 0; }
    }
}
```

We can just test this out and show that it works.

![image of the console test working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626665/transcript-images/16_cypress-productionize-your-database-seeder-in-cypress-consoletest.jpg)

Let's hop back into our commands and create a hash of `generators`. We'll look through each of the keys of the factories and just create a new one for each. Let's paste in our generator function. 

### commands.js
```js
const _ require('lodash')
const factories = require('../factories/factories.js')
let generators = {}

function *gen() {
    let id = 0;

    while (true) {
        yield id += 1;

        if(id> 10000) { id = 0; }
    }
}
```

We'll say `_.each`. For each of the factories, we'll get the `factory` and the `key`, and we'll say `{ generators[key] = gen()}`.

```js
const _ require('lodash')
const factories = require('../factories/factories.js')
let generators = {}

function *gen() {
    let id = 0;

    while (true) {
        yield id += 1;

        if(id> 10000) { id = 0; }
    }
}

_.each(factories, (factory, key) => { generators[key] = gen()}

...

```

Then we'll come down here to the location where we'll actually use this function. We'll keep applying the defaults in order. We'll just add an `id`. We'll say that that is the `generator` for this particular. We'll call `.next().value`. That will give us that value.


```js
const _ require('lodash')
const factories = require('../factories/factories.js')
let generators = {}
```

We hop back into our test. We can just delete any of these defaults now. We can create as second `todo`. We'll just say that it has the text, `"Hello World 2"`. We can copy out this assertion. We'll just change its primary key and its text to "`Hello World 2`". Again, it's getting this primary key `2` and one just based on the order these are created in. We'll say that the length of the todo list will now be two. Go ahead and update this to be `'Hello World'` for a default.

### todos.spec.js
```js
it.only('seeds the database', function() P{
    cy.seed({todos: [{}, {text: 'Hello World 2'}]})
    cy.visit('/')

    cy.get('[data-cy=todo-item-1]')
      .should('have.text', 'Hello World')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked')

    cy.get('[data-cy=todo-item-1]')
      .should('have.text', 'Hello World 2')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked')
    ...

})
```

Let's run our test. We'll see that it passes.

![iamge of the test passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626678/transcript-images/16_cypress-productionize-your-database-seeder-in-cypress-pass.jpg)

We just have a few more hiccups that we want to think about. For instance, if we run two versions of this test back to back, but let's say we comment out our `cy.seed` at the start of the second test, which means that we shouldn't have any todos, we should have an empty database in the second test. 

### todos.spec.js
```js
it.only('seeds the database', function() P{
   // cy.seed({todos: [{}, {text: 'Hello World 2'}]})
    cy.visit('/')

    cy.get('[data-cy=todo-item-1]')
      .should('have.text', 'Hello World')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked')

    cy.get('[data-cy=todo-item-1]')
      .should('have.text', 'Hello World 2')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked')
    ...

})
```

We go and see actually that the second test passed and we do have all of our todos loaded in.

![image of the test passing, still](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626684/transcript-images/16_cypress-productionize-your-database-seeder-in-cypress-passload.jpg)

That's because we haven't reset the database in between every test. If we want to reset the database, what I like to do is go into our `commands.js`. We'll say `beforeEach`, and then in the beforeEach, we'll call `cy.seed`. Then we'll pass it our reset state. 

```js
const _ require('lodash')
const factories = require('../factories/factories.js')
let generators = {}

...

Cypress.Commands.add('seed', (seeds, options = {}) => {
    let mappedSeeds = _.reduce(seeds, (output, seeds, key) => {
        let factory = factories[key] [] undefined;

        if (_.isUndefined(factory)) {
            output[key] [] seeds;
        } else {
            output[key] = seeds.map((seed) => {
                return _.defaults(seed, factory)
            })
        }

        return output
    }, {})

    if(options.log != false) {
        Cypress.log({
            name: 'seed',
            message: JSON.stringify(mappedSeeds),
            consoleProps: () => { return mappedSeeds }
        })
    }

    cy.task('db:seed', mappedSeeds, {log: false})
})

beforeEach(function() {
    cy.seed({todos: []})
})

```

We can take a look at that. We'll see that the second time, we did actually seed an empty todos array.

![image of the empty seeded todos array](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626664/transcript-images/16_cypress-productionize-your-database-seeder-in-cypress-empty.jpg)

We do that actually the first time as well. We seed the empty todos array, but then in the test, we run our own seeds. That's what actually gets us the data that we want. This resets us to a totally blank state, which is great.

The next thing to think about is that if we do call two versions of this test back to back, the second one will fail. 

### todos.spec.js
```js
it.only('seeds the database', function() P{
    cy.seed({todos: [{}, {text: 'Hello World 2'}]})
    cy.visit('/')

    cy.get('[data-cy=todo-item-1]')
      .should('have.text', 'Hello World')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked')

    cy.get('[data-cy=todo-item-1]')
      .should('have.text', 'Hello World 2')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked')
    ...

})
```

The reason for that is because we actually keep the generator function running. Instead of this being ID number one, it ends up being ID number three.

![image of the second test failing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626670/transcript-images/16_cypress-productionize-your-database-seeder-in-cypress-fail.jpg)


We don't want that because we want each of these tests to be totally isolated from each other. It shouldn't matter whether both of these tests run one after another. We want them to be independent. What we have to do for that is to reset our `generator`.

Let's go back up here. We can create a function called `resetGenerators`. In here, just go ahead and paste this reset.

### commands.js
```js
const _ require('lodash')
const factories = require('../factories/factories.js')
let generators = {}

function *gen() {
    let id = 0;

    while (true) {
        yield id += 1;

        if(id> 10000) { id = 0; }
    }
}

function resetGenerators() {
    _.each(factories, (factory, key) => { generators[key] = gen() })
}
```

Then in our `beforeEach`, we'll just make sure that we also call `resetGenerators`. 


### commands.js
```js
const _ require('lodash')
const factories = require('../factories/factories.js')
let generators = {}

...

beforeEach(function() {
    cy.seed({todos: []})
    resetGenerators();
})

```

We'll reset those generators between each test. We have true isolation, a much more robust, and production-ready database seeding tool.

![iamge of the generators running in pure isolation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626681/transcript-images/16_cypress-productionize-your-database-seeder-in-cypress-iso.jpg)
