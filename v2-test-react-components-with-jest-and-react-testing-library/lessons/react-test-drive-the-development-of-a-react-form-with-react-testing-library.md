Instructor: [00:01] In `tdd-01-markup.js`, I'm going to start out with a `test` that has the title `renders a form with title, content, tags, and a submit button`. We're going to render an `Editor`. Let's go ahead and `import React from 'react'`, so we can create that element. We're going to need to `import {Editor} from '../post-editor-01-markup'`. We're going to need to render this, so `import {render} from '@testing-libraray/react'`. Cool.

#### tdd-01-markup.js
```js
import React from 'react'
import {Editor} from '../post-editor-01-markup'
import {render} from '@testing-libraray/react'

test('renders a form with title, content, tags, and a submit button', () => {
  <Editor />
})
```

[00:31] Now we can `render` that `Editor` and from that, we're going to need to `getBYLabelText` to get our form elements and `getByText` to get our submit button. We'll `getByLabelText(/title/i)` and we'll have a couple others here. One for `content`, another for `tags`, and then we'll have a `getByText` for our `submit` button.

```js
test('renders a form with title, content, tags, and a submit button', () => {
  const {getBYLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  getByText(/submit/i)
})
```

[00:53] These are basically implicit assertions, so I'm going to leave them as they are because if we can't find something that has a label title, it's going to throw an error. That's exactly what we're going to see here. That is once we get our post editor markup exporting a component.

[01:08] Over in `post-editor-01-markup.js`, let's `import React from 'react'` here. We'll make a `function Editor` and we'll `export` that `Editor`. With that, now we're getting an invariant violation because it's not actually returning anything, so let's `return` a `form`. OK, cool.

#### post-editor-01-markup.js
```js
import React from 'react'

function Editor() {
  return <form />
}

export {Editor}
```

[01:25] Now it's saying it's unable to find a label with a text of title. Let's make a label with a text of title. Label, title. There we go. Now it says it's found a label with the text title, however, there's no form control found associated to that label. I'll make sure you're using the four attribute or the aria-label by attribute correctly.

[01:45] Let's go ahead and make an `input`. There are various ways to associate this input with this label. What we're going to do is I'm going to give an `id` to this `input` called `title-input` and then on the label, we'll say `htmlFor="title-input"`.

```js
function Editor() {
  return ( 
    <form>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" />
    </form>
  )
}
```

[01:59] Now those two are associated, let's move on to our next error, which says it's unable to find a label to the text of content. We're basically just going to do the same thing, except this is going to be a `textarea`. Instead of `title`, we want this to be `content` and we'll capitalize the C here.

```js
function Editor() {
  return ( 
    <form>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />
    </form>
  )
}
```

[02:16] Now we're good. Now we need tags, so we're going to do the same thing again, except this instead of `title` will be `tags`. Again, this will be capital T there. Now it's looking for an element with the text of submit, but it can't find it. Let's add our `submit` button, `button`, `type` of `submit` and text is `submit`. 

```js
function Editor() {
  return ( 
    <form>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <textarea id="tags-input" />

      <button type="submit">Submit</button>
    </form>
  )
}
```

Now our test is passing.

[02:38] This is the red-green-refactor cycle. The idea is, you start out with a test that is red. It's failing. Then based on that test, you create the code that's necessary to make that test pass, and no more than the code that's necessary to make it pass.

[02:54] This makes your design of your component more intentional. You're thinking from the outside in. With tools like those provided by React Testing Library, it becomes pretty trivial to implement the test first and then have the test guide the design of the component that you're building.
