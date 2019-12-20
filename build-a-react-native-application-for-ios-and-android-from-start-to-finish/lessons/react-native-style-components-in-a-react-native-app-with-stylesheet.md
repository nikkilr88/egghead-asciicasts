Instructor: [00:00] `import StyleSheet` from `react-native`. 

#### App.js
```javascript
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native'
```

Then we can make a new `StyleSheet` and extract these inline styles in order to clean up the components in our `render` method.

[00:10] Make a new `StyleSheet` by defining a `const` called `styles` and calling the `create` method on `StyleSheet`. 

```javascript
const styles = StyleSheet.create()
```

The `create` method takes an object. This object should have keys like `header`, which have the name styles that you're creating, and all the values are objects.

```javascript
const styles = StyleSheet.create({
    header:{

    }
})
```

[00:29] Inside of those objects, we can define our styles. The `header` style will contain all of the styles we define for the header. 

```javascript
const styles = StyleSheet.create({
    header:{
      padding: 40,
      fontSize: 30,
      textAlign: 'center',
      color: '#0066CC',
      fontWeight: '300'
    }
})
```
We can use that header style as the style for the header text by specifying `styles.header` as the `style` prop for a Text component.

```javascript
<Text style={styles.header}>Restaurant Review</Text>
```

[00:46] When we reload, we can see nothing has changed, which is good, because it means we applied the style correctly. Notice that unlike CSS on the web, styles in React native `StyleSheet`s are inside of JavaScript objects, which means that attributes like colors need to be in quotes.

![Quotes](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750455/transcript-images/react-native-style-components-in-a-react-native-app-with-stylesheet-quotes.jpg)

[01:03] If we remove the quotes and reload, we can see an error. If we bring up the package or window, we can see a syntax error, since the hex color is invalid JavaScript.

![Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750468/transcript-images/react-native-style-components-in-a-react-native-app-with-stylesheet-error.jpg)

[01:16] Writing React native StyleSheets, we'll feel very much like writing CSS for React with the other big difference being that all the style keys are camelcase. Let's continue cleaning up the styles by extracting styles for the `row`, the `edges`, the `nameAddress`, and the `addressText` itself, and reloading.

```javascript
const styles = StyleSheet.create({
  header:{
    padding: 40,
    fontSize: 30,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '300'
  },
  row: {
    flexDirection: 'row'
  },
  edges: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameAddress: {
    flexDirection: 'column',
    flex: 8
  },
  addressText: {
    color: 'grey'
  }
})
```

[01:50] Again, nothing is changed. We know that we transfer the styles correctly to the `StyleSheet`. The `style` prop can also be an array of style objects. You can also mix `StyleSheet` styles and inline styles.

[02:02] For a row, we could supply an array of styles to the `style` prop. The first element in the array would be the `row` style from `StyleSheet`. Then, we could overwrite the `backgroundColor` of the row based on its index, if we wanted to do alternating striped pattern to our list. 

```javascript
<View key={place.name} style={[ 
    styles.row,
    {backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }
    ]}>
```

Now with that background, we should properly add a bit of `padding` to separate the content from the edges of the row.

```javascript
  edges: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  }
```
![Padding](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750453/transcript-images/react-native-style-components-in-a-react-native-app-with-stylesheet-padding.jpg)

[02:27] Finally, styles can be defined in another file and even shared among components. To extract this `header` style for example, we could cut out that style and make a new file which we'll call `HeaderStyle.js`. In `HeaderStyle`, we can just `import StyleSheet from 'react-native'`, and export default a new `StyleSheet`, and paste in our `header` style.

#### HeaderStyle.js

```javascript
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  header: {
    padding: 40,
    fontSize: 30,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '300'
  },
})
```

[02:52] Back in `App.js`, we can import that new `StyleSheet` and use it to style our header. 

#### App.js

```javascript
import HeaderStyle from './HeaderStyle'

<Text style={HeaderStyle.header}>Restaurant Review</Text>
```

When we reload, the header looks the same, but it's now pulling from the new `HeaderStyle`, instead of being defined directly in `App.js`.
