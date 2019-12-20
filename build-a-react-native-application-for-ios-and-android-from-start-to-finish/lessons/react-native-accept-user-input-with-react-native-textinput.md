Instructor: [00:00] `import TextInput from react-native`, which is a text box that we can use to accept the user search query. Just below the header and above the list, put in a `TextInput` tag.

#### App.js

```javascript
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <Text style={HeaderStyle.header}>Restaurant Review</Text>

        <TextInput />

```
[00:12] When we reload, we can see a bit of extra space there, but we can't actually see the input box. If you select just the right location, you can see a cursor blink, which shows that the TextInput box is actually there.

![Blank Space](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/react-native-accept-user-input-with-react-native-textinput-blank-space.jpg)

[00:26] Let's add some styles to it to make it much more clear. We can call the `styles` `input` and put them in the app's `StyleSheet`. We'll add some separation with the `marginBottom`, create some `padding`, and put some larger text padding on the left and right side with `paddingHorizontal`.

```javascript
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  edges: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  nameAddress: {
    flexDirection: 'column',
    flex: 8
  },
  addressText: {
    color: 'grey'
  },
  input: {
    marginBottom: 30,
    padding: 10,
    paddingHorizontal: 20
  }
})
```

[00:46] The text inside a `TextInput` component can also be styled like a normal `Text` component. We can set the `fontSize` and the `color` of the text on the `TextInput` directly. Then we can add a border and background like any other React native view.

```javascript
input: {
    marginBottom: 30,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#F5F5F5'
}
```

[01:02] Note that styling borders in React native is a bit different than on the web. We have to specify a border width and a border color separately. Now if we reload that, it looks quite a bit better, though it's a still bit unclear that it's a search box.

![With Styles](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750455/transcript-images/react-native-accept-user-input-with-react-native-textinput-with-styles.jpg)

[01:18] We can add some placeholder text with a prop called `placeholder`, which makes it more clear that it's a search box. 

```javascript
<TextInput 
  style={styles.input} 
  placeholder="Live Search"
/>
```

Now that we have a `TextInput` styled, let's do some live filtering as the user types into the `TextInput`.

[01:35] `TextInput` components accept a prop called `onChangeText`. Let's set that. This is different than on the web where inputs accept an `onChange` prop. The nice thing about `onChangeText` is that it passes the current `text` directly instead of as an event.

```javascript
<TextInput 
  style={styles.input} 
  placeholder="Live Search"
  onChangeText={text => {
            this.setState({ search: text })
  }}
/>
```

[01:52] We'll use the return `text` to set a bit of state called `search`. We should make sure `search` exists when the component loads. Also, we'll make the `TextInput` a controlled component by setting the `value` to the current value of `search`.

```javascript
state = {
  search: null
}

<TextInput 
  style={styles.input} 
  placeholder="Live Search"
  onChangeText={text => {
            this.setState({ search: text })
  }}
  value={this.state.search}
/>
```

[02:08] Now we can use that search to actually `filter` the `restaurants` in the web view by adding a `filter` statement to the `map`, which will only show restaurants if the `search` is blank, or if the lowercase of the `restaurant` contain the lowercase of the `search` query.

```javascript
restaurants.filter(place => {
  return !this.state.search ||
  place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
}).map((place, index) => {
```

[02:25] When we reload, we can now type into the search box and properly filter the list in real time.

![Filter](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-accept-user-input-with-react-native-textinput-filter.jpg)