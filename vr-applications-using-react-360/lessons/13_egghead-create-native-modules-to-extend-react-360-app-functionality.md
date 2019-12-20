Instructor: [00:00] You would like to have a feature that whenever I travel to a different country, I would like to change the title of the place to say, "Welcome to Spain," "Welcome to Italy," and so on.

[00:08] Over here, we have the updated places array and each object inside of this array has a name, flag, and a panorama property. We're getting those over here in the flag method.

[00:18] I am going to pass in the name to `changeBackground` method, get it over here as well. In order to change the title of the page, I am going to do `document.title` equals `Welcome to + name`.

#### index.js

```js
changeBackground(panorama, name) {
  Environment.setBackgroundImage(asset(panorama))
  document.title = 'Welcome to ' + name
}
```

After I save, in their first [inaudible] , we're going to have a problem.

[00:34] The problem is that as soon as I click on the flag, we're going to get a message, "Document is not defined."

![Error message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/create-native-modules-to-extend-react-360-app-functionality-error-message.png)

It is not defined because by default, the React 360 runs inside of web worker, and web workers do not have access to the DOM.

[00:46] In order to enhance our React 360 application with something that requires the DOM, we need to implement our value on native module. In order to do that, first, go to `client.js`.

[00:55] Next, `import` `module` from `react-360-web`. Next, we need to create a new `class`. I am going to call it a `TitleChanger`. The title changer needs to extent the `Module` that we'll import it from React 360.

#### client.js

```js
import { ReactInstance, Location, Surface, Module } from "react-360-web"

class TitleChanger extends Module {}
```

[01:06] We need to specify constructor. This `constructor` is basically going to around the super method with the name of the class. I am going to do `super` `TitleChanger`. Whatever is specified over here is going to be exposed to React 360 application.

```js
import { ReactInstance, Location, Surface, Module } from "react-360-web"

class TitleChanger extends Module {
  constructor() {
    super('TitleChanger')
  }
```

[01:18] I am going to create a new method called `changeTitle`. It's going to take `title` and argument. I am going to do `document.title = title`.

```js
changeTitle(title) {
  document.title = 'Welcome to ' + title
}
```

[01:26] Next, we need to expose its native module to our React code. In order to do that, whenever we're creating a new React 360 instance, we can also pass in some custom options. Here, what we need to do is to pass in `nativeModules`. It takes an array. We're going to create a `newTitleChanger` instance over here.

```js
function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [new TitleChanger()],
    ...options
  })
```

[01:43] I'll save that and go to `index.js`. Over here, import `NativeModules` from `react-360`.

#### index.js

```js
import React, { Fragment } from "react"
import {
  AppRegistry,
  asset,
  StyleSheet,
  Environment,
  Prefetch,
  View,
  Image,
  NativeModules,
  VrButton
} from "react-360"
import Flag from "./components/Flag"
import Earth from "./components/Earth"
```

Next, we need to get our title changer module from all native modules. I am going to do `TitleChanger` equals `NativeModules` to get the title changer module.

```js
const { TitleChanger } = NativeModules
```

[01:59] Next, we need to remove this document title caller, and we're going to do `TitleChanger`, `changeTitle`, and then I am going to set the title to `Welcome to ' + name`. Let's see if it works.

```js
changeBackground(panorama, name) {
  Environment.setBackgroundImage(asset(panorama))
  TitleChanger.changeTitle(Welcome to ' + name)
}
```

[02:10] I am going to click on the flag of Spain. We see the title change to "Welcome to Spain." If I click on the flag of NASA, I am going to see the title change, "Welcome to space."

`See 2:10 in lesson`
![Title change](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/create-native-modules-to-extend-react-360-app-functionality-title-change.png)

[02:18] There're a plenty of native modules already implemented for us. If I decide to log all of those, we're going to see our title changer module as well as useful stuff such as networking, location, or history.
