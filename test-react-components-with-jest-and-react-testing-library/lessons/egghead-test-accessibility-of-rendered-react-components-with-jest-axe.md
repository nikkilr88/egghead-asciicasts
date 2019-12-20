Kent C Dodds: [00:00] This `Form` is not accessible. The reason it's not accessible is because this `input` is missing a `label`. Even though it has a `placeholder` here, it needs a `label` so assistive technologies can help out users who are using your application.

### a11y.js
```javascript
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render} from 'react-testing-library'

function Form() {
  return (
    <form>
      <input placeholder="username" name="username" />
    </form>
  )
}

test('the form is accessible', () => {})
```

[00:14] To start testing for accessibility in our `Form`, we're going to go ahead and `render(<Form/>)` in our `test`. We're going to get the `container` from that function call. Then if we `console.log(container.innerHTML)`, we can see that the HTML renders the `input` with no `label`.

```javascript
test('the form is accessible', () => {
  const {container} = render(<Form />)
  console.log(container.innerHTML)
})
```

[00:30] We can pass this HTML to a tool called `axe-core` which will give us a report of the accessibility violations in that HTML. There's a Jest-specific library called `jest-axe` that we can use to interact with this in a nice way with Jest.

[00:45] I'm going to `import {axe} from 'jest-axe'`. Instead of console.logging that `container.innerHTML`, I'm going to `axe` it. This is an asynchronous operation. It returns a promise. I can `await` that to get my `results`.

```javascript
test('the form is accessible', () => {
  const {container} = render(<Form />)
  const results = await axe(container.innerHTML)
})
```

[01:02] I'll need to turn this test into an `async` test. Now if I `console.log(results)`, I'm going to get a bunch of violations here and a lot of information that I can't really make a whole lot of sense of in my terminal here.

[01:16] I want to make an assertion that will throw a nice, readable error when I have accessibility violations. I could do something like `expect(results.violations).toHaveLength(0)`, but that still wouldn't be super-helpful.

[01:33] `jest-axe` also exposes an expect extension that I can use to have a much more helpful error message here. I'm going to also `import {toHaveNoViolations}`. I'll then call `expect.extend(toHaveNoViolations)`. Then I can pass my `results` to `toHaveNoViolations` and my error message is a lot more helpful.

```javascript
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

...

test('the form is accessible', async () => {
  const {container} = render(<Form />)
  const results = await axe(container.innerHTML)
  expect(results).toHaveNoViolations()
})
```

[01:54] It tells me exactly what the node was that is causing that violation. It gives me some helpful information to go look into to find out why I'm experiencing that violation.

### Console Output
```
Expected the HTML found at $('input') to have no violations:

<input placeholder="username" name="username"/>

Received:

"Form elements must have labels (label)"

Try fixing it with this help: https://dequeuniversity.com/rules/axe/3.1/label?application=axeAPI
```

[02:05] If I go ahead and fix this by adding a `label` with an `htmlFor="username"`. Inside the `label` I write, `Username`. On my `input`, I give it `id="username"` so that `id` is associated with the `htmlFor`. That associates my `label` to that `input`. If I save this, then I'm going to get a passing test.

### a11y.js
```javascript
function Form() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" placeholder="username" name="username" />
    </form>
  )
}
```

[02:24] One thing I can do to clean this up is along with these two imports -- which I should be putting in a setup file -- I can also `import 'jest-axe/extend-expect'`. Then I don't need to `import` this `toHaveNoViolations` into every file or call `expect.extend`.

```javascript
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import 'jest-axe/extend-expect'
```

[02:40] `axe-core` supports a lot more than reporting just violations of labels and inputs. You might consider re-running axe any time the HTML of your component changes.
