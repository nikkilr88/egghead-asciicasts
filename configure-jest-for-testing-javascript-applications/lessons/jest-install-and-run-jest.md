To get started with Jest in an existing project, we're going to `npm install` as a dev dependency Jest.

#### Terminal
```bash
$ npm install --save-dev jest
```

With Jest installed and saved into our `package.json`, we can now use the Jest binary that's been installed into our node modules in `.bin`. We'll find Jest right there. With that, we can use it in a `test` script. We'll just put Jest here. Let's go ahead and run that `test` script with `npm run test`

```bash
$ npm run test
```

or `npm test`

```bash
$ npm test
```

or `npm t`.

```bash
$ npm t
```

All three of those will run the same thing. First, we're going to get an error, "No test found."

```bash
$ npm t
> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

No test found

...
npm ERR! Test failed.  See above for more details.
```

Let's go ahead and make a test, just an example. I'll add a test directory here. In that directory, we'll have an `example.js`. Here, we'll have a simple test that simply says, "It works."

#### example.js
```json
test('works', () => {})
```

If we run `npm t`, it will run our test that says, "It works."

#### Terminal
```bash
$ npm t
> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS  src/__tests__/example.js
  ✓ works (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.542s
Ran all test suites.
```

Now we can start writing some tests with Jest. One last thing I'm going to do here is we have a Travis configuration that runs a validate script on CI. I want to run these tests as part of CI. I'm going to update that validate script to include `npm run test`.

```json
"validate": "npm run lint && npm run test && npm run build",
```

When somebody runs the `setup` script, which will run the `validate` script, or when CI runs the `validate` script, it's including our tests automatically.

In review, to make all of this work, we simply need to install Jest and then add a script called `test` to run Jest. Then we need to have a test file in our project.

By default, Jest has a test match that will match any file in a test directory or any file that ends in a `.spec` or `.test.js`. Here we created our test and an `example.js` file in there. When we run our `test` script, it works.

