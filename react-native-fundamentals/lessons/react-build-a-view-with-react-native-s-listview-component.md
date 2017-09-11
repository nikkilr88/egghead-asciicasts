With this `Notes` component, we're going to use this ListView from [https://facebook.github.io/react-native/docs/listview.html](https://facebook.github.io/react-native/docs/listview.html). 

#### https://facebook.github.io/react-native/docs/listview.html
```javascript
class MyComponent extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    );
  }
}
```

"It's a core component designed for efficient display of vertically scrolling lists of changing data." That's exactly what we're going to have. When we're doing those notes, those notes could be changing.

The biggest thing here, looking at this example, is we create this new instance of `DataSource`, `const ds = new ListView.DataSource`. We pass it this object, `{rowHasChanged: (r1, r2) => r1 !== r2}`. Then what we do is we invoked a `cloneWithRows` method on our `dataSource` instance that we made. We pass it the rows that we want to loop over, `(['row 1', 'row 2'])`. We save that as part of our state.

Then you'll notice down below `getInitialState`, we have the `ListView` component. `dataSource` is the result of calling `cloneWithRows`, and then, we have this `renderRow` attribute. We give it a callback function that will invoke for every row in our array we pass to `cloneWithRows`. Here, `<Text>{rowData}</Text>`, `rowData` will be row 1 and row 2. That's getting passed in as a parameter to our function.

Let's jump over to our code now and go to our `Components` folder and create a new file called `Notes.js`. `require` `React`. We're also going to `require` our `api` so that we can communicate with our Firebase API. We're going to `require` our `Separator` component we built earlier. The last one is we're going to `require` our `Badge` that we built earlier as well.

#### Notes.js
```javascript
var React = require('react-native');
var api = require('../Utils/api');
var Separator = require('./Helpers/Separator');
var Badge = require('./Badge');
```

The things we're going to need. We're going to need a `View`, `Text`, a `ListView`, `TextInput`, in order to get the new note, `StyleSheet` for styles, and `TouchableHighlight` so we can submit that new note. 

```javascript
var {
    View, Text,
    ListView,
    TextInput,
    StyleSheet,
    TouchableHighlight
} = React;
```

I'm just going to throw in our styles down below that.

```javascript
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
```

Now, what we'll do is let's go ahead and create our new `Notes` component, which `extends React.Component`. Then, because this component is going to manage its own state, we need to have this `constructor` function. We're going to set `this.state` to be a few things. Before we do that, we're always going to call `super`, passing in `props`.

```javascript
class Notes extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
}
```

Then we're going to have this `DataSource`, `this.ds = new ListView.DataSource`. What we're going to pass it is `rowHasChanged`. We have `row1, row2`, and then arrow function, `=> row1 !== row2`. 

```javascript
class Notes extends React.Component{
    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {

        }
    }
}
```

Now, in our `state`, we're going to have a `dataSource` which is set to what we get back from invoking `this.ds.cloneWithRows`, .

We're going to pass it `this.props.notes`, which is all the notes that we'll get from Firebase before we come to this route. We'll have an empty `note`, and then we'll also have an `error`.

```javascript
class Notes extends React.Component{
    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: thiss.cloneWithRose(this.props.notes),
            note: '',
            error: ''
        }
    }
}
```

Let's make a `render` function now. This is going to be wrapped in a `<View>`. The `style`, as always, is going to be  `{styles.container}`. Then what we're going to do, before we go and we do all the mapping over the rows stuff, let's go ahead and just make our `<Text>` input box that's going to allow us to add new notes.

As of right now, we don't really have any notes. It wouldn't make sense to make the functionality of repeating or looping over the notes before we have any. What I'm going to do is I'm going to make this function, called `footer`, that's going to return us the UI for our footer.

```html
render(){
    <View style={styles.container}>
        {this.footer()}
    </View>
}
```

Let's now go and, above `render()`, we'll make `footer`, which is going to return us a `<View>` with a `style` of `{styles.footContainer}` which we pasted in above. What's nice about React is that you can do things like this, where you can have a function which returns some UI and then just invoke that function. You can have it be returned, which will show your UI.

```html
footer(){
    return ( 
        <View style={styles.footContainer}>

        </View>
    )
}
```

We're going to have our `TextInput` in this `<View>`. Our `styles` are going to be `styles.searchInput`. `value` is going to be set to `{this.state.note}`, and then we're going to have an `onChange` function. Their `placeholder` is going to be just `"New Note"`. Let's go ahead and make this `onChange` function. Let's call it `handleChange`. We'll need to `bind(this)`.

```html
footer(){
    return ( 
        <View style={styles.footContainer}>
            <TextInput
                style={styles.searchInput}
                value={this.state.note}
                onChange={this.handleChange.bind(this)}
                placeholder="New Note" />
        </View>
    )
}
```

Now, up just above `footer`, we'll make `handleChange`. All it's going to do is it's going to take in an event, `e`. It's going to keep our note property on our state object, `this.setSate` up to date. We're going to say, `note: e.nativeEvent.text`.

```javascript
handleChange(e){
    this.setState({
        note: e.nativeEvent.text
    });
}
```

Now that that's good, let's go back down to our `footer`. Let's add in a button. We're going to use `TouchableHighlight` to be able to capture that touch event. `styles` is `styles.button`.

`onPress` is going to equal `this.handleSubmit`, The `underlayColor` is going to equal `#88D4F5`. Inside of here, let's have a `<Text>` component with a `style` of `buttonText`. Have it say, `Submit`, and then we'll close out our `TouchableHighlight` component.

```html
footer(){
    return ( 
        <View style={styles.footContainer}>
            <TextInput
                style={styles.searchInput}
                value={this.state.note}
                onChange={this.handleChange.bind(this)}
                placeholder="New Note" />
            <TouchableHighlight
                style={styles.button}
                onPress={this.handleSubmit.bind(this)}
                undlerlayColor="#88D4F5">
                    <Text style={styles.buttonText}> Submit </Text>
            </TouchableHighlight>
        </View>
    )
}
```


Now, let's go ahead and make this `handleSubmit` function. I'm going to do it right below `handleChange`. Remember, what `handleSubmit` is responsible for is it's going to take the value or it's going to take this note property on our state in `handleChange` and throw it up to Firebase.

Start by making `handleSubmit()`. We're going to get the note, `var note = this.state.note;`. Then what we can do is reset the state so that'll clear out our input field, `this.setState({})`. Then, if you remember, in our `api`, we made an `addNote` method, `api.addNote()` that expects to receive the user's `userInfo.login` and a `note`. 

```javascript
handleSubmit(){
    var note = this.state.note;
    this.setState({
        note''
    })

    api.addNote(this.props.userInfo.login, note)
}
```

It's going to return us a promise and pass in `data`, `.then((data))`. We're going to use the arrow function here, `.then((data) => )`. Now, inside this, we're going to go and get the notes again, `api.getNotes(this.props.userinfo.login)`. That will return us a promise, which we can `.then((data) => ` on. Now, we have the updated data. We can `this.setState`. Now, our `dataSource` is going to be `cloneWithRows` again, but instead, it's going to be the new `data`.

```javascript
handleSubmite(){
    var note = this.state.note;
    this.setState({
        note''
    })

    api.addNote(this.props.userInfo.login, note)
        .then((data) => {
            api.getNotes(this.props.userInfo.login)
                .then((data) => {
                    this.setState({
                        dataSource: this.ds.cloneWithRows(data)
                    })
                })
        })
}
```

If any of that errors, let's go ahead and throw a `catch((err) => `. We're going to `console.log('Request failed')` and the error message, `err`, and then we're going to `setState({error})`. 

```javascript
.catch((err) => {
    console.log('Request failed', err);
    this.setState({error})
    })
```

One last ES6 feature here is that before, you would have to do something like error error, `this.setState({error: errr})`, but if these repeat, you can just throw in one, `this.setState({error})`, which is really convenient.

Now that that's up, now that our `footer` is working and it should be making requests to Firebase, let's go ahead and now worry about our `<ListView>`. In `render`, we're going to have our `<ListView>` component.

The `dataSource` we're going to give it is `this.state.dataSource`, which we made up when we did `getInitialState`. Remember, `renderRow` is basically the UI for every item in our `dataSource`. I'm going to set `render` to `this.renderRow`. We'll make `renderRow` function here, in a bit.

Then we can also give it a `header`. You can think of this `<ListView>` as like a collection of UI. It's a list. Because of that, we can have a header to it, which is really convenient. At the top of our file, we are going to render the `<Badge>` component.

Remember, we need to give it the `userInfo`, `this.props.userInfo` and close the component. 

```html
render(){
    return(
        <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderHeader={() => <Badge userInfo={this.props.userInfo}/> } />
            {this.footer()}
        </View>
    )
}
```

`renderHeader` takes in a function. Whatever you return will be the header of this `<ListView>`.

The last thing we need to do is create `renderRow`. Let's come just above `footer` again. We'll add `renderRow`. Remember, the thing that gets returned from here is going to be the UI for every item in our list. We take in some `rowData`.

We're going to return a `<View>` and a second `<View>` inside of that. The `style` is going to be set to `{styles.rowContainer}`. As always, if you're curious about those styles, feel free to go check them out up at the start of our code.

Inside of that second `<View>`, I'm just going to render the `{rowData}` inside of a `<Text>` and then, of course, throw in the `Separator` just after the second `<View>`. We'll get that nice, great divider between every item.

```html
renderRow(rowData){
    return (
        <View>
            <View style={styles.rowContainer}>
                <Text> {rowData} </Text>
            </View>
            <Separator />
        </View>
    )
}
```

Dont forget to add `module.exports = Notes;` at the end.

Then let's set up some `propTypes` on our component. We're expecting to receive some `userInfo`. As always, that's going to be `React.PropTypes.object.isRequired`. There are some `notes`, which is going to be `React.PropTypes.object.isRequired` as well.

```javascript
Notes.propTypes = {
    userInfo: React.PropTypes.object.isRequired,
    notes: React.PropTypes.object.isRequired
}
```