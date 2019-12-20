Instructor: [00:00] Start by removing all the boilerplate. This travelVR component is going to render null, and we are not going to have any styles. Next, render a view component. Inside of this view, we're going to have a `Text` component, like this. I am going to type in `Hello Egghead` inside of this `Text` component.

#### index.js

```js
export default class travelVR extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello Egghead</Text>
      </View>
    )
  }
}
```

[00:15] After we save and refresh this, we're going to see this text, "Hello, Egghead," appearing over here.

![Hello EggHead](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/write-text-using-the-react-360-text-component-hello-egghead.png)

We would like to be able to style both view -- view is basically like a div -- and a `Text` component. To do that, we're going to have a `mainView` and a `greetings` object.

```js
const styles = StyleSheet.create({
  mainView: {},
  greetings: {}
})
```

[00:31] Inside of the mainView, we're going to have a `height` of `600`, `width` of `600`, as well as `padding` of `10`, and we're going to set the `backgroundColor` to this shade of gray. Inside of the `greetings` object, `fontSize` of `40`. We're going to set the `width` to `50` percent, `marginTop` to `5`, `backgroundColor` to this shade of blue, and the `color` of the text to `white`.

```js
const styles = StyleSheet.create({
  mainView: {
    height: 600,
    width: 600,
    padding: 10,
    backgroundColor: "#eee"
  },
  greetings: {
    fontSize: 40,
    width: "50%",
    marginTop: 5,
    backgroundColor: "#0298D0",
    color: "white"
  }
})
```

[00:59] Each React 360 component takes a style property. We're going to set the style of this view to be equal to `styles.mainView`. We're going to set the style of this text to `styles.greetings`.

```js
export default class travelVR extends React.Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Text Style={styles.greetings}>Hello Egghead</Text>
      </View>
    )
  }
}
```

After I save and refresh that, we're going to see the result over here.

![Style Greetings Hello EggHead](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/write-text-using-the-react-360-text-component-styles-greeting.png)

[01:16] We can see both the view and the `Text` component styled using the CSS that we've defined over here. We can use the same styles for multiple components. If I were to have another `Text` component over here, and I would set the text to "`Hello again!`," after I save, refresh that, we're going to have two `Text` components with exactly the same styles applied.

![Hello again style component added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/write-text-using-the-react-360-text-component-hello-again.png)
