Instructor: [00:00] Install React Native vector icons, which will give us access to some great free icon sets. 

#### Terminal
```javascript
npm install --save react-native-vector-icons
```

The next step is just like normal, but then there is an additional step unique to React Native. We now have to run `react-native link`, which will link that project to the underlying native iOS and Android apps.

```javascript
react-native link
```

[00:19] If I do a `git status` now you can see both the iOS and Android projects have changed due to that link. 

![Git Status](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-add-icons-to-a-react-native-app-with-react-native-vector-icons-git-status.jpg)

Not all React Native modules need to be linked, and a project's installation page will tell you what additional steps, if any, are required.

[00:35] When you do a `link`, you will also want to rerun `react-native run-ios` or `react-native run-android`, because the underlying iOS and Android projects have changed. We want to make sure they're recompiled if necessary.

[00:49] With that running again, we can `import Icon from 'react-native-vector-icons'`. We'll be using the bundled `FontAwesome` icon set. 

#### RestaurantRow.js
```javascript
import Icon from 'react-native-vector-icons/FontAwesome'
```

We're going to use these icons to give each restaurant a star rating.

[01:03] Let's start with just a full star, which I know is called `star` by looking at Font Awesome's icon page. 

```javascript
<View style={styles.row}>
  <View style={styles.edges}>
    <Icon name="star" />
  </View>
```

![1 Star](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-add-icons-to-a-react-native-app-with-react-native-vector-icons-1-star.jpg)

That looks good, but I want to change the color. I can do that by setting a `color` prop on the `Icon` component.

```javascript
<View style={styles.row}>
  <View style={styles.edges}>
    <Icon name="star" color="#FFD64C" />
  </View>
```

[01:17] We can duplicate that and add an additional half-star. 

```html
<View style={styles.row}>
  <View style={styles.edges}>
    <Icon name="star" color="#FFD64C" />
    <Icon name="star" color="#FFD64C" />
    <Icon name="star" color="#FFD64C" />
    <Icon name="star-half" color="#FFD64C" />
  </View>
```
![Duplicate Star](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/react-native-add-icons-to-a-react-native-app-with-react-native-vector-icons-duplicate-star.jpg)

Then we can change the edge styles a bit to flex in the row direction, 

![Edge Style Change](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-add-icons-to-a-react-native-app-with-react-native-vector-icons-edge-styles.jpg)

and we have a pretty convincing star rating system for the restaurants.

![Initial Mockup](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750468/transcript-images/react-native-add-icons-to-a-react-native-app-with-react-native-vector-icons-initial-review.jpg)

[01:37] We can read from the actual rating value coming from the back end. Let's make a quick mini functional component called `Stars.js` and import React, a view, and the Font Awesome icons.

#### Stars.js
```javascript
import React from 'react'

import { View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
```

[01:53] That will take the `rating` from the server and make an array of star icons. If the `rating` is a half-value, then the last icon should be a `star-half`. 

```javascript
import React from 'react'

import { View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

const Stars = ({ rating }) => {
  const stars = [...Array(Math.ceil(rating))]

  return (
    <View style={{ flexDirection: 'row' }}>
      {
        stars.map((_, i) => {
          // show star-half on the last star, 
          // if the rating is not a whole number
          const name = Math.floor(rating) > i ? 'star' : 'star-half'
          return <Icon key={i} name={name} color="#FFD64C" />
        })
      }
    </View>
  )
}

export default Stars
```

Then we can import that `Stars` component in `RestaurantRow.js` and use that instead of the hard-coded stars.

#### RestaurantRow.js
```javascript
import Stars from 'components/Stars'

<View style={styles.row}>
  <View style={styles.stars}>
    <Stars rating={place.rating} />
  </View>
```

[02:20] Now we're seeing the star ratings that are coming from the server.

![Final Stars](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750463/transcript-images/react-native-add-icons-to-a-react-native-app-with-react-native-vector-icons-final-stars.jpg)