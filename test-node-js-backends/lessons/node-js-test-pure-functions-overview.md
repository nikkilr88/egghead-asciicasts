Instructor: [00:00] Testing pure functions is one of the nicest things that you can do because pure functions are pretty simple to test. Here, we just give you a little bit of background on what a Jest test looks like.

There's a reference to the expect assertion library documentation as well as the test global variable that you can use.

[00:19] The thing that makes testing pure functions so simple is because the return value is the same for the same arguments, and its valuation has no side effects. There's no extra setup that you need to do when you're testing pure functions. Because of these properties, pure functions are typically easy to test.

[00:37] For this particular exercise, we're going to be working in this `auth.js` file, which you can find in `src/utils/auth.js`. If you scroll down here to the `isPasswordAllowed` method, that's the method that we're going to be writing tests for.

#### auth.js

```javascript
function isPasswordAllowed(password) {
  return (
    password.length > 6 &&
    // non-alphanumeric
    /\W/.test(password) &&
    // digit
    /\d/.test(password) &&
    // capital letter
    /[A-Z]/.test(password) &&
    // lowercase letter
    /[a-z]/.test(password)
  );
}
```

[00:52] The file that you'll be writing those tests in is under the `src/utils/__tests__/auth.exercise.js`. Here, you'll have your emoji telling you what to do here.

![Emoji](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575569059/transcript-images/01_node-js-test-pure-functions-overview-emoji.jpg)

[01:06] To get this test running, we'll `run npm t`. That will start our test in watch mode.

![Watch Mode](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568631/transcript-images/01_node-js-test-pure-functions-overview-watch-mode.jpg)

I'm going to use the `p` key to filter to just this file, so `auth.exercise`. We want the one in `utils`.

![Pattern Match](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572532/transcript-images/01_node-js-test-pure-functions-overview-pattern-match.jpg)

I'll run that one. Go ahead and write a few tests for this, and I'll come back and we'll work through the solution together. There are also a couple extra credit in here. Be sure to take a look at those as well.

![Extra Credit](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568630/transcript-images/01_node-js-test-pure-functions-overview-extra-credit.jpg)
