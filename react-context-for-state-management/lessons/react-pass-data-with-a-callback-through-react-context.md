Instructor: [00:00] Right now, we're passing down the `currentUser` through context. It would be nice to be able to pass down the `handleLogout` and `handleLogin` functions along with it.

[00:09] We can do that by passing an object with the `value`. This object will have a `user` property, which is `this.state.currentUser`, an `onLogin` property, which is `this.handleLogin`, and an `onLogout` property, which is `this.handleLogOut`.

#### index.js
```html
render() {
  return this.state.currentUser ? (
    <UserContext.Provider value={{
      user: this.state.currentUser
      onLogin: this.handleLogin,
      onLogout: this.handleLogOut,
    }}>
      <Main Page onLogout={this.handleLogout} />
    </UserContext.Provider>
  ) : (
    <LoginPage onLogin={this.handleLogin} />
```

[00:26] With this change in place, our app is going to break because now, instead of passing the `user` itself, we're passing an object where the `user` is a property. We have to go update all the places that consume the ` ` to use this new object.

[00:37] Right now, that is just the avatar, which is under `UserMenu.js`. Inside of our `<UserContext.Consumer>`, we consume the `user`. What we'll do instead is destructure this object and pull out the `user` property. That'll make this work.

#### UserMenu.js
```html
render() {
  return (
    <UserContext.Consumer>
      {({ user }) => (
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
              <li onClick={this.props.onLogout}>Logout</li>
            </ul>
          )}
        </div>
      )}
    </UserContext.Consumer>
```

[00:53] Then we can go over to `MessageList.js`. Where we're pulling out user inside of our `<UserContext.Consumer>`, we can do the same thing, destructure the object, pull out the user property. Now our app is working correctly.

#### MessageList.js
```html
import React from 'react';
import UserContext from './UserContext';

const MessageList = () => (
  <UserContext.Consumer>
    {({ user )} => (
      <div className="MessageList">
        <div className="no-messages">
          Your mailbox is empty, {currentUser.firstName}! 
        </div>
      </div>
    )}
  </UserContext.Consumer>
);

export default MessageList;
```

[01:04] Now we can go back to `index.js` and drill down to the components that need `onLogout` and `onLogin` and get those values from context. Since we're going to be providing this to both components, we can wrap both of them in `<UserContext>`.

#### index.js
```html
render() {
  return (
    <UserContext.Provider
      value={{
        user: this.state.currentUser,
        onLogin: this.handleLogin,
        onLogout: this.handleLogOut
      }}
    >
      {this.state.currentUser ? (
        <MainPage onLogout={this.handleLogout} />
      ) : (
        <LoginPage onLogin={this.handleLogin} />
      )}
    </UserContext.Provier>
  );
}
```

[01:20] Now into `MainPage.js`, we see it takes `onLogout` and passes it down to `Header`. `Header` takes `onLogout` and passes it down to `UserMenu`. `UserMenu` uses the prop down to the list item.

[01:33] We're already consuming the context. We just need to destructure and pull out the `onLogout` function. Then we can use `onLogout` down in our `onClick` in the list item. Now we can click the avatar and log out.

#### UserMenu.js
```html
render() {
  return (
    <UserContext.Consumer>
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
    </UserContext.Consumer>
```

[01:45] It's not working. Let's trace it back. We're getting `onLogout` from our `UserMenu`. The only other place to look is the context. We're passing the onLogout prop, but we have a typo in the handleLogout function. This is supposed to be `handleLogout` with the lowercase O. If we change that, then this should work.

#### index.js
```html
render() {
  return this.state.currentUser ? (
    <UserContext.Provider value={{
      user: this.state.currentUser
      onLogin: this.handleLogin,
      onLogout: this.handleLogout,
    }}>
```

![Logout working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543605041/transcript-images/react-pass-data-with-a-callback-through-react-context-logout-working.png)

[02:05] Now we can get rid of the `onLogout` prop from all these components: 

```html
<MainPage />
```

[02:08] The `MainPage`, and from `Header`. 

#### MainPage.js
```js
const MainPage = () => (
  <main>
    <Header />
    <MessageList />
  </main>
);
```

[02:15] From `const Header` and we don't need to pass this a `<UserMenu />` either.

#### Header.js
```js
const Header = () => (
  <header className="Header">
    <h2>MyMail</h2>
    <UserMenu />
  </header>
);
```

[02:19] Now let's go back to `index.js`. We can do the same for the `onLogin` prop. We'll go into `LoginPage.js`. At the top, we'll `import UserContext`.

#### LoginPage.js
```js
import React from 'react';
import { login } from './api';
import UserContext from './UserContext';
```

[02:29] Then we'll wrap our content with `<UserContext.Consumer>` and use the `render` props pattern to destructure the `onLogin` property from the context object. We'll just wrap the rest of this and close the consumer.

```html
return (
  <UserContext.Consumer>
    {({ onLogin }) => 
      <div className="LoginPage">
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input 
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password
            <input 
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </label>
          {error && <div className="error">{error.message}
          </div>}
          <button type="submit" disabled={loading}>
            Sign In
          </button>
        </form>
      </div>
    )}
  </UserContext.Consumer>
);
```

[02:46] We're not done yet. While we're getting `onLogin` in our `return`, we're not actually using it inside `render`. We're using it up in `handleSubmit`. We need a way to get this `onLogin` function up to `handleSubmit`.

[02:58] What we'll do is change this `handleSubmit` function to accept an event, `e`, and `onLogin`. Then we can use `onLogin` directly. 

```js
handleSubmit = (e, onLogin) => {
  e.preventDefault();
  this.setState({ loading: true, error: null });
  login(this.state.username, this.state.password)
    .then(user => {
      this.setState({ loading: false });
      onLogin(user);
    })
    .catch(error => this.setState({ error, loading: false }));
};
```

[03:05] Next, we'll change the `onSubmit` prop to be an arrow function that takes the event, `e`, and calls `handleSubmit` with the event, `e`, and the `onLogin` function that we got from context.

```html
return (
  <UserContext.Consumer>
    {({ onLogin }) => 
      <div className="LoginPage">
        <form onSubmit={e => this.handleSubmit(e, onLogin)}>
```

[03:18] With that in place, we can log out and try out our login. It works.