Instructor: [00:00] We have a view with the text saying that we should add an image over here. In order to do that, first import `image` from React 360.

#### index,js

```js
import React from "react"
import { AppRegistry, StyleSheet, View, Image } from "react-360"
```

Next, we move this text component, we move the styles for the text, and we're going to display two flags.

[00:12] First, let me specify some styles. We're going to have a `width` of `50` percent and the `height` of `40` percent.

```js
export default class travelVR extends React.Component {
  render() {
    const { mainView, text } = styles;

    return (
      <View style={mainView}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: 600,
    height: 600,
    padding: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
  };
  flag: {
    width: '50%',
    height: '40%'
  }
})
```

In React 360, we can display images from either the Internet or from assets stored within our project.

[00:26] First, I'm going to just enter this flag style, as well as I'm going to provide an image. I'm going to set the `style` to `flag`. We need to specify the `source` for this image. Let me just copy and paste that, so the source property takes an object and inside of this object we are specifying that we would like to display this flag component taken from Wikipedia.

```js
return (
  <View style={mainView}>
    <Image
      style={flag}
      source={{
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Poland.jpg'
      }}
    />
  </View>
```

[00:43] After I save and refresh that, we're going to see the result over here.

![Poland flag added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/display-images-using-the-image-component-in-react-360-poland-flag.png)

We have this flag component displayed. In order to use our own assets, we need to take a look inside of the React 360 project directory.

[00:54] Each React 360 project has a `static_assets` folder. This is where you keep all your static assets. First, on this `360_world_jpg` image, this is what we see when we look around inside of our app. We're going to put this flag into the PNG over here.

[01:08] Let's go back to `index.js`. In order to use static assets, we need to import `asset` from `react-360`.

```js
import React from "react"
import { AppRegistry, asset, StyleSheet, View, Image } from "react-360"
```

We're going to create another `image` component. We're going to set this `style` to `flag` as well and we're going to provide the source. We're going to set it to `asset` `flag_italy.png`.

```js
return (
  <View style={mainView}>
    <Image
      style={flag}
      source={{
        url:
          'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Poland.jpg'
      }}
    />
    <Image style={flag} source={asset('flag_italy.png')} />
  </View>
```

[01:25] This asset function is going to take a look inside of the static asset directory and get this `flag_italy.png` for us. After I save and refresh that, we're going to see the result over here. We have two images displayed. One is from external source and the other one is from our static assets directory.

![Italy flag addded](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/display-images-using-the-image-component-in-react-360-italy-flag.png)
