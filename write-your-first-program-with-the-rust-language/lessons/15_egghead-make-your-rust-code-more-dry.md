# Make your Rust code more DRY

[Video link](https://www.egghead.io/lessons/egghead-make-your-rust-code-more-dry)

Instructor: [00:00] To wrap it up, let's take this duplicated functionality of reading the input and parsing the value, and put it in a separate function. For that, we go ahead and create a function, `readUserInput()`, which will return a number. Then, we just take one of our input functionalities, copy it over, and make it a little bit more generic.

[00:30] We don't need this _(`println!("Please enter a first number: ");`)_. Let's call this one `input` instead _(`let mut first`)_, change it here as well (inside of the read\*line method). Our variable _(`let a:u32`)_ is now going to be a digit. This is going to be input, this is going to be digit. Last but not least, we need to return the digit.

[00:49] A little bit of formatting, and then we can go ahead and make use of that function by saying, `let a = readUserInput()`. Then, we get rid of this. We can do exactly the same for our variable `b`, copy this over here, "_Please enter the first number:_" and there we have our optimized program.

```rust
fn main() {
    loop {
        println!("Please enter a first number: ");
        let a = read_user_input();

        println!("Please enter a second number: ");
        let b = read_user_input();

        let result = sum(a, b);
        println!("{} + {} = {}", a, b, result);
    }
}

fn sum(a: u32, b: u32) -> u32 {
    a + b
}

fn read_user_input() -> u32 {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();

    let digit:u32;

    match input.trim().parse() {
        Ok(val) => digit = val,
        Err(_err) => {
            println!("Not a valid number!");
            process::exit(1);
        }
    };

    digit
}

```

[01:20] This should work the same way as before, so if we do `cargo run`, we can enter a first number and a second number. It still works. It still keeps us asking. That's how you make your code a bit more dry.
