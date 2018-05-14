Instructor: [00:00] We have a `List` of `Int`. We have one, two, three. 

```
myIntList :: List Int
myIntList = (Cons 1 (Cons 2 ( Cons 3 Nil)))
```

Let's play with that a little bit. On line 15, we'll add `map`, and we'll give a lambda `(\a -> a + 1)`. 

```
main = render =<< withConsole do 
    logShow $ map (\a -> a + 1)
```

On the right-hand side, we look at our log, and we've got `(2 : 3 : 4 : Nill)`.

[00:18] Our `map` has taken our list of ints, and to each one, it's added one. The map has taken our elements of a list one at a time. The first one'll be one. The a would be one, and then one plus one, which two, and so on. Then it returns us a new list with new values of two, three, and four.

[00:34] Let's have a look at the type of `map`. `map forall a  b`, and it's a function of `(a -> b) -> f a -> f b`. We'll clarify this more by making our own map for our list. 

```
-- data List a = Nil | Cons a (List a)
-- map :: forall a b. (a -> b) -> f a -> f b
```

We'll call it `map'`, and it has a type of `forall a b`. It's a function from `(a -> b)`, and it goes through a `List a`, and returns us a `List b`.

```
map' :: forall a b. (a -> b) -> List a -> List b
```

[01:01] If you look at our previous type definition of `map`, all we've done is changed the `f` into a type `List`. On the next line, we'll do `map' _ Nil = Nil`. Whatever given function, if we receive a `Nil`, we just return on a `Nil`.

```
map' :: forall a b. (a -> b) -> List a -> List b
map' _ Nil = Nil
```

[01:14] On the line after that, we'll do `map'` at `f`, open close braces, `(x : xs)`, and that equals `f x : map' f xs`. 

```
map' :: forall a b. (a -> b) -> List a -> List b
map' _ Nil = Nil
map' f (x : xs) = f x : map' f xs
```

Let's explain the first part. `x : xs`, what's happening here is the `x` actually equals the one in our list. The `xs` would be the rest of the list, which in our case, is two, three, and Nil.

[01:37] Let's explain the colon after `f x`. That's an infix operator for `Cons`, which is a function that attaches an element to the front of a list. Then after the colon, we're using `map' f xs`. We're using recursion now to pass the rest of our list `map'`, and so on, and so forth.

[01:56] Let's just type this out quickly, and it should make more sense. We pass our list into `map'`, and our function is plus one. We're doing one plus one, then the rest of the list. We do `(Cons 1 + 1 ( Cons 2 + 1 ( Cons 3 + 1 Nil )))`.

```
-- (Cons 1 + 1 ( Cons 2 + 1 ( Cons 3 + 1 Nil )))
```

[02:11] Let's make sure that our function works. We'll change `map` to `map'`, and yep, it works. Our output is: 

```
(2 : 3 : 4 : Nil)
```

We'll go back to our original `map`, and remove the `'`. Then we'll pass in an array of one, two, three. 

```
main = render =<< withConsole do 
    logShow $ map (\a -> a + 1) [1,2,3]
```

Now, look at the output. It's an array of two, three, and four.

```
[2,3,4]
```

[02:27] If we look at a type definition of `map'` on line 15, all we've done is changed a list to array. `map`'s giving out the structure. If you passed it in a list, it'll return us a list. If you pass it in an array, it'll return us an array.

[02:40] Let's change that array into strings. We'll do `"a"`, `"b"`, and `"c"`. 

```
main = render =<< withConsole do 
    logShow $ map (\a -> a + 1) ["a", "b", "c"]
```

Oh, but we get an error, `"Could not match type Int with type String".` That's because it's using a plus. What we'll do is, we'll change that to append, and we'll do string b. 

```
main = render =<< withConsole do 
    logShow $ map (\a -> a <> b) ["a", "b", "c"]
```

The results will be an array of the strings, `["ab", "bb", "cb"]`.

[03:00] What you might not realize is, what we've created is created a functor. Let's have a quick look at the [docs](https://pursuit.purescript.org/packages/purescript-prelude/3.1.0/docs/Data.Functor#t:Functor). A functor is a type of constructor which supports a mapping operation, map. A map can be used to turn a function a to b into function fa to fb.

[03:16] As I mentioned before, we're running a function against the inner structure, but keeping the outer structure the same. For something to be a functor, it has to satisfy some laws.

[03:24] There's a law of identity -- if you pass it ID, it will return you the same thing

```
Identity: map id = id
```

-- and there's the law of composition, which says if you pass a function, g composed to f, into map, that should equal map g composed into map f. 

```
Composition: map (f <<< g) = map f <<< map g
```

Let's show you these two laws in action, now that you've got a much better understanding of what's going on.

[03:44] Let's create a function called `mapIdList` that has a type of `List Int`, and on next line, we'll do `mapIdList = map`, pass in a function `id`, and pass in `myIntList`. 

```
mapIdList :: List Int
mapIdList = map (id) myIntList
```

The function ID is a `\` from `a` to `a`. Whatever you pass it, it will return it to you.

[04:00] Let's log this out, `mapIdList`. 

```
main = render =<< withConsole do 
    logShow $ mapIdList
```

Looking at the results, we've got the same list, which is `(1 : 2 : 3 : Nil)`. That law is our satisfied. Our outer structure is the same, and our inner structure is the same.

[04:14] Now, let's test Composition. We'll create a new one called `mapCompList`. That's got a type of `List Int`. On the next line, `mapCompList = map`, braces, we'll pass in `myIntList`. Inside of there, we'll create two empty functions, and compose them together with the three arrows. I'll explain that in a moment.

[04:35] First, we'll make  `(\a -> a + 1)`. Then in our second function, we'll do a `(\a -> a + 2)`. 

```
mapCompList :: List Int
mapCompList = map ((\a -> a + 2) <<< (\a -> a + 1))
```

What the compose is doing is, it's saying we're going to pass in our first element of our list, and it's going to go into this function, `(\a -> a + 1)`. Then the result of that will go into that function, `(\a -> a + 2)`.

[04:56] We'll log that out, so `mapCompList`. 

```
main = render =<< withConsole do 
    logShow $ mapCompList 
```

Looking at the results, we've got `(4 : 5 : 6 : Nil)`. I'll walk you through the first element. The `a` would actually be a `1`. One plus one is two. We pass on that result, so the a here would be two. Two plus two is four.

[05:14] Let's make our second `mapCompList`. That's got the same type of `List Int`. On the next line, `mapCompList`. We'll do braces, and we'll pass in `myIntList`. `map` empty function, which is composed with a `map` of an empty function.

```
mapCompList :: List Int
mapCompList = (map () <<< map ())
```

[05:32] Let's fill in the first one. We'll do `_ + 2`. The underscore is actually the equivalent of a `(\a -> a)`. Then we'll do in a second one, `(_ + 1)`, which is exactly the same thing. 

[05:46] We need to add our tick, `mapCompList'`. 

```
mapCompList :: List Int
mapCompList = (map (_ + 2) <<< map (_ + 1)) myIntList

main = render =<< withConsole do 
    logShow $ mapCompList 
    logShow $ mapCompList' 
```

If we look at the output, they're both identical. 

```
(4 : 5 : 6 : Nil)
(4 : 5 : 6 : Nil)
```

That fulfills our second law of composition.

[06:02] Having `map` with a function that composed from one function to the other is exactly the same as having a `map` and a function composing into another `map` and a function. If we go back to our [docs](https://pursuit.purescript.org/packages/purescript-prelude/3.1.0/docs/Data.Functor#t:Functor), you can see that if you pass `map` a function which is composed from `map (f <<< g)`, that should equal `map f <<< map g`.

[06:22] There you have it. You've learned all about functors and map.