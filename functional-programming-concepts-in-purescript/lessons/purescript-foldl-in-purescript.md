Instructor: [00:01] We'll explain `foldl` by creating our own function. We'll call that `foldl'`, and its type definition is `forall a b.`, with a function of `(b -> a -> b)`. That goes to `b -> List a -> b`. On the next line, we'll do `foldl' f acc l`, and then that equals. Now we'll `case l`. Say case L of.

[00:27] Then some pattern matching. If our `l` is `Nil`, we'll return `acc`. If not, we'll do `x : xs`. We'll recursively call `foldl'`. We'll pass in `f`, then the results of calling `f acc x`. In the end, we'll pass in `xs`. 

```
myIntList :: List Int
myIntList = ((Cons 1 (Cons 2 (Cons 3 (Cons 4 Nil)))))

foldl' forall a b. (b -> a -> b) -> b -> List a -> b
foldl' f acc l = case l of
    Nil -> acc
    (x : xs) -> foldl' f (f acc x) xs
```

Let's put that to use.

[00:46] We'll go down here. We'll do `fold'`, and we'll pass in a function of `(+)`. Plus is a type of b -> a -> b, which is what we need for our fold. We'll pass our fold an initial value, which is `0`. Then, in the end, we'll pass it the list we want to go over, which is `myIntList`.

```
main = render =<< withConsole do 
    logShow $ foldl' (+) 0 myIntList
```

[01:06] Let's go through what happens when you run a function. First, we're casing over `l`, which is our list. Does our list equal Nil? No. Now we'll split that apart with `x : xs`. Our `x` will be 1, and our `xs` will be 2, 3, 4, and nil.

```
foldl' forall a b. (b -> a -> b) -> b -> List a -> b
foldl' f acc l = case l of
-- acc = 0
    Nil -> acc
    (x : xs) -> foldl' f (f acc x) xs
    -- (1) (2:3:4:Nil)
```

[01:22] We'll recursively call on `foldl'`, and we'll pass it our function, which is `(+)`. Our `acc` is 0 and our `x` is 1, and that turns into 0 + 1, which equals 1. Then we pass in the `xs`, which is 2, 3, 4, and nil.

```
foldl' forall a b. (b -> a -> b) -> b -> List a -> b
foldl' f acc l = case l of
-- acc = 0
    Nil -> acc
    (x : xs) -> foldl' f (f acc x) xs
    -- (1) (2:3:4:Nil) = foldl' (+) (0 + 1) (2:3:4:Nil)
```

[01:37] We'll go back to our recursive call of `foldl'`. Does l equal Nil? No, we just passed in 2, 3, 4, so we'll go on to the next part. Now we'll `:` over 2, 3, 4, so `x` will equal 2, and `xs` would be 3, 4, and nil. Now we're doing `acc + x`, which is 2, which 1 + 2 = 3. We're passing our `xs`, which is 3, 4, and nil.

```
foldl' forall a b. (b -> a -> b) -> b -> List a -> b
foldl' f acc l = case l of
-- acc = 1
    Nil -> acc
    -- X
    (x : xs) -> foldl' f (f acc x) xs
    -- (2) (3:4:Nil) = foldl' (+) (3) (3:4:Nil)
```

[02:09] At that point, our `acc` is 3. Then we `:` over 3, 4, so our `x` would be 3 and `xs` would be 4 and nil. We'll `foldl'`. `acc` is 3 and our `x` is three, so 3 + 3 = 6. We'll pass in our `xs`, which if 4 and nil. Our `acc` is now 6, and there's still no Nil for `l`. So `x : xs` would be 4 for the `x`, and the `xs` would be Nil.

```
foldl' forall a b. (b -> a -> b) -> b -> List a -> b
foldl' f acc l = case l of
-- acc = 6
    Nil -> acc
    -- X
    (x : xs) -> foldl' f (f acc x) xs
    -- (4) (Nil) = foldl' (+) (6) (4:Nil)
```

[02:38] This time, we do `acc xs`, so our `acc` is 6, plus `x` is 4, so that makes 10. Then, the second value we pass in is Nil. Again, we case on L, and finally, `l` is Nil, so we need to return `acc`. By now, `acc` has accumulated to 10, so we return 10.

```
foldl' forall a b. (b -> a -> b) -> b -> List a -> b
foldl' f acc l = case l of
-- acc = 10
    Nil -> acc -- = 10
    -- X
    (x : xs) -> foldl' f (f acc x) xs
    -- (4) (Nil) = foldl' (+) (10) (Nil)
```

[02:58] It should make a little more sense how `foldl'` is used when we pass in a function, which in our case was plus, which has a type of `b -> a -> b`. We pass an initial value, which is `0`, and then we pass our `myIntList`. As `foldl'` recursively calls, we keep accumulating the numbers. It's like doing 1 + 2 + 3 + 4, but `+` can be replaced with anything that has a type `b -> a -> b`.