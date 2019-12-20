Kent C Dodds: [00:00] Let's go ahead. We'll start by making a `render` function for rendering a Dojo `WidgetBase` component that's going to accept our `ui`. The type is going to be a `Constructor` of `WidgetBase`. It's a `Constructor` of something that extends the `WidgetBase`.

### dojo.test.js
```javascript
class Counter extends WidgetBase {
  count = 0
  increment() {
    this.count++
    this.invalidate()
  }
  render() {
    return v('div', [v('button', {onclick: this.increment}, [`${this.count}`])])
  }
}
```

[00:16] Then we'll go ahead and make our `container = document.createElement("div")`. Then we'll make our `Projector` as a `ProjectorMixin` of that `ui`. Then we'll make our `projector` instance, `new Projector()`.

[00:31] We'll set this `projector` instance `async` to be `false` to make our tests a little bit easier to work with and `projector.append` to that `container`. Then we can `return` our `getQueriesForElement` on that `container`. Our tests are passing.

### dojo.test.js
```javascript
function render(ui: Constructor<WidgetBase>) {
  const container = document.createElement('div')
  const Projector = ProjectorMixin(ui)
  const projector = new Projector()
  projector.async = false
  projector.append(container)
  return getQueriesForElement(container)
}
```

[00:47] Let's also add the `container`. We'll spread across those `getQueriesForElement` so that people can access the `container` if they need. That gets things working.

### dojo.test.js
```javascript
function render(ui: Constructor<WidgetBase>) {
  const container = document.createElement('div')
  const Projector = ProjectorMixin(ui)
  const projector = new Projector()
  projector.async = false
  projector.append(container)
  return {
    container,
    ...getQueriesForElement(container)
  }
}
```

[00:56] In review, we've got this `render` method that creates a `container` and then uses `ProjectorMixin` from the Dojo framework and passes in our `ui`, which is a `Constructor` based on the `WidgetBase`.

[01:09] Then we create our instance of the `projector`. We make `projector.async` as `false` to make testing a little bit easier. Then we `append` the `projector` to that `container`. Then we return `getQueriesForElement` so that we can use it in our typical `dom-testing-library` test.
