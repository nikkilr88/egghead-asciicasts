Instructor: [00:00] We have a couple of restaurants being displayed. Let's extract that data to a variable where we'll have an array of `restaurants` that each have a name and an address. 

#### App.js
```javascript
const restaurants = [
  {name: 'React Cafe', address: '123 Anywhere St'},
  {name: 'Fancy Restaurant', address: '799 Main St'},
  {name: 'Taco Place', address: '550 Maple Rd'}
]
```

We can `map` over those `restaurants` and display an entry for each. This is the same process as React on the Web, just with `View`s instead of `DIV`s and `Text` components instead of paragraph tags. 

```javascript
{
    restaurants.map((place, index) => {
        return (
            <View key={place.name}>
              <Text>{place.name}</Text>
              <Text style={{color: 'grey'}}>{place.address}</Text>
            </View>
        )
    })
}
```

[00:33] Let's also display a number next to each restaurant in the list to make a numbered list. Add an info label, which later can become a button to bring up more info. 

```javascript
{
    restaurants.map((place, index) => {
        return (
            <View key={place.name}>
              <Text>{index + 1}</Text>
              <Text>{place.name}</Text>
              <Text style={{color: 'grey'}}>{place.address}</Text>
              <Text>Info</Text>
            </View>
        )
    })
}
```

Now when we reload the app, we can see all the restaurants there, but the formatting isn't great. 

![Initial Format](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750454/transcript-images/lessonsreact-native-layout-react-native-components-with-flexbox-initial-format.jpg)

[00:48] Let's put the numbers on the left of each row, the info button on the right, and the restaurant name and address stacked in the middle. To do that, we'll lay out the Text components with Flexbox. If we put a bright `backgroundColor` on the topmost view, we can see it doesn't actually take up the entire screen.

![Top View](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750458/transcript-images/lessonsreact-native-layout-react-native-components-with-flexbox-top-view.jpg)

[01:08] Let's first tell it to fill the entire space. We can do that by flexing that view and setting a `flex` style of `1`. 

```javascript
export default class App extends Component {
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <Text style={{
          padding: 40,
          fontSize: 30,
          textAlign: 'center',
          color: '#0066CC',
          fontWeight: '300'
        }}>Restaurant Review</Text>
```
Now the parent view is taking up the entire screen. This is different than on the Web where you have to set `display` to `flex`. Instead, we just set the `flex` `style`. 

[01:26] On the Web, the default flex direction is a `row`. In React Native, the default flex direction is `column`, which is why the `Text` components are stacked vertically. Because of that, we don't actually want to flex each row because then the rows would grow to fill the available space in the vertical direction. 

![Stacked Vertically](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750452/transcript-images/lessonsreact-native-layout-react-native-components-with-flexbox-stacked-vertically.jpg)

[01:44] Instead, we want to tell each row to align its text views in a `row`. We do that by setting the `flexDirection` style. 

```javascript
{
    restaurants.map((place, index) => {
        return (
            <View key={place.name} style={{
                flexDirection: 'row'
            }}>
              <Text>{index + 1}</Text>
              <Text>{place.name}</Text>
              <Text style={{color: 'grey'}}>{place.address}</Text>
              <Text>Info</Text>
            </View>
        )
    })
}
```
Now the rows are stacked vertically because our outer parent container still has the default of `column`, but each row is individually set to the `row` `flexDirection` so all its content is aligned horizontally. 

![Vertically Stacked Correct](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750455/transcript-images/lessonsreact-native-layout-react-native-components-with-flexbox-stacked-vertically-correct.jpg)

[02:06] We can continue like this until everything is aligned just the way we want it. If we want the address stacked under the name, first, we need to wrap those two components in a `View`. Then we can tell that `View` to be flexed as a `column`. 

```javascript
{
    restaurants.map((place, index) => {
        return (
            <View key={place.name} style={{
                flexDirection: 'row'
            }}>
              <Text>{index + 1}</Text>
              <View style={{
                  flexDirection: 'column'
              }}>
                <Text>{place.name}</Text>
                <Text style={{color: 'grey'}}>{place.address}</Text>
              </View>

              <Text>Info</Text>
            </View>
        )
    })
}
```

Now when we reload that, we have all the rows stacked in a column, each row individually flexed as a row, and the inner name and address flexed as a column. 

![Rows Stacked in column](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/lessonsreact-native-layout-react-native-components-with-flexbox-rows-stacked.jpg)

[02:34] We want the restaurant name and address to take up most of the space in the row. We can tell the `View` that wraps the name and address to `flex: 1`. Since the number and info button aren't flexed at all, the name and address will take up all the space it can and move the other `Text` components to the left and the right edges. 

```javascript
    <View style={{
       flexDirection: 'column',
       flex: 1
    }}>
       <Text>{place.name}</Text>
       <Text style={{color: 'grey'}}>{place.address}</Text>
    </View>
```
![Flex Name](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750454/transcript-images/lessonsreact-native-layout-react-native-components-with-flexbox-flex-name.jpg)

[02:52] If we don't like that the left and right views get that small, we can start by flexing those as well. 

```javascript
        {
          restaurants.map((place, index) => {
            return (
              <View key={place.name} style={{
                flexDirection: 'row'
              }}>
                <Text style={{flex: 1}}>{index + 1}</Text>
               
                <View style={{
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <Text>{place.name}</Text>
                  <Text style={{color: 'grey'}}>{place.address}</Text>
                </View>

                <Text style={{flex: 1}}>Info</Text>
              </View>
            )
          })
        }
```

Now the name, number, and infoboxes all try to take up an equal amount of space or one-third of the row each. 

![3rd](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750458/transcript-images/lessonsreact-native-layout-react-native-components-with-flexbox-3rd.jpg)

We can adjust that, however, because the flex style attribute can take any number.

[03:09] If we increase the `flex` number of the name and address view to `8`, then that view will try to take up 8 times more space than the number and info text components. 

```javascript
        {
          restaurants.map((place, index) => {
            return (
              <View key={place.name} style={{
                flexDirection: 'row'
              }}>
                <Text style={{flex: 1}}>{index + 1}</Text>
               
                <View style={{
                  flexDirection: 'column',
                  flex: 8
                }}>
                  <Text>{place.name}</Text>
                  <Text style={{color: 'grey'}}>{place.address}</Text>
                </View>

                <Text style={{flex: 1}}>Info</Text>
              </View>
            )
          })
        }
```

Now the width of each cell looks better, but the number and info labels are in the upper left corners of the cell they are in. 

![Upper Left](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750457/transcript-images/lessonsreact-native-layout-react-native-components-with-flexbox-upper-left.jpg)

[03:24] Just like on the Web, we can adjust that with `alignItems` and `justifyContent`. If we set these both to `center`, you'll see that it doesn't work for `Text` components. In this case, that's because we need to wrap the `Text` components in a `View` and apply the styles to the `View` instead. The `View` component can apply all the Flexbox styles appropriately and centers the `Text` components in those views.

```javascript
        {
          restaurants.map((place, index) => {
            return (
              <View key={place.name} style={{
                flexDirection: 'row'
              }}>
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={{
                  flexDirection: 'column',
                  flex: 8
                }}>
                  <Text>{place.name}</Text>
                  <Text style={{color: 'grey'}}>{place.address}</Text>
                </View>

                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text>Info</Text>
                </View>
              </View>
            )
          })
        }
```

![Final](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/lessonsreact-native-layout-react-native-components-with-flexbox-final.jpg)