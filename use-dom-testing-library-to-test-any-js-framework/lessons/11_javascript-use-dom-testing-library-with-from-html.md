Kent C Dodds: [00:00] Let's go ahead and start by making this `render` method. I'm going to say `function render` That's going to take my `FromHtmlClass`. I'm going to create my `instance` of that new `FromHtmlClass`.

[00:13] Then I'm going to make my `container` a div. Then we're going to call this `mount` method on that `container`. We'll say, `instance.mount(container)` Then I'm going to `return` my `getQueriesForElement` from dom-testing-library. The element is the `container`.

### from-html.test.js
```js
function render(FromHtmlClass) {
  const instance = new FromHtmlClass()
  const container = document.createElement('div')
  instance.mount(container)
  return getQueriesForElement(container)
}
```

[00:33] With that, my tests are passing. We can refactor this a little bit, make it a little more useful, spread all those, and also expose the `container` and even the `instance`, though I wouldn't recommend using that directly.

### from-html.test.js
```js
function render(FromHtmlClass) {
  const instance = new FromHtmlClass()
  const container = document.createElement('div')
  instance.mount(container)
  return {
    container,
    instance,
    ...getQueriesForElement(container),
  }
}
```

[00:46] That's an implementation detail. Maybe we'll just leave `instances` out, but the `container` could be useful for certain tests.

### from-html.test.js
```js
function render(FromHtmlClass) {
  const instance = new FromHtmlClass()
  const container = document.createElement('div')
  instance.mount(container)
  return {
    container,
    ...getQueriesForElement(container),
  }
}
```

[00:52] In review, for this use case of the `FromHtml` library, we can take a `FromHtmlClass`, get an `instance`, and `mount` that `instance` to a `container` div and then return the queries for that `container` element.
