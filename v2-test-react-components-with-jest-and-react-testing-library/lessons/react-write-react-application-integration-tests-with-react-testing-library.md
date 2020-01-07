Instructor: [0:01] Here we have a simple [app](https://github.com/kentcdodds/react-testing-library-course/blob/tjs/src/app.js) that has a multipage form. We have state that's going across these pages. If I click on "Fill Out the Form," then I have my favorite food I can enter, which is enchiladas. Then we can go "Next," and that's my favorite drink -- raspberry lemonade.

[0:18] Then we'll review. We'll see my favorite food and favorite drink, and we can click on "Confirm." "Congrats, you did it." Now we can go back Home, fill out the form again for all time and all eternity. Let's go ahead and see how we can test this thing.

[0:31] Here's how it's implemented. In `app.js`, we have this `MultiPageFormProvider` so that we can access this state across these pages, and we have this `useMultiPageForm` custom hook, and then we have our `Main` screen. Fill Out the Form, then `Page1`.

[0:44] That's going to get our history from react-router. We can go to `Page2` when this form is submitted. We get that `form` value and `setFormValues` to update that form value. Then we have our links to go Home and go Next.

[0:56] `Page2` is pretty similar to before where we have our favorite drink. We can fill out our favorite drink value and then go to the review page, and then this review page we have the ability to `Confirm` the values that it's printing out to us.

[1:10] Then we have the `Success` page, and in the event of an error we'll see an error message, and it all comes together in this `App` component that uses React `<Router>` to render out these different pages.

[1:21] This is also managing our `MultiPageFormProvider` with the initial values of food and drink being emptying strains. We want to test all of this together. Let's get started. In `app-01.js`, I'm going to `import React from 'react'`. We'll `import {render, fireEvent} from '@testing-library/react'`, and we'll `import App from '../app'`.

#### app-01.js
```js
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from '../app'
```

[1:43] One thing that I want to make sure that we don't do with this app is make HTTP calls, and we do that on this confirm page where we call this `submitForm`. I want to mock that out, and that's coming from our `./api.js`. I'm going to say `jest.mock('../api')` so we don't make real HTTP calls, and then I'm going to make my `test`.

```js
jest.mock('../api')

test('', () => {

})
```

[2:02] This is going to say it `'Can fill out a form across multiple pages'`. I know this is going to be `async` test, so I'll just add `async` there right now. I also know that `submitForm` is going to be called, so I'm going to import `submitForm`, and I'll alias that to mock `submitForm` from our api.

```js
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {

})
```

[2:21] Right from the get-go I'm going to say `mockSubmitForm`, `mockResolveValueOnce`, `success: true` so what our server would send back if we were to hit the API directly. Then let's go ahead and make some `testData`. We'll have our food test food and our drink will be our test drink, and then let's `render` this app.

```js
test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolveValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  render(<App />)
})
```

[2:43] We know we're going to need to `getByLabelText` so we can fill out that form. We'll also need `getByText` so we can click on some buttons. Let's pull out `debug` so that we can follow along as we go.

```js
const {getByLabelText, getByText, debug} = render(<App />)

debug()
```

[2:55] I'll save that, open this up. Here we are on the home screen. Let's click on fill out the form. We'll say `fireEvent.click(getByText())`. Let's make this a pretty generous regex, so `fill.*form` ignore case. If we change it to fill out the form or fill the form out, or whatever we change it to, that should find the text and it should work pretty well. 

```js
fireEvent.click(getByText(/fill.*form/i))
```

We'll click on that.

[3:19] We move on to that next page. Here we are with the favorite food. Let's fill that out by saying `fireEvents.change(getByLabelText(/food/))` ignore case. We're going to say the `target` for this change event should have a `value` that is sent to our `testData.food`. 

```js
fireEvents.change(getByLabelText(/food/i), {target: {value: testData.food}})
```

Set that. There we go, our test data food. Perfect.

[3:40] Now, we're going to move on to the next page by `fireEvent.click(getByText)`. What does it say? Next? We'll say `next`. 

```js
fireEvent.click(getByText(/next/i))
```

We'll save that. Now we're on the favorite drink page.

[3:51] We'll do something pretty similar to the last page. This will be by labeled text `drink`. The value for this one will be `testEata.drink`. On this page, we don't have a next button. That's why that's failing. We'll have a `review` button. Let's update `next` to `review`. 

```js
fireEvents.change(getByLabelText(/drink/i), {target: {value: testData.drink}})
fireEvent.click(getByText(/review/i))
```

Save that.

[4:08] Now we're on the confirmation page. Let's verify that the `span` that is label by the food label, so favorite food. Get by label favorite food, get by label favorite drink, and we'll verify that those values are correct.

[4:24] We can `expect`, `getByLabelText`, `food,` `toHaveTextContent`, `testData.food`. 

```js
expect(getByLabelText(/food/i)).toHaveTextContent(testData.food)
```

Save that.Our test is still passing. We'll do the same thing for our drink, test-data.drink. 

```js
expect(getByLabelText(/drink/i)).toHaveTextContent(testData.drink)
```

We're good.

[4:39] Now, we can `fireEvent.click()` on the confirmation button, `getByText`, `confirm`. 

```js
fireEvent.click(getByText(/confirm/i))
```

We'll click on that. We should be on the next page.

[4:52] Oh, but we're getting multiple elements with the text confirm. That is not intentional. We're not going to use the all by variants of the query. It looks confirm is showing up in this H2 as well as our button. That's pretty common.

[5:05] What we're going to do here is we'll just say `selector: button`. We'll scope this get by text to only those elements that match the CSS selector button. 

```js
fireEvent.click(getByText(/confirm/i, {selector: 'button'}))
```

We'll save that. Now we have clicked on confirm, but we're not moving on to the next page. Why is that?

[5:20] Let's take a look at what happens when we click on that button in `app.js`. We're going to come down here to our `Confirm` component, and when we click on Confirm, we're going to submit the form. That's going to be an asynchronous operation.

[5:31] The next thing that we're looking for is the home link that's on the success page. Let's choose to do some asynchronous waiting for that link to show up. To do that, we're going to bring in `findByText` back in `app-01.js`. We'll come down here and we'll `await findByText`, `home`, to find that home link, we'll save that.

```js
const {getByLabelText, getByText, debug, findByText} = render(<App />)

...

await findByText(/home/i)
```

[5:49] Now, after that mock request has been made, we get this, "Congrats, you did it!" and now we have that "Go home" link. Let's go ahead and fire an event on that. Let's say, `fireEvent.click`, and that should take us to "Welcome home" again. Then we can just say, getByText('Welcome home') and that's just as good as an assertion for us.

```js
fireEvent.click(await findByText(/home/i))

getByText(/welcome home/i)
```

[6:10] If we want to make it look a little bit more like an assertion, then we can just say, `expect`, `toBeInTheDocument()`. 

```js
expect(getByText(/welcome home/i)).toBeInTheDocument()
```

There we go.

[6:18] Now, because we're mocking out this request, let's just make sure it's being called properly. We'll get rid of `debug`. We'll come down here, right where it's being called, and we'll, `expect(mockSubmitForm).toHaveBeenCalledWith()`, and let's see what it's called with. Looks like, Drink and Test Foods.

[6:36] That's just our test data, so I'll save that. We've got that passing. Let's make sure it's only called once. We don't want it to be called more than one time. 

```js
const {getByLabelText, getByText, findByText} = render(<App />)

...

expect(mockSubmitForm).toHaveBeenCalledWith(testData)
expect(mockSubmitForm).toHaveBeenCalledTime(1)
```

Good, we've got a really good test here for this entire application.

[6:50] We're not mocking out a whole lot. We're testing our React router, we're testing navigating between pages, we're testing our state provider. All of that is happening just by rendering this app and interacting with our app in the same way our end user would.

[7:04] The only things that we are mocking out are API calls. We don't actually make API calls to the back-end server during our tests. That's something you'd reserve for end-to-end tests.

[7:14] Here, we start out, we click on Fill Out the Form, we fill out the Food value, then click on Next. We fill out the Drink value, click on review. We make sure that the review data is what it should be. We click on Confirm, we make sure our mockSubmitForm is being called properly.

[7:28] We wait for the home link to show up, and when it does, we click on it, and then we verify that we have made it to the home page. This gives us a ton of confidence in a pretty reasonable test.
