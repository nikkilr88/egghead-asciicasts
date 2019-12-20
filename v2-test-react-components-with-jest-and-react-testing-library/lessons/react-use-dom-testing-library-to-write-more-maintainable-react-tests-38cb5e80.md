Instructor: [00:01] I have some pretty good assertions here, but I can actually break something in my code without breaking my test. That would be a false positive.

[00:09] I've got my test passing here. If I go into `favorite-number.js` and break the association between this label and the input by making a typo in the `htmlFor` for example and save this, my test is still passing but my application is actually broken for people using screen readers and other assistive technologies.

[00:26] It'd be really nice if I could have an assertion to make sure that the label and the input are associated together properly. I could do that manually by saying, "Hey, label the four attribute that you have is the same as the ID of the input."

[00:39] There are various ways to associate a label and an input together and I don't want to have to worry about all of those different mechanisms for associating those together. It'd be even better if I had some sort of abstraction that let me get the input by the label. That's exactly what DOM testing library does for us.

[00:55] I'm going to `import {queries} from '@testing-library/dom`, which we already have installed in this project. Then I'm going to say `queries.getByLabelText`, `Favorite Number`. I want to get that on the `div`. DOM testing library is going to search all of the children of this div for a label that has this text. Then it's going to find the form control that's associated to that label and return that as our `input`.

[01:21] Now we can replace `querySelector` with `input`. We still want to verify that it has the type of number. For this one, DOM testing library will actually throw an error when you call getByLabelText and it can't find any element with the label text that you provide.

[01:37] We don't need to have this assertion in here because that's basically being covered by this query. We'll get rid of that. 

#### dom-testing-library.js
```js
import {queries} from '@testing-library/dom'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  const input = queries.getByLabelText(div, 'Favorite Number')
  expect(input).toHaveAttribute('type', 'number')
})
```

I'll open up my test. Now I'm getting an error message. It says it `Found a label with the text favorite number, however, no form control was found associated to that label. Make sure you're using the "for" attribute or the "aria-labelledby" attribute correctly.`

[01:57] Here, we're seeing that typo I created and the correct spelling. Those two are not associated properly. That's why we're getting the test failure. That's happening right here when we're saying `queries.getByLabelText(div, 'Favorite Number')`. Here's the text for the label we want to find.

[02:11] Now we can go back to our implementation here. We can fix our typo. Open up our test again, and they're passing. There are two things I want to change about this. First of all, if we were to make a typo here and do a lower case F for favorite number, we're going to get an error here because it's unable to find text with a lower case F.

[02:30] If we're testing our code as if we're an end user, then the end user actually doesn't care what the casing of this text is. It should just work either way. What I'm going to do is instead of using a string I'm going to use a regex. We'll pass the `i` Flag which will ignore case. That makes my query a lot more resilient to changes in my code.

```js
const input = queries.getByLabelText(div, /favorite number/i)
```

[02:51] Now, as I come in here in my favorite number, and if I were to change this a lower case favorite number, then my task is going to continue to pass. That works pretty well for me, because the end users don't really care about the casing here.

[03:03] Another change that I'm going to make here is, I'm going to import `getQueriesForElement`. Rather than having to provide the `div`  which can feel a little bit unnecessary as you add a whole bunch of queries in your test, we're going to do this, `getByLabelText = getQueriesForElement(div)`.

```js
import {queries, getQueriesForElement} from '@testing-library/dom'

const {getByLabelText} = getQueriesForElement(div)
```

[03:23] Now, we're going to use the getByLabelText directly rather than the queries. We can get rid of the queries up here. Then we don't have to provide the container for our first argument. We can simply provide the rest of the arguments for the query, which in our case is this regex text match.

```js
test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  const {getByLabelText} = getQueriesForElement(div)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```

[03:38] From `getQueriesForElement` we have a bunch of other queries that we can access from DOM testing library for finding elements in the render DOM.

[03:46] In review, what we've done here is we added the testing library/DOM module and we're pulling in `getQueriesForElement`. We're getting the queries for the div. Now, getByLabelText is prebound to that div so we can pass our text match regex here and get the input. Then we can make an assertion on that input that it has a type of number.

[04:07] We have an implicit assertion here that says, "We do have a label with the text favorite number." That label is associated to an input which we can make this assertion on.
