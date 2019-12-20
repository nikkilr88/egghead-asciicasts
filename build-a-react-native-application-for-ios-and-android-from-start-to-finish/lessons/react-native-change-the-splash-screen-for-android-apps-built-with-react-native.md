Instructor: [00:00] For Android, `npm install react-native-splash-screen` and run `react-native link`. Open the Android folder at the root of the project in the text directory and find `MainActivity.java`.

![MainActivity](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750453/transcript-images/react-native-change-the-splash-screen-for-android-apps-built-with-react-native-mainactivity.jpg)

[00:15] Now, `import android.os.Bundle` and the splash screen library that we linked from earlier. Then, we need to `@Override onCreate` and tell it to show the `SplashScreen` when the app start.

#### MainActivity.java
```java
package com.restaurantreview;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
      super.onCreate(savedInstanceState);
  }
}
```

[00:35] Now, we need to make a `layout` folder if it doesn't exist. From the root of the project that's at `android/app/src/main/res/layout`. Inside that layout folder, make `launch_screen.xml`.

![Layout Folder](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/react-native-change-the-splash-screen-for-android-apps-built-with-react-native-layout-folder.jpg)

[00:57] Then in `launch_screen.xml`, we'll paste the code from the React native's Splash Screen module installation guide, which tells the app to show something called `launch_screen`,

![Launch Screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-change-the-splash-screen-for-android-apps-built-with-react-native-launch-screen.jpg)

though we need to make a new `drawable` folder, in the same folder as this layout folder.

#### launch_screen.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/launch_screen">
</LinearLayout>
```

[01:14] We can specify many different sizes of launch_screen like the other size folders here,

![Sizes](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750460/transcript-images/react-native-change-the-splash-screen-for-android-apps-built-with-react-native-sizes.jpg)

but I'll just make a single `drawable-xhdpi` folder for now, and Android will automatically resize the image that we put in. This may or may not be OK for the splash screen image that you choose for your app.

[01:33] In to that drawable folder, we can paste on launch_screen. The name is important however. We need to make sure to name it `launch_screen.png`.

[01:41] Back in the Android project, in the `res/values` folder, we can create a new `colors.xml ` file if that doesn't exist. Inside of there, we'll copy the XML straight from their React native's Splash Screen module instructions, but we'll change the `primary_dark` color to the dark blue that we've been using for our app.

#### colors.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_dark">#0066CC</color>
</resources>
```
[02:06] Start an `App.js`. Import the `SplashScreen` module, and we'll export a new component that just renders the base `ModalNav` by adding `componentDidMount` lifecycle method. In that, we'll tell the `SplashScreen` to `hide`.

#### App.js
```javascript
import SplashScreen from 'react-native-splash-screen'

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

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return <ModalNav />
  }
}
```

[02:23] We're finally ready to test this out. First, uninstall the app from the emulator and rerun the app with `react-native run-android`. There is a new splash screen for Android.

![Android Splash](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750466/transcript-images/react-native-change-the-splash-screen-for-android-apps-built-with-react-native-android-splash.jpg)