Someone's made a change to our app that's really cool. It allows us to use this `ThemeProvider` and choose between our `dark` and a `light` theme for our UI.

### app.js
```js
import * as themes from './themes'

class App extends React.Component {
  state = {theme: 'dark'}
  handleThemeChange = ({target: {value}}) => this.setState({theme: value})
  render() {
    return (
      <ThemeProvider theme={themes[this.state.theme]}>
        <React.Fragment>

      ...
    )
  }
}
```

Those themes will determine what color are `displayTextColor` and `displayBckgroundColor` should be, so that our UI can change based off of the user's preferences.

### themes.js
```js
export const dark = {
  displayTextColor: 'white',
  displayBackgroundColor: '#1c191c',
}

export const light = {
  displayTextColor: '#1c191c',
  displayBackgroundColor: 'white',
}
```

This is using the `ThemeProvider` from `emotion-theming`, and that provides those theme values to anything that's using `emotion`.

### app.js
```js
import {ThemeProvider} from 'emotion-theming'
```

Right now, we're only using that in this `CaclulatorDisplay` component that we're testing with this `calculator-display` file.

### __tests__/calculator-display.js
```js
import React from 'react'
import {render} from 'calculator-test-utils'
import CalculatorDisplay from '../calculator-display'

test('mounts', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container.firstChild).toMatchSnapshot()
})
```

Then, we open up the `CaclulatorDisplay` implementation, and we can see this `DisplayContainer` that's using those theme values to set the `color` and the `background`.

### calculator-display.js
```js
const DisplayContainer = styled.div(({theme}) => ({
  color: theme.displayTextColor,
  background: theme.displayBackgroundColor,
  lineHeight: '130px',
  fontSize: '6em',
  flex: '1',
}))
```

In our test, we're using `toMatchSnapshot`, because we've configured our `serializer` for emotion.

### __tests__/calculator-display.js
```js
test('mounts', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container.firstChild).toMatchSnapshot()
})
```
### setup-tests.js
```js
import 'react-testing-library/cleanup-after-each'

// add jest-emotion serializer
import {createSerializer} from 'jest-emotion'
import * as emotion from 'emotion'

expect.addSnapshotSerializer(createSerializer(emotion))
```

We should see a `snapshot` here that has our `CSS` right in there.

### __snapshots__/calculator-display.js.snap
```js
exports[`mounts 1`] = `
.emotion-0 {
  color: white;
  background: #1c191c;
  line-height: 130px;
  font-size: 6em;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

...
`
```

With these changes though, let's see how that impacts our output. We'll run `npm t` to run the test.

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS  src/__tests__/calculator.js
 FAIL  src/shared/__tests__/calculator-display.js
    ● mounts

    expect(value).toMatchSnapshot()

    Recieved value does not match stored snapshot, "mounts 1".

    - Snapshot
    + Recieved

    ßß -1,8 +1,6 ßß
      .emotion-0 {
          color: white;
      -   background: #1c191c;
      ...
      }

Test Suites: 1 failed, 3 passed, 4 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   1 failed, 1 total
Time:        3.267s
Ran all test suites.
npm ERR! Test failed. See above for more details.
```

We're going to get a fail snapshot, because now the `color` in `background` are not supplied. If we look at that `CalculatorDisplay` again, we're going to see the `color` in `background` are derived from the theme.

### __tests__/calculator-display.js
```js
test('mounts', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container.firstChild).toMatchSnapshot()
})
```

In our application, we're providing the theme using the `ThemeProvider`. In our test, we're not providing the `theme` at all, because we're not rendering this inside of a `ThemeProvider`.

To solve, this is actually fairly simple. We can import `ThemeProvider` from `emotion-theming`, and we can import dark which is the default from back, back, back, back, themes. We can wrap this in a `ThemeProvider` with the theme as dark. We'll take that `calculator-display` and put it inside that `ThemeProvider`.

```js
import CalculatorDisplay from '../calculator-display'
import {dark} from '../../themes'

test('mounts', ( => {
  const {container} = render(
    <ThemeProvider theme={dark}>
      <CalculatorDisplay value="0" />
    </ThemeProvider>
  )
  expect(container.firstChild).toMatchSnapshot
})
```

Now if you run this again with `npm t` to run our test, everything is passing that `snapshot` matches.

```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS  src/__tests__/calculator.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/utils.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        3.267s
Ran all test suites.
```

This same thing would happen if we're using the Redux Provider, or React Router Provider, or some internationalization provider. Anytime we're rendering a component that needs access to a provider, we have to render that component inside that provider, when we're rendering it for a test.

```js
render(
  <ThemeProvider theme={dark}>
      <CalculatorDisplay value="0" />
  </ThemeProvider>
)
```

The thing is that lots of the time, we'll just refactor a component to start using `emotion` and we experience some of these problems.

It would be really nice, if we don't have to even think about the `ThemeProvider` or the React Router Provider to be able to use some of those features that we're going to be using in our application.

It will be nice, if this `render` method could just render all the providers that we're really care about automatically for us. Let's work a way there. I'm going to make a function here called `renderWithProviders`. This is going to accept a `ui` and `options`. I'm just going to copy this and paste it right here. Instead of the `CalculatorDisplay` hard coded here, we can now just `render` the `UI` as a child, and we'll pass `options` as the second argument here. Instead of render, we'll use `renderWithProviders` or get rid of the `ThemeProvider`.

```js
function renderWithProviders(ui, options) {
  render(<ThemeProvider theme={dark}>{ui}</ThemeProvider>, options)
}

test('mounts', ( => {
  const {container} = renderWithProviders(
  expect(container.firstChild).toMatchSnapshot
})
```

Let's go ahead and `return` that value, so that we can get access to the `{container}` and all the other `utilities` that `render` is going to give to us.

```js
function renderWithProviders(ui, options) {
  return render(<ThemeProvider theme={dark}>{ui}</ThemeProvider>, options)
}
```

Now if you run our test again, we should have this continuing to pass.

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS  src/__tests__/calculator.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/utils.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        2.431s
Ran all test suites.
```

Now, we have a useful utility that we could use throughout our application. Let's make this accessible throughout our application by copying this over into a new file in our `test` directory called `calculator-test-utils.js`. In here, we'll just paste that. We'll export `renderWithProviders` and we can get rid of the `CalculatorDisplay` and fix this import up.

### test/calculator-test-utils.js
```js
import React from 'react'
import {render} from 'react-testing-library'
import {ThemeProvider} from 'emotion-theming'
import {dark} from '../src/themes'

function renderWithProviders(ui, options) {
  return render(<ThemeProvider theme={dark}>{ui}</ThemeProvider>, options)
}

export {renderWithProviders}
```

We can go to our `calculator-display-test` here. We'll import `renderWithProviders` from back couple directories test `calculator-test-utils`. Get rid of this. We don't need that or those anymore.

### __tests__/calculator-display.js
```js
import React from 'react'
import CalculatorDisplay from '../calculator-display'
import {renderWithProviders} from `../../../__test__/calculator-test-utils`

test('mounts', () => {
  const {container} = renderWithProviders(<CalculatorDisplay value="0" />)
  expect(container.firstChild).toMatchSnapshot()
})
```

Then, we can run our test again, and our tests continue to pass.

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS  src/__tests__/calculator.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/utils.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        2.431s
Ran all test suites.
```

This is great. Now, we can use this throughout our app, but as we store refactoring things and moving things around, these dot dots, `../../../../`, get really, really annoying, really quickly. Let's see if we can make `Jest` understand that we want to treat this like a regular `node module`.

### __tests__/calculator-display.js
```js
import {renderWithProviders} from `calculator-test-utils`
```

I'm going to pop up in `jest.config.js`. We actually did something similar to this with the `module` directories, when we wanted to mimic the `webpack.config.js` configuration for result modules.

We can do something special for our test, so that anything inside the test directory will be accessible, as if it is a node module. Let's go ahead and do that. We're going to into the same thing we did with our source here, except we're going to do it for the test directory.

### jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src'),
    'shared',
    path.join(__dirname, 'test'),
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js'),
}
```

Now, if we go to our test here, when we import the `calculator-test-utils`, it's going to resolve from the test directory. Now, I can pull this out.

### __tests__/calculator-display.js
```js
import {renderWithProviders} from `calculator-test-utils`
```

Run `npm t` to run our test again and all our test continue to pass.

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS  src/__tests__/calculator.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/utils.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        2.431s
Ran all test suites.
```

Now, we can use this anywhere in our test and this `renderWithProviders` will be accessible.

### __tests__/calculator-display.js
```js
import {renderWithProviders} from `calculator-test-utils`
```

Like I said, that would be really nice, if we don't have to worry about whether or not this `CalculatorDisplay` using anything from the providers.

```js
  test('mounts', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container.firstChild).toMatchSnapshot()
})
```

If we could just, maybe have a regular `render` from here, `calculator-test-utils`, and this is the one that we use everywhere in our code base.

```js
import {render} from `calculator-test-utils`
```

Let's go and do that. We'll just rename this as `render`, and just forget measure we can `export * from react-testing-library`. Now, we can use all of the utilities that `react-testing-library` provides. We're overriding the `render` to be this `renderWithProviders`.

### calculator-test-utils.js
```js
export * from 'react-testing-library'
export {renderWithProviders as render}
```

Now anywhere in our application, that were using `react-testing-library`, we can actually use `calculator-test-utils`. We can do that here in our calculator test here as well. It will work regard this of whether we add emotion, or Redux, or React Router.

We can always just update the `render` method here and the `calculator-test-utils.js`. That will automatically work for everywhere else that's using the `render` method we're exporting here.

There's one last thing that I want to show you here and that is this red underline.

![a photo showing the red underline and error message](../images/egghead-support-a-test-utilities-file-with-jest-moduledirectories.png)

We're getting a problem with `ESLint` not being able to resolve in this path. It'll be really nice, if we could have `ESLint` to resolve this, so that I could touch typos like this, `'calculator-test-utilss'`

This is working, because I'm using `eslint-plugin-import` to check my imports. What we can do is, we can add a new resolver for `eslint-plugin-import`. `npm install` as a dev dependency, `eslint-import-resolver-jest`.

### Terminal
```bash
$ npm install --save-dev eslint-import-resolver-jest
```

Now with that installed and saved into our dev dependencies, we can jumped on here to our `ESLint` configuration and add overrides. For files that match `'**/__test__`. Anything in our `tests` directory will have this `settings` be overridden for `import/resolver`. We're going to use the `jest` resolver. We'll specify the `jestConfigFile` to be path that join `__dirname` and `jestconfig.js`.

```js
module.exports = {
  extends: [
    'kentcdodds',
    'kentcdodds/import',
    'kentcdodds/webpack',
    'kentcdodds/jest',
    'kentcdodds/react',
  ],
  overrides: [
    {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
  ],
}
```

We'll require `path` from `path`. With that, `eslint-plugin-import` can use this `Jest` configuration, pull the `module directories`, and use that in its resolution of these packages. For your look at our `calculator-test` here again, we're going to get that this `calculator-test-utils` is correct.

If I typo, then I'm going to get ESLint warning me about that.

![image of typo and warning error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-support-a-test-utilities-file-with-jest-moduledirectories-typos.png)

In our view, the problem that we're trying to solve here is, we want to render this `CalculatorDisplay` with the `themeProvider` that it requires without having to worry about that `themeProvider`.

We're going to create a `render` method in this `calculator-test-utils`. We can use that and it will provide all the providers that we need for our application. In our `jest.config.js` configuration, we make that possible by using the `moduleDirectories` and providing a path for this `tests` directory.

Any files inside of this `tests` directory can be imported as if there `node_module`s and we can avoid the `../` all over a test base. With this in place now, we can use the `themeprovider`.

We could also use the unstated provider, or the react-router-provider, or the ReduxProvider and have them all wrapped inside of this, so we could say router, and we could say `ReduxProvider` and wrap that as well, just like you would see at the root of your application where you're adding all these providers.

### calculator-test-utils.js
```js
function renderWithProviders(ui, options) {
  render(
    <Router>
    <ReduxProvider>
      <ThemeProvider theme={dark}>{ui} </ThemeProvider> options
    </ReduxProvider>
  </Router>,
  )
}
```

08:23 You could also add `options` for this. If you could say `store`, it calls store or `options.store`. You could `import` the default `store` from the application, or somebody could provide their own copy of the store. There are lots of options for you, when you provide this customer `render` method that you can use throughout your application.

```js
function renderWithProviders(ui, options) {
  render(
    <Router>
      <ReduxProvider store ={store || options.store} >
        <ThemeProvider theme={dark}>{ui} </ThemeProvider>
      </ReduxProvider>
    </Router>,
    options,
  )
}
```