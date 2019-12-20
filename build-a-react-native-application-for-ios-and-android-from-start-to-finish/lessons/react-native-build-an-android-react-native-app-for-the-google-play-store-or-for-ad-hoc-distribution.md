Instructor: [00:00] Check to see if the `keytool` command is in your path by running `keytool`. On Windows you'll probably have to run it from program files \ Java than your jdkversion\bin.

![Keytool](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-build-an-android-react-native-app-for-the-google-play-store-or-for-ad-hoc-distribution-keytool.jpg)

[00:12] Then, generate a new signing key with `keytool -genkey -v -keystore my-release-key.keystore -alias mykeyalias -keyalg RSA -keysize 2048 -validity 10000`. Enter key password as well as the information about who is requesting the key. This will generate a 2048 bit RSA key that you want to make sure to keep private.

[00:51] It's also important to back up this keystore file and keep it secure, because if you ever have to change it, you'll have to rerelease your app and lose all the old downloads and ratings on the Play Store.

[01:02] Then, copy that file into the android/app directory. Edit the file `android/gradle.properties`.

![gradel.properties](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750438/transcript-images/react-native-build-an-android-react-native-app-for-the-google-play-store-or-for-ad-hoc-distribution-gradle-properties.jpg)

We'll paste in the following keys substituting in the correct values for the keystore that you just created.

![Keys](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750460/transcript-images/react-native-build-an-android-react-native-app-for-the-google-play-store-or-for-ad-hoc-distribution-keys.jpg)

[01:22] Then, edit at `android/app/build.gradle`. First, check that the `versionCode` and the `versionName` are set to the versions that you want to release.

![Version Name](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-build-an-android-react-native-app-for-the-google-play-store-or-for-ad-hoc-distribution-version-name.jpg)

Now, add a `signingConfigs` section under the `defaultConfig`.

![Singing Configs](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-build-an-android-react-native-app-for-the-google-play-store-or-for-ad-hoc-distribution-signing-configs.jpg)

[01:36] In the build types release section add a `signingConfigs` line.

#### build.gradle
```javascript
buildTypes{
    release{
        minifyEnabled enableProguardInReleaseBuilds
        proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        signingConfig signingConfigs.release
    }
}
```

Then, in our terminal `cd` into the `android` folder and build the app with `./gradlew assembleRelease` which will build the production version of the app with the new signing key.

[01:57] Once that's complete, you can find the built APK file in `android/app/build/output/apk/app-release.apk`.

![App Release APK](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750442/transcript-images/react-native-build-an-android-react-native-app-for-the-google-play-store-or-for-ad-hoc-distribution-app-release.jpg)

That's the final file that you can distribute ad hoc to other android users to install directly on their devices, or upload to the Google Play Store to release to the public.
