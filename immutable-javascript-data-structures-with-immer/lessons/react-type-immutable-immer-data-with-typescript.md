Instructor: 00:00 A question you might have is how hard is it to use Immer together with Typescript. Luckily, that's usually super straightforward. Let's, just for this lesson, I'll create a part of our code base to typescripts.

00:14 We install typescript and some typing, and so we're in a gifts.gs.ts and start a test runner again. Notice it'll pass, but clearly, we have second compile errors. Let's take a look into that after we first define the shape of our states using types.

00:34 For all the type of objects we have, we're going to introduce an interface, and I'll have interfaces for all the types in our logic. From here on, it's quite straightforward to type our producers. A way to type producers is by giving all the arguments of the recipe functions a type and the rest will be inferred from that.

00:55 This immediately covers a block because might not actually find a gift. We cannot be sure of why. The simple way to fix it is to simply return if you don't have one. Now this file is entirely strongly typed. Now we have all the strongly-typed stuff.

01:18 For example, if I forget what arguments toggle reservation, it will complain. I get all this nice other completion on my states. This works. Everything is now nicely strongly types. However, you might want to type this even more strict.

01:37 For example, this statement, it's caused by the unit test, but we could also force TypeScript already detected this assignment is not possible. A way to do that is to define all the types as read-only.

01:55 If you look at this test, this already takes a compile error, which is great. We do get also compile errors on our recipes. That make sense because we just defined everything to be read-only. However, in our recipe functions, these are drafts and we're just modifying them, which is now no longer allowed by TypeScript.

02:18 Luckily, Immer provides a little utility that allows us to take an immutable type and get its mutable counterpart. That utility is called drafts. By using drafts, Immer knows that inside this recipe function, this draft is mutable, but if you look at the type of the function itself that's being produced by this current notification, that's still only working on immutable types.

02:46 These are two different ways in which you can use Immer together with TypeScript. Either you can keep things simple and just define object shapes, or you can even use immutable types and still have Immer behave correctly.

