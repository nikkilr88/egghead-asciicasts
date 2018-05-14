Instructor: 00:00 to start with, we've got a basic application that uses a `StackNavigator` to render a `Home` screen and a `Detail` screen, which we can go ahead and navigate between. Now by default, this is using React Navigation's default animation patterns, which on iOS are meant to mimic exactly the iOS navigation.

```javascript
const MainAppStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Details',
    },
  },
},
```

00:17 If we want to go ahead and start overriding this as a second argument to our `StackNavigator` function, we can pass a configuration object to it. We can pass it a function on the key `transitionConfig`. Inside of `transitionConfig`, we can go ahead and `return` an `object`, at which point we can go ahead and use the key `transitionSpec` to pass an `object` to `override` the default transition.

```javascript
{
  transitionConfig: () => {
    return {
      transitionSpec: {
       
      },
    };
  },
});
```

00:40 For example, we can `override` the `duration` and say it will take `3,000` seconds to make this `transition`. 

```javascript
{
  transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 3000,
```

Also, after `importing` Easing and Animated from React Native, 

```javascript
import { Button, View, SafeAreaView, Animated, StyleSheet, Easing, Text } from 'react-native';
```

We can go ahead and `override` the `easing` with, for example, `Easing.out` and then passing `Easing.poly(4)`.

01:04 If I `reduce` this down to `750 milliseconds`, we can see that it's very slightly changing the animations that are happening. 

```javascript
{
  transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    };
  },
});
```

You can go ahead and specify the `Animated.timing` type, or you could use Animated.spring there to go ahead and start customizing this transition...