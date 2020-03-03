# Handle errors in Rust using Pattern Matching

[Video link](https://www.egghead.io/lessons/egghead-handle-errors-in-rust-using-pattern-matching)

Instructor: [00:00] **For maximum error handling control, we can take advantage of one of Rust's language features called pattern matching**. Instead of calling `expect` or `unwrap` on a `result` type, what we can do is use the `match` keyword, then give it the expression that can return a `result` type, in our case `first.trim().parse()`.

[00:23] **Then we define what we want to do in case of a `Ok` type, which gives us access to the actual value, or an `Err` type, which gives us access to the error that is being emitted from the underlying expression**. In case parse was successful, all we want to do is assign the value to our variable a, so `a = val`. In case of an error, we simply want `println!("This is not a valid number");`

```rust
fn main() {
    println!("Please enter a first number: ");

    let mut first = String::new();
    io::stdin().read_line(&mut first).unwrap();

    let a:u32 = first.trim().parse().expect("This is not a valid number");

    match first.trim().parse() {
        Ok(val) => a = val,
        Err(_err) => {
            println!("Not a valid number!");
        }
    };

   ...
}
```

[00:58] **What's happening now is that parse is going to be executed and returns a `result` type, which will either resolve in an `Ok` type that holds the underlying value, or it will resolve with an `Err` type and exposes the underlying error**. Since we're simply printing an error message, the program is no longer going to panic.

[01:18] Next, we update our `a` variable to have an initial value of `0`. And because the program potentially assigns a new value, we have to make it mutable as well. We then do the same thing for our `b` variable. Let's copy this `match` expression, put it down here. `b` also has to be mutable now and takes an initial value of `0`. If we now run the program, Rust tells us that the `err` variable in the error case is unused, so we might as well prefix it with an underscore. Let's quickly do that and run the program again. When we now enter an invalid value, we no longer see a stack trace but our error message.

```rust
fn main() {
    println!("Please enter a first number: ");

    let mut first = String::new();
    io::stdin().read_line(&mut first).unwrap();

    // Change initial value to 0
    let mut a:u32 = 0;

    match first.trim().parse() {
        Ok(val) => a = val,
        Err(_err) => {
            println!("Not a valid number!");
        }
    };

    println!("Please enter a second number: ");

    let mut second = String::new();
    io::stdin().read_line(&mut second).unwrap();

    // Change initial value to 0
    let mut b:u32 = 0;

    match first.trim().parse() {
        Ok(val) => b = val,
        Err(_err) => {
            println!("Not a valid number!");
        }
    };

    let result = sum(a, b);
    println!("{} + {} = {}", a, b, result);
}
```
