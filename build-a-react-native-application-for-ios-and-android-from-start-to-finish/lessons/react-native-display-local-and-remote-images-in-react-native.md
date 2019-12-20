Instructor: [00:00] Let's name a new folder in `src` called `images` and a new `package.json` file in the `images` folder. Specify a `name` of `images`, which will allow us to use an absolute import path to import `images` from this folder. 

#### package.json
```javascript
{"name":"images"}
```

[00:19] Into that folder, we'll paste the images of a pizza slice at 1X, 2X, and 3X resolution. Note that the naming is important here. All three files should have the exact same basename, and the 2X and 3X files are differentiated with @2X and @3X before the file extension. 

![Filenames](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750449/transcript-images/react-native-display-local-and-remote-images-in-react-native-filenames.jpg)

[00:41] Then in `App.js`, we can import that image like any other component, except that we must ensure to add the file extension. Even though the @2X or @3X isn't included in that import statement, React Native will automatically detect the proper file to use for the current device. 

#### App.js
```javascript
import PizzaImage from 'images/pizza.png'
```

[01:00] We can't use that image directly. First, we have to import the `Image` component from React Native. 

```javascript
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image
} from 'react-native'
```
Then in the `render` method, we'll use the `Image` component and set the `source` prop to the `PizzaImage` that we imported. 

We can add a wrapping View for a bit of styling. 

```javascript
<View style={{
  marginTop: 40,
  alignItems: 'center'
}}>
  <Image source={PizzaImage} />
</View>
```

When we load now, we have that image, which will be included in the app bundle and displayed automatically at the proper resolution for the current device. 

![Image Component](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750466/transcript-images/react-native-display-local-and-remote-images-in-react-native-image-component.jpg)

[01:28] To look at remote images, that is, images that aren't in our bundle and that we'll have to download from a server, let's switch to `RestaurantRow.js` and log the values of the places coming from the server. 

#### RestaurantRow.js
```javascript
render() {

  const {
    place,
    index
  } = this.props

  console.log("place",place)
```

For every place, the server is also sending an `image` name. We can get those images from the server.

![Server Image Name](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-display-local-and-remote-images-in-react-native-server-imagename.jpg)

[01:49] Let's import `Image` into `RestaurantRow.js` and use `Image` in the info component of the row. We're going to set the `source` prop like before, but with remote images, we have to supply an object to that prop and include a `uri` key. That `uri` is where we can get the image, just like with an image tag on the Web. 

```javascript
{
  this.state.showInfo &&
  <View style={styles.info}>
    <Text>Restaurant Info</Text>
    <Image 
      source={{ 
        uri: `http://localhost:3000/images/${place.image}`,
      }}
    />
  </View>
}
```
[02:13] Remember that in the in iOS simulator using `localhost` is OK, but that won't work on the Android emulator. Use your computer's local network IP address instead. 

[02:25] If we reload the app now, nothing is showing up where we would expect the image to be. That's because it's important in React Native to specify the image dimensions for remote images, at least to specify what dimensions you'd like the image to be on screen.

[02:42] We can go back to Image and in the same object where you specify the `uri`, you can also specify a `height` and a `width`. 

```javascript
{
  this.state.showInfo &&
  <View style={styles.info}>
    <Text>Restaurant Info</Text>
    <Image 
      source={{ 
        uri: `http://localhost:3000/images/${place.image}`,
        width: 100,
        height: 100
      }}
    />
  </View>
}
```
Then when we reload, we can see the image. 

![Height & Width](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/react-native-display-local-and-remote-images-in-react-native-height-width.jpg)

[02:55] We could also specify the `height` and `width` as a `style` prop instead of in the `source` prop, but if we specify the wrong aspect ratio, say we try to make the image wider than it is tall for this square image, React Native will automatically fill the width and height and clip the image that doesn't fit. 

[03:14] You can keep that setting or specify a different one by specifying the `resizeMode` prop on the `Image` component. For example, we could stretch the image, which will deform the image -- probably not what we want to do in this case -- or we can set the `resizeMode` to `contain`, which ensures the entire image will be displayed within the width and the height, which is probably what we want for this image.

[03:39] If we don't know wide the image is, but we want it to fill the space, we can also set `flex 1` on an image instead of a `width`. The `Image` will flex just like a `View` does, but still obey the `resizeMode` to prop that we give it.

```javascript
{
  this.state.showInfo &&
  <View style={styles.info}>
    <Text>Restaurant Info</Text>
    <Image 
      source={{ 
        uri: `http://localhost:3000/images/${place.image}`
      }}
      srtyle={{
          flex:1,
          height:100
      }}
      resizeMode="contain"
    />
  </View>
}
```

![Final Image](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750453/transcript-images/react-native-display-local-and-remote-images-in-react-native-final.jpg)

