Instructor: [00:00] On the `AddReview` form, we can import `AsyncStorage` from `react-native`.

#### AddReview.js
```javascript
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
```

Then, when a reviewer submits a form, we can save their name so that we can auto-fill the name in for the next time.

[00:12] We'll start with `AsyncStorage.setItem`, which takes a key and a value. We can name the key whatever we'd like. Just know that it's global for the entire application. We'll set `"reviewer_name"` to `this.state.name`.

```javascript
AsyncStorage.setItem("reviewer_name", this.state.name)
```

[00:28] One important point here, the values must be strings. They cannot be objects or even numbers. The value you set cannot be `null` or undefined, or you'll get an error. We're OK here because the `name` and `state` defaults to an empty string, but you'll want protect against `null` being set in `AsyncStorage`.

```javascript
if(this.state.name !== null && this.state.name !== undefined) {
      AsyncStorage.setItem("reviewer_name", this.state.name)
}
```
[00:49] Then, once we've set a value, we can retrieve it with `AsyncStorage.getItem`. If we add a `componentDidMount` lifecycle method, we could get the reviewer name from `AsyncStorage` and set it to our local `state`.

[01:05] Although you can't set `null` values to `AsyncStorage`, if the reviewer name isn't set here, then the `name` variable will come back as `null`. Since we don't want `null` values on our form, we just won't set the `state` at all, although you may want to handle that differently in your application.

```javascript
componentDidMount() {
  AsyncStorage.getItem("reviewer_name").then(name => {
    if(name !== null && name !== undefined) {
     this.setState({ name })
    }
  })
}
```

[01:22] If we run the app now, we can submit the form with our name. The next time the app runs, when we go to submit a review, our name is being pulled from `AsyncStorage` and populates the text input.

![Name](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750455/transcript-images/react-native-save-and-retrieve-data-on-the-device-in-a-react-native-app-with-asyncstorage-name.jpg)

[01:43] We can't set `null` values to `AsyncStorage`. If we did decide at some point that we wanted to blank out the storage for a reviewer name, instead of setting the value, we could call `removeItem`, which would remove that key value pair from storage.

```javascript
AsyncStorage.removeItem("reviewer_name")
```

[01:58] Once that happens, the next time we try to load it, it would come back with a `null` value for reviewer name since the key doesn't exist in the store anymore. Because `AsyncStorage` is global to your app and because the values must be strings, it's only recommended for light use, like setting and getting simple user preferences.
