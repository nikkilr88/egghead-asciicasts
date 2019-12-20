Instructor: [00:01] I have these two assertions here in `jest.dom.js`. The error message that I get if I make some sort of typo isn't super helpful. So if I make a typo. The error message I'm going to get is `'type error cannot read property type of null'`.

[00:12] What I was talking about right here is query selector for that input is going to return null. I'm trying to access type on there. It would be nice if I can get a nicer error message, and even nicer if I could get some more descriptive assertions so that as I'm reading my code, I can understand exactly what the intended assertion is for this code.

[00:31] Luckily for us, there is a module out there in the testing library family of tools called `jest-dom`. This allows a bunch of custom Jest matchers to test the state of the DOM.

[00:40] I already have this installed. I'm going to `import {toHaveAttribute} from '@testing-library/jest-dom'`. Then I'm going to say, Hey, expect, I want to extend your capabilities to have a `toHaveAttribute` assertion, which I'm getting from `jest-dom` here. With that, now I can change `toBe` to `toHaveAttribute`. I'll go back here. We'll get rid of the type.

#### jest-dom.js
```js
import {toHaveAttribute} from '@testing-library/jest-dom'

expect.extend({toHaveAttribute})

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  expect(div.querySelector('label').textContent).toHaveAttribute('Favorite Number'))
})
```

[01:02] Now I'm saying, "Hey, the node that I'm passing to expect, I expect that to have an attribute of number." The attribute that should have that value is the type attribute. I'm saying the node that I'm passing to expect should have a type that is a number.

[01:17] This makes my assertion in the code a lot clearer for people maintaining the code. If we open up our tests, we're going to see a better error message saying, "Hey, I received a value received in the expect, which must be an HTML element or an SVG element. And I received a value of null." I can't even make the assertion, because I'm not getting the proper data.

#### Terminal
```bash
expect(received).toHaveAttribute()

received value must be an HTMLElement or an SVGElement. Received has value: null
```

[01:37] That makes it a lot easier for me to understand what is going on here. I can fix that typo, save that, and my test is passing. We also have a `toHaveTextContent` assertion here. We'll import `toHaveTextContent`. We'll add that to the extensions we're providing to expect.

[01:53] We can get rid of `textContent`. Put `toHaveTextContent` here. 

#### jest-dom.js
```js
import {toHaveAttribute, toHaveTextContent} from '@testing-library/jest-dom'

expect.extend({toHaveAttribute, toHaveTextContent})

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number'))
})
```

Our test is passing. If we make some typo here, then we're going to see that better error message here as well. There are a whole bunch of assertions that we can pull in from here from `jest-dom`. It would be really annoying to have to do expect extend here.

[02:09] One thing that we can do is we could just say `import * as jestDOM`. We could just extend expect `jestDOM`. That's a little bit nicer. 

```js
import * as jestDOM from '@testing-library/jest-dom'

expect.extend(jestDOM)
```

It'd be even nicer if we didn't have to do these two lines of code at all. What we can do instead is simply import the file `extend-expect`, which is basically doing the same thing.

```js
import '@testing-library/jest-dom/extend-expect'
```

[02:30] Even better, I have just configured in this project to automatically import this in every test. I can just get rid of that import and have those assertions available to me. Our test is passing like magic.

[02:44] What we did in this one is, I showed you how to set up jest-dom and use some of the assertions that jest-dom has available to you. If you look through the jest-dom documentation, you'll see there are a whole bunch of custom matchers that are added to the expect assertions.

[02:58] That makes it a lot easier to read tests that are interacting with the DOM, as well as get better error messages when you're making assertions on DOM nodes.
