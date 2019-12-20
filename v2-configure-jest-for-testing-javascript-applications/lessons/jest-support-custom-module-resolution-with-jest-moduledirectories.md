Instructor: [00:01] Let's go ahead and test this calculator component that's kind of the brains behind most of the capabilities of our calculator app. I'm going to add a test directory right next to the shared folder and call this calculator.js.

[00:13] I'll go ahead and paste in a simple test in `__test__/calcualor.js`. With that, I'll run `npm t` to run my test. We're going to get an error here. Let's take a look at what this error is all about. It says, "Cannot find module calculator display from calculator."

[00:27] It does give us this nice helpful message that says, "Hey, I was able to find these modules. Are those what you meant?" It does give us a couple other tips here, but actually that's not what it is. The problem is, if we go to calculator.js, right here we're importing CalculatorDisplay from 'calculator-display'.

[00:44] Now, how is that working? Calculator display lives inside this shared directory. We have Webpack configured so that we can import anything that's in a shared directory as if it's a regular node modules.

[00:55] We have our node modules. We have anything that's in the source directory, also applies to that. Then anything that's in a directory called shared. This makes it easier so we don't have to import with relative imports for some of these files that are going to be shared across the whole project.

[01:09] However, this doesn't work in node. Just as basing, it's resolving algorithm based on how node resolves modules. We need to tell Jest this is how we want to resolve modules. If we go into our jest.config.js, we need to add a module directories configuration.

```js
testEnvironment: 'jest-environment-jsdom',
moduleDirectories: [],
moduleNameMapper: {
  '\\.module\\.css$': 'identity-obj-proxy',
  '\\.css$': require.resolve('./test/style-mock.js),
}.
snapshotSerializers: ['jest-emtion'],
```

[01:27] I'm actually going to go ahead to my Webpack. I'm just going to copy this whole array, 

```js
['node_modules', path.join(__dirname, 'src'), 'shared'],
```

Paste it right into moduleDirectories. Then we're going to need our path. Let's say const path = require('path'). That path is going to resolve to the directory name plus source, so the exact same place that we have in our Webpack configuration.

```js
const path = require('path')

testEnvironment: 'jest-environment-jsdom',
moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared'],
moduleNameMapper: {
  '\\.module\\.css$': 'identity-obj-proxy',
  '\\.css$': require.resolve('./test/style-mock.js),
}.
snapshotSerializers: ['jest-emtion'],
```

[01:47] Known modules will be treated like module directories. Shared directories will be treated like module directories. With that configuration, we can now run `npm t` to run our test again. Everything is working swimmingly at this time.

[02:00] In review, if you're using Webpack's resolve modules configuration, then you want to configure Jest so that it resolves modules in the same way. We can do that by adding a module directories configuration to your Jest configuration that is set basically to that same thing you're doing in your Webpack configuration.

[02:17] That allows you to import certain modules as if they're coming from known modules, so you don't have to do all the relative back, back, back, back forever and ever.
