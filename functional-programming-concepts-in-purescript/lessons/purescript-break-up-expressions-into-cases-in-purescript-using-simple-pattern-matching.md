Instructor: [00:00] We'll start off by making a function and calling it `nonSense`. That'll have the type definition of `Int -> Int -> Int`. Now we'll type `nonSense n 0 = 0` and `nonSense n _ = n`.

```
nonSense :: Int -> Int -> Int
nonSense n 0 = 0
nonSense n _ = n 
```

[00:12] I'll quickly do a demonstration of this function, so you get an idea of how it works. We'll type out `nonSense`, the integer `22`, and `0`. 

```
main = render =<< withConsole do
    log $ show $ nonSense 22 0
```

That returns us `0`. Let's change numbers up a little bit, `35` and `34`. That returns `35`. Then we'll do `12` and `0` and that returns us `0`. So, how's our function working? Let's look at line eight. We have `N` and `0` as inputs. What happens, if it sees a second input is a `0` then it will return us `0`. If doesn't have `0` as its second input, then it will go on the second line, which is line nine, and whatever integers you passed it, it'll return us the first one.

[00:54] The `_`, you could think of it as a wild card. Basically, it doesn't care what it is. In this instance, it'll ignore it and return us `N`, which is the first integer.

[01:04] Let's expand a little bit from this and create a new function called `whoIsgreater :: Int -> Int -> Int`. On the next line, `whoIsGreater n m | n > m = n`. On the next line, we'll do another `| otherwise = m`. 

```
whoIsGreater :: Int -> Int -> Int
whoIsGreater n m | n > m = n
                 | otherwise = m
```

Quickly see it in action. We'll type in `whoIsgreater 12 44`, which returns us `44`.

```
main = render =<< withConsole do
    log $ show $ whoIsgreater 12 44
```

[01:29] How does this work? Looking at line eight, we have an `n` and an `m`. We can imagine it's `12` and `44`. Then we have this pipe, which we call a guard. You can think of this guard as a check. It's checking if `n` is greater than `m`. If that's the case, it'll return `n`. Otherwise, if that pattern doesn't match, then we use the keyword `otherwise`, it will just return us `m`.

[01:53] In this scenario, you can think of it as an if/else statement. Calling `whoIsgreater` with `12` and `44` didn't match our first pattern, because `12` isn't greater than `44`. It went straight to `otherwise` and returns us `44`. Let's change the function inputs to show you the first pattern matching. We'll change `whoIsgreater 12 11`. 

```
main = render =<< withConsole do
    log $ show $ whoIsgreater 12 11
```

As you can see, `12` is obviously greater than `11`, and that returns us `12`.

[02:19] Now I'll demonstrate another type of pattern matching. We'll create a function called `isEmpty`, and that's the type definition of `forall a. Array a -> Boolean`. I'll give a quick explanation of what `forall a` is doing. It's quite simply that all the `a`'s used in this type declaration must be of the same type.

[02:37] In this declaration, we've done `Array a`. You could say, for all `a`'s in our array, should have matching types. On the next line, we'll do `isEmpty` open and close square brackets, which represents an empty array, `= true`. On the next line, `isEmpty_ = false`.

```
isEmpty :: forall a. Array a -> Boolean
isEmpty [] = true
isEmpty _ = false
```

[02:57] Let's see this in action, `isEmpty []`. 

```
main = render =<< withConsole do
    log $ show $ isEmpty []
```

That returns us `true`. Now, inside that array, we'll put a `1` and a string of `a`, 

```
main = render =<< withConsole do
    log $ show $ isEmpty [1, "a"]
```

and we'll get a type error. 

## Output
```
Error 1 of 1

Could not match type 

    String

with type

    Int
```

That's going back to our `forall a`. We expected both values to be of the same type. In this case, and int and a string obviously don't match.

[03:17] If we change our string to another int of `2`, you'll see that it'll match, 

```
main = render =<< withConsole do
    log $ show $ isEmpty [1, 2]
```

and that'll return us `false`. This is because the pattern match didn't match on line eight, went to line nine, and returned us `false`.