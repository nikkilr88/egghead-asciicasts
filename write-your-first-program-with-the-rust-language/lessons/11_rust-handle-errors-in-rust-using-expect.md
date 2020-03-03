# Handle errors in Rust using expect()

[Video link](https://www.egghead.io/lessons/rust-handle-errors-in-rust-using-expect)

Instructor: [00:00] **A slightly better way to unwrap a result type is to use the `expect` method as opposed to unwrap**. `expect` gives us the opportunity to pass a message to the user, such as "_This is not a valid number_" which is a bit more useful than what unwrap returns.

```rust
fn main() {

    ...

    let a:u32 = first.trim().parse().expect("This is not a valid number");

    let b:u32 = first.trim().parse().expect("This is not a valid number");

    ...

}

```

[00:20] If we now run the program and enter an invalid value, we'll see the error message shows up in this text trace.
