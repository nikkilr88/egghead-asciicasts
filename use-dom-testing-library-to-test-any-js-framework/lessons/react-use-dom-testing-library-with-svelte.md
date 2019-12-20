Instructor: 0:00 For Svelte, we have the counter in a different file, `counter.svelte`, a Svelte file where we have our scripts and our template here. Over in `svelte.testjs`, we have that counter component and we're going to pass that to the `render` method that let's make right now.

0:13 I'll make a `function` called `render()`. This is going to take our `Component` and we're going to need a `container = document.createElement()` and make that `div`. Then we're going to initialize the component, so we'll say `new Component` and we'll pass it the `target`, which it that `container`. This is going to effectively mount this component to that container.

0:35 Then we'll `return getQueriesForElement` on that `container`. 

#### svelte.test.js
```js
function render(Component) {
  const container = document.createElement('div')

  new Component({target: container})

  return getQueriesForElement(container)
}
```

With that, we've got the passing test. Cool. Just to make this a little bit more convenient, we'll add the `container` as the thing that we return in addition to all the properties for the `getQueriesForElement`.

```js
function render(Component) {
  const container = document.createElement('div')

  new Component({target: container})

  return {container, ...getQueriesForElement(container)}
}
```

0:54 What we do in the Svelte case is we take that `Component` that we're getting from Svelte, we pass that to our `render` and then we create a `container`. We tell our `Component` to initialize itself onto that `container` and then we `return` that `container` with all of the queries for that container element.

1:11 You'll notice here that we're also using the `fireEventAsync`, which is just a simple abstraction on top of DOM testing library's `fireEvent` and `wait` utilities to make sure that after we fire the event, we `wait` for the next tick of the event loop before resolving this promise.

1:28 That way, Svelte has a chance to do its updates to the DOM, which it does asynchronously. Then we `await` that `fireEventAsync`, before we do any of our assertions.