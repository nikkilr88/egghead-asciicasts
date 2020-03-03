# Understanding basic Ownership and Borrowing in Rust

[Video link](https://www.egghead.io/lessons/egghead-understanding-basic-ownership-and-borrowing-in-rust)

Pascal Precht: [00:00] Let's have a look of this function `say_first_name()`. say_first_name() takes a first_name of type string and then outputs the name using println! And the placeholder syntax. We then call this function in our main function by passing it a variable `first_name`, which has the value "Pascal." 

### main.rs
```rs
fn main() {
  let first_name = "Pascal".to_string();

  say_first_name(first_name);
}

fn say_first_nam(first: String) {
  println!("{}", first);
}
```

If I run this function, we'll see that it will properly output my name.

### Terminal
```bash
$ cargo run
Pascal
```

[00:26] However, if we now go ahead and call this function again, 

### main.rs
```rs
fn main() {
  let first_name = "Pascal".to_string();

  say_first_name(first_name);
  say_first_name(first_name);
}
```

we'll see that the compiler complains. In fact, it tells us that when we try to call say_first_name the second time, the value passed to that function has been used after a move. It also tells us that the move has happened the first time we called say_first_name.

[00:55] What does that mean? Rust comes with a feature called ownership, which aims to prevent us from writing memory unsafe code. What this means is that every variable in Rust owns its value. This variable, first_name, owns the value string "Pascal."

[01:15] However, if we pass the value to a function like we do here in say_first_name, we move the value and therefore the ownership to the `fn first_name()`. This means that after this function has been called with this value, we can no longer use this variable.

[01:37] The reason for that is after this function has been called the first time, Rust will drop the value. What this means is we no longer have access to first_name after line four when the program is executed.

[01:51] If we do need access to first_name after this function has been called the first time, we will have to pass it by reference instead of by value. This is done by using the `&` symbol and by updating the function's signature the same way.

```rs
fn main() {
  let first_name = "Pascal".to_string();

  say_first_name(&first_name);
  say_first_name(first_name);
}

fn say_first_nam(first: &String) {
  println!("{}", first);
}
```

[02:06] Using the &, we're basically saying that `first: &String` is a string reference and not a string value. Instead of passing ownership from this variable to the function first_name, we're saying, "Here's a reference to this value." This is also called borrowing because we don't pass ownership to the function, but we borrow the value.

[02:28] We update the function here as well, 

```rs
fn main() {
  let first_name = "Pascal".to_string();

  say_first_name(&first_name);
  say_first_name(&first_name);
}

fn say_first_nam(first: &String) {
  println!("{}", first);
}
```

save the file, run the program and we'll see everything runs as expected.

### Terminal
```bash
$ cargo run
Pascal
Pascal
```