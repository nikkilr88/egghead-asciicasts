Most of your Cypress code will be executed in the browser. For certain types of challenges like seeding a database, sending emails, or otherwise testing the impact of jobs that might be queued as a result of your frontend interactions, you'll want to write a Cypress plugin.

Plugins are a scene for you to write your own custom code that executes during particular stages of the Cypress lifecycle.

Let's go ahead and write a Hello World version of a Cypress plugin to see how it works. In an `index.js` file, let's say `on('task')` which we'll call with `cy.task`. We'll call the task `hello`. Hello will accept a `name`. Finally, we'll `console.log`. The log will say `('hello ${name}')`. We'll `return null`, which for a Cypress plugin means it executed successfully.

### index.js
```js
module.exports = (on, config) => {

    on('task', {
        hello ({name}) {
            console.log('hello ${name}')
            return null
        }
    })
}
```

If we switch over to our test file, we can call this with `cy.task` calling the task `hello` and passing a `name: world`.

### todos.spec.js
```js
context.only('Full end-to-end testing', function() {
    beforeEach(function() {
        cy.visit('/')
    })

    it('performs a hello world', function() {
        cy.task('hello', {name: 'world'})
    })
}
```

From Cypress, we'll see the task logged out.

![image of the task logged out](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626675/transcript-images/14_cypress-extend-cypress-with-plugins-loggedout.jpg)

Logging out the name of the task and the arguments we passed. If we look at our Cypress runner, we can see that hello world gets logged out in our console. 

![image of the Hello World logged out in the console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626698/transcript-images/14_cypress-extend-cypress-with-plugins-loggedoutconsole.jpg)

We take notice that the task took place in the command line, not in the browser and that we're going to use task to interact with our server environment.

Also, that Cypress isn't running in our web pack server or our backend server. Cypress is running in its own execution context with its own version of node. It can't just happen to the running server. We have to trigger tasks that will do the work for us on the backend.

In the next lesson, we'll see this in action, when we write a task to see their database.
