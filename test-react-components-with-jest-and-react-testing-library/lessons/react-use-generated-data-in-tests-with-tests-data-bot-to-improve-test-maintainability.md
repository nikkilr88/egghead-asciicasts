Kent C Dodds: [00:00] We have this `fakeUser` and this `fakePost`, and it has properties on there that may or may not be totally relevant to how this thing functions. One thing that I think is important in testing is that your test communicates the things that are important for this test.

### tdd-06-generate-data.js
```jsx
const fakeUser = {id: 'user-1'}
const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
const fakePost = {
  title: 'Test Title',
  content: 'Test content',
  tags: ['tag1', 'tag2'],
}
const preDate = Date.now()
```

[00:14] Whether or not the `title` is called `'Test Title'`, that doesn't matter. That's irrelevant. Same with the `title` and the test `content`. What we're going to do is, we're going to generate these values using a library on NPM, so we can communicate to maintainers of our test that these things actually do not matter.

[00:31] The library is called `test-data-bot`. We're going `import` some things from the `test-data-bot`. We'll `import {build, fake, sequence}`. Then down here, we're going to create a few builders. We'll make a `postBuilder`, and that's going to `build('Post')`.

[00:47] It'll have some fields, `title: fake(f => f.lorem.words())`. It's going to be fake words. This `f` value is actually from another module called `faker`. It has the capability of generating a lot of random things.

### tdd-06-generate-data.js
```jsx
import {build, fake, sequence} from 'test-data-bot'
...
const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
})
```

[01:02] Then we'll create `content: fake(f => f.lorem.paragraphs())`. Then we'll take `title`. This is going to be another fake value. This one is going to be an array. `tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()])`.

### tdd-06-generate-data.js
```jsx
const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs()),
  tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})
```

[01:24] Then we'll make our `userBuilder`. We'll say `const userBuilder`. We'll `build` a `'User'`. That has `fields`. We only really care about one field, and that's the `id`. This one's going to be a `sequence` and that sequence number,.

### tdd-06-generate-data.js
```jsx
const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`)
})
```

[01:40] We'll say `user-${s}`. Great. Now here, our `fakeUser` can be a `userBuilder`. We can build a user. Our `fakePost` can be a `postBuilder`.

### tdd-06-generate-data.js
```jsx
const fakeUser = userBuilder()
const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
const fakePost = postBuilder()
const preDate = Date.now()
```

[01:53] Our test is failing. Now, this is supposed to be a refactor of our test, so our test shouldn't fail. What's happening here is `lorem.paragraphs()` actually returns a string that has two characters for new lines. When that value gets inserted into a text area, one of those is removed.

[02:09] What we're going to do here is, I'll say `.replace(/\r/g, '')`, globally replace all of those with just an empty string.

### tdd-06-generate-data.js
```jsx
const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})
```

We save our file, and now, our test is passing. Now, if we wanted to get the values there, we can `console.log` our `fakeUser` and our `fakePost`.

[02:29] We can take a look at the output. Our `user` is an object with an `id` of `user-1`, and our `title` has some nonsense in here. If we wanted to override one of these values to be very specific, and suggest in our test that this actually does matter, then we could say `{id: 'foo'}`.

### tdd-06-generate-data.js
```jsx
const fakeUser = userBuilder({id: 'foo'})
const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
const fakePost = postBuilder()
const preDate = Date.now()
```

[02:44] Now, the ID is foo. Great. With that, we'll get rid of this id of foo, and get rid of those console.logs.

### Passing Test
![Passing test with an id of foo](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908473/transcript-images/react-use-generated-data-in-tests-with-tests-data-bot-to-improve-test-maintainability-passing-test.png)

Now, our test is communicating that the `user` is not important. The post data is not important. It just needs to look something like this for our component to work properly.

### tdd-06-generate-data.js
```jsx
const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`)
})
```
