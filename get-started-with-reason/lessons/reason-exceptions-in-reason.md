Instructor: [00:00] Reason also has exceptions. For example, if you try to find the integer 42 inside an empty list, an exception, not found, is thrown. 

```javascript
Reason # List.find(x => x == 42, []);
Exception: Not_found.
```

[00:09] We also can raise our own exceptions using the `raise` function. To catch them, we can use pattern matching, since exceptions are just a special kind of variant. 

```javascript
Reason # raise(Not_found);
Exception: Not_found. 
Reason # 
try (raise(Not_found)) {
| Not_found => ":("
};
- : string = ":("
```

[00:25] In fact, we can directly match exceptions, as well, in a `switch` expression using the `exception` keyword. 

```javascript
Reason # 
switch (List.find(x => x == 42, [])) {
| item => "Found it"
| exception Not_found => "Not found"
};
- : string = "Not found" 
Reason # 
switch (List.find(x => x == 42, [42])) {
  | item => "Found it"
  | exception Not_found => "Not found"
  };
- : string = "Found it"
```

[00:45] Using the exception keyword, we can also create an exception. 

```javascript
Reason # exception Inputclosed(string);
exception InputClosed(string);
Reason # raise(inputClosed("the stream has closed"));
Exception: InputClosed("the stream has closed").
```

[00:55] In general, it's recommended to use exceptions sparingly. In most cases, you get away just fine using an option. Also, more and more often, newer APIs are doing so.