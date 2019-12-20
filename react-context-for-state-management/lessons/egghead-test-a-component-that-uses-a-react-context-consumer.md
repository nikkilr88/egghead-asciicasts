Instructor: [00:00] This messageViewer component uses the email consumer. It expect to be rendered inside an email context. Let's see how we can test this. First, we'll `yarn add react-testing-library`. Then we can `run yarn test` to start up our test watcher.

```bash
$ yarn test
```

[00:15] Then our project will create a __tests__ directory underneath source. Inside there, we'll create a `messageViewer.test.js` file. 

![create messageViewer file](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544122289/transcript-images/egghead-test-a-component-that-uses-a-react-context-consumer-create-messageViewer-file.png)

In here, we'll `import react`, because we're going to be using JSX, and `import render` and `fireEvent` from `react-testing-library`.

[00:38] We'll also want to `import EmailContext` `from EmailContext`. This'll be the full context object, not just the provider. Then we'll import `MessageViewer`, which is the component we're testing. 

#### MessageViewer.test.js
```js
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { EmailContext } from '../EmailContext';
import MessageViewer from '../MessageViewer';
```

Let's write a `test` for when we're viewing this email.

[00:52] We should see the `subject` in the header, and this `body` in the div. We'll write a `test`, `view an email`, then we'll call `render`, and `render` out an `EmailContext.Provider`, with a `MessageViewer` inside. Into this Provider, we'll pass a `value` prop, setting `currentEmail` to some fake email, which we'll create up top.

[01:13] We have to give it a `subject` and a `body`. We'll destructure this render call to pull out the `container`. Then we can write our assertions. We can `expect` the `container.querySelector` on the `h2` and the `textContent` from that. This should `Equal` `email.subject`.

```js
const email = {
  subject: 'Black Friday!',
  body: 'So many sales!'
};

test('view an email', () => {
  const { container } = render(
    <EmailContext.Provider
      value={{
        currentEmail: email
      }}
    >
      <MessageViewer />
    </EmailContext.Provider>
  );

  expect(container.querySelector('h2').textContent).toEqual(
    email.subject
  );
});
```

[01:32] Save this, and we get an error, because the path to `MessageViewer`'s wrong. Fix that, and now, our test is passing. Then we can write another assertion for the body. We'll `expect` `container.querySelector ('h2 + div')`.

[01:46] The div after the h2, and the `textContent` in there `toEqual(email.body)`. When we save, the test still passes. 

![write another assertion](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544122289/transcript-images/egghead-test-a-component-that-uses-a-react-context-consumer-write-another-assertion.png)

Now, let's add another test for the back button. I'll say test backButton, and we're going to need a mock callback function here, which we can create with `jest.fn`.

[02:05] Then I'll copy and paste our render from the test above, because this one's going to be really similar. We'll just add a second property to this object, which is `onSelectEmail`, and pass in our `mockCallback`. Now, we can click the button with `fireEvent.click`, and pass in `(container.querySelector ('button'))`.

[02:27] After that, we can `expect` for `mockCallback.toBeCalledWith(null)`. 

```js
test('back button', () => {
  const mockCallback = jest.fn();
  const { container } = render(
    <EmailContext.Provider
      value={{
        currentEmail: email,
        onSelectEmail: mockCallback
      }}
    >
      <MessageViewer />
    </EmailContext.Provider>
  );
  fireEvent.click(container.querySelector('button'));
  expect(mockCallback).toBeCalledWith(null);
});
```

Now, we can save, and this test works, too.
