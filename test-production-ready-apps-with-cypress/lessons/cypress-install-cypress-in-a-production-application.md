In this lesson, we'll learn how to add Cypress to an existing application. First, let's `git clone` the sample repo.

### Terminal
```bash
$ git clone https://github.com/SamGrinis/cypress-egghead-course.git

Cloning into 'cypress-egghead-course'...
remote: Enumerating objects: 157, done.
remote: Counting objects: 100% (157/157), done.
remote: Compressing objects: 100% (111/111), done.
remote: Total 462 (delta 75), reused 113 (delta 42), pack-reused 305
Receiving objects: 100% (462/462), 512.79 KiB | 6.66 MiB/s, done.
Resolving deltas: 100% (218/218), done.
```

Next, `cd cypress-egghead-course` into the repo and `git checkout 01-cypress-install`.

```bash
$ cd cypress-egghead-course
$ git checkout 01-cypress-install
```

Next, run `npm install`.

```bash
$ npm install
```

When it's finished installing, you can start the demo application with `npm run start`.

```bash
$ npm run start
```

This command will automatically open the demo application on localhost 5000.

![image of running application demo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626638/transcript-images/02-cypress-install-cypress-in-a-production-application-web.jpg)

You can verify that your application is working by running `npm run test`.

```bash
$ npm run test
```

Once our application is verified, we're prepared to `npm install cypress --save dev`.

```bash
$ npm install cypress --save-dev
```

Once Cypress is installed, we're prepared to run it with `$(npm bin)/cypress open`. This will pop open the Cypress interactive GUI which comes pre-seeded with a number of tests.

```bash
$ $(npm bin)/cypress open
```

![image of the tests that cypress auto opens](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626693/transcript-images/02-cypress-install-cypress-in-a-production-application-test1.jpg)

If we click on one, we can see an example of Cypress in action. This is Cypress running on the Cypress website.

![image of cypress running on the cypress website](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626688/transcript-images/02-cypress-install-cypress-in-a-production-application-web1.jpg)

We can see here that Cypress can either run against our local page or against a remote page.

All of these example files live in the Cypress directory under integration. You'll probably want an easier way to run Cypress, so open `package.json` and add a `cypress` command, which will be `cypress open`.

### Package.json
```json
  "scripts": {
    "start": "concurrently 'npm:frontend' 'npm:api'",
    "frontend": "PORT=5000 REACT_APP_API_URL=http://localhost:3000 react-scripts start",
    "api": "node --inspect server.js",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "test": "react-scripts test --env=node",
    "cypress": "cypress open"
  }
  ```

We can use our new command by running `npm run cypress`.

### terminal
```bash
$ npm run cypress

> todomvc@0.0.1 cypress /Users/samgrinis/cypress-egghead-course
> cypress open
```

Now you're all set up with Cypress and ready to roll. If you'd like to do an exercise before moving on to the next lesson, take a moment and familiarize yourself with some of the example tests.
