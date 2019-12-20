Kent C Dodds: [00:00] Let's go ahead and make a function called `render`. For our `render` method here with AngularJS, we're going to accept a template and an options object for the modules. We'll just call that `html` and `config`.

### angularjs.test.js
```js
function render(html, config) {

}

test('renders a counter', () => {
  const {getByText} = render(`<my-counter></my-counter>`, {modules: ['myApp']})
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
```

[00:12] Let's go ahead and make our `container = document.createElement("div")`. Then we'll set the `container.innerHTML` to be that `html`.

[00:22] We'll say `angular.bootstrap(container, config.modules)`. Then we can `return` this `getQueriesForElement` on that `container`. That'll get our test passing.

[00:34] Let's go ahead and add, as a convenience, we'll spread the `getQueriesForElement` and that `container` just in case we want to make queries directly on that `container`.

### angularjs.test.js
```js
function render(html, config) {
  const container = document.createElement('div')
  container.innerHTML = html
  angular.bootstrap(container, config.modules)
  return {
    container,
    ...getQueriesForElement(container),
  }
}
```

[00:44] With that, we get our standard `dom-testing-library` test working by passing the `html` and then the modules for our AngularJS app. Then we create a `div`, which is our `container`.

[00:54] We set the `container.innerHTML`. Then we `.bootstrap` Angular on that `container` with the specific modules that have our direct `div` defined.
