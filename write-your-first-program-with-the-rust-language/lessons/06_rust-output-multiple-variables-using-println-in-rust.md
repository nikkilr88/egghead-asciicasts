# Output multiple variables using println!() in Rust

[Video link](https://www.egghead.io/lessons/rust-output-multiple-variables-using-println-in-rust)

Instructor: [00:00] To output multiple variables, println! supports multiple placeholders as well. If we have variable `name` and `another_name`, we can use println!, placeholder, some string and another placeholder, and then pass it the first variable and then the second variable.

### main.rs
```rs
fn main() {
  let name = "Pascal";
  let another_name = "Alice";

  println!("{} and {}", name, another_name);
}
```

[00:21] When this code runs, Rust will replace the first variable with the first placeholder and the second variable with the second placeholder. This can be done with as many placeholders as we need.

[00:35] We save the file and run the program using cargo run. We will see that it will output has kind of end of this.

### Terminal
```bash
$ cargo run
Pascal and Alice
```