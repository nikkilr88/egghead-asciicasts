We have this test that is running this snapshot and we have our snapshot here. There is one thing in the snapshot that bothers me and that's this `className`.

If we look at the implementation of our component, we're getting that `className` from the `css` prop, because we're using emotion's babel plugin that will take the `css` prop and turn it into a `className` that's generated with a hash. That's why every single time we make a change to this `css`, we're going to see a change in this `className` as demonstrated here.

If I change this to a `color` of blue and I run my test again, I'm going to get a snapshot failure.

#### calculator-display.js
```js
<div
  {...props}
  css={{
    color: 'blue',
    background: '#1c191c',
    lineHeight: '130px',
    fontSize: '6em',
    flex: '1',
  }}
>
```

It's that `className`, and who knows exactly what the change was that impacted that, it doesn't really make a whole lot of sense.

#### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest

 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 FAIL  src/shared/__tests__/calculator-display.js
  ● mounts

    expect(value).toMatchSnapshot()

    Received value does not match stored snapshot "mounts 1".

    - Snapshot
    + Received
```

It would be really nice if I could actually remove that generated `className` and actually put in the CSS that's being applied in this case.

One of the really cool things about Jest snapshots is the ability to write custom serializers. Jest automatically includes a serializer that can take a DOM node and serialize it into some HTML that's formatted nicely, but we can make our own serializer that can take any of these class names and replace them with the actual CSS that's going to be generated.

Somebody's already done that for emotion. Let's go ahead and install that with `npm i --save-dev jest-emotion`. With that installed into our dev dependencies in our `package.json`, we can now use that in our test.

#### Terminal
```bash
$ npm install --save-dev jest-emotion
```

Let's go ahead and add an `import {createSerializer} from 'jest-emotion'`. We also need to `import * as emotion from 'emotion'`.

```js
import {createSerializer} from 'jest-emotion'
import * as emotion from 'emotion'
```

Then, we'll use the Jest API for adding a snapshot serializer with `expect.addSnapshotSerializer(createSerializer(emotion))`.

#### __tests__/calculator-display.js
```js
expect.addSnapshotSerializer(createSerializer(emotion))
```

If I run my test again, I'm going to get a snapshot failure, because that class was replaced with `.emotion-0`. I have my CSS above, which is exactly what I want.

#### Terminal
```bash
$ npm t
FAIL  src/shared/__tests__/calculator-display.js
  ● mounts

    expect(value).toMatchSnapshot()

    Received value does not match stored snapshot "mounts 1".

    - Snapshot
    + Received

    @@ -1,7 +1,7 @@
      .emotion-0 {
```

Now instead of a cryptic `className`, I'm getting a much more helpful `className` and the CSS that would be applied. I'll go ahead and run `npm t -- -u` to update the snapshot, and I can look at that snapshot. It's a lot more helpful to me. As I make changes to the CSS right here I can run my test again with `npm t`, and the snapshot failures will be a lot easier to understand what's going on.

#### Terminal
```bash
$ npm t
...
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or run `npmtest -- -u` to update them.

Test Suites: 1 failed, 2 passed, 3 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   1 failed, 1 total
Time:        1.371s
...
```

There are bunch of different snapshot serializers available on npm, `jest-emotion` is one of them. Many snapshot serializer packages actually expose the serializer itself rather than requiring you to create it in code, and for snapshot serializers like that, you can actually edit your Jest configuration and add a `snapshotSerializers` property with an array of path to packages.

#### jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  snapshotSerializers: []
}
```

For example, there is a package called `jest-serializer-path` that removes absolute paths and normalized paths across all platforms in your Jest snapshots. It can take an absolute path to your project and replace it with project root.

If you were to install that, then we can use that in our `snapshotSerializers` configuration with `jest-serializer-path`. That would apply that snapshot serializer to all of our tests in our project.

#### jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  snapshotSerializers: []
}
```

In our case, we're using `jest-emotion`. We're going to import that `jest-emotion`, `createserializer` function, and `emotion` here. We'll call `expect.addSnapshotSerializer(createSerializer(emotion))`.

#### __tests__/calculator-display.js
```js
import {createSerializer} from 'jest-emotion'
import * as emotion from 'emotion'
import CalculatorDisplay from '../calculator-display'

expect.addSnapshotSerializer(createSerializer(emotion))

test('mounts', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container.firstChild).toMatchSnapshot()
})
```

This applies only to this one test. Doing that gives us the CSS output in our snapshot with the cleaner `className` that's much easier to follow, because we're using emotion.