#### example.js

```js
test('it works', () => {})
```

Instructor: [00:01] This test isn't all that useful, so I'm going to go ahead and just get rid of this whole thing. Instead, I want to test this `utils.js` file, the `getformattedvalue` function. I'm going to add a `__test__` right next to it. This is going to be a directory. Here, I'm going to put a file called `utils.js` so `__tests__/utils.js`. That matches the file that I'm going to be testing.

[00:22] I'm going to just paste in some test code here where we're going to import the `getformattedvalue` from that utils. Then, have a test in here to verify that it actually does format a value.

```js
import {getFormattedValue} from '../utils'

test('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})
```

[00:33] If I save that, then jest should pick this up automatically because we're following the convention of the `__test__`, but we have a syntax error -- Unexpected Token {. What's going on here is jest runs in node, but node does not support import statements.

[00:50] Jest describes what's going on pretty well in the error here that you can take a look at. Basically, what's going on is we're not compiling our import statements. The way that this works in our app is we're actually compiling those import statements using Webpack.

[01:04] Webpack understands the import statements by default. We have Webpack configured further with the Babel Loader, so it'll compile everything else that isn't supported by the browsers that we don't support.

[01:14] The trick here is that in our Babel RC, we're configuring `@babel/preset-env` to not compile the modules so that Webpack can manage those.

**.babelrc.js**
```js
module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false}],
    '@babel/preset-react',
    [
    ...
```

Jest is actually automatically picking up this Babel configuration and applying it to our test code. However, because we have this configured to not compile the modules, that's where we're having the problem.

[01:33] If we actually remove that configuration and then try to run NPM T again, we're actually going to get things working, but now we're not going to get the benefits of tree shaking with Webpack. We want to have our cake and eat it too here. I'm going to put that back. Instead, what we're going to do is I'm going to say, `isTest`. Then it'll be basically the same as the, "Is prod process ENV node ENV equals test."

```js
const isTest = String(process.env.NODE_ENV) === 'test'
```

[01:57] We're in a test environment if the node ENV equals test and jest sets that for us automatically. If we are in test, then we want to compile the modules to commonjs, so it works in node. Otherwise, we won't compile it at all and Webpack will take over.

```js
module.exports = {
  presets: [
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
    '@babel/preset-react',
    [
    ...
```

If we save that and then run our test again, we're going to get our test passing.

[02:16] One thing that I want to call out here is the fact that jest picks up the .babelrc automatically. This is one of the really cool things about jest, that it allows you to get a really long way before you have to start worrying about configuring this framework.

[02:27] Run review for this one. We got rid of the examplejs file and we created an actual test file that's testing the `getFormattedValue` functioning from our utils, and then we have to update the .babelrc so that this import statement would work.

[02:41] We did that by determining whether we are in a test. Based off of that node environment, we were able to specify what our configuration for babel-preset-env should be for modules.
