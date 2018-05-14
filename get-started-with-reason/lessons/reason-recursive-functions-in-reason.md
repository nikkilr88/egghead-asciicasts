Instructor: [00:00] We create a function that counts up to 10 and brings out the parameter after each increment. Our function calls itself recursively, with the parameter being incremented by one with each call. Unfortunately, we receive an error when doing so. 

#### Terminal
```javascript
Reason # let countUntilTen = x => {
  if (x < 10) {
    print_int(x)
    countUntilTen(x + 1);
  };
};

Error: Unbound value countUntilTen 
```

[00:19] The issue here is that by default, the function body doesn't let access to the `let` binding that the function points to. Including the `rec` keyword makes this possible. This allows functions to see and call themselves to provide us the power of recursion. 

```javascript
Reason # let rec countUntilTen = x => {
  if (x < 10) {
    print_int(x)
    countUntilTen(x + 1);
  };
};
let countUntilTen: int => unit = <fun>;

Reason # countUntilTen(6);
6789- : unit = () 
```

[00:37] Sometimes, though, we want mutual recursive functions, and this is also possible. Start with a single recursive function using the `rec` keyword, and then add a second one using the `end` keyword. 

```javascript
Reason#
let rec odd = x => ! even(x)
and even = x => {
  if(x == 0) {
    true;
  } else {
    odd(x - 1);
  };
};
let odd: int => bool = <fun>;
let even: int => bool = <fun>;
```

[00:57] Note that there is no semicolon ending at the first line, and no let on the second line.

```javascript
Reason # even(2);
- : bool = true 
Reason # even(3);
- : bool = false
```