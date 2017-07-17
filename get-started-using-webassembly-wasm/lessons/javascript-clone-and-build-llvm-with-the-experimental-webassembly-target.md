Before installing `llvm`, you want to just check a few prerequisites. You should check that you have `gcc` installed, a version of `make` and a version of `cmake` as well.

If you don't have `gcc` or `make`, then it's advisable to run a `xcode-select --install` on Mac to make sure you've got the Xcode online tools. In Windows, you want to have **VisualStudio** installed. For `cmake`, you can download this [here](https://cmake.org/download/).

I'm going to start off by cloning `llvm`, and I'm going to use a mirror just so we can do this via **git**. Once that's complete, we can go into this `llvm` folder. Within the `/tools` folder, we want a clone `clang`. Again, I'm going to use the `llvm` Mirror `$ git clone git@github.com:llvm-mirror/clang`. With `clang` installed, I'm going to back out of this `/tools` folder. I'm going to make a folder below the `llvm` folder called `llvm-build`.

```
mkdir ../llvm-build
```

Within this folder, I can now use our `$ cmake` command to setup the build. Here's the command we're going to use.

```
$ cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX=../llvm-wasm -DLLVM_TARGETS_TO_BUILD= -DLLVM_TARGET_ARCH=wasm32 -DLLVM_EXPERIMENTAL_TARGETS_TO_BUILD=Webassembly ../llvm
```

In windows, this `"Unix Makefilkes"` would be Visual Studio instead. I'm building into another folder called `llvm-wasm` which is going to contain the final build outputs. We're moving all the targets. We're building for the `wasm32` Architecture as a `Webassembly` target from the source in the `llvm` folder.

Once `$ cmake` completes, we can then begin the build process. This is going to take about an hour or so. I'm going to use the `-j8` flag so that we run `make` in parallel and then a `make` install.

```
$ make -j8 && make install
```

In Windows, I would need to opened VisualStudio and open the `llvm.sln` file to start the build from there. When the build eventually completes, we can check if we've got our C compiler available at `llvm-wasm/clang`. To free up some space, this `llvm-build` folder can then be removed.