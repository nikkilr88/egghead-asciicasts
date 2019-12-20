Instructor: [0:00] The easiest way to debug any known script or CLI is to run it via the `node --inspect-brk` flag inside of VS Code. This integration lets you stop and watch any part of your code inside of the VS Code environment.

[0:22] For example, I can place a break point inside of this `run` file. 

#### run
```ts
const recognizedCommands = ["init", "serve", "build"];
if (process.argv.length > 2 && recognizedCommands.includes(process.argv[2])) {
  require(`../${dev ? "src" : "lib"}`) // break point here 
    .run()
    .catch(require("@oclif/errors/handle"));
} else {
  require(`../${dev ? "src" : "lib"}/commands/init`)
    .run()
    .catch(require("@oclif/errors/handle"));
}
```

When I run this code, 

#### terminal
```bash
node --inspect-brk ./bin/run init
```

the debugger will actually stop at this breakpoint. I can hover over variables of interest and see what I want to do with that and whether it will execute correctly.

[0:43] For example, if I'm expecting this to proceed on and evaluate to true, I can see that it did exactly that. I can see that I'm also in dev mode as well. If I wanted to, I can also type in process.argv and monitor that value over here and see it change over time.

[1:03] However, some code isn't exactly amenable to step-through debugging, in particular code where it's heavily nested loops and you don't exactly know what might be the issue with your code. You can also add a `debugger` to your statements, but sometimes this doesn't work well with TypeScript.

[1:26] Some of the more foolproof way, especially if you're looking into debugging performance, is to add a `debugger` statement. This comes with oclif by default. If you run `DEBUG=* yarn mycli`, you actually tap into the debugging that is set up by oclif by default.

[1:52] This actually shows you a key amount of information about which is executing in what order, as well as how much time it takes to execute. If there any particular outliers, you might be able to see if you can save some time on some of these execution steps. The debug environment variable runs on a glob matching algorithm.

[2:17] For example, if I only wanted to see oclif internals, I can type `oclif`, `DEBUG=oclif* yarn mycli`. It would only print out the oclif related stuff. If I wanted to see stuff that's related only to mycli, I can print that out as well. There's no reason to stop there. I should also be able to add the debug module and go to any one of my commands.

```bash
yarn add debug
```

[2:42] For example, here I'm in the `init.ts` command. I can import that and name the debug. For example, I can say, `mycli:init` over here. Then I can use this as an essentially better console.log.

#### init.ts
```ts
import { Command, flags } from "@oclif/command";
var debug = require("debug")("mycli:init");
```

[2:58] For example, if I'm running my commands in here, I can say that I want to log out my args and my flags. Instead of console.logging, I can say, `debug('parsing args', args)`. I can say, `"parsing flags"` here as well.

```ts
static args = [{ name: "file" }];
static strict = false;
async run() {
  const { args, flags } = this.parse(Mycli);
  debug('parsing args', args);
  debug('parsing flags', flags);
  const name = flags.name || "world";
  this.log(`hello egghead ${name} from ./src/index.ts`);
  debugger;
}
```

[3:24] That would be handy. By default, this debug message does not show up when I run this code. If I run `yarn mycli init`, this logging message doesn't show up in my code, but if I ever need it for any debugging reason, I can just add `DEBUG=mycli* yarn mycli init` and see that match up with mycli init, which I have at the top of the file.

[3:59] The debug message pops up that I'm parsing args where file is undefined because I didn't pass a file, and parsing flags where name is people because that's the default name that I chose over here. This is a very flexible way of debugging.

[4:16] You can choose multiple names for different files within your code. That's a really good way to namespace your logging messages. Instead of log levels like warn or error, you have a lot of finer grain detail. You can use this glob matching to match and dynamically select what logs you want to see that's relevant to the problem that you're trying to solve.
