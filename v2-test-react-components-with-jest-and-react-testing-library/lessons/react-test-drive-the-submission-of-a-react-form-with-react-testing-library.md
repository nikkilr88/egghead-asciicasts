Instructor: [00:01] The next thing I want my form to do is that when you click on the Submit button, it disables that Submit button.

[00:05] In `tdd-02-state.js`, what we're going to do here is I'll have `submitButton` and we're going to `fireEvent.click(submitButton`). Let's grab `fireEvent` from React testing library and then we'll `expect(submitButton).toBeDisabled()` from Jest down there.

#### tdd-02-state.js
```js
test('renders a form with title, content, tags, and a submit button', () => {
  const {getBYLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  getByText(/submit/i)
})
```

[00:21] With that, we're getting our red in the red, green, refactor cycle. Let's go ahead and make that pass. We're going to add an onSubmit handler here to handleSubmit. We'll make a function `handleSubmit`.

[00:33] This is going to take the event. We'll say e.`preventDefault` to prevent a full page refresh, pretty typical on your forms. Then, we need to have some state here. I'm going to use React `useState` for `isSaving` and `setIsSaving`. We'll default that to `false` and then we'll say `setIsSaving` to `true`.

```js
function Editor() {
  const [isSaving, setIsSaving] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
  }
  return (
    <form onSubmit={handleSubmit}>
    ...
  )
}
```

[00:52] Down in our `button`, we'll have a `disabled` prop based on `isSaving`. 

```js
<button type="submit" disabled={isSaving}>Submit</button>
```

That gets our test green. We have the red, green, refactor cycle.

[01:02] I don't see anything in here that I want to refactor, and not anything in my test that I want to refactor, but it's always something good to double check. What we did here is, we already had the getBy text, we grab the submitButton from that. We fired a click event on that submitButton and expected the submitButton to thereafter be disabled.

[01:20] Then, in our implementation we said, "Hey, let's add a handleSubmit on our form. We'll prevent the default full page refresh." We set the isSaving state, which we added. Then we base our disabled state on the button on that isSaving state. That gets our test passing.
