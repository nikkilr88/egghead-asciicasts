Let me show you how list slicing works in Python. Slicing is a way to return a copy of a list with specified elements. You slice a list by providing the start and end of where you'd like the slice to be.

#### Terminal
```bash
>>> a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
In this example, we're slicing from two to five. 

```bash
>>> a[2:5]
[3, 4, 5]
```

The important thing to remember is lists are indexed starting at zero, so index item two is the third element in the list. The end point of our slice is the fifth index item in the list, which is the number six, but in Python the end point is not included. The five is the last number that we get in our copied list.

If you don't specify an end point, it continues on to the end of the list, and if you don't provide a start point, it starts at the beginning of the list. You can use negative numbers to specify backwards from the end of the list. In this example it's going to go to the fourth index from the end and then return to the end of the list.

```bash
>>> a[2:]
[3, 4, 5, 6, 7, 8, 9]
>>> a[:5]
[1, 2, 3, 4, 5]
>>> a[-4:]
[6, 7, 8, 9]
```

You can also use list slicing to replace certain parts of the list. If we specify `a[2:5]`, and then provide a new list with the values we'd like to replace it with, when we print out the list we can see that the values that matched that slice were replaced with the values we provided.

```bash
>>> a[2:5] = ['foo', 'bar', 'baz']
>>> a
[1, 2, 'foo', 'bar', 'baz', 6, 7, 8, 9]
```