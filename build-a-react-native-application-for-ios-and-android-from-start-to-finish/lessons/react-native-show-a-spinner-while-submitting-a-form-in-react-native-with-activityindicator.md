Instructor: [00:00] On the `AddReview` screen, set an `onPress` on the submit button and make the `submitReview` function, which will automatically submit a review to our demo server with `fetch`.

#### AddReview.js
```javascript
submitReview = () => {
  this.setState({ submitting: true })
    fetch('http://localhost:3000/review', {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          rating: this.state.rating,
          comment: this.state.comment
        })
    })
    .then(response => response.json())
}


<TouchableOpacity
  style={styles.submitButton}
  onPress={this.submitReview}
>
  <Text style={styles.submitButtonText}>Submit Review</Text>
</TouchableOpacity>
```

[00:16] After the server response, we'll just dismiss the model by calling `goBack` on `navigation`.

```javascript
submitReview = () => {
    fetch('http://localhost:3000/review', {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          rating: this.state.rating,
          comment: this.state.comment
        })
    })
    .then(response => response.json())
    .then(result => {
        this.props.navigation.goBack()
    })
}
```

This works just fine, but if we look at our demo server there is a `setTimeout` for two seconds when a review is posted to simulate a long response time on request.

#### server.js
```javascript
app.post('/review', (req, res) =>{
  setTimeout(() => {
      res.json({ success: "OK" })
  }, 2000)
})
```

[00:32] In `AddReview.js`, import `ActivityIndicator` from `react-native` which we can use to show a spinner while the user is waiting for the response to return.

#### AddReview.js
```javascript
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from 'react-native'
```

We'll add a bit of `state` to track whether or not the form is `submitting`

```javascript
state = {
  name: '',
  rating: 0,
  comment: '',
  submitting: false
}
```
and we can get the `ActivityIndicator` with that `submitting` state.

```javascript
{
this.state.submitting &&
    <ActivityIndicator
    />
}
```
[00:51] The `ActivityIndicator` can be `small` or `large` and we can specify the `color` as a prop. We could also add `style` like a normal view. We'll put some `padding` around it as well.

```javascript
{
this.state.submitting &&
    <ActivityIndicator
        size="large"
        color="#0066CC"
        style={{ padding: 10 }}
    />
}
```
Then, we just have to set the `submitting` state to `true` before we do a post.

```javascript
submitReview = () => {
  this.setState({ submitting: true })
  fetch('http://localhost:3000/review', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        rating: this.state.rating,
        comment: this.state.comment
      })
  })
  .then(response => response.json())
  .then(result => {
      this.props.navigation.goBack()
  })
}
```

[01:11] We're dismissing the entire modal after the fetch is over here. We would have to set submitting to false, but we it could do here if we wanted to. If we had a `catch` on this fetch and that's the place to turn off the `submitting` flag as well.

```javascript
  submitReview = () => {
    this.setState({ submitting: true })

    fetch('http://localhost:3000/review', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        rating: this.state.rating,
        comment: this.state.comment
      })
    })
    .then(response => response.json())
    .then(result => {
      this.setState({ submitting: false }, () => {
        this.props.navigation.goBack()
      })
    })
    .catch(error => {
      this.setState({ submitting: false })
    })
  }
```

[01:28] Now when we reload and go to submit our review, we get a spinner for a couple of second before the module is dismissed.

![Spinner](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-show-a-spinner-while-submitting-a-form-in-react-native-with-activityindicator-spinner.jpg)

The last piece to note is that showing an `ActivityIndicator` doesn't actually do anything to prevent multiple submissions of the same form.

[01:46] We'll also want to make sure to actually `disable` the submit button when the form is submitting. Otherwise, we could submit the form multiple times.

```javascript
<TouchableOpacity
  style={styles.submitButton}
  onPress={this.submitReview}
  disabled={this.state.submitting}
>
  <Text style={styles.submitButtonText}>Submit Review</Text>
</TouchableOpacity>
```