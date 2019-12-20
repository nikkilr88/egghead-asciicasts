Instructor: [00:00] Install `react-native-splash-screen` with `npm install --save react-native-splash-screen`. Then run `react-native link`. You can update your splash screen without using this module, but it removes a flash of a white screen between your splash screen and the React Native app, which can be distracting.

[00:22] Let's start in `App.js`. Import the splash screen module.

#### App.js
```javascript
import SplashScreen from 'react-native-splash-screen'
```
We'll export a new component that just renders the base `ModalNav`. The sole purpose of this component is to hide the splash screen once the app is done launching.

```javascript
const ModalNav = createStackNavigator({
  Tabs: { screen: Tabs },
  AddReview: { screen: AddReview }
}, {
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
  }
})

export default class App extends Component {
  render() {
    return <ModalNav />
  }
}
```

[00:36] Add a `componentDidMount` lifecycle method. In that, we'll tell the `SplashScreen` to `hide`.

```javascript
export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return <ModalNav />
  }
}
```

Then open the project in finder. Go to the iOS directory. Then open the Xcode project.

![AppDelegate](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750453/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-app-delegate.jpg)

In `AppDelegate.m`, we have to import the splash screen library and tell it to show the splash screen when we launch.

![XCode](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750466/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-xcode.jpg)

[01:08] The default launch screen is this launch screen interface builder file.

![Default Launch Screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750465/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-default-launch.jpg)

We could change this file in order to change the launch screen, but sometimes a designer gives us the exact image that we have to use. That's what we'll do here as well.

[01:22] Let's delete this launch screen file and click on the `Images.xcassets` folder.

![images.xcassets](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750468/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-images-xcassets.jpg)

Right-click under app icon. Under app icon and launch images, make a new iOS launch image.

![Launch Image](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-launch-image.jpg)

[01:42] There are multiple launch images that are required, one for each device screen size that's available. The relevant launch sizes are on the Apple Developer website.

[01:54] I've made a launch screen with the pizza icon from Ionicons for each size. Once the launch images are made, you can drag them from Finder directly onto the correct launch icon spot in Xcode.

![Drag Images](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750449/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-drag-images.jpg)

[02:11] Now, select the project. In the app target, under the general tab, scroll down to app icons and launch images.

![App Icons](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750467/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-app-icons.jpg)

Then tell Xcode to migrate to the asset catalog.

[02:31] If this doesn't refresh correctly right away, you may have to navigate away from the screen and then go back to it. Then make sure launch image is selected and that there is nothing in the launch screen file selection.

![Launch Screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-launchscreen.jpg)

[02:46] Back in the simulator, you'll have to actually delete the app off the simulator and rebuild it before that change will take place. I'll press `command-shift-H` to simulate the home button, long-click on the restaurant review app, and press the X to delete it.

![Delete](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-delete.jpg)

Finally, press the home button again.

[03:04] Back in a terminal, run `react-native run-ios`, which will rebuild, reinstall, and relaunch the app. There's the new launch screen.

![New Launch Screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750466/transcript-images/react-native-change-the-splash-screen-for-ios-apps-built-with-react-native-new-launch.jpg)