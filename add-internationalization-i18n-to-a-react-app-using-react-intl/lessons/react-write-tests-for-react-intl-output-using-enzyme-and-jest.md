[00:01] Let's start this lesson out by adding a few dependency. I'll run yarn, add, enzyme, enzyme-to-json, react-addons-test-utils.

```
$ yarn add enzyme enzyme-to-json react-addons-test-utils
```

[00:20] The next thing we need to do is include a couple of test helper utilities. I'm going to make a new file, and I'll call it `intl-enzyme.js`.

[00:33] I've included a link to this helper file in the description of this video. Go ahead, and copy and paste this file into your project. What this helper will do is wrap the component being tested with all of the correct parent components, contexts, and props required by `react-intl`.

[00:49] It also gives us the ability to use Enzyme's shallow rendering, or full mount rendering. With our dependencies installed, and our test helper utility added, let's start writing some tests. I'll add the test file in a tests folder inside of components.

[01:10] I'll add a new file called `bookdetail.test.js`. First, we'll important React. I'll import `mountWithIntl` and `shallowWithIntl` from our `intl-enzyme` helper file.

```javascript
import React from "react";
import { mountWithIntl, shallowWithIntl } from "../../intl-enzyme";
```

[01:34] Next, I'll import `toJson` from `enzyme-to-json`. Finally, I'll import the `BookDetail` component that we want to test.

```javascript
import toJson from "enzyme-to-json";

import BookDetail from "../BookDetail";
```

[01:48] I'll set up a `wrapper` variable. This is going to hold the rendered component in each test assertion. Now, we can write our first describe block. We will say describe `BookDetail`. We'll write our first assertion. We'll say it renders expected markup.

```javascript
let wrapper = null;

describe('BookDetail', () => {
  it('renders expected markup', () => {
```

[02:11] Inside of this it block, we'll set wrapper equal to an instance of `mountWithIntl`. I'll create a `BookDetail` component. We also have to provide the match prop that's coming from React Router, so that's expecting an object. We'll pass it params.

[02:34] That's an object that has book ID. We'll just provide it one. We'll write expect `toJson`. That's a method, so we'll pass our wrapper to that method.

[02:51] We're going to expect that that will match the snapshot. 

```javascript
describe('BookDetail', () => {
  it('renders expected markup', () => {
    wrapper = mountWithIntl(<BookDetail match={{params: {bookId: 1}}}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
```

I'll run yarn test to start Jest.

```
$ yarn test
```

[03:03] That's it. We've got our first test. However, there's one problem with this test. Jest's docs correctly say that tests should be deterministic, meaning that running the same test multiple times on a component that has not changed should produce the same result.

[03:21] Let's hop over to the `BookDetail` component for a second. The problem with our test lies with this formatted relative component. It takes a date, and renders the human-readable string representation of that date.

[03:34] If we open up the generated snapshot from Jest, I've found that formatted relative component. You can see that it output a span with a text of last month. If we were to run this test again without touching any of the tests or component code -- say, next month -- this snapshot test would fail because this string being created would be different.

[04:01] In order to fix this, we need to mock date.now inside of our test to return the same date every time it's run. Let's go back to our test. After our imports, I'm going to write date.now. I'm going to set that equal to `jest.fn`.

[04:22] Inside of that mock function, I'm going to immediately return a timestamp. No matter when this is run, any `Date.now` method will always return this timestamp, ensuring that the date will always be the same. 

```javascript
Date.now = jest.fn(() => 1491111687199);
```

Now that we've seen a snapshot, let's take a look at using Enzyme to assert specific things with regards to `react-intl` components.

[04:49] Let's set up a nested describe block. For this, I'll just write Intl messages. Inside of here, I'll add a before each. This means that before every test inside of this describe block is run, execute the code inside of the body of this before each function.

[05:10] I'm going to set wrapper equal to `shallowWithIntl`. I'll pass book detail. Again, we need the same `match` prop here. Since our component is wrapped with the `inject-intl` higher-order component, calling `shallowWithIntl` will just provide the instance of Intl instead of our `BookDetail` component.

[05:36] Once `shallowWithIntl` executes book detail, we need to call `.first`, which gets the first child of the component, which is our `BookDetail` component. Then we need to add `.shallow` to that in order to shallow render our `BookDetail` component.

```javascript
describe('intl messages', () => {
  beforeEach(() => {
  wrapper = shallowWithIntl(<BookDetail match={{params: {bookId: 1}}}/>).first().shallow();
    });
```

[05:55] Now, let's add an it block. We'll test that it renders a single purchase message. Our expectation will read expect `wrapper.find`.

[06:13] I'm actually going to search for an object. I'm going to say find an object with a key of `id` and a value of `detail.purchase`. I expect that `toHaveLength` of one. 

```javascript
it('renders a single "purchase" message', () => {
  expect(wrapper.find({id: 'detail.purchase'})).toHaveLength(1);
    });
```

That test passes as well.

[06:35] Finally, let's test that this component passes the number of merchants to a new window message. Our expectation will read expect `wrapper.find`. Again, I'm looking for an object. I'll look for an `id` with a value of `detail.window`.

[07:03] Once that's found, I want to look at the `values` prop of that component. I'll say prop, and I'll look for `values`. I expect that `values` prop `toMatchObject`, and I expect that to match an object of `numMerchants`. I expect there to be three of them.

```javascript
it('passes number of merchants to "new window" message', () => {
   expect(wrapper.find({id: 'detail.window'}).prop('values')).toMatchObject({numMerchants: 3
      });
```

[07:28] There we go. We've got another passing test.
