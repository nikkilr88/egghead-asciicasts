Instructor: [00:00] React 16.6 introduced the ability for class components to access context directly without having to use a consumer and the render props pattern. To do this, at the top of the `class`, we can declare a `static` property called `contextType` and set it equal to the full `UserContext`.

#### UserMenu.js
```js
class UserMenu extends React.Component {
  static contextType = UserContext;

  state = {
    menuVisible: false
  };
```

[00:16] It needs to be the full context and not just the consumer. Right now, `UserContext` is only exporting `Provider` and `Consumer`. We'll go into that file. At the top, we'll create a variable called `UserContext` and save the context into there as well as `destructuring` `Provider` and `Consumer`.

#### UserContext.js
```js
let UserContext;
const {
  Provider,
  Consumer
} = (UserContext = React.createContext());
// Context.Consumer, Context.Provider
```

[00:33] Then at the bottom, we can `export` this `UserContext`. 

```js
export {
  UserProvider,
  Consumer as UserConsumer,
  UserContext
};
```

Back in `UserMenu.js`, we can `import` the `UserContext` which we're already using. 

#### UserMenu.js
```js
import { UserContext } from './UserContext';
```

Down in the render function, we don't need to use the consumer anymore, because we can access these values directly.

[00:48] `this.context` is the value that was given to the provider, so we can destructure this directly into `user` and `logout`. Now, we can `delete` the `consumer`, and we've reduced the nesting by two levels and the app is still working.

```js
render() {
    const { user, onLogout } = this.context;
    return (
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
    );
  }
}
```

[01:01] For a component that uses two contexts, like `MessageList` here with `UserConsumer` and `EmailConsumer`, it's important to know that this `contextType` property is only available on classes.

#### MessageList.js
```js
const MessageList = () => (
  <UserConsumer>
    {({ user }) => (
      <EmailConsumer>
        {({ loading, emails, onSelectEmail }) => (
          ...
        )}
      </EmailConsumer>
    )}
  </UserConsumer>
);
```

[01:11] For a component like `MessageList`, we would have to convert this to a class before we could set the `contextType` and `contextType` only works for a single context. If it's using two contexts like this, we'd only be able to save one of them into `contextType`.
