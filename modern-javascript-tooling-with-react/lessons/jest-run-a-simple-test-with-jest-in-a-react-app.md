Any time I start a new project from this boilerplate, I'd like to be set up to run test. We're going to do that with Jest. I'm going to do an `npm i -D`, to save as a dev dependency, `jest`.

With that installed, let's open up the `package.json` file. In my `scripts`, I'm going to update this `test` script. I'm going to remove this default script. I'm going to replace it with `jest`. We can save that.

#### package.json
```javascript
"scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev": "webpack-dev-server --open --config webpack.config.dev.js",
    "dev:hot": "npm run dev -- --hot",
    "test": "jest"
  },
```

Back in the terminal, I'm going to do an `npm test` to run the script. When I do this, I'm going to get an error that no tests were found.

![No Tests](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563603/transcript-images/jest-run-a-simple-test-with-jest-in-a-react-app-no-tests.png)

Let's create our first test file. We can either put tests in an `__tests__` directory, or we can colocate them. We can use the `.spec` or `.test.js` extension.

I'm going to colocate my tests. In `src`, I'm just going to add a new file. I'm going to call it `App.spec.js`. In this file, I'm going to start with a `describe` block. Describe is going to take a string for what we're testing. In this case, it'll be our `App` component and a function. I'll just use an arrow function here.

#### App.spec.js
```javascript
describe('App', () => {

})
```

Then we can use either `test` or `it` to define an individual test. For now, we're just going to put in a test that passes. We're just going to say, `it('Runs and passes')`. This isn't going to be a valuable test, but it'll allow us to test our Jest script.

In here, I'm just going to say that I `expect(true).toBe(true)`.

#### App.spec.js
```javascript
describe('App', () => {
  it('Runs and passes', () => {
    expect(true).toBe(true)
  })
})
```

I can save that file. Back in the terminal, I'm going to `npm test` again. That's going to run our `App.spec.js`. We'll see that it passes.

#### Passing Test
![Pass](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563596/transcript-images/jest-run-a-simple-test-with-jest-in-a-react-app-pass.png)

If I want to make sure that it can fail, I can just come in here and make an expectation that can't possibly pass.

#### App.spec.js
```javascript
describe('App', () => {
  it('Runs and passes', () => {
    expect(true).toBe(false)
  })
})
```

We'll `npm test` one more time. Our test fails.

#### Failing Test
![Test Fail](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563599/transcript-images/jest-run-a-simple-test-with-jest-in-a-react-app-fail.png)

Let's fix that, `npm test`. Now we have a passing test and a working test script.
