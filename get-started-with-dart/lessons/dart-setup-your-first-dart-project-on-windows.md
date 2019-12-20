Instructor: [00:00] Using the Chocolatey package manager, we can install the Dart SDK by running `choco install dart-sdk`.

#### Terminal

```
choco install dart-sdk
```

![Installing Dart with Chocolatey](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/setup-your-first-dart-project-on-windows-choco-install.jpg)

Alternatively, you can install the Dev Channel version by passing the `--pre` flag.

```
choco install dart-sdk --pre
```

To upgrade a pre-existing Dart installation, run `choco upgrade dart-sdk`.

```
choco upgrade dart-sdk
```

![Upgrading pre-existing Dart installation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/setup-your-first-dart-project-on-windows-updating-dart.jpg)

[00:23] Restart your command prompt in order to confirm your Dart installation. Confirm Dart is properly installed by typing the `dart` command and passing the `--version` flag.

```
dart --version
```

[00:32] In your working folder, create a `pubspec.yaml` file. A `pubspec` file contains metadata and configuration related to a Dart project. We will enter the minimum information about our project, such as a `name`, `description`, and an `author`.

#### pubspec.yaml

```yaml
name: dart_project
description: An awesome Dart application
author: Jermaine Oppong
```

[00:48] All starting files go in a `bin` folder. Let's create one containing a `main.dart` file. In this file, we will define a top-level function called `main`. Dart requires this function to start our application. Save the file and run.

#### main.dart

```dart
void main() {
  print(DataTime.now());
}
```

This completes the lesson.
