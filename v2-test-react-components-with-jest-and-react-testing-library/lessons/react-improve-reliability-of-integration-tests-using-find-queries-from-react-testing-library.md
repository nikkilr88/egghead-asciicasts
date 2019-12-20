Instructor: [00:01] We have our test passing and that's great, but there's something that we could do to make this test maybe a little bit more resilient. That is, we are expecting to be able to do getbys on all of these labels and text elements that we are clicking on.

[00:14] It could be that when transitioning from one page to another, there's some sort of animation or some sort of data load that's happening before we make that transition happen. To make our test a little bit more resilient, maybe we could just change all these getbys to findbys and await all of those wrong nodes to be found so that we get the retryability that comes baked in with React as the library.

[00:35] Let's go ahead and try that. I'm going to use multiple cursor magic here and we're going to go change all these getbys. We going to do `await findby...` and then we'll get rid of the awaits up in the `const` and now we have two findby text so we'll get rid of that.

#### app-02.js
```js
test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, findByText} = render(<App />)

  fireEvent.click(await findByText(/fill.*form/i))

  fireEvent.change(await findByLabelText(/food/i), {
    target: {value: testData.food},
  })
  fireEvent.click(await findByText(/next/i))

  fireEvent.change(await findByLabelText(/drink/i), {
    target: {value: testData.drink},
  })
  fireEvent.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  fireEvent.click(await findByText(/confirm/i, {selector: 'button'}))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  fireEvent.click(await findByText(/home/i))

  expect(await findByText(/welcome home/i)).toBeInTheDocument()
})
```

[00:48] We'll hit save and wow, it's like magic. It just magically worked. We just basically find replace all the getbys and now they are findbys with awaits in front of them. It doesn't actually change the way that our test looks a whole lot but it does make our test a little bit more resilient.

[01:04] If we made some changes on one of these pages to make some sort of asynchronous thing happen before we can navigate to the next page like we were actually doing with clicking on confirm, then we don't have to make any updates to our tests.

[01:16] We've actually separated ourselves even further from the implementation details. That's the kind of thing that's really useful for an integration test like this one, which can have so many points of failure.

[01:26] By that, I mean, there are so many things that you can change in your app that could result in breaking this test that you want to make this test as separated from implementation details as possible. Using React testing libraries `findBy` variant of all the queries is one way to do that.

[01:40] In review, to make this work. We simply took all of the getbys and did a find-replace to replace them with findbys and add the awake keyword in front of those because the findby queries are all asynchronous. They automatically retry when the DOM is changed until they timeout.

[01:55] That actually did not result in increasing our test time very much at all. It's really fast.
