Instructor: [00:00] To compare if two values have the same content, we use two equal signs. This is called structural equality. It works with all sorts of data structures, Booleans, tuples, lists, records, and so on.

#### Terminal
```javascript
Reason # 2 == 2;
- : bool = true
Reason # true == true;
- : bool = true 
Reason # ("Hello", 2) == ("Hello", 2);
- : bool = true 
Reason # [1, 2, 3] == [1, 2, 3];
- : bool = true 
Reason # type person = {name: string, age: int};
- : bool = true 
Reason # {name: "Tim", age: 28} == {name: "Tim", age: 28};
- : bool = true
``` 

[00:32] Structural equality in Reason does a deep comparison. Therefore, we can compare the nested structures, as well. Here, for example, comparing a tuple containing a list with one record. 

```javascript
Reason # (true, [{name: "Tim", age: 28}]) == (true, [{name: "Tim", age: 28}]);
- : bool = true
```

[00:52] Using a exclamation point and an equal sign checks if two values aren't structurally identical. 

```javascript
Reason # (true, [{name: "Tim", age: 28}]) != (true, [{name: "Tim", age: 28}]);
- : bool = false
Reason # 2 != 2
- : bool = false
Reason # 2 != 3
- : bool = true
```

Referential equality can be checked using three equal signs. 

```javascript
Reason # {name : "Tim", age: 28} === {name : "Tim", age: 28};
- : bool = false
```

[01:04] This operator doesn't compare the content, but rather if both values point to the same representation in memory. When binding a value to a name and comparing the name with itself, it is the same reference and results in true. 

```javascript
Reason # let tim = {name : "Tim", age: 28};
let tim: person = {name: "Tim", age: 28};
Reason # tim === tim;
- : bool = true
```

[01:17] Here, a comparison of structural equality to referential equality. 

```javascript
Reason # tim == tim;
- : bool = true
Reason # tim == {name : "Tim", age: 28};
- : bool = true
Reason # tim === {name : "Tim", age: 28};
- : bool = false
```

What to use now? 

[01:28] Most of the time, you will want to use structural equality. The only very few cases where referential equality is useful, one would be comparing mutable props inside `shouldComponentUpdate` of a React component. 

[01:42] It would be a quick and cheap check, but also might miss if a value with this identical content is passed in. In comparison, a lot of deep structural equality checks on large structures could slow down your rendering. 

[01:56] As said, in general, prefer structural equality. My `shouldComponentUpdate` example is quite a match case, and unless you need 60 frames per second, even structural equality might be fine. 

[02:09] Also, referential equality has its gotchas. For example, comparing two integers referentially will always result in true to how they are implemented. 

```javascript
Reason # 24 === 24;
- : bool = true
```

[02:20] Even more so, stay away from referential inequality. It only implies two things are not the same representation in memory. I can't even think of a useful use case.