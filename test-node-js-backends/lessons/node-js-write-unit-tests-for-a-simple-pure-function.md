Instructor: [00:00] All right, so we're testing this `isPasswordAllowed` method. There are a couple of cases that we want to test for here.

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

First off, I'm going to remove this, follow Barry the Bombs instructions here. Marty the Moneybag is helping us `import` this function from the `auth` module. We're going to grab that.

#### auth.exercise.js

```javascript
import { isPasswordAllowed } from "../auth";
```

[00:16] Then, we want to write tests for the valid and invalid passwords. Here are some examples that we can use for those cases.

```javascript
// valid:
// - !aBc123
//
// invalid:
// - a2c! // too short
// - 123456! // no alphabet characters
// - ABCdef! // no numbers
// - abc123! // no uppercase letters
// - ABC123! // no lowercase letters
// - ABCdef123 // no non-alphanumeric characters
```

What I'm going to do is I'll get rid of that. We'll leave that for reference. I'll say, test('isPasswordAllowed returns true for valid passwords').

```javascript
test("isPasswordAllowed returns true for valid passwords", () => {});
```

Great. Then, we'll `expect` `isPasswordAllowed`, so we'll call that with this valid example here.

[00:41] We'll expect that to be `true`. It should return `true` because that's a valid password.

```javascript
test("isPasswordAllowed returns true for valid passwords", () => {
  expect(isPasswordAllowed("!aBc123")).toBe(true);
});
```

There's not really any logic in here that indicates there are any other types of valid passwords. There's not really any reason for me to add a bunch of other cases for valid passwords here.

[00:57] I'm going to leave that as it is. We're going to add a test for invalid passwords.

```javascript
test("isPasswordAllowed returns false for invalid passwords", () => {});
```

With this, I'm going to do a little multiple cursor magic. Each one of these are basically going to be like this, except we expect it to be `false`.

[01:16] I'm going to grab all of these. We'll get rid of that. Start it off with a string. Then I'm going to grab all of those, get rid of that, end it with a string, and then we'll `expect(isPasswordAllowed(` We'll call it with that, `toBe(false)`.

[01:33] Now let's move this up here. Move all these up here together, get rid of that, and save that.

```javascript
test("isPasswordAllowed returns false for invalid passwords", () => {
  expect(isPasswordAllowed("a2c!")).toBe(false);
  expect(isPasswordAllowed("123456!")).toBe(false);
  expect(isPasswordAllowed("ABCdef!")).toBe(false);
  expect(isPasswordAllowed("abc123!")).toBe(false);
  expect(isPasswordAllowed("ABC123!")).toBe(false);
  expect(isPasswordAllowed("ABCdef123")).toBe(false);
});
```

Boom, here we go. We've got two passing tests.

![Passing Tests](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572535/transcript-images/02_scikit-learn-write-unit-tests-for-a-simple-pure-function-passing-test.jpg)

Now it's really important that we make sure that these tests can fail.

[01:48] Probably the best way to do that to make sure, that you're actually testing what you think you are, is by making it change to the code that you think you're testing.

If I change this to greater than `16`, then I should get a failure on that first test because that is no longer a valid password if we have a length of `16` as a requirement.

#### auth.js

```javascript
function isPasswordAllowed(password) {
  return (
    password.length > 16 &&
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

![Failing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568733/transcript-images/02_scikit-learn-write-unit-tests-for-a-simple-pure-function-failing-test.png.jpg)

[02:09] Then we can also get rid of this, and that ensures that we can fail our second test because we're not checking for non-alphanumeric characters.

```javascript
function isPasswordAllowed(password) {
  return (
    password.length > 6 &&
    // non-alphanumeric
    // /\W/.test(password) &&
    // digit
    /\d/.test(password) &&
    // capital letter
    /[A-Z]/.test(password) &&
    // lowercase letter
    /[a-z]/.test(password)
  );
}
```

We are indeed testing the code that we think we're testing. It's capable of passing and failing, which is good.

[02:24] In review for this one, what we did was `import` the function that we want to test. We created a test for one use case, and then created another test for the other use case that this function supports. We simply called a function and assert its result. That's why pure functions are nice to test. There's no set-up and clean-up necessary for these kinds of tests.
