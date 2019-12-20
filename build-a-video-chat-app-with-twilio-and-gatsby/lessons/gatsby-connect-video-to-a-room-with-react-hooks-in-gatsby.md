Jason Lengstorf: 0:01 Now that we have the ability to get tokens and create rooms, we need to actually start hooking into video. To do that, we're going to add a new function inside of our custom hook that will connect to a room.

0:13 What we need to do first is, up at the top of the file, we're going to import the `connect` function from `twilio-video`. We're also going to need a ref, which I'll talk a little bit more about in a moment.

### hooks/use-twilio-video.js
```jsx
import React, { createContext, useContext, useReducer, useRef } from 'react';
import axios from 'axios';
import { connect } from 'twilio-video';
```

0:26 Inside of `useTwilioVideo`, below our `getRoomToken` function, we're going to create a new one called `connectToRoom`. This is going to be an `async` function because we're going to be making some request to the Twilio API.

0:40 First, we're just going to make sure that we're logged in before we do anything. If there is no token, we're just going to bail. We'll immediately `return`.

0:48 Assuming we have a valid token, we want to create a room. We do that by awaiting a call to a `connect` function to Twilio.

0:56 We pass in the `state.token` as a first argument and an array of options as the second.

### hooks/use-twilio-video.js
```jsx
const connectToRoom = async () => {
  if (!token) {
    return;
  }

  const room = await connect(
    token,
    {

    }
  );
};
```

1:02 We want to pass in the `name`, which is going to be the `roomName` that was chosen by our user. We want to turn on `audio`. We want to set some limits for the `video`, so we'll set it to `640` pixels. We're going to set the `logLevel` to `'info'`.

### hooks/use-twilio-video.js
```jsx
const room = await connect(
  token,
  { 
    name: room, 
    audio: true, 
    video: { width: 640 }, 
    logLevel: 'info' 
  }
);
```

1:18 This is only for debugging purposes. In a production app, you probably would not want to set this `logLevel`.

1:24 Just in case something goes wrong, we're going to add a catch. At the moment, we're not really going to do anything with that. We're just going to let ourselves know that something has gone wrong.

1:33 We'll say "unable to join the room" and then we'll just drop in the `error.message` so that we can figure out what actually went wrong.

### hooks/use-twilio-video.js
```jsx
const room = await connect(
  token,
  { 
    name: room, 
    audio: true, 
    video: { width: 640 }, 
    logLevel: 'info' 
  }
).catch(error => {
  console.error(`Unable to join the room: ${error.message}`)
});
```

1:43 Now that we have a room, we can get the local track, which is our video from our computer. This is actually already set up by the room, so we can just pull it out of that video.

1:53 We'll get `localTrack` and then we're going to spread the `room.localParticipant.videoTracks.values()`.

2:04 This is a hacky way to get at this, but `.values` is not technically an array, so we're spreading it into an array to make sure that it is one. Then, we're going to get the first value and the track off of there. That is our `localTrack`.

### hooks/use-twilio-video.js
```jsx
const connectToRoom = async () => {
  if (!token) {
    return;
  }

  const room = await connect(
    token,
    { 
      name: room, 
      audio: true, 
      video: { width: 640 }, 
      logLevel: 'info' 
    }
  ).catch(error => {
    console.error(`Unable to join the room: ${error.message}`)
  });

  const localTrack = [...room.localParticipant.videoTracks.value()][0].track;
};
```

2:19 Once we have a `localTrack`, we need to be able to connect that to something. The way we're going to connect it is we want to put this into a ref.

2:29 The track is going to give us an actual video element like and HTML DOM element. That's not really compatible with React because React uses the VDOM. We're going to use the ref escape hatch to make that work.

2:42 Twilio tracks are classes that have methods attached to them. One of the ones that we can use is called `attach`.

2:50 If we run `localTrack.attach()`, this will give us back a DOM element. It's an actual video HTML element that's ready to be inserted into the DOM, which is not a React component, which means that we need to use a ref to insert it.

### hooks/use-twilio-video.js
```jsx
const localTrack = [...room.localParticipant.videoTracks.value()][0].track;

const localEl = localTrack.attach();
```

3:04 To create a ref, we're going to go up to the very top of our `useTwilioVideo` and we're going to create `videoRef`. That's going to be a React ref using the `useRef` hook.

### hooks/use-twilio-video.js
```jsx
const useTwilioVideo = () => {
const [state, dispatch] = useContext(TwilioVideoContext);
const videoRef = useRef();
```

3:16 We only want to add this video if the ref doesn't already have a local video. Anytime the component re-renders, we would want to make sure that we're not attaching multiple copies of the same thing.

3:28 We're going to check first to see if `videoRef.current.hasChildNodes()`.

3:33 We haven't actually created the component yet, but we're going to use a `div` for this. Inside of here, we're going to be able to say that if we don't have child nodes, then we know it's empty. We want to actually drop that in.

3:47 We'll say `videoRef.current.appendChild()` and send in the `localEl`.

### hooks/use-twilio-video.js
```jsx
const localTrack = [...room.localParticipant.videoTracks.value()][0].track;

if (!videoRef.current.hasChildNodes()) {
  const localEl = localTrack.attach();

  videoRef.current.appendChild(localEl);
};
```

3:54 To actually call our `connectToRoom` function, we're going to create a little helper that will let us call it as we need it. We'll call it `startVideo` and that is going to be a function that just calls `connectToRoom`.

4:07 We're going to pass that out as one of the options in our custom hook. We also want to pass out that `videoRef`, so that we're able to connect that to our React app.

### hooks/use-twilio-video.js
```jsx
    if (!videoRef.current.hasChildNodes()) {
      const localEl = localTrack.attach();

      videoRef.current.appendChild(localEl);
    };
  };

  const startVideo = () => connectToRoom();

  return { state, getRoomToken, startVideo, videoRef };
};
```

4:18 In order to keep track on whether or not there's an active Twilio room, we also want to hold on to this `room` variable and make it something that's available in `state`. To do that, we're going to add a `dispatch` that's going to use a new action that we're going to call `'set-active-room'`. That's going to send in the `room`.

4:41 Up in our `reducer`, we need to actually handle that case so we can set `case 'set-active-room'` and that needs to `return { ...state, room: action.room }`.

4:54 In order to make sure we're actually tracking it, we need to add the `room` to the `DEFAULT_STATE`.

### hooks/use-twilio-video.js
```jsx
const DEFAULT_STATE = {
  identity: false,
  roomName: false,
  token: false,
  room: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'join':
      return {
        ...state,
        token: action.token,
        identity: action.identity,
        roomName: action.roomName
      };
    case 'set-active-room':
      return { ...state, room: action.room };
    default:
      return DEFAULT_STATE;
  };
};
```

### hooks/use-twilio-video.js
```jsx
    if (!videoRef.current.hasChildNodes()) {
      const localEl = localTrack.attach();

      videoRef.current.appendChild(localEl);
    };

    dispatch({ type: 'set-active-room', room});
  };

  const startVideo = () => connectToRoom();

  return { state, getRoomToken, startVideo, videoRef };
};
```

4:58 Next, let's open up our `videoDisplay` component. We're going to pull in `startVideo` and the `videoRef` from `useTwilioVideo`.

### components/video-display.js
```jsx
const VideoDisplay = ({ roomID }) => {
  const { state, stateVideo, videoRef } = useTwilioVideo();

  useEffect(() => {
    if (!state.token) {
      navigate('/', { state: { roomName: roomID } });
    }
  }, [state, roomID]);

  return <h1>Room: "{roomID}"</h1>;
};
```

5:08 Inside the `useEffect`, we want to check if the `state.room` does not exist and we need to start the video. Because we're using `startVideo`, we also need to track that to avoid a hooks warning.

### components/video-display.js
```jsx
useEffect(() => {
  if (!state.token) {
    navigate('/', { state: { roomName: roomID } });
  }

  if(!state.room) {
    startVideo();
  }
}, [state, roomID, startVideo]);
```

5:22 Then, outside of here, we're going to set up a fragment so that we can have multiple components in here. We'll set up a `div` with a `className` of `"chat"` and a `ref` of our `videoRef`.

### components/video-display.js
```jsx
const VideoDisplay = ({ roomID }) => {
  const { state, stateVideo, videoRef } = useTwilioVideo();

  useEffect(() => {
    if (!state.token) {
      navigate('/', { state: { roomName: roomID } });
    }

    if(!state.room) {
      startVideo();
    }
  }, [state, roomID, startVideo]);

  return <>
    <h1>Room: "{roomID}"</h1>
    <div className="chat" ref={videoRef} />
  </>;
};
```

5:37 Now, whenever Twilio does anything with video, it's going to insert those videos into this `div`. this is the hub for everything that Twilio does.

5:46 We can test this by heading out to our app, adding a name and a room, and joining. It's going to ask us if we can use the camera. Once we click allow, it inserts our local video. Hello!

![Jason Lengstorf waving hello](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-connect-video-to-a-room-with-react-hooks-in-gatsby-jason-waving-hello.jpg)