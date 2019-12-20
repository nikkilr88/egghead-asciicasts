One of the layers of this stack that we still haven't seen how to assert against is the database. We've seen how to test against the UI, how to assert on the front-end stores, but it's important for us to test against all layers of the stack. To illustrate why, let's see an example.

Let's say that we go ahead and create a new todo. We've seen this code before. What I'm suggesting we want to do is that before this, we want to say that the `// database is empty`. Afterwards, we want to assert that the `// database contains 1 todo, todo contains: 3rd Todo`.

### todos.spec.js
```js
it.only('asserts against the database', function (){
    // database is empty
    cy.get('.new-todo').type('3rd Todo{enter}')
    // database contains 1 todo, todo contains 3rd Todo
})
```

Why is it not enough simply for us to assert that the todo shows up on the UI? Well, let's go ahead and paste in that assertion. 

```js
it.only('asserts against the database', function (){
    // database is empty
    cy.get('.new-todo').type('3rd Todo{enter}')
    // database contains 1 todo, todo contains 3rd Todo

    cy.get('[data-cy=todo-item-1]')
        .should('have.text', '3rd Todo')
})
```

We'll reopen Cypress and see that the assertion passes, even though we haven't yet gotten the response back from the back end. 

![image of the assertion passing in the window](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626682/transcript-images/17_cypress-assert-on-database-snapshots-in-cypress-pass.jpg)

The reason for that is because I've inserted an artificial delay in the server process to further illustrate this point.

The point is that we commonly show the content as created on the UI while the network request is still in flight. We do that so that the UI doesn't feel sluggish, but anything could happen. The network could time out. Maybe the request is malformed. Maybe even the API says that the todo was created and it hasn't actually been inserted into the database.

The point is that our assertion here can give us a false sense of security, even though we haven't tested the entire contract. It's part of our contract for the data to be in the database, to be persisted, or else we're going to have a fundamentally broken experience.

Let's go ahead and make it possible to assert on our database. 

We've seen how to write Cypress code in the past that interacts with our back end. We write a `cy.task`. We can call it `db:snapshot`. Specifically, we're going to look for the todos on the snapshot. We can say that it should `.should('be.empty')` at first. Then what we want to do after we know that we've created it is say that it `.should('deep.equal'`. We'll pass in the array and just use these keys that we created, so `3rd Todo` and `completed` is `false`.

```js
it.only('asserts against the database', function (){
    cy.task('db:snapshot', 'todos').should('be.empty')

    cy.get('.new-todo').type('3rd Todo{enter}')

    cy.get('[data-cy=todo-item-1]')
        .should('have.text', '3rd Todo')

    cy.task('db:snapshot', 'todos').should('deep.equal'), [
        {
            id: 1, 
            text: '3rd Todo'
            completed: false
        }
    ]

})
```

Let's go ahead and pop into our plugins file again. We will add a `db:snapshot` method. This takes the name of the `table` that we want to get, which in our case was todos, so overturn `db.snapshot`, passing in the `table`, remembering that db is the library that we created to seed our database.

### index.js
```js
'db:snapshot': function(table) {
    return db.snapshot(table)
}
```

Let's go ahead and open that up again and add a `snapshot` method. In here, we just add snapshot. This takes the name of the table that we want to pass the snapshot of, remembering that all of this code is fairly specific to our specific database.

### db-seeder.js
```js
snapshot: function(table) {
    let adapter = new FileSync('db.test.json')
    let db = low(adapter)
}
```

You have MySQL, Postgres, RDS, whatever you have. Just use your own version of this code. This is how to do the integration so it'll just `return db.get`, passing in the `table` name, because that's how we do it in lowdb. 

```js
snapshot: function(table) {
    let adapter = new FileSync('db.test.json')
    let db = low(adapter)
    return db.get(table)
}
```


We'll head back to our test.

Let's go run it in Cypress. Here, we can see the task that ran. This is the snapshot. We can actually see the database snapshot with that one todo. Then we can see the assertion that ran on that object.

![image of the test with the database snapshot](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626681/transcript-images/17_cypress-assert-on-database-snapshots-in-cypress-passsnap.jpg)

[3:41] Great. Now we have a lightweight way to test a new layer of the stack. In the next lesson, we'll keep expanding upon this by testing our XHR requests.
