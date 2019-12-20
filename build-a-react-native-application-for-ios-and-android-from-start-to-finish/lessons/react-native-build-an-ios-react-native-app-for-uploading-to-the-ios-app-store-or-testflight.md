Instructor: [00:00] From the project root, open the iOS folder. Then open the Xcode project. Under the project's **General** tab,

![General Tab](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750467/transcript-images/react-native-build-an-ios-react-native-app-for-uploading-to-the-ios-app-store-or-testflight-general.jpg)

first select the proper development team for your app and make sure the **Signing Certificate** doesn't have any errors.

![Certificate](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750467/transcript-images/react-native-build-an-ios-react-native-app-for-uploading-to-the-ios-app-store-or-testflight-certificate.jpg)

[00:16] Also make sure that the app **Version** and the **Build** number are set to the values that you want.

![Version](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-build-an-ios-react-native-app-for-uploading-to-the-ios-app-store-or-testflight-version.jpg)

If you've already uploaded the build to the App Store, you'll need to increase this **Build** number by at least one to register it as a new build.

[00:29] Then in the device selector, select either your currently connected device or a generic iOS device if you don't have a connected device. Then go to **Product -> Archive** to start the build process.

![Archive](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-build-an-ios-react-native-app-for-uploading-to-the-ios-app-store-or-testflight-archive.jpg)

Once the Archive process is complete, Xcode will open the Organizer window where you'll see the new build.

![New Build](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750452/transcript-images/react-native-build-an-ios-react-native-app-for-uploading-to-the-ios-app-store-or-testflight-new-build.jpg)

[00:49] If you're enrolled in the Apple Developer Program, and you have registered this app for distribution, you'll also be able to upload to the App Store directly from this window, which will not publicly release your app. Instead you'll have to log into iTunes Connect, where you can add keywords, descriptions, and screenshots of your app. You can also do beta testing through TestFlight from there.

[01:09] Also from this Organizer window, you can export the app for ad hoc distribution. If Xcode doesn't automatically open the Organizer window after archiving your app, you can open it by going to **Window -> Organizer**.

![Manual Open Window](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-build-an-ios-react-native-app-for-uploading-to-the-ios-app-store-or-testflight-manual-window.jpg)
