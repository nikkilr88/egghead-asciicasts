Instructor: [00:00] We have a list of restaurants, but unlike the Web, the screen doesn't scroll by default. The easiest way to get it to scroll is to import `ScrollView` from `react-native` and then wrap all of the content with `ScrollView` instead of just with `View`.

#### App.js
```javascript

import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native'

<ScrollView style={{
  flex: 1
}}>
```

[00:16] When we reload, the app list can scroll. Now, if we add many more `restaurants` to the list, the list scrolls. All the restaurants are visible. There are some formatting things that we might want to consider.

![List Scrolling](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750468/transcript-images/react-native-scroll-elements-on-a-react-native-screen-with-scrollview-list-scroll.jpg)

[00:33] First, the entire screen scrolls because we wrapped the entire component in a `ScrollView`. That's not required, however. We could just wrap the list part in a `ScrollView`. Now, just the list scrolls, while the header and the live search input stay at the top of the screen.

[00:53] However, if we stop scrolling while a gray row is at the top, it looks a bit odd with all this white space between the search and the row. 

![White Space](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-scroll-elements-on-a-react-native-screen-with-scrollview-white-space.jpg)

We can try to fix that by removing the margin below the text input, but keep the initial space between the live search and the list by adding padding to the top of the list view.

```javascript
<ScrollView style={{
  paddingTop: 30
}}>
```

[01:11] What happens now shows you a styling quirk of the `ScrollView`. When you scroll, the rows properly go all the way up and under the text input. However, when you get to the bottom of the list, the last line is cut off. That's because we added padding to the top of the `ScrollView` component itself.

![Last Line Cut Off](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-scroll-elements-on-a-react-native-screen-with-scrollview-last-line-cut.jpg)

[01:28] Inside the `ScrollView`, there is another wrapping container. Adding padding to the top of the `ScrollView` actually pushed the inner container down by 30 pixels and pushed the last row right off the screen.

[01:39] Instead, we want to apply the padding to the inner content container by setting the `contentContainerStyle` prop instead of just the `style` prop. 

```javascript
<ScrollView contentContainerStyle={{
  paddingTop: 30
}}>
```

Now, the list has an initial padding at the top to separate it from the live search. 

![Initial Padding](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-scroll-elements-on-a-react-native-screen-with-scrollview-initial-padding.jpg)

When it scrolls, the row flows all the way up and under live search with no gap. The bottom row is no longer cut off.

[02:02] The last thing to keep in mind is that `ScrollView`s should only be used for small, limited numbers of items because they're all loaded into memory at once when the `ScrollView` mounts. Here, we only have 20 items, which is perfectly fine for `ScrollView`. If you had hundreds or thousands of items, you would want to use a flat list instead.
