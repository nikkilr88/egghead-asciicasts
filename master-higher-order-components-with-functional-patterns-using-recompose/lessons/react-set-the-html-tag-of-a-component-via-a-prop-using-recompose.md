I have a little `App` with an anchor tag and a button. I want to create a generic `Link` component, and I want it to be able to be either an anchor tag or a button based on a prop, but otherwise, I don't want the overall behavior of my `Link` component to change just because the underlying element changes.

```jsx
const Link = compose()

const App = () => 
    <div className="App">
        <a href="#/page1">Anchor Link</a>
        <button onClick={ window.location="#/page2" }>Button Link</button>
    </div>
```

I'll need to compose together a couple higher order components. I'll use `withProps` to do some work. I'll provide a function to `withProps` which receives the owner's props, and I'll destructure the `type` and the `to` prop off of there.

```jsx
const Link = compose(
    withProps(({ type, to }))
);
```

Let's go ahead and set some defaults for these. I want the `type` to be `a` by default, and I'll have the `to` just be a hash symbol. Now I want to inspect the `type`, and if it's equal to `a`. I want to return a prop object that passes on the `type` and also converts the `to` to an `href`, because anchor tags navigate via the `href` attribute.

```jsx 
const Link = compose(
    withProps(({ type='a', to='#' }) =>
        type === 'a' 
            ? { type, href: to })
);
```

If the `type` is not `a`, we can assume it's `button`. I'll still pass in the `type` again, and this time, I want to add an `onClick` handler. The `button` needs to redirect by setting the `window.location`. Now we'll apply all this to a component. This is where `componentFromProp` comes in.

```jsx 
const Link = compose(
    withProps(({ type='a', to='#' }) =>
        type === 'a' 
            ? { type, href: to }
            : { type, onClick(e) { window.location=to }})
)(componentFromProp);
```

`componentFromProp` is not a high-order component. It technically returns a component, but you don't pass a component. Instead, you pass it the name of the prop that you'd like to build the component from. In this case, I want to build a component that renders an element based on the `type` property that's coming in.

```jsx 
const Link = compose(
    withProps(({ type='a', to='#' }) =>
        type === 'a' 
            ? { type, href: to }
            : { type, onClick(e) { window.location=to }})
)(componentFromProp('type'));
```

Now, we can add a `Link`. We can tell it to go to `#/page1`. Then we'll make this an anchor `Link`, because we didn't provide a `type`. We can do another `Link` that goes to `#/page2`. This one will send a `type` in, of button. We'll make it a button `Link`.

```jsx
const App = () => 
    <div className="App">
        <a href="#/page1">Anchor Link</a>
        <button onClick={ window.location="#/page2" }>Button Link</button>
        <Link to="#/page1">Anchor Link</Link>
        <Link type="button" to="#/page2">Button Link</Link>
    </div>
```

When I refresh, I have two anchor links and two button links, but the second two links use a consistent component interface. We don't care how it's going to do the navigation. All we specify is a `to` prop, and it just works. If we want to change the visual aspect, we change the `type`.