In our `Components` folder let's make a new file called `Repositories.js`, `require('react-native');`. We're also going to require a few more things. We have to use our `Badge` we made as well, we're also going to require our `Separator` we made, which is in our `Helpers` folder. Use destructuring to let's save some variables here. We have `ScrollView`, we're going to use `Text`, `View`, `TouchableHighlight`, and `StyleSheet`.

####Repositories.js
```javascript
var React = require('react-native');
var Badge = require('./Badge');
var Separator = require('./Helper/Separator');

var {
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    StyleSheet
}
```

All of these we've used before. I'm going to drop in my styles right below this.

```javascript
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});
```

Now I'm going to create my `Repositories` class which `extends React.Component`, then of course `module.exports = repositories`. 

```javascript
Class Repositories extends React.Component{

};

module.exports = Repositories;
```

All right, so the very first thing we're going to do is specify what our UI will look like. We need to `render()` and `return` a `<ScrollView>` and `style` is going to be `styles.container` again. We're going render the `Badge` just as we did in the profiles component, and we're going to pass it `this.props.userInfo`.

```html
Class Repositories extends React.Component{
    render(){
        return(
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo} />
            </ScrollView>
        )
    }
};
```

Now what we need to do is just like we did with our `Profile`, we need to `.map` over every repository and create basically an array of `<View>` components there so we can lay them out in our `render` method. So what we're going to do is I'm going to create a variable called `repos`, which is just coming in as a property whenever we first run our repositories component and set it equal to `this.props.repos;`.

```javascript
Class Repositories extends React.Component{
    render (){
        var repos = this.props.repos;
    }
    ...
};
```

Then I'm going to make a list again, which is mapping over the `repos`, so we get the `item` itself, or the repo, and the `index`, and not every repository has a description, so we're going to make a variable here called `desc`. We're going to say if `repos` at the `index`, has a `.description` property, then go ahead and make this variable `<Text>` with a `style` of `styles.description` and whose text is `{repos[index].description}`, we close the `<Text>`. And if it's nothing, then we'll just render an empty `<View>`.

```html
Class Repositories extends React.Component{
    render (){
        var repos = this.props.repos;
        var list = repos.map((repo, index) => {
            var desc = repo.description ? <Text style={styles.description}> { repo.description } </Text> : <View />;
    }
    ...
};
```

We need to return something, so what we return is going to be the thing that our `list` array gets filled with. So what we want to fill it with, are these `<View>` components. Remember whenever you use `.map` you have to have a unique key which we will use `key={index}`. So we have our `<View>`, and then we're going to have a nested `<View>` in that `<View>` component, with a `style` equal to `styles.rowContainer`.

```html
Class Repositories extends React.Component{
    render (){
        var repos = this.props.repos;
        var list = repos.map((repo, index) => {
            var desc = repo.description ? <Text style={styles.description}> { repo.description } </Text> : <View />;
            <View key={index}>
                <View style ={styles.rowContainer}>

                </View>
            </View>
    }
    ...
};
```

Then we're going to use `TouchableHighlight`, and we're eventually going to create an `onPress` method, or function. The `underlayColor` is just going to be `'transparent'`. So that's the component in here.

```html
<View key={index}>
    <View style ={styles.rowContainer}>
    <TouchableHighlight
    onPress={}
    underlayColor='transparent'>
    </View>
</View>
```

Let's go ahead and nest a `<Text>` that as a `style` of `styles.name`, and then what we want to show is the `name` property, `{repos[index].name}`. That way when they click on the repositories name, it will go ahead and run this `<TouchableHighlight` function. I'm going to leave this `onPress` blank for now, we'll keep going on, because we'll get to that in a little bit. 

```html
<View key={index}>
    <View style ={styles.rowContainer}>
        <TouchableHighlight
            onPress={}
            underlayColor='transparent'>
            <Text style={styles.name}>{repos[index].name}</Text>
        </TouchableHighlight>
    </View>
</View>
```

What I'm also going to have after the `<TouchableHighlight>` component is a `<Text>` component with a `styles` of `{styles.stars}, which is going to be the how many favorites they have, or how many favorites this specific repository has. Say `repos[index]` and the property that GIthub uses is called `.stargazers_count`. Now close the `<Text>` component. 

```html
<View key={index}>
    <View style ={styles.rowContainer}>
        <TouchableHighlight
            onPress={}
            underlayColor='transparent'>
            <Text style={styles.name}>{repos[index].name}</Text>
        </TouchableHighlight>
        <Text style={styles.stars}> Stars: {repos[index].sargazers_count} </Text>
    </View>
</View>
```

There we go, and if there's a `description` which we made right below the `list`, we're going to render that right after this last `<Text>` component we made, and then of course we'll throw in our separator component we made.

```html
<View key={index}>
    <View style ={styles.rowContainer}>
        <TouchableHighlight
            onPress={}
            underlayColor='transparent'>
            <Text style={styles.name}>{repos[index].name}</Text>
        </TouchableHighlight>
        <Text style={styles.stars}> Stars: {repos[index].sargazers_count} </Text>
        {desc}
    </View>
    <Separator />
</View>
```

So this is looking pretty good so far. Down after `<Badge>` we can throw in `list`, and this will be every item that we've made that's in our `repos` array. So now the last thing we need to do is specify what happens when someone clicks on the repository's name. What we want to do is we're going to create a function called `openPage` and we need to pass it a few things.

```html
<TouchableHighlight
    onPress={this.openPage.bind(this, )}
    underlayColor='transparent'>
<Text style={styles.name}>{repos[index].name}</Text>
</TouchableHighlight>
```

The first thing that you pass by, remember by is just creating a new function with the `this` context inside of that function being equal to whatever the first value you pass in is. So these `this`'s inside of `onPress` are equivalent because we want the `this` keyword in `openPage` to reference the same `this` keyword as we're referencing first. So we pass in `this`, then we can pass along any properties to it. I'm going to go ahead and pass it the `repos[index].html_url`, or just the endpoint of where this specific repo is located.

```html
<TouchableHighlight
    onPress={this.openPage.bind(this, repos[index].html_url)}
    underlayColor='transparent'>
<Text style={styles.name}>{repos[index].name}</Text>
</TouchableHighlight>
```

Now, let's go ahead and make this `openPage` function. It's going to take in a `url`, and then for now let's go ahead and just `console.log` what this URL is, `('the url is ', url)`. Eventually what we're going to do is we're going to build a Web view component that allows us to whenever someone clicks on our `TouchableHighlight` button, we'll run this `openPage` function and that will take us to the Web view, but since we haven't made that now, we're just going to console.log this for right now.

```javascript
Class Repositories extends React.Component{
    openPage(url){
        console.log('the url is ', url);
    }
    ...
};
```
The last thing I'm going to do, because you'll notice this `Repositories` class or component is pretty reliant upon the `userInfo` again, and also for the `repos`, we're going to add some `propTypes` to make sure that these are passed in when we use this component. So we're going to say `userInfo: propTypes`, it needs to be an `object`, and it is `required`. Also `repos`, it needs to be an array, and it is required.

```javascript
Repositories.propTypes = {
  userInfo: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired
};
```