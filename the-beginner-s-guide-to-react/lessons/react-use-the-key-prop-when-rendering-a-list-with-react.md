Here, we have an `App` component with an `allItems` property. We're going to render those out with `App.allItems.map`, with `item`. Inside of here, we'll render a `<div>` with `item.value`, and close off that `</div>`. 

```jsx
class App extends React.Component {
  static allItems = [
    {id: 'a', value: 'apple'},
    {id: 'o', value: 'orange'},
    {id: 'g', value: 'grape'},
    {id: 'p', value: 'pear'},
  ]

  render() {
    return (
      <div>
        {App.allItems.map(item => (
          <div>{item.value}</div>
        ))}
      </div>
    )
  }
}
```

We get apple, orange, grape, and pear.

![allItems rendered](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/The%20Beginner's%20Guide%20to%20ReactJS/original_egghead-use-the-key-prop-when-rendering-a-list-with-react/use-the-key-prop-when-rendering-a-list-with-react-allItems-rendered.png)

If we open up the developer tools, we're going to get this warning from React, saying each child in an array or iterator should have a unique key prop.

![Warning](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/The%20Beginner's%20Guide%20to%20ReactJS/original_egghead-use-the-key-prop-when-rendering-a-list-with-react/use-the-key-prop-when-rendering-a-list-with-react-warning.png)

The problem is that what this, `App.allItems.map`, expression evaluates to is an array. As we re-render and re-render, React needs to be able to check the old array from the new array, to know which items are removed, which items are added to. To do this, it needs to keep track using a `key`.

For this `key`, we need to keep it as something totally unique to that item. Lucky us, that's the `id`. We can say `item.ID`.

```jsx
render() {
  return (
    <div>
      {App.allItems.map(item => (
        <div key={item.id}>{item.value}</div>
      ))}
    </div>
  )
}
```

Now we're not getting that warning anymore. Now, as things are added and removed as state changes, React can keep track of these nodes.

It doesn't actually really matter all that much in this scenario. We're going to add a little bit of code here to demonstrate a scenario where it really does matter.

What I added was some `state` to keep track of some `items`, because we're going to make that dynamic. We can now add and remove `items` from that `state`, and then we `render` the `items` based on that `state`.

We have this add `<button>`, where we can `onClick` to add items, and then we `render` all the `items` that are in the state, with a `<button>` to remove them and what the value of that item is, and then this `<input>` to demonstrate the real problem here.

```jsx
class App extends React.Component {
  static allItems = [
    {id: 'a', value: 'apple'},
    {id: 'o', value: 'orange'},
    {id: 'g', value: 'grape'},
    {id: 'p', value: 'pear'},
  ]
  state = {items: []}
  addItem = () => {
    this.setState(({items}) => ({
      items: [
        ...items,
        App.allItems.find(
          i => !items.includes(i),
        ),
      ],
    }))
  }
  removeItem = item => {
    this.setState(({items}) => ({
      items: items.filter(i => i !== item),
    }))
  }
  render() {
    const {items} = this.state
    return (
      <div>
        <button
          disabled={
            items.length >= App.allItems.length
          }
          onClick={this.addItem}
        >
          +
        </button>
        {items.map((i, index) => (
          <div>
            <button
              onClick={() => this.removeItem(i)}
            >
              -
            </button>
            {i.value}:
            <input />
          </div>
        ))}
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
```

We're going to go ahead and click add. We're going to get that warning, because we don't have a key prop. I'll just add all of the items we have available.

![All items added plus warning](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/The%20Beginner's%20Guide%20to%20ReactJS/original_egghead-use-the-key-prop-when-rendering-a-list-with-react/use-the-key-prop-when-rendering-a-list-with-react-_-warning.png)

Let's go ahead, and I'm going to write in the inputs, from the top down, one, two, three, and four. Let's say I want to get rid of the pear, 4. That works great. Now, let's say I want to get rid of orange. That has 2 in it, and I click minus next to the orange. The grape now actually has 2, when it had 3 before. 

![Removing items](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/The%20Beginner's%20Guide%20to%20ReactJS/original_egghead-use-the-key-prop-when-rendering-a-list-with-react/use-the-key-prop-when-rendering-a-list-with-react-subtracting-items.png)

If I do the same here to apple, now I have grape, and that has 1. Things are really messed up.

The reason is that this `<input>` is not actually associated to these `items` directly, because we haven't shown React how to keep track of these `items` and the associated elements. That's why we need to have a `key` here, so that React can keep track of the elements that are associated with our data.

Here, we could try to do an `index`. Sometimes, that'll work OK, but in our scenario, that won't work, the same thing will happen.

Sometimes, you'll be forced to use an `index`. You don't have anything else that's unique. Sometimes, if you just have an array of strings, then you can use the `identity` of that item itself. In our case, we're lucky, because we have an `id`. That's normally what you want to do, is have your data have an `id`, a unique identifier.

```jsx
{items.map((i, index) => (
    <div key={i.id}>
        <button
          onClick={() => this.removeItem(i)}
        >
          -
        </button>
        {i.value}:
        <input />
    </div>
))}
```

Now, if we add all these, we can say 1, 2, 3, and 4. If we remove 2, then that's going to actually remove 2. 

![2 is removed](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/The%20Beginner's%20Guide%20to%20ReactJS/original_egghead-use-the-key-prop-when-rendering-a-list-with-react/use-the-key-prop-when-rendering-a-list-with-react-2-is-removed.png)

There's one other scenario where not using a key properly can cause real problems, and that's with element focus.

I wrote this demo here for you. 

```jsx
class FocusDemo extends React.Component {
  state = {
    items: [
      {id: 'a', value: 'apple'},
      {id: 'o', value: 'orange'},
      {id: 'g', value: 'grape'},
      {id: 'p', value: 'pear'},
    ],
  }
  componentDidMount() {
    setInterval(this.randomizeItems, 1000)
  }
  randomizeItems = () => {
    this.setState(({items}) => ({
      items: shuffle(items),
    }))
  }
  render() {
    return (
      <div>
        <div>
          <h1>Without Key</h1>
          {this.state.items.map(item => (
            <input value={item.value} />
          ))}
        </div>
        <div>
          <h1>With Key as Index</h1>
          {this.state.items.map((item, index) => (
            <input
              key={index}
              value={item.value}
            />
          ))}
        </div>
        <div>
          <h1>With Key</h1>
          {this.state.items.map(item => (
            <input
              key={item.id}
              value={item.value}
            />
          ))}
        </div>
      </div>
    )
  }
}
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(
      Math.random() * currentIndex,
    )
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
```

Every second, these items are being randomized and then re-rendered. This is an example of not using a key at all.

We can see that's being rendered right here, with just an `<input>` for each item. 

```jsx
<div>
  <h1>Without Key</h1>
  {this.state.items.map(item => (
    <input value={item.value} />
  ))}
</div>
```

If we use the `key` as the `index`, with the input for each item. 

```jsx
<div>
  <h1>With Key as Index</h1>
  {this.state.items.map((item, index) => (
    <input
      key={index}
      value={item.value}
    />
  ))}
</div>
```

Then we use a proper `key`, with a unique identifier for each `item`.

```jsx
<div>
  <h1>With Key</h1>
  {this.state.items.map(item => (
    <input
      key={item.id}
      value={item.value}
    />
  ))}
</div>
```

If I click in here, you'll notice my focus is staying in the same input. It's not following the item that it should be. If I highlight the text, every single time it's updated, that is going to get un-highlighted.

We actually have the exact same problem when we use `key` as an `index`, because it's not a proper identifier. Only when we use the `key` properly will our focus be taken to the right place, keeping track with the input that is associated with the item that we are rendering.

Even if I select all the text, or if I move anywhere in that input, React will make sure that the user's focus and their selection remains in the right place, because we have the `key` properly set.