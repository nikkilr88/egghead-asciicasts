Kent C Dodds: [00:00] JQuery is actually pretty simple, so we're not even going to make a `render` method. What we're going to do is I'm going to use this jQuery plugin on an element that I create.

### jquery.test.js
```javascript
$.fn.countify = function countify() {
  this.html('
    <div>
      <button>0</button>
    </div>
  ')
  const $button = this.find('button')
  $button._count = 0
  $button.click(() => {
    $button._count++
    $button.text($button._count)
  })
}
```

[00:08] I'm going to say, `const div = document.createElement("div")` Then I'm going to turn this into a jQuery object. We'll call `countify` on that. Then we'll get our `getByText` from `getQueriesForElement` on that `div`. That gets my test passing.

[00:25] With jQuery, it's a little bit unique. We're treating this as a jQuery plugin. We create an element. We apply our jQuery plugin. Then we get our queries for that element. It wouldn't make a whole lot of sense to create a `render` method for this.

### jquery.test.js
```javascript
test('counter increments', () => {
  const div = document.createElement('div')
  $(div).countify()
  const {getByText} = getQueriesForElement(div)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
```