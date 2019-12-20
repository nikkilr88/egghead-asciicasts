Instructor: [00:00] The app is set up right now to fetch emails every five seconds. Let's display a pop-up notification when new emails arrive. To do that, we'll make a new file called `NotificationContext.js`. In here, we'll `import react`, create a new `createContext`, and destructure that context into `Provider` and `Consumer`.

#### NotificationContext.js
```js
import React from 'react';

const { Provider, Consumer } = React.createContext();
```

[00:19] Then we'll make a `class` called `NotificationProvider`, and this'll have a bit of `state`, which we'll initialize with an empty array of `messages`. 

```js
const { Provider, Consumer } = React.createContext();

class NotificationProvider extends React.Component {
  state = {
    messages: []  
  }  

```
Then in `render`, we'll use the `Provider` to render out a wrapper `div`. Inside here, we're going to put a list of notifications and the component's `children` at the bottom.

```js
render() {
  return (
    <Provider>
      <div className="notification-wrapper">
        <ul></ul>
        {this.props.children}
      </div>     
```

[00:38] Inside the list, we'll map over `messages`, and for each message, render a `Notification`, passing in the required `key` prop, set to the message's unique ID and the `message` itself, and `onClose` prop that'll call `this.removeMessage` with the `message`.

```js
<ul>
  {this.state.messages.map(message ==> (
    <Notification
      key={message.id}
      message={message}
      onClose={() ==> this.removeMessage(message)}  
  ))}
</ul>
```

[00:58] We also want to pass the `value` prop to the `Provider`, passing in all of the existing `state`, and the `notify` function, which will be `this.addMessage`. 

```js
<Provider value={{
  ...this.state,
  notify: this.addMessage
```

We have to implement a couple of these things. We'll start with the `Notification` component at the bottom.

[01:14] It'll take `message` and `onClose`, and it's going to render out a list item. In here, we'll display `message.text` and `button` with an X, `&times; `. We'll pass our `onClose` function as its `onClick` prop. 

```js
const Notification = ({ message, onClose }) => (
  <li>
    {message.text}
    <button className="close" onClick={onClose}>&times;</button>
  </li>
) 
```

Now, we can write the `addMessage` function.

[01:30] It'll take the `text` and set the `state` based on the existing `state`, returning a new object with `messages` equal to a new array that contains all of the old messages, plus a new object with an `id` that's a `random` number, the `text`, and the time this message was added.

```js
addMessage = text => {
  this.setState(state => ({
    messages: [
      ...state.messages,
      {
        id: Math.random(),
        text,
        addedAt: new Date().getTime()   
      } 
    ]
  }));
};
```

[01:49] Then we'll write the `removeMessage` function, which is going to take a `message`, and then update the `state`. We'll set `messages` to the existing `messages`, but with a `filter`, only keeping the messages that are not the one we want to remove.

```js
removeMessage = message => {
  this.setState(state => ({
    messages: state.messages.filter(m => (
      m.id !==message.id
    ))
  }))
}
```

[02:06] At the bottom, we'll `export` the `NotificationProvider` and `consumer` as the `notifier`. 

```js
export { NotificationProvider, Consumer as Notifier };
```

Then we can go back over to `EmailContext.js`. What we'd like to be able to do is emit a notification from here after the state is set.

#### EmailContext.js
```js
this.setState(state => ({
  emails: state.emails.concat(emails)
}));
// notify!    
```

[02:21] The way the consumer works, if we use that notifier component inside of our `render`, we won't have any way of getting the notify function out to where we needed to call it. We'll go back over to `NotificationContext.js`. We'll make a `function` called `withNotifier`.

```js
function withNotifier() {

}
```

[02:35] This is our higher order `Component`, and it's going to take a `Component`. It's going to return a new `component` that takes some `props`. Inside here, we'll use the `Consumer` and the render `props` pattern to pull out the notify function, and render out the `Component`, passing in the existing `props` and our `notify` callback.

```js
function withNotfier(Component) {
  return function Notified(props) {
    return (
      <Consumer>
        {({ notify }) => (
          <Component {...props} notify={notify} />  
        )}
      </Consumer>
    );
  };
}
```

[02:56] Now, we can export `withNotifier` down here,

```js
export { NotificationProvider, Consumer as Notifie, withNotifier};
```

and then import it in `EmailContext.js` the top. Import  `withNotifier` and `notificationContext`. 
 
```js
import { fetchEmails, fetchLatestEmails } from './api';
import { withNotifier } from './NotificationContext';
```

Now, at the bottom, we need to wrap this `EmailProvider` with the higher order `Component`.

[03:11] Since we can't dynamically export this by wrapping it with notifier, we can create a variable called `Wrapped`, and call `withNotifier` on the `EmailProvider`. Then we'll export this wrapped this as the `EmailProvider`.

```js
const Wrapped = withNotifier(EmailProvider);

export {
  Wrapped as EmailProvider,
  Consumer as EmailConsumer  
};
```

[03:25] Now, we're getting this error because we're not using the notification provider anywhere. 

![Error displayed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543969638/transcript-images/use-react-context-to-display-notifications-error-displayed.png)

Let's open up the `index.js` file, at the top, we're going to `import NotificationProvider`.

```js
import { EmailProvider } from './EmailContext';
import { NotificationProvider } from './NotificationContext';
```

Down at the bottom, we can wrap everything with this notification provider.

```js
ReactDOM.render(
  <NotificationProvider>
    <UserProvider>
      <EmailProvider>
        <Root />
      </EmailProvider>
    </UserProvider>,
  </NotificationProvider>,
  document.querySelector('#root')    
);
```

[03:44] Now, we can go back over to emailContext, and right after we set the state with the new emails, we'll call `this.props.notify`, which we now have available. We'll pass in a message to display.

```js
// notify!
this.props,notify(
  `${emails.length} more emails arrived`
);
```
Now, whenever emails arrive, we get a notification, and we can click the X to dismiss them.

![Email Notifications](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543969638/transcript-images/use-react-context-to-display-notifications-email-notifications.png)
