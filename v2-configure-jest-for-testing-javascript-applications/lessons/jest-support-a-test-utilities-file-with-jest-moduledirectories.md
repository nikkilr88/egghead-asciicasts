Instructor: [00:00] Somebody's made a cool change to our application to add theming support. We're using emotion-theming now. We have this ThemeProvider. We can specify our theme based off of this theme state.

[00:12] We've got a dark and a light theme. We're going to default to dark here. Now our calculator-display is using a emotion styled div and determines the color based on the theme for the display text color and the display background color.

[00:29] Now users can change the theme. They can change the way that the calculator looks. That's great. However, our tests need to change because the calculator-display is being rendered in total isolation, which is what we want, except it's being rendered in isolation from the ThemeProvider, which is required.

[00:46] With these changes, if I run `npm t` again, we're going to get a failed snapshot. The failure here is that the snapshot says we need to have a color white and a background of #, whatever that is.

[00:58] We're not getting that in the received value. That's because, when emotion comes around and says, "OK, let's get the styles for this thing. Here's the theme," there is no theme.

[01:07] That theme is an empty object. These are all user undefined, and so color and background are undefined. Therefore, they don't show up in our snapshot.

[01:15] In the real world, this is going to be rendered within our ThemeProvider. We want our tests to do the same thing.

[01:22] The solution for this is actually pretty straightforward. We can just import the ThemeProvider from emotion-theming, and then we render our calculator-display within a ThemeProvider. We specify that theme.

[01:36] Let's pull in that theme, too. Here we have a dark and a light option. Here, we'll import dark from themes, and then we're going to specify our theme to be that dark theme. 

```js
import React from 'react'
import {render} from '@testing-library/react'
import {ThemeProvider} from 'emotion-theming'
import {dark} from '../../themes'
import CalculatorDisplay from '../calculator-display'

test('renders', () => {
  const {container} = render(
  <ThemeProvider theme={dark}>
    <CalculatorDisplay value="0" />
    </ThemeProvider>,
   )
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

```


Now, if we run `npm t` to run our tests, our snapshot is passing.

[01:56] While this is great, this isn't perfect because, if I wanted to use the rerender method here, and I wanted to rerender our calculator-display with a value of 1, for example, then I'd actually have to render this in the ThemeProvider again. You can see how that would not be super great.

[02:16] What we're going to do instead is I'm going to make a wrapper here. Let's say wrapper. That's going to take a prop for children, and then we're going to return the ThemeProvider with the children. We'll have the theme set to dark.

[02:33] Then, instead of passing it like this, we'll pass it as an option for wrapper as that wrapper component. We're getting a linting warning here.

[02:42] Let's go ahead and say, wrapper.prop-types= an object that has children with PropTypes.node. That's what we're expecting as the children. We'll import PropTypes from 'prop-types'. 

```js
import React from 'react'
import PropTypes from 'prop-types'
import {render} from '@testing-library/react'
import {ThemeProvider} from 'emotion-theming'
import {dark} from '../../themes'
import CalculatorDisplay from '../calculator-display'


function Wrapper({children}) {
  return <ThemeProvider theme={dark}>{children}</ThemeProvider>
}

Wrapper.propTypes = {
  children: PropTypes.node,
}

test('renders', () => {
  const {container, rerender} = render(<CalculatorDisplay value="0" />, {
    wrapper: Wrapper,
    })
   rerender(<CalculatorDisplay value="1" />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
```

Magic ensues. We can run `npm t` script again here to run our tests.

[03:00] We're getting a snapshot failure. That's because I rerendered the one. Rerendering is working. Let's get rid of that rerender `rerender(<CalculatorDisplay value="1" />`and `rerender`. 

```js
test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />, {
    wrapper: Wrapper,
    })
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
```


Save that, and run `npm t` here. Our tests are passing.

[03:14] As cool as it is that I can have this little abstraction right here, I don't want to have to write this abstraction for all of the tests that are using the ThemeProvider. In fact, it'd be really nice if I didn't have to think about that ThemeProvider at all.

[03:26] The same thing applies for a router, a Redux provider, or whatever other context provider you have. It would be really nice if I could just say, "Hey, render this thing as if it were being rendered in the regular app."

[03:40] Then the wrapper here can be responsible for rendering all the same providers that our app is rendering with, the router or whatever other context providers that you're rendering. What if instead we make our own custom render with providers here. That's going to take a UI and an options. We'll make this resemble pretty much the same API that I rendered as.

[04:03] Here, we'll return a render with the UI and the options. We're going to merge those options with our own wrapper. Say wrapper here.

[04:14] Instead of render down here, we'll say render with providers. We don't need to worry about the wrapper.

[04:19] What would be even better is if we changed this from render to as RTL for React Testing Library render. We'll call that render, then we'll call this render, and call this render.

[04:31] There we go. Now, as far as the test is concerned, this is just a regular render. It manages wrapping this in all of the providers for our app.

```js
import React from 'react'
import PropTypes from 'prop-types'
import {render as rtlRender} from '@testing-library/react'
import {render} from '@testing-library/react'
import {ThemeProvider} from 'emotion-theming'
import {dark} from '../../themes'
import CalculatorDisplay from '../calculator-display'

function render(ui,options) {
  return rtlRender(ui, {wrapper: Wrapper, ...options}}
}

function Wrapper({children}) {
  return <ThemeProvider theme={dark}>{children}</ThemeProvider>
}

Wrapper.propTypes = {
  children: PropTypes.node,
}

test('renders', () => {
  const {container} = renderWithProviders(<CalculatorDisplay value="0" />,)
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
```

[04:40] Let's go ahead and move this into a reusable place so that other test components in our app can reference this. I'm going to go into my test directory. We'll make a calculator-test-utils file here. I'm going to copy all of this stuff from `Wrapper.proptypes` up. We'll paste it in the calculator-test-utils file

[05:00] We don't need `import CalculatorDisplay from '../calculator-display'` in here. Our dark is going to come from source themes, and then we're going to export render. For good measure, let's go ahead and export everything from testing-library/react.

```js
import React from 'react'
import PropTypes from 'prop-types'
import {render as rtlRender} from '@testing-library/react'
import {render} from '@testing-library/react'
import {ThemeProvider} from 'emotion-theming'
import {dark} from '../src/themes'

function render(ui,options) {
  return rtlRender(ui, {wrapper: Wrapper, ...options}}
}

function Wrapper({children}) {
  return <ThemeProvider theme={dark}>{children}</ThemeProvider>
}

Wrapper.propTypes = {
  children: PropTypes.node,
}

export * from '@testing-librasry/react'
export {render}
```

[05:17] For all intents and purposes, people can use calculator test utils just like they use testing library React, except the render that they're going to get is one that automatically wraps all of the providers that our app typically provides. Let's go ahead and save that.

[05:32] Then we'll come into our calculator display test, and we'll import render from going back up to our test calculator test utils. We'll get rid of all this stuff and call that render. Then we can get rid of `import {render as rtlRender} from '@testing-library/react'`, get rid of import `PropTypes from 'prop-types'`, `import {ThemeProvider} from 'emotion-theming'`, and `import {dark} from '../../themes'`.

```js
import React from 'react'
import {render} from '../../../test/calculator-test-utils'
import CalculatorDisplay from '../calculator-display'

test('renders', () => {
  const {container} = renderWithProviders(<CalculatorDisplay value="0" />,)
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
```

[05:54] Our test looks actually like it did before, except now the render method automatically sets up that wrapper for us. If we run `npm t` just to verify that everything's working, indeed it is. We can just use calculator test utils in place of testing library React, except I don't really like all of these dot dots.

[06:15] Let's go ahead and make it so I can actually import this as if it's a node module. To do this, I'm going to go to my jest-configuration.js. Here, we can determine what the module directories are in this module directories configuration.

[06:29] We say, "Hey, you can import things as if they're node modules from directories called node modules, the source directory specifically, and directories called shared." Let's add another one here for the test directory. Instead of source, we'll do test.

[06:45] Anything that lives inside this test directory can be imported as if it's a node module.

```js
moduleDirectories: [
  'node_modules',
  path.join(__dirname, 'src'),
  'shared',
  path.join(__dirname, 'test'),
],
```

With that, we'll save this. Even though ESLint is giving us that warning, Jest can actually resolve this properly. I can go all over my code base. Anywhere that I find `@testing-library/react`, I can go in here. We'll replace this with `calculator-test-utils`. We'll do the same for this one.

[07:12] Of course, calculator test utils actually does need testing library React. We'll leave that one there. With all those changes, we run `npm t` again. All of our tests are passing. It would be cool if we didn't have this warning right here. That warning is coming from ESLint. The import plugin, no unresolved.

[07:31] That import plugin actually has a specific resolver for Jest that we're going to install. Let's pop open our terminal here. We'll npm install and save as a dev dependency. ESLint import resolver Jest. 

```bash
npm install --save-dev eslint-import-resolver-jest
```

With that installed, now we can go to our eslintrc.

[07:50] Similar to the overrides we have for setting up the import resolver for Webpack, we're going to do pretty much the same thing for our test files. Here, we'll say, "Import resolver." In our case, it's going to be Jest, but we want to configure this. Let's say Jest and Jest config file will be path.join, their name, jest.config.js.

```js
  overrides: [
    {
      files: ['**/src/**'],
      settings: {'import/resolver': 'webpack'},
    },
    {
      files: ['**/__test__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config)
        },
    }},
  ],
```

[08:15] That is pointing to jest.config.js right there. The import resolver for Jest will look up that Jest configuration file, and it will notice, "Oh, you have a module directories configuration." I'll resolve modules the way that Jest will resolve these modules.

[08:31] With that change now, I'm no longer getting this warning from ESLint. If I make a typo, I will get the warning, which is perfect. One other change that I'm going to make here is in my jsconfig, or if you're using TypeScript, this will be in your tsconfig.

[08:45] We are going to specify our paths include test/star. We'll add test/star as the files that are included in our jsconfig here as well. 

```js
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "*": ["src/*", "src/shared/*", "test/*"]
    }
  },
  "include": ["src", "test/*"]
}
```

That will allow us to hit F12 and take us right to the right file in VS code. One last thing I want to show you here is that by having a custom render method, we can actually customize this wrapper even further.

[09:10] Here, we're rendering the theme provider. That means we don't get to choose what that theme is for this calculator display. What if I wanted to specify a specific theme? We import light from going up to our themes here. Then what if I wanted to say, "Hey, I want the theme to be the light theme"?


```js
import React from 'react'
import {render} from '../../../test/calculator-test-utils'
import {light} from '../../themes'
import CalculatorDisplay from '../calculator-display'

test('renders', () => {
  const {container} = renderWithProviders(<CalculatorDisplay value="0" />, {theme: light})
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
```

[09:28] I want to expose that nice API. We could do the same thing for our store, for the router, or whatever else. How would we make that work? In our calculator-test-utils here, we're going to actually take Wrapper, and we're going to move it inside our custom Render function.

[09:43] I'm going to take these options. We're going to take all of those, just take the rest of the options from this object. We're going to pluck off the theme. We'll default that to themes.dark, and then we'll specify the theme right here.

```js
import React from 'react'
import PropTypes from 'prop-types'
import {render as rtlRender} from '@testing-library/react'
import {render} from '@testing-library/react'
import {ThemeProvider} from 'emotion-theming'
import {dark} from '../src/themes'

function render(ui, {theme = themes.dark, ...options}) {
  function Wrapper({children}) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
Wrapper.propTypes = {
  children: PropTypes.node,
}
  return rtlRender(ui, {wrapper: Wrapper, ...options}}
}

export * from '@testing-librasry/react'
export {render}
```

[09:57] People can specify a custom theme if they want to. If we run `npm t` now, our snapshot's going to fail, because we're now using the light theme, which is exactly what we're looking for. Users of a render method can control not only the React testing library options, but also some custom options as well, which makes this very powerful.

[10:17] We're going to review. To make all of this work, we built a little abstraction that is specific to our application called, "calculator test utils." We stuck that inside of this test directory.

[10:27] Then to make it accessible as if it's a node module, to make it just as easy to use as Testing Library React, we configured our Jest-config module directories to be able to resolve those files that are in the test directory.

[10:40] We also updated our js.config so that it would include the test directory for VS code, and you would need to do something like this for your tsconfig if you are using Typescript. Then we also updated our ESLint RC so that ESLint can resolve the same way that Jest resolves modules.
