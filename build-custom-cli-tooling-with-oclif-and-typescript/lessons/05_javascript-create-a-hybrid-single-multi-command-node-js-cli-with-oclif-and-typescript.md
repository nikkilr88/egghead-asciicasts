Instructor: [0:00] This is a really neat trick I discovered while experimenting with CLIs. By default, multi-command CLIs with oclif just show a list of commands when you run the CLI by itself. It just shows the documentation.

[0:16] It's not actually doing anything useful if you just run that by itself. You have to run something like `yarn mycli init`. Then it actually does some command that executes some logic. What if you wanted to have that experience just from the get-go so that the user doesn't have to memorize your command off the bat and you have the simplest possible command?

[0:41] For example, if you publish to npm, you would just say, `npx mycli`. That would actually do something productive. That has a bigger wow factor as well. That looks like a single command, but you might want to keep the multi-command structure and behavior of oclif. You need some sort of hybrid between single and multi-commands. This is actually doable.

[1:05] The way you do this is you go into the `bin` directory of the `oclif` command, `packages/mycli/bin/run`. You check out the `run` file. This is where we actually get some insight into how oclif works with TypeScript under the hood and initializes its commands.

#### packages/mycli/bin/run
```ts
#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const project = path.join(__dirname, "../tsconfig.json");
const dev = fs.existsSync(project);

if (dev) {
  require("ts-node").register({ project });
}

require(`../${dev ? "src" : "lib"}`)
  .run()
  .catch(require("@oclif/errors/handle"));
```

[1:21] It uses `ts-node`. It registers that as a hook into Node. It transforms all the TypeScript stuff on the fly only in development mode. Then it requires, based on development, whether it's from `src` or `lib`. It does require `.run`. That's the .run export that you see in the `index.ts` file.

[1:46] This is how multi commands work. Theoretically, we can actually have a list of recognized commands, for example `init`, `serve`, and `build`. Then we can put an `if` block saying that if there's a `process.argv`, if the length is more than two, which means that there is an additional multi-command selected and it's a `recognizedCommand`, then we run the multi-command code.

```ts
const recognizedCommands = ["init", "serve", "build"];
if (process.argv.length > 2 && recognizedCommands.includes(process.argv[2])) {
  require(`../${dev ? "src" : "lib"}`)
    .run()
    .catch(require("@oclif/errors/handle"));
```

[2:13] `Else`, we could run the code in single-command mode and basically just point directly to whatever command we want to alias as the top-level command. For me, I'm just going to say `command/init`. That should be good enough.

```ts
const recognizedCommands = ["init", "serve", "build"];
if (process.argv.length > 2 && recognizedCommands.includes(process.argv[2])) {
  require(`../${dev ? "src" : "lib"}`)
    .run()
    .catch(require("@oclif/errors/handle"));
} else {
  require(`../${dev ? "src" : "lib"}/commands/init`)
    .run()
    .catch(require("@oclif/errors/handle"));
}
```

[2:31] The behavior of this is very interesting. Now we can actually run `yarn mycli`. That will give the same result as `yarn mycli init`. This is now a perfect alias for `yarn mycli init`. That does the exact same thing, but I still have the ability to do `yarn mycli build`. That gives me the build command.
