Instructor: [0:00] We have two text components which are displayed over here. They have a width specified to 30 percent. Even though they could fit in a single line, they have displayed one under another.

[0:10] The reason that it happens is that, by default, React 360 uses Flexbox and the default flex direction is set to column. If I were to change the `flexDirection` of this major component to row, and after I save and refresh that, we're going to see those two text components in a single line.

#### index.js

```js
const styles = StyleSheet.create({
  mainView: {
    height: 600,
    width: 600,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row"
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

![Flex direction added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/use-flexbox-to-create-layouts-in-react-360-flex-direction.png)

[0:26] Next, we're going to build a list of countries that we would like to visit. I'm going to copy and paste some text components. We're going to change the greeting to `menuItem`, as well as we're going to remove the `flexDirection` set to `row`. After I save and refresh that, we're going to see all those countries displayed over here.

```js
<View style={styles.mainView}>
  <Text style={styles.menuItem}>Poland</Text>
  <Text style={styles.menuItem}>Ukraine</Text>
  <Text style={styles.menuItem}>Great Britain</Text>
  <Text style={styles.menuItem}>Spain</Text>
  <Text style={styles.menuItem}>Italy</Text>
  <Text style={styles.menuItem}>Greece</Text>
</View>
```

![List of countries](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/use-flexbox-to-create-layouts-in-react-360-list-of-countries.png)

[0:42] Next, let's remove this hard coded hide. We're going to center all those countries in the middle of this component. We're going to use Flexbox. I'm going to set the `alignItems` to `center`, as well as `justifyContent` to `center`, as well.

```js
const styles = StyleSheet.create({
  mainView: {
    height: 600,
    width: 600,
    padding: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
    },
```

[0:57] After I save and refresh that, we're going to see the result over here. We have the list of all the countries centered both horizontally and vertically inside of this view component.

![Countries centered in view component](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/use-flexbox-to-create-layouts-in-react-360-countries-centered.png)
