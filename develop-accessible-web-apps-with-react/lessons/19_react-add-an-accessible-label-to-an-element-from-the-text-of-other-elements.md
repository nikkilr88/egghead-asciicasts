Instructor: [00:00] Here is a page that has a problem we need to fix concerning accessible labels. I'm in Safari. I'm going to go ahead and run VoiceOver so we can hear the problem. When this page loads and there are no movies in my wish list, this message is shown, stating that "You don't have any movies in your wish list. Here is a link to go add some."

[00:20] That takes you to the page where you can go pick what movies you want to add to your wish list. When this text is read by the screen reader...

Screen Reader: [00:29] No movies in your wish list. You are currently on a text element. Visited link. Add some. You are currently on a link. To click this link, press control-option-space.

Instructor: [00:40] The way that's read feels disconnected to me. I feel like it would be a better experience if those two sentences were read together as a group. It would say "No movies in your wish list. Add some" instead of the first sentence and then the second sentence with the link read separately in a disconnected way.

[00:57] We can group these two elements together and give them a label that makes sure that they are read together. Let's see how to do that.

Screen Reader: [01:04] VoiceOver off.

Instructor: [01:05] Here's the component where we have this message. This is the `JSX` that's returned when there are no movies yet in the wish list. It's just a `p` tag. Within it, we have a link. We can reorganize this to be in a group. We can surround this with a div.

[01:25] Then changing this from a `p` tag, instead we're going to make this a span. We've got two elements. We've got our span. We've got our link. They are grouped within this div. If we give each of these an ID, then now we can add an `aria-labelledby` that will reference both of these elements.

[01:48] `aria-labelledby` can take a list of IDs delimited by a space. If we give it the noMovies ID and the addLink ID, it should now read the text from both of these elements to create the label for this div group. Let's hear what this sounds like.

```js
<div aria-labelledby="noMoviesText addLink">
  <span id="noMoviesText">
    No Movies in your Wish List!
    <Link id="addLink" to="/browse">
      Add some!
    </Link>
  </span>
</div>
```

Screen Reader: [02:08] No movies in your wish list. Add some group. You are currently in a group.

Instructor: [02:13] **Now these two elements are read as being a group**. You heard the full two sentences read together as one statement instead of two separate statements where I had to move the screen reader cursor from one to the next and they sounded disconnected. Now they're read together. It makes a lot more sense.
