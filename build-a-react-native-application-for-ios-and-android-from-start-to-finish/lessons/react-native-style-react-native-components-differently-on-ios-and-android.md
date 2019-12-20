Instructor: [00:00] There are two ways to style a component differently for iOS and Android. `import Platform from react-native`. We can check the OS that we're currently running with `Platform.OS`.

#### App.js
```javascript
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform
} from 'react-native'
```

[00:12] In the styles for the `header`, let's say we want a different styling just for iOS. We can put the header style in an array and then check if `Platform.OS === 'ios`. Then just for iOS, we can make the padding a bit smaller.

```javascript
render() {
  return (
    <View style={{
        flex: 1
    }}>

    <Text style={[
        HeaderStyle.header,
        Platform.OS === 'ios' ? {padding: 20, paddingTop: 30} : {}
    ]}>Restaurant Review</Text>
```

[00:30] When we run that, the padding changes to a new size on iOS. On Android, it still has the large padding. This pattern of switching on the platform's OS is so common that `Platform` provides a built-in way to do.

[00:48] First, let's make a new iOS-only header style in `HeaderStyle.js`. We'll use a smaller padding, a slightly smaller font size, and a slightly thinner font. Now we have one style that we want just for Android and one style that we want just for iOS.

#### HeaderStyle.js
```javascript
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  header: {
    padding: 40,
    fontSize: 30,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '300'
  },
  iOSHeader: {
    padding: 20,
    paddingTop: 30,
    fontSize: 26,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '200'
  }
})
```

[01:13] Back in the `render` method of `App.js`, we can select between those by calling `Platform.select`. `select` takes an object. The keys are the different operating systems we want to select for.

[01:26] We're only running iOS and Android, so we'll have one key for `ios` where we'll just return the iOS style and one for `android` where we can return the Android style. 

#### App.js
```javascript
render() {
    Platform.select({
        ios: HeaderStyle.iOSHeader,
        android: HeaderStyle.header
    })
```

We can set that to a local variable and then use that local variable as our style for the header. 

```javascript
render() {
    const headerStyle = Platform.select({
        ios: HeaderStyle.iOSHeader,
        android: HeaderStyle.header
    })

    <Text style={headerStyle}>Restaurant Review</Text>
```
Now, we have the old style running on Android still and the new style running on iOS.

[01:54] We can also totally replace a component between iOS and Android by making two totally different files. First, let's extract this header into its own component file by making a `Header.js` file.

[02:06] Inside `Header.js`, we can `import React, { Component } from react`, `Text` from `react-native`, and import the `HeaderStyle` file. Then we can create and export a new `Header` component. Copy the header text from App.js and paste it into our header file.

#### Header.js
```javascript
import React, { Component } from 'react'

import { Text } from 'react-native'

import HeaderStyle from './HeaderStyle'

export default class Header extends Component {

  render() {
    return (
      <Text style={headerStyle}>
        Restaurant Review
      </Text>
    )
  }

}
```

[02:32] We want the `headerStyle` to be different between iOS and Android. Instead of using `Platform` like before, we're actually going to create two totally different files. Rename this header file to `Header.ios.js`. In the iOS version, we can use `HeaderStyle.iOSHeader` for the Text component.

```javascript
      <Text style={HeaderStyle.iOSHeader}>
        Restaurant Review
      </Text>
```

[02:54] Copy that file. Create a new file called `Header.android.js`. In this new Android version, change the style to just `HeaderStyle.header`. To really change things, let's make the header title `Restaurant List` on the Android version.

#### Header.android.js
```javascript
import React, { Component } from 'react'

import { Text } from 'react-native'

import HeaderStyle from './HeaderStyle'

export default class Header extends Component {

  render() {
    return (
      <Text style={HeaderStyle.header}>
        Restaurant List
      </Text>
    )
  }

}
```

[03:11] Back in `App.js`, we can import the header file in the normal `import` style without worrying about the iOS or Android extensions. React Native will automatically figure out which one to require based on the platform that we're currently running on.

#### App.js
```javascript
import Header from './Header'
```

[03:27] We can delete the `headerStyle` and `Platform` switches from `App.js`. We can use that `Header` component instead of the text directly. 

```javascript
  render() {

    return (
      <View style={{
        flex: 1
      }}>

        <Header />

```
When we reload, we see the `ios` header style on iOS and the `android` header style on Android.
