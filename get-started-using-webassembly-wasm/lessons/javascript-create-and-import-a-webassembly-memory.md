There's quite a complex instantiation process going on for loading `program.wasm` and `memory.wasm` them together in this application. The reason for this is the `program` is exporting its `memory`, and then `memory` needs to import that same `memory`.

We `instantiate` `program` first, take its memory export, which is `m.exports.memory`, and pass it in as the memory import when we `instantiate` `memory`. Another way to do this is to create the `memory` in JavaScript before instantiating the **WebAssembly** modules.

The **WebAssembly** `memory` constructor takes a single argument, which can then set the initial `memory` size in **WebAssembly** pages. **WebAssembly** pages are 64 kilobytes, or 2^16 bytes. So `1` will be more than enough for this application.

```jsx
let wasmMalloc, wasmFree;
let mem = new WebAssembly.Memory({ intitial: 1 });
fetchAndCompileWasmModules(['./program.wasm', './memory.wasm'])
```

With the `memory` now created in JavaScript, we can then pass it into the `memory` import when we `instantiate` the `memory` module. 

```jsx
.then(m => {
	return WebAssembly.instantiate(memory, {
		env: {
			memory: mem
		}
	})
	...
})
```

We'd like to do the same for the instantiation of the `program` module as well, because we need all of our modules to be sharing the same `memory` in this example.

Unfortunately, `program` doesn't have a `memory` import, because it was compiled with a `memory` export, which by definition, means it has a different, separate `memory`. We're going to need to recompile `program` to support this.

```jsx
.then(([program, memory]) => {
	env: {
		malloc: len => wasmMalloc(len).
		free: addr => wasmFree(addr),
		memory: mem
	}
})
```

From the original compilation, I'm going to take the WAST output, and copy it into **WebAssembly** Explorer. In **WebAssembly** Explorer, we can edit this WAST output. I'm going to find that `memory` over here where it's defined. I'm going to remove the `memory` definition from inside the module, and convert the export `memory` into an import `memory`.

We need to import `memory` from the module called `"env"`, because that's where we're importing everything from. Then I'm going to replace this `memory` declaration with a `memory` declaration including the initial size, which is that first parameter `1`.

```
(module
  (type $FUNCSIG$ii (func (param i32) (result i32)))
  (type $FUNCSIG$vi (func (param i32)))
  (import "env" "free" (func $free (param i32)))
  (import "env" "malloc" (func $malloc (param i32) (result i32)))
  (table 0 anyfunc)
  (import "env" "memory" (memory $0 1))
  (export "createRecord" (func $createRecord))
  (export "deleteRecord" (func $deleteRecord))
```

I can then assemble and download this converted binary. When compiling locally, there is an import `memory` flag for doing this automatically. Returning to the local application with the new `program.wasm` wired in, it'll now accept a `memory` import under the environment namespace.

I can now simplify this instantiation by first instantiating `memory`, and then with the `memory` module that we get back, we can pass the `memory` export `free` and `malloc` directly into the `program` imports because it's already bound to the same `memory` that program's using.

With the results and instantiation of `program`, we've then got our final module value, and a much simpler instantiation process. There's a little bit of work to wiring these **WebAssembly** modules together correctly here.

```jsx
let mem = new WebAssembly.Memory({ initial: 1 });
    fetchAndCompileWasmModules(['./program.wasm', './memory.wasm'])
    .then(([program, memory]) => {
      return WebAssembly.instantiate(memory, {
        env: {
          memory: mem
        }
      })
      .then(m => {
        return WebAssembly.instantiate(program, {
          env: {
            malloc: m.exports.malloc,
            free: m.exports.free,
            memory: mem
          }
        });
      })
      .then(m => {
        console.log(m.exports.createRecord(2, 1.1, 2.2));
      });
```

The benefit is, we're able to finally control the bootstrap of our application for our exact needs. If you are looking for a comprehensive solution for managing the setup of **WebAssembly**, I highly recommend trying out [Emscripten](https://kripken.github.io/emscripten-site/), which comes with standard C, C++ application compilation out of the box, taking care of all the wiring itself.