Instructor: [00:00] After installing the React Native CLI and Xcode if you're running iOS or the Android dependencies if you want to run Android, create a new React Native project by running `react-native init` and the name of your project.

[00:15] We'll make an app to review restaurants. Let's name the app `RestaurantReview`. Note that the app name must be alphanumeric only and can't contain spaces. You can also change this name later before you distribute the app. 

#### Terminal
```javascript
react-native init RestaurantReview
```

[00:30] Once the app is created, `cd` into the new app directory. Then run the app in the iOS simulator with `react-native run-ios`. The simulator will start automatically, and the app will build and launch. This can take quite a while the first time you run the app, but it will be faster after the first time.

[00:54] As the app is launching, a new command window called the metro bundler or the packager will launch. Leave this command window open as you're developing because it will build and rebuild the JavaScript portion of the app. 

![Metro Bundler](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750471/transcript-images/react-native-create-a-react-native-app-and-run-it-on-the-ios-simulator-and-android-emulator-metro.jpg)

Once everything is finished, the default app is running. 

![react-native-create-a-react-native-app-and-run-it-on-the-ios-simulator-and-android-emulator-default.png](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750437/transcript-images/react-native-create-a-react-native-app-and-run-it-on-the-ios-simulator-and-android-emulator-default.jpg)

[01:10] React Native picks the default iOS simulator, but you can switch that in two different ways. First, you could specify a simulator to the `react-native run-ios` command by setting the `--simulator` flag. 

```javascript
react-native run-ios --simulator="iPhone x"
```

[01:24] Alternatively, you can open the project folder in Finder, navigate to the iOS directory, and there you'll find the underlying Xcode project for the app. You can open that Xcode project, select the simulator you want to use, and then click the play button to run the app.

![XCode](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750455/transcript-images/react-native-create-a-react-native-app-and-run-it-on-the-ios-simulator-and-android-emulator-xcode.jpg)

[01:43] To run the app on Android, first, open the Android emulator of your choice. Then, with the emulator open and unlocked, run `react-native run-android`. React Native will automatically detect the open emulator and will build and launch the app.

![Android](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750467/transcript-images/react-native-create-a-react-native-app-and-run-it-on-the-ios-simulator-and-android-emulator-android.jpg)