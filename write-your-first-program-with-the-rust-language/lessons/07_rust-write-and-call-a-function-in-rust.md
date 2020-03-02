# Write and call a function in Rust

[Video link](https://www.egghead.io/lessons/rust-write-and-call-a-function-in-rust)

Pascal Precht: [00:01] Let's say we want to create a function that takes a first name and a last name and prints it to the screen. To define a function, we use the fn keyword followed by a name, and then we define the parameters, in our case it's the first_name of type string and the last_name of type string as well.

[00:22] We then define the function body, which is going to be println! With a placeholder and another placeholder followed by the first_name and last_name. This function takes a first_name, which is of type string, and a last_name, which is of type string, and will then output the first_name and the last_name using println! And the placeholder syntax.

[00:52] We can then go ahead and call this function by using same name inside our main function. We pass it first and last. Save the file and run the program. We'll see it outputs "Pascal Precht."
