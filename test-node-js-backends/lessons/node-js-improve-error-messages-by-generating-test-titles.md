Instructor: [00:01] For the extra credit here, we want to reduce duplication. In our case, we have one giant test that results in less helpful error messages.

Let's take a look at what those less helpful error messages are if I go ahead and break this test and then we open up our terminal.

#### auth.js

```javascript
function isPasswordAllowed(password) {
  return (
    password.length > 6 &&
    // non-alphanumeric
    /\W/.test(password) &&
    // digit
    ///\d/.test(password) &&
    // capital letter
    /[A-Z]/.test(password) &&
    // lowercase letter
    /[a-z]/.test(password)
  );
}
```

We're going to get an error here and it does show me that I'm getting this error message.

![Console Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572532/transcript-images/03_scikit-learn-improve-error-messages-by-generating-test-titles-console-error.jpg)

[00:23] Jest is really nice because it shows me exactly which one of this is failing. It's not exactly telling you why it's failing because this doesn't have any label that indicates what part of the code this is actually trying to test.

[00:34] The error message on the test title isn't all that helpful either because it's not telling me specifically which one of these test are failing. That's what we're going to work our way toward.

[00:43] What I'm going to do in reducing this duplication is I'm going to actually create a `describe` block for all of these tests. We'll do `describe is password allowed only allows some passwords`. Then we're going to have `allowedPasswords`.

#### auth.exercise.js

```js
describe("isPasswordAllowed only allows some passwords", () => {
  const allowedPasswords = [""];
});
```

That's going to be this password here `!aBc123`.

That is an allowed password.

```js
describe("isPasswordAllowed only allows some passwords", () => {
  const allowedPasswords = ["!aBc123"];
});
```

Then we'll have our `disallowedPasswords`. That'll be an array of all of these.

[01:09] Let me do some more multiple cursor magic here. We'll get rid of all of that. We'll come back on this side. Then we'll take all of this, move it up here. I forgot to put a comma there. Let's do that really quick, comma. Boom.

```js
describe('isPasswordAllowed only allows some passwords', () => {
  const allowedPasswords = ['!aBc123']
  const disallowedPasswords = [
    'a2c!',
    '123456!',
    'ABCdef!',
    'abc123!',
    'ABC123!',
    'ABCdef123',
  ]
}
```

Cool, we've got allowed and disallowed. For all of our allowedPasswords, `forEach` of these, we're going to take a `password` and we'll add a `test` for each one of these.

```js
allowedPasswords.forEach(password => {
  test();
});
```

[01:36] We're dynamically generating these tests.

We'll say this allows password. We'll get rid of that warning. We'll `expect isPasswordAllowed` with that `password` `toBe` `true`.

```js
allowedPasswords.forEach(password => {
  test(`allows ${password}`, () => {
    expect(isPasswordAllowed(password)).toBe(true);
  });
});
```

Then we'll do something similar for the `disallowedPasswords` except this will be `false`.

```js
disallowedPasswords.forEach(password => {
  test(`disallows ${password}`, () => {
    expect(isPasswordAllowed(password)).toBe(false);
  });
});
```

Cool. Let's go ahead and get rid of this stuff. We'll save that.

[02:01] Now if we look at that error message we're going to see it looks like we forgot to save this disallow. There we go. Now we have this `disallows` this particular password, makes it a little bit easier to see which one of these is failing. We don't have to look through the stack trays.

![Disallow](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572532/transcript-images/03_scikit-learn-improve-error-messages-by-generating-test-titles-disallow.jpg)

[02:16] The stack trays and code frame is less helpful now because it's some generic code. At least our test title is a little bit more clear and we're not repeating ourselves so much in this test. This function itself is not all that complicated. Let's go ahead and fix that.

[02:32] Often, you're going to have a pure function that is really complicated and therefore, will require a much larger suite of tests. Sometimes, adding an abstraction around how your tests are generated could be really, really useful.

[02:43] In fact, let me show you an example. This is an open-source project I have called [rtl-css-js](https://github.com/kentcdodds/rtl-css-js/blob/master/src/__tests__/index.js). It's a complicated pure function that takes CSS and converts it into the right-to-left version of that CSS, margin-left to margin-right, and so on and so forth.

[02:59] In here, we have this giant array of all the different types of inputs and outputs that you can have from this particular function, which is pretty complicated. Ultimately, all this does is it creates a `testFn` function for each one of these. It calls `test` inside of Jest.

[03:15] The nice thing about having this kind of an abstraction around our test is because it makes it so it's easy for people to add new tests. If they say, "You forgot the translate 30 with the space," then, we can just add that, make sure that our pure function covers that.

[03:31] People coming in to the project have a really easy time adding new tests. They spend 10 seconds figuring out how this abstraction works, then they're off to the races. They don't have to worry about copy-pasting.

[03:42] If we were to duplicate all of this stuff, having an individual test, or even an individual insertion for each one of these, then this file would certainly be a lot longer than 469 lines.

[03:52] Another example of this is [match-sorter](https://github.com/kentcdodds/match-sorter/blob/master/src/__tests__/index.js). That's another one of my libraries that does something like this. Here, we're using an object where the property name is the title of the test. We could be a little bit more descriptive of what these inputs and outputs are supposed to be testing.

#### match-sorter/blob/master/src/**tests**/index.js

```js
const tests = {
  'returns an empty array with a string that is too long': {
    input: [['Chakotay', 'Charzard'], 'JonathanJonathan'],
    output: [],
  },
  'returns an empty array with a string that matches no items': {
    input: [['Chakotay', 'Charzard'], 'nomatch'],
    output: [],
  },
  'returns the items that match': {
    input: [['Chakotay', 'Brunt', 'Charzard'], 'Ch'],
    output: ['Chakotay', 'Charzard'],
  },
```

[04:08] That also makes it easy for people to jump in and say, "Hey, we need to make sure we handle keys with a max ranking." We write our `input`, we write our `output`, and it's clear just by looking at this test, what this function is supposed to be doing.

[04:22] In our case, maybe it's a little bit of an over abstraction to jump into this right away. To be quite frank, I would probably have left it to the way that it was. Often, you're going to be writing tests for pure functions that are pretty large, have a lot of complicated logic in them. Having a small abstraction to generate some of these tests and the test titles can be useful.
