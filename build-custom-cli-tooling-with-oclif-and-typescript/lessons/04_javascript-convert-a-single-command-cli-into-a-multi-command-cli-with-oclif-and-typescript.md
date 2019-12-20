Instructor: [0:00] Many commands you use are single-purpose commands like `echo` or `cat`, but some of the more heavy-duty commands out there are multi-commands.

[0:16] For example, the [Gatsby CLI](https://www.gatsbyjs.org/docs/gatsby-cli/#info) has the gatsby new command for scaffolding new sites, `gatsby develop` for serving a local directory, `gatsby build` for a production build, `gatsby serve` for serving just the production build, or info for reporting information, and so on and so forth.

[0:39] Some of the very, very heavy-duty commands, like `npm`, have a huge offering of other commands that you might want to choose from. Multi-commands are essentially namespaced CLIs within a CLI. You might as well have a framework to organize them and share code between them.

[1:01] Oclif has a good solution for this. You can run `npx oclif multi mycli` to start a new CLI that is multi by default. I can take away some of that magic by showing you how to convert a single-command CLI into a multi-command CLI.

#### index.ts
```ts
import { Command, flags } from "@oclif/command";

class Mycli extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(Mycli);
    // console.log(argv)
    const name = flags.name || "world";
    this.log(`hello egghead ${name} from ./src/index.ts`);
  }
}

export = Mycli;
```

[1:20] First, we're going to make a new folder in our `src` directory, called `commands`. Then we move our existing command in `index.ts` that we've been working on into the `commands` directory. I'll call it something different, like `init`, for example, `src/commands/init.ts`.

[1:37] I still need an `index.ts` at the top level. I will create it in `src` over here and paste in this pre-prepared code. 

#### index.ts
```ts
export { run } from "@oclif/command";
```

This is essentially a helper from oclif for helping to go through the commands folder and initialize each of these commands based on their file name. That's very easy and intuitive.

[2:01] There's one more bit of prep that we need to do, which is to head into `package.json` and look for the special `oclif` field. This tells oclif some information about what you want to do with this CLI. We're just going to tell it that there is a multi-commands folder. It's going to point to the `./lib/commands` folder.

#### packages/packages.json
```json
"oclif": {
  "bin": "mycli",
  "commands": "./lib/commands"
}
```

[2:20] Notice that this doesn't actually exist inside of the source code, but it's the compiled output of the TypeScript into JavaScript. When we compile this, we'll have `lib/commands`, `init.ts`, `index.js`, and everything else that you might possibly want.

[2:35] Now that we've refactored our single command into a multi command, we can now try it out, like saying, `yarn mycli init` in the terminal. That should find this `init` command and run it accordingly. We can now also scaffold out some other commands. Like let's have a `build.ts` command over here.

#### commands/build.ts
```ts
import { Command, flags } from "@oclif/command";

class Mycli extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(Mycli);
    console.log("hello from build")
    const name = flags.name || "world";
    this.log(`hello egghead ${name} from ./src/index.ts`);
  }
}

export = Mycli;
```

[3:00] We'll say, "Hello." We'll have some sort of different visual input so that we can see the difference. Hello from build. `serve.ts`. Then we'll also make a `serve` command. This is just illustrative. We're not actually going to use this. Just to show you that you can very quickly scaffold different commands that say different things, like `yarn mycli build` or `yarn cli serve`.

[3:41] Sometimes, we want to share logic or share initialization code for more than one command. One pattern that you can do is to have a common base command at the top level where you import that command. You use a base command that you extend directly.

[4:02] This is documented inside of the docs as a custom base class. It shows how you can add extra methods or do standard initialization in all commands that you run. This can be imported by specific commands. You're using logic. You're only typing out what's different in every single command.
