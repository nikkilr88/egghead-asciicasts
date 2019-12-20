Instructor: [0:00] We have a bit of a performance problem in our app because whenever we load the app we're going to get this 360 world image, which is around a megabyte. We're going to get all those images for their flags. If I were to click on the flag of Spain, only then I'm going to send the request to fetch this 360 panorama, which is around 2.3 megabytes. This can be tricky, especially on mobile.

[0:21] Ideally, what we would like to do is to be able to prefetch all those images in the background. Whenever I click on a flag, we are not going to send a request because this image is already going to be loaded.

[0:31] In order to do that, first `import` `Prefetch` from `react-360`. We're going to `import` `Fragment` from React as well.

#### index.js

```js
import React, { Fragment } from "react"
import {
  AppRegistry,
  asset,
  StyleSheet,
  View,
  Prefetch,
  Image,
  Environment,
  VrButton
} from "react-360"
import Flag from "./components/Flag"
import Earth from "./components/Earth"
```

Next, in the `renderFlags` method, we're going to wrap this `VrButton` inside of a `Fragment`. We're going to copy this key to the `Fragment` as well. I'm going to render the `Prefetch` component.

[0:49] `Prefetch` component takes a source, so I'm going to set the `source` to be `asset` `panorama`. When all those places are being rendered, I'm going to also prefetch the appropriate panorama per country. Right now, we have the desired effect.

```js
renderFlags() {
  return PLACES.map(({ panorama, flag }) => (
    <Fragment key={flag}>
      <Prefetch source={asset(panorama)} />
      <VrButton
        onEnter={() => this.setState({ activeFlag: flag })}
        onExit={() => this.setState({ activeFlag: '' })}
        onClick={() => this.changeBackground(panorama)}
      >
        <Flag image={flag} activeFlag={this.state.activeFlag} />
      </VrButton>
    </Fragment>
  })
}
```

If I save and refresh that, we're going to see all those background images fetched in the background.

![Background images fetched](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/use-prefetch-component-to-fetch-images-before-they-are-needed-in-react-360-back-ground-images-fetched.png)

[1:09] Right now, we won't have to send an additional request whenever a user is going to click on a flag. Those images are going to be preloaded. Our app will have a better perceived performance.

[1:18] With that being said, sometimes we might not want to prefetch the images in the background because user might not decide to visit all the countries. It's up to you as a developer to decide whether you want to prefetch images or videos or not.
