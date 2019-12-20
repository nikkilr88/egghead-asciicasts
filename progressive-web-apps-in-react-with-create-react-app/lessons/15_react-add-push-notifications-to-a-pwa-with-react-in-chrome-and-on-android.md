In `src/serviceworker.js` we need to save access to the service worker registration here. Set `global.registration = registration`. 

#### src/servicewroker.js
```js
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {

      global.registration = registration

    ...
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
  });
}
```

Then in `src/app.js` we can make a new `<button>` which will ask for permission to subscribe the user to push notifications. 

#### src/app.js
```js
class Profile extends Component {

  state = {
    image: null,
    supportsCamera: 'mediaDevices' in navigator
  }

  ...

  render() {
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
         
          ...

          <br />
          <button onClick={this.subscribe}>Subscribe for Notifications</button>

        </div>

      </div>
    )
  }

}
```
Then in the `onClick` function for that button, we can ask the user for push notification permission.

```js
subscribe = () => {

}
```

First, we need a public key for our PAS server. For this demo we'll generate a new key by globally installing Web Push with `npm install web-push -g`. 

#### terminal
```bash
$ npm install web-push -g
```
```bash
$ web-push generate-vapid-keys
```

Then by running `web-push generate-vapid-keys`, which will give us a new public and private key. Let's copy the public key, and then back in `src/app.js` paste that key into the new subscribe function.

![image of the public and private keys](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630124/transcript-images/react-add-push-notifications-to-a-pwa-with-react-in-chrome-and-on-android-keys.png)

#### src/app.js
```js
subscribe = () => {
  const key = "BDk-kDxLswQMajg9TJqpb9VFTjQeQmS0FE_rTVJ4f9G-v9GFkzcDt-vYkvz5dVkbCfrGmJeLTbvuNUKpOUojWB4"
```
Then we'll copy a function from the Google documentation about push notifications called `urlB64ToUint8Array`, which will convert that public key as a string into an array that can actually be used by the browser to subscribe to push notifications.

```js
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
```

Then in our `subscribe` method we can access the service worker registration that we stored on global and call `subscribe` on the `pushManager`. That function is a promise, so we'll know that the user is `subscribed` successfully once we get a promise resolution.

```js
subscribe = () => {
  const key = "BDk-kDxLswQMajg9TJqpb9VFTjQeQmS0FE_rTVJ4f9G-v9GFkzcDt-vYkvz5dVkbCfrGmJeLTbvuNUKpOUojWB4"

  global.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(key)
    }).then(sub => {
      console.log("Subscribed!")
    }).catch(err => {
      console.log("Did not subscribe.")
    })
}
```

In `src/sw.js` we can listen for a `'push', event` from the push server just like we did for fetch. Add a push `eventListener`. We're going to tell the `event` to `waitUntil` we show a push notification. Access the server worker registration with `self.registration` and call `showNotification`. That takes the title as the first argument and a hash of options as the second. For now, we'll set the `icon` to an icon that we already have in the public folder and the `body` to whatever text comes through the push from the server. 

#### src/sw.js
```js
self.addEventListener('push', event => {
  event.waitUntil(self.registration.showNotification('Todo List', {
    icon: '/icon-120.png',
    body: event.data.text()
  }))
})
```

Now we can build and serve that to test the notification.

#### terminal.png
```bash
$ yarn build 
```
```bash
$ serve -S build 
```

[02:36] Google Chrome's DevTools currently has a bug with testing push notifications. I'm using Google Canary here, which has fixed the issue. First go to the profile page and click the button to subscribe to push notifications.

Once we click allow, you'll see a message in the console that confirms that we can now receive push notifications from this PWA. 

![image showing that we can recieve push messages](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630127/transcript-images/react-add-push-notifications-to-a-pwa-with-react-in-chrome-and-on-android-subscribe.png)

Then in the application tab of DevTools, locate the push test location. Then we can fill in a message like "New todo item added." 

![image showing the addition of a message in the application tab](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629702/transcript-images/react-add-push-notifications-to-a-pwa-with-react-in-chrome-and-on-android-message.png)

When we click push we see the notification.

![image showing the push notification pop up](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630121/transcript-images/react-add-push-notifications-to-a-pwa-with-react-in-chrome-and-on-android-push.png)

Also, in `src/app.js` we can trigger a push notification from our app directly instead of from a third party server. Add a new `button` and we'll make a new `testPushMessage` function. 

#### src/app.js
```js
<br />
  <button onClick={this.subscribe}>Subscribe for Notifications</button> 

<br />
  <button
    onClick={this.testPushMessage}
  >Test Push Message</button>
```

In that function we'll call the global registration that we said earlier. Here we can call `showNotification` directly passing in a title and a `body`.

```js
testPushMessage = () => {
  global.registration.showNotification('Test Message', {
    body: 'Success!'
  })
}
```

When we build and serve that we can go to the profile page and click the button and see our successful push test triggered from the app code itself.

#### terminal.png
```bash
$ yarn build 
```
```bash
$ serve -S build 
```
![image of the successful push test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630121/transcript-images/react-add-push-notifications-to-a-pwa-with-react-in-chrome-and-on-android-pushsuccess.png)