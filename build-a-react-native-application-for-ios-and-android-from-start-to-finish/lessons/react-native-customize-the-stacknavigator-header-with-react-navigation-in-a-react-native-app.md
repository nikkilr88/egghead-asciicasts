Instructor: [00:00] In `RestaurantList.js`, we can remove the header by specifying a `static navigationOptions` on the React component class itself.

We don't want any automatic header at all here. We can specify `header` `null`. When we reload, we can see the default stack navigation header is gone.

#### RestaurantList.js
```javascript
  static navigationOptions = {
    header: null
  }
```

![Header Gone](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750465/transcript-images/react-native-customize-the-stacknavigator-header-with-react-navigation-in-a-react-native-app-header-gone.jpg)

[00:21] The background color of the stack navigator is still showing through, however. We'll add a white `backgroundColor` to our root view.

```javascript
render() {

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFFFFF'
    }}>
```
When we click through to the info screen, we can see that header is still there because we only disabled it for the root list view.

![Header still there](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750451/transcript-images/react-native-customize-the-stacknavigator-header-with-react-navigation-in-a-react-native-app-header-still-there.jpg)

[00:38] We can customize this header by opening `RestaurantInfo.js` and defining a `static navigationOptions`. This time, we want to keep the `header` but set the `title` to `'Restaurant Info'` When we reload now, the info page header has that title.

#### ResturantInfo.js
```javascript
static navigationOptions = {
    title: 'Restaurant Info'
}
```

![Info Title](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750450/transcript-images/react-native-customize-the-stacknavigator-header-with-react-navigation-in-a-react-native-app-info-title.jpg)

[00:58] We can customize more of this header bar, like setting the style of the header itself, setting the tint color for the default back button, and setting the style for the title. When we reload, we can see those changes as well.

![Styled Header](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-customize-the-stacknavigator-header-with-react-navigation-in-a-react-native-app-styled.jpg)

[01:20] We could also take these style options. Back in `App.js`, where we define the stack navigator, we can specify additional options as an object as the second parameter to the `createStackNavigator` call.

[01:36] Here, we can specify `navigationOptions` and paste in the options that we had previously just defined on the info page. Now, these options will be the default for the header on any screen in that stack navigator. We don't have to worry about repeating those options for every screen.

#### App.js
```javascript
export default createStackNavigator({
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
```
