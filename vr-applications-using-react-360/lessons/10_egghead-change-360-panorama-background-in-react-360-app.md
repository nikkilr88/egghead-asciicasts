Instructor: [00:00] There are a couple of places in which we can change the background that gets displayed around the user. The first place is inside of the current JS. Here, we can specify the default background that will get displayed.

[00:09] Right now, it's 360 work. If I were to change it to `spain.jpeg`, I am going to change the background to this picture of Spain that I took myself a couple of years ago.

#### client.js

```js
// Load the initial environment
r360.compositor.setBackground(r360.getAssetURL('spain.jpg'))
}

window.React360 = { init }
```

`See 0:15 in lesson`
![Spain.jpg image](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/change-360-panorama-background-in-react-360-app-spain.png-jpg.png)

[00:18] This picture is inside of the `static_assets` folder. Apart from changing the default background, we can also change the background dynamic inside of our React application.

[00:27] Let me go ahead and revert this change, and we're going to jump into `index.js`. Over here, we have the updated places. Each place has a flag and also a panorama associated with it. First, Spain has a flag of Spain and also this panorama that we can see over here.

[00:41] Here in the flag methods, we are mapping over all those places and displaying a flag for each country. Our goal would be whenever a user is going to click on one of those flags, we would like to travel to this place.

[00:52] To achieve this effect, first `import` `environment` from `react-360`.

#### index.js

```js
import React, { Fragment } from "react"
import {
  AppRegistry,
  asset,
  StyleSheet,
  View,
  Image,
  Environment,
  VrButton
} from "react-360"
import Flag from "./components/Flag"
import Earth from "./components/Earth"
```

Next, we're going to create a `changeBackground` method. It's going to take the `panorama` as argument. Here, we're going to [inaudible] `Environment.setBackgroundImage`. I am going to use the `asset` function to get the image associated with this `panorama`.

```js
export default class travelVR extends React.Component {
  state = {
    activeFlag: ''
  };

  changeBackground(panorama) {
    Environment.setBackgroundImage(asset(panorama));
  }
```

[01:10] Over here on this `onClick` handler, I am going to call this function `changeBackground` and I am going to pass in the `panorama` of this place.

```js
renderFlags() {
  return PLACES.map(({panorama, flag }) => (
    <VrButton
      onClick={() => this.changeBackground(panorama)}
      onEnter={() => this.setState({ activeFlag: flag })}
      onExit={() => this.setState({ activeFlag: '' })}
    >
```

Now, we can use our app to travel. If I were to click on the flag of Spain, I am going to go to Spain. If I click on the flag of Pakistan, I am going to go to this place.

`See 1:20 in lesson`
![Travel to Spain](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/change-360-panorama-background-in-react-360-app-travel-spain.png)
