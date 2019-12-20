Instructor: [00:00] Control flow statements are possible with Dart in the following forms. An `if` statement allows us to evaluate a condition and decide what to do depending on its outcome.

[00:11] The `else` block is optional, which reflects behavior similar across most programming languages. The condition we are evaluating must explicitly result to a Boolean value, else an error is thrown.

![Error message recieved not having a boolean value](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/control-flow-statements-in-dart-error-message-boolean.jpg)

#### Dart

```dart
void main() {
  // if/else statements
  var yearOfBirth = 1988;

  if (yearOfBirth < 1990) {
    print('Born before the 90s');
  } else {
    print('Born during/after the 90s');
  }
  // for loop
  // while and do-while loop
  // break/continue/ statement
  // switch and case
  // assert
}
```

[00:24] You can also chain your `if` statements. You can write the statement in its short form using the ternary operator. 

```dart
void main() {
  // if/else statements
  var yearOfBirth = 1988;

  if (yearOfBirth < 1990) {
    print('Born before the 90s');
  } else if {
    print('Born in 1990');
  } else {
    print('Born during/after the 90's)
  }

  var str = yearOfBirth < 1990 ? 'before the 90's : 'during/after the 90's;
  print(str);
  // for loop
  // while and do-while loop
  // break/continue/ statement
  // switch and case
  // assert
}
```

#### Console Output

```text
Born before the 90s
before the 90s
```

Dart support various `for` loops with a familiar syntax.

```dart
//  } else if (yearOfBirth == 1990) {
//    print('Born in 1990');
//  } else {
//    print('Born during/after the 90s');
//  }

//  var str = yearOfBirth < 1990 ? 'before the 90s' : 'during/after the 90s';
//  print(str);

  // for loop
  var message = StringBuffer('Dart is fun');

  for (var j = 0; j < 3; j++) {
    message.write('!');
  }

  print(message);
  // while and do-while loop
  // break/continue/ statement
  // switch and case
  // assert
}
```

#### Console Output

```Text
Dark is fun!!A
```

[00:39] We can also capture the values of the current loop index inside a closure. When working with iterable types like `list` and `set`, you can use the `for/each` method to loop over its items.

```dart
print(message);

var callbacks = [];

for (var k = 0; k < 3; k++) {
  callbacks.add(() => print(k));
}
callbacks.forEach((cb) => cb());
// while and do-while loop
// break/continue/ statement
```

#### Console Output

```text
Dark is fun!!!
0
1
2
```

[00:52] You could also use a `for` loop for iterable types. The `while` loop can be used as an alternate form of the `for` loop. Use a dual loop to ensure that a `print` logic runs at least once. Use a `break` statement to stop a running loop. Use `continue` to skip the current loop iteration.

```dart
// //   callbacks.forEach((cb) => cb());
//   for (var cb in callbacks) { cb(); }

  // while and do-while loop
//   var k = 0;

//  while (k < 10) {
//    print(k);
//    k++;
//  }

//   do {
//     print(k);
//     k++;
//   } while (k < 10);

  // break/continue statement
//   var i = 0;

//   do {
//     if (i == 5) break;
//     print(i);
//     i++;
//   }  while (i < 10);

  for (var n = 1; n < 10; n++) {
    if (n % 2 != 0) continue; // skip odd numbers
    print(n);
  }
```

[01:19] Use `switch` and `case` statements for comparing integers, strings, and compile time constant values. Here, the `break` statement stops further execution of the `switch` statement. Omitting the break will give you an error unless you are following through to the next block within the sequence.

![Error message from omitting the break](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/control-flow-statements-in-dart-error-message-omitting-break.jpg)

```dart
// switch/case statements
//  const appStatus = 'CLOSE';

//  switch (appStatus) {
//    case 'OPEN':
//      print('Your application is open.');
//      break;
//    case 'PENDING':
//      print('Your application is pending.');
//      break;
//    case 'CLOSE':
//    default:
//      print('Your application is closed.');
//  }
  // assert
```

[01:43] Use an `assert` to disrupt code execution if the given condition evaluates the false. Parse a string as the second argument to attach a message to the `assert`. This concludes the lesson.

```dart
  // assert
  assert(''.isEmpty); // No output as it evaluates to true
  assert(''.isNotEmpty, 'The string is empty'); // Should throw as statement evaluates to false
}
```

#### Console Output

```text
Uncaught exception: 
Assertion failed: "The string is empty"
```