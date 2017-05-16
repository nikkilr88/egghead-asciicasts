I have a `Fibonacci` component. It displays a computation result depending on the `depth` passed in. I have a little example app where I can change the `depth` or the `size` or the `color` of my component.

```jsx 
const Fibonacci = ({ depth, color, size, count }) => 
    <div style={{ color, fontSize: size }}>
        Fibonacci Result:<br/>{ fibonacci(depth) }
    </div>;

const withAppState = compose(
    withState('depth', 'setDepth', 1400),
    withState('color', 'setColor', 'red'),
    withState('size', 'setSize', 14)
);
```

Every time a prop changed, whether it was `depth`, `size` or `color`, the `Fibonacci` was computed. 

![Fibonacci](../images/react-compute-expensive-props-lazily-using-recompose-fibonacci.png)

I'd rather not compute this `result` every time a prop changed. I'd like to change this so it just gets the `result` and displays it directly.

```jsx 
const Fibonacci = lazyResult(({ depth, color, size, count }) => 
    <div style={{ color, fontSize: size }}>
        Fibonacci Result:<br/>{ fibonacci(depth) }
    </div>
);
```

I'm going to do the work in a new higher order component called `lazyResult`. `lazyResult` is going to make use of the `withPropsOnChange` higher-order component from **Recompose**. It takes in two params.

The first param is an array of prop names that we want to wait for changes in. We only want to recalculate the `result` when the `depth` changes. The next param is a prop creator. It takes in the owner props, and it has to return a prop object to merge with the owner props.

```jsx
const lazyResult = withPropsOnChange(
    ['depth'],
    ({ depth }) => ({

    })
);
```

We'll take in the `depth`, and we'll return a `result` that contains the `fibonacci` computation. When I refresh, we'll see the computed number change every time I change the `depth`. Now, when I change the `size` or the `color`, the computed number doesn't go up.

```jsx
const lazyResult = withPropsOnChange(
    ['depth'],
    ({ depth }) => ({
        result: fibonacci(depth)
    })
);
```