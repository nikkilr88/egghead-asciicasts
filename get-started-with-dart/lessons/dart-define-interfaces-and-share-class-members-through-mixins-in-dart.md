Instructor: [00:00] An interface provides a contract, containing instance variables and methods that must be defined by the `class` that implements it. To create an interface, define a class, or an abstract class. Classes in Dart have the flexibility of either being extended as a parent class, or implemented as an interface.

[00:18] Let's now write a `class` that implements our interface. Let's define our constructor that accepts a `name` and `manufacturer` as parameters, which are automatically assigned to the name and manufacturer instance variables. Let's now implement the `getDeviceInfo` method from our interface, and instantiate this class.

#### Dart

```dart
void main() {
  var pixel = Phone('Pixel XL', 'HTC');
  pixel.getDeviceInfo();
}

abstract class Device {
  String name;
  String manufacturer;
  void getDeviceInfo();
}

class Phone with implements Device {
  Phone(this.name, this.manufacturer);

  String name;
  String manufacturer;

  void getDeviceInfo() => print('''
  ===
  Device name: $name
  Manufactured by: $manufacturer
  ''');
}
```

#### Console Output
```text
=== 
Device name: Pixel XL 
Manufactured by: HTC
```

[00:44] `Mixins` allow us to reuse a `class`'s code in multiple hierarchies without polluting our inheritance tree. We can define a mixin by creating a `class`. We can now share this mixin on our `Phone` class using the `with` clause. This now allows us to access the properties on our mixin.

```dart
class Phone with FeaturesMixin, UtilitiesMixin implements Device {
  Phone(this.name, this.manufacturer);

  String name;
  String manufacturer;

  void getDeviceInfo() => print('''
  ===
  Device name: $name
  Manufactured by: $manufacturer
  ''');
  --FEATURES--
  Bluetooth: ${blueTooth ? 'Yes': 'No'}
  Dual SIM: ${dualSim ? 'Yes': 'No'}
  NFC: ${nfc ? 'Yes': 'No'}
  ''');
}
```

#### Console Output
```dart
=== 
Device name: Pixel XL 
Manufactured by: HTC

--FEATURES--
Bluetooth: Yes
Dual SIM: No
NFC: Yes
```

[01:18] As of Dart 2.1, it's recommended to use the `mixin` keyword as a convention. Mixins are similar to classes, and therefore can be extended by other mixins using the `on` keyword. `UtilityMixin` can only be used when features mixin precedes it, else an error will be thrown. Let's add some methods to help print all our features and `UtilityMixin`.

```dart
mixin FeaturesMixin {
  bool blueTooth = true;
  bool dualSim = false;
  bool nfc = true;
}

mixin UtilitiesMixin on FeaturesMixin {
  bool calculator = true;
  bool flashlight = true;
  bool thermometer = false;

  String _has(bool feat) => feat ? 'Yes': 'No';

  void getAllFeatures() => print('''
  --FEATURES--

  Calculator: ${_has(calculator)}
  Flashlight: ${_has(flashlight)}
  Thermometer: ${_has(thermometer)}
  ===
  ''');
}

abstract class Device {
  String name;
  String manufacturer;
  void getDeviceInfo();
}

class Phone with FeaturesMixin, UtilitiesMixin implements Device {
  Phone(this.name, this.manufacturer);
```

[02:06] Then we'll print this out. We are also able to access properties and methods from our parent mixin using the `super` keyword. Let's refactor `getDeviceInfo` in our phone class, and run again.

```dart
void main() {
  var pixel = Phone('Pixel XL', 'HTC');
  pixel.getDeviceInfo();
  pixel.getAllFeatures();
}

mixin FeaturesMixin {
  bool blueTooth = true;
  bool dualSim = false;
  bool nfc = true;
}

mixin UtilitiesMixin on FeaturesMixin {
  bool calculator = true;
  bool flashlight = true;
  bool thermometer = false;

  String _has(bool feat) => feat ? 'Yes': 'No';

  void getAllFeatures() => print('''
  --FEATURES--

  Bluetooth: ${_has(super.blueTooth)}
  Dual SIM: ${_has(super.dualSim)}
  NFC: ${_has(super.nfc)}
  Calculator: ${_has(calculator)}
  Flashlight: ${_has(flashlight)}
  Thermometer: ${_has(thermometer)}
  ===
  ''');
}

abstract class Device {
  String name;
  String manufacturer;
  void getDeviceInfo();
}

class Phone with FeaturesMixin, UtilitiesMixin implements Device {
  Phone(this.name, this.manufacturer);

  String name;
  String manufacturer;

  void getDeviceInfo() => print('''
  ===
  Device name: $name
  Manufactured by: $manufacturer
  ''');
}
```

#### Console Output
```text
=== 
Device name: Pixel XL 
Manufactured by: HTC

--FEATURES--
Bluetooth: Yes
Dual SIM: No
NFC: Yes
Calculator: Yes
Flashlight: Yes
Thermometer: No
===
```