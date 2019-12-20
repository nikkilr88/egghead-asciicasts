Instructor: [00:00] We're looking at the route component of the app right now, `index.js`. It's rendering this login page because the `currentUser` is null right now. If I log in, the login page is going to call its `onLogin` prop. Then it'll put that into state and rerender the `<MainPage>`, which is what we're seeing here now.

![Initial state of applictaion](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543605041/transcript-images/react-avoid-passing-props-deeply-by-using-react-context-initial-state-of-application.png)

[00:17] The current user is passed down to main page, which in turn passes it down to two more components without using it. It's passing it to `Header`, which passes it down to `UserMenu`, which is the user photo icon. Back to main page, we also see that current user is being passed to `MessageList`, which displays this personalized message.

[00:37] This works OK, but we have to pass current user through a bunch of components that don't care about it. Like `MainPage` doesn't actually use it. It just receives it and passes it along. Same with header.

[00:48] One way we can clean this up is using React Context. We can create a new context. I'm going to do that in a separate file called `UserContext.js`. In here, we'll `import React` and use `React.createContext` to create a new context.

#### UserContext.js
```js
import React from 'react';

React.createContext();
```

[01:04] It takes a default value, but if we pass nothing, it'll just start off undefined. It returns an object, that we'll just call `Context`, with two properties. This has a `Context.Consumer` and a `Context.Provider`. We're just going to `export default` this whole `Context` object.

```js
import React from 'react';

const Context = React.createContext();
// Context.Consumer, Context.Provider

export default Context; 
```

[01:23] If we go back over to index, we can `import UserContext`. 

#### index.js 
```js
import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import UserContext from './UserContext';
import './index.css';
```

[01:28] We'll wrap the main page component with the `<UserContext.Provider>`. The provider takes a `value` prop, which is the value that it's going to pass down through our `<MainPage>`. We're going to pass `this.state.currentUser`.

```html
render() {
  return this.state.currentUser ? (
    <UserContext.Provider value={this.state.currentUser}>
    <Main Page
      currentUser={this.state.currentUser}
      onLogout={this.handleLogout}
      />
    </UserContext.Provider>
  ) : (
    <LoginPage onLogin={this.handleLogin} />
  );
}
```

[01:42] Now let's drill down to where this context is used. We can use the new `Context.Consumer` to get that `value` out. Let's `import` our `UserContext`. Then we can wrap this `MessageList` with a `<UserContext.Consumer>`.

#### MessageList.js
```html
import React from 'react';
import UserContext from './UserContext';

const MessageList = ({ currentUser }) => (
  <UserContext.Consumer>
    <div className="MessageList">
      <div className="no-messages">
        Your mailbox is empty, {currentUser.firstName}! 
      </div>
    </div>
  </UserContext.Consumer>
);

export default MessageList;
```

[01:58] If we try this right now, we're going to get an error because the consumer expects you to pass a single function as a child and we're passing an actual element. What we want to do is wrap this element in a function. This function receives the value that we passed in from the Provider.

```html
import React from 'react';
import UserContext from './UserContext';

const MessageList = ({ currentUser }) => (
  <UserContext.Consumer>
    {(user) => 
      <div className="MessageList">
        <div className="no-messages">
          Your mailbox is empty, {currentUser.firstName}! 
        </div>
      </div>
    }
  </UserContext.Consumer>
);

export default MessageList;
```

[02:15] In the `Provider` in the `index.js` file we passed a `value` prop. The `value` comes out as the first argument of the function in our `<UserContext.Consumer>`. You can call it whatever you want. You can call it `value`. You can call it `user` and then use that `user` down in our `<div>`. Then we don't need a `currentUser` of prop anymore. 

```html
import React from 'react';
import UserContext from './UserContext';

const MessageList = () => (
  <UserContext.Consumer>
    {user => (
      <div className="MessageList">
        <div className="no-messages">
          Your mailbox is empty, {User.firstName}! 
        </div>
      </div>
    )}
  </UserContext.Consumer>
);

export default MessageList;
```

[02:20] You can see the message still renders out.

![Message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543605041/transcript-images/react-avoid-passing-props-deeply-by-using-react-context-mymail-message.png)

[02:32] Now we'll go over to the header, which is accepting the current user prop and passing it along, but it's not actually using that prop. 

#### Header.js
![Header.js](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543605041/transcript-images/react-avoid-passing-props-deeply-by-using-react-context-header-js-current-user.png)

[02:37] If we drill into user menu, this is where we are actually using it, down here.

#### UserMenu.js 
![UserMenu Props](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543605041/transcript-images/react-avoid-passing-props-deeply-by-using-react-context-user-menu-using-props.png)

[02:44] Let's `import` that `UserContext`. 

#### UserMenu.js
```js
import React from 'react';
import UserContext from './UserContext';
class UserMenu extends React.Component {
  state = {
    menuVisible: false
  };

  avatarRef = React.createRef();

  componentDidMount() {
      document.addEventListener('click', this.hideMenu);
  }

  componentWillMount() {
      document.removeEventListener('click', this.hideMenu);
  }
}
```

[02:46] Then we can wrap this component in `<UserContext.Consumer>`. Then we just need to wrap the content in a function which will receive the `user`. Then we can use `user` instead of `props.currentUser`.

```html
render() {
  return (
    <UserContext.Consumer>
      {(user) => <div className="UserMenu">
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
      </div>}
    </UserContext.Consumer>
  );
}  
```

[03:04] Now we can go through and get rid of the current user prop everywhere it's no longer needed. Let's start up at `index.js`. We're passing `currentUser` to `<MainPage>`. We don't need to do that anymore. 

#### index.js
```html
render() {
  return this.state.currentUser ? (
    <UserContext.Provider value={this.state.currentUser}>
    <Main Page
      onLogout={this.handleLogout}
      />
    </UserContext.Provider>
  ) : (
    <LoginPage onLogin={this.handleLogin} />
```

[03:15] In `MainPage.js`, we were passing it along to `Header` and `MessageList`. We can get rid of it from `Header` and from `<MessageList>`.

#### MainPage.js
```js
const MainPage = ({ onLogout }) =>
  <main>
    <Header onLogout={onLogout} />
    <MessageList />
  </main>
);
```

[03:27] In `MessageList.js`, we already got rid of it. `Header`, we could remove the prop. We don't need to pass it to `<UserMenu>`. We already took care of `UserMenu.js`. 

#### Header.js
```js
const Header = ({ onLogout }) => (
  <header className="Header">
    <h2>MyMail</h2>
    <userMenu onLogout={onLogout} />
  </header>
);
```

[03:37] If we save index, we can see the app is still working, but we don't have to pass the current user manually through all these levels anymore.