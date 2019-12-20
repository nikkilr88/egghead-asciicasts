Up until now, we've been stubbing out our backend in tests with `cy.fixture` and `cy.route`. In order to do full end-to-end tests, we're going to want to start seeding our database. Let's write a Cypress task that seeds the database.

We can call the `cy.task('db:seed'` and that'll take an argument of a hash whose keys are the names of our model. `todos` is our first model right now.

We can pass an array of todos. In the future, we could add a users model and pass an array of users or any other models we might think of, but for right now, we just have todos. We'll pass an array of hashes. In fact, we can just copy in the data from our `fixtures/all.json` file and paste that in.

### todos.spec.js
```js
context.only('Full end to end testing', function () {
    beforeEach(function() {
        cy.visit('/')
    })

    it('Performs a hello world', function() {
        cy,task('hello', {name: "world"})
    })

    it('seeds the database', function() {
        cy.task('db:seed', {
            todos: [{
                "id": 1,
                "text": "Hello world",
                "completed": false
            },
            {
                "id": 2,
                "text": "Goodnight moon",
                "completed": true
            }]
        })
    })
})
```

Now that we know what our task will look like, let's go ahead and define it in `cypress/plugins/index.js` where we defined our Hello World task. 

This task is called `'db:seed'` and it takes an argument which is our seeds. We'll assume that there's going to be some kind of a default case. The `defaultSeed` would be an empty `todos` array and that's just us resetting the database to a clean, empty state.

Then we're either going to use the `seeds` if they were passed in or the default seed. We'll say the `seedsToUse = seeds ? seeds : defaultSeed`.


### index.js
```js
module.exports = (on, config) => {

    on('task', {
        hello ({name}) {
            console.log('hello ${name}')
            return null
        },

        'db:seed': (seeds) => {
            let defaultSeed = {todos: []}
            let seedsToUse = seeds ? seeds : defaultSeed
        }
    })
}
```


We're going to write a library. We'll call it `db`. We'll import that and we'll say that it has a `seed` method. We'll pass it into `seedsToUse`. We `return null`, remembering that null is the case where the plugin is used successfully.

```js
module.exports = (on, config) => {

    on('task', {
        hello ({name}) {
            console.log('hello ${name}')
            return null
        },

        'db:seed': (seeds) => {
            let defaultSeed = {todos: []}
            let seedsToUse = seeds ? seeds : defaultSeed

            db.seed(seedsToUse)

            return null
        }
    })
}
```

Then we need to import our db library. We'll say `const db = require()` and this will be relative to our path, so go up to Cypress, plugins, yeah. If we want it to be in our route to this, we'll call it `db-seeder.js`.

```js
const db = require('../../db-seeder.js')
module.exports = (on, config) => {

    on('task', {
        hello ({name}) {
            console.log('hello ${name}')
            return null
        },

        'db:seed': (seeds) => {
            let defaultSeed = {todos: []}
            let seedsToUse = seeds ? seeds : defaultSeed

            db.seed(seedsToUse)

            return null
        }
    })
}
```

Now we have to write our db seeder, so we'll create a new file, call it db seeder. For this project, we used the `lowdb` library. I'm going to copy in some boilerplate for writing to that particular database. If you happen to use Postgres or MySQL, you'll have your own version of this code.

Here's our `module`. We had a `seed` function that takes some `state`. That's the seeds that we passed in in the plug-in. This library writes to a JSON file which is located at the root of our project. This is just some more boilerplate for writing to this particular database. Again, use your own version of this code and `setState`. That's it. That's all the boilerplate.

### db-seeder.js
```js
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

module.exports = {
    seed: function(state) {
        let adapter = new FileSync('db.json')
        let db = low(adapter)
        db.setState(state).write()
    }
}
```

We just have to rerun Cypress so it can pick up our new plug-in. 

### terminal 
```bash
$ npm run cypress
```

Let's go ahead and make sure that we visit the page after we've seeded the database. That way, we can see the changes on the page, and we do see them there.

![image of our changes reflected in the browser window](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626682/transcript-images/15_cypress-seed-your-database-in-cypress-browser.jpg)

Just to double-check that this is in fact working the way we expect it to, let's update one of our seeds, and we see the changes reflected. That's great.

![image of the change Hello worldzzz reflected in the browser window](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626661/transcript-images/15_cypress-seed-your-database-in-cypress-browserchange.jpg)

Let's go into our database file, and we can see the changes reflected in our database. We can see that in our test file, we're actually able to interact with and update our backend. That's pretty cool. But one problem that we are going to notice is that if we visit our actual development environment, oh no, the changes are reflected here as well.

![image of the change Hello worldzzz reflected dev enviroment as well](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626654/transcript-images/15_cypress-seed-your-database-in-cypress-devchange.jpg)

The reason for this is because we have no separate testing environment. We're using the same db.json file in both our tests and our dev workspace.

While every application will have different requirements for separating the dev and test environments, let's go ahead and take a look at some of the basics.

Since we're going to have a separate version of the server running for both dev and test, we'll need to configure the port and the database file for each so we can separate them. We can detect the node environment. If it's `test` then we will configure the port to be `3001` and the `dbFile` to be `db.test.json`. Otherwise, we'll just use the defaults that we've used before.

### server.js
```js
let port, dbFile;

if (process.env.NODE_ENV == 'test') {
    port = '3001'
    dbFile = 'db.test.json'
} else {
  port = '3000'
  dbFile = 'db.json'
}
```

Then all we have to do is go through the file, find any place the database has used and replace that with `dbFile`. You can see it's hard-coded in a couple of places, so we just replace these. The same thing with the port that's used down here. We'll just pass in the port.

Let's go ahead and create a new file called `db.test.json`. We can preset that up with an empty todos array, save that out.

### db.test.json
```json
{
    "todos": []
}
```

In our `package.json`, we have the scripts that we run when we actually run our project.

Let's create a separate frontend test environment and API test environment. We have to pass `NODE_ENV=test`, change the port to `5001` and `3001`. When we run npm-run-start, which starts all of our processes, we also want it to start `"frontend-test"` and `"api-test"`. We'll just go ahead and copy these in and there we go. 

### package.json
```json
...

  "scripts": {
    "start": "concurrently 'npm:frontend' 'npm:api' 'npm:frontend-test' 'npm:api-test'",
    "frontend": "PORT=5000 REACT_APP_API_URL=http://localhost:3000 react-scripts start",
    "api": "node server.js",
    "frontend-test": "PORT=5001 REACT_APP_API_URL=http://localhost:3001 react-scripts start",
    "api-test": "NODE_ENV=test node server.js",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "test": "react-scripts test --env=node",
    "cypress": "cypress open"
  },
  
  ...
```

Our frontend needs to know what the `REACT_APP_API_URL` is, so that whenever we make a call to the backend, we call this URL.

### index.js
```js
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { rootSaga } from './sagas/TodoSagas'
import App from './components/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

window.REACT_APP_API_URL = process.env.REACT_APP_API_URL

...

```

We want to make sure that we have isolated the locations in our application that actually call the backend. For us, they exist in this sagas file. We have this `getBaseUrl` which knows the application base URL and returns it. For us, we'll just say it's this `REACT_APP_API_URL`. If it's present, we will return that. Otherwise, we'll just return this default which was our dev environment URL.

### TodoSagas.js
```js
import { takeEvery, takeLatest, put, all, select } from "redux-saga/effects";
import axios from "axios";

function getBaseUrl() {
  return window.REACT_APP_API_URL = process.env.REACT_APP_API_URL :
'http://localhost:3000'
}

...

```
When we actually run `npm run start `, we'll see that we start up four separate processes -- a frontend and frontend test, an API and API test. 

### terminal
```bash
$ npm run start 
```

![image of npm run start and its terminal output](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626662/transcript-images/15_cypress-seed-your-database-in-cypress-devchange-terminal.jpg)

These will all run on separate ports and using separate database files.When these load up, we'll see that we have test environment running on port 5001 and a dev environment running on port 5000. 

![image of the dev enviroment](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626631/transcript-images/15_cypress-seed-your-database-in-cypress-dev.jpg)

![image of the test enviroment](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626646/transcript-images/15_cypress-seed-your-database-in-cypress-testenviro.jpg)

Clearly, they have different databases here.

You can say that this is the dev todo one. This has not impacted our testing environment against a test todo one. These are totally isolated.
