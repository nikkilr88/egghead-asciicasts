Instructor: [00:01] Our next extra credit here is to use a module called [jest-in-case](https://github.com/atlassian/jest-in-case). It is a really awesome module. I use it all the time. This is just a quick example of how to use this module.

#### auth.js

```javascript
import cases from "jest-in-case";

cases(
  "add",
  opts => {
    const result = add(opts.a, opts.b);
    expect(result).toBe(opts.result);
  },
  {
    "sum of the two given numbers": {
      a: 1,
      b: 2,
      result: 3
    }
  }
);
```

Let's go ahead and apply this to our test here now.

[00:14] We already have it installed in the project, so I can just `import cases from jest-in-case`. I'm going to create `cases` for `isPasswordAllowed`. These are going to be our valid passwords. For this, this is going to be my test function that's going to take my `options` for each one of my tests.

#### auth.exercise.js

```javascript
import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

cases(
  'isPasswordAllowed: valid passwords',
  (options}) => {
  }
)
```

[00:34] I'm going to `expect(isPasswordAllowed` for `options.password` to be `true`.

```javascript
import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

cases(
  'isPasswordAllowed: valid passwords',
  (options}) => {
      expect(isPasswordAllowed(options.password)).toBe(true)
  }
)
```

Let's go ahead and put all my cases in here.

I'm going to use the object form of this API. We're going to say `valid password`, and that `options` object is going to have a `password` property, and that's where I'm going to grab this valid `password` right here.

```javascript
import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

cases(
  'isPasswordAllowed: valid passwords',
  (options}) => {
      expect(isPasswordAllowed(options.password)).toBe(true)
  },
  {
    'valid password': {
      password: '!aBc123',
    }
  }
)
```

[00:59] We'll save that, and if we pump open our test, we're going to see this isPasswordAllowed right there, and our valid password is totally working.

![Case isPassword Allowed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568733/transcript-images/04_node-js-use-jest-in-case-to-reduce-duplication-and-improve-test-titles-case-ispassword-allowed.jpg)

Let's go ahead and move the rest of these. I'm going to add a new cases here. This is going to be `isPasswordAllowed`.

[01:15] You know what, let's just go ahead and copy-paste this. Come on, let's not waste anybody's time. `IsPasswordAllowed`, and these are going to be our `invalid passwords`. We'll expect those to be `false`, and then we're going to have a couple disallowedPasswords here.

```javascript
cases(
  "isPasswordAllowed: invalid passwords",
  options => {
    expect(isPasswordAllowed(options.password)).toBe(false);
  },
  {}
);
```

[01:28] Let's move all those up here, and we'll rework some of these things. We don't have a valid password for this case, and then we're going to have a password that's `too short`. That's what this first one is, `password`. It's going to be this thing.

```javascript
cases(
  "isPasswordAllowed: invalid passwords",
  options => {
    expect(isPasswordAllowed(options.password)).toBe(false);
  },
  {
    "too short": {
      password: "a2c!"
    }
  }
);
```

[01:43] For this next one, it has no letters. That's why it's invalid, so `no letters` and that's going to be `password` for that one. For this next one, it's invalid because it has `no numbers`, so let's say that's our `password` right here.

```javascript
cases(
  "isPasswordAllowed: invalid passwords",
  options => {
    expect(isPasswordAllowed(options.password)).toBe(false);
  },
  {
    "too short": {
      password: "a2c!"
    },
    "no letters": {
      password: "123456!"
    },
    "no numbers": {
      password: "ABCdef!"
    }
  }
);
```

[02:00] Then this next one has `no uppercase letters`. That's there. We have `no lowercase letters`, and here's our `password` here for this one. `no non-alphanumeric characters`.

```javascript
cases(
  "isPasswordAllowed: invalid passwords",
  options => {
    expect(isPasswordAllowed(options.password)).toBe(false);
  },
  {
    "too short": {
      password: "a2c!"
    },
    "no letters": {
      password: "123456!"
    },
    "no numbers": {
      password: "ABCdef!"
    },
    "no uppercase letters": {
      password: "abc123!"
    },
    "no lowercase letters": {
      password: "ABC123!"
    },
    "no non-alphanumeric characters": {
      password: "ABCdef123"
    }
  }
);
```

[02:22] With all of those, now if we pop open our test, we're going to see that they're all passing.

![Test Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575569000/transcript-images/04_node-js-use-jest-in-case-to-reduce-duplication-and-improve-test-titles-test-passing.jpg)

What's really cool about this is it's going to show me exactly why each one of these is passing or failing. If I make a breaking change to this function, and I see that the test is failing, I'm going to see it's failing because I'm now allowing `no uppercase letters`, whereas before, I disallowed that.

![Test Failing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568825/transcript-images/04_node-js-use-jest-in-case-to-reduce-duplication-and-improve-test-titles-test-failing.jpg)

[02:43] The code frame isn't all that helpful in this case because it's generic code, but our title is what's really helping us out here. The nice thing about using `jest-in-case` is we are able to have this little abstraction over the common test cases. We can give a specific title for each one of these inputs, which makes things a lot nicer when we look at the error messages in our test output.

[03:06] In review to make this work, we have our `cases` from `jest-in-case`. We made `cases` for `isPasswordAllowed` for the valid passwords and then `cases` for `isPasswordAllowed` `invalid passwords`. Then we just moved our valid password here for one case in that one and then our invalid passwords with the description for why they're invalid on this one. That gives us nice, clear test titles.

[03:29] Again, this may feel like a little bit of an over-abstraction for this simple function and you may think, "Ah. I just could have written an individual test case for each one of this and it wouldn't have been that big of a deal." I agree with you.

[03:41] Again, if you're writing a pure function that is pretty complicated and it's going to have a lot of different cases that you're going to be writing test for, then having the abstraction like this can be really helpful.

[03:51] If your pure function is as simple as this simple function right here, I agree with you. I probably stick with the more simple duplicated version of this test. You will definitely run into situations where it makes more sense to have a little bit more abstraction.
