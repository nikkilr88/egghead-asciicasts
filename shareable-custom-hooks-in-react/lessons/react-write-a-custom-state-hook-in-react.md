## Essential Questions

- Why do custom hooks start with `use`?
- Do you always have to return 2 items in an array in a custom hook?

---

Instructor: [0:00] Starting where we left off in the previous video in feedback.effect.js, we're going to copy everything, create a new file called feedback.custom.js and paste that in. **To write our first custom State Hook, all we're going to do is be refactoring this part of our code (the set state call).**

[0:19] Remember, we're using one piece of state right now called text, and we have a function called setText which allows us to update that value. Up near our import statements, **we're going to add a function called useText. We're calling our custom state hook useText because we're following the pattern presented by React.**

[0:40] We have useState, useEffect, all of the other Hooks start with use. That's how you know that it's this custom hook. Our function is going to take an initial value, then we'll define the function block. Here, all we're going to do is cut this and paste it here. We're going to change our empty string to the initial value that's passed in when calling our function.

```js
function useText(initialValue) {
  const [text, setText ] = useState(initialValue)
  return [text, setText]
}
```

[1:06] Then we're going to **return an array of text and setText.** We're going to leave this as it is right now. We'll come back and refactor in a second. To use it, we're going to go back inside of our component and call it just like we did before with our array destructuring, but instead of calling useState, we're going to call useText because that's the name of our custom state hook.

[1:28] For initial value, we're going to pass in an empty string. You can see this looks almost identical to the useState call we had earlier. **Remember we're doing array destructuring. We are taking two elements. The first element we're naming "texts." That'll be our value. The second element we're naming "setText." All is the same here.**

```js
export function FeedbackCustomComponent() {
  const [text, setText] = useText('')

  ...
}
```

[1:48] Now we're going to make two changes. We're going to call this `FeedbackCustomComponent`, and then we're going to go towards the bottom and change the title to "custom example." Then we'll go into app and import our new component. Now if we go into the browser, we'll see our custom example.

[2:05] If we take a look, let's try typing and submitting. If it works, we should see "Hello." It's still working using our custom hook. Let's head back and let's clean this up a bit. **We know that useState returns an array containing two elements, the state value and the function to update it. We're destructuring it as text and setText.**

[2:31] Instead of destructuring it and then returning a new array with those two values, let's just return this useState call. Because again, we know what it's returning so we return that in our custom hook, and then when we call it, we do the destructuring there. Let's go back to the browser and verify this works. You'll notice two things.

```js
function useText(initialValue) {
  return useState(initialValue)
}
```

[2:52] One, we have a new warning from React. **React hook useEffect has a missing dependency setText.** Let's fix that real quick. **setText no longer comes from useState but it comes from our custom hook. Because of that, React isn't really sure what it is and since we're using it inside of our useEffect, it wants us to add it as a dependency just in case it changes.**

```js
useEffect(() => {
    async function getStarWarsQuote() {
      // Get initial text
      const response = await fetch(
        'http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote'
      )
      const data = await response.json()
      const quote = data.starWarsQuote
      setText(quote)
    }
    getStarWarsQuote()
  }, [setText])
```

[3:17] We'll go ahead and add that in and if we clear the console and refresh, we no longer have that warning and our useEffect is still working. Now let's verify that the text and setText is still working. Cool. It's still working. As you can see, that's how you write a custom state hook.
