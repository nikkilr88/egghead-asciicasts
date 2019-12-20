Jason Lengstorf: 0:01 Now that we have a serverless function to get a Twilio token, we need to modify our code to get that token. We're going to do that in `use-twilio-video.js`. We're going to start out by importing `axios`, so that we can make a call to that Twilio function.

0:17 We're also going to set up a constant that has that `TWILIO_TOKEN_URL` in it, so that we're able to make that call. We've saved that over here so we can get that out and drop it in right here. Next, we need to make sure that we're able to store that token somewhere, so we're going to add it to our `state` and then we're going to add a new action.

### hooks/use-twilio-video.js
```jsx
import axios from 'axios';

const TWILIO_TOKEN_URL = "" // url from twilio 

const DEFAULT_STATE = {
  identity: false,
  roomName: false,
  token: false,
}
```

0:39 The way that this function works is that we're going to send off the `identity` to Twilio and we're going to get back a `token`. We need to store that in `state`. That also means that in our `'join'` action, that means we need to track the `token`. We're going to pass that in action.token.

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
    default:
      return DEFAULT_STATE;
  };
};
```

0:57 Next, we need to go down into `useTwilioVideo` and add a function that we can use to make the request. This is going to be called `getRoomToken` and this is an `async` function. We're going use async/await so that we don't have to do promise wrangling.

1:12 This is going to be a single argument that will be an object with two properties, `identity` and `roomName`. Inside this function, we're going to get the result of making a call to `axios`, which we're going to `await`. We will use the `axios.post` method to our `TWILIO_TOKEN_URL`. We're going to send along the `identity`, and we'll send over the `roomName` as well.

### hooks/use-twilio-video.js
```jsx
const useTwilioVideo = () => {
  const [state, dispatch] = useContext(TwilioVideoContext);

  const getRoomToken = async ({ identity, roomName }) => {
    const result = await axios.post(TWILIO_TOKEN_URL, {
      identity,
      room: roomName
    });
  };

  return { state, dispatch };
};
```

1:39 We don't strictly speaking need to send the `roomName`, but in the future, a good enhancement for this app would be to limit the `token` to only a single room. Once we have the result, we're going to `dispatch` an action that's going to have a `type` of `'join'`. It will send back the `token`, which will be the `result.data`. We're also going to pass along the `identity` and the `roomName` so that we can get those in the `state`.

2:04 Instead of sending the `dispatch` itself, we're going to send `getRoomToken` instead. That means that we need to go and update our `join.js`. 

### hooks/use-twilio-video.js
```jsx
const useTwilioVideo = () => {
  const [state, dispatch] = useContext(TwilioVideoContext);

  const getRoomToken = async ({ identity, roomName }) => {
    const result = await axios.post(TWILIO_TOKEN_URL, {
      identity,
      room: roomName
    });

    dispatch({ type: 'join', token: result.data, identity, roomName });
  };

  return { state, getRoomToken };
};
```

We will do that by getting `getRoomToken` out of the `useTwilioVideo`, instead of `dispatch`. In `handleSubmit`, we're going to refactor it to use `getRoomToken` instead and we no longer need to send a `type` because that's handled by the function itself.

### components/join.js
```jsx
const Join = () => {
  const { state, getRoomToken } = useTwilioVideo();
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    getRoomToken({ identity, roomName });
  };
```

2:30 Once this is done, we can head back out to our app. We can see that the `token` is now tracked in `state`. If we make a call to our room, we should get a `token` back. Click join. Now we can see that we're getting back a `token`. This `token` is going to allow us to use the Twilio API.

![token tracked by state](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-consume-a-generated-twilio-token-in-gatsby-with-react-hooks.jpg)