Instructor: [00:00] React hooks allow us to access context from a function component without using consumer and without using the render props pattern, saving us a lot of nesting. To do this, we can `import` `useContext` from `react` and we'll change our function body into one that has braces and a return.

#### MessageList.js
```js
import React, { useContext } from 'react';
```

[00:15] At the top of the function, we can call `useContext` with a full context object. That will be `UserContext`, which we don't have here yet. This will return the value that was passed into the provider. From there, we can destructure the `user` from it.

[00:29] We can do the same with the email context, calling `useContext` and passing in the full email context. 

```js
const MessageList = () => {
  const { user } = useContext(UserContext);
  const { loading, emails, onSelectEmail } = useContext(
    EmailContext
  );
```

Before we can use these, we need to import them. Right now, our contexts only export `Provider` and `Consumer`.

[00:44] We'll open these up. At the top, we'll create a variable to hold the full context and save the context into it, along with destructuring the Provider and Consumer. 

#### UserContect.js
```js
let UserContext;
const {
  Provider,
  Consumer
} = (UserContext = React.createContext());
// Context.Consumer, Context.Provider
```

At the bottom, we can `export` `UserContext`.
```js
export {
  UserProvider,
  Consumer as UserConsumer,
  UserContext
};
```

[00:56] We'll go back to MessageList and do the same for EmailContext, creating the `EmailContext` variable, saving the `context` into it, and `exporting` it. 

#### EmailContext.js
```js
let EmailContext;
const {
  Provider,
  Consumer
} = (EmailContext = React.createContext());
```
```js
export {
  EmailProvider,
  Consumer as EmailConsumer,
  EmailContext
};
```
Now, in `MessageList`, we can replace the `consumers` with the full `contexts` and remove the consumers from the rendered output.

#### MessageList.js
```js
import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { EmailContext } from './EmailContext';
```
```js
return (
    <div className="MessageList">
      {loading ? (
        <div className="no-messages">Loading...</div>
      ) : emails.length === 0 ? (
        <div className="no-messages">
          Your mailbox is empty, {user.firstName}! 🎉
        </div>
      ) : (
        <ul>
          {emails.map(email => (
            <Email
              key={email.id}
              email={email}
              onClick={() => onSelectEmail(email)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
```

[01:16] Now, when we save, the app is still working, and we've saved four levels of nesting.
