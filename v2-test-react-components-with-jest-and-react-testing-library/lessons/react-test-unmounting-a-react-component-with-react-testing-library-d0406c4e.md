Instructor: [00:01] Here we have this countdown timer in `countdown.js` that starts out with 10,000 milliseconds of remaining time. Then it kicks off an effect that sets an interval to count down that remaining time that is being rendered at the bottom of the file. When we're unmounted, then we're going to clear the interval, or if we reach the end of our remaining time, then we clear the interval as well.

[00:18] Let's go ahead and test this cleanup behavior in our useEffect. We're going to go into this `unmounting.js` test. We're going to `import React from 'react'`. We'll `import {render} from '@testing-library/react'`. We'll `import [Countdown} from '../countdown'`.

#### unmounting.js
```js
import React from 'react'
import {render} from '@testing-library/react'
import [Countdown} from '../countdown'
```

[00:34] Then we'll have a test that says, `'does not attempt to set state when unmounted'`. We'll just say, `to prevent memory leaks`. It's an important thing to do. What we're going to do is we'll `render` that `Countdown`.

```js
test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  render(<Countdown />)
})
```

[00:48] Because what we're testing is the cleanup phase, we're going to grab `unmount` from render. Then we'll call unmount. Then we'll expect what? I don't know. What would happen if we had something broken here? If we didn't have this `clearInterval` here in `countdown.js`, then we would continuously run this interval and call set the remaining time. React would log an error. Let's go ahead and make that assertion.

[01:08] Expect console error not to have been called at all. We're going to need to spy on that. We'll say, `beforeAll`, `jest.spyOn(console, 'error'). We'll mock the implementation to do nothing so that we keep our console clean.

[01:24] `afterAll`, we'll do `console.error.mockRestore()` so that we keep our tests isolated from each other. Also, a good practice here is `beforeEach`, we'll say, `jest.clearAllMocks` between all of our tests.

```js
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

beforeEach(() => {
  jset.clearAllMocks()
})

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  const {unmount} = render(<Countdown />)
  unmount()
  expect(console.error).not.toHaveBeenCalled()
})
```

[01:39] Now we can make that assertion that console error is not called. We'll open up our terminal. Yup, our test is passing. Console error was not called. That's actually not awesome. Let's comment this `expect` out.

[01:50] Oh, our test is still passing even though we're not cleaning up after ourselves. This is why it's really important that you make sure you can break your test. Otherwise, you might not be testing what you think you are.

[02:01] What's going on here is it takes so long for that 10 seconds to happen that our test finishes and everything goes away before Jest has an opportunity to notice that there was some problem. Let's go ahead and we'll leave that commented out. We'll try to reveal this bug.

[02:14] What we need to do is use Jest feature for fake timer so that we can make this happen quicker. We'll say `jest.useFakeTimers`. After we unmount, we're going to say `jest.runOnlyPendingTimers`. 

```js
test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  jest.useFakeTimers()
  const {unmount} = render(<Countdown />)
  unmount()
  jest.runOnlyPendingTimers()
  expect(console.error).not.toHaveBeenCalled()
})
```

Now we're getting an error. That's exactly what we want.

[02:29] Here we expected number of calls to be zero, but it actually was called twice, once for `act` and once for that warning on performing a state update on an unmounted component. This act problem is actually a real problem.

[02:41] Let's go ahead and we'll import that `act` utility from `testing-library/react`. 

```js
import {render, act} from '@testing-library/react'
```

Then we'll wrap our run-only pending timers with `act`. This will be one of the few times that you need to use act when you're using `testing-library/react` utilities, is when you're using Jest fake timers.

```js
test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  jest.useFakeTimers()
  const {unmount} = render(<Countdown />)
  unmount()
  act(() => jest.runOnlyPendingTimers())
  expect(console.error).not.toHaveBeenCalled()
})
```

[02:58] We'll save that. Now we've gotten rid of that warning, which is great, but we still have this bug. That's exactly what we're looking for. Now we can fix that bug by commenting back in our `clearInterval` from `countdown.js`. Now our test is passing.

[03:09] One other thing that I want to do here is when we say `jest.useFakeTimers`, if we had any other tests in here that weren't expecting `jest.useFakeTimers`, that would be problematic. Before each one of our tests, we'll set Jest to use real timers.

[03:23] Actually, you know what? It'd probably better to do after each because this is more of a cleanup thing than a setup thing, for both clearing and using real timers.

```js
afterEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers()
})
```

[03:31] In review, what we had to do here was we imported all the stuff we needed, the countdown in particular. Because we're going to be making assertions on the console, we're setting up beforeAll to spy on the console and mock its implementation so we don't mock up our console output. afterAll, we restore our console error to its original implementation so that our tests don't leak.

[03:50] After each one of these, we're going to clear all the mocks to keep our tests isolated and use real timers for the same reason. At the beginning of our test, we're going to use fake timers. We'll render that countdown. We'll grab the unmount. We'll immediately unmount it.

[04:03] Then using act utility so that the state-ups happen improperly and effects are flushed correctly. Then we'll call jest.runOnlyPendingTimers so we can make sure that if there is a problem, we'll be made aware of it. We make our assertion that console error was not called.

[04:18] Again, it's really important to make sure that you're testing what you think you are. A great way to do that is to go into your implementation, cause some sort of bug, and make sure that your test can reveal that bag. That's exactly what we did by commenting out the clearInterval right here. We get our test failing. Let's put that back. Save that. Our test is passing. We're good.
