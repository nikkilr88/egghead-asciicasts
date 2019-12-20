Jason Lengstorf: 00:01 To show video from remote participants, we need to add a little bit more to our custom hook. Inside our hook, we're going to look for the `useTwilioVideo` hook and then before `connectToRoom`, let's add a function called `handleRemoteParticipant`. This is going to take two arguments, a `container` and the `participant`.

00:22 Inside this function, we want to first grab out an `id` and every `participant` and really, everything that Twilio create is going to come back with an `sid`. That's their unique identifier for different resources.

### hooks/use-twilio-video.js
```jsx
const useTwilioVideo = () => {
  const [state, dispatch] = useContext(TwilioVideoContext);
  const videoRef = useRef();

  const getRoomToken = async ({ identity, roomName }) => {
    const result = await axios.post(TWILIO_TOKEN_URL, {
      identity,
      room: roomName
    });

    dispatch({ type: 'join', token: result.data, identity, roomName });
  };

  const handleRemoteParticipant = (container, participant) => {
    const id = participant.sid;
  };
```

00:36 Next, let's create a `div` for our remote `participant` to live in. Again, remember, we're working with the `ref` so this needs to be actual DOM elements, not React components. This element is going to be a `document.createElement` and we'll send in a `div`. Then, we'll give it an `id` of the `participant.id`.

00:59 For styling, we'll give it a class name of remote `participant`. Next, we want to set up the `name`. We want to show who is in the room. We'll do `document.createElement` and we'll use a heading level four for this. We're going to set the `innerText` to the `participant.identity`.

01:19 This is going to be whatever they use as their name, similar to what we're passing around for our local identity. This is what the remote `participant` has passed in for their identity. It's just going to show their display name. Once we've got the name created, we're going to put it inside of our `participant` `div`.

### hooks/use-twilio-video.js
```jsx
const handleRemoteParticipant = container => participant => {
  const id = participant.sid;

  const el = document.createElement('div');
  el.id = id;
  el.className = 'remote-participant';

  const name = document.createElement('h4');
  name.innerText = participant.identity;
  el.appendChild(name);
};
```

01:37 Next, we need a way to add the `participant` tracks to the screen. With the name inside of the `participant` `div`, we can go ahead and just attach that to our outside `container`. We'll stick it into a `container.appendChild` and put in our `participant` `div`.

01:52 Next, we need a way to add media tracks, both a video and audio. We're going to create a helper function called `addTrack`, which will accept a `track`. Inside of it, we want to find our `participant` `container`, which we'll call `participantDiv`. We'll get that by running `document.getElementById(id)` and using the `id` that we set up here. That lets us get this particular participants `container` `div`.

02:16 We also want to grab the `media`, which we get by running `track.attach`, which gives us the DOM element for either the video or audio that are trying to attach. Then, we want to actually attach it. We will run `participantDiv.appendChild` and put the `media` inside of it.

### hooks/use-twilio-video.js
```jsx
const handleRemoteParticipant = container => participant => {
  const id = participant.sid;

  const el = document.createElement('div');
  el.id = id;
  el.className = 'remote-participant';

  const name = document.createElement('h4');
  name.innerText = participant.identity;
  el.appendChild(name);

  container.appendChild(el);

  const addTrack = track => {
    const participantDiv = document.getElementById(id);
    const media = track.attach();

    participantDiv.appendChild(media);
  }
};
```

02:36 To use this function, we're going to go into the `participant` and that `participant` object is going to have `tracks` attached to it. We'll run a `forEach` and a bit misleadingly, Twilio doesn't doesn't us back a straight track. It gives us something called a `publication`.

02:50 Each `publication` has a boolean, so `publication.isSubscribed`. That lets us know whether or not our particular track should be in this room. If so, we'll call `addTrack` using the `publication.track.`

03:04 However, that's only for people who have already joined when we join the room. The other thing that we need to do is add a listener for anytime that a track is subscribed. Twilio does this with `eventListener`. `participant.on('trackSubscribed')`, we'll just run `addTrack`.

### hooks/use-twilio-video.js
```jsx
const handleRemoteParticipant = container => participant => {
  const id = participant.sid;

  const el = document.createElement('div');
  el.id = id;
  el.className = 'remote-participant';

  const name = document.createElement('h4');
  name.innerText = participant.identity;
  el.appendChild(name);

  container.appendChild(el);

  const addTrack = track => {
    const participantDiv = document.getElementById(id);
    const media = track.attach();

    participantDiv.appendChild(media);
  }

  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      addTrack(publication.track);
    }
  });

  participant.on('trackSubscribed', addTrack);
};
```

03:23 To actually use this, we'll go into our `connectToRoom` function and below where we add the `localTrack`, we will set up a helper function called `handleParticipant`. That will get our `participant` and then it will call `handleRemoteParticipant` with the `videoRef.current` and then the `participant`.

03:46 Once we've got that, we can check for existing participants. These are the people who are already joined when we join the room. We want to loop through each one and `handleParticipant`. For anyone who joined afterward, we'll have an event so `room.on('participantConnected')`, we want to handle that participant.

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

  if (!videoRef.current.hasChildNodes()) {
    const localEl = localTrack.attach();

    videoRef.current.appendChild(localEl);
  };

  const handleParticipant = participant => {
    handleRemoteParticipant(videoRef.current, participant);
  };

  room.participants.forEach(handleParticipant);
  room.on('participantConnected', handleParticipant);

  dispatch({ type: 'set-active-room', room});
};
```

04:06 To check this, we're going to have to open two windows. We start by joining a room here. I'll join Jason and egghead and join the video chat. It turns on my webcam and I can see it, but I'm not able to join this room twice.

04:19 What I'll do is open an additional tab and we'll visit localhost. I'll just copy/paste this localhost room egghead and I'm going to use a different name then join. I'll screen my name. Now I want to be mute and that will prevent the echo. I've muted the site to prevent any echo.

04:39 Now, we can see that in this room where I've joined as Jason, I can see the not Jason video. In this room where I've joined as not Jason, I can see the Jason video. We can see a little bit of delay if we look when I move where the remote video is just slightly behind the local video. That's our indication that it's working.

![jason joins the chat room locally and "remotely"](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-show-video-in-gatsby-from-remote-participants-with-react-hooks-jason-joins-twice.jpg)