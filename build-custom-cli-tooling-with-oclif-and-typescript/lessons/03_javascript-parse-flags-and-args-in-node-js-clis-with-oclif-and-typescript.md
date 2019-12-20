Instructor: [0:00] Let's have a look at the basic structure of an `oclif` command. All `oclif` commands are located inside of the `src` directory. For the single command project, I have it in `index.ts`. Every `oclif` command imports the command class from `@oclif/command` package. Then we `extends` it and `export` it. That's how the command is declared.

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

    const name = flags.name || "world";
    this.log(`hello egghead ${name} from ./src/index.ts`);
  }
}

export = Mycli;
```

[0:28] The command has some `static` fields, some of which are used here. There are others that are featured in the documentation. In particular, we're going to be focusing on `flags` and `args`. First, let's talk about `args`. `args` are essentially positional arguments within your CLI. They are specified just in order and parsed based on order.

[0:56] You can access them with destructuring `args` from `this.parse`. You can log them out to see what they are. 

```ts
async run() {
  const { args, flags } = this.parse(Mycli);
  console.log(args);
  const name = flags.name || "world";
  this.log(`hello egghead ${name} from ./src/index.ts`);
}
```

Over here, I'm going to run `yarn mycli hello world` it prints out `{ file: 'helloworld' }`. If you take the args value from `this.parse`, you're going to get every argument in an object with a key based on the name that you specify.

[1:32] You may actually want variable numbers of arguments, like `yarn mycli foo bar baz quux`. In that case, you don't necessarily know ahead of time how many args you're going to have. You can just take the `argv` parameter and actually just use an array. That would work similarly as well.

```ts
async run() {
  const { argv, flags } = this.parse(Mycli);
  console.log(argv);
  const name = flags.name || "world";
  this.log(`hello egghead ${name} from ./src/index.ts`);
}
```

[1:56] You do get an error because this is not the default in `oclif`. They want to encourage statically knowing everything. You can turn off the static argument with `static strict = false`. Now you have variable-length arguments in your CLI. This is not the default. It's not something that `oclif` is trying to encourage.

[2:18] Apart from `args`, we also have `flags`. `flags` are essentially named `args`. Because they're named, they're position-independent, which is very handy for not screwing up your CLI commands.

[2:35] As you can probably tell, there is a strong bias in `oclif`, and personally as well, that `flags` are better than arguments in almost every respect unless you have a very simple argument, like a filename that you want to pass in. Otherwise, you should probably always use `flags` when in doubt.

[2:53] There are a lot of nuances to parsing `flags`. For example, by convention within the world of CLIs, a `mycli --version` flag should run the version. A `--help` flag should offer some basic help. `oclif` helps you format the help accordingly over here.

[3:17] All the other `flags` are arbitrary for you to specify for your business logic internally. For example, if I were to specify a flag `--name` of `Bulbasaur`, I should be able to specify it with `yarn mycli --name Bulbasaur` and get back a useful `flags.name` variable that I can just use inside of my business logic.

[3:47] Equally, I can also specify `yarn mycli --name=Bulbasaur` so there's no spacing involved and no confusion there. That should also parse accordingly. Equally as well, I should be able to specify `-n`, short for the name parameter. It shouldn't matter whether I have the equal sign or not.

[4:09] These are all the things that `oclif` helps you to take care of because these are conventions within the CLI world. The only thing that really matters is that they all resolve to a variable that you can access called `flags.name`. That's very helpful. You can even specify the type of the variable that will be passed back.

[4:30] For example, if you say that this is a `boolean` flag, you won't get a string of true or false. You would just get an actual JavaScript true or false. You can specify a `number`, or you can specify a `string` as well. All of these are very helpful parsers that you might not think about when implementing a naïve CLI but you're definitely going to want in any sort of production setting.

[4:57] There are other parameters that you can set. For example, you can set the default parameters for some of these. For example, if I set `flags`, the name flag, to have a `default: "people"`. 

```ts
static flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  help: flags.help({ char: "h" }),
  // flag with a value (-n, --name=VALUE)
  name: flags.string({ char: "n", description: "name to print", default: "people" }),
  // flag with no value (-f, --force)
  force: flags.boolean({ char: "f" })
};
```

Now when I leave out the `name` flag and I just run my CLI, `yarn mycli`, it's going to use the default that was specified within this code.

#### Terminal
```bash
yarn mycli
  hello egghead people from ./src/index.ts
```

[5:27] For a full list of options for `flags` in arguments, you can always check back to the [docs](https://oclif.io/docs/args). Here are some of the standard fields, like whether the `args` are required or not, whether it's hidden from help files. You don't want to exactly publicize it yet. You can process your input before it's output to the final Node.js code.

[5:58] You can add a default, or you can have a set list of options. The `flags` have a few more available options as well. You can also have mutual dependencies or exclusive dependencies.

[6:12] You can also draw the flag from an environment variable so that if the user happens to choose, for example, like a name environment variable and then run your CLI, it still runs. It still resolves accordingly. That's a very handy feature as well.

[6:30] For more custom use cases, you can even define your own `flags`. That has its own parsing and validation that you can choose to have as well. As you write CLIs, you will find that `flags` and arguments are not the only ways to specify user input into your CLIs, but they are the default way to pass in user input from the command line. This is definitely a great place to start.
