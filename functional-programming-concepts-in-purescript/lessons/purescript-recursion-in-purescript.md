Instructor: [00:00] to do this, we'll create a function called `fact`. That will take `Int -> Int`. Pattern match on that, and what we'll do is `fact 0 = 1`. Then, `fact n = n * fact (n - 1)`.

[00:14] It might have become apparent that we're creating a factorial function. We'll test this out, and it's `fact 3`, that will return us `6`. 

```
main = render =<< withConsole do 
    log $ show $ fact 3
```

Let's try fact `6`, and that will return us `720`. Let's quickly explain how a factorial works. Passing `6` to our factorial function would actually be `6 * 5 * 4 * 3 * 2 * 1`. That would return us `720`.

[00:42] When you first call factorial, the `n` becomes a `6`. Then, you're doing `6-1`, which is `5`. We're using the `5` to pass back into fact, which would then do fact `5 * fact 4 * fact 3 * fact 2 * fact 1`. Technically once it had reached `1`, what it'd do would be fact `1-1`, which would give us fact `0`. That would return a `1`.

[01:09] Pattern matching against 0 is what we do to get out of our function. If you imagine that we didn't, then it'd keep going into -1, -2, -3, and so on, right up to the point where you'd end up having a slack overflow and everything blowing up.

[01:22] Now, you should be able to see how we're creating this recursion by calling `fact` within `fact` and continuing to the point where we pattern match against `0`. That would come out of our recursion and return us the result which is `720`. There you have it, how to do recursion in PureScript.