Here we have two elements, a `div` with a class of `app`, and a `H1`, some text content, `Hello World`. 

####index.html
```html
<div class="app">
	<h1>Hello world!</h1>
</div>
```

To recreate this in JavaScript, we will have to say, `app` is equal to `document.createElement` and we'll use a `div`, then we will add the class, by saying, `classList.add(app)`.

```javascript
<script>
	const app = document.createElement('div');
	app.classList.add('app');
</script>
```

Next, to create the header, we do the same thing with `document.createElement`, this time using `H1` and to set the `Hello World` text, we use `textContent`. We'll assign a string to that. There we have our two elements.

```javascript
const header = document.createElement('h1');
header.textContent = 'Hello world!';
```

Now, to make the header a child of this `div` element, we can say `app.appendChild`, header and then, to actually render it on the screen and grab hold of the main element by using query selector, and then call an `appendChild` and pass it in `app`.

```javascript
app.appendChild(header);

document.querySelector('main')
	.appendChild(app);
```

Now, if we go up here and delete these, 

```html
<div class="app">
	<h1>Hello world!</h1>
</div>
```

hit save. You can see we still have the same result. We have a `div` with a class of `app` and the `H1` element with `Hello World`. That was a `Hello World` example using two elements with raw JavaScript.

Now, let's do the same thing with preact. We'll comment this out for a moment, 

```javascript
// const app = document.createElement('div');
// app.classList.add('app');

// const header = document.createElement('h1');
// header.textContent = 'Hello world!';

// app.appendChild(header);

// document.querySelector('main')
// 	.appendChild(app);
```

and then we'll bring in preact. Now, because we're loading preact directly in a script type like this, 

```html
<script src="node_module/preact/dist/preact.js"></script>
```

we'll have access to the global variable preact.

From that, we'll need to use the `H` function and the `render` function. 

```javascript
const { h, render} = preact;
```

First, let's create the `div` with a class of `app`. We can say `app` is equal to `H` and we pass in the name of the element and the attributes. In this case, we wanted a `class` of `app`.

```javascript
const app = h('div', {class :'app'})
```

Then, because we had a `div` with a `H1` nested inside it, we can provide a third argument here, which is this element's children. We'll call the `H` function again, this time with `H1`. We don't need any attributes, so we'll just give `null`. Because we just have some text content for the children, we can provide it directly here. 

```javascript
const app = h('div', {class :'app'}, [
	h('h1', null, 'Hello world!')
]);
```

To actually render it on the screen, we'll call the `render` function pass in the `app`. On the second argument is the target, so we'll grab this on before. Hit save. 

```javascript
render(app, document.querySelector('main'));
```

Now, you see we have the exact same result.

####Browser Output
```
Hello world!
```

Behind the scenes, preact will create elements, it will add attributes for us, and it will nest elements within other elements. This is definitely a nicer way to write user interfaces but we can go one step further and use JSX, which will get rid of these raw function calls for us.

Let's switch to a webpack and babel setup and see how that looks. We can start the dev server with `yarn start`. 

####Terminal
```bash
$ yarn start
```

Next, in the `src` `index.js` file, which is our entry point, we'll import `H` and `render` from preact. We'll also import our `app` component, which we haven't created yet but we're going to put it inside a component's directory, call it `App`.

####index.js
```javascript
import { h, render } from 'preact;'
import App from './components/App';
```

Now, we can let WebStorm create that directory for us, as well as this file. We'll export a function called `App`. This will return some JSX, just as we had before. We'll have a `div`, a class of `app` and then we'll nest inside it a `H1` element with `Hello World`.

####App.js
```html
export function App () {
	return (
		<div class="app">
			<h1>Hello world!</h1>
		</div>
		);
}
```

Now, because we're using JSX here, we'll have to import `H` from `preact`, even though we don't call this directly, it will allow this to be converted into those regular function calls. The final thing to do for this component is to provide it as a default export.

```javascript
import { h } from 'preact';

	...

export default App;
```

Now, back in our entry file, we can render this to the screen. We will call render by the `app` and the target. We used the main element like we did earlier. 

####index.js
```javascript
render(<App />, document.querySelector('main'));
```

We'll go and add that to the HTML. 

####index.html
```html
<main></main>
```

Reloading the browser. Now, you can see we have the `div` with the nested `H1` inside of it.

To recap this lesson, we created a component in this file `App.js`. We imported `H` from preact so that JSX could be converted into function calls. Then, we exported this function,

####App.js
```html
export function App () {
	return(
		<div class="app">
			<h1>Hello world!</h1>
		</div>
	);
}
```

 both as a named export and as a default export.

Then in the entry point of our application, we bring in `H` again and render from preact. `H` is needed because we're using JSX here,

####index.js
```javascript
render(<App />, ...);
```

 and render is how we get a component to mount itself into the DOM. Finally, this second argument to the render function,

```javascript
render(..., document.querySelector('main'));
```

  is how we tell preact where to put the `app` on the page.