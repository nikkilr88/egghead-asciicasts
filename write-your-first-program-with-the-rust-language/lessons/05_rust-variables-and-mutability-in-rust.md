# Variables and Mutability in Rust

[Video link](https://www.egghead.io/lessons/rust-variables-and-mutability-in-rust)

Pascal Precht: [00:00] Variables in Rust are created using the `let` keyword. Let's create a variable name using `let name = Pascal`. To output this variable, we can use the `println!()` function. However, println! takes a string as a parameter, but since name is not a string but a variable, we have to use the placeholder syntax, which is using curly braces. Then we can pass name as a second argument to this function.

### main.rs
```rs
fn main() {
  let name = "Pascal";

  println!("{}", name);
}
```

[00:30] What Rust will then do is it will take this first argument, name, and replace it with this placeholder. When we save this program and then run the program using cargo run, we'll see that it outputs the name.

### Terminal
```cargo
$ cargo run 
Pascal
```

[00:44] One thing to note about variables is that they're immutable by default. What this means is that if we try to overwrite this variable with another value and then output it again, we'll see that once we run the program that Rust will complain it cannot assign a value twice to an immutable variable.

### main.rs
```rs
fn main() {
  let name = "Pascal";

  println!("{}", name);

  name = "Alice";

  println!("{}", name);
}
```

[01:07] It even tells us that the first assignment has happened to name in the second line of our program. It also tells us that we need to make the binding mutable using the mute keyword. 

### Terminal
```bash
$ cargo run
  2 let name = "Pascal"";

    first assignment to `name`
    help: make this binding mutable: `mut name`

  name = "Alice";
  ^^^^^^^^^^^^^^ cannot assign twice to immutable variable
```

If we change the variable to a mutable variable using the `mut` keywords and we run the program again, we'll see that it's successfully compiled without any problems.

### main.rs
```rs
fn main() {
  let mutname = "Pascal";

  println!("{}", name);

  name = "Alice";

  println!("{}", name);
}
```

[01:32] You might think that it's a bit of a hassle to define every variable as immutable if it's needed, but it turns out that it's a very powerful feature in Rust because just by looking at the code, you know when a variable is being changed by the program or not.