Instructor: [00:00] Let's quickly demonstrate how `concat` works on an array. We'll use the data array concat. We'll type out concat, and we'll have an array.

```
import Data.List (List(..), (:))
import Data.Array (concat)

import Control.Monad.Eff.Console (logShow)
import TryPureScript (render, withConsole)

myListList :: List (List Int)
myListList = 
    (Cons
            (Cons 1 (Cons 2 Nil))
        (Cons
            (Cons 3 (Cons 4 Nil))
    Nil))

main = render =<< withConsole do
    logShow $ concat []
```

Inside, we'll nest two other arrays. In the first one, we'll put `[1, 2]`. In the second one, we'll put `[3, 4]`. 

```
main = render =<< withConsole do
    logShow $ concat [[1, 2],[3, 4]]
```

If we look at the output, that returns our values in a single array, which is `[1,2,3,4]`.

[00:20] Next, our logs show `myListLists`. This is to demonstrate it's the equivalent of our nested array but in a list format. 

```
main = render =<< withConsole do
    logShow $ myListList
```

Now, let's `import` a `concat` for our list. We'll comment out `Data.Array`, and we'll import it from `Data.List`. 

```
import Data.List (List(..), (:), concat)
-- import Data.Array (concat)
```

Go back down to the bottom, and we'll do `concat myListList`. 

```
main = render =<< withConsole do
    logShow $ concat myListList
```

Like the array, it accumulates 1, 2, 3, and 4 into a single list, which `(1 : 2 : 3 : 4 : Nil)`.

## Output
```
((1 : 2 : Nil) : (3 : 4 : Nil) : Nil)
(1 : 2 : 3 : 4 : Nil)
```

[00:46] Let's create our own concat for lists. We'll call it `concatLists`, and that has a type of `forall a. List (List a) -> List a`. On the next line, we've got `concatLists Nil = Nil`. On the line after, we've got `concatLists (x : xs) = x <> concatLists xs`.

```
concatLists :: forall a. List (List a) -> List a
concatLists Nil = Nil
concatLists (x : xs) = x <> concatLists xs
```

[01:11] Let's try this out. We'll change `concat` to `concatLists`. 

```
main = render =<< withConsole do
    logShow $ concat myListList
    logShow $ concatLists myListList
```

Looking at our output, and they're both exactly the same, 1, 2, 3, 4, and nil. 

## Output
```
((1 : 2 : Nil) : (3 : 4 : Nil) : Nil)
(1 : 2 : 3 : 4 : Nil)
(1 : 2 : 3 : 4 : Nil)
```

Let's take a little closer look at what happens when we put our list through `concatList`.

[01:27] Our list isn't nil, that'll skip that case, and then on to the second case. We'll do `x cons xs`. Let's see what `xs` is. We could do that by removing `<> concatLists xs` on line 21, and then you'll see that `x` equals 1, 2, and Nil. Now, let's see what `xs` is. We'll need to change that up here to list of lists, because it's what it's returning us.

```
concatLists :: forall a. List (List a) -> List (List a)
concatLists Nil = Nil
concatLists (x: xs) = xs
```

[01:49] If we look at the output, it's `((3 : 4 : Nil) : Nil)`. It's still a nested list at the moment. Let's put things back. 

```
concatLists :: forall a. List (List a) -> List a
concatLists Nil = Nil
concatLists (x : xs) = x <> concatLists xs
```

Then we're recursively calling our nested list of 3, 4, nil, nil. If we put that through, that'll give us 3, 4, nil. 

```
main = render =<< withConsole do
    logShow $ myListList
    logShow $ concatLists myListList
    logShow $ concatLists ((3 : 4 : Nil) : Nil)
```

When that recursion is done, we'll be appending 1, 2, nil to 3, 4, nil.

[02:10] Let's have a look what this looks like. We'll put it down here, and 1, 2, nil, 3, 4, nil,

```
main = render =<< withConsole do
    logShow $ myListList
    logShow $ concat myListList
    logShow $ concatLists myListList
    logShow $ concatLists (1 : 2 : Nil) <> (3 : 4 : Nil)
```

gives us `(1 : 2 : 3 : 4 : Nil)`. 

There you have it. That's how we do our concat lists.

[02:22] Next, let's have a little play with `concatMap`. 

```
import Data.Array (concatMap)
```

We would change this line to say `concatmap`, function, we'll leave empty for now, and then, it'll be an array inside of an array. The first one will have `[1,2]`, the second one `[3,4]`.

```
main = render =<< withConsole do
    logShow $ myListList
    logShow $ concatMap () [[1,2], [3,4]]
    logShow $ concatLists myListList
```

[02:39] Back to our function, and we'll put a `map`. We'll do `(_ + 1)`, each element that comes into our map, we'll take that element and add one to it. 

```
main = render =<< withConsole do
    logShow $ myListList
    logShow $ concatMap (map (_ + 1)) [[1,2], [3,4]]
    logShow $ concatLists myListList
```

If you look at the output, 

```
((1 : 2 : Nil) : (3 : 4 : Nil) : Nil)
[2,3,4,5]
```

we've taken our nested array, added 1 to each element, and concatenated those elements into one array.

[02:59] Let's try out the same thing with the list. We'll add `concatMap` to `Data.List`. 

```
import Data.List (List(..), (:), concat,concatMap)
```

We'll copy `myListList`, and we'll add it to the end. 

```
main = render =<< withConsole do
    logShow $ myListList
    logShow $ concatMap (map (_ + 1)) myListList
    logShow $ concatLists myListList
```

Looking at our results, that will give us `(2 : 3 : 4 : 5 : nil)`. Right. Let's make our own `concatMap` for lists.

[03:15] We'll call it `concatMapLists`, and that'll have a type of `forall a b. (List a -> List b)`. This second argument would be a `List (List a) -> List b`. On the next line, we'll do a bit of pattern matching. It'd be `concatMapLists f Nil`. If the second argument is `Nil`, we'll just return `Nil`.

[03:40] On the next line, we'll do `concatMapLists f (x : xs) = (f x) <> (concatMapLists f xs)`. 

```
concatMapLists forall a b. (List a -> List b) -> `List (List a) -> List b
concatMapLists f Nil = Nil
concatMapLists f (x : xs) = (f x) <> (concatMapLists f xs)
```

This is similar to `concatLists`, but what we're doing is we're passing around the function. In our case, we're mapping and we're adding 1 to the elements.

[04:00] You can see in the line it says `f x`, `f` of `x` will be mapping over 1 and 2. That'll give us 2 and 3. Then, we'll recursively call `concatMapLists`, passing in the `f` again and the `xs`. That would be 3 and 4. Then, we'll map + 1 with those, so that'd be 4 and 5. If we append those together and concat the results, that'd be `(2 : 3 : 4 : 5 : nil)`.

[04:25] There you go. You've been able to create a `concat` and a `concatMap` for lists.