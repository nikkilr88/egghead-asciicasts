Instructor: [00:01] To demonstrate the pipe, `|`, also called reverse application operator, we're going to use an example where we apply multiple functions. The goal is to convert an upper case text to a lower case, then capitalized, and finally bound to the name info. 

#### Terminal
```javascript
Reason #
/**
 * ALERT
 * alert
 * Alert
 */
```

[00:17] We can achieve this using the function `capitalize`, and inside, lower case. 

```javascript
Reason # let info = String.capitalize(String.lowercase("ALERT"));
let info: string = "Alert"; 
```

With the reverse application operator, we can do this instead.  

```javascript
Reason # let info = "ALERT" |> String.lowercase |> String.capitalize;
let info: string = "Alert";
```

[00:39] Especially in combination with the partial application of arguments, this syntax can be quite handy. Here we use `sort`, `reverse`, and `find` to find the largest entry smaller than four in a list.

```javascript
Reason # 
 [8, 3, 6, 1]
  |> List.sort(compare)
  |> List.rev
  |> List.find(x => x < 4);
- : int = 3 
```