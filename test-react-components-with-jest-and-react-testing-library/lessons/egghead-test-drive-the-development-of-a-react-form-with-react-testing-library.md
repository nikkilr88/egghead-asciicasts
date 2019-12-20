Kent C Dodds: [00:00] I'm going to start with a test that is `'renders a form with title, content, tags, and a submit button'`. Then we're going to get our `getByLabelText` and `getByText`. The `getByLabelText` will help us get our form controls, and the `getByText` will get us our submit button.

[00:18] Then we're going to `render` our `Editor`, and we need to pull in a couple things here. I'm using React, so we need to `import React from 'react'`. Then we'll `import {render} from 'react-testing-library'`. Then we're rendering our `Editor`, so we're going to `import {Editor} from '../post-editor-01-markup'`.

### tdd-01-markup.js
```javascript
import React from 'react'
import {render} from 'react-testing-library'
import {Editor} from '../post-editor-01-markup'

test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
})
```

[00:37] Now, I'm going to go ahead and `getByLabelText`. I don't care about the casing here, so I'm going to use a `title` with an ignore-case flag. We're going to get the form control that has a `label` called `title`. We'll do the same thing for `content` and `tags`.

### tdd-01-markup.js
```javascript
test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  getByText(/submit/i)
})
```

[00:52] Then I'm going to `getByText` to get my `submit` button. Now, if I open up my test here, I can see here that my test is failing. It's because this post-editor markup doesn't have anything that it's exporting. It's completely blank.

[01:06] Let's go ahead, and we'll `import React from 'react'`. We'll create a React component called `Editor`. Then we'll have it `render` a `form`. Then we'll `export {Editor}`.

### post-editor-01-markup.js
```javascript
import React from 'react'

class Editor extends React.Component {
  render() {
    return <form />
  }
}

export {Editor}
```

Great. Now, we're onto our next error message, "_Unable to find label with the text of: /title/i_"

[01:23] Let's go ahead and `render` a `label` with a text of title. Let's `<label>Title</label>`. Great. Now, it says it found that `label`, but there was no `form` control associated to that `label`. Let's make a `form` control. In our case, that's an `input`.

[01:38] Now, we need to associate this `label` with this `input`. There are various ways to do that. What we're going to do is an `htmlFor="title-input"`. Then on our `input`, we'll add `id="title-input"`. Then we'll save that, and we've moved onto our next error.

### post-editor-01-markup.js
```javascript
class Editor extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="title-input">Title</label>
        <input id="title-input"/>
      </form>
    )
  }
}
```

[01:53] _Unable to find a label with the text of: /content/i_. We can go ahead, and we'll just copy this. We'll change title to content. We'll capitalize this inner text. Instead of an `input`, we want this to be a `textarea`. Cool.

### post-editor-01-markup.js
```javascript
class Editor extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="title-input">Title</label>
        <input id="title-input"/>

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input"/>
      </form>
    )
  }
}
```

[02:08] Now, we have tags to deal with. Let's go ahead, and we'll copy this. We'll change this to `tags`, make this inner text capital. Now, it's _Unable find an element with the text of: /submit/i_. Let's go ahead, and we'll make a `<button type='submit'>Submit</button>`. That gets our test passing.

### post-editor-01-markup.js
```javascript
class Editor extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="title-input">Title</label>
        <input id="title-input"/>

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input"/>

        <label htmlFor="tags-input">Tags</label>
        <input id="tags-input"/>

        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

[02:28] That gets our test passing. This is the **red-green refactor cycle of test-driven development**.
First, you write your test for the thing that you're going to be implementing. That makes your test red, because you haven't implemented the thing that you're building yet.

[02:39] Then you go and implement it, going methodically, one step at a time, until your test is passing.
Then there's an important step of refactoring after you've gotten the red to the green. In our case, there's not really anything I care to refactor here.

[02:54] I'm going to leave it as it is, but make sure that you think about the refactor step of the red-green refactor cycle, otherwise you could wind up with some pretty nasty code.
