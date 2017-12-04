Here, we have a handy message component that renders a `Message` inside of a div. What if we don't actually pass a message at all? What if that `message` were to be `null`, for example? That's not going to render anything.

```html
<div id="root"></div>
<script src="https://unpkg.com/react@16.0.0-rc.3/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16.0.0-rc.3/umd/react-dom.production.min.js"></script>
<script type="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script type="text/babel"></script>
function Message({message}) {
    return<div>{message}</div>
}
ReactDOM.render(
    <Message message={null} />,
    document.getElementById('root'),
)
```

In our case, we want to have it render `'No message'`. What we're going to do here is we'll say if there is not a message, `if(!message)`, then we'll `return <div>No Message</div>`. Otherwise, we'll return that `message`. 

```html
function Message({message}) {
    if (!message) {
        return<div>No Message</div>
    }
    return<div>{message}</div>
}
```

![No Message rendered](../images/conditionally-render-a-react-component-no-message-rendered.png)

Now, we can have `"hi there"`. 

```html
ReactDOM.render(
    <Message message="hi there" />,
    document.getElementById('root'),
)
```

That'll render `hi there`, and then we can also have `null` to render `No Message`.

Now, the key takeaway here is that JSX is simply an abstraction on top of `React.createElement`. We'll say `React.createElement('div', null, 'No Message')`, and then `No Message` will be a string for the children. We'll do the same thing here with `React.createElement('div', null, message)`.

```javascript
function Message({message}) {
    if (!message) {
        return React.createElement('div', null, 'No Message')
    }
    return React.createElement('div', null, message)
}
```

This is functionally equivalent to what we had before. This is just what the JSX would be transpiled down to. With it like this, we can see that this is really just JavaScript. Instead of this `if` statement, we could do a ternary where we'd say `return message`, and then if there is a `message`, then we'll do `React.createElement` with that message.

Otherwise, we'll do `React.createElement` with `'No Message'`. Then we can remove our `if` statement, and that's functionally equivalent as well. 

```javascript
function Message({message}) {
    return message 
        ? React.createElement('div', null, message)
        : React.createElement(
            'div', 
            null,
            'No Message'
        )
}
```

We can put a message in our `render`, and that works also.

```html
ReactDOM.render(
    <Message message={'hi'} />
    document.getElementById('root'),
)
```

If we wanted to wrap all of our `return` inside of yet another `<div>`, then what we can do is we'll take it, I'm going to cut it out, and we'll make a div. Then we have to interpolate our JavaScript syntax into here. That is functionally equivalent, except now we're wrapping everything inside of a `<div>`.

```javascript
function Message({message}) {
    return (
        <div>
            {message 
                ? React.createElement(
                    'div', 
                    null, 
                    message
                )
                : React.createElement(
                    'div', 
                    null,
                    'No Message'
                )
            }
        </div>
    )
}
```

When you start into JSX, you need to open up some interpolation to do any of the JavaScript stuff that you see in here. This is why very often in React code in the `render` method, you'll see the use of ternaries, because the curly braces must accept an expression in there.

That's why you'll see ternaries, because you can't have an `if` statement in here. That doesn't work in there. Using ternaries to conditionally render different components is a really nice way to compose these components together.

Let's go ahead and refactor this back to JSX, because it looks a little bit nicer. 

```javascript
function Message({message}) {
    return (
        <div>
            {message ? (
                <div>{message}</div>
            ) : (
                <div>No Message</div>
            )}
        </div>
    )
}

ReactDOM.redner(
    <Message message={null} />
    document.getElementById('root'),
)
```