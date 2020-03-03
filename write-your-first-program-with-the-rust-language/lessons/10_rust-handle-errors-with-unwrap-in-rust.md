# Handle errors with unwrap() in Rust

[Video link](https://www.egghead.io/lessons/rust-handle-errors-with-unwrap-in-rust)

Instructor: [00:00] Let's say we have a function `sum` that takes two parameters, `a` and `b`, which are both of type number, and it simply adds those two numbers and returns them. We then want to ask the user to enter a first number and a second number. Eventually, we want to call sum with these two numbers and output the result.

[00:22] We read the first and the second number using `stdin().read_line`, but since `first` and `second` are both of type string, we can't pass them to sum because sum expects numbers. Let's say we would call sum with `first` and `second`. Save the file and run the program. **We'll see that Rust won't be able to compile the program because the expected type is of `u32`, but what we've passed down was a string**.

```rust
fn main() {
    println!("Please enter a first number: ");

    let mut first = String::new();
    io::stdin().read_line(&mut first);

    println!("Please enter a second number: ");

    let mut second = String::new();
    io::stdin().read_line(&mut second);

    // This throws an error!
    let result = sum(first, second);
    println!("{} + {} = {}", a, b, result);
}

fn sum(a: u32, b: u32) -> u32 {
    a + b
}
```

[00:56] To fix that, we create a new variable a of type `u32`. We first trim the input to make sure that there's no carriage returns and new lines. Then, we call a method `parse()` which tries to parse the string into a number, then we do the same thing for the second value.

[01:21] After that, we update the `sum` function to take `a` and `b`. **When we run this, the compiler will still complain because we defined `a` and `b` to be type `u32`, however, `parse` returns something of type `result`**. The `result` type is like a wrapper that either resolves with an error or a value.

```rust
fn main() {
    println!("Please enter a first number: ");

    let mut first = String::new();
    io::stdin().read_line(&mut first)

    let a:u32 = first.trim().parse()
    println!("Please enter a second number: ");

    let mut second = String::new();
    io::stdin().read_line(&mut second);
    let b:u32 = first.trim().parse();

    let result = sum(a, b);
    println!("{} + {} = {}", a, b, result);
}
```

[01:47] There's different ways to go about this. The easiest is to call a `result::unwrap()` method, which will simply say, "_If this result does not emit an error, it will resolve with the value_." However, otherwise, the program will panic. Let's call `unwrap` on both results and run the program again.

```rust
fn main() {

    ...

    let a:u32 = first.trim().parse().unwrap()

    let b:u32 = first.trim().parse().unwrap();

    ...
}
```

[02:09] The compiler still warns about the fact that the result of `read_line` is not handled, but we can ignore that for now. Now our program asks us to enter a first number and a second number. We'll see that it properly adds the numbers and tells us the result. **If the parse function fails, unwrap will cause our program to panic**.

[02:31] Let's run the program again and enter something that is not a number. Rust tells us that our program has panicked when we tried to unwrap a result. **The cause of that was a `ParseIntError`, which is the underline error which has been emitted from the parse function**.

[02:48] **It's very important to note that unwrap should only be used for quick developments**. For production-ready code, errors should be handled differently.
