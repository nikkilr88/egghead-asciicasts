# Handle errors in Rust using Pattern Matching

[Video link](https://www.egghead.io/lessons/egghead-handle-errors-in-rust-using-pattern-matching)

Instructor: [00:00] For maximum error handling control, we can take advantage of one of Rust's language features called pattern matching. Instead of calling expect or unwrap on a result type, what we can do is use the match keyword, then give it the expression that can return a result type, in our case first.trim.parse.

[00:23] Then we define what we want to do in case of a OK type, which gives us access to the actual value, or an error type, which gives us access to the error that is being emitted from the underlying expression. In case parse was successful, all we want to do is assign the value to our variable a, so a = val. In case of an error, we simply want println!("This is not a valid number");

[00:58] What's happening now is that parse is going to be executed and returns a result type, which will either resolve in an OK type that holds the underlying value, or it will resolve with an error type and exposes the underlying error. Since we're simply printing an error message, the program is no longer going to panic.

[01:18] Next, we update our a variable to have an initial value of 0Because the program potentially assigns a new value, we have to make it mutable as well. We then do the same thing for our b variable. Let's copy this match expression, put it down here. B also has to be mutable now and takes an initial value of 0If we now run the program, Rust tells us that the error variable in the error case is unused, so we might as well prefix it with an underscore. Let's quickly do that and run the program again. When we now enter an invalid value, we no longer see a stack trace but our error message.
