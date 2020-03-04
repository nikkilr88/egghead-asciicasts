# Create a loop in Rust

[Video link](https://www.egghead.io/lessons/egghead-create-a-loop-in-rust)

Instructor: [00:00] **To have our program keep asking the user for entering numbers, we can use a loop**. Rust comes with several different types of loops. The simplest one is probably the `loop` loop. All we have to do is wrapping it around our code and closing it here.

```rust
fn main() {
    loop {
        println!("Please enter a first number: ");

        let mut first = String::new();
        io::stdin().read_line(&mut first).unwrap();

        let a:u32;

        match first.trim().parse() {
            Ok(val) => a = val,
            Err(_err) => {
                println!("Not a valid number!");
                process::exit(1);
            }
        };

        println!("Please enter a second number: ");

        let mut second = String::new();
        io::stdin().read_line(&mut second).unwrap();

        let b:u32;

        match first.trim().parse() {
            Ok(val) => b = val,
            Err(_err) => {
                println!("Not a valid number!");
                process::exit(1);
            }
        };

        let result = sum(a, b);
        println!("{} + {} = {}", a, b, result);
    }
}

```

[00:19] If we now run the program again, it should continue asking us for numbers. As we can see, once we got the first results, it again asks us for first number and the second number. Now it just continues doing that forever.
