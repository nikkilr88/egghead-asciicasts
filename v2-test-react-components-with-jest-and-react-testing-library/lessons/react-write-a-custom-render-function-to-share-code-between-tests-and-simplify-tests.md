Instructor: [00:01] Our component is finished, but I want to show you one other thing before we wrap things up. That is, often you're going to have many tests for your component, and lots of those tests are going to look the same.

[00:10] Between those two tests, we have creating a `fakeUser`, rendering the editor, and getting the `submitButton`, clicking on the `submitButton`. There are several things that are going on in both of these tests that are similar, and it would be nice if we could combine that logic. If only JavaScript had some mechanism for reducing code duplication.

[00:28] Wait, no, it does. It's called a function. That's what we're going to use here. The benefits of this is going to be a little less pronounced for our use case. In a typical real-world application with typical real-world components, you're going to find this to be very useful.

[00:41] What we're going to do here is, I'm going to make a function called `renderEditor`. We're not going to take any arguments here. What I'm going to do is take all of this stuff and just move it up here. That's pretty specific to our happy path test, but everything else works out totally fine for both of our tests.

[00:58] We're going to leave all that stuff in here. Then, I'm going to return an object that has all the things that our test might need, so the `fakeUser`, `fakePost`, maybe the `submitButton`.

[01:11] You know what? All these utilities that we get back from here, let's just call that `utils`, and we'll spread all of those here as well. Then we'll have to update each one of this to be `utils`, and this will also need to be `utils`. Great, so now we have our `renderEditor`.

```js
function renderEditor() {
  const fakeUser = userBuilder()
  const utils = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()

  utils.getByLabelText(/title/i).value = fakePost.title
  utils.getByLabelText(/content/i).value = fakePost.content
  utils.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = utils.getByText(/submit/i)
  return {
    ...utils,
    submitButton,
    fakeUser,
    fakePost,
  }
}
```
[01:24] Let's take this down here, we'll call it `renderEditor`, and we get our `submitButton` from that. Let's see, what else we need, the `fakeUser` and `fakePost`. If we save that, then our test should be passing still, which it is, so perfect. That was a clean refactor.

```js
test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const {submitButton, fakePost, fakeUser} = renderEditor()
  const preDate = new Date().getTime()

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })

  ...
}
```

[01:39] Next, let's go ahead and reuse this in this test. We'll get rid of all this stuff, we'll say `renderEditor` and we get our `submitButton`, and we also get `findByRole`, and that's it. Our test is still passing, so we're in the clear.

```js
test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const {submitButton, findByRole} = renderEditor()

  fireEvent.click(submitButton)

  const postError = await findByRole('alert')
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
```

[01:55] This is just a regular JavaScript refactor, where you found some logic that was similar between these two tests, and so we wanted to generalize that into a function. This is a really important point. You can take a look at these tests and they're significantly simpler.

[02:08] Now we can say, I have 30 tests in this file, and all of them are calling this `renderEditor` thing. I'm just going to spend a couple of seconds figuring out what `renderEditor` does.

[02:17] Then I'll go in here and see, the difference between these two tests is, this one is marking resolved value once, and this one's marking rejected value once. I have the clutter of all the common things between these tests, making it harder to determine the differences.

[02:31] You can have as many of these render functions as you want. These render functions can also accept arguments, so you can customize some of the things. The sky is totally the limit on how you want to do this. It really depends on the component that you're testing and the kinds of tests that you have for that component.

[02:45] I find that in typical, larger, and more complex components, having a special render method for that to simplify your tests is a real huge benefit.
