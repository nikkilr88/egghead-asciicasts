Let's go ahead and add a test for this `calculator.js` file. We'll add a folder called `__tests__`, and inside of there, `calculator.js`, right next to the calculator file that we're testing. Then I'm going to just paste in some code to `import {render} from 'react-testing-library'` and that `Calculator` component.

#### __tests__/calculator.js
```js
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render} from 'react-testing-library'
import Calculator from '../calculator'

test('renders', () => {
  render(<Calculator />)
})
```

Let's go and save this, and we'll run our tests. Now, we're getting a syntax error, unexpected token import, right here.

#### Unexpected Token Import Error
![Unexpected Token Import Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907434/transcript-images/egghead-handle-dynamic-imports-using-babel-with-jest-unexpected-token-import.png)

In our Babel configuration, we're instructing Babel to transpile imports to `commonjs`. We see right here.

#### .babelrc.js
```js
['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
```

`modules` should be compiled to `commonjs` during the tests. However, that's just for static modules. Here, we're using a dynamic import that Webpack supports natively. That is failing our test because babel won't transpile this to `commonjs`.

#### src/calculator.js
```js
const CalculatorDisplay = loadable({
  loader: () => import('calculator-display').then(mod => mod.default),
  loading: () => <div style={{height: 120}}>Loading display...</div>,
})
```

We need to install a new package that will transpile this to `commonjs` so that our tests will work. We'll run `npm install --save-dev babel-plugin-dynamic-import-node`.

Now, let's go ahead and update our Babel configuration to use this plugin, but we only want to use it when we're running our tests. We want Webpack to take over in production when we're building our application. Let's add this right here, `isTest ? 'babel-plugin-dynamic-import-node'.`

#### .babelrc.js
```js
isTest ? 'babel-plugin-dynamic-import-node' : null,
```

Otherwise, `null`. With that, if we now run our tests, everything is passing.

In review, the reason that we have this problem is because we have a dynamic import, which is not supported in `Node`. To make this work, we had to install a babel plugin into our `devDependencies` called `babel-plugin-dynamic-import-node`. Then we configure Babel to include that during our test environment when the `process.env.NODE_ENV` is 'test', which `Jest` will set up for us automatically.

#### .babelrc.js
```js
const isTest = String(process.env.NODE_ENV) === 'test'
```

Then everything works just fine.