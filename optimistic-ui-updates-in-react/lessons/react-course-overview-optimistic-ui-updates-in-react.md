Instructor: [00:00] In this course, we're going to look at the concept of optimistic UI updates. What do you mean by optimistic UI update is that, when a user takes an action view update the UI immediately, even though there may be a request pending.

[00:14] We can assume success updated UI immediately and take action, if any failure does happen. This results in a much snappier more responsive user interface for end users. In our first example, we have this recreated twitter UI where we'll be able to like and unlike a tweet.

[00:34] We will optimistically update our state and also revert the state on failure. We'll address some challenges that come up along the way. Then, we'll walk through hooking up a list UI, or we have a list of items that we can delete.

[00:48] First, we'll build this in a way that is using non-optimistic UI updates. We'll have a loading state to give the user's impression that the request is pending, and also introduce displaying an error tree user upon failure.

[01:05] After that, we'll walk to refactoring towards using optimistic UI updates which will give us a much snappier field to our UI, and address some unique challenges that come up with restoring state to make sure that we're granularly restoring our state and not giving the user the false impression of failure.

[01:24] Used sparingly optimistic UI updates can give your application a much more polished and more responsive field for relatively low cost and complexity.