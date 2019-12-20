Instructor: [00:00] Right now, the root component holds the current user and the functions to update it, and it passes it around with the provider. Let's see how we can centralize the user state functions and the provider all in one place.

[00:12] For that, we're going to use our existing `UserContext.js` file. We'll create a new class called `userProvider`. It's going to `render` out the `<Provider>`, which we'll destructure from context. We'll pull that `Provider` and `Consumer`.

#### UserContext.js
```js
import React from 'react'l

const { Provider, Consumer } = React.createContext();
// Context.Consumer, Context.Provider

class UserProvider extends React.Component {
  render() {
    return (
      <Provider></Provider>
    )
  }
}

export default Context;
```

[00:26] Inside the `<Provider>`, we're just going to render `this.props.children`, so anything inside `userProvider` will get rendered out. We'll go back over to root and move over the `value` that we're passing to the context.

```js
import React from 'react'l

const { Provider, Consumer } = React.createContext();
// Context.Consumer, Context.Provider

class UserProvider extends React.Component {
  render() {
    return (
      <Provider value={{
        user: this.state.currentUser,
        onLogin: this.handleLogin,
        onLogout: this.handleLogout
      }}>{this.props.children}</Provider>
    )
  }
}

export default Context;
```

[00:43] Then we'll also move over the functions and the data. Lastly, we want to move over this `FAKE_USER` constant. Then we need to change how this `Context` is exported. Instead of doing one default export, we're going to `export { userProvider, Consumer as userConsumer };`.

```js
import React from 'react';
import { FAKE_USER } from './api';

const { Provider, Consumer } = React.createContext();
// Context.Consumer, Context.Provider

class UserProvider extends React.Component {
  state = {
    currentUser: FAKE_USER
  };

  handleLogin = user => {
    this.setState({ currentUser: user });
  };

  render() {
    return (
      <Provider value={{
        user: this.state.currentUser,
        onLogin: this.handleLogin,
        onLogout: this.handleLogout
      }}>{this.props.children}</Provider>
    )
  }
}

export { UserProvider, Consumer as UserConsumer };
```

[01:05] When we save, we're going to get this error, because of all the places that expect a default export. 

![Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543605041/transcript-images/react-hide-the-implementation-details-of-a-context-provider-failed-to-compile-error.png)

[01:10] Let's go update those. We'll start with the root component. Instead of importing `userContext`, we'll import `userProvider` and `userConsumer`. Instead of `userContext.Provider`, we can now use `userProvider`.

#### index.js
```js
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import { UserProvider, UserConsumer } from './UserContext';

class Root extends React.Component {

  render() {
    return (
      <UserProvider>
        {this.state.currentUser ? (
          <MainPage />
        ) : (
          <LoginPage onLogin={this.handleLogin} />
        )}
      </UserProvider>
    );
  }
}
```

[01:25] Since root doesn't have the current user in state anymore, we also need a `<UserConsumer>` to get access to that user. We'll use the `render` Props pattern to pull out the `user` from the context object, and then use that `user` inside of our `<UserConsumer>`.

```html
render() {
  return (
    <UserProvider>
      <UserConsumer>
        {({ user }) => 
        user ? (
          <MainPage />
        ) : (
          <LoginPage onLogin={this.handleLogin} />
        )}
      </UserConsumer>
    </UserProvider>
  );
}
```

[01:40] That fixes this page, and now, `LoginPage.js` is broken. Let's open that file up. We can replace `UserContext` with `UserConsumer`. 

#### LoginPage.js
```js
import React from 'react';
import { login } from './api';
import { UserConsumer } from './UserContext';
```

[01:50] Down below, instead of `UserContext.Consumer`, we'll update this to be `<UserConsumer>`.

```html
<UserConsumer>
  {({ onLogin })} => (
```

[01:58] Now, we can move onto the `MessageList.js` file. We'll replace `UserContext` with `UserConsumer`, `UserContext.Consumer` with `UserConsumer`. 

#### MessageList.js
```html
import React from 'react';
import { UserConsumer } from './UserContext';

const MessageList = () => (
  <UserConsumer>
    {({ user )} => (
      <div className="MessageList">
        <div className="no-messages">
          Your mailbox is empty, {currentUser.firstName}! 
        </div>
      </div>
    )}
  <UserConsumer>
);

export default MessageList;
```

The last problem is in `UserMenu.js`. We'll open that up and do the same thing here, replacing this with `UserConsumer` and the usage with   `UserConsumer`.

#### UserMenu.js
```js
import React from 'react';
import { UserConsumer } from './UserContext';
```

```html
<UserConsumer>
  {({ user, onLogout }) => (
    <div className="UserMenu">
      <img
        className="UserAvatar"
        alt="User avatar"
        src={user.avatar}
        onClick={this.toggleMenu}
        ref={this.avatarRef}
      />
      {this.state.menuVisible && (
        <ul>
          <li onClick={onLogout}>Logout</li>
        </ul>
      )}
    </div>
  )}
</UserConsumer>
```

[02:21] Now, the app is back to working again, and you can see the context is being used. If we log out, we can log back in. Now, we have this one class, `UserProvider`, that holds all of the concerns for users, and the `Root` component doesn't need to worry about that anymore.

[02:37] At this point, since the class is stateless, we could turn it into a `function` component by just cutting and pasting the code from `render` into the function and deleting the `class`. We could also move this `UserProvider`, and put it at the top level.

#### index.js
```html
import MainPage from './MainPage';
import { UserProvider, UserConsumer } from './UserContext';
import './index.css';

function Root() {
  return (
    <UserConsumer>
      {({ user })} =>
        user ? (
          <MainPage />
        ) : (
          <LoginPage onLogin={this.handleLogin} />
        )
      }
    <UserConsumer>
  );
}

ReactDOM.render(
  <UserProvider>
    <Root />
  </UserProvider>
  document.querySelector('#root')
);
```

[02:55] It's up to you which way you want to write it. This way might be a little bit easier for refactoring later.
