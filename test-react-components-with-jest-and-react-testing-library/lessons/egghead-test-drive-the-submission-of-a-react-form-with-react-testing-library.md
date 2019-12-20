Kent C Dodds: [00:00] We have a passing test for our post `Editor`. Now we want to make it so that when the user clicks submit, the submit `button` is disabled. That way, they can't submit multiple posts by accident. Here, in our test, I'm going to get our `submitButton`, so we can click on it.

### tdd-02-markup.js
```javascript
test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  getByText(/submit/i)
})
```

[00:14] I'll say, `const submitButton = getByText(/submit/i)` Then we need to fire an event, so I'm going to pull in `fireEvent`. We'll come back down here and say `fireEvent.click()` on that `submitButton`. Then we can `expect(submitButton).toBeDisabled()`. That's the red part of our red/green refactor cycle.

```javascript
test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
})
```

[00:34] Let's go ahead and make this test pass. In `post-editor-02-markup.js`, first, I'm going to add a `disabled` prop here in the `button`, that'll depend on `this.state.isSaving`. Then I'll have that `state = {isSaving: }`. We'll initialize it to `false`. Then we need to have a form submit handler, so I'll add an `onSubmit={this.handleSubmit}` to the `form`.

[00:53] We'll declare that here, `handleSubmit` equals an arrow function that takes an event, and will `preventDefault`. Then we'll say `this.setState({isSaving: true})`. Our test is now passing. As far as the refactor phase goes, I don't really think there's anything in here that I care to refactor, so we'll go ahead and leave it as it is.

### post-editor-02-markup.js
```javascript
class Editor extends React.Component {
  state = {isSaving: false}
  handleSubmit = e => {
    e.preventDefault()
    this.setState({isSaving: true})
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input id="title-input"/>

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input"/>

        <label htmlFor="tags-input">Tags</label>
        <input id="tags-input"/>

        <button type='submit' disabled={this.state.isSaving}>
          Submit
        </button>
      </form>
    )
  }
}
```

[01:14] In review, what we needed to do here is, we got our `submitButton`, we fired a `click` event by getting the `fireEvent` utility from `react-testing-library`. Then we expected the `submitButton` to be `disabled`. That gave us a broken test. Then we went into our `Editor`, and we added the necessary `disabled` prop here, and the `state`, and a submit handler, to make that test pass.

### tdd-02-markup.js
```javascript
test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
})
```
