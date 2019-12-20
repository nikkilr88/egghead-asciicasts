Instructor: 00:00 For this lesson, we rewind the state of the repository a little bit back until where we had our logic nicely separated from our components. In this lesson, we are going to add an asynchronous flow.

00:12 We are going to add a function that give an ISBN number. It adds a book log gift list. For that, we make a remote call to the open library default API. Let's also add a test to make sure that this actually works. This works. We can now set a book and add it to our state.

00:42 Note that we now have a function that produces a state asynchronously so past the racial state and a while later when problems is resolved, we have our next state. Let's hook this up to the UI. We again add this event handler, for instance for an ISBN number. We just add a convenient default for that. I'm so lazy. Then we await the next state. We have the book when it's ready.

01:10 Let's try this. It works, and we see that it nicely fetches a book and also fetches the correct image.

01:17 Anyway, the point of this lesson, of course, is that we're again expressing this logic in the classical way where we mainly spread out all these subjects, which is harder and harder as your tree gets deeper and deeper. Can we use Immer for asynchronous stuff? The answer is yes. To show you, we are going to use two utilities available on Immer.

01:38 These are called create draft and finish draft. These are the functions that are used by produce under the hood. Create draft creates a draft for an arbitrary given object. This object is mutable and remains mutable. That means that we can just push our new book onto that gifts array.

01:58 However, at some point in the future, we should call finish draft. A finish draft will take the draft, inspect all the modifications, and produce a new state for us. Now, in practice, you won't be using create draft and finish drafts.

02:11 Why? Because produce directly supports having asynchronous recipes, but if you're ever building a library on top of Immer, digutilities come in quite handy. Now, this looks all nice and fancy, but actually, this implementation isn't too good. The reason for that is that it's generally a bad idea to have state of data functions that are async.

02:34 What if the user tries to add two books simultaneously, but the requests are slow? Let's emulate such a scenario in our tests. Then, once we have these two premises, which one do we await? Which one is going to be the next state? It's hard. Whatever premise we pick, we always will be missing one book.

02:57 This test that we want to have four books is never going to succeed. The essence of the trouble is that both producers start with the very same state, and then make modifications based on that original state, but both make a different modification. How do you merge them?

03:15 Although it's not impossible to merge them, it's better to avoid it and to restructure our cause in such a way that all these operations become asynchronous. The simple solution is to split up our logic of an asynchronous function that fits the details, and once we have the details, only then add those details to the current state.

03:35 Then we update our test to first fetch the books instead. Now we can nicely chain, adding the books to get the new state that has both of them. We also update the first test. Now we have, indeed, two books added to the collection. As a rule of thumb, although Immer does support having asynchronous recipes, best avoid them at all costs.

