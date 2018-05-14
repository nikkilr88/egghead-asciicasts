Instructor: [00:00] Just to illustrate this delay, let's go ahead, and we'll introduce a loading state. We'll fade out the entire list when we are `loading`. If we're `loading`, the style is going to equal. We're going to set some opacity here. Otherwise, if we're not `loading`, we'll set that to `1`.

#### App
```html
return (
  <div>
    <h4>Async UI updates in React using setState()</h4>
    <ul style={{opacity: loading ? 0.6 : 1}}>
      {items.map(item => (
        <li key={item.id}>
          {item.title}{' '}
          <button onClick={() => this.deleteItem(item.id)}>
            Delete item
          </button>
        </li>
      ))}
    </ul>
  </div>
);
```

[00:20] This needs to be an object with `opacity` property that we're setting. We've yet to introduce that state here, so we'll destructure that out of state along with our items. 

```javascript
const {items, loading} = this.state;
```

We'll set the default, and we'll begin as `loading: false`. 

```javascript
state = {
    items: Array.from(Array(5), (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
    })),
    loading: false,
};
```

What we're going to do in `deleteItem` is, before we fire off the request, we're going to `setState` and we're going to set `loading` to `true`.

[00:47] Let's say immediately, we'll set that to true. When this is complete, after the request is complete, we'll set `loading` to `false`. 

```javascript
deleteItem = id => {
    this.setState({loading: true});
    deleteItemRequest(id).then(() => {
        this.setState(state => ({
            items: state.items.filter(item => item.id !== id),
            loading: false,
        }));
    });
};
```

Now, we have this fading in and out in between those requests.