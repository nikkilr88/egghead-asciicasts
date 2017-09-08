There's nothing dividing each of these items from one another. What we're going to do is we're going to create another reasonable component that we'll use for each `View` to separate the different items in our list. Let's create another folder called `Helpers` inside of `Components`, because we're going to have a few of these.

Inside this folder, let's create a `Separator.js` file. Then we're going to `require` `React`. We're going to get `View` and `StyleSheet` equals `React`.

####Separator.js
```javascript
var React = require('react-native');

var {
    View,
    StyleSheet
} = React;
```

Then, I'm going to have just a small `styles` object. We're going to do `StyleSheet.create({})`. `separator: { height: ... }` is going to be `1`. Let's do `backgroundColor: '#E4E4E4'`, a `flex: 1`, and a `marginLeft: 15`. We get that nice iOS feel.

```javascript
var styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#E4E4E4',
        flex: 1,
        marginLeft: 15
    }
});
```

Now, we're going to create a `class` called `Separator`, which is going to `extends React.Component`. Then, all we're going to `render` is this `<View>` which has `style={styles.separator}` added to it, then, of course, `module.exports = Separator;`.

```javascript
class Separator extends React.Component{
    render(){
        return (
            <View style-{styles.separator} />
        )
    }
};
```

Now, what we could have done is we could have created this `styles` sheet over and over again for each component we use to put a `Separator` in. What I like to do is just create a component, `Separator`. What we can do is inside of our `Profile.js` page, we can require `Separator`.

####Profile.js
```javascript
var Separator = require('./Helpers/Separator');
```

Now, down in `render()` right after the second `<View>`, we can throw in this `Separator` component. What it'll do is with everything we are mapping over, for each one, every time we throw out a `title` and a value, we'll also throw in a `Separator`. Let's see if this worked.

![Separators on application](../images/react-build-a-reusable-react-native-ui-component-separators-on-app.png)

There we go. There's our `Separator`, now. What's nice about this is now we can use this. We will use this and every other component that we build.