Instructor: [00:00] Here, in the `EmailProvider`, we are fetching new emails every two seconds. You can see the notifications coming in. In the notification context, we're cleaning up the `messages` every second. This cleanup function will remove `messages` that are more than three seconds old.

[00:16] We're rendering over a thousand emails here, and the app is a getting a little bit sluggish, because we haven't done any sort of performance tuning. If we open up the React dev tools, we can click on this gear, and turn on this highlight updates option.

![open react dev tools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544122290/transcript-images/egghead-performantly-render-a-large-list-of-items-with-react-context-open-react-dev-tools.png)

[00:29] Now, every time the app re-renders, we see all the components flash with blue or green outlines. This means that every component is re-rendering. The first thing we can do to improve this is to open up the `MessageList` file, which is where we're rendering the list of emails and the email component.

[00:44] Since this email component only depends on props, it shouldn't need to re-render the existing emails. We can wrap this function component in `React.memo`, which functions very much like React pure component, and will only re-render this component when its props change.

#### MessageList.js
```js
const Email = React.memo(({ email, onClick }) => (
  <li onClick={() => onClick(email)}>
    <div className="subject">{email.subject}</div>
    <div className="preview">{email.preview}</div>
  </li>
));
```

[00:59] Now, if we save, when the app refreshes, we can see that we are still re-rendering the emails every time. That's because one of these props is actually changing. This `onClick` prop is a new function every single time this list is rendered.

[01:13] We can improve this by passing down the callback function unchanged. Since it needs this `email` argument, and the `Email` component is already receiving that argument, we can change the `onClick` to just pass the `email` to `onClick`.

[01:28] Now, when the app re-renders, you can see that we aren't getting the blue boxes around the individual emails anymore. This is a big improvement. If we go over to the React profiler, we can do a quick recording.

![recording on react profiler](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544122290/transcript-images/egghead-performantly-render-a-large-list-of-items-with-react-context-recording-on-react-profiler.png)

[01:40] We can see that a lot is going on every render here. The next thing we might try is to go up to `messageList` and wrap this in `React.memo`. This won't work, because `messageList` isn't receiving any props. There's nothing for `React.memo` to watch out.

[01:55] The reason `MessageList` is re-rendering is because it's using two contexts here. Whenever one of these context values changes, this component will re-render. Now, need to go and optimize the contexts. If we open up the index file, we can see that we're using three context providers in our app.

[02:13] Let's tackle these one-by-one. First, we'll go over `NotificationContext`, and we'll see where we're calling the provider, and we're passing this value, we're passing a brand new object every single time this re-renders.

[02:25] This brand new object will cause the consumers to re-render. We can fix this by combining all of the callbacks into this.state, and then just passing the state object. To do that, we'll implement the `constructor`, which takes `props`, and calls `super(props)`.

[02:40] Then move the `state` initialization into the `constructor`, and add the `notify` property, which will be the callback. 

#### NotificationsContext.js
```js
class NotificationProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      notify: this.addMessage
    };
  }
```

Now, down at the `Provider`, since `notify` is already part of state, we can just pass `this.state`. 

```js
render() {
    return (
      <Provider value={this.state}>
        <div className="notification-wrapper">
          <ul>
            {this.state.messages.map(message => (
              <Notification
                key={message.id}
                message={message}
                onClose={() => this.removeMessage(message)}
              />
            ))}
          </ul>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}
```

We can go and do the same thing to `EmailContext`, where we write a `constructor`, it takes `props`, calls `super(props)`, and then move `state` initialization into the `constructor`.

#### EmailContext.js
```js
class EmailProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      currentEmail: null,
      error: null,
      loading: false,
      onSelectEmail: this.handleSelectEmail
    };
  }
```

[03:05] If we look down to the `Provider`, we need this `onSelectEmail` property. We can take this, and move it into state. Now, in the `Provider`, we can just pass `this.state`.

```js
render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}
```

The last context is `UserContext`. Here, we can do the same thing.

[03:21] In the constructor, call `super(props)`, and initialize the `state` here. This `Provider` is passing a `user` `onLogin`, and `onLogout`. These bottom two are easy enough to move into state, but this user value, which is set to state `currentUser`, doesn't match the name that we have in state.

[03:41] We'll change `currentUser` to just `user`. 

#### UserContext.js
```js
class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: FAKE_USER,
      onLogin: this.handleLogin,
      onLogout: this.handleLogout
    };
  }
```

Now, we can pass `this.state` into the `value`. 

```js
render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
```

Now, in our app, you can see every second when the notifications are cleared, there isn't that much re-rendering. When new emails arrive, there's more that re-renders.

[03:58] If we go into the profiler, we can record another snapshot, and see that each render is now rendering many fewer components. The render durations are much shorter as well.

![profiler](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544122290/transcript-images/egghead-performantly-render-a-large-list-of-items-with-react-context-profiler.png)
