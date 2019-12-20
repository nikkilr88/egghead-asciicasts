Instructor: [00:00] Let's open `App.js` and make some tabs on the bottom of the screen. We can `import createBottomTabNavigator` from react-navigation and make some tabs by calling it.

#### App.js
```javascript
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

const Tabs = createBottomTabNavigator({

})
```

Then, we have to make a decision.

[00:17] When we press the info button or any stack navigation push, do we want the new screens to come up over the tabs, or do we want our bottom tabs to always be on the bottom of the screen? Whatever we want is the root or base navigator will be the one we want to export.

[00:33] Let's switch the tabs to be the default `export` from app.

```javascript
export default createBottomTabNavigator({

})
```
Then, we can name our stack navigator, and make that stack navigator as the first tab in the bottom tabs.

```javascript
const List = createStackNavigator({
  Home: { screen: RestaurantList },
  Info: { screen: RestaurantInfo }
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#0066CC',
      color: '#FFF'
    },
    headerTintColor: '#FFF',
    headerTitleStyle: {
      color: '#FFF'
    }
  }
})

export default createBottomTabNavigator({
  List: { screen: List }
})
```

When we run that, we get a bottom tab that's says `List`.

![List](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750459/transcript-images/react-native-add-bottom-tabs-to-a-react-native-app-with-react-navigation-list.jpg)

[00:54] When we press the info button, you can see the stack navigator push the screen, but the tab is still visible, because the tab navigator is what contains the stack navigator. Let's add a new "about" screen which will make this more clear.

![Visible Tab](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750453/transcript-images/react-native-add-bottom-tabs-to-a-react-native-app-with-react-navigation-visible-tab.jpg)

[01:09] I'll make the new `About.js` file and `export` a component with the header, an Icon, and some dummy text, and some styles, so looks OK.

#### About.js
```javascript
import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

export default class About extends Component {

  render() {
    return (
      <View style={{ flex: 1, padding: 40 }}>

        <Text style={styles.header}>
          About Restaurant Review
        </Text>

        <Icon
          name="utensils"
          color="#0066CC"
          size={100}
          style={styles.icon}
        />

        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et ligula ullamcorper, pellentesque magna quis, lobortis quam.
        </Text>
        <Text style={styles.text}>
          Mauris efficitur elementum cursus. Cras ultrices urna in ex rutrum rutrum nec sit amet lacus. Suspendisse ullamcorper lectus eget ornare venenatis. Suspendisse potenti.
        </Text>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20
  },
  icon: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    color: '#444',
    marginTop: 20
  }
})
```

Then, we can import that into `App.js` and set that as a second tab called About.

#### App.js

```javascript
import About from 'components/About'

export default createBottomTabNavigator({
  List: { screen: List },
  About: { screen: About }
})
```

We can run that to see there's two tabs now.

![2 Tabs](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-add-bottom-tabs-to-a-react-native-app-with-react-navigation-2-tabs.jpg)

[01:39] If we press the info button now, the stack navigator pushes on to the lists tab. We can still select the about tab which shows us the about screen. If we go back to the list tab, we see the list tab is still on the same info screen.

[01:55] The tab looks pretty bare here, so let's import the Font Awesome icons in `App.js`.

```javascript
import Icon from 'react-native-vector-icons/FontAwesome'
```
Just like for stack navigator, we can specify `navigationOptions` for the tab bar. We want different icons for each tab, so we'll specify a function for the `navigationOptions`, which has the `navigation` object as a param.

```javascript
export default createBottomTabNavigator({
  List: { screen: List },
  About: { screen: About }
}, {
  navigationOptions: ({ navigation }) => {
    return {
    }
  }
})
```

[02:17] We can set the `tabBarIcon` key on that object which is a function itself that will give us the `tintColor` to use for each icon. Then, we can extract the `routeName` from the `navigation` object and use that to set the proper icon for the proper tab.

```javascript
export default createBottomTabNavigator({
  List: { screen: List },
  About: { screen: About }
}, {
  navigationOptions: ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => {
        const route = navigation.state.routeName
        const name = {
          'List': 'list',
          'About': 'info-circle'
        }[route]
        return <Icon name={name} color={tintColor} size={22} />
      }
    }
  }
})
```

[02:38] If we reload now, each tab has an icon and that icon changes color based on which tab is active.

![Tab Icons](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750460/transcript-images/react-native-add-bottom-tabs-to-a-react-native-app-with-react-navigation.-tab-icons.jpg)

If we add some `tabBarOptions` to the `navigationOptions` for the tab, then we can add more distinction to the currently selected tab by specifying an `activeBackgroundColor`, which changes the background color of the selected tab.

```javascript
export default createBottomTabNavigator({
  List: { screen: List },
  About: { screen: About }
}, {
  navigationOptions: ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => {
        const route = navigation.state.routeName
        const name = {
          'List': 'list',
          'About': 'info-circle'
        }[route]
        return <Icon name={name} color={tintColor} size={22} />
      },
      tabBarOptions: {
        activeBackgroundColor: '#E6F0FA'
      }
    }
  }
})
```

![Background Color](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750456/transcript-images/react-native-add-bottom-tabs-to-a-react-native-app-with-react-navigation-background-color.jpg)