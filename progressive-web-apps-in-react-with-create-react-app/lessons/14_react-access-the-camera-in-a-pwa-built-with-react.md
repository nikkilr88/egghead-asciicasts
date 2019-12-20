In `src/app.js`, on the profile page, we can add a file input component that accepts images, which is the easiest way to add an image upload to a PWA. 

#### src/app.js
```js
const Profile = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
            <Link to="/">
              <img src={Back} alt="logo" style={{ height: 30 }} />
            </Link>
            Profile
          </span>
      </nav>

      <div style={{ textAlign: 'center' }}>
        <img 
          src={GreyProfile} alt="profile" 
          style={{ height: 200, marginTop: 50 }} 
        />
        <p style={{ color: '#888', fontSize: 20 }}>username</p>
        </br>
        <input
          type="file"
          accept="image/*"
          onChange={this.changeImage}
        />  
      </div>
    </div>
  )
}
```

Let's make the `changeImage` function. For now, we'll just have a bit of state called `image`, which we'll start as `null`.

```js
class Profile extends Component {

  state = {
    image: null
  }

  changeImage = (e) => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0])
    })
  }

  ...
}
```

We'll make an object URL from the inputs file that was uploaded. That will allow us to display it directly as a user's profile image. 

```js
return (
  <div>
    <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">
          <Link to="/">
            <img src={Back} alt="logo" style={{ height: 30 }} />
          </Link>
          Profile
        </span>
    </nav>

    <div style={{ textAlign: 'center' }}>
      <img 
        src={this.state.image || GreyProfile} alt="profile" 
        style={{ height: 200, marginTop: 50 }} 
      />
      <p style={{ color: '#888', fontSize: 20 }}>username</p>
      
      </br>
      <input
        type="file"
        accept="image/*"
        onChange={this.changeImage}
      />
    </div>
  </div>
  )
```
When we build and start that in a browser, we can go to the profile page and upload a new image to be displayed as the profile image.

#### terminal.png
```bash
$ yarn build 
```
```bash
$ serve -S build 
```

![image of the choose file button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629685/transcript-images/react-access-the-camera-in-a-pwa-built-with-react-choosefile1.png)

When the PWA is installed on a mobile device, that will also allow the user to upload from the camera roll. If we want it to default to the camera instead of to photos, we can add a capture prop to the file `input`. Since this is for a user profile image, we can even specify that we want to default to the front-facing camera and specify `user` as the `capture` prop.

#### src/app.js
```js
<div style={{ textAlign: 'center' }}>
  <img 
    src={this.state.image || GreyProfile} alt="profile" 
    style={{ height: 200, marginTop: 50 }} 
  />
  <p style={{ color: '#888', fontSize: 20 }}>username</p>
  
  </br>
  <input
    type="file"
    accept="image/*"
    onChange={this.changeImage}
    capture="user"
  />
</div>
```

That's the easiest way to get an `image` upload into our app. To interact more directly with the camera, first, we have to check that the browser `supportsCamera`, by checking that `mediaDevices` is in `navigator`. 

```js
class Profile extends Component {

  state = {
    image: null,
    supportsCamera: 'mediaDevices' in navigator
  }

  changeImage = (e) => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0])
    })
  }
```

Then we can change the file upload to just a `<button>`, and make a new `onClick` function.

```js
<div style={{ textAlign: 'center' }}>
  <img 
    src={this.state.image || GreyProfile} alt="profile" 
    style={{ height: 200, marginTop: 50 }} 
  />
  <p style={{ color: '#888', fontSize: 20 }}>username</p>
  
  {
    this.state.supportsCamera &&
      <button
        onClick={this.startChangeImage}
      >
        Toggle Camera
      </button>
  }

  </br>
  <input
    type="file"
    accept="image/*"
    onChange={this.changeImage}
    capture="user"
  />
</div>
```

Let's make a new `onClick` function called `startChangeImage`. In that function, we'll set some `state` to turn on the `enableCamera`. 

```js
startChangeImage = () => {
  this.setState({ enableCamera: !this.state.enableCamera })
}
```

When that state gets set, we can render a new `video` component. 
That's where we'll show the live camera feed.

```js
{
  this.state.enableCamera && 
  <div>
    <video controls={false} autoPlay></video>
  </div>
}
```

When that `video` mounts, we need to save the `ref`. We'll also immediately ask for access to the user's camera. On `navigator.mediaDevices`, call that `getUserMedia` function, and tell it that we want `video`. Then we can set the `srcObject` of a new video tag to the `stream` that's coming from the user's media device. This will show a popup which will ask for permission to access the camera. Make sure you only do this step when you're really ready to show the video feed, or else the user will just close your app.

```js
{
  this.state.enableCamera && 
  <div>
    <video controls={false} autoPlay></video>
  <video 
    ref={c => {
      this._video = c
        if(this._video) {
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => this._video.srcObject = stream)
        }
      }}
      controls={false} autoPlay
      style={{ width: '100%', maxWidth: 300 }}
    ></video>
  </div>
}
```

Now, we can display a `<button>` that will actually take an image. To get the image out of the video stream, we'll also need a blank `<canvas>` element. Let's put an invisible one here as well, and save the `ref`.

```js
<br />

<button
  onClick={this.takeImage}
>Take Image</button>

<canvas 
  ref={c => this._canvas = c}
  style={{ display: 'none' }}
/>
```

Now, in the `takeImageOnClick` function, first, we'll set the `height` and the `width` of the canvas to the current `_video` size. Then we can draw the image into the `_canvas` directly from the `_video`. Next, we'll tell the `_video` to stop recording, and that will shut the user's camera off.

```js
takeImage = () => {
  this._canvas.width = this._video.videoWidth
  this._canvas.height = this._video.videoHeight

  this._canvas.getContext('2d').drawImage(
    this._video,
    0, 0,
    this._video.videoWidth,
    this._video.videoHeight
  )

  this._video.srcObject.getVideoTracks().forEach(track => {
    track.stop()
  })
```

Finally, we can set the image in our state to the canvas-context-image as a data URL, and turn off the video in our app by turning off the `enableCamera` bit and state. 

```js
takeImage = () => {
  this._canvas.width = this._video.videoWidth
  this._canvas.height = this._video.videoHeight

  this._canvas.getContext('2d').drawImage(
    this._video,
    0, 0,
    this._video.videoWidth,
    this._video.videoHeight
  )

  this._video.srcObject.getVideoTracks().forEach(track => {
    track.stop()
  })

this.setState({
  image: this._canvas.toDataURL(),
  enableCamera: false
  })
}
```

Now, let's `yarn build ` that and `serve -S build` it to test it out.

#### terminal.png
```bash
$ yarn build 
```
```bash
$ serve -S build 
```

In a browser, we can click to toggle the camera, and we see a video feed. 

![image of the video camera on the browser screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630128/transcript-images/react-access-the-camera-in-a-pwa-built-with-react-video.png)

Then, when we click to take a picture, the picture is rendered to the canvas, and transferred to our state, and shown on the screen.

![image of the video camera on the browser screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629735/transcript-images/react-access-the-camera-in-a-pwa-built-with-react-photo.png)

The same process works for mobile devices as well, but it will only work over HTTPS. If we just serve this on our local computer over a local network, then it will never ask for camera access. Keep that in mind during development.
