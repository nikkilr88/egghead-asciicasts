We're going to make this component,

![Make this a component](../images/react-use-proptypes-in-reusable-react-native-components-make-notes-component.png)

and then reuse that component in the `<Profile>` component, the `<Repositories>` component, and the `<Notes>` component we're going to build. In our `Components` folder, let's go ahead and create a new file called `Badge.js`. We're going to `require('react-native')`. We're going to disjuncture our object and get some stuff it needs.

We'll need some `Text`, `View`, the `Image`, and a `StyleSheet`, so that equal to React. I'm going to paste it in the styles.

#### Badge.js
```javascript
import React, { Component } from 'react';

import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#48BBEC',
        paddingBottom: 10
    },
    name: {
        alignSelf: 'center',
        fontSize: 21,
        marginTop: 10,
        marginBottom: 5,
        color: 'white'
    },
    handle: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'white'
    },
    image: {
        height: 125,
        width: 125,
        borderRadius: 65,
        marginTop: 10,
        alignSelf: 'center'
    }
});
```

Now what we're going to do is let's go ahead and make our `class Badge` which `extends React.Component` and type out the `render()`. As always, `module.exports = Badge;`. 

```javascript
class Badge extends React.Component{
    render(){

    }
}

module.exports = Badge;
```

This `Badge` is going to be in React. There are these things called pure components. It's components that don't have a state but they will take in their data from their parent component.

When we render `Badge`, we're going to have to make sure that we pass the appropriate data. Some things we can do later on to make sure that we do that. If we don't do that, it will throw a warning.

What we're going to do here is `return` our UI. Let's have a `<View>` with some `style` on it. Then, we're going have an `<Image>` component with some `style` on it as well. The `source` is going to be, we're going to use `uri:`. It's going to be on the `{{this.props.userInfo.avatar_url}}` object that we pass in when we use our `Badge` component.

```html
class Badge extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}} />
            </View>
        )
    }
}
```

We're also going to have some `<Text>` here. Let's have the name attribute as a property. The text is going to be `{this.props.userInfo.name}`. We're going to have some more `<Text>` whose value is going to be `{this.props.userInfo.login}`.

```html
class Badge extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{this.props.userInfo.avatar_url}} />
                <Text style={styles.name}> {this.props.userInfo.name} </Text>
                <Text style={styles.name}> {this.props.userInfo.login} </Text>
            </View>
        )
    }
}
```

Now that we have this component, you'll notice here that this component is very much reliant on this `userInfo` object. If we don't pass this `userInfo` object in, this entire component is going to break. What React gives us is this thing called `propTypes`. We can get the name of the class, add `propTypes` on to it. What this will do is this will verify that certain properties are there, certain properties of certain type. It's super useful.

When we invoke our `Badge` class or when we use our `Badge` component, if we don't pass in `userInfo` object, it's going to throw an error in the console. We're going to say our `propTypes`. We need to have some `userInfo` and it's going to be an object and it is required. 

```javascript
Badge.propTypes = {
    userInfo: React.PropTypes.object.isRequired
};
```

In order for this component to run and not throw an error, we need to have this `userInfo` object passed in when we use our `<Badge>` component.