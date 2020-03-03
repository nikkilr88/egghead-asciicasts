# Create a Rust package with the Cargo package manager

[Video link](https://www.egghead.io/lessons/rust-create-a-rust-package-with-the-cargo-package-manager)

Instructor: [00:00] The most convenient way to create a new Rust project is by using the Cargo package manager and its new commands, `cargo new`. The new command takes the name of a project. 

### Terminal
```cargo
cargo new say-my-name
```

Once we execute it, we'll see that it has generated a bunch of files including a Git repository, a src directory and a Cargo.toml file.

[00:28] The src directory only includes a main.rs file. If we take a look at its contents, we'll see it has a simple main() function that outputs "Hello, world!"

[00:42] The Cargo file is a package file that specifies the name of the project, its version, the author's name and its email address and the edition or version of the Rust programming language. Additionally, we can specify other configuration values such as dependencies or dev-dependencies.
