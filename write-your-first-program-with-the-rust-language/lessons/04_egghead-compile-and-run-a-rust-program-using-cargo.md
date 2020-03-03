# Compile and run a Rust program using Cargo

[Video link](https://www.egghead.io/lessons/egghead-compile-and-run-a-rust-program-using-cargo)

Instructor: [00:00] We can compile a Rust project using Cargo and its built commands, `cargo build`. This will create a target directory in which we can find the executable of our program, `l target/debug`. From here, we can again run our program on the command line, `./target/debug/say-my-name`.

### Terminal
```cargo
cargo build
l target/debug
./target/debug/say-my-name
```

[00:20] A more convenient way to compile and run our Rust program is to use Cargo's run command, `cargo run`. This one will compile and execute the program in one go. 

```cargo
cargo run
  Compiling...
    Finished ...
      Running ...
Hello, world!
```

Cargo also comes with a clean command to remove the generated target, `cargo clean`. Once executed, we can see that the `target` directory has been removed from the project.

```cargo
cargo clean
l
```