Jason Lengstorf: 0:01 Last thing we want to do is handle disconnection, both allowing the local participant to click the `leaveRoom` button to exit, and handling what happens when someone who's remote, ends up leaving the chat.

0:12 To do that, we're going to update `use-twilio-video.js`, and down toward the bottom here, we're going to add another helper next to `startVideo`, called `leaveRoom`. This is going to `dispatch` an action with the `type` of `'disconnect'`.

### hooks/use-twilio-video.js
```jsx
  room.participants.forEach(handleParticipant);
  room.on('participantConnected', handleParticipant);

  dispatch({ type: 'set-active-room', room});
};

const startVideo = () => connectToRoom();
const leaveRoom = () => dispatch({ type: 'disconnect' });
```

0:29 What this disconnection action is going to do, this is how the local participant is going to leave the room. When we process this, we're going to come up to our `reducer`, and we're going to check for the `action.type` of `'disconnect'`, so `case 'disconnect':`.

0:46 When this happens, we want to do two things. First, we want to see if a room exists, and if one does, we're going to call `state.room.disconnect()`. This is a built-in Twilio method that will disconnect from Twilio entirely and shut down all the things we need to do like local tracks and any API connections.

1:04 Once we've got that done, we're going to `return` the `DEFAULT_STATE` to bring our app back to the home page, no token, no name, no room, just back on the home page able to join a new room.

### hooks/use-twilio-video.js
```jsx
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
    case 'disconnect':
      state.room && state.room.disconnect();
      return DEFAULT_STATE;
    default:
      return DEFAULT_STATE;
  };
};
```

1:14 Next, we need to actually use this. We're going to add this as something that you can get from the local hook. We'll add it to our returned object.

### hooks/use-twilio-video.js
```jsx
  const startVideo = () => connectToRoom();
  const leaveRoom = () => dispatch({ type: 'disconnect' });

  return { state, getRoomToken, startVideo, leaveRoom, videoRef };
};
```

1:24 Inside `VideoDisplay`, we'll get `leaveRoom` out of the custom hook, and then we're going to add support for a button here. We've already got the state and we can say, "If there's a room, then we want to show a button." The button that we're going to show is going to have a class name of `leaveRoom` and an `onClick` of `leaveRoom`.

### components/video-display.js
```jsx
return (
  <>
    <h1>Room: "{roomID}"</h1>
    {state.room && (
      <button className="leave-room" onClick={leaveRoom}>
        Leave Room
      </button>
    )}
    <div className="chat" ref={videoRef} />
  </>
);
```

1:47 We'll just let people know what it means by adding some text that says, "Leave Room" If we save this, what we can do now is come out here join a call and we'll see a button that says, "Leave Room" If I click it, immediately turns off my webcam and brings me back to the home page.

2:04 Next, we want to handle how a participant leaves. Back in our `useTwilioVideo`, we'll go into the `handleRemoteParticipant`. Inside `handleRemoteParticipant` toward the bottom where we're handling actions, we're going to add a new one for `participant.on('trackUnsubscribed', );`

2:22 In this one, we'll get a `track` and we want to `track.detach` so that actually pulls it out of the DOM. We will say, "For each elements, we want to straight up, remove it. We want it gone." We also want to check for the container which we'll get by using `getElementById`.

2:42 Remember, we're inside of the `handleRemoteParticipant`, which means we have access to the element ID which we've set here.

2:51 We're grabbing that `container`, and then we're going to check if it exists. If there's a `container`, we're going to remove it, `container.remove()`. We want to completely remove this from all participant from our DOM whenever they unsubscribe or leave a room. To test this, we can pull up our extra windows again.

### hooks/use-twilio-video.js
```jsx
participant.on('trackSubscribed', addTrack);

participant.on('trackUnsubscribed, track => {
  track.detach().forEach(el => el.remove());

  const container = document.getElementById(id);
  if (container) container.remove();
});
```

3:09 I'll join as Jason. I'll open another window, join the same room as not Jason. Now we can see that I have two connections, but if I leave, I immediately disappear from this room. However, there is one problem. Because of the way that this works, if I close the window instead of clicking the leave button, this not Jason video will freeze.

3:38 My local track is still connected, but this one's frozen. It'll take a long time for that to realize that it's completely disconnected. They do that to keep the stable connection. If you accidentally disconnect, you have a blip in your Internet connection.

3:51 We don't want the whole thing to shut down, but in this case, we want it to close down a lot faster than it currently is. What we're going to do is we're going to add a check for whether or not the window has been closed. If the window has closed, we're going to unload. We can do that by going into the `VideoDisplay`.

4:11 We're going to get into this `useEffect`. We'll say, "We want to add an event listener." We're going to add this right to the window. We're going to listen for `'beforeunload'`. `'beforeunload'` is an event that fires right when somebody clicks the X in a tab or tries to navigate away.

### components/video-display.js
```jsx
useEffect(() => {
  if (!state.token) {
    navigate('/', { state: { roomName: roomID } });
  }

  if(!state.room) {
    startVideo();
  }

  window.addEventListener('beforeunload', leaveRoom);
}, [state, roomID, startVideo]);
```

4:28 What we're going to say is, if someone unloads this window or this tab, we want to leave the room first. We want to make sure that we've actually disconnected. Now to make sure that we don't pile up a bunch of event listeners, we're also going to return a callback.

4:42 This is what gets fired whenever this component unmounts. That's how `useEffect` works. Inside of this, we're just going to run `window.removeEventListener()`. We will set `'beforeunload'` and `leaveRoom`.

### components/video-display.js
```jsx
useEffect(() => {
  if (!state.token) {
    navigate('/', { state: { roomName: roomID } });
  }

  if(!state.room) {
    startVideo();
  }

  window.addEventListener('beforeunload', leaveRoom);

  return () => {
    window.removeEventListener('beforeunload', leaveRoom);
  };
}, [state, roomID, startVideo, leaveRoom]);
```

4:58 To make sure we avoid the React warning, we're going add `leaveRoom` to the `useEffect` dependency array. Now, if we go back out and I open a new window and join this room, what should happen is if I come in here and I immediately close the window, I'll immediately be disconnected.