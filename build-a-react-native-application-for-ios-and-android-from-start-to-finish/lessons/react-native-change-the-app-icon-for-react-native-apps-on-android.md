Instructor: [00:00] To change the app icon for Android, we can see the current icons by going to `android/app/source/main/res` and then looking in these folders with the different resolutions.

![folders](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750468/transcript-images/react-native-change-the-app-icon-for-react-native-apps-on-android-folders.jpg)

[00:12] Instead of generating the different sizes by hand, let's go to the [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/) and select Launcher icon generator.

![Launcher Icon Generator](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750444/transcript-images/react-native-change-the-app-icon-for-react-native-apps-on-android-launcher-icon.jpg)

Select the 1024x1024 pizza icon. We'll set the padding to 0 percent and the background color to white.

[00:34] Then we can download all the images.

![Download Images](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750446/transcript-images/react-native-change-the-app-icon-for-react-native-apps-on-android-download.jpg)

We'll unzip the download, copy all the different-sized folders, delete the old app icon folders, and paste in the new ones. Then we can make sure to uninstall the app from the emulator before building it again and launching with `react-native run-android`.

[01:13] Once it launches, we can close the app, find the app on the device, and verify the app icon has changed. Notice that unlike iOS, Android supports transparent backgrounds for app icons. We could have used a transparent background instead of a white one here.

![New Icon](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750466/transcript-images/react-native-change-the-app-icon-for-react-native-apps-on-android-new-icon.jpg)