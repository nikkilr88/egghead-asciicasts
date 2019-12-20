Instructor: [00:01] Another thing that we can do to further separate ourselves from the implementation details of all of the components that we're testing together is by using `userEvent` from the testing library family of tools. We're going to `import user from '@testing-library/user-event'`.

#### app-03.js
```js
import user from '@testing-library/user-event'
```

[00:16] User is going to fire a bunch of events, not just one event on all of these elements that we're interacting with, which makes it a little bit more realistic. Instead of `fireEvent.click`, we'll just do `user.click`. Instead of `fireEvent.change`, we'll do `user.type`.

[00:32] For each one of this, we no longer have to provide this `target: {value}` nonsense. We'll just do exactly what we want the user to type. Let's make sure we don't have anymore `fireEvent` in here. Oh, let's get rid of the import for that and we'll save that. Now our test is passing with flying colors.

```js
import React from 'react'
import {render} from '@testing-library/react'
import user from '@testing-library/user-event'
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, findByText} = render(<App />)

  user.click(await findByText(/fill.*form/i))

  user.type(await findByLabelText(/food/i), testData.food)
  user.click(await findByText(/next/i))

  user.type(await findByLabelText(/drink/i), testData.drink)
  user.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  user.click(await findByText(/confirm/i, {selector: 'button'}))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  user.click(await findByText(/home/i))

  expect(await findByText(/welcome home/i)).toBeInTheDocument()
})
```

[00:51] This results in a test that is frankly quite a bit easier to read, easier to maintain, and is further separated from the implementation details of our component. In fact, one of the really cool things about keeping implementation details out of tests like this is that you can totally change the implementation without breaking the test.

[01:08] That gives you a lot of confidence that your refactor is working properly. I took a liberty of taking the app and rewriting it to use Reach Router instead of React Router, which is what it was using before.

[01:21] With the Reach Router version, if we change this to `app` to `app-reach-router`, we're importing the Reach Router version of the app. 

```js
import App from '../app-reach-router'
```

All of the tests are passing just as well, which is super awesome, in my opinion.

[01:33] That also means, if we wanted to change State Management from React Context to Redux, for example, or to really anything else, our tests should continue to pass. It would give us the confidence that we're looking for as we're making refactors. Keep those implementation details out of your integration tests.