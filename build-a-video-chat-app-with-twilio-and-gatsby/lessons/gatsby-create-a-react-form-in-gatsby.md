Jason Lengstorf: 00:01 We need to allow people to join a room. To do that, we need a form. We're going to create a component and that will be called `join.js`. Inside, we're going to `import React` and we also need to track state of the components, the input specifically. We're going to import `{ useState} from 'React'`.

00:18 Our component is going to be called `Join` and it doesn't take any props. It will however keep track of the `identity` of the person, that'll be their first name or whatever they want to go by. A `setIdentity`, which is how we're going to set that and that will come from `useState`, which will start as an empty string.

00:36 Then, we need to do the same thing for the `roomName`. We'll set up `roomName` and `setRoomName` from `useState` as an empty string as well. The form itself is going to be inside of a fragment because we want to send back an `<h1>` that'll say, `Start or Join a Video Call` Then, we need to have our form as well.

### components/join.js
```jsx
import React, { useState } from 'react';

const Join = () => {
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState('');

  return (
    <>
      <h1>Start or Join a Video Chat</h1>
    </>
  );
};
```

00:57 To use the CSS, that is predefined in `layout.css` over here, we're going to use class names, so this is going to be called `"start-form"`. Inside of it, we need to have three things. We need to get the name, the `roomName` and a button to submit the form.

01:13 Let's start by adding a `label` and we're going to make this accessible. We'll add an `htmlFor`, that will be for the `identity`. Inside of this, we'll use `Display name:` and then we need to put in an `<input/>`.

### components/join.js
```jsx
const Join = () => {
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState('');

  return (
    <>
      <h1>Start or Join a Video Chat</h1>
      <form className="state-form">
        <label htmlFor="identity">
          Display name:
          <input
          />
        </label>
      </form>
    </>
  );
};
```

01:25 The `<input/>` is going to be a `type="text"`. It will also have an `id` of `identity` that needs to match the `htmlFor`. These two need to be the same. The value is going to be this `identity` variable here. We'll pull that in and `onChange`, we need to update that.

01:44 We will get the `event` and we will use the `setIdentity` helper from `useState` to update the value to the `event.target.value`. That'll be whatever somebody types into this `<input/>` gets saved using `setIdentity` into this `identity` variable.

### components/join.js
```jsx
<>
  <h1>Start or Join a Video Chat</h1>
  <form className="start-form">
  <label htmlFor="identity">
    Display name:
    <input
    type="text"
    id="identity"
    value={identity}
    onChange={event => setIdentity(event.target.value)}
    />
  </label>
  </form>
</>
```

02:01 We need to do exactly the same thing for the `roomName`, so we can duplicate this block entirely. We'll change this to `roomName` and then we need to update this one to use the `setRoomName` helper instead.

### components/join.js
```jsx
<label htmlFor="roomName">
  Which room do you want to join?
  <input
    type="text"
    id="roomName"
    value={roomName}
    onChange={e => setRoomName(e.target.value)}
  />
</label>
```

02:13 Finally, we need to set `<button type="submit">` and will say, `Join Video Chat`.

### components/join.js
```jsx
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
```

Next, we need to actually put this on our home page because if we look at our page right now, nothing's happening.

02:26 To use it, we're going to go into `index.js`. We're going to `import Join from '../components/join'` and then we're going to swap out this `<h1>` for our `Join` component. 

### pages/index.js
```jsx
export default () => (
  <Layout>
    <Join />
  </Layout>
)
```

Now that we've defined this component, we need to export it as our default. We'll `export default Join` in `join.js`.

02:44 Once we've saved this, we can go back out to our preview. Because gatsby develop is still running, it'll auto update it. We can jump over here, reload the page, and we'll see our component. It shows our headline and our form. If we update it, we can see that the values have updated.

03:01 However, nothing happens yet. If I submit this, we don't see anything happen. It just refreshes the page. Next, we need to add an actual submission handler.

![Video call sign in form](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-create-a-react-form-in-gatsby-form.jpg)