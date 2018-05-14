Instructor: [00:00] We can use `for` loops to iterate from the starting value up to the ending value. The ending value is included. 

#### Terminal
```javascript
Reason # for (x in 2 to 8) {
  print_int(x);
  print_string(" ");
};
2 3 4 5 6 7 8 - : unit = ()
```

[00:14] Keep in mind, though, it must be a valid range going from a lower to a higher integer. Otherwise, it won't go through any of these items. 

```javascript
Reason # 
for (x in 8 to 2) {
  print_int(x);
  print_string(" ");
};
- : unit = ()
```

To make the loop count in the opposite direction, we can replace `to` with `downto`. 

```javascript 
Reason # 
for (x in 8 downto 2) {
  print_int(x);
  print_string(" ");
};
8 7 6 5 4 3 2 - : unit = ()
```

[00:32] In addition, we have while loops at our disposal, they loop as long as the test condition inside the parentheses is true. 

```javascript
Reason # let x = ref(0);
let x: ref(int) = {contents: 0};
Reason # 
while (x^ < 5) {
  print_int(x^);
  x := x^ + 1;
};
01234- : unit = ()
```