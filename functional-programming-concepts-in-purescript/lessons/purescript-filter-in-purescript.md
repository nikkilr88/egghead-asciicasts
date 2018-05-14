Instructor: [00:00] Let's play with filters. 

```
myIntList :: List Int
myIntList = (Cons 1 (Cons 2 ( Cons 3 Nil)))

mySmallIntList :: List Int
mySmallIntList = (Cons 1 ( Cons 2 Nil))
```

We'll do `filter () myInList`. 

```
main = render =<< withConsole do 
    logShow $ filter () myIntList  
```

The filter's coming in from our data.list. Let's fill out this function. We'll do `_ > 1`. 

```
main = render =<< withConsole do 
    logShow $ filter (_ > 1) myIntList  
```

If we look at the output, it's `(2 : 3 : 4 : Nil)`. This is all the values that are greater than 1 -- 2, 3, 4, and Nil.

[00:20] Now let's use `mySmallIntList`. We'll put that there, and we'll do `(_ < 1)`, 

```
main = render =<< withConsole do 
    logShow $ filter (_ < 1) mySmallIntList 
```

so that will just return us `Nil`. If it's `(_ <= 1)`, that returns us `(1 : Nil)`. If it's `(_ <= 2)`, that returns us `(1 : 2 : Nil)`.

[00:34] Let's make our own filter. We'll type `filter`, and that's got a type of `forall a.`, and that takes a function of `(a -> Boolean)`. It takes a `List a`, and it returns a `List a`. On the next line, we'll do `filter'`, with the inputs of `p l`. That'll equal `go Nil l`. On the next line, we do `where`, and on the next line we'll do `go acc Nil`.

```
filter' :: forall a. (a -> Boolean) -> List a -> List a
filter' p l = go Nil l
    where
    go acc Nil
```

[00:59] Here we're pattern-matching, and that'll equal `reverse acc`. On the next line, we'll do `go acc`, and we'll `(x : xs)`. The colon's an infix operator of `Cons`, so it just splits our list. On the next line, we'll do `|`, which is a guard, and `p x`, and that equals `go (x : acc) xs`.

```
filter' :: forall a. (a -> Boolean) -> List a -> List a
filter' p l = go Nil l
    where
    go acc Nil = reverse acc
    go acc (x : xs)
        | p x = go (x : acc) xs
```

[01:20] Look at the error on the right. We're missing a case expression, so we'll take care of that. We'll put `| otherwise = go acc xs`. 

```
filter' :: forall a. (a -> Boolean) -> List a -> List a
filter' p l = go Nil l
    where
    go acc Nil = reverse acc
    go acc (x : xs)
        | p x = go (x : acc) xs
        | otherwise = go acc xs
```

Let's change the function to `(_ < 1)`, so that should return us `Nil`. 

```
main = render =<< withConsole do 
    logShow $ filter (_ < 1) mySmallIntList 
```

We'll explain exactly how our custom filter works.

[01:36] When we call our function, we've got go. That gets passed to Nil. The second value is L, which is our list. That's 1, 2 and Nil. Now, we'll define go. Next, we pattern match against go. We check if the second value is Nil. In our case it isn't, so we're going to do go, acc, X of Xs. X, in our case, would be the 1, and the Xs would be the rest of the list, which is 2 and Nil.

```
filter' :: forall a. (a -> Boolean) -> List a -> List a
filter' p l = go Nil l
    -- go (Nil) (1 : 2 : Nil)
    where
    go acc Nil = reverse acc
    -- nope
    go acc (x : xs)
    -- x = (1), xs (2 : Nil)
        | p x = go (x : acc) xs
        | otherwise = go acc xs
```

[02:00] You can see how we're using colon, which is the infix operator of `Cons`, to split our list. Now, we're going to use guards to see what to do with our values. We'll use our `p`, and the `p`'s our function that we put in. That's _ < 1. The underscore is a value we pass into our function, so that's `x`, and currently that's 1.

[02:19] We do, "Is 1 lower than 1?" That's nope, so it goes to the second case, which is otherwise, so that passes straight through. We're going to do a recursive call on go. We'll do go acc `xs`. Our `acc` at the moment is `Nil`, and our `xs` is 2 and `Nil`. Is our second value to go Nil? No, so we'll go to the next part.

```
filter' :: forall a. (a -> Boolean) -> List a -> List a
filter' p l = go Nil l
    -- go (Nil) (1 : 2 : Nil)
    where
    go acc Nil = reverse acc
    -- nope
    go acc (x : xs)
    -- x = (1), xs (2 : Nil)
        | p x = go (x : acc) xs
        -- (1 < 1) = nope
        | otherwise = go acc xs
        -- go (Nil) (2 : Nil)
```

[02:39] Our acc is Nil, and we'll do `x cons xs`, which makes the `x` 2 and the `xs` Nil. Now we do `p x`. Our `x` is 2, so is 2 greater than 1? Nope, so we'll go the next part, and we'll run go `acc xs`. Our `acc` currently is Nil, and our `xs` is Nil, so when we recurse on `go` again, our second value is Nil. We'll hit this and we'll reverse our `acc, which in our case is Nil, so that returns Nil.

```
filter' :: forall a. (a -> Boolean) -> List a -> List a
filter' p l = go Nil l
    -- go (Nil) (1 : 2 : Nil)
    where
    go acc Nil = reverse acc
    -- go Nil Nil = reverse Nil
    go acc (x : xs)
    -- x = (2), xs (Nil)
        | p x = go (x : acc) xs
        -- (2 < 1) = nope
        | otherwise = go acc xs
        -- go (Nil) (Nil)
```

[03:08] Let's try something different. We'll change the value inside the function that we passed the filter. We'll do `(_ < 2)`. 

```
main = render =<< withConsole do 
    logShow $ filter (_ < 2) mySmallIntList 
```

This will return us all the values in our list that are less than 2. Let's go through the function again. First time round, our x will be 1, and xs will be 2 and Nil.

[03:25] This time, we're checking if x is less than 2. It is, so we'll cons x onto acc, so our x is 1 and our acc is Nil. We'll put 1 onto Nil, which gives us Nil, 1. Our xs will be 2 and Nil. Background, our acc is Nil and 1. Our second value was 2 and Nil, so that x becomes 2 and xs becomes Nil.

```
filter' :: forall a. (a -> Boolean) -> List a -> List a
filter' p l = go Nil l
    -- go (Nil) (1 : 2 : Nil)
    where
    go acc Nil = reverse acc
    -- go Nil Nil = reverse Nil
    go acc (x : xs)
    -- x = (2), xs (Nil)
        | p x = go (x : acc) xs
        -- (1 < 2) = go (1 : Nil) (2 : Nil)
        | otherwise = go acc xs
        -- go (Nil) (Nil)
```

[03:50] We'll pass our `x`, which is 2, into our function. Is 2 less than 2? No, it's not, so we'll go into the otherwise. We'll run go `acc` -- at the moment which is Nil and one -- and `xs`, which is Nil. 

```
filter' :: forall a. (a -> Boolean) -> List a -> List a
filter' p l = go Nil l
    -- go (Nil) (1 : 2 : Nil)
    where
    go acc Nil = reverse acc
    -- go Nil Nil = reverse Nil
    go acc (x : xs)
    -- x = (2), xs (Nil)
        | p x = go (x : acc) xs
        -- (2 < 2) = go (1 : Nil) (2 : Nil)
        | otherwise = go acc xs
        -- go (Nil : 1) (Nil)
```

Our second value is Nil, so this time we'll reverse acc. In our case, it's Nil and 1. The reverse of that is 1 and Nil, which is the output that we get.

```
filter' :: forall a. (a -> Boolean) -> List a -> List a
filter' p l = go Nil l
    -- go (Nil) (1 : 2 : Nil)
    where
    go acc Nil = reverse acc
    -- go Nil Nil = reverse Nil
    go acc (x : xs)
    -- x = (2), xs (Nil)
        | p x = go (x : acc) xs
        -- (2 < 2) = go (1 : Nil) (2 : Nil)
        | otherwise = go acc xs
        -- go (Nil : 1) (Nil)
```

[04:15] I've just noticed. We weren't using our function we created. Just to prove to you that it does work, we'll put a tick on filter, `filter'`. We'll filter out any values that are greater than 2. 

```
main = render =<< withConsole do 
    logShow $ filter' (_ > 2) mySmallIntList 
```

In this case, none are, so that returns `Nil`. Now, we'll check if any of the values are less than or equal to 2. 

```
main = render =<< withConsole do 
    logShow $ filter' (_ <= 2) mySmallIntList 
```

They all are, so that returns `(1 : 2 : Nil)`.

[04:35] Let's swap things up a little bit. We'll use `myIntList`, which is slightly larger. 

```
main = render =<< withConsole do 
    logShow $ filter' (_ <= 2) myIntList 
```

In this case, 3 and 4 aren't less than or equal to 2, so that doesn't return them. We get `(1 : 2 : Nil)`. Finally, is greater than 1, 

```
main = render =<< withConsole do 
    logShow $ filter' (_ > 1) myIntList 
```

that will return us `(2 : 3 : 4 : Nil)`. Obviously, 1 isn't greater than 1.

[04:53] There you go. You've made your own filter in Purescript.