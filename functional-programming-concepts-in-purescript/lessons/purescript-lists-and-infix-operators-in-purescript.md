Instructor: [00:00] We'll start off with lists. Let's show you the data type. It's `-- data List a = Nil | Cons a (List a)`. We've created data constructor called `List`, and that takes an `a`. Then, I'll either return it to `Nil` or a `Cons`, which itself takes an `a` and the `List a`.

```
-- data List a = Nil | Cons a (List a)
```

[00:25] This might not make too much sense, let's create our first list. We'll call it `myIntList`, and it has a type of `List Int`. On the next line, `myIntList = (Cons 1 Nil)`. 

```
myIntList :: List Int
myIntList = (Cons 1 Nil)
```

Let's log that out. 

```
main = render =<< withConsole do 
    logShow $ myIntList 
```

As you can see, it's logging out one.

```
(1 : Nil)
```

[00:48] Oh, colon. Why is there a colon? Now, time to explain infix operators. In PureScript, we tend to use infix operators to either convert a type or a function into some sort of symbol.

[01:00] In this case, we've got the type `Cons` into a colon. You can still use cons, but this just becomes an alternative. Let's type out `infix`, and then a number, in this case, `8`. That's just how tightly it binds. And what you want to create an infix for, in our case, cons as `{:}`.

```
-- infix 8 Cons as (:)
```

[01:16] Let's add some more attributes to `myIntList`. We'll do `Cons 2`, `Cons 3` and there, close those off. 

```
myIntList = (Cons 1 (Cons 2 ( Cons 3 Nil)))
```

It should make a little bit more sense now.

[01:27] We've got `Cons 1`, and that's its first value. Then its second value is the rest of the list. If you look at `Cons 3`, its second value is `Nil`. That's why the final cons will always need one value and a `Nil`, because the compiler has to know when the end of the list occurs.

[01:41] To do that, we use `Nil`. Looking at our log, you can see there's `(1 : 2 : 3 : Nill)`. Which is our list. There you have it, an introduction to list and infix operators.