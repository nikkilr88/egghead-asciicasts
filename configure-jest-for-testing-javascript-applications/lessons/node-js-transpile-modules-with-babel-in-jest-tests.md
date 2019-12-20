This test isn't all that useful, so let's go ahead and delete it. We'll make a new one for this utility that we have here. I'm going to add a file next to it called `tests`, and then `utils.js`. Then I'll paste this simple test here. We `import {getFormattedValue}`, and use that in our test.

#### utils.js
```js
import {getFormattedValue} from '../utils'

test('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})
```

Now, if I run our test, I'm going to get a syntax error, "Unexpected token import."

#### Terminal
```bash
$ npm t
...
Unexpected token import
```

The reason this is happening is because ES modules are not supported in Node. Because Jest is running in Node, when it hits this `import` statement, we're getting that syntax error.

This project is using webpack, and it's using the Babel loader, so that we can use this kind of syntax. We have our Babel configured so that it can transpile those modules, except we have that disabled because we want webpack to utilize tree shaking.

We want this to be enabled during our test, but disabled during our production build. What we'll do is something very similar to this `isProd`. We'll make an `isTest`.

#### .babelrc.js
```js
const isTest = String(process.env.NODE_ENV) === 'test'
```

If the Node environment `isTest`, which is a default that Jest will set for us, then we'll add a ternary here. We'll say `isTest`, then `commonjs`, otherwise `false`.

#### .babelrc.js
```js
presets: [
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],

```
That's saying, "Hey, Babel preset env. When you come across a module, and if we're in the test environment, I want you to transpile that to `commonjs` so that it works in Node. Otherwise, we're probably building with webpack, and so, I don't want you to transpile that." Webpack can take over from there. With this in place, we can now run our tests again, and our tests are passing.

```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS  src/shared/__tests__/utils.js
  ✓ formats the value (24ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.913s
```

An important thing to note here is that we didn't actually have to configure Jest at all to make this work.

If we open up our `package.json` again, we'll see that we have Jest installed, and we'll see that we have a test that is specified to run Jest, but we don't have any configuration that is necessary to let Jest run our Babel configuration on our source code and our test code.

Jest will see that we have this `babelrc` file in our project, and it will automatically pick it up, and run all of our source and test files through that configuration. The only thing we needed to make sure of is that our Babel configuration worked for Node.