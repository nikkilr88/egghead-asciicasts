## Essential Questions

- When should I use a useEffect?
- Why is it good to define asynchronous functions inside useEffect?

---

## Transcript
Instructor: [00:00] First thing we're going to do is **import the useEffect hook.** Then we'll go below our useState call, and we will call it.

[00:10] Before we do anything, let's take a look at what kind of information React tells us about useEffect through the JSDoc. We can see **useEffect is an imperative function that can return a cleanup function. It accepts a function that contains imperative, possibly effective code.** It's not super helpful, but let's take a look a look at the call signature.

[00:31] There are **two parameters, an effect, which is mandatory, and then an optional deps**. Here, deps stands for dependencies, and we know **it's an array of any.** We'll take a look at how that works in one second.

```js
export function FeedbackEffectComponent() {
  const [text, setText] = useState('')
  useEffect(() => {
    console.log('logging from the useEffect hook')
  }, [])

  ...
}
```

[00:47] Let's go ahead and pass an anonymous function just like this. So we can see how the effect hook works, let's throw in a console log. We'll save that, and then we'll do two more things.

[00:59] We'll go, and we'll change the name of this to `FeedbackEffectComponent`. We'll go to the bottom, and we'll change the title to effect example. Then we'll go into our app, and we'll import it. We'll add it, and now we should see it come up. Cool. Now we have our class example and our function example from the previous video in our new effect example.

[01:23] We can see our new log statement. Let's clear the console, refresh the page, so we see it right there. Let's see what happens when we start typing. This is being logged, and it's being logged on every keypress. That's why we see 17 here.

[01:40] Now let's mess around with the dependencies array, the second argument on the useEffect function. If we go back, scroll up, and here, **let's add an empty array and see what happens**. We'll clear the console, refresh the page. We see it's run. If we start typing, it is no longer logged.

[01:57] It's basically like us saying to React, **"Hey, here is my useEffect, here's the function, and here's an array of values I want you to watch in order to know when you should call my effect again."**

[02:10] Let's pass in **a value that's dynamic, so text,** because we're changing text when we type. If we go back and we refresh, we should see the console log because of the initial render. React calls our effect, which we see here. Then if we start typing, **because we told React to observe that value, we should see our log on every keypress. You see I've typed in two letters, he, and you see it's logged twice.**

```js
export function FeedbackEffectComponent() {
  const [text, setText] = useState('')
  useEffect(() => {
    console.log('logging from the useEffect hook')
  }, [text])

  ...
}
```

[02:36] Now let's take a look at **how you might use this to fetch data from a third-party API.** I'm going to delete this block and replace it with some code that I wrote prior to this lesson. We'll walk through it before we execute it. This is an async function called getStarWarsQuote.

[02:52] We're getting some initial text, **we're awaiting a fetch call to this API**, which gets a random Star Wars quote. We're parsing it into JSON. **Once we have the payload, we just need Star Wars quote. We assign that do a variable called quote, and then we're calling our setText with that new quote.**

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
}, [])
```

[03:09] That's all in this **async function**. That's all it does. We're calling it inside of our anonymous function, the first argument passed to useEffect. **We're putting an empty array as our dependency array, because we only want this to run on the initial render.** Let's take a look. If we refresh the page, you'll see that we get our quote.

[03:31] Let's go back. You're probably wondering why we're doing some of these things. **Why are we defining this function inside of our anonymous function?** You're probably thinking, "Can't you define it outside and call it inside?" You could, but there's a few gotchas.

[03:45] Let's copy and paste this and try a few of those things. First thing we'll do is **take our function and call it outside.** Let's try this and see what happens. **You can see that works, and that's fine. We've moved our function declaration outside, and then we call it inside our useEffect. That certainly works.**

[04:06] Now let's see if we can **make our anonymous function async.** We'll add the async keyword. What we'll do is return a quote, and we'll move this underneath here. We'll say quote=await this. Now let's take a look. It still works, but now we have this warning in the console, **"Effect callbacks are synchronous to prevent race conditions. Please put the async function inside."**

```js
async function getStarWarsQuote() {
    // Get initial text
    const response = await fetch(
      'http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote'
    )
    const data = await response.json()
    const quote = data.starWarsQuote
    return quote
  }

useEffect(async () => {
  const quote = await getStarWarsQuote()
  setText(quote)
}, [])
```

[04:29] Notice how we have this helpful error message. This is thanks to an ESLint plugin, which comes out of the box with create-react-app. You've even got a helpful link if you want to read more. **Here's the rule, react-hooks/ exhaustive-deps.**

[04:44] You can see there's a few gotchas that might get you, but if we follow some of these patterns, then we can ensure that we're not breaking any rules. We'll go back to the way we had it and leave it like that. That's how you use the effect hook in function components.
