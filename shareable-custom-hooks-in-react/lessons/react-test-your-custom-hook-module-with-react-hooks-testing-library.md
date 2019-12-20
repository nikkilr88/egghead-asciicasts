## Essential Questions

- What do you want to test in a custom hook?
- Why should custom hooks be tested?

---

Instructor: [00:00] To **test our custom hook module we're going to be using a library called react-hooks-testing-library.** Looking at the insulation docs, first we need to install @testing-library/react-hooks as a devDependency. I'm using Yarn, so I'm going to run yarn add-D and then @testing-library/react-hooks.

[00:20] The next thing we'll want to do is **make sure we have the correct peerDependencies.** If you take a look, it says, **"The minimum supportive version of React, React-test-renderer, is 16.9.0.** We'll check if we have that version in our package.json. We don't. To install that, we'll run yarn add-D-React@16.9.0 Last, **we'll add react-test-renderer@16.9.0 as a devDependency.** Great. Now we have the library and we have our dependencies updated. If we scroll up, you'll see that we already have a test script in place. Let's go ahead and run yarn test and see if things are working. Looks like we got an error.

[01:00] If we scroll up, we'll see this is because we have updated React and now we have a mismatch in some dependencies. In this case, React scripts is complaining about ESLint. We don't really need to worry about this. **If we scroll down, we'll see we can skip the check by creating a .env file with SKIP_PREFLIGHT_CHECKS=true.**

[01:20] We'll go ahead and do that. Add your .env SKIP_PREFLIGHT_CHECK=true, just like that. If we run the command again, we no longer get that error, but instead get a different error that no tests were found. If you take a look, you can see that it's looking for files in the source directory that end in spec or tests because that's the default.

[01:41] We'll go ahead and rename this file to tests.spec.js. Now if we run it again, we'll see we get a different error. This error is because our test failed and that's because we no longer have a hook called useMyHook. But now we know that we can run tests. What we're going to do is write a test for our hook.

[02:00] To save us some time, I'm going to paste in a block to get us started. **The first thing we're doing is importing a function called RenderHook from the package we just installed. Next thing we're doing is importing our hook.** Now if we take a look at our described block in our three tests, here's the things we're going to be testing.

[02:19] **We'll make sure that our hook returns an object with the givs "loading" and "quote."** We'll also test to make sure **that loading is set to true after the initial call**, and we'll **make sure that we get a quote and loading has been set to false.** Let's get started. RenderHook is a function which accepts a callback function.

```js
import { renderHook } from '@testing-library/react-hooks'
import { useStarWarsQuote } from './'

describe('useStarWarsQuote', () => {
  test('should return an object with the keys: loading, quote', () => { })

  test('should set loading to true after initial call', () => { })

  test('should return a quote and set loading to false', async () => { })
})
```

[02:36] That callback function calls our hook, and then RenderHook gives that back to us as an object with a key called "result." I wrote a note here, **result.current will contain the value returned by our hook**, our object.

[02:50] What we can do is write our first assertion saying expect results.current to have property loading. We'll run that and it passes. To keep this going as we're writing our test, we'll run yarn test -- watch.

```js
test('should return an object with the keys: loading, quote', () => {
  // result.current = the value returned by our hook
  const { result } = renderHook(() => useStarWarsQuote())

  expect(result.current).toHaveProperty('loading')
  expect(result.current).toHaveProperty('quote')
})
```

Now we've started it in watch mode. Great, part one is done of the first test. We're going to duplicate this line.

[03:13] Instead of asserting for the property loading again, we're going to look for quote. It passes, we'll delete that comment, and now let's move on to the next test. **We're testing to make sure that loading is set to true after the initial call.** We'll copy this line, we'll paste it here, we'll copy this assertion and we'll paste it here.

[03:33] What we'll say is we expect result.current.loading to be true. If we run it again, it passes.

```js
test('should set loading to true after initial call', () => {
  const { result } = renderHook(() => useStarWarsQuote())
  expect(result.current.loading).toBe(true)
})
```

I'll delete this comment and we'll move on to the last test. We'll copy this, we'll paste it here, and so loading will be true. We've already tested that so we don't need to anymore. Instead, what **we're going to do is test for our quote, but there is one thing.**

[03:58] **The quote doesn't come right away**. Luckily, what we can do is essentially wait for an update to happen. In addition to deconstructing result, **we can deconstruct something called "wait for next update." That returns a promise and we can await it. What we can say is, "Hey, we expect result.current.quote."**

[04:21] Actually what we're going to do is say "type of," and we expect it to be a string. If we rerun, we're passing. Because it returns a random Star Wars quote, we can only make generic assertions. We'll make sure that it's a string or we'll write another assertion that says it shouldn't be null. We'll say expect result.current.quote.not to be null.

[04:45] The other thing we'll track is we'll make sure that it's not an empty string. Then last thing we'll do to satisfy our test block is check to make sure that result.current.loading is false. If we run it again, it passes. Great. That's how you write tests for your custom hook module.

```js
test('should return a quote and set loading to false', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStarWarsQuote())

    await waitForNextUpdate()
    expect(typeof result.current.quote).toBe('string')
    expect(result.current.quote).not.toBe(null)
    expect(result.current.quote).not.toBe('')
    expect(result.current.loading).toBe(false)
  })
```
