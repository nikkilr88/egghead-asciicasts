To get the `s2wasm` tool, I'm going to `clone` and `build` **binaryen** from GitHub. 

```
$ git clone git@github.com:WebAssembly/binaryen
```

In the `binaryen` folder with `cmake` installed, we then run `$ cmake .`, and when that's ready, we run `$ cmake --build .` to build the current folder. For Windows users, if you've installed `cmake` and have the Visual Studio build tools, the same sort of process should work.

To build the WebAssembly Binary Toolkit, I'm going to `clone` from GitHub. We need to add this `--recursive` flag, when we do that `clone`, to make sure we include the sub modules. 

```
$ git clone git@github.com:WebAssembly/wabt --recursive
```

Once that's downloaded, it's roughly the same build process. Except this time, I'm going to create a `/build` folder, running `cmake` within it.

I'm going to add the `$ cmake -DEXECUTABLE_OUTPUT_PATH=../out ..` flag to output our executable binaries into the out folder. We run that against the lower folder source. Then we run `$ cmake --build .` to complete the build into the output path. The `build`zaaa folder can then be removed afterwards.

