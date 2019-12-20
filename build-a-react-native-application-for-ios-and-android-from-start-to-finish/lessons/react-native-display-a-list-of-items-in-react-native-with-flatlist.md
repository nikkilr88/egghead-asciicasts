Instructor: [00:00] We have a scrolling list of restaurant, but we're using a `ScrollView` to show them. Instead, let's import `FlatList` from `react-native`. `ScrollView` loads the entire view into memory when it mounts.

#### App.js
```javascript

import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native'
```

[00:12] Let's find for small number of items like we have here, but will cause memory and performance problems, if we're showing hundreds or thousands of items at a time. `FlatList`, however, is designed to be performant even with thousands of items, because it recycles the views which lowers the memory footprint.

[00:29] Unlike `ScrollView`, `FlatList` takes a `data` prop for each item. Pass the filtered restaurant list into the `FlatList` as a prop name `data`. The render prop for each item is called `renderItem`.

```javascript
        <FlatList
          data = {
            restaurants.filter(place => {
              return !this.state.search ||
                place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
            })
          }
          renderItem={}
        />
```

[00:43] In the `ScrollView`, we have each item rendered directly inline here. Let's clean that up a bit and first extract it into a new component file called `RestaurantRow.js`. There, we can import React's `View`, `Text`, and `StyleSheet` from `react-native` and make our `default` component.

#### RestaurantRow.js
```javascript
import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class RestaurantRow extends Component {

}
```

[01:03] Then, we can copy the row component and the styles as well. In this restaurant row, we use the `place` and the `index`, so we'll need to pass those in this `props`. 


```javascript
export default class RestaurantRow extends Component {

  render() {

    const {
      place,
      index
    } = this.props

    return (
      <View key={place.name} style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }
      ]}>
        <View style={styles.edges}>
          <Text>{index + 1}</Text>
        </View>

        <View style={styles.nameAddress}>
          <Text>{place.name}</Text>
          <Text style={styles.addressText}>{place.address}</Text>
        </View>

        <View style={styles.edges}>
          <Text>Info</Text>
        </View>
      </View>
    )
  }

}
```

Back in `App.js`, we can import the `RestaurantRow` and use it in the `renderItem` render prop.

#### App.js
```javascript
import RestaurantRow from 'components/RestaurantRow'
```

[01:30] `renderItem` takes a function and that function will get both the `item` and the index of the row that is being rendered. You can make a new function with `item` and `index`, and return a new `RestaurantRow`, passing in the list `item` as the `place` prop and the `index` as the `index` prop.

```javascript
<FlatList
  data = {
    restaurants.filter(place => {
      return !this.state.search ||
      place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
    })
  }
  renderItem={({ item, index }) => 
    <RestaurantRow place={item} index={index} />
  }
/>
```
[01:48] As a last prop to `FlatList`, we have to provide a unique key for every row in the list. To set a prop called `keyExtractor` which is a function that will be passed in each item from the data.

[02:00] We need to return something unique for every row here. In our example, that will be the item's `name`. Now in practice, this is often a unique ID of some kind. 

```javascript
<FlatList
  data = {
    restaurants.filter(place => {
      return !this.state.search ||
      place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
    })
  }
  renderItem={({ item, index }) => 
    <RestaurantRow place={item} index={index} />
  }
  keyExtractor={item => item.name}
/>
```

Finally, we need to clean up this unused scroll view. Then, we can reload and see our `FlatList`.

[02:16] With this list, you can actually see how progressively loads the items. If I reload this simulator and pass the screen right as it loads, you can see it only loads the first 10 items and loads the rest later.

![First 10](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-display-a-list-of-items-in-react-native-with-flatlist-first10.jpg)

[02:30] This is part of the memory and performance saving techniques that are built in the `FlatList`. If we don't want that flicker of just the first 10 items loading now, we can specify a higher number.

[02:40] Let's pass an `initialNumToRender` prop to `FlatList`, and when we reload, there's no flicker.

```javascript
<FlatList
  data = {
    restaurants.filter(place => {
      return !this.state.search ||
      place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
    })
  }
  renderItem={({ item, index }) => 
    <RestaurantRow place={item} index={index} />
  }
  keyExtractor={item => item.name}
  initialNumToRender={16}
/>
```
