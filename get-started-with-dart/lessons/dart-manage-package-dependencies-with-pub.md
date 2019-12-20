Instructor: 00:00 Dart manages packages using a tool called Pub. To use packages in your project, create a `pubspec.yaml` file at your root directory. The simplest detail you can add to your pubspec file is the `package_name`. Optionally, you can add in a `description`, `version`, and `author`.

00:14 To pull in external packages, define the `dependencies` key, followed by a list of dependencies. 

#### pubspec.yaml
```yaml
name: awesome_package
description: An awesome package
version: 0.1.0
author: JermaineOppong

dependencies: 
  path: any
  mock_data: any
```

Running the `pub get` command in the terminal reads the dependencies listed in the pubspec file and installs them in a central location on the operating system. You can also specify a package version by defining a version constraint.

```yaml
dependencies:
  path: 1.6.2
  mock_data: 1.2.0
```

00:35 A `.packages` file is generated with details of the packages installed and the allocation on the system. 

![.packages file](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508419/transcript-images/dart-manage-package-dependencies-with-pub-packages-file.jpg)

This file is not to be committed to version control, as the system cache location differs depending on what operating system you are installing your packages.

00:49 Dart package versions use the semantic versioning format. So far, the package version is set as concrete, which means that exact version is pulled into our project. Using the greater than equals symbol, followed by the version number, `>=1.6.2`, allows the provided version or any greater one.

01:07 Using just the greater than symbol, `>`, followed by the version number, allows any greater version, excluding the given version number.

```yaml
dependencies: 
  path: '>=1.6.2'
  mock_data: '>1.2.0'
```

Running `pub get` in the terminal throws an exception, because the path module has no greater version than 1.6.2 at the time of this recording.

![pub get version exception](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/dart-manage-package-dependencies-with-pub-pub-get-version-exception.jpg)

01:23 Using the less than equals allows any version less than or equal to the provided version, `<=`>. Removing the equals symbol allows any lesser version, excluding the provided version number, `<`. Now, because the current Dart version at the time of this recording is over `2.0`, there is no version of the path package below `1.6.2`, which supports the current SDK version.

```yaml
dependencies:
  path: '<1.6.2'
  mock_data: '<1.2.0'
```

We can also specify a range of version. Here, we are saying that we want a version greater than or equal to the provided version, while excluding the next major version, 2.0. 

```yaml
dependencies: 
  path: '>=1.6.2 <2.0.0'
  mock_data: '>=1.2.0 <2.0.0'
```

In fact, we can simplify this by using the caret symbol, `^`. Set the `environment` details to ensure the package pulled in is compatible with the given Dart `sdk` version constraint. 

```yaml
dependencies: 
  path: '^1.6.2'
  mock_data: '^1.2.0'

environment:
  sdk: '>=2.1.0 <3.0.0'
```

You can define `dev_dependencies` for packages that are only used during local development.

```yaml
dev_dependencies;
  test: '^1.5.0'
```

02:25 To work with installed packages, use the `import` syntax, followed by the package prefix in `main.dart`. The Dart runtime will look up everything after the package prefix in the `.packages` file. 

#### main.dart
```dart
import 'package:path/path.dart';
import 'package:mock_data/mock_data.dart';

void main() {
  print(mockString());
}
```

Let's run this Dart file.

#### Terminal
```bash
$ dart bin/main.dart
6yCuy7q0QZ1qE2XN
```

02:41 Use the `as` keyword, followed by a key to create the namespace for the imported package. 

#### main.dart
```dart
import 'package:mock_data/mock_data.dart' as mock_data;
```

This style can also be used to import files from the current project. To demonstrate that, let's create a file called `awesome_package.dart` in the `lib` folder and define a function to return the current timestamp.

#### awesome_package.dart
```dart
getCurrentTimestamp() => DateTime.now().millisecondsSinceEpoch;
```

03:03 Returning to `main.dart` after the package prefix, use the package name you specified in your `pubspec` file, which will point to the files and folders in your `lib` directory. 

#### main.dart
```dart
import 'package:awesome_package/awesome_package.dart'
```

We should now be able to invoke our top level function.

#### main.dart
```dart
void main() {
  print(mockString());
  print(getCurrentTimestamp());
}
```

#### Terminal
```bash
$ dart bin/main.dart
4qpfVnUDJwMj1HTd
1550748849952
```

03:19 To upgrade your dependencies to the latest version, run `pub upgrade`. 

```bash
$ pub upgrade
```

You can also upgrade a specific package by running `pub upgrade`, followed by the name of the package.

```bash
$ pub upgrade mock_data
```

This concludes the lesson. 