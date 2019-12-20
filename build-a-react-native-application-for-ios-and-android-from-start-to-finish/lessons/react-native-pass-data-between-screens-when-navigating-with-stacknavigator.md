Instructor: [00:00] In `RestaurantRow.js`, where we're calling `navigate`, we can pass params as a second argument. In particular here, we can pass the restaurant object that is in our `props` in as the `place` key.

#### RestaurantRow.js
```javascript
infoPressed = () => {
  this.props.navigation.navigate('Info', {
    place: this.props.place
  })
}
```

[00:14] Then in `RestaurantInfo.js`, we can put a debug in the `render` and see that the `place` object is being passed under `this.props.navigation.state.params.place`, and we can access it there directly.

![Debugger](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-pass-data-between-screens-when-navigating-with-stacknavigator-debug.jpg)

[00:35] We can also see a `getParam` function which is another option to access the param. In `RestaurantInfo.js`, let's start with the first option by extracting the `place` from the params. Unfortunately, this `params` will be `null` if no `params` are passed. We need to check for `null` first, which works, but it's long and cumbersome.

#### RestaurantInfo.js
```javascript
const place = this.props.navigation.state.params.place
```

[00:58] We can do the second option, which is to use the `getParam` function, which automatically checks for `null` params.

```javascript
const place = this.props.navigation.getParam('place')
```

When we've done that, we can see the local `place` variable, which is filled with the restaurant info.

![Place Info](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750466/transcript-images/react-native-pass-data-between-screens-when-navigating-with-stacknavigator-place-info.jpg)

[01:13] Let's take that info and show it on the screen. First by importing what we need, then by building up the component, and finally, by adding the styles that we need.

```javascript
import React, { Component } from 'react'

import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'

import Stars from 'components/Stars'

export default class RestaurantInfo extends Component {

  static navigationOptions = {
    title: 'Restaurant Info'
  }

  render() {

    const place = this.props.navigation.getParam('place')

    return (
      <ScrollView style={styles.root}>

        <View style={styles.infoHeader}>

          <Image
            source={{
              uri: `http://localhost:3000/images/${place.image}`
            }}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.info}>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.address}>{place.address}</Text>
            <Stars rating={place.rating} />
          </View>

        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoHeader: {
    flexDirection: 'row'
  },
  info: {
    marginTop: 20
  },
  name: {
    fontSize: 24
  },
  address: {
    color: 'grey',
    marginBottom: 5
  },
  image: {
    width: 100,
    height: 100,
    margin: 20
  }
})

```

Now when we reload, each info button passes the restaurant data onto the info page and displays the proper info.

![Final Info](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750453/transcript-images/react-native-pass-data-between-screens-when-navigating-with-stacknavigator-final-info.jpg)