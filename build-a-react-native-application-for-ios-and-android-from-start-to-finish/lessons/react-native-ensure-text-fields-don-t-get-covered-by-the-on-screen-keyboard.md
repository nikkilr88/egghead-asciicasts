Instructor: [00:00] On the `AddReview` modal screen, we'll add a review form by importing `TextInput`.

#### AddReview.js
```javascript
import React, { Component } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native'
```

Add some internal `state` to hold the review information.

```javascript
state = {
  name: '',
  rating: 0,
  comment: ''
}
```
Then add an input for the reviewer's name,

```javascript
<TextInput
  style={styles.input}
  placeholder="Name (optional)"
  value={this.state.name}
  onChangeText={name => this.setState({ name })}
/>
```

A large area where they can select a star rating to give to the restaurant.

```javascript
<Text style={styles.rating}>Your Rating:</Text>
<View style={styles.stars}>
{
    [1, 2, 3, 4, 5].map(i => {
    return <TouchableOpacity
        onPress={() => this.setState({ rating: i })}
        style={styles.starButton}
        key={i}
    >
        <Icon
        name={"star"}
        color={this.state.rating >= i ? "#FFD64C" : "#CCCCCC"}
        size={40}
        />
    </TouchableOpacity>
    })
}
</View>
```
A multi-line input for a text review.

```javascript
<TextInput
    style={[styles.input, { height: 100 }]}
    placeholder="Review"
    value={this.state.review}
    onChangeText={review => this.setState({ review })}
    multiline={true}
    numberOfLines={5}
/>
```

And a button to submit the review.

```javascript
<TouchableOpacity style={styles.submitButton}>
  <Text style={styles.submitButtonText}>Submit Review</Text>
</TouchableOpacity>
```

[00:35] Finish it by adding some styles for each of those form components. When we load that, it looks like everything works just fine. However, unlike the Web and unlike the simulator, a physical device will have an on-screen keyboard that we have to worry about.

![Initial Layout](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750458/transcript-images/react-native-ensure-text-fields-don-t-get-covered-by-the-on-screen-keyboard-initial.jpg)

[00:53] Let's reload the app and turn on the on-screen keyboard. Now, when we go to leave a review, you can type our name and select a rating, but we can't get to the next text field or submit button because they're hidden behind the on-screen keyboard.

![Keyboard Covered](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750457/transcript-images/react-native-ensure-text-fields-don-t-get-covered-by-the-on-screen-keyboard-keyboard-covers.jpg)

[01:13] Let's install `react-native-keyboard-aware-scroll-view` and import that into the `AddReview` screen.

```javascript
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'
```

The `KeyboardAwareScrollView` acts just like a ScrollView. We can wrap our entire view with it.

```javascript
<KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
    <View style={styles.root}>
    .....
    </View>
</KeyboardAwareScrollView>
```

[01:36] When we reload and go to add a review now, we can enter our name. The first change is that if we tap outside the text input box now, the keyboard is dismissed. We can still enter our rating.

[01:51] Now, when we select a text box that would normally be hidden by the keyboard, the entire `ScrollView` automatically moves up and out of the way of the keyboard. You can also scroll up and down to see the entire rest of the form, including the submit button.

![Scroll Up](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-ensure-text-fields-don-t-get-covered-by-the-on-screen-keyboard-scroll-up.jpg)
