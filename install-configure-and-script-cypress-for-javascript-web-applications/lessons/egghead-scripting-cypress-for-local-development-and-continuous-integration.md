To run Cypress, we have to first run `npm run dev`, and then in another tab, we have to run `npx cypress open` to start Cypress up.

It would be great if we could have a single script that could start up Cypress and our dev server, so we only have one script to run. For our continuous integration, we also should have one script that will run both as well.

What we're going to do is I'm going to `npm install --save-dev start-server-and-test`.

#### Terminal Input
```javascript
npm install --save-dev start-server-and-test
```

With that installed in our `devDependencies` here in our `package.json, we can go ahead and use this. I'm going to create a couple of scripts here.

First, we'll make a `cy:run`. That's going to be `cypress run`. That will run Cypress in headless mode, so you won't actually see the browser or the Cypress application running. This is for CI.

#### package.json
```javascript
"scripts": {
    ...
    "cy:run": "cypress run",
}
```

Then we'll have a `cy:open` that will run `cypress open`.

```javascript
"scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
}
```

Then we'll have a `test:e2e`. For this one, we're going to do a similar thing that we did up here with the `test`, where we'll use the `is-ci`.

We'll say run `test:e2e:run` for CI, and `test:e2e:dev` for local.

```javascript
"scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\"",
}
```

Then for `test:e2e:run`, we'll use `start-server-and-test start`. What `start-sever-and-test` is going to do is it will run this command, and then it will wait for our server to start responding.

We'll say `http://localhost:8080`. Once this starts responding to requests, then it will run this script, `cy:run`.

```javascript
"scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\"",
    "test:e2e:run": "start-server-and-test start http://localhost:8080 cy:run",
}
```

We'll do a similar thing for `dev`. We'll say `cy:dev` and instead of `start`, we'll have it run the `dev` script.

```javascript
"scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\"",
    "test:e2e:run": "start-server-and-test start http://localhost:8080 cy:run",
    "test:e2e:dev": "start-server-and-test dev http://localhost:8080 cy:dev",
}
```

For our `dev` script, as we're making changes, our webpack configuration will reload the app and we can rerun the test, then it will have our most recent changes. For our `run` script, it's running this `start` script. That's going to run the built code.

Before we run our end-to-end test, we should make sure that we're building the code. What I'm going to do is I'll also add a `pretest:e2e:run`.

This script, because it has the `pre` prefix will run the `test:e2e:run` script, and before we run the `test:e2e:run` script, we're going to run `npm run build`. That way, when we do end up running the script, it's using the latest of our code changes.

```javascript
"scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\"",
    "pretest:e2e:run": "npm run build",
    "test:e2e:run": "start-server-and-test start http://localhost:8080 cy:run",
    "test:e2e:dev": "start-server-and-test dev http://localhost:8080 cy:dev",
}
```

One other quick thing that I'm going to do for some other scripts in `precommit`, I'm going to go ahead and add and `npm run test:e2e:run`. This way, I know that before I commit any code, I'm not breaking any of my end-to-end test.

```javascript
"precommit": "lint-staged && npm run test:e2e:run",
```

You might not want to do this if your end-to-end test takes several minutes, but for this small app, I'm going to go ahead and put it in there. If this app grows and the end-to-end test suite starts taking a little bit of time, then I'll probably remove this and rely more heavily on CI.

In any case, I definitely am going to want to have my `validate` script to run the end-to-end test, because this is what I'm running in CI. Run `npm run test:e2e:run`.

```javascript
 "validate": "npm run test:coverage && npm run test:e2e:run",
```

With that, now I can go ahead and run `npm run test:e2e`, and because I am local, it's going to run `test:e2e:dev`. It's running my dev server.

It looks like I made a little typo here.

![Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907829/transcript-images/egghead-scripting-cypress-for-local-development-and-continuous-integration-error.png)

Instead of `cy:dev`, this should be `cy:open`.

```javascript
"test:e2e:dev": "start-server-and-test dev http://localhost:8080 cy:open"
```

Let's go ahead and try that again. `npm run test:e2e`. It starts my webpack dev server and the backend server at the same time, and then it runs `cypress open` when that `localhost:8080` starts accepting requests.

![Cypress Started](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907828/transcript-images/egghead-scripting-cypress-for-local-development-and-continuous-integration-cypress-started.png)

Once that's started, we know that we can start our Cypress test app and we can run calculator, and it will run against that server that we started.

In review, what we had to do to make all of this work is we installed `start-server-and-test` and then we created a couple of scripts to run and open Cypress.

Then we created our `test:e2e` scripts here, and we used `start-server-and-test` for both `start` and `dev`, and in both cases, when `localhost:8080` is ready, it's going to run `cy:run` to run our test heedlessly with Cypress and `cy:open` to open the Cypress app.

```javascript
"scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\"",
    "pretest:e2e:run": "npm run build",
    "test:e2e:run": "start-server-and-test start http://localhost:8080 cy:run",
    "test:e2e:dev": "start-server-and-test dev http://localhost:8080 cy:open"
}
```

Let's go ahead and see what happens in our console now when we run `npm run test:e2e:run`. This is what it's going to look like in CI. First, it's going to run our build, because we have that `pretest:e2e:run` there. Once the build is finished, it's going to start our server with the `start` script.

Now that the server is starting to take traffic, it's going to run `cypress run`, and cypress runs all the tests. Once Cypress is finished, then it's going to close down our server and our script executes with an exit code of 0 so it was successful.

If we were to break one of our tests, then our script would fail, and CI would fail.
