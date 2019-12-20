Instructor: [0:00] We have an updated version of our app, so we have a single view component. Inside of this view component, we are entering some flags, which are displayed over here over, it's in the service. So far, our app has been entirely static, as in I was not able to actually do anything with any of those components.

[0:15] It's time we changed that and add some interactivity to our React 360 application. To do that, first `import` `VrButton` from React 360.

#### index.js

```js
import React from "react"
import {
  AppRegistry,
  asset,
  StyleSheet,
  View,
  Image,
  VrButton
} from "react-360"
import Flag from "./components/Flag"
import Earth from "./components/Earth"
```

Next, wrap this flag component inside of a `VrButton` like this. Let me move the key to `VrButton` component, and then we're going to attach some events to this `VrButton`.

```js
export default class travelVR extends React.Component {
  renderFlags() {
    return FLAGS_IMAGES.map(image => (
      <VrButton key={image}>
        <Flag image={image} />
      </VrButton>
    ))
```

[0:33] First, we can add an `onClick`. It's going to take a function, and it's going to `console.log` `Click`. Let me copy that, because we are also going to add an `onEnter`, as well as `onExit`, like this.

```js
export default class travelVR extends React.Component {
  renderFlags() {
    return FLAGS_IMAGES.map(image => (
      <VrButton
        key={image}>
        onClick={() => console.log('Click')}
        onEnter={() => console.log('Enter')}
        onExit={() => console.log('Exit')}
      >
        <Flag image={image} />
      </VrButton>
    ))
```

After I save and I refresh that, we can open dev tools to check the result.

[0:51] If I hover my mouse over the flag of Spain, I'm going to get "enter" in the console.

`See 0:55 in lesson`
![Click event](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/capture-user-interaction-in-react-360-with-vrbutton-component-click-event.png)

If I move my mouse away from the flag of Spain, I'm going to get an exit. If I click on it, I'm going to get the click event triggered.

[1:03] Right now, we have our events connected to this `VrButton`. Important thing to note to this when it comes to `VrButton` is that `onEnter` and `onExit` behave differently based on the device. If I were to run this app inside of a VR headset, if I were to literally look at the flag of Spain, then I would get the `onEnter` handle triggered.

[1:20] If I looked away from the flag, then I would get the `onExit`. We would like to add some state to our app. Basically, if I hover over some of those flags, I would like to make it more visible to indicate that it's currently active.

[1:31] To do that, jump to `Flag.js` component. Over here, by default, we're going to make the opposite of the flag to `0.7`.

#### Flag.js

```js
const styles = StyleSheet.create({
  flag: {
    height: 400,
    width: 600,
    marginRight: 20,
    opacity: 0.7
  },
```

By default, all our flags are inactive. Next, we're going to add `active`, and I'm going to make the opacity `one`.

[1:44] Let me destructure that from styles, and we are going to also destructure both `image` and `activeFlag` from these props. Next, we need to modify this type prop. I'm going to pass in the `flag` prop, and whenever the `activeFlag` is equal to current image, we're going to apply the `active` styles as well.

```js
export default class Flag extends React.Component {
  render() {
    const { flag, active } = styles
    const { image, activeFlag } = this.props

    return (
      <Image
        style={[flag, activeFlag === image && active]}
        source={asset(this.props.image)}
      />
    )
  }
}
```

[2:02] Let me save that, and let's go back to the `index.js`. Let's add some state. By default, we're going to have a `state` that `activeFlag` is an empty string. We're going to change this `onEnter` handler. Instead of `console.log`, I'm going to do `this.setState`, and we're going to set the `activeFlag` to current `image`.

#### index.js

```js
renderFlags() {
  return FLAGS_IMAGES.map(image => (
    <VrButton
      key={image}
      onClick={() => console.log('Click')}
      onEnter={() => this.setState({ activeFlag: image})}
      onExit={() => console.log({'Exit')}
    >
      <Flag image={image}  />
    </VrButton>
  ));
}
```

[2:20] I'm going to do something similar to the `onExit` handler, but I'm going to reset the `activeFlag` to an empty string. We need to pass in this active flag state to flag component as well. I'm going to do this state, `activeFlag`.

```js
renderFlags() {
  return FLAGS_IMAGES.map(image => (
    <VrButton
      key={image}
      onClick={() => console.log('Click')}
      onEnter={() => this.setState({ activeFlag: image})}
      onExit={() => this.setState({ activeFlag: '' })}
    >
      <Flag image={image} activeFlag={this.state.activeFlag}/>
    </VrButton>
  ));
}
```

[2:35] After I save and refresh that, we have the desired effect. Right now, if I hover over any of those flags, it's clear which one is currently being active.

`See 2:35 in lesson`
![Active flag addded to VR](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/capture-user-interaction-in-react-360-with-vrbutton-component-active-flag.png)
