Instructor: 00:02 To install Cypress into our project, we're going to run `npm install` and save it as a devDependency cypress.

#### Terminal
```bash
npm install --save-dev cypress
```

With that installed, we can run `npx cypress --help`, and we'll see here all the commands that are available to us.

```bash
npx cypress --help
```

00:15 We want to run the `open` command to see the Cypress app. Let's run `npx cypress open`, and that will pull up the Cypress app which was installed onto your computer.

![cypress app opened with npx cypress open](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727281/transcript-images/jest-install-and-run-cypress-cypress-app-first-opened.png)

Here we have a bunch of examples that have been added automatically for us, and so we can quickrun all the specs.

00:32 That's going to pop open Chrome automatically for us, and it's going to run all through all of those tests for us automatically. As fun as it is to watch it run through the Kitchen Sink of examples, we're going to go ahead and stop this here. We'll go back to our tests, we'll stop that. We can just quit this, come back to our code editor.

00:51 Let's take a look at the files that were added to our project. First, we had a `cypress.json` added. It's just an empty object for now, and then we also have this `cypress` directory. This is where all of our Cypress testing related files go. We have support plugins integration and fixtures.

01:06 Fixtures are a bunch of JSON files. Integration is where we have all of our test. We've got a bunch of stuff as examples that Cypress has preloaded for us, so we can learn from those examples.

01:17 You'll notice that we've got a bunch of red stuff going on in here. That's because our ESLint does not configure to support Cypress, so let's go ahead and make that happen. I'm going to `npm install` as a dev dependency, `eslint-plugin-cypress`. That's going to add a couple ESList rules that will be useful for us.

```bash
npm install --save-dev eslint-plugin-cypress
```

01:35 Then right in the Cypress directory, we're going to add a `.eslintrc.js` file. Then in this file, we'll do a `module.exports` which will equal that plugin we just installed, ESLint plugin Cypress. That'll add a couple rules for us. We'll say `env` is Cypress globals `true`.

#### cypress/.eslintrc.js
```js
Learn more or give us feedback
module.exports = {
  plugins: ['eslint-plugin-cypress'],
  env: {'cypress/globals': true},
}
```

01:54 The globals are coming from the ESLint plugin that we installed. That will support the describe in the global variables that we're using. Then we'll also add an `extends` so that we can extend the plugin `cypress/recommended` rule set. Just for good measure, I'll also extend the `kentcdodds` import for a couple other rules that I like here.

```js
Learn more or give us feedback
module.exports = {
  plugins: ['eslint-plugin-cypress'],
  extends: ['kentcdodds', 'kentcdodds/import', 'plugin:cypress/recommended'],
  env: {'cypress/globals': true},
}
```

02:17 The reason that I'm doing that is even though ESLint is automatically going to merge this configuration with the root level configuration, there are a couple of conflicts between the Cypress plugin and the Jest plugin and I don't want to have those conflicts. What I'm going to do here is I'll say `root: true`.

```js
Learn more or give us feedback
module.exports = {
  root: true,
  plugins: ['eslint-plugin-cypress'],
  extends: ['kentcdodds', 'kentcdodds/import', 'plugin:cypress/recommended'],
  env: {'cypress/globals': true},
}
```

02:32 That way, ESLint will stop here as it's looking at the file system for the configuration to use for a particular file. Another thing that Cypress adds that I want to take care of is Cypress adds a video and screenshots directory. I don't want to commit those to source control. In .gitignore, we'll say `cypress/videos`, and `Cypress/screenshots`, and that gets me working.

#### .gitignore
```
dist
node_modules
coverage
cypress/videos
cypress/screenshots
```

02:53 In review, what we did here was we installed Cypress into our dev dependencies of our package JSON. We ran Cypress open, and that automatically created a Cypress JSON configuration file for us and a bunch of files in the Cypress directory.

03:07 Then, we configured ESLint to support Cypress. We configured git to ignore the videos and screenshots directory that Cypress is going to create for us. That's how we get Cypress installed into our project.
