Instructor: [00:00] To create a tuple, we open a parenthesis. Add two or more values and close it with a parenthesis again. The result is an immutable tuple of two elements. 

#### Terminal
```javascript
Reason # ("Anna", 24);
- : (string, int) = ("Anna", 24)
```

A tuple can hold fixed number of values. These can be of same or different types. Also, each element is identified by position, rather than by name. 

[00:22] Let's create another one with an integer, two booleans, and a string. 

```javascript
Reason # (42, true, false, "foo");
- : (int, bool, bool, string) = (42, true, false, "foo")
```

As you can see, you can combine all sorts of types in there. That's the one law. This time, we're going to nest a tuple. We describe a circle with a point having x and y position and the radius. It doesn't indicate that it is a circle, but we can create a tuple type and provide a type annotation for clarity. 

```javascript
Reason # type point = (int, int);
type point = (int, int);
Reason # let myPoint: point = (4, 3);
let myPoint: point = (4, 3);
```

[00:50] Let's see how we can access elements of a tuple. The standard library provides two convenience functions to access the first two elements. `fst` for first, to access the first item, and `snd` for second, to access the second one. In case you want to access any other element, we are required to use the structuring. 

```javascript
Reason # fst((0,2));
- : int = 0
Reason # snd((0,2));
- : int = 2
Reason # snd(myPoint);
- : int = 3
```

[01:14] So far, we have seen structuring only for records, but it also works for tuples using parentheses instead of curly braces. Value of `3` is not bound to the name `z`. 

```javascript
Reason # let (x, y, z) = (1, 2, 3);
let x: int = 1;
let y: int = 2;
let z: int = 3;
Reason # z;
- : int = 3 
```

In case you don't want all positions to be assigned, we can replace the ones to be ignored with an underscore. 

[01:34] Keep in mind the order within tuples is fixed. Every tuple is immutable. This means we don't update tuple; we'd rather create a new one. For example, like this. You created another circle with the second element, the radius, and you replaced the six. 

```javascript
Reason # let anotherPoint = (fst(myPoint), 6);
let anotherPoint: (int, int) = (4, 6);
```

[01:55] In general, it's recommended to keep the usage of tuples local, update the structures that are long-living and passed around often. It's recommended to prefer records. 

[02:05] Next, we want to focus on the type lists. Lists are homogeneous and immutable. Homogeneous means we can't have different types of items in a list. That said, we can't have a variance storing different types and create a list of constructors. 

```javascript
Reason # let myList = [1, 2, 3];
let myList: list(int) = [1, 2, 3];
Reason # [2, "Hello"];
Error: This expression has type string but an expression was expected of type int

Reason # 
type item = 
  | Measurement(int)
  | Note(string);
type item = Measurement (int) | Note(string);
Reason # [Measurement(2), Note("Hello")];
- : list(item) = [Measurement(2), Note("Hello")] 
```

[02:27] Second trait of lists is that they're immutable. This means we can't append, replace, or prepend an item to the same list. We'd rather have to create a new one. Then, we'll do ways how to add new elements by creating a new list. 

[02:41] For once, we use the `append` function on the lists module shipping with the standard library. 

```javascript
Reason # List.append([1, 2, 3], [4, 5]);
- : list(int) = [1, 2, 3, 4, 5]
```

The other way is to use Reason special operator, (`@`) to concatenate lists. 

```javascript
Reason # [1, 2] @ [3, 4];
- : list(int) = [1, 2, 3, 4]
```

The third one is using the spread operator (`...`). Keep in mind this only with prepending one or multiple elements, but not for appending elements. 

```javascript
Reason # [0, ...[1, 2, 3]];
- : list = [0, 1, 2, 3]
Reason # [...[1, 2, 3], 4];
Error: Syntax error
```

[03:05] The recommended way to access a list is using the `switch` expression. We will cover this later extensively in the pattern matching lesson. To give you a glimpse of it, here's an example where we get out the first element of the list and print it as a string. 

```javascript
Reason # let myList = [2, 3];
let myList: list(int) = [2, 3];
Reason # 
let message = 
  switch (myList) {
  | [] => "This list is empty"
  | [head, ...rest] => "The head of the list is " ++ string_of_int(head)
  };
/* let message: string = "The head of the list is 2";
```

[03:34] As an alternative to access a list item, we can use `List.nth`. Keep in mind, it will raise an exception in case the list is too short, and therefore it's rather recommended to rely on other strategies like switch expressions. 

```javascript
Reason # List.nth([2, 3], 0);
- : int = 2
Reason # List.nth([], 0);
Exception: Failure("nth"
```

[03:52] To create a new list and manipulate each item, we have `List.map` at our disposal. It accepts a function as the first parameter and the regional list as a second one. 

```javascript
Reason # List.map(x => x + 1, [2, 3]);
- : list(int) = [3, 4]
```

In the standard library, there are many more utility functions like find, filter, sort, exist, split and so on. We can use the API recommendation on the Reason website to figure out more. 

[04:17] Let's move on to arrays. Arrays are declared the same way as lists, except the array's content is wrapped in pipes and brackets. Compared to lists, one significant difference is that array's mutable. 

[04:32] You can access an item using brackets, but also assign a new value to this position using the equal sign. 

```javascript
Reason # let myArray = [|2, 3|];
let myArray: array(int) = [|2,3|];
Reason # myArray[0];
- : int = 2
```

Same as of list, the standard library ships a couple of useful utility functions. For example, `Array.map`.

```javascript
Reason # Array.map(x => x + 1, [|2, 3|]);
- : array(int) = [|3, 4|]
```