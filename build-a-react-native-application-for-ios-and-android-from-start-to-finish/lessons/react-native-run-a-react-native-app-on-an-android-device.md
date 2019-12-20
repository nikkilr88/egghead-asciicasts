Instructor: [00:00] To deploy to an Android device, first make sure the device is configured for USB debugging. Enable developer options by going to `Settings`,

![Settings](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750451/transcript-images/react-native-run-a-react-native-app-on-an-android-device-settings.jpg)

**-> About Phone/emulated device**,

![About](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750440/transcript-images/react-native-run-a-react-native-app-on-an-android-device-about.jpg)

and tap the **Build number** row seven times.

![Build Number](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750446/transcript-images/react-native-run-a-react-native-app-on-an-android-device-build-number.jpg)

Then there will be a developer options setting that will allow you to enable **USB debugging**.

![USB Debugging](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750443/transcript-images/react-native-run-a-react-native-app-on-an-android-device-usb-debugging.jpg)

[00:31] In a terminal, run `adb devices` if you would like to check that your device is properly connected.

![ADB](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750445/transcript-images/react-native-run-a-react-native-app-on-an-android-device-adb.jpg)

There can only be one connected device at a time for React Native to properly detect and run, so close any emulators that you have open to ensure that only the device is showing. Then run `react-native run-android` like normal. It will automatically detect your connected device and run the app.
