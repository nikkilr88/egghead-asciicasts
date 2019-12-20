To install Cypress into our project, we simply `npm install` as a dev dependency `cypress`.

```javascript
npm install --save-dev cypress
```

With Cypress installed, we can look at our `package.json` and we'll see that it has been added to our `devDependencies` right here.

Now we can use `npx` to access the Cypress binary that has been added to our `node_modules` directory. Here we see a list of commands, `help`, `version`, `run`, and `open`.

![List of commands](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907821/transcript-images/egghead-install-and-run-cypress-list-commands.png)

Let's go ahead and run `npx cypress open`. This is going to open up the Cypress application for us.

![Cypress Application](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907828/transcript-images/egghead-install-and-run-cypress-cypress-application.png)

It automatically adds a whole bunch of tests to our project. We can see those tests added in this Cypress directory here.

![Test Directory](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907825/transcript-images/egghead-install-and-run-cypress-test-directory.png)

We can go ahead and run all these specs and this is going to pull open the Chrome browser inside of the Cypress test runner.

![Chrome Browser](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907813/transcript-images/egghead-install-and-run-cypress-chrome-browser.png)

Let's go ahead and stop this. Go back to our test, so we can stop those tests. These are all just some examples that we can use as we're getting started testing with Cypress.

You'll notice that we have some red underlines here. That's because our ESLint isn't liking Cypress very much. Let's go ahead and we'll fix that really quick by `npm install` as a dev dependency `eslint-plugin-cypress`.

With that installed, we can check out our `devDependencies` here in our `package.json`. We can now go to the `.eslintrc.js` here. We'll say `plugins: ['eslint-plugin-cypress']`. We'll say `env: {'cypress/globals': true}`.

#### .eslintrc.js
```javascript
plugins: ['eslint-plugin-cypress'],
env: {'cypress/globals': true},
```

If we open up the Cypress testing file, we're good with the ESLint.

Another thing that this creates for us is this `cypress.json` file. There's no configuration in here, but this is where we'll put configuration for Cypress in our project. It also creates a `fixtures` `example` here.

![Fixtures Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907809/transcript-images/egghead-install-and-run-cypress-fixtures-example.png)

There is also `plugins` and `support`.

One last thing I'm going to do here is in my `.gitignore`, I'm going to add `cypress/videos` and `cypress/screenshots`, because as we're testing with Cypress, it will create two more directories for videos and screenshots. I don't want to commit those to source control.

In review, to get Cypress up and running in our project, we installed Cypress as a `devDependencies`, and that let us use this Cypress binary, which is right here. We can access it in our `npm` scripts or with `npx`. Then, we ran `cypress open` which initialized our project for Cypress by creating a Cypress directory with some default test and a `cypress.json` configuration file.

Then, we installed `eslint-plugin-cypress`. We can integrate our ESLint configuration with Cypress. We updated our `.gitignore` to exclude Cypress screenshots and Cypress videos.
