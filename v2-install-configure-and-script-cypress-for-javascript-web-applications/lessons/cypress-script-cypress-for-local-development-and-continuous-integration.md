Instructor: 00:01 When I want to run my Cypress end to end test, I first have to run my server and then I have to run `npx cypress open` or if I want to run it headlessly, then I run `run` command. It'd be really great if I could just run one script and it would start up my server and start up Cypress automatically.

00:16 That's what we're going to do. We'll `npm install` as a devDependency `start-server-and-test`. 

#### Terminal
```bash
npm install --save-dev start-server-and-test
```

With that installed, I'm now going to add a couple of scripts in out `package.json`. Just below `test:debug`, I'm going to add a `test:e2e`.

#### package.json
```json
"test:e2e": ""
```

00:32 What this script is going to do is pretty similar to my `"test"` script at the top. We'll do our `is-ci` and if we are on CI, then we'll have a `test:ete:run` script. That will run our Cypress in headless mode, otherwise, we're local and so we'll `test:e2e:dev`.

```json
"test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\""
```

00:49 Let's go ahead and create `test:e2e:run`. With that, we're going to run `start-server-and-test`. 

```json
"test:e2e:run": "start-server-and-test"
```

This script takes a couple of arguments. The first argument is the NPM script that we want to have run. We'll call that one `start` and we already have that set up for us automatically right here to start our app in production mode.

01:09 I'll have server and test run the start script and then we'll have `start-server-and-test` look for our app listening for traffic on port 8080. When that address starts accepting traffic, we'll run `cy:run`, so I'll need to create that script.

```json
"test:e2e:run": "start-server-and-test start http://localhost:8080 cy:run"
```

01:23 Let's go ahead and do that. `cy:run`, what this is going to run is `cypress run`. That runs Cypress in headless mode, which is good for CI. 

```json
"cy:run": "cypress run"
```

We're going to do something similar for our dev script, so I'll just copy `test:e2e:run`. Instead of `run`, we'll have it be `dev` and instead of `cy:run`, we'll have it be `cy:open`. We'll have our `cy:open`, which will run `cypress open`.

01:43 Of course, we want this `dev` to run the `dev` script. As soon as our dev script server is accepting traffic at port 8080, then we'll run cy open, which will open the Cypress app and we can start developing with Cypress.

```json
"cy:run": "cypress run",
"cy:open": "cypress open",
"test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\"",
"test:e2e:run": "start-server-and-test start http://localhost:8080 cy:run",
"test:e2e:dev": "start-server-and-test dev http://localhost:8080 cy:open",
```

01:56 One thing about this is that the `dev` script is going to start our node server and our webpack dev server in development mode, but the `start` script is going to run all the built code. We want to make sure that our test are running across the freshest version of our built code.

02:09 I'm going to add a script that runs before `run`, leveraging a feature of NPM by doing `pre` and then the name of the script. NPM will automatically run this script before it runs the script of the same name. The script that I wanted to run is `npm run build`. In that way, we have a fresh build of the app before we try to test the build version of the app.

```json
"pretest:e2e:run": "npm run build",
```

02:29 With all that set up, I'm going to come down here to my `validate` script and we're going to add `npm run test:e2e:run` because this is what's running on CI. 

```json
"validate": "npm run test:coverage && npm run test:e2e:run",
```

I also want to come down to my `husky` configuration here for my `"pre-commit"` script and we'll add an `npm run test:e2e:run`.

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged && npm run test:e2e:run"
  }
}
```

02:46 I'm only doing this because this is a pretty small project and the end to end test don't take a whole lot of time to run. As your project grows, your end to end test suite gets bigger and takes longer to run. This might add significant overhead to the pre-commit script. I'd probably get rid of this and just rely more on CI.

03:02 One other thing that we need to configure about CI is in our `.travis.yml` here. We need to make sure that Travis installs a package that Cypress depends on, so add `addons` configuration here and we'll use `apt,` `packages`. The package is `libgconf-2-4`.

03:18 We also want to make sure that we're caching the directory that Cypress is saved into, so do `~tilde/.cache`. In that way, we don't have to wait for Cypress to install every time.

#### .travis.yml
```yml
addons: 
  apt: 
    packages:
      - libgconf-2-4

cache: 
  directories:
    - ~/.npm
    - ~/.cache
```

03:28 With all of those changes, now if we run `npm run test:e2e`, that will determine are we on CI? Oh no, we're not so we're going to run the dev script and we'll open up the Cypress app so we can develop with Cypress. With that, now we can click on `run all specs` and we've got our test running and passing. Excellent.

03:48 Let's take a look what this looks like. If we were to run this on CI. If I run `npm run test:e2e:run`, then that's going to run our build first and then it's going to run our node server and then it's going to run Cypress run, which will pick up all of our test and run our test in headless mode. As soon as our test all pass, `start-server-and-test` is going to shut down our server.

04:12 In review to make all of this magic happen, we created a bunch of scripts right here using the `start-server-and-test` module so we could have a development mode for developing our application with the Cypress app using cy open, which runs Cypress open.

04:25 As well as running our test across the built version of the code with our start script and `cy:run`, which runs Cypress in headless mode with the run command. With that, we have the NPM run build, which happens before the test:ete:run so we make sure that we're testing the latest version of our code.

04:43 We also updated our Travis configuration to install dependencies that Cypress has and to cache the Cypress binary that's downloaded. We also updated our validate script, so that we would run our end to end test in CI. Because this is a pretty small project, we also added the test:ete:run script to our pre-commit hook in our configuration for Husky.