Instructor: [00:00] Install React Navigation with `npm install --save react-navigation`, which we'll use to add navigation to the app.

In `App.js`, `import { createStackNavigator } from 'react-navigation'` and use it to make and export a new stack navigator.

#### App.js
```javascript
import { createStackNavigator } from 'react-navigation'
export default createStackNavigator({

})
```

[00:25] We want the first screen in the stack to be the lists screen, which is currently being exported as `default`. Let's move that to a new file called `RestaurantList.js`. We'll put it in components. Be sure to move the appropriate import statements as well. We can significantly clean up `App.js`.

[00:56] Then we can import the new list file and use it to define the first screen in the stack navigator, which we'll call `Home`.

```javascript
import React, {Component} from 'react';

import { createStackNavigator } from 'react-navigation'

import RestaurantList from 'components/RestaurantList'

export default createStackNavigator({
  Home: { screen: RestaurantList }
})
```
When we reload now, we still see the list, but we have the addition of a navigation header bar, which is how we know this is properly in a stack navigator.

![Navigation Bar](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750453/transcript-images/react-native-show-a-new-screen-with-react-navigation-and-stacknavigator-nav-bar.jpg)

[01:22] Let's start the `debugger` in the `render`() method to look at what props React Navigation gives us. Because the `RestaurantList` is in the stack navigator, we get the `navigation` prop. Inside of there, we have a `navigate` function, which we can use to navigate to another screen in the stack navigator.

![Debug](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-show-a-new-screen-with-react-navigation-and-stacknavigator-debug.jpg)

[01:40] Remove the `debugger` from the list and make a new screen called `RestaurantInfo.js`, which we'll leave as a simple React Native View and a Text label for now.

#### RestaurantInfo.js
```javascript
import React, { Component } from 'react'

import {
  View,
  Text
} from 'react-native'

export default class RestaurantInfo extends Component {
  render() {
    return (
      <View>
        <Text>Info</Text>
      </View>
    )
  }
}
```
Then, in `App.js`, we can import that new info screen and put it in our stack navigator. Note that the component is called `RestaurantInfo`, but we're just naming the screen `Info`, which is the name that we'll use when navigating.

#### App.js
```javascript
import React, {Component} from 'react';

import { createStackNavigator } from 'react-navigation'

import RestaurantList from 'components/RestaurantList'

import RestaurantInfo from 'components/RestaurantInfo'

export default createStackNavigator({
  Home: { screen: RestaurantList },
  Info: { screen: RestaurantInfo }
})
```

[02:08] If we reload now, the `Info` screen is on the stack, but we need to expressly navigate to see it. Let's make these info buttons navigate to that screen instead of popping up in place.

[02:20] In `RestaurantList.js`, we have to pass the `navigation` prop to each `RestaurantRow` because that's where the `onPress` for those info buttons are.

#### RestaurantList.js
```javascript
renderItem={({ item, index }) =>
  <RestaurantRow
    place={item}
    index={index}
    navigation={this.props.navigation}
  />
}
```
In `RestaurantRow.js`, we can change the `infoPressed` function to call `this.props.navigation.navigate` and pass in `Info`, which is the name of the key for the screen in our stack navigator that we want to show.

#### ResturantRow.js

```javascript
infoPressed = () => {
    this.props.navigation.navigate('Info')
}
```

[02:44] When we reload, the info buttons now push a new screen onto the stack navigator, and we can navigate back and forth.

![Final](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-show-a-new-screen-with-react-navigation-and-stacknavigator-final.jpg)
