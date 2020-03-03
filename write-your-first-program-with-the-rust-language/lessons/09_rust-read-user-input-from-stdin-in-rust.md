# Read user input from stdin in Rust

[Video link](https://www.egghead.io/lessons/rust-read-user-input-from-stdin-in-rust)

Instructor: [00:00] **Reading user input from `stdin` can be done by importing the `io` module from Rust standard library**. We then create an instance of `stdin` using the `stdin()` function. This comes with a method `read_line`. `read_line` takes a mutable reference to a string buffer.

[00:20] Let's create a mutable variable name which is a string and we pass a reference to that to `read_line`. **The reason `read_line` takes a mutable reference to a string buffer is because it will use this buffer to fill in the data that is entered by the user**.

```rust
use std::io;

fn main() {
  println("Please enter your name: ");

  let mut name = String::new();

  io::stdin().read_line(&mut name);
  println!("Hello {}", name)
}
```

[00:43] After the user is done entering its data, we can output the data using `println!` We save the file and run the code. We'll notice that the compiler warns us about the fact that `read_line` returns something of type result, which can possibly be an error. It also tells us that the error should be handled.

[01:05] However, our program still functions. Let's type in our name, and we'll see the program outputs our name.
