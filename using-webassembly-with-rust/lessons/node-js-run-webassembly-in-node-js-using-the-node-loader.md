Instructor: 00:00 While using WebAssembly in the browser is great, I'm pretty excited about using it in Node to write performant code without writing C bindings. Let's give it a try.

00:10 We're going to start with a clean slate, an empty directory, and then run `npm init` to initialize that package.json file. 

#### Terminal
```bash
$ mkdir my-backend
$ cd my-backend
$ npm init
```

Next up, we're going to install the WASM Node loader. 

```bash
$ npm instal --save @wasm-tool/node
```

Then we'll create a new Rust crate, using `cargo new crate`. Name it `utils`, and use the library template for it.

```bash
$ cargo new crate --name=utils --lib
```

00:33 In our newly-generated `Cargo.toml`, we change the `crate-type` to `cdylib`. 

#### Cargo.toml
```toml
[lib]
crate-type = ["cdylib"]
```

Now, we are set to write our Rust code.

00:45 We'll export a simple `add_one` function, accepting one parameter and returning the value plus one. 

#### lib.rs
```rs
#[no_mangle]
pub extern fn add_one(x: u32) -> u32 {
  x + 1
}
```

Next, we compile our Rust code using `cargo build` with the `wasm` target. We will set for the Rust path, now can create our child script entry.

#### terminal
```bash
$ cargo build --target wasm32-unknown-unknown --release
$ touch index.mjs
```

01:08 In there, we `import` our `add_one` function from the compiled utils WebAssembly file. 

#### index.mjs
```mjs
import { add_one } from "./crate/target/asm32-unknown-unknown/release/utils.wasm"
```

We use the function twice. Once using the argument `2`, and the other time using the argument `42`. 

```mjs
console.log(add_one(2));
console.log(add_one(42));
```

We execute this file, running `node` with the `--experimental-modules` flag, as well as passing in our Node WASM loader to the loader flag.

#### Terminal
```node
$ node --experimental-modules --loader @wasm-tool/node index.mjs
```

01:34 As expected, we see the values 3 and 43 logged out. Pretty cool. Keep in mind, for a production release, you might want to run your `utils.wasm` file for `wasm-gc` before actually shipping it.