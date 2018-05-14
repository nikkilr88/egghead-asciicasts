Instructor: [00:00] Initially, our application is using a `Stacknavigator` to render a `home` screen as well as a `detail` screen. Each one of these screens has a very simple component wrapped inside a `<SafeAreaView>` with buttons to navigate to the `detail` screen and then to go to the `modal` screen. Now, the `modal` screen doesn't work yet.

#### index.js
```javascript
const Home = ({ navigation }) => (
  <SafeAreaView>
    <Button
      title="Go to details"
      onPress={() => navigation.navigate('Details')}
    />
    <Button
      title="Go to modal"
      onPress={() => navigation.navigate('Modal')}
    />
  </SafeAreaView>
);
```
[00:17] The first thing we want to do to set that up is actually create a new screen, which will represent our `modal` screen. Just like our other screens, it's wrapped in `<SafeAreaView>`. It has a button. We can enclose the `modal`, and we'll handle the `onPress` once we actually render the screen.

[00:30] Now to actually render a `modal` which will bring a screen up from the bottom rather than the right-to-left or left-to-right, which is typical of `Stacknavigator`, we're going to create a new navigator. 
```javascript
const  n = `StackNavigator`({
  MainApp: {
    screen: MainAppStack,
  },
  Modal: {
    screen: ModalScreen,
  },
  })
```

We'll call this `root navigator`. This is also going to be a `StackNavigator`. Inside of here, we'll set our `MainApp`. Our main app is going to be our `MainAppStack`, which is currently what we're rendering.

[00:53] Our next screen is going to be the `modal` screen, which is going to be the `modal` screen that we just defined. Now as you can see, we've got these two navigation headers on top of each other.

![two nav headers](../images/react-native-setup-a-StackNavigator-as-a-modal-in-react-navigation.png)

 One of these navigation headers is coming from this `root navigator` `Stacknavigator`, and the other is coming from the main app stack.

[01:09] To go ahead and remove the `root navigator` because we only want to use the MainApp `Stacknavigator`'s header, we can go ahead and pass a second argument to our `Stacknavigator` function, which is an object. We can specific the `headerMode`, which we want to set to `none`. This will go ahead and only render the top navigation bar from our `MainAppStack`.

[01:29] Now the other thing we want to do is actually specify how the navigator should open. We can do that by specifying the `mode` and setting it to `modal`. 

```javascript
const RootNavigator = StackNavigator({
MainApp: {
screen: MainAppStack,
},
Modal: {
screen: ModalScreen,
}, {
mode: 'modal',
headerMode: 'none',
});

```

Now to go to our `modal` screen, what we can do is inside of our home `go-to-modal` button, we can replace the `onPress`. We'll set it to `navigation.navigate` to `modal`. 


```javascript
const Home = ({ navigation }) => (
  <SafeAreaView>
    <Button
      title="Go to details"
      onPress={() => navigation.navigate('Details')}
    />
    <Button
      title="Go to modal"
      onPress={() => navigation.navigate('Modal')}
    />
  </SafeAreaView>
)
```
We just need to specify the actual key of our root screen that we want it to render.

[01:57] Now when we press `go-to-modal`, it'll open up the `modal` from bottom to top. We want to do the same thing for our detail screen. First, we'll want to import the navigation prop from props. Then we can say, `navigation.goBack`. Since we're going from one navigator to a different one, we'll want to pass the argument of `null` to go back.

[02:21] Now when we open the `modal`, we can go ahead and press close `modal`. Close the `modal`. We'll go to details. Again, we can go to the `modal`, and it'll override the entirety of the screen.