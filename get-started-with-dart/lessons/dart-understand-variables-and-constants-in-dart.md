Instructor: [00:00] Here is an example of a variable. `Dart` is able to infer the type of value assigned to our variable, which in this case is an `integer`, although we could be explicit by declaring the type.

#### Dart

```dart
void main() {
  var a = 1;
  print(a);

  int b = 2;
  print(b);
```

[00:16] We can also set constant values, which essentially are values that cannot be changed once they are set. This comes in two forms. There's the `final` keyword. If we attempt to reset this to a different value, we will get an error.

```dart
final c = 'Hello';
c = "Hello again";
print(c);F
```

![Dart error message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/understand-variables-and-constants-in-dart-error-message.jpg)

[00:36] The second form of declaring `constant` values is using the `const` keyword. The difference in practice between `const` and `final` is you use `final` when certain instance variables belong into classes.

[00:49] Also, `const` is treated as a compile term constant, which means that any value we assign will be calculated during code compilation. `const` variables must therefore be initialized with a valid `const` value, or an exception is thrown.

[01:10] Some of the valid `const` values are `Number`, `String`, `Boolean`, `Array`, `Map`, `Symbol`, and any constructors marked as `const`.

```dart
  const d = 'World'; // Number, String, Boolean, Array, Map,
Symbol, const T
  print(d);
}
```
