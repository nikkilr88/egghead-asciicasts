Instructor: [00:00] Our `UserContext` file has this `UserProvider` component as a wrapper around the context provider. We like to test that this `UserProvider` is providing the right values and working as expected. In our terminal, we'll run `yarn add react-testing-library`. We can run `yarn test` to start up Jest, which'll start watching for tests.

```bash
$ yarn add react-testing-library
$ yarn test
```

[00:22] We'll create a new directory underneath source called __tests__. Inside this directory, we'll create a new file called `userContext.test.js`. 

![create new directory](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544122290/transcript-images/egghead-test-a-component-that-uses-a-react-context-provider-create-new-directory.png)

Inside here, we'll `import React`, because we're going to be using JSX, and we'll `import render` and `fireEvent` from `react-testing-library`.

[00:43] Then we'll `import` the `UserProvider` that we want to test, along with the `UserConsumer` from `UserContext`. For our first `test`, we'll check that the `default value is undefined`. To do this, we'll declare a variable called `actualValue`, and set it `equal` to `replace me`.

[00:59] Then we'll call `render`, and render out our `UserConsumer`, with no provider around it. As its render function, we'll take the `value` that it gets from context, and save that in `actualValue`. Now, we can write our expectation by saying `expect(actualValue).toBeUndefined`.

#### UserContext.test.js
```js
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { UserProvider, UserConsumer } from '../UserContext';

test('default value is undefined', () => {
  let actualValue = 'replace me';
  render(
    <UserConsumer>
      {value => (actualValue = value)}
    </UserConsumer>
  );
  expect(actualValue).toBeUndefined();
});
```

[01:18] After saving, we can see our test is passing. Now, over in our userContext file, we can see that we're initializing the current user to this fake user that we're getting from API. Let's test that. We'll write another `test` that is `initial user is FAKE_USER`.

[01:33] We're going to need to `import` `FAKE_USER` from our `api`. 

```js
import { FAKE_USER } from '../api';
```

Here, we can call `render`. This time, we'll render out a `UserProvider`. Inside it, we'll render the `UserConsumer`. The consumer's render function will destructure the `user` and render out a `div` with the `user.username`.

[01:50] The render function here returns an object, and one of the properties is `container`. We'll destructure `container` from `render`. Now, the setup is done, and we can write `expect(container.textContent).toEqual(FAKE_USER.username)`. We'll save this, and now, this test is passing.

```js
test('initial user is FAKE_USER', () => {
  const { container } = render(
    <UserProvider>
      <UserConsumer>
        {({ user }) => <div>{user.username}</div>}
      </UserConsumer>
    </UserProvider>
  );
  expect(container.textContent).toEqual(FAKE_USER.username);
});
```

[02:10] We could have written the actual username here, but by depending on the imported value, we can change that value in api without breaking this test. Now, back over to UserContext. We can see that one of the properties it provides is this onLogin callback.

[02:24] When it's called, it should update the user. Let's test that that works. We'll write a `test` that `'onLogin sets the user'`. Here, we'll destructure the `container` from `render`, and we'll render the `UserProvider`, wrapped around a `UserConsumer`.

[02:40] In the render function, we'll destructure `user` and `onLogin`, and render out a `div`. Inside here, we'll have a `span` that renders the `user.username`. Under that, we'll have a `button` with an `onClick` prop, which will call `onLogin` with an object with a `username` property.

[02:59] Now, under render, we can call `fireEvent.click`, and pass in the `button` element, which we can find with `container.querySelector` button. Then we can write `expect` `container.querySelector` `('span').textContent` `toEqual` the `username`. After we save, we can see this test is passing now, too.

```js
test('onLogin sets the user', () => {
  const { container } = render(
    <UserProvider>
      <UserConsumer>
        {({ user, onLogin }) => (
          <div>
            <span>{user.username}</span>
            <button
              onClick={() => onLogin({ username: 'erin' })}
            />
          </div>
        )}
      </UserConsumer>
    </UserProvider>
  );
  fireEvent.click(container.querySelector('button'));
  expect(
    container.querySelector('span').textContent
  ).toEqual('erin');
});
```

[03:21] userContext also passes down an `onLogout` callback that should clear out the user. Let's test that now. We'll write a `test` that `('onLogout clears the user')`. This test is going to be very similar to the login test. I'm going to copy and paste that down below.

[03:39] Instead of `onLogin`, we'll destructure `onLogout`. In the button's `onClick` function, we can call `onLogout`. Since the user's going to be `null`, we don't want to render out the user's username. We'll check if user is `null`, and render out the `toString` of that.

[03:55] If `user` is null, undefined, true, or false, all of those things would render as empty. To make sure that it's `null`, we'll check that, and turn it into a string, which should render out true. Now, we can change our expectation down below, that the `textContent` should be the string `'true` If we save that, the test is passing.

```js
test('onLogout clears the user', () => {
  const { container } = render(
    <UserProvider>
      <UserConsumer>
        {({ user, onLogout }) => (
          <div>
            <span>{(user === null).toString()}</span>
            <button onClick={() => onLogout()} />
          </div>
        )}
      </UserConsumer>
    </UserProvider>
  );
  fireEvent.click(container.querySelector('button'));
  expect(
    container.querySelector('span').textContent
  ).toEqual('true');
});
```
