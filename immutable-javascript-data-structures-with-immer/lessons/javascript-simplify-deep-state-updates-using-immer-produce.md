Presenter: 00:00 That stuff wasn't easy. If reading back a logic isn't trivial. For example, when you think about what's happening here, is that we're just expressing that we want to add something to our collection. But instead what we're doing, every object, every parent in that data tree, we generate a new version for that. For toggling the reservation, it's even worse.

00:26 This will work, but this code isn't easy to write. It isn't easy to read either. What if we could write these things just very naively? What if we just could say I just want to put a new gift to that gifts collection.

00:42 For toggle reservation, I want to find that single gift that I'm interested in. If I found it, I'm just going to modify its reserve by property, because that is what I conceptually want to express.

00:57 Now let's save this. We'll see that all of this horribly fail again, which makes sense, because we breaking the rules of immutability, here, we just modifying the data values. However, I think you and I can both agree that this code better expresses the idea we want to express. This is where Immer comes in.

01:20 Let's install Immer. Immer's core API is pretty small -- it's just one function. That function is called "produce." What produce does, it takes an existing piece of immutable data and you give it a function, which we call a "recipe." That recipe function, it takes a draft version of that state and you can modify it as freely as you want.

01:44 We can just push onto the collections of that draft, and we can just modify properties of that draft. And something magical happens -- all our tests succeed again. What is happening? What is Immer doing?

02:04 The easiest way to think about Immer, is to see it as your personal secretary. You give it a letter, and it brings you back a copy of the letter. You start scribbling on top of that copy. You are making notes and you're scratching things out and you're making it ugly all over the place.

02:23 It is fine because, what happens is that you give that copy on which you wrote, you give it back to your secretary. Your secretary will check, "You are using these sentences. You are cracking that, and you are scratching this." Based on what you did with that draft, it will produce for you your nicely next immutable state.

