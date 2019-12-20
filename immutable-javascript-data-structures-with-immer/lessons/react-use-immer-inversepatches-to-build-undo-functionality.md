Presenter: 00:00 We mentioned before that when we use produce patches, it doesn't just produce patches, it also produces inverse patches. What are inverse patches? You might wonder. Well, they're actually just another set of patches which allows us to go from the next state back to our initial state.

00:19 If we take the test we had before where we apply the patches to the initial state, which leads us to the next state, we can also apply inverse patches to the next state and it will lead us back to the initial state. What do these inverse patches look like? Let's leverage a live Snapchat feature to pick whatever snapchats are generated during this toggle reservation action.

00:44 As you see, an inverse patch is just like a normal patch, except that it stores the value that was being overwritten. Or if you add something, then inverse patch should be a remove, etc. Inverse patches are pretty powerful. We can use them, for example, to implement undo/redo.

01:03 We head back to our components, and we're going to store an initial base of state, our undo state. This is React's way of storing some local states that doesn't impact re-rendering. What we can do once dispatch fires is to grab the patches and send them to the server.

01:20 We also grab the inverse patches, and those we put onto the undo state. Of course, this is a new pattern and to apply this undo functionality. For convenience, you make sure that this is disabled if there are no items to be undone on the stack.

01:37 How do we implement this undo handler? That is pretty straightforward, because we can just put the patches from our stack. Then we need to apply those patches with our inverse patches, remember. We need to apply those to the current state, for which we can reuse the action we already have, will apply patches.

02:01 If you tried it, it seems to work. but that's not entirely the case. There's a small flaw in this implementation, and it is if we undo twice, our last undo undoes our first undo. The reason for that is that because we're dispatching our undo, anything that's changed by the undo itself does end up on the undo stack.

02:25 Luckily, that is pretty straightforward to fix. The only thing we need to do is to make sure that once you undo something, our dispatch function knows about it. We introduce another parameter, which is undoable, but if it's true because that's generally what we want, but not always. If something is undoable, then add it to the undo stack. Otherwise, we don't.

02:47 Note that we always send the pictures to the server, regardless if it's undoable or not because even our undo action, we want to synchronize with the server. The other change we make is that if we dispatch apply patches from handle undo, we want to mark it as not undoable. There we go then. Let's do other things. Let's reserve all those gifts. Now if we undo those, it's nicely undone in the right order.

03:13 Then there's something important to realize in this implementation. These patches only end up in our undo stack if they're produced from a dispatch from a local component. That is pretty important, because that means that every client is building up its own undo stack.

03:30 What that means is that if we open a second client, and this one also make some changes, and it'll make change in this client, and it'll make another one on this client, and we start undoing those changes, is that only the local change is undone.

