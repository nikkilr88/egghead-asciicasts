# Compile and run a Rust program from scratch

[Video link](https://www.egghead.io/lessons/rust-compile-and-run-a-rust-program-from-scratch)

Instructor: [00:00] Start by creating a file `main.rs` and create a function called main using the fn keywords, `fn main()`. This is the function that will be run when we execute our program. To output "Hello, World" we use `println!`, or print line, which takes a string. We give it "Hello, World." Then we save the file.

### main.rs
```rs
fn main() {
  println!("Hello World");
}
```

[00:25] Next, we compile the program using the `rustc` compiler in the terminal, `rustc main.rs`. Once that is done, we can check what files we have with `l` in the terminal. We'll now see that there is a new file called `main`, which can be executed straight from the command line.
