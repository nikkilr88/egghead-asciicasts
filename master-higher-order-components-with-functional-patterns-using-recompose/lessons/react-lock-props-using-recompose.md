Let's say I wanted to keep all of the links from my application in one place. We'll define a `HomeLink`. The base component for my `HomeLink` is going to be an anchor tag. I'd like to enhance this by using the `withProps` higher-order component from **Recompose**. I need to supply `withProps` a prop object. I'll pass in `href`.

```jsx
const HomeLink = withProps({ href: '#/' })('a')
```

I want it to always be set to the root URL of my application. I'm going to create a `ProductsLink` as well, and a `CheckoutLink`. Now, I can replace both of these anchor tags that were going to the same place with just one `HomeLink`. 

```html
const HomeLink = withProps({ href: '#/' })('a')
const ProductsLink = withProps({ href: '#/products' })('a')
const CheckoutLink = withProps({ href: '#/checkout' })('a')

const App = () => 
    <div className="App">
        <header>
            <HomeLink>Logo</HomeLink>
        </header>
        <nav>
            <HomeLink>Home</HomeLink>
            <a href="#/products">Products</a>
            <a href="#/checkout">Checkout</a>
        </nav>
    </div>
```

If `HomeLink` were ever to change its URL, I'd only have to change it in one place.

Next, I can change the `ProductsLink` and the `CheckoutLink`. Notice how the text between the links is still provided. I only want the behavior of the link to be the same, not the link text. When I refresh, everything still works the same.

```html
const App = () => 
    <div className="App">
        <header>
            <HomeLink>Logo</HomeLink>
        </header>
        <nav>
            <HomeLink>Home</HomeLink>
            <ProductsLink>Products</ProductsLink>
            <CheckoutLink>Checkout</CheckoutLink>
        </nav>
    </div>
```

The text in the link still shows up because `withProps` does not clobber the props that you passed in. It simply merges the props that we supply with any props that may have been passed in. That includes the `props.children`.

This `HomeLink` is equivalent to writing it like this. We could write a functional stateless component that returned an anchor tag where the `href` is set to the root, and then we put the children in the middle.

```html
const HomeLink = withProps({ href: '#/' })('a')
const HomeLink = (props) => <a href="#/">{ props.children }</a>
```

By using `withProps`, you don't have to worry about where the children are going to go. It'll just work. `withProps` can also accept a function instead of an object. If you provided a function, then you need to return an object.

```jsx
const HomeLink = withProps(( query ) => ({ href: '#/' }))('a')
```

The function will take in the owner props. For example, we could add a `query` prop to our `HomeLink`. We could specify that the logo is clicked in case we need it to track it for metrics, and provide that to the `href`.

```jsx
const HomeLink = withProps(( query ) => ({ href: '#/?query=' + query }))('a')
```