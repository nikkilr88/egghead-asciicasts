Let's start by switching local host in our app to our IP address on our local network. 

#### src/app.js
```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ITEMS_URL = 'http://[YOUR_IP]:4567/items.json'

...

  componentDidMount() {
    fetch(ITEMS_URL)
    .then(response => response.json())
    .then(items => {
      this.setState({ items, loading: false })
    })

 ...

    fetch(ITEMS_URL, {
      method: 'POST',
      body: JSON.stringify({ item: this.state.todoItem }),
      headers:{
        'Content-Type': 'application/json'
      }

...

  deleteItem = (itemId) => {
    fetch(ITEMS_URL, {
      method: 'DELETE',
      body: JSON.stringify({ id: itemId }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
```

If we `yarn build` and `serve -s build` that. , then we can load it from another device like an iPhone.

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```
![image of the application in action on the phone](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582325/transcript-images/react-add-a-pwa-to-the-home-screen-of-an-ios-or-android-device-and-the-chrome-app-home-screen-app.png)

Note that installing a PWA on an iPhone only works from Safari. It doesn't work in other browsers like Chrome on iOS. This may change in the future, but it's a restriction for now. To add it to the iOS home screen, open the share menu with the share icon and scroll over to Add to Home Screen. 

![image of the share menu](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582325/transcript-images/react-add-a-pwa-to-the-home-screen-of-an-ios-or-android-device-and-the-chrome-app-home-screen-homescreen.png)

There's no way to force this to happen or to do it for the user. The only way for them to install your pages and app is for the user to do it, themselves. I'll keep the default name for now. Now, we can see it on the home screen. 

![image of the application on the home screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582325/transcript-images/react-add-a-pwa-to-the-home-screen-of-an-ios-or-android-device-and-the-chrome-app-home-screen-homescreen.pngicon.png)

If we load it from the icon here, it loads in something called standalone mode, which means there is no header or footer, like normal in Safari.

![image of the app in standalone mode](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582322/transcript-images/react-add-a-pwa-to-the-home-screen-of-an-ios-or-android-device-and-the-chrome-app-home-screen-nofooter.png)

For Android, some devices in Android versions will automatically pop up a banner if it detects that your app is a PWA. 

![image of the banner automatically popped up](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582322/transcript-images/react-add-a-pwa-to-the-home-screen-of-an-ios-or-android-device-and-the-chrome-app-home-screen-auto.png)

If that doesn't happen, the user can still install it by going to the Chrome browser options and choosing `Add to Home screen`. 

![image of the add to home screen option](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582328/transcript-images/react-add-a-pwa-to-the-home-screen-of-an-ios-or-android-device-and-the-chrome-app-home-screen-add.png)

That will install it on the Android home screen.

![image of the application loaded on the Android homescreen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582338/transcript-images/react-add-a-pwa-to-the-home-screen-of-an-ios-or-android-device-and-the-chrome-app-home-screen-screen.png)

Now, on Chrome, on the Application tab, we can add the PWA to the Chrome home screen as well. 

![image of the application on the chrome desktop home screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582324/transcript-images/react-add-a-pwa-to-the-home-screen-of-an-ios-or-android-device-and-the-chrome-app-home-screen-desktop.png)

This is a way to simulate what the app would look like if the user installed it through the Chrome Web app store.
