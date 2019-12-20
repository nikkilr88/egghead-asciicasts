Instructor: [00:01] We're going to go ahead and take this a step further and I'm going to get the debug method from that render call. That's just going to log a nice output for me for debugging purposes.

```js
test('renders, () => {
  const{debug} = render(<AutoScalingText />)
  debug() 
})
```

[00:10] If I run this, I'm going to get all the output here. I'm getting the body for the document, the div that is my container and then the div that we're actually rendering, which is this auto scaling text. You can see that right here in /shared/auto-scaling-text.js where we specified the style, the data-testid.

[00:25] The ref is not going to be apparent in the output here because that won't actually get added to the DOM, but the class name will. The reason that it's not showing up here is because styles is getting mapped to our style mock(style-mock.js), which is just exporting an empty object.

[00:40] When we say styles, that's actually the empty object. When we get the auto scaling text property off of that object, it's undefined. `className` is therefore undefined and therefore, it doesn't show up in our output here.

[00:52] It would be really nice if it did because maybe there's an assertion, maybe we're doing some logic here. It's like a thing or null, whatever. We have some logic in here that we want to make sure we're testing here.

[01:04] It would be nice if we had some way to get that `autoScalingText` to appear as our `className` even though at build time Webpack is going to generate some generated class name. What we're going to do here is I'm going to NPM install as a dev dependency identity obj proxy.

```bash
npm install --save dev identity obj-proxy
```

[01:23] With that installed, now I'm going to go to jest.config.js. I want to match all of the imports for a .module.css because those are the ones that are going to actually have an object with those styles applied.

[01:36] In particular, these styles in the auto-scaling-text.module.css file, that's what we're referencing when we say `styles.autoScalingText`. What I want to have happened is basically during my test, I want to have to it say, autoscaling text right here. That's what I did in the option proxy's going to do for us.

[01:53] When we find modules that match .module.css, then we want to use identity obj proxy as our mock module for that particular dependency. We're going to say .module.css and we'll map that to identity obj proxy.

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  }
}
```

[02:12] Instead of actually importing auto-scaling-text.module.css, it's going to import identity-obj-proxy. What that is going to do is it will return a string for the path that was accessed for this particular module. With that, we'll go ahead and save that.

[02:28] Now, if we run `npm t`, we're going to get a class that is the autoscaling text. Even though we're not actually loading the styles into JS DOM, we can at least make an assertion on the class name that's being applied for our CSS modules.

[02:41] If you're using CSS modules, this is what I recommend. You go into your Jest config and you say, hey, anything that matches .module, .css at the end of the file path, we're going to instead import identity-obj-proxy and then identity-obj-proxy is the object that we're going to have assign to this styles object here.

[03:01] When we access the auto scaling text, that's going to return us an object that is the auto scaling text string. That makes our test a lot easier to debug. It allows us to make some assertions on the class name that's going to be applied, even though that class name is going to be generated at run time.

[03:18] On review, what we did here was we added this line to our moduleNameMapper. It is actually important that this shows up before the .css because order does matter here and this would match before this gets a chance to test and match. We want this to happen first and for any other CSS files in our project, we'll just do the regular style mode.
