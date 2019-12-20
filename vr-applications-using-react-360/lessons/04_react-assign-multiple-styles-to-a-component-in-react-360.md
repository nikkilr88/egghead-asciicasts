Instructor: [0:00] We have a viewer with the list of the countries that we would like to visit. As well over here in the side sheets, we have a couple of objects per country. Inside of those objects, we have a background color with the color taken from the flag of each country. What we would like to do is to apply this color to each of the countries in addition to this many item style.

[0:18] First, destructure all the styles from the styles object. We're going to destructure `mainView`, `menuItem`, `poland`, `ukraine`, `uk`, `spain`, and `italy`, as well as `greece`. We're going to destructure those from the `styles` object. Let me save that. Now we're going to remove all of those styles, save, refresh. Obviously, it works. There we go. It said OK. Let me format that.

#### index.js

```js
const { mainView, menuItem, poland, ukraine, uk, spain, italy, greece } = styles
return (
  <View style={styles.mainView}>
    <Text style={menuItem}>Poland</Text>
    <Text style={menuItem}>Ukraine</Text>
    <Text style={menuItem}>Great Britain</Text>
    <Text style={menuItem}>Spain</Text>
    <Text style={menuItem}>Italy</Text>
    <Text style={menuItem}>Greece</Text>
  </View>
)
```

![List are in the center](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/assign-multiple-styles-to-a-component-in-react-360-list-center.png)

[0:39] Now, in order to provide multiple styles for those text components, what we need to do is to provide an array of styles to the style property. I'm going to wrap all of those inside of an array. We're going to do `poland`, `ukraine`, `uk`, `spain`, `italy`, and `greece`. Then save and refresh that.

```js
return (
  <View style={styles.mainView}>
    <Text style={[menuItem, poland]}>Poland</Text>
    <Text style={[menuItem, ukraine]}>Ukraine</Text>
    <Text style={[menuItem, uk]}>Great Britain</Text>
    <Text style={[menuItem, spain]}>Spain</Text>
    <Text style={[menuItem, italy]}>Italy</Text>
    <Text style={[menuItem, greece]}>Greece</Text>
  </View>
)
```

![Color added to our list](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/assign-multiple-styles-to-a-component-in-react-360-colors.png)

[0:56] Right now, we have the desired effect. Each text element has a background color of the flag of its country. Suppose I would like to have a `redText` style. I'm going to create a `redText` object, set the color to `red`.

```js
menuItem: {
  fontSize: 40,
  width: '50%',
  marginTop: 5,
  backgroundColor: '#0298D0',
  color: 'white',
  textAlign: 'center'
},
poland: {
  backgroundColor: '#DC143C'
},
ukraine: {
  backgroundColor: '#FFD500'
},
uk: {
  backgroundColor: '#00247D'
},
spain: {
  backgroundColor: '#C60D1F'
},
italy: {
  backgroundColor: '#029246'
},
greece: {
  backgroundColor: '#0D5EAF'
},
redText: {
  color: 'red'
}
```

[1:08] We would like to apply this color to Italy. I can just add a `redText` over here and destructure it from styles as well.

```js
const {
  mainView,
  menuItem,
  poland,
  ukraine,
  uk,
  spain,
  italy,
  greece,
  redText
} = styles
return (
  <View style={styles.mainView}>
    <Text style={[menuItem, poland]}>Poland</Text>
    <Text style={[menuItem, ukraine]}>Ukraine</Text>
    <Text style={[menuItem, uk]}>Great Britain</Text>
    <Text style={[menuItem, spain]}>Spain</Text>
    <Text style={[menuItem, italy, redText]}>Italy</Text>
    <Text style={[menuItem, greece]}>Greece</Text>
  </View>
)
```

After I save and refresh that, Italy is going to get additional style. It's going to have a green background and a red text inside of it.

![Italy turned red](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/assign-multiple-styles-to-a-component-in-react-360-italy-red.png)
