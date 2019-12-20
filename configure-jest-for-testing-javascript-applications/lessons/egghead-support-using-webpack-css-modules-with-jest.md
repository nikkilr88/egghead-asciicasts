This `import` of `styles` from the CSS files actually using CSS modules. We're using `styles.autoScalingText` as the `className`. If we look at our auto-scaling text test file and we get the container from this render, then we'll console log the `container.innerHTML`.

#### \_\_tests__/auto-scaling-text.js
```js
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render} from 'react-testing-library'
import AutoScalingText from '../auto-scaling-text'

test('renders', () => {
  const {container} = render(<AutoScalingText />)
  console.log(container.innerHTML)
})
```

Then, we can run our test. Here, we see this `<div style="transform: scale(1,1);"></div>`, but we don't see the `className` there at all. That's because the `import` of CSS is resolving to this `style-mock.js`, rather than the actual CSS loaded content. In here, when we're saying a `styles.autoScalingText`, that's actually an empty object `.autoScalingText` which will be `undefined`.


This is probably fine for our use cases, but it would be really nice if we could see the `className` here that is associated to the `autoScalingText`. In reality, this `autoScalingText` `className` is going to be a generated value that's a hash of some sort, because we're using CSS modules. It would be nice to have something here to give us an indication that the `className` is there.

Let's go ahead and do that. We're going to clear this. I'm going to `npm install --save-dev identity-obj-proxy`. With that installed in our dev dependencies, we can now use that in our Jest configuration.

Before resolving a CSS file, let's have it resolve to a file that ends in `.module.css identity-obj-proxy`.

#### jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
}
```

Now if we run our test again with `npm t`, we're going to see the output includes the property that we're trying to access.
`<div class= "autoScalingText" style="transform: scale(1,1);"></div>`

Again, this isn't what is actually going to be. It's going to be a generated value because this is CSS modules. It is a lot more helpful to have something like that there in our output, both when we're debugging and if we want to take a snapshot of this HTML.

In review, all that we really had to do here is install `identity-obj-proxy`, then use that in our `jest.config.js` with a different `moduleNameMapper`.

#### jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
}
```

Now, it's important to have these in the right order, because these both will match the `module.css` files, but we want any `module.css` to match the `identity-obj-proxy` instead.