Instructor: 0:00 Another weak point of our current real-time synchronization approach is that the history we keep on server is ever and ever growing as running longer and longer. Even when we toggle the same item multiple times, this will generate multiple sets of patches which only to be sent to newly-connecting clients.

0:20 One way to do this better is to compress the patches. There are a few ways in which we can do this. One is we could now and then take the current states of global affairs and then just record the patches from that point onwards.

0:36 Another trick I want to share in this lesson is that we can compress the patches themselves. The idea of this approach is that at a certain form, we reapply all the patches we have so far to the original state we started with, and then we check what new patches this reapplication would result in. Because patches are computers' after effect, which results in a smaller set of patches.

1:04 We use producer patches again. We apply the patches we've seen so far, and then we return the new set of patches the result of that. If we try that and we press reserve and unreserve a few times on the same item, and so then we see that this is also multiple patches which, once the compression kicks in, is compressed to only a single patch.

