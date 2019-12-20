Instructor: [00:01] Let's go ahead and get this `AutoScalingTextComponent` tested. It's the default export here so I'm going to add an auto-scaling-text.js inside of the `___test___` folder and I'll just paste in a test right inside auto-scaling-text.js. We're using testing library React, so let's go ahead and install as a dev dependency testing library React.

```bash
npm install --save-dev @testing-library/react
```

[00:20] With that installed, we can now run `npm t` to run our test and we're getting that test picked up, but we've got a bit of a problem. Jest is again explaining to us that this module had a syntax error. We're not sure what's going on with it. You probably need to make sure that you're compiling this properly.

[00:38] In our case, it's actually not a compilation issue, it's actually mocking that JS module. That's this suggestion that it's giving us with the moduleNameMapper.

[00:47] Let's see what's going on here. We're getting a syntax error unexpected token that and it's pointing at this import of the styles from auto-scaling-text-module.css. An actual code right here is the auto scaling text.

[00:59] If we take a look at the file, it's from auto-scaling-text-module.css. It's this file right there. That's the auto scaling text. What's going on here, Jest is trying to require this file like it's a common JS module. Clearly, this is not a common JS module. This is a CSS file and that's why we're running into this syntax error.

[01:17] What we're going to do here is use the moduleNameMapper suggestion so that we can map modules that end in .css to a different module. A mock version of the module, so it can be stubbed out and we can require this file in our test.

[01:31] Let's go ahead and open up our jest.config.js file and we'll add a `moduleNameMapper{}` object. We'll say anything that ends in .css and this is a Redux pattern here, we want to require resolve. We want that module to resolve to a different module instead.

[01:50] The module that we're going to have it resolve to a new module we're going to make in test-style-mock.js. This will just say `module.exports =  {}` and then we'll resolve to test-style-mock.js. 

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
}
```

With that, we can now run MPMT and our test passes with flying colors.

[02:10] If we take a look at our auto-scaling-text-module.js and we ```console.log(styles)``` and then we run our test again, we're going to see that console log is just that empty object. It actually is exactly that module.

[02:24] When Jest comes across a file that matches this instead of requiring the file that matches `\\.css$`, it's going to require the `styles-mock.js`. You can see that if I say, "Hello World" right here and then I run `npm t` again, when I'm going to get logged is hello world.

```js
module.exports = {hello: 'world'}
```

[02:43] This is fine for us because it's pretty uncommon to test CSS anyway. If you wanted to do that testing, then visual regression testing will probably be a better fit for that.

[02:52] On review what we had to do here, was we created a test right next to the file that we're testing called autoscaling text. All that we're doing in here, is checking that it renders just for demonstration purposes.

[03:04] Then in here, we're importing some CSS. Things didn't work because Jest was trying to require that file. We told Jest that when it comes across the file that ends in .css, instead of requiring that file, it should require this marked version of that file, which is just a match of export's empty object.

[03:22] On this end, the reason that this works in our application is because this is being bundled with webpack. We have webpack configured to handle CSS files with the CSS-loader and the style-loader. Webpack is managing this for our application and we simply needed to make Jest manage the same thing for our test.
