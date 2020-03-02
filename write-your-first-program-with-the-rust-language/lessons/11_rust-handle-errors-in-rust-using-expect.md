# Handle errors in Rust using expect()

[Video link](https://www.egghead.io/lessons/rust-handle-errors-in-rust-using-expect)

Instructor: [00:00] A slightly better way to unwrap a result type is to use the expect method as opposed to unwrap. Expect gives us the opportunity to pass a message to the user, such as "This is not a valid number," which is a bit more useful than what unwrap returns.

[00:20] If we now run the program and enter an invalid value, we'll see the error message shows up in this text trace.
