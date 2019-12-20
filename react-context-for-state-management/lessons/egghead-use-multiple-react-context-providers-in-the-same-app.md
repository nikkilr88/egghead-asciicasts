Instructor: [00:00] Let's make this email app actually display some emails. To do that, we're going to make a new context, in a file called `EmailContext.js`. We'll `import react` and the `fetchEmails` function from our `./api`. Then we'll create a new context with `React.createContext`. Then we'll destructure that into `Provider` and `Consumer`.

#### EmailContext.js
```js
import React from 'react';
import { fetchEmails } from './api';

const { Provider, Consumer } = React.createContext();
```

[00:20] Then we'll create a `class` called `EmailProvider` to hold the state and distribute it with the provider. We'll initialize the `state`, total `emails`. which will be an empty array, `currentEmail`, which will start off as `null`, `error`, which also starts as `null`, and a `loading` flag, which starts out `false`.

```js 
const { Provider, Consumer } = React.createContext();

class EmailProvider extends React.Component {
  state = {
    emails: [],
    currentEmail: null,
    error: null,
    loading: false,
 }    

 render(){

 }
}
```

[00:39] Then we'll implement the `componentDidMount` life cycle method to fetch the emails. In here, we'll `this.setState`. The `loading: true`, and reset any `error` that we might have had. Then we'll call `fetchEmails`. Then with the `emails`, I'll call `setState`, set `loading` to `false`, and save the `emails` into state.

```js
componentDidMount() {
  this.setState({ loading: true, error: null });
  fetchEmails()
    .then(emails => this.setState({ loading: false, emails }))

```

[01:00] If there's an error, we'll catch it, and call `setState` with `loading false`, and the `error`. 

```js
componentDidMount() {
  this.setState({ loading: true, error: null });
  fetchEmails()
    .then(emails => this.setState({ loading: false, emails }))
    .catch(error => this.setState({ loading: false, error }))
```

We'll add a method called `handleSelectEmail` that'll take an `email` and call `setState` to update the `currentEmail`. This will give consumers a function to call when they want to change the current email.

```js
componentDidMount() {
  this.setState({ loading: true, error: null });
  fetchEmails()
    .then(emails => this.setState({ loading: false, emails }))
    .catch(error => this.setState({ loading: false, error }))
}

handleSelectEmail = (email) => {
  this.setState({ currentEmail: email });  
}
```

[01:22] For `render`, we'll return the `Provider`, which will render out `this.props.children`. The `value` of this `Provider` is going to be an object that's a copy of `state`, plus another property, called `onSelectEmail`. We'll pass in our `handleSelectEmail` function. 

```jsx
render() {
  return (
    <Provider value={{
      ...this.state,
      onSelectEmail: this.handleSelectEmail  
    }}>{this.props.children}</provider>
  )  
}
```

Finally, we can `export` this `EmailProvider` class and `Consumer` as `EmailConsumer`.

```js
export { EmailProvider, Consumer as EmailConsumer }
```

[01:48] Now that we have a provider, we can go back to `index.js` and at the top, we'll import `EmailProvider` from our new email context file. 

#### index.js
```js
import { UserProvider, UserConsumer } from './UserContext';
import { EmailProvider } from './EmailContext
...
import './index.css';
```

At the bottom, we can wrap `<Rout />` in `EmailProvider`. Now, the whole app will have access to emails and the current user.

```jsx
ReactDOM.render(
  <UserProvider>
    <EmailProvider>
      <Root />
    </EmailProvider>
  </UserProvider>,
  document.querySelector('#root')    
);
```

Now, let's open up `MessageList.js`, and we'll `import { EmailConsumer } from './EmailContext'`.

#### MessageList.js
```js
import { UserConsumer } from './UserContext';
import { EmailConsumer } from './EmailContext';
```

[02:14] Since this component is already consuming one context, we can just add our `EmailConsumer` inside. We could also put this outside of `UserConsumer`. It doesn't really matter here. Inside the `EmailConsumer`, we'll write the function that's going to pull out `loading`, `emails`, and `onSelectEmail` from context.

```js
const MessageList = () => (
 <UserConsumer>
   {({ loading, emails, onSelectEmail }) => (
    <div className="MessageList">
      {<div className="no-messages">
        Your mailbox is empty, {user.firstName}!
      </div>
    </div>
  )}
</EmailConsumer>

```

[02:34] Now we have all this data. We just need to render it out. If we're `loading`, we'll render a `loading` message, otherwise if `email.length === zero`, we'll render out the mailbox is empty message that we already have. Otherwise, if we have messages, it'll render out an unordered list. Inside that list, we can map over the emails, with `emails.map`.

```js
<EmailConsumer>
  {({ loading, emails, onSelectEmail )} => (
    <div className="MessageList">
      {loading ?
      <div className="no-messages">Loading...</div> :
      emails.length === 0 ?
      <div className="no-messages">
        Your mailbox is empty, {user.firstName}!
      </div> :
      <ul>
        {emails.map()}
      </ul>  
```

[02:57] For each `email`, render out an `Email` component, which we'll create in a second, passing the required `key` prop, with the email's unique ID.

```js
{emails.map(email =>
  <Email key={email.id}/>
```

Down below, we'll create this `Email` component. It's going to need the `email` to display, and an `onClick` prop. It'll render out a list item, passing along the `onClick` prop to make it clickable.

```js
const Email = ({ email, onClick }) => (
  <li onClick={onCLick}>
  </li>  
)
```

[03:20] Inside, we'll have a `div` for the `subject`, that displays `email.subject`, and a `div` for the message `preview`.

```js
const Email = ({ email, onClick }) => (
  <li onClick={onCLick}>
    <div className="subject">{email.subject}</div>
    <div className="preview">{email.preview}</div>
  </li>  
```

Now, we can pass these props along to the email, passing in the `email` itself, and an `onClick` prop, which will be a function that calls `onSelectEmail` with the `email`.

```js
{emails.map(email => )
  <Email
    key={email.id}
    email={email}
    onClick={() => onSelectEmail(email)}
```

Now, it's all wired up, and we can see the emails displayed, but clicking on them doesn't do anything yet.

![emails displayed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543969637/transcript-images/use-multiple-react-context-providers-in-the-same-app-emails-displayed.png)

[03:45] Let's open up the `MainPage.js` file, and we can see right now this component is only ever rendering a list. We need it to render either a list or the currently selected email. To do that, we'll pull in `EmailConsumer` from `EmailContext`, and wrap the content with this consumer.

#### MainPage.js
```js
import MessageList from './MessagesList';
import { EmailConsumer } from './EmailContext';

const MainPage = () => (
  <EmailConsumer> 
    <main>
      <Header />
      <MessageList />
    </main>
  </EmailConsumer>
);
```

Inside here, we'll pull out the `currentEmail` property from context.

```js
const MainPage =() => (
  <EmailConsumer>
  {({ currentEmail }) =>  
```

[04:07] If we have a `currentEmail`, then we'll render a `MessageViewer`. Otherwise, we'll render the `MessageList`. 

```js
<main>
  <Header />
  {currentEmail ? <MessageViewer/>} : <MessageList />}
</main>  
```

We just need to import `MessageViewer`. 

```js
import MessageList from './MessagesList';
import MessageViewer from './EmailContext';
```

Now, when we click on an email, we're taken to the message display. 

![Message display page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543969639/transcript-images/egghead-use-multiple-react-context-providers-in-the-same-app-message-display-page.png)

Let's work on this display now. We'll open up `MessageViewer.js` and `import` the `EmailConsumer`.

#### MessageViewer.js
```js
import React from 'react';
import { EmailConsumer } from './EmailContext';
``` 

[04:30] Then we can wrap this content in an `EmailConsumer`, and pull out the `currentEmail` and `onSelectEmail` from context. Inside our `<div>`, we'll replace this with an `h2` to display `currentEmail.Subject`, and a `div`, to display `currentEmailbody`. 

```js
<EmailConsumer>
  {({ currentEmail, onSelectEmail }) =>
    <div className="MessageViewer">
      <h2>{currentEmail.subject}</h2>
      <div>{currentEmail.body}</div>
    </div> 
  }
</EmailConsumer>
```

[04:49] At the top, we'll add a `button` for navigating `Back`, and give an `onClick` prop that'll call `onSelectEmail` with `null` to reset the selected email, and bring us back to the list. 

```js
<div className="MessageViewer">
  <button onClick={() => onSelectEmail(null)}>
    Back
  </button>  
```

Now, we can click an email, read the message, click back, and it's all working.

![Message page finished](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543969638/transcript-images/egghead-use-multiple-react-context-providers-in-the-same-app-message-page-finished.png)