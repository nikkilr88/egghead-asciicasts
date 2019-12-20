Instructor: [00:00] Let's clean up this App component even further by removing everything unnecessary and starting from scratch. Now we're left with just the basic React component.

#### App.js
```javascript
import React, {Component} from 'react';

export default class App extends Component {
  render() {
    return (
    );
  }
}
```

[00:10] Unlike on the web, where you can use divs and paragraph tags without importing them, in React Native everything that gets displayed is a component. We have to `import` those components. Instead of a div, we'll `import` and use the `View` component from React Native. Instead of a paragraph tag, we'll import and use the `Text` component.

```javascript
import React, {Component} from 'react';

import {
  View,
  Text
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View>
        <Text>Restaurant Review</Text>
      </View>
    );
  }
}
```
[00:33] When we reload now, we can see the text in the upper-left corner of the screen. 

![Text Top Left](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750445/transcript-images/react-native-display-and-format-text-in-a-react-native-application-top-left.jpg)

It's covered by the status bar however, so let's style the text a bit. We can use inline styles, just like with React on the web. Let's add some padding and change the font size and the text alignment. 

```javascript
export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={{
          padding: 40,
          fontSize: 30,
          textAlign: 'center'
        }}>Restaurant Review</Text>
      </View>
    );
  }
}
```
Now we have our first formatted text label on the screen.

![First Text Align](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750457/transcript-images/react-native-display-and-format-text-in-a-react-native-application-first-text-align.jpg)

[00:59] The styling that we can do to `Text` in React Native is similar to what you're used to with React on the web. You can change the `color` and the `fontWeight` of a `Text` component. Though, note that if you provide font weight as a number, it must be given as a string.

```javascript
export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={{
          padding: 40,
          fontSize: 30,
          textAlign: 'center',
          color: '#0066CC',
          fontWeight: '300'
        }}>Restaurant Review</Text>
      </View>
    );
  }
}
```
[01:17] We can continue by adding another `Text` block. We're creating a restaurant review app, so let's add the name of a restaurant we'd like to review. 

```javascript
export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={{
          padding: 40,
          fontSize: 30,
          textAlign: 'center',
          color: '#0066CC',
          fontWeight: '300'
        }}>Restaurant Review</Text>

        <Text>React Cafe</Text>

      </View>
    );
  }
}
```
When we reload, you can see the text block appear under the first one as if it were another paragraph tag on the web.

![Title](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750448/transcript-images/react-native-display-and-format-text-in-a-react-native-application-title.jpg)

[01:33] We can also nest more text inside of a `Text` component. If we wanted to display the address for the React Café, we could put it as a child of the `Text` component. Then we could style that differently than the parent text.

```javascript
export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={{
          padding: 40,
          fontSize: 30,
          textAlign: 'center',
          color: '#0066CC',
          fontWeight: '300'
        }}>Restaurant Review</Text>

        <Text>
          React Cafe
          <Text style={{ color: 'grey'}}>123 Anywhere St</Text>
        </Text>

      </View>
    );
  }
}
```
[01:46] However, if we nest `Text` inside of `Text`, it acts like inline text. That's useful in some circumstances, but for now we'd like the address beneath the name. We'll pull out the nested `Text` component.

```javascript
export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={{
          padding: 40,
          fontSize: 30,
          textAlign: 'center',
          color: '#0066CC',
          fontWeight: '300'
        }}>Restaurant Review</Text>

        <Text>React Cafe</Text>

        <Text style={{ color: 'grey'}}>123 Anywhere St</Text>

      </View>
    );
  }
}
```

[02:01] Also note that the only built-in component that can be nested inside of `Text` is another `Text` component. If we try to nest a `View` here, we'll get a message that tells us that we can't nest Views inside of Text components.

![Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750467/transcript-images/react-native-display-and-format-text-in-a-react-native-application-error.jpg)

[02:17] Finally, whenever you want to display text in a React Native app, remember that it must be wrapped in a `Text` tag. It cannot just be put inside of `View` or other component. If we wanted to add a second restaurant name here and reload, we'd get an error because the text is not wrapped in a `Text` component. 

```javascript
export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={{
          padding: 40,
          fontSize: 30,
          textAlign: 'center',
          color: '#0066CC',
          fontWeight: '300'
        }}>Restaurant Review</Text>

        <Text>React Cafe</Text>

        <Text style={{ color: 'grey'}}>123 Anywhere St</Text>

        Fancy Restaurant

      </View>
    );
  }
}
```
![2nd Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750466/transcript-images/react-native-display-and-format-text-in-a-react-native-application-2nd-error.jpg)

Instead, let's duplicate what we did for the first restaurant and display our second entry.

```javascript
export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={{
          padding: 40,
          fontSize: 30,
          textAlign: 'center',
          color: '#0066CC',
          fontWeight: '300'
        }}>Restaurant Review</Text>

        <Text>React Cafe</Text>
        <Text style={{ color: 'grey'}}>
          123 Anywhere St
        </Text>

        <Text>Fancy Restaurant</Text>
        <Text style={{ color: 'grey'}}>
          799 Main St
        </Text>

      </View>
    );
  }
}
```

![2nd Entry](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750458/transcript-images/react-native-display-and-format-text-in-a-react-native-application-2nd-entry.jpg)