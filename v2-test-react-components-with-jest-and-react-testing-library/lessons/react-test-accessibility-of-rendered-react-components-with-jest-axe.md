Instructor: [00:01] It's impossible to completely automate accessibility testing, but you can get a lot of low hanging fruit by using this next tool I want to show you. This form in `a11y.js` in particular is inaccessible and the reason for that is the input is not labeled.

[00:14] To make an assertion that will show us that this form is inaccessible, we need to `render` the `Form` and that's going to get us a `container`, which we can console.log the `container` in our `html`. 

#### a11y.js
```js
import React from 'react'
import {render} from '@testing-library/react'

function InaccessibleForm() {
  return (
    <form>
      <input placeholder="email" />
    </form>
  )
}

test('the form is accessible', () => {
  const {container} = render(<Form />)
  console.log(container.innerHTML)
})
```

With that, we're going to see the `form` with the `input` placeholder email printed in the terminal.

[00:31] The tool we're going to use to check this container out for us is called `axe`, A-X-E. There's a Jest specific helper module for axe called `jest-axe`. We're going to `import {axe} from jest-axe`. With that, we can pass a container to axe. This isn't async operation, so we'll `await axe` and then we'll have to add an async there. This is going to give me back my `results`.

[00:55] I can `console.log` those `results`. 

```js
import {axe} from 'jest-axe'

test('the form is accessible', () => {
  const {container} = render(<Form />)
  const results = await axe(container)
  console.log(results)
})
```

I'm going to get a bunch of output here that I honestly can't make a whole lot of sense out of. What I want is to make an assertion that will verify that this is working properly. I'm going to say `expect(results.violations).toHaveLength(0)`. 

```js
test('the form is accessible', () => {
  const {container} = render(<Form />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})
```

That is not going to give me a very helpful error message either.

[01:21] One of the cool things that jest-axe gives us is a specific assertion. We're going to have `toHaveNoViolations`. We'll say `expect.extend` with `toHaveNoViolations`. With that, I can now say expect my results `toHaveNoViolations`, and I can save that.

```js
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

test('the form is accessible', () => {
  const {container} = render(<Form />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

[01:38] The error message I get is way more helpful, giving me specific instructions on how I can fix this problem, as well as links to additional learning materials so I can figure out why this is a problem and why it should be fixed.

[01:49] All of that said, it would be nice if I don't have to do this `expect.extend` nonsense, so let's get rid of that. Jest-axe also exposes a module that we can import, `jest-axe/extend-expect`. 

```js
import 'jest-axe/extend-expect'
```

Now that extension will happen automatically.

[02:04] Even better, I've configured Jest to automatically import this file for every one of my tests anyway, so I can get rid of that import and I have all of those same assertions without any trouble. Now I have the `toHaveNoViolations` assertion available to me in every one of my tests.

[02:18] To fix this, what we're going to do is I'll add a `label` with `htmlFor` that is set to `email`. We'll `label` it with `Email`. Then we'll add an `id`, `email` for our `input`, save that. 

```js
function Form() {
  return(
    <form>
    <label htmlFor="email">Email</label>
      <input id="email" placeholder="email" />
    </form>
  )
}
```

Now we're getting no violations on this form.

[02:34] In review, to make all of this magic happen, we import from `jest-axe` this `axe` function, which is an async function. It returns a promise, so we can make our test async. We add a wait before `axe`. We pass along the `container` DOM node to `axe`. That's going to get us back some results.

[02:51] We'll pass those results to Expect, and use the `toHaveNoViolations` assertion, which we're getting from `jest-axe`. We've configured Jest to automatically import `jest-axe`. Extend Expect, so that those extensions to Expect are automatically added in every one of our tests.

[03:08] I'll add that it might be a good idea to have this `toHaveNoViolations` assertion whenever there's an update to the rendered DOM of your component.
