Instructor: [00:00] From the root of the project, open the iOS folder. Then open the Xcode project. Find and select the `Images.xcassets` entry in the file tree.

![Xcode](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750466/transcript-images/react-native-change-the-app-icon-for-react-native-apps-on-ios-xcode.jpg)

[00:11] Select `AppIcon`, which should already exist. If it doesn't already exist, you can create it by right-clicking, then select `App Icons & Launch Images`, and then `New iOS App Icon`.

![New App Icon](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-change-the-app-icon-for-react-native-apps-on-ios-new-app-icon.jpg)

[00:24] You'll have to have an icon for each size here, and Xcode tells you what the size needs to be. For example, the iPhone Notification icon says `20pt`.

![iphone notification](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750465/transcript-images/react-native-change-the-app-icon-for-react-native-apps-on-ios-iphone-notification.jpg)

It has entries for `2x` and `3x`. The `2x` icon will be `40x40` pixels. The `3x` icon will be `60x60` pixels.

[00:43] I have a directory here with these icons pre-made with the Ionicons pizza icon. We can just drag each ic
![Icon Dragged](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750449/transcript-images/react-native-change-the-app-icon-for-react-native-apps-on-ios-icon-dragged.jpg)

[00:56] Back in the iOS simulator, first uninstall the app and then rerun with `react-native run-ios`. After it launches, we can press the Home button with Command-Shift-H to close the app. Then we can see the new icon.

![New Icon](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750468/transcript-images/react-native-change-the-app-icon-for-react-native-apps-on-ios-new-icon.jpg)