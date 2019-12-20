Jason Lengstorf: 00:01 To restrict access to our rooms, we need to go into display and make it into a protected route. Let's start by making it more visible which room we're currently in. I'm going to refactor this to get just the `roomID` because that's all we need out of the props. Then, we'll set this up to be an `<h1>` that says which room we're in.

### components/video-display.js
```jsx
import React from 'react';

const VideoDisplay = ({ roomID }) => {
  return <h1>Room: "{roomID}"</h1>;
};

export default VideoDisplay;
```

00:20 We come out here. Once we make this change, we can go to our app and go to any room to see which one we're in.

00:29 Next, we want to make that password protected. To do that, we need to pull the token out of context, which we're going to do by using our custom hook. `import useTwilioVideo from '../hooks/use-twilio-video';`. Then in here, we're going to pull out the `state` from `useTwilioVideo`.

00:49 Once the component mounts, we're going to use an effect, which means we need to import that from React. In this effect, we're going to check if there is no `state.token`, then we want to `navigate` and we're going to pull `navigate` out of Gatsby. We'll navigate back to the home page and we're going to send along some `state`.

### components/video-display.js
```jsx
import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import useTwilioVideo from '../hooks/use-twilio-video';

const VideoDisplay = ({ roomID }) => {
  const { state } = useTwilioVideo();

  useEffect(() => {
    if (!state.token) {
      navigate('/', { state: })
    }
  });

  return <h1>Room: "{roomID}"</h1>;
};

export default VideoDisplay;
```

01:14 We have the ability in the `navigate` function to pass in some `state`. This is something that goes in from the Reach Router dependency, but we can use it in Gatsby specifically so that we can do something like say, "Hey. You're not logged in yet, but here is the room that you're ultimately going to end up in."

01:32 The reason we want to do this is if I want to talk to my friend, I want to be able to send them a link to a room. When they get to that link, they're not actually authenticated, so they need to go to the home page to fill out their form. We can use the room from `state` to auto fill out what room they want to join and then bring them right back. This is more for convenience than anything else.

01:52 We're going to set the `roomName` in `state` to be the `roomID`. We want to make sure this effect only fires when the `state` changes or when the `roomID` changes to make sure we're not wasting any energy here. The `state` we provide in `useEffect` gets passed to the page that we redirect to.

### components/video-display.js
```jsx
const VideoDisplay = ({ roomID }) => {
  const { state } = useTwilioVideo();

  useEffect(() => {
    if (!state.token) {
      navigate('/', { state: { roomName: roomID }});
    }
  }, [state, roomID]);

  return <h1>Room: "{roomID}"</h1>;
};
```

02:12 In this case, we're redirecting to the home page, which means that `location` is going to be sent into `index.js`. That's added as a prop, so we can just pass that straight down into our `Join` component as a `location` prop.

### pages/index.js
```jsx
import React from 'react';
import Layout from '../components/layout';
import Join from '../components/join';

export default ({ location }) => (
  <Layout>
    <Join location={location} />
  </Layout>
);
```

02:27 Once we've done that inside the `Join` component, we are going to be able to pull this out here and then we can use it to determine whether or not someone should go into the default room. Using this `location`, we want to set up a default room. That's what we're going to use as the default for our `roomName` down here instead of this empty string.

02:46 Our default should be an empty string. That's what we want to use here. We want to have the option to pull that out of `state`. The way that that'll work is we're going to check for a `state` object or go here. We need to do some drilling. We're going to check for `location`, `location.state` and `location.state.roomname`.

### components/join.js
```jsx
const Join = ({ location }) => {
  const defaultRoom = (location && location.state && location.state.roomname) || '';
  const { state, getRoomToken } = useTwilioVideo();
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState(defaultRoom);
```

03:11 If all of those are set, then we'll use this `roomName`. Otherwise, we'll return this empty string. To check this, we can go back to our app and try to visit any room. We can see that the room is default filled for us. If I put in my name, it takes me to this room.

![default room form field pre-filled](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-restrict-access-in-gatsby-with-protected-routes-default-room.jpg)

03:28 We've got a problem, because when I submit, I should be taken to this room. To make that happen, we're going to go into our `Join` and then import `useEffect`. Inside `useEffect`, we're going to check for the existence of a `token`. If there is one, we're going to try to redirect to the room that's active.

03:47 If there is a `state.token` and we have a `state.roomName`, then we want to `navigate`. We need to pull `navigate` out of Gatsby. We want to navigate to that room. We will set up room and then pass in `state.roomname`. We're going to only fire this effect when the `state` changes.

### components/join.js
```jsx
const Join = ({ location }) => {
  const defaultRoom = 
    (location && location.state && location.state.roomname) || '';
  const { state, getRoomToken } = useTwilioVideo();
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState(defaultRoom);

  useEffect(() => {
    if (state.token && state.roomName) {
      navigate(`/room/${state.roomname}`);
    };
  }, [state]);
```

04:10 When we come back out and reload the page, we don't have a token set. I'm going to hit my name. We're redirected to the room. Because we have a token, we're allowed in.