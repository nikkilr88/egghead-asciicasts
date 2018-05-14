Instructor: [00:01] Let bindings are mutable by default. We can make them mutable using a reference to wrap the actual value. Basically, a reference is like a box, and the content inside can change. 

#### Terminal
```javascript
Reason # let foo = ref(5);
let foo: ref(int) = {contents: 5};
```

[00:13] To update the reference, we can use a colon followed by an equals sign. We here refer to the name. The content of our foo changed to six. 

```javascript
Reason = foo := 6;
- : unit = ()
Reason # foo;
- : ref(int) = {contents: 6}
```

[00:22] To retrieve the value of a reference, we can use the carrot character. 

```javascript 
Reason # foo^;
- : int = 6
```

References, for example, can be used to store the state of the whole game where you are, like this. 

```javascript
Reason # 
type game =
  | Menu
  | Playing
  | GameOver;
type game = Menu | Playing | GameOver;
Reason # let store = ref(Playing);
let store: ref(game) = {contents: Playing};
Reason # store := GameOver;
- : unit = ()
Reason # store := Menu;
- : unit = ()
```

[00:49] Keep in mind to use this feature sparingly to avoid unexpected behavior. Immutability comes with lots of benefits, and you better not give them up without any good reasons.