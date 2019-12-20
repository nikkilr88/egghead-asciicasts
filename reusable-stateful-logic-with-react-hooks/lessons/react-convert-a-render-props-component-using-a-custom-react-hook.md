Here we have a small React todo app, so let's kick up a dev server and check out it's features. 

You already may see something that is a bit odd for a Todo app there are some numbers to the right of each item. 

![Shows dimensions of todolist](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-convert-a-render-props-component-using-a-custom-react-hook-numbers.png)

That is the height and width of each row. If we resize the viewport the numbers change and we can programmatically respond to those values in this case the background gets stripped and animated if a line wraps. and if we check that item…the animation stops. Let's take a look at how this code works and see how we can convert it to hooks.

The code for this piece is in the `TodoItem.js` component. We do import a helper module called `elementResizeEvent` to get notified when the size changes if we scroll down a bit there is a `Space` Render Props Component that uses the `elementResizeEvent` module and will provide the `height` and `width` of that component. 

#### TodoItem.js
```javascript
import elementResizeEvent from "element-resize-event";

class Space extends Component {
  state = { height: 0, width: 0 };
  wrapperRef = createRef();
  updateSize = () => {
    const element = this.wrapperRef.current;
    this.setState({
      height: element.clientHeight,
      width: element.clientWidth
    });
  };
  componentDidMount() {
    const element = this.wrapperRef.current;
    this.updateSize();
    elementResizeEvent(element, this.updateSize);
  }
  componentWillUnmount() {
    elementResizeEvent.unbind(this.wrapperRef.current);
  }
  render() {
    return <div ref={this.wrapperRef}>{this.props.children(this.state)}</div>;
  }
}
```

Some key points are `createRef`, responding to the resize event, unmounting, and actually passing the height and width to the `children` function. 

You may have not written a render prop before but you may have used one. Down further is where the `Space` Render Prop is being consumed. 

We provide a function to the `Space` component and it'll invoke that function passing the `height` and `width` and from that point, our code can use those values as it chooses. 

```javascript
<Space>
  {({ height, width }) => (
    <Item...
  )}
</Space>
```

In our case we pass it to the `Item` component and if the `height` is greater than `53` then it should be striped and if it's not complete then animate it. We also display the `height` and `width` to the right of each item.

```javascript
<Item
  key={todo.id}
  theme={theme}
  striped={height > 53}
  animating={!todo.completed}
  ageColors={ageColors}
>
```

So, let's get ride of the `Space` Component and solve this with hooks instead. We'll also remove the `Space` Render Prop definition as well. Which means we can remove the `Component` and `createRef` from our imports however, we'll need to add `useRef`, `useState`, and `useEffect` for our hooks.

Now… first lets create a ref for our `wrapperRef` and set it to the `useRef` hook. Then, we'll destructure `height` and `width` and a `setSize` updater from `useState` passing an initial value of `width` `0` and `height` `0`. 

```javascript
const wrapperRef = useRef(null);
const [{ height, width }, setSize] = useState({ height: 0, width: 0 });
```

Next, we'll introduce a `useEffect` hook we pass it a function to invoke, and inputs to watch and we'll pass an empty array to only run on initial mount and unmount. 

Inside our callback we'll invoke `updateSize` which we haven't defined yet, so let's do that now. 

```javascript
useEffect(() => {
   const updateSize = () => {
   };
   updateSize();    
}, []);
```

`updateSize` will pull off the `element` from our ref and invoke the `setSize` updater passing the `height` and `width` at that point in time. 

```javascript
useEffect(() => {
   const updateSize = () => {
     const element = wrapperRef.current;
     setSize({
        height: element.clientHeight,
        width: element.clientWidth
     });
   };
   updateSize();    
}, []);
```

Then we'll leverage the `elementResizeEvent` module telling it to listen to resize events on our ref and call `upateSize` if any occur. 

```javascript
useEffect(() => {
  const updateSize = () => {
    const element = wrapperRef.current;
    setSize({
      height: element.clientHeight,
      width: element.clientWidth
    });
  };
  updateSize();
  elementResizeEvent(element, updateSize);    
}, []);
```

And to clean-up we'll return a function and call `elementReisizeEvent`'s `unbind` method passing our ref. 

```javascript
useEffect(() => {
  const updateSize = () => {
    const element = wrapperRef.current;
    setSize({
      height: element.clientHeight,
      width: element.clientWidth
    });
  };
  updateSize();
  elementResizeEvent(element, updateSize);
  return () => elementResizeEvent.unbind(wrapperRef.current);    
}, []);
```

Lastly we'll need to pass our ref into the Item component. In our case `Item` is a emotion-js component so you pass refs to it with `innerRef`. 

```javascript
<Item
  key={todo.id}
  innerRef={wrapperRef}
  theme={theme}
  striped={height > 53}
  animating={!todo.completed}
  ageColors={ageColors}
>
```
Now if we go to test our app again when we resize it should behave as it did before when we had Render Props and it does. Yay.

So, one last thing before we leave. Let's come back and combine our hooks into a custom `useSize` hook that accepts a `defaultSize`. 

```javascript
const useSize = defaultSize => {
}
```
To do this, we'll grab all the code from the `useRef` through the `useEffect` we added and move that into our custom hook. 

```javascript
const useSize = defaultSize => {
  const wrapperRef = useRef(null);
  const [{ height, width }, setSize] = useState({ height: 0, width: 0 });
  useEffect(() => {
    const updateSize = () => {
      const element = wrapperRef.current;
      setSize({
        height: element.clientHeight,
        width: element.clientWidth
      });
    };
    const element = wrapperRef.current;
    updateSize();
    elementResizeEvent(element, updateSize);
    return () => elementResizeEvent.unbind(wrapperRef.current);
  }, []);
}
```

We'll replace the initial state with the `defaultSize` passed into our hook and since our hook doesn't directly need the `height` and `width` let's just simply that to `size`. 

We'll let the consumer destructure that further if they want.

```javascript
const useSize = defaultSize => {
  const wrapperRef = useRef();
  const [size, setSize] = useState(defaultSize);
```

At the bottom we'll return an array contain our `size` state and the ref that we created. 

```javascript
return [size, wrapperRef];
```

And now, let's use our custom hook. We'll call our `useSize` hook, passing default values of `height` `0` and `width` `0` and destructure `height` and `width` and the `wrapperRef` (which we are already passing to Item on line 55). 

```javascript
const [{ width, height }, wrapperRef] = useSize({
  width: 0,
  height: 0
});
```

And that should be that. If we come back over and run our code again we'll still have the same behavior as before but this time we have a custom hook that we could possibly use in other components. Yay for reuse.