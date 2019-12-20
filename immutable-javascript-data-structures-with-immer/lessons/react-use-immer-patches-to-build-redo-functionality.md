Instructor: 0:00 You might be wondering, if we have Undo, can we also build Redo? Yes, of course we can, but it is slightly more complicated.

0:08 First of all, when you need to be able to go forward and back in the history, you cannot just pop out items from your Undo stack, because you need to be able to redo that. Instead of popping items from the stack, we are going to keep a separate pointer to remember where we are in the stack, and we call that Undo stack pointer.

0:30 Once we put something onto the Undo stack, we add it to the stack, but we also move forward the Undo stack pointer. One thing to notice is that we always reset the length of the Undo stack at this point, because once new items are post, it means that any remaining forward items would be lost. That is how Undo/Redo works normally.

0:53 Now, we also need to express handle Undo in terms of Undo stack and Undo stack pointer. The patches we need to apply are the inverse patches which are stored at the current position of the pointer. We grab those patches. When we undo, we move the pointer one back in history. That would be the next item to undo if you would press undo again.

1:19 Also, we update disabled status. We're expressing now in terms of this pointer. Now we have the same undo functionality just implemented using a stack and a pointer. Now, it's time for the final piece of the puzzle, redo.

1:34 We introduce our redo button. That button is only enabled if...If the pointer is not at the end of the Undo stack, then there are items left that can be redone.

1:49 Now, to implement that handler. Again, if you're not at the end of the undo stack, we be allowed. Otherwise, we move our stick pointer forward. As you might realize, this is basically the inverse of the handle undo handler. We grab the forward patches and apply those.

2:16 Let's finally give this one a try. We can undo this. We can redo this. We can even do it from multiple clients at the same time.

2:32 Here we have it, the end-result of our course. Is this a perfect implementation? Definitely not. There's no error-handling here. There's no conflict resolution. More importantly, I hope this gives a thorough introduction to all the advanced features of Immer.

2:48 With Immer, we cannot just produce immutable data in a very straightforward and very readable way. There's also more powerful features, like Freezing and Patches, which enables very powerful patterns for synchronization, for undo/redo and, probably, for solving many other problems which you might come up with. Have fun.

