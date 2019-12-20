Instructor: [00:00] Import `TouchableOpacity` into `RestaurantInfo.js`.

#### RestaurantInfo.js

```javascript
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native
```

Add a button that can add a review for the restaurant. We'll use the same styles that we used on the restaurant row for the button.

```javascript
<TouchableOpacity
  style={styles.button}
>
  <Text style={styles.buttonText}>Add Review</Text>
</TouchableOpacity>
```

[00:18] When we reload, we have an add review button.

![Review Button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750459/transcript-images/react-native-add-a-modal-screen-that-pops-up-from-the-bottom-with-react-navigation-review-button.jpg)

We want it to pop up a screen so that we can add a review. In `App.js`, we want to make a new modal screen, but we can't make it in the restaurant stack navigator because that stack navigator is within the tab navigator.

[00:36] We want the modal to pop over everything, including the tabs. We actually have to make a new base stack navigator. We'll set our tab navigator to a `const` and make and export a new stack navigator.

#### App.js
```javascript
const Tabs = createBottomTabNavigator({
  List: { screen: List },
  About: { screen: About }
}

export default createStackNavigator({

})
```

[00:51] The first screen of that navigator will be the `Tabs`. We'll specify this as a modal stack navigator by setting the `mode` to `modal`. We'll also set the `headerMode` to `none` so that we don't get a header on the top of our tabs.

```javascript
export default createStackNavigator({
    Tabs: { screen: Tabs }
}, {
  mode: 'modal',
  headerMode: 'none'
  })
```

[01:08] Then, we can make a new component that we'll use for the modal screen, called `AddReview.js`.

#### AddReview.js

```javascript
import React, { Component } from 'react'

import {
  View,
  Text
} from 'react-native'


export default class AddReview extends Component {

  render() {
    return (
      <View>
        <Text >Add Review</Text>
      </View>
    )
  }
}
```

We can import that into `App.js` and set it as a screen in our new modal stack navigator.

#### App.js
```javascript
import AddReview from 'components/AddReview'

export default createStackNavigator({
  Tabs: { screen: Tabs },
  AddReview: { screen: AddReview }
}, {
  mode: 'modal',
  headerMode: 'none'
})
```

[01:29] Now, on the add review button in restaurant info, we can add an `onPress` action and make that function, which will navigate like normal to the new `AddReview` screen.

#### RestaurantInfo.js

```javascript

addReview = () => {
  this.props.navigation.navigate('AddReview')
}

<TouchableOpacity
  style={styles.button}
  onPress={this.addReview}
>
  <Text style={styles.buttonText}>Add Review</Text>
</TouchableOpacity>
```

The `RestaurantInfo` screen isn't in the same stack navigator as the `AddReview` screen, but React navigation will walk up the navigation stack to look for it. It can still navigate there.

[01:56] When we reload, we can go to the info and press the button to add a review.

![Initial Modal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-add-a-modal-screen-that-pops-up-from-the-bottom-with-react-navigation-initial-modal.jpg)

On iOS, we can drag down from the top to dismiss the modal, but let's also add an X button that we can use to close the modal.

[02:10] First, if we want to, we can turn off that drag-down-to-close gesture in `App.js` by adding `navigationOptions` to the modal stack navigator options and setting `gesturesEnabled` to `false`.

#### App.js
```javascript
export default createStackNavigator({
  Tabs: { screen: Tabs },
  AddReview: { screen: AddReview }
}, {
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
  }
})
```

[02:23] Then, in the `AddReview` component, we can `import Icon` and add a close button and some styling. Then we can specify an `onPress` for the close button. To actually close the modal, we can call the `goBack` function on the navigation prop.

#### AddReview.js
```javascript
import React, { Component } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class AddReview extends Component {

  close = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.root}>

        <TouchableOpacity
          style={styles.button}
          onPress={this.close}
        >
          <Icon name="close" size={30} color="#0066CC" />
        </TouchableOpacity>

        <Text style={styles.addReview}>Add Review</Text>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  button: {
    paddingHorizontal: 10
  },
  addReview: {
    fontSize: 25,
    color: '#444',
    textAlign: 'center',
    margin: 20
  }
})
```

When we reload, we can open the modal and close it with the close button.

![Close Button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-add-a-modal-screen-that-pops-up-from-the-bottom-with-react-navigation-close-button.jpg)