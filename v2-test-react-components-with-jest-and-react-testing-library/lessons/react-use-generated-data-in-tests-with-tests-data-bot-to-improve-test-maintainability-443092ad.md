### tdd-06-generate-data.js
```js
test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  const preDate = new Date().getTime()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  const postDate = new Date().getTime()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
```

Instructor: [00:01] We're going to do a little bit of a refactor on this test. One thing that I think is really important is that when you have some test data, it's a really great idea to actually generate that data for a couple of reasons.

[00:11] Firsts of, it makes your test a little bit more helpful because if you generate some data that you weren't really counting on, then it can show you a failure in that scenario. You can add some code to fix that scenario.

[00:21] Secondly, it allows you to communicate through the way that your code is written. What is actually important about this test? Is it really important that the `title` is exactly `'test title'` or does it really not matter what that `title` value is? That's the kind of thing that I want to communicate with my test.

[00:35] We're going to use a library to help us generate some of this data. It's called `test-data-bot`. We have that installed already, so I'm going to import something from that `test-data-bot`. The things that I need are `build`, `fake` and `sequence`.

```js
import {build, fake, sequence} from 'test-data-bot'
```

[00:48] With that, I'm going to come down here to create a `postBuilder`. This is going to use build `post` and here are the `fields` for my post -- a `title`. With that, I'm going to use a `fake` and this callback is going to accept an argument. This is actually another library called Faker. With Faker, we're going to use `lorem.words`. We're going to create a bunch of random words.

[01:11] Then for our `content`, we'll make a fake `lorem.paragraphs`. Then for our `tags`, we'll make a fake and for this one, we'll return an array of `f.lorem.words`. Let's do three of those. If we really wanted to get crazy about this, we could actually make this array random. It would have three items one time, two items another time, zero items for another time, but we'll make it simple right now.

```js
const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs()),
  tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})
```

[01:37] Then we're going to need a `userBuilder` and here we'll build `User` and here are the fields -- just an ID. This one's going to be a `sequence` so that they're all unique. We'll say, `sequence` and this is going to take our sequence number and we'll say, "User-" and then the sequence number. Great.

```js
const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`),
})
```

[01:55] Now instead of making a fake user with an object literal, we'll call it `userBuilder` and then instead of our fake post here, we'll call `postBuilder`. With that, now we have our fake user and our fake post that are being generated.

```js
test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()
  const preDate = new Date().getTime()

  ...
}
```

[02:11] We can look at our tests and say, "OK, nothing special about this user. It's just some regular user. Nothing special about this post. It's some regular post." If there was something special, we could say, "Hey, the content here needs to be something special."

```js
test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder({content: 'something special'})
  const preDate = new Date().getTime()

  ...
}
```

[02:24] Now I can see, "OK, this is really important, that the content is something special," because that's going to influence my test and the way that this editor operates in some way. In our case, there's nothing special about any of these. We'll just leave that as it is. Oh no, we have a problem.

[02:41] What the problem is, is Faker actually adds an extra new line in a paragraph here. When you put that into a text area that gets stripped out. What we're going to do is we'll just make this easy and say replace all/Rs globally and replace those with an empty string. Now everything's working fine.

```js
const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})
```

[02:59] In review, what we're doing here is we imported `build`, `fake`, and `sequence` from the `test-data-bot` package so we could generate a couple of pieces of data. We have our `postBuilder` for building an object with title content and tags properties, and a `userBuilder` for building a user object with an ID. Then we replaced our object literals with function calls to those things.

[03:19] Now our test communicates more clearly what's important about this test.
