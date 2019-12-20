Instructor: 0:00 We have some real-time synchronization now, but honestly, it's quite a bad implementation of that so far. The best way is to simply demonstrate the problem with our current implementation. We do that by simulating some latency.

0:17 I'm going to give both a latency of two seconds. Now, something happens. If I add tea to one of the applications, and coffee to the other one, and I both add them almost simultaneously, they will arrive in a different order.

0:38 That's not the biggest problem because your order doesn't really matter for this application. It gets sweet once we make reservation. If I reserve a coffee for the other application, and it reserves tea. The opposite is also true.

0:56 In one screen, the tea is reserved by Panda and in the other one, it's reserved by whatever that animal is. What is the goal of this issue? We can find the root of the problem by looking at our server logs. Once you make a reservation and we look at a path, we see that that path is index-based.

1:17 It's going to reserve what item is at position four, so whatever user is presented by the number seven. For that reason, we are going to reflect our state and storage by ID. Let's first change that static default data we normally have.

1:40 Next, we change our reduce rate level bits. That's instead of storing everything in an array, it stores everything in an object. This actually simplifies a bunch of things. We don't have to find the gifts in there anymore. We can just immediately pick it from that collection.

2:00 Finally, we need to make a small change in the UI. Currently, our components is mapping of the array. It doesn't work anymore. Need to map over the values of the object collection. Now, we can save everything and restart our server to make sure it forgets about all the previous patches.

2:18 The interesting thing is now, what happens if we try to introduce the same problem. We see still that the order isn't consistent but if you make a reservation, at least that modifies the correct item.

2:34 We can see that how affects the patches because the patches now are expressed in terms of the ID of the object rather than the index which they left in the state. It's generally key to make sure that you use IDs as much as possible.

2:52 You might be wondering, "Can we also fix the ordering of this application?" The answer is yes, but it's beyond the scope of this tutorial. A few ways in which you could fix this is by, for example, storing a sort index, or by storing a separate collection in which the order is stored.

