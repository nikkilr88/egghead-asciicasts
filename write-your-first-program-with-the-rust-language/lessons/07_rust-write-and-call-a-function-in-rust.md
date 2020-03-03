# Write and call a function in Rust

[Video link](https://www.egghead.io/lessons/rust-write-and-call-a-function-in-rust)

Pascal Precht: [00:01] Let's say we want to create a function that takes a first name and a last name and prints it to the screen. To define a function, we use the `fn` keyword followed by a name, and then we define the parameters, in our case it's the first_name of type string and the last_name of type string as well.

### main.rs
```rs
fn main() {
  let first = "Pascal".to_string();
  let last = "Precht".to_string();
}

fn say_name(first: String, last: String){}
```

[00:22] We then define the function body, which is going to be `println!` with a placeholder and another placeholder followed by the first_name and last_name. 

```rs
fn say_name(first: String, last: String){
  println!("{} {}", first, last);
}
```

This function takes a first name, which is of type string, and a last name, which is of type string, and will then output the first name and the last name using println! And the placeholder syntax.

[00:52] We can then go ahead and call this function by using `say_name` inside our main function. We pass it `first` and `last`. 

```rs
fn main() {
  let first = "Pascal".to_string();
  let last = "Precht".to_string();

  say_name(first, last)
}
```

Save the file and run the program. We'll see it outputs "Pascal Precht."

### Terminal
```bash
$ cargo run
Pascal Precht
```