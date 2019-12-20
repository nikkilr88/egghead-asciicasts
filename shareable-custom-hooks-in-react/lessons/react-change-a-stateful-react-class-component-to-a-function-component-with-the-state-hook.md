## Essential Questions

- How do hooks increase the shareability of logic?
- Why use hooks instead of class components?

---

Instructor: [00:00] This is what we're going to be working with, a simple class component, should look pretty familiar. This is what it gives us, a simple feedback text area, which we can submit to an API, which is just console logging our texts that we add.

[00:18] First thing we're going to do is copy all of this and create a new file called feedback.function.js, where we'll refactor it. First thing we'll do is import useState, which is the State Hook that we're going to be using. Next thing we'll do is export a function.

[00:37] We'll add the parentheses, and then we'll delete until here and make it just a simple function, `FeedbackClassComponent` that we're exporting. Next thing we'll do, we'll take a look...this is how State is declared in a class component. We're going to delete that and instead **use the State Hook**. We do that by **declaring an array which returns two elements, the first being the actual value, in this case text, and then a function normally called SET and then the name of the value.**

[01:09] That is something that we're destructuring from **useState**. There, we pass an initial value, `''`. To backup, we have some array destructuring, we have the first value which is text, the second value which is a function to update that and then when we call useState, we pass the initial value. You can get this when you hover over useState.

```js
export function FeedbackFunctionComponent() {
  const [text, setText] = useState('')

}
```

[01:32] You see a return to Stateful Value, and a function to update it. That's our state. Now let's go through and start updating these functions. Handle submission. **We need to add the function keyword.** Inside of our console log, we need to change this.state, dot text instead to text.

```js
function handleSubmit(e) {
    e.preventDefault()
    console.log(`Submitting response to API: "${text}"`)
    setText('')
  }
```

[01:52] Then when we reset text to back to an empty string, what we need to do instead is **just call setText and we can just pass in our empty string.**

You can see it's starting to look a lot cleaner. We do the same thing here. Function, and then instead of calling this.setState, what we'll do is call setText and we pass in our new value.

```js
function handleTextChange(e) {
    const updatedText = e.target.value

    setText(updatedText)
  }
```

[02:21] Next thing we'll do is delete this render method, because we don't need that anymore. We don't need to call this.handleSubmit. We just need to call handleSubmit. Here we just need value to be text and here we just call handleTextChange. Now what we'll do is change this to our function example and at the top, what we'll do is change this to feedback function component.

```js
export function FeedbackFunctionComponent() {
  const [text, setText] = useState('')

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault()
    console.log(`Submitting response to API: "${text}"`)
    setText('')
  }

  // Update text in state onchange for textarea
  function handleTextChange(e) {
    const updatedText = e.target.value

    setText(updatedText)
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Title>Function Example</Title>
      <Label>
        Have feedback for our team? <br /> Let us know here 👇
          <Textarea
          value={text}
          onChange={e => handleTextChange(e)}
        />
      </Label>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

[02:57] Then we'll go into App, and we'll import feedback function component from components/feedback/feedback.function. Cool. Then we'll go down here and we'll use it and now if we take a look, we'll have two. We'll just make sure that it's still working. We'll see that it is. That's how you change a stateful class component into a function component with the State Hook.
