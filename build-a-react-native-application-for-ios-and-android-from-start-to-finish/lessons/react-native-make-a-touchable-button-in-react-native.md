Instructor: [00:00] In `RestaurantRow.js`, import `Button` from `react-native`. 

#### RestaurantRow.js
```javascript

import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'

```
We can use that `Button` to make the info `Text` tappable. We can replace the info `Text` with a new `Button` and the React native `Button` takes a `title` prop.

[00:16] We'll put the info label there. 

```javascript
<View style={styles.edge}>
    <Button title="Info" />
</View>
```

If we view that, then we can see a basic info link. 

!![Basic Link](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750455/transcript-images/react-native-make-a-touchable-button-in-react-native-basic-link.jpg)

It's getting wrapped. Let's first add a min width to the edges view which looks better. 

```javascript
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  edges: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minWidth: 50
  },
```

This `Button` component doesn't have many configuration options unfortunately though, but we can set a `color` and an `accessibilityLabel`, and we can set an `onPress` function.

```javascript
<View style={styles.edge}>
    <Button 
      title="Info" 
      color="#C93F0B"
      accessibilityLabel="Info"
      onPress={this.infoPressed}
    />
</View>
```

[00:49] Let's make that `onPress` function. When the button is pressed, let's toggle a bit of `state` to show some additional info. 

```javascript
state = {
    showInfo: false
}

infoPressed = () => {
    this.setState({ showInfo: !this.state.showInfo })
}
```

Then, we can use that state to show or hide an info box in the row.

```javascript
{
  this.state.showInfo &&
  <View style={styles.info}>
    <Text>Restaurant Info</Text>
  </View>
}
```

[01:06] Let's rearrange the views a bit, so the info box shows up in the row. When we reload, the buttons work. 

![Button Working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-make-a-touchable-button-in-react-native-button-working.jpg)

This `Button` component from React native works just fine, but the customizability is very limited.

[01:19] Let's replace it with the fully customizable touchable element. If we switch back to adjust a `Text` field, we'd like to be able to press on that label, but unlike the web, not every component is pressable in React native, instead import `TouchableOpacity`, `TouchableHighlight`, and `TouchableWithoutFeedback`.

```javascript
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'
```

[01:39] We can start by wrapping the `Text` in the `TouchableOpacity` component, and that touchable component does allow taps. We can use `onPress` again to call our `infoPressed` method, and that works.

```javascript
<TouchableOpacity onPress={this.infoPressed}>
    <Text>Info<Text/>
</TouchableOpacity>
```

[01:56] We can now style that `TouchableOpacity` just like any other `View`. 

```javascript
<TouchableOpacity 
  onPress={this.infoPressed}
  style={styles.button}
>
    <Text>Info<Text/>
</TouchableOpacity>

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
  }
```

![Styled Button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750460/transcript-images/react-native-make-a-touchable-button-in-react-native-styled-button.jpg)

However, one difference from the web is we can't style the text by setting the style on the outside component.

[02:14] If we try, then nothing happens. Remember that you have to style the `Text` separately. 

Now, we have a fully customized and style tappable button. We use `TouchableOpacity` and you can see when we tap the button, it changes the opacity to signify the click.

![Opacity](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750456/transcript-images/react-native-make-a-touchable-button-in-react-native-opacity.jpg)

[02:41] If you don't like that, you can try one of the other touchable components that we imported. First, we'll look at `TouchableWithoutFeedback`. The first thing to notice is that the button styles don't show up.

```javascript
<TouchableWithoutFeedback 
  onPress={this.infoPressed}
  style={styles.button}
>
    <Text style={styles.buttonText}>Info<Text/>
</TouchableWithoutFeedback>
```

[02:52] That's because, `TouchableWithoutFeedback` is meant wrap existing components. If we tap those buttons, they work as buttons, but you'll see no feedback as you tap them. This is the option that you want to use, if you want no automatic visual feedback for the tap. Finally, we'll switch to `TouchableHighlight`. 

```javascript
<TouchableHighlight 
  onPress={this.infoPressed}
  style={styles.button}
>
    <Text style={styles.buttonText}>Info<Text/>
</TouchableHighlight>
```
When we reload, the styling is back.

[03:14] When we press the buttons, we see visual feedback, but it turns the background black, as we press it. To customize the touch color, make sure to set the underlayColor on a touchable highlight.

```javascript
<TouchableHighlight 
  onPress={this.infoPressed}
  style={styles.button}
  underlayColor='#5398D'
>
    <Text style={styles.buttonText}>Info<Text/>
</TouchableHighlight>
```

[03:27] Once we do that, we finally have a style button with a customizable tap color. We'll stick with that. Let's add just a bit of styling on the info view. Now, we have style buttons and a style view that we can toggle ON and OFF.

![Final Style](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/react-native-make-a-touchable-button-in-react-native-final-style.jpg)