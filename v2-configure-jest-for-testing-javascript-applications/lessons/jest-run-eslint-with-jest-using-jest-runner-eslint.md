Instructor: [00:01] Jest is more than just a testing framework. It's an entire platform for running tasks in parallel, because it's running all of your tests in parallel. You can see the benefits of this as your project and your test base grows bigger and bigger over time.

[00:12] In addition to being really efficient, running of all of your tasks in parallel, Jest also has an amazing watch mode you can use, to help you as you develop your software.

[00:20] One of the really awesome features of Jest is the ability to specify a custom runner. By default, Jest has a runner that will run the Jest framework tasks, but you can actually have runners that run ESLint prettier, or even go on Python tasks.

[00:33] It's really remarkable what you can do. Let's go ahead and try this out with our Linting. I'm going to npm install, and save as a dev dependency Jest runner ESLint. 

```bash
npm install --save-dev jest-runner-eslint
```

With that installed, I'm going to go up here into my test directory. I'm going to make a new file called jest.lint.js.

[00:50] This is going to be a little bit different configuration from our others. I'm going to say module that exports equals this object. We want the root, der, to be a path, join, of the der name up one directory. We want the root directory to be this main directory here.

[01:05] Let's go ahead and get our path from require path, the path node module here. We'll just specify our display name to be lint so we can differentiate this configuration from the others. Then we'll specify a runner to be Jest runner is Lint.

[01:20] Our test match will be all JavaScript files. We want everything from the root der/ star, star,/ star.js, so every JavaScript file in there. 

```js
const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/**/*.js'],
}
```

We actually don't want every single JavaScript file in there because we also have the dis directory that has some JavaScript files. Coverage directory has a couple JavaScript files. We don't want to cover those.

[01:40] The way that we're doing that currently with our package.JSON is under Lint, we have ESLintignorepath.gitignore. We want to use the ignore path flag for the CLI. I'm going to configure Jest runner ESLint inside my package JSON here so that the CLI options, that Jest runner ESLint [inaudible] CLI, includes ignore path and .gitignore.

```js
 .
 .
 .
  "setup": "npm install && npm run validate"
},
"jest-runner-eslint": {
  "clipOptions": {
    "ignorePath": "./.gitignore
  }
}
```

[02:04] With that, I can run npm Jest. We'll specify the config is testjest.lint.js. 

```bash
npx jewst --config --config ./test/jest.lint.js
```

That's going to run lining across all the files in my project. Of course, if I make a lining error in index.js, for example, saying foo() and call that, that foo is not defined. That's a lining error. If I ran that script again, then we're going to get that lining error printed out in the terminal, just like we do if we're using the regular ESLint CLI.

[02:31] Let's go ahead and get rid of foo(). A cool thing about having this all configured in Jest is now we can add that to our jest.config.js here to have testjest.lint.js.

```js
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
  projects: [
    './test/jest.lint.js',
    './test/jest.client.js',
    './test/jest.server.js',
  ],
```

[02:44] Now if we run `npm t` to run our tests, that runs all of our tests in parallel, and that includes our linting. If I hit A to run all the tests, we're going to get our lining, our client, and our server, and it's all running in this beautiful watch mode that we have.

[02:59] We can hit the O key again, to only run the things that are impacted by the changes that we've made. We get that lining feedback, which is cool. On top of this, we can go to our package JSON and update our lint script. Now, it is jestconfigtestjest.lint.js.

```js
"scripts": {
    "test": "is-ci \"test:coverage\" \"test:watch\"",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch",
    "dev": "webpack-dev-server --mode=development",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --single --listen 8080 dist",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|css|html|md)\"",
    "lint": "jest --config test/jest.lint.js",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm install && npm run validate"
```

[03:16] Even better than that is now we no longer need to run our lining as part of the validate script because that's going to happen naturally through the test script. We get all the beautiful benefits of Jest watch mode and even the capability of only running glinting on the files that are relevant to the changes that we've made.

```js
"scripts": {
    "test": "is-ci \"test:coverage\" \"test:watch\"",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch",
    "dev": "webpack-dev-server --mode=development",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --single --listen 8080 dist",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|css|html|md)\"",
    "lint": "jest --config test/jest.lint.js",
    "validate": "npm run test && npm run build",
    "setup": "npm install && npm run validate"
```

[03:34] In review to make this happen, we installed Jest runner ESLint. We configured a Jest configuration that uses Jest runner ESLint with a runner configuration option.

[03:45] We specified our test match to be all JavaScript files in our root directory, which is the root of our project. We specified lint as the display name so we can differentiate this from our other test configurations.

[03:57] We added our test configuration to the projects under our root configuration here. We also made sure that Jest runner ESLint was configured so it uses git ignore for the ignore path. Then we could update our lint script to run with Jest and we were able to remove the lint script because our linting is run as part of our tests now.

[04:18] This might seem like just an extra dependency that's not totally necessary. Depending on your project, it might not be totally necessary. It can be nice for bigger projects where you have tons of files that you're linting and you want to scope down the files that you're linting to just the ones that you're working with at the time you're committing your code.
