Instructor: [00:00] Let's play with making functions out of foldL. We've got our own version of foldL, and we've called it `foldl'`. Let's change the function to a `(*)`, so 01 * 2 * 3 * 4 is 0. 

```
foldl' forall a b. (b -> a -> b) -> b -> List a -> b
foldl' f acc l = case l of
    Nil -> acc
    (x : xs) -> foldl' f (f acc x) xs

main = render =<< withConsole do 
    logShow $ foldl' (*) 0 myIntList
```

We'll do a `(-)`, 01- 2 - 3 - 4. That'll give us -10. 

```
main = render =<< withConsole do 
    logShow $ foldl' (-) 0 myIntList
```

That works as we expect a `foldl'` to work. Let's put that back to `(+)`.

[00:23] Now let's create our own functions out of `foldl'`. First, we'll try and make a `map`. We'll call that `map'`, and that has a type of `forall a b.`. It takes a function of `(a -> b)`, a `List a`, and returns us a `List b`. On the next line, we'll do `map' f xs`, and that equals `fold'`, a lambda function of `acc`, and `x`.

[00:50] Then we have `acc <> Cons (f x)`, which is `Cons` with `Nil`. Then we pass in `Nil xs`. 

```
map' :: forall a b. (a -> b) -> List a -> List b
map' f xs = foldl' (\acc x -> acc <> Cons (f x) Nil) Nil xs
```

We'll test this out. We'll do `logShow`, and we'll put `map'` with a function of `(_ + 1)`. We'll copy `myIntList`. Let's put it here. 

```
main = render =<< withConsole do 
    logShow $ foldl' (-) 0 myIntList
    logShow $ map' (_ + 1) myIntList
```

That'll return us `(2 : 3 : 4 : 5 : Nil)`.

[01:13] The trick is, inside of here, we're appending `acc` to the `Cons` of `f x`. We're actually running our function on each element, with the `f`. When it first comes through, 1 would be 1 + 1, so that'd be 2. It'd accumulate and it'd keep going. It would be 1 + 1 is 2, 2 + 1 is 3, 3 + 1 is 4, and so on.

[01:36] We're using `forall` to recurse over our list. Through each pass, we're running our function against each element and accumulating them all together into a single list.

[01:44] Next, let's make a filter with `foldl`. We'll start by writing `filter'`, and it has a type of `forall a b.`, and that takes a function from `a -> Boolean` -- a `List a -> List a`. On the next line, we'll do `filter' f xs`. That equals a `foldl'`.

[02:04] On the next line, it'll be our lambda function with `acc x`. Then we'll do `acc` and append it to `if f x`, then we'll `Cons x Nil`. Otherwise, we'll return `Nil`. Then we'll pass `Nil` and `xs` to `foldl'`. 

```
folter' :: forall a b. ( a -> Boolean) -> List a -> List a
filter' f xs =
    foldl'
        (\acc x -> 
            acc <> if f x then Cons x Nil else Nil )
        Nil xs
```

Let's quickly try that out.

[02:20] We'll do `filter'`, and it takes a function of `(_ > 1)`, and we'll pass it `myIntList`. 

```
main = render =<< withConsole do 
    logShow $ foldl' (-) 0 myIntList
    logShow $ map' (_ + 1) myIntList
    logShow $ filter' (_ > 1) myIntList
```

As expected, it returns us a list of `(2 : 3 : 4 : Nil)`. Let's try it out with `(_ > 2)`. Yep, that returns us `(3 : 4 : Nil)`. We're filtering out all the values that aren't greater than 2.

[02:38] You should know that `filter` and `map` are really similar. Where they differ is inside the `\` function that we pass to `foldl'`. In `map`, we run `f` on `x`. It's a function of `a -> b`. In `filter`, we're doing a function from `a -> Boolean`. To do that, we do an `if then` and checking, if we pass `x` to our function, does that return true or false? For this occurrence, is `x > 2`.

[03:01] The great thing about `foldl'` is it will take a function from `b -> a -> b`, but it doesn't really mind what you do inside that function, as long the type matches. That's how we're able to create a `map` and a `filter` using `foldL`.

[03:13] Let's make one more function. This time, we'll make a reverse. We'll do `reverse'`, and that has a type of `forall a b` -- `list a` and returns us a `list a`. On the next line, we'll do `reverse' xs`. That equals `foldl'`, and that's got a `\` function with the inputs of `acc` and `x`. It will do `Cons x Nil`. Then we do `Nil xs`.

```
reverse' :: forall a b. List a -> List a 
reverse' xs = foldl' (\acc x -> Cons x acc) Nil xs
```

[03:40] Let's quickly try that out. We'll duplicate our `logShow`, and we'll change `filter` to `reverse'`. We'll remove this function out. 

```
main = render =<< withConsole do 
    logShow $ foldl' (-) 0 myIntList
    logShow $ map' (_ + 1) myIntList
    logShow $ filter' (_ > 1) myIntList
    logShow $ reverse' myIntList
```

If we look at our output, we've got `(4 : 3 : 2 : 1 : Nil)`. The trick to reverse is inside our `\` function. Here, we've got `cons x acc`. We'll quickly demonstrate that.

[04:00] We'll write it out `Cons x acc`. In that case, when it first comes around, `x` is 4. What's happening is we put an `x` first onto `Cons`, and then `acc`, because every time there is a recursion inside `foldl'`, we `Cons x` to the beginning of our list. The result with that is we accumulate a new list, which starts with 4, 3, 2, 1, then Nil.

[04:22] There you have it, an example of how we were able to use `foldl'` to create totally new functions.