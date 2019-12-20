Instructor: [00:00] Open `index.js`, which is the entry point for the React Native app. 

#### index,js
```javascript
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```
The `AppRegistry` is used to load a React component onto the screen. The component that is being loaded is `App`. Let's open `App.js`. 

Now you can see the component that is being shown on the simulator. 

[00:20] Let's clean this up a bit and remove the parts of the default component that we aren't using. We can change the welcome text to `Restaurant Review`.

#### App.js
```javascript
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Restaurant Review!
        </Text>
      </View>
    );
  }
}
```
To see the change in the simulator, we don't need to rebuild the entire app. Instead, for iOS, select the simulator and press `command-R` on a Mac or `control-R` on Windows, which will rebuild just the JavaScript portion of the app. We can see that change. 

![Reload](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750458/transcript-images/react-native-reload-the-simulator-when-changes-occur-in-react-native-apps-reload.jpg)

[00:47] Another way to refresh the app is to open the developer menu with `command-D` on a Mac or `control-D` on Windows and select `reload`. 

![Reload in App](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750459/transcript-images/react-native-reload-the-simulator-when-changes-occur-in-react-native-apps-reload-in-app.jpg)

On Android, you can double-tap R to reload or bring up the developer menu with `command-M` on a Mac or `control-M` on Windows and select reload.

[01:07] There's another way to reload and see changes on both iOS and Android as well. Open the developer menu and enable live reload. 

![Live Reload](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750460/transcript-images/react-native-reload-the-simulator-when-changes-occur-in-react-native-apps-live-reload.jpg)

In this mode, a watcher will watch the files in your project. Saving any JS file will trigger the simulator to reload the app.

[01:26] We can take this one step further as well. First, turn off live reload, and then enable hot reloading. 

![Hot Reloading](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750460/transcript-images/react-native-reload-the-simulator-when-changes-occur-in-react-native-apps-hot-reloading.jpg)

In hot reloading mode, the app won't rebuild and reload the entire JavaScript bundle. Instead, it will just update the parts of the app that you changed. 

[01:45] It will reload the components without a full refresh. When we make changes now, you can see that it's hot reloading without refreshing the entire bundle. Hot reloading can save a lot of time when you're developing, but sometimes it doesn't work very well. Then you have to go back to a full refresh. For that reason, we'll switch off hot reloading for this app.

