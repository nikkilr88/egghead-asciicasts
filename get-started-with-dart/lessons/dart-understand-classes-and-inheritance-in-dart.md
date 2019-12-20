Instructor: [00:00] `class` will allow you to define a blueprint that represents a particular object. In this example, we are creating a blueprint describing a `person`. Creating a `class` has similar syntax to other languages, and this is by design.

#### Dart

```dart
void main() {
  Person johnny = Person('Johnny', 42,);
  johnny.speak();
}

class Person {
  var name;
  var age;

  Person {
    this.name = name;
    this.age = age;
  }

  speak() {
    print("My name is $_name. I'm $age years old.");
  }
}
```

#### Console Output
```text
My name is Johnny. I'm 42 years old.
```

[00:18] In the `person` constructor, we accept the `name` and `age` parameter, assigning its values to our instance properties, `name` and `age`. There is a simpler form of assigning these values with shorthand constructors.

```dart
class Person {
  var name;
  var age;

  Person(this.name, this.age);

  speak() {
    print("My name is $_name. I'm $age years old.");
  }
}
```

[00:29] We can also be specific about our instance property types. You can declare private instance properties or methods by prefixing them with an underscore. 

```dart
void main() {
  Person johnny = Person('Johnny', 42);
  johnny.speak();
}

class Person {
  String _name;
  int age;
  
  Person(this._name, this.age);

  speak() {
    print("my name is $_name. I'm $age years old.")'
  }

  void _hiddenMethod() {
    print('This method is hidden');
  }
}
```

We can also define getters and setters for our name, private property.

![Updated code in dart](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508417/transcript-images/understand-classes-and-inheritance-in-dart-code.jpg)

[00:56] Languages like Java allow you to specify multiple constructors for a `class`, differentiated by the amount of parameters defined for each constructor. In `Dart`, however, we can use named constructors without worrying about the parameter count.

```dart
void main() {
  Person johnny = Person('Johnny', 42);
  johnny.speak();
  print(johnny.name);
  johnny.name = 'Big Johnny';
  johnny.speak();

  Person jane = Person.fromJson({'name': 'Jane', 'age': 39});
  jane.speak();
}

class Person {
  String _name;
  int age;
  String occupation;

  Person(this._name, this.age);
  Person.fromJson(Map json) {
    _name = json['name'];
    age = json['age'];
  }
```

#### Console Output
```text
My name is Johnny. I'm 42 years old.
Johnny
My name is big Johnny. I'm 42 years old.
My name is Jane. I'm 39 years old.
```

[01:16] Parameters can also be optional for the constructor and its methods. 

```dart
void main() {
  Person johnny = Person('Johnny', 42, occupation: 'Pilot');
  johnny.speak();
  print(johnny.name);
  johnny.name = 'Big Johnny';
  johnny.speak();
  print(johnny.occupation);

  Person jane = Person.fromJson({'name': 'Jane', 'age': 39}, 'Web Developer');
  jane.speak();
  print(jane.occupation);
}
```

#### Console Output
```text
My name is Johnny. I'm 42 years old.
Johnny
My name is big Johnny. I'm 42 years old.
Pilot
My name is Jane. I'm 39 years old.
Web Developer
```

Alternatively, use the optional positional parameter. We can override several operators to perform various tasks like arithmetic and comparisons. In this example, we will override the equal, `==`, operator.

```dart
void main() {
  Person johnny = Person('Johnny', 42, occupation: 'Pilot');
  johnny.speak();
  print(johnny.name);
  johnny.name = 'Big Johnny';
  johnny.speak();
  print(johnny.occupation);

  Person jane = Person.fromJson({'name': 'Jane', 'age': 39}, 'Web Developer');
  jane.speak();
  print(jane.occupation);

  print(johnny == jane);
}

class Person {
  String _name;
  int age;
  String occupation;

  Person(this._name, this.age, {this.occupation});
  Person.fromJson(Map json, [this.occupation]) {
    _name = json['name'];
    age = json['age'];
  }

  bool operator ==(dynamic b) => _name == b.name && age == b.age && occupation ==
b.occupation;
```

#### Console Output
```text
My name is Johnny. I'm 42 years old.
Johnny
My name is big Johnny. I'm 42 years old.
Pilot
My name is Jane. I'm 39 years old.
Web Developer
false
```

[01:50] Let's create a matching `Jane` object, and compare. `class` is extendable using the `extends` keyword. To demonstrate this, we will create an `Employee` class extending person. This will inherit instance variables and methods from person.

[02:09] In this constructor, we will pass the `name` and `age` variables to the parent `person` constructor using the super method. We can also `override` the methods from the parent class. Fields that won't be changed once they are set can be marked as `final`.

```dart
print(johnny == jane);
Person jane2 = Person('Jane', 39, occupation: 'Web Developer');
print(jane == jane2);

var bob = Employee('Bob', 23, DateTime.now());
bob.speak();
}

class Employee extends Person {
  final DateTime joinDate;

  Employee(String name, int age, this.joinDate): super(name, age);



  @override
  speak() {
    print('My name is $name. I joined on $joinDate');
  }
}
```

#### Console Output
```text
My name is Johnny. I'm 42 years old.
Johnny
My name is big Johnny. I'm 42 years old.
Pilot
My name is Jane. I'm 39 years old.
Web Developer
false
true
My name is Bob. I joined on 2018-11-30 18:52:04.984
```

[02:36] Attempting to change a field marked as `final` will return an error.

![Error message for changing a field marked as final](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508419/transcript-images/understand-classes-and-inheritance-in-dart-final-error-message.jpg)

A feature supported with instantiating a `class` is method cascades. These allow to adopt a chaining pattern with invoking methods and setting values. Instead of doing this, you could instead use the `cascade` operator.

```dart
void main() {
  Person johnny = Person('Johnny', 42, occupation: 'Pilot')
    ..speak()
    ..name = 'Big Johnny'
    ..speak();
```

[03:01] Let's run this again.

![Using the cascade operator](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/understand-classes-and-inheritance-in-dart-cascade-operator.jpg)
