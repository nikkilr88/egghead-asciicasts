## Essential Questions

- Why is an object returned from useStarWarsQuote?
- When do you want to abstract a useEffect call into a custom hook?

---

Instructor: [00:00] Starting where we left off in feedback.custom.js in the previous video, we're going to write our custom effect hook in this here file. First thing we're going to do is declare a function called useStarWarsQuote. Then inside of there, we're going to actually just copy this effect, all of it, and we'll refactor it.

[00:22] We'll paste that in, and there's a few things we need to do. First thing we're going to do is **keep track of our quote in a piece of state.** We're going to declare a const and we're going to call it quote and set quote Eagles useState, and we're going to pass in an empty string to initialize it.

```js
function useStarWarsQuote() {
  const [quote, setQuote] = useState('')
  useEffect(() => {
    async function getStarWarsQuote() {
      setLoading(true)
      // Get initial text
      const response = await fetch(
        'http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote'
      )
      const data = await response.json()
      const quote = data.starWarsQuote
      setQuote(quote)
    }
    getStarWarsQuote()
  }, [])

  return { quote }
}
```

[00:40] When we get the quote, instead of calling setText because we no longer have that in this function, we're going to call setQuote. We'll return an object with quote. The other thing we're going to do is provide a LoadingState. Up here we're going to say loading, setLoading, same thing, =useState. Initialize it to false, because that's going to be a Boolean.

[01:02] When **our function runs, we're going to setLoading to true. When we get the quote, we'll setLoading to false.** The last thing we're going to do is **return loading in the object.** Now let's go down here, and let's actually use it.

```js
function useStarWarsQuote() {
  const [quote, setQuote] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getStarWarsQuote() {
      setLoading(true)
      // Get initial text
      const response = await fetch(
        'http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote'
      )
      const data = await response.json()
      const quote = data.starWarsQuote
      setQuote(quote)
      setLoading(false)
    }
    getStarWarsQuote()
  }, [])

  return { quote, loading }
}
```

[01:17] We know that we're going to get back quoteUnloading, so we're going to use some object destructuring, and we're going to call useStarWarsQuote. Then what we're going to do is add an effect. We're going to say useEffect, as in our anonymous function, and inside here we're going to say if quote console.log. We're going to factor this in a second.

[01:38] For our dependency array, we want to watchQuote. Let's just make sure that it's working. We no longer see our quote. That's good. We see it's console.logged. We have a warning because we're not using loading, but we'll use it in one second. Now what we can do is call setText in passing a quote.

[01:54] **We know if quote's defined, then we'll have it and we can set the text.** Same thing as before, React will want us to pass this in as a dependency. Let's take a look. You can see that it's working, but we're still not using loading. Let's see how we might use that. One way we might use that, we might say ifLoading return paragraph, and we'll say loading.

```js
export function FeedbackCustomComponent() {
  const [text, setText] = useText('')
  const { quote, loading } = useStarWarsQuote()

  useEffect(() => {
    if (quote) {
      setText(quote)
    }
  }, [quote, setText])
  ...
}
```

[02:14] If we go back and if you saw, it's showed loading up there. We might make this a little bit better. Instead, what we might do is say if Loading do this, if Quote return this, and then otherwise **React's going to yell at us if we don't return anything, so we'll just return null.**

```js
export function FeedbackCustomComponent() {
  ...

  if (loading) return <p>Loading...</p>

  if (quote) {
    return (
      <Form onSubmit={e => handleSubmit(e)}>
        <Title>Custom Example</Title>
        <Label>
          Have feedback for our team? <br /> Let us know here 👇
        <Textarea value={text} onChange={e => handleTextChange(e)} />
        </Label>
        <Button type="submit">Submit</Button>
      </Form>
    )
  }

  return null
}
```

[02:36] To go over that one more time, if Loading's true, we render a paragraph tag with loading. IfQuote is true, meaning we have a quote, then show our normal feedback app.

[02:46] Otherwise a component must return something, in this case we'll return null. This will prevent React from complaining. There we go. Again, you can make this look a lot prettier but you get the idea of how it works. If you take a look, writing our custom effect hook looks like this. We kept two pieces of state, quote and loading.

[03:07] **We used an effect which made it a asynchronous call to a third-party API to get a random quote. We set some values and we returned an object because then the end-user could destructure these elements from the names that they are, quote and loading rather than having to guess with an array.**

[03:25] **In array destructuring, does quote come first or does loading come first? This makes it easier for the end-user. That's how you write a custom effect hook.**
