Let's go ahead and write a test for this React component. I'm going to create a new file called `auto-scaling-text.js` inside of that `__test__` directory, right next to that file I want to test. I'm going to go ahead and paste in a test here.

#### auto-scaling-text.js
```js
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render} from 'react-testing-library'
import AutoScalingText from '../auto-scaling-text'

test('renders', () => {
    render(<AutoScalingText />)
})
```

Here I'm going to need the `react-testing-library`, so I'll go ahead and `npm install` as a dev dependency to `react-testing-library`. All this test is doing is making sure that this component will render.

#### Terminal
```bash
$ npm install --save-dev react-testing-library
```

With that installed let's go ahead and run our test with `npm t`, and we're going to get a syntax error here.

#### Syntax Error
![an image of the syntax error script](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907432/transcript-images/egghead-support-importing-css-files-with-jest-s-modulenamemapper-syntax-error.png)

This message is a little bit confusing. If you look right here that's where it's pointing -- `auto-scaling-text`. That's coming from this `auto-scaling-text` CSS file. The reason that it's throwing that error is if we look at the `auto-scaling-text` file, we're importing styles from `auto-scaling-text.module.css`.

Jest is running these imports in Node. When it sees this, it's going to treat that file as a Node module. With Webpack, we have a loader and that's how this works.

We have this `css-loader` and this `style-loader`, so that we can `import` the CSS files and use the CSS modules in our React components.

Let's see how we can go ahead and fix this using our Jest configuration. We need to tell Jest that any time it comes across a file that ends in `.css`, we want it to resolve to some other module, or we want to give it some kind of module for it to resolve to instead of trying to `import` that `.css` file itself.

In our `jest.config.js`, we can add a `moduleNameMapper` object here. The key is a string regexp that matches the file we want to map to. Here we'll say it ends in `.css`. We want this to map to a new file that we're going to create in a `test` directory. We'll just call it `style-mock.js`.

#### jest.config.js
```js
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.css$':
    }
}
```

A style mock, it doesn't need to be anything special. We'll just say `module.exports` equals this empty object.

#### style-mock.js
```js
module.exports = {}
```

Then back in our configuration, we want this resolve to that module  . We'll say `require.resolve('./test/style-mock.js')`.

#### jest.config.js
```js
moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js'),
  }
```

With that in place, we can run our test again, and our tests are passing. Now we can test files that are using imports of CSS.

#### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.j
s

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.334s
Ran all test suites.
```

We can do this with any kind of loader. If it's a `.graphql` import or an `.svg` import, any of those kinds of things we can make our own `moduleNameMapper` and load different kinds of modules based off of the file name. That will cover the custom Webpack loaders that we have defined in our Webpack config.