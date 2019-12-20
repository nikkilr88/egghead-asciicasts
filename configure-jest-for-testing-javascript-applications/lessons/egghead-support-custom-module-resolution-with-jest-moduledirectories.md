The way our `CalculatorDisplay` is implemented, the `calculator-display` is imported. It's asynchronously loaded. 

### calculator.js
```js
const CalculatorDisplay = loadable({
  loader: () => import('calculator-display').then(mod => mod.default),
  loading: () => <div style={{height: 120}}>Loading display...</div>,
})
```

When we run our test here, in `src/__tests__`, if I pull out the `container`, and I'm going to pull out this `debug` function. We'll `debug(container)`. 

### src/__tests__
```js
test('renders', () => {
    const {container, debug} = render(<Calculator />)
    debug(container)
})
```

I pop open the terminal and run my tests. 

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS src/__tests__/calculator.js

 ...

    <div 
        style='height: 120px;'
    > 
        Loading display...
    </div>

 ...
```

I'm going to see that the `calculator-display` was not loaded and we're actually rendering the `Loading Display...` instead, which is actually what the user is going to see. Maybe that's what I want.

If I want to be able to skip over that for my testing purposes, then I can actually `import loadable from 'react-loadable'`. I'll turn this into an `async` test. 

### src/__tests__
```js
import loadable from 'react-loadable'

test('renders', async () => {
    await loadable.preloadAll()
    const {container, debug} = render(<Calculator />)
    debug(container)
}
```

I will `await loadable.preloadAll()` and then run this again so that I can get my `CalculatorDisplay`.

```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 FAIL  src/__tests__/calculator.js
  ● renders

    Cannot find module 'calculator-display' from 'calculator.js'

       9 | // handle with Jest and many people will want to know :).
      10 | const CalculatorDisplay = loadable({
    > 11 |   loader: () => import('calculator-display').then(mod => mod.defaul
t),
         |           ^
      12 |   loading: () => <div style={{height: 120}}>Loading display...</div>,
      13 | })
      14 |

      at Resolver.resolvemodule (node_modules/jest-resolve/build/index.js: 210:17) 
      at src/calculator.js:11:17
      
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/calculator-display.js

Test Suites: 1 failed, 3 passed, 4 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        3.209s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

I'm getting a `cannot find module 'calculator-display'`. The reason for this is because here, in `calculator.js` we're importing `calculator-display` as if it were a node module, but it's not a node module. It actually lives in the `shared` directory as `calculator-display`. The way that it works in the app is we have our webpack configuration set to `resolve` `modules` to `node_modules`, just like node would in a regular commonJS environment.

```js
resolve: {
    modules: ['node_modules', path.join(__dirname, 'src'), 'shared']
}
```

01:15 We also have this helper here, `path.join(__dirname, 'src')`, to resolve node modules based off of the source so we can import things from that `src` directory, and then also `shared`. 

Any of these files inside of our `src` directory, if they're inside of a shared, they can actually be treated as if they were in node modules, which is a really handy thing for a giant project.

However, that poses a problem for us in Jest because Jest doesn't consume this webpack configuration. It doesn't resolve the modules the way webpack is resolving them.

Let's see how we can solve this problem using Jest configuration. I'm going to copy this and go over to my `jest.config.js`. I'll say `moduleDirectories`, and I'll just paste in the exact same thing we had before.

### jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js'),
}
```

Now, I need to pull in `path`. We'll say `const path = require('path')`. 

```js
const path = require('path')
```

Now, if I pull up my tests and I run the tests again, everything runs perfectly. 

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest
 ...
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/utils.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        3.209s
Ran all test suites.
```

I can scroll up here. I see that my `CalculatorDisplay` was, in fact, rendered.

```bash
<div
    class="css-xeqdt1"
    >
        <div
            class="autoScalingText"
            style="trasnform: scale(1,1);"
            >
            0
            </div>
        </div>
```

In review, this was pretty simple. I just checkout my `webpack.config.js`, see the `resolve` modules here. I copy that into my `jest.config.js` to have a `modulesDirectory`.

Now, I can require anything from within a `shared` directory anywhere in the structure of my project source, and it will be treated as if it were in `node_module`'s directory, both from my webpack configuration as well as my tests with `Jest`.