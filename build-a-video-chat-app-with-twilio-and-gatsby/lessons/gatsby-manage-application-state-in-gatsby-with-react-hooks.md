Jason Lengstorf: 0:01 Because our app is going to require sharing information across different components, we're going to use state. Specifically, we're going to use React context. To do that, we're going to use a technique that I really like, which is a single file context management using React hooks.

0:17 We're going to create a folder called `hooks` and the file we're going to create is a custom hook called `use-twilio-video.js`. Inside, we're going to pull in a handful of things from React.

0:30 We need `React` itself, we need `createContext` so that we can actually use React context. `useContext`, so that we can get access to the values and `useReducer`, which we'll use for managing the components themselves. We're going to get all of that our of the `'react'` package.

### hooks/use-twilio-video.js
```jsx
import React, { createContext, useContext, useReducer } from 'react';
```

0:45 Next, we needed to find what our `DEFAULT_STATE` is going to be. This will expand as we get further into our app, but to start, we're going to store the `identity` and the `roomName` that is being set in our form.

0:59 To actually set this, we need to create a `reducer`. The way that a `reducer` works is that it accepts two parameters. The first is the `state` and the second is an `action`. That acting object can be sent in with really anything we want. Typically speaking, the `action` is always going to include a `.type` and we're going to follow that convention here.

### hooks/use-twilio-video.js
```jsx
import React, { createContext, useContext, useReducer } from 'react';

const DEFAULT_STATE = {
  identity: false,
  roomName: false,
};

const reducer = (state, action) => {
  switch (action.type) {

  };
};
```

1:18 We'll run `switch` on the `action.type`. In the event that the `action.type` is `'join'`, which would be a form submission, we're going to update our state to include the original state, but we'll extend it with the `identity` using `action.identity` and the `roomName` is `action.roomName`. By `default`, we're going to just reset the state, so we'll `return DEFAULT_STATE`.

### hooks/use-twilio-video.js
```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'join':
      return { ...state, identity: action.identity, roomName: action.roomName };
    default:
      return DEFAULT_STATE;
  };
};
```

1:46 In order to use this, we need a context to store them in. We'll set up a `TwilioVideoContext` and that will be the result of `createContext`. We also need to be able to provide this context to our app.

1:59 We'll create a `TwilioVideoProvider` and that will be a React component that accepts `children` and it will return the `<TwilioVideoContext.Provider>`. The `value` is going to be the result of `useReducer()` passing in the `reducer` function that we wrote and the `DEFAULT_STATE` as a starting point. Inside, we'll give it a `children`.

### hooks/use-twilio-video.js
```jsx
const TwilioVideoContext = createContext();

const TwilioVideoProvider = ({ children }) => (
  <TwilioVideoContext.Provider value={useReducer(reducer, DEFAULT_STATE)}>
    {children}
  </TwilioVideoContext.Provider>
)
```

2:24 In order to actually use this in our app, we don't want to just set it around our `Layout` because every time the Gatsby changes pages, it will remove that `Layout` component and remount it. We actually want to wrap the `Root` component in Gatsby, so that we don't loss our context.

2:39 We're going to use the `wrapRootElement` helper in Gatsby. We're going to write the function here, so that we can use it in two places without having to write a function twice. We're going to set up `element` and that will be whatever Gatsby's root element is.

2:54 We can use the `TwilioVideoProvider` component that we just created and pass in the `element`. Now, our entire Gatsby app is going to have access to this `TwilioVideoContext`. We still need to declare that, but we're ready for it now.

3:08 Finally, we're going to set up the `useTwilioVideo` custom hook. That's not going to accept any arguments, but it will get the `state` and a `dispatch` from the context. We'll use context and put in `TwilioVideoContext`. For now, we're going to return the `state` and the `dispatch`.

3:30 Next stop, we need to export that as our default, so `useTwilioVideo`.

### hooks/use-twilio-video.js
```jsx
const TwilioVideoContext = createContext();

const TwilioVideoProvider = ({ children }) => (
  <TwilioVideoContext.Provider value={useReducer(reducer, DEFAULT_STATE)}>
    {children}
  </TwilioVideoContext.Provider>
);

export const wrapRootElement = ({ element }) => (
  <TwilioVideoProvider>{element}</TwilioVideoProvider>
);

const useTwilioVideo = () => {
  const [state, dispatch] = useContext(TwilioVideoContext);

  return { state, dispatch };
};

export default useTwilioVideo;
```

Then, we're going to make sure that we're actually using this. We're going to create a new file at root called `gatsby-browser.js`. We will `export` the named `wrapRootElement` function from `./src/hooks/use-twilio-video`.

### gatsby-browser.js
```js
export { wrapRootElement } from './src/hooks/use-twilio-video';
```

3:55 I'm going to copy that and we're going to create another file at root called `gatsby-ssr.js` for server side rendering and we'll do exactly the same thing. The reason these files are different is that we may want different behaviors between the browser render and the server side render. In this case, we don't but that's why there's two files instead of just one.

### gatsby-ssr.js
```js
export { wrapRootElement } from './src/hooks/use-twilio-video';
```

4:15 Once we've created these files, we need to actually use this hook. We're going to go into our `Join` component and we're going to set it up to save the `identity` when we submit this form.

4:26 First, We're going to import this custom hook, so `import useTwilioVideo from '../hooks/use-twilio-video';`. Above our state here, we will get the `state` and the `dispatch` out of `useTwilioVideo`. Then we're going to create a new function. This function is going to be called `handleSubmit` and it will accept an `event`.

### components/join.js
```jsx
import useTwilioVideo from '../hooks/use-twilio-video';

const Join = () => {
  const { state, dispatch } = useTwilioVideo();
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleSubmit = event => {}
```

4:50 Right out of the gate, we want to prevent the default. We don't want the form to refresh the page, which is what the default form submission would do. Instead, we want to `dispatch` an action with a `type` of `'join'` and then we want to pass in the `identity` and the `roomName`.

### components/join.js
```jsx
import useTwilioVideo from '../hooks/use-twilio-video';

const Join = () => {
  const { state, dispatch } = useTwilioVideo();
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    dispatch({ type: 'join', identity, roomName });
  };
```

5:06 To make sure that this thing is working, we will set up a dump of the `state`. We'll stringify the `state` with `null` and `2` for formatting and then bring it all together by setting up an `onSubmit` handler that will use `handleSubmit`. Then we can update this `<label>` to say, "Which room do you want to join?"

### components/join.js
```jsx
const Join = () => {
  const { state, dispatch } = useTwilioVideo();
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    dispatch({ type: 'join', identity, roomName });
  };

  return (
    <>
      <h1>Start or Join a Video Chat</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <form className="state-form" onSubmit={handleSubmit}>
        <label htmlFor="identity">
          Display name:
          <input
            type="text"
            id="identity"
            value={identity}
            onChange={event => setIdentity(event.target.value)}
          />
        </label>
        <label htmlFor="roomName">
          Which room do you want to join?
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
          />
        </label>
        <button type="submit">Join Video Chat</button>
      </form>
    </>
  );
```

5:29 In order to make sure this works, we have to stop our browser and then start it again, so `yarn develop`. That'll cause it to pick up the `gatsby-browser.js` and `gatsby-ssr.js` changes. Once the server starts, we'll see that the `state` is now logged on the screen here. If I add a test name and room, when I submit this it'll update the `state`. Now we can see that our global state is tracking properly.

![form successfully updating global state](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-manage-application-state-in-gatsby-with-react-hooks-global-state-tracking.jpg)