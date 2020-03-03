# Exit a program using std::process in Rust

[Video link](https://www.egghead.io/lessons/egghead-exit-a-program-using-std-process-in-rust)

Instructor: [00:00] To exit a program, use the process module from Rust standard library, and then call process::exit, which will exit the program with an exit code. Any exit code that is not 0means that the program has exit with an error.

[00:19] We also no longer need to make our a variable mutable and assign an initial value, because the program will either assign an initial value, in case parsing was successful, or in case of an error it will exit the program.

[00:35] When we run this code and enter a fault c value, we now see that our program successfully exits.