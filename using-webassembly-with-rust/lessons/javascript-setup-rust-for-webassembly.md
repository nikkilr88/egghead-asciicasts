Instructor: 00:00 In order to get started, we need to install Rust using the installer, rustup. Introductions on how to set it up can be found on [rustup.rs](https://rustup.rs/). If you are on OSX, you also can use `brew install rustup`. Then we run `rustup-init`.

#### Terminal
```bash
$ brew install rustup
$ rustup-init
```

00:26 Once we have Rust in our system, want to set the `nightly` toolchain as the default. 

```bash
$ rustup default nightly
```

We need to do this since currently only the nightly toolchain is supporting WebAssembly. Then we add the target `wasm32-unknown-unknown`.

```bash
$ rustup target add wasm32-unknown-unknown
```

00:43 Usually, you would add targets like `x68_64-apple-darwin`, specifying the target platform. Since WebAssembly is not compiled against any specific platform, these two values after the first dash are unknown and unknown.

01:02 In addition, we use `cargo`, Rust's package manager, to install `wasm-pack`. 

```bash
$ cargo install wasm-pack
```

This tool seeks to be the one-stop shop for building and working with Rust-generated WebAssembly that you would like to interop with JavaScript in the browser or with Node.js.

01:23 For the first couple lessons, we don't use `wasm-pack`. Instead, we're going to use a tool called `wasm-gc`. We install it. 

```bash
$ cargo instal wasm-gc
```

`wasm-gc` is a tool to remove all unneeded exports, imports, functions, and so on from a WebAssembly module.

01:41 Last but not least, we need a web server. We use Cargo to install the `HTTPS` crate, shipping with the HTTP binary. It runs a web server, serving static files from the current directory, exactly what we need in our first couple lessons.