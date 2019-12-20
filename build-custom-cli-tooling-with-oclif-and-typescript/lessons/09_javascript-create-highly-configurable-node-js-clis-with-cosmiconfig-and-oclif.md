Instructor: [0:00] As your CLI grows in number of options, you're going to find it rather unwieldy to type in more and more commands as it grows. You also are going to want to pass in values that are more complex than simple values, and passing in JSON values by string is nobody's idea of a good time.

[0:23] There's some conventions to using config files. If you notice, for example, with Jest, you can either have a Jest key inside of `package.json`, or you can define a `jest.config.js`. You might also be familiar with a JSON configuration files, like `package.json`.

[0:45] Prettier also uses this. In fact, it's a very expansive definition. It's a `prettier` key in your `package.json` file, a `.prettierrc` file -- Babel also uses this convention -- or a `babel.json`, `.yaml`, or `.yml`, or a `prettierrc.js`, or a `prettier.config.js`, or a `prettierrc.toml`.

[1:04] These are all examples of completely equivalent configurations. You're expected to be able to resolve all of them in a consistent fashion. Fortunately, there is a library that helps you resolve all of this. Prettier uses `cosmiconfig`.

[1:20] This project is a more ambitious fork of an older RC project by Dominic Tarr. It basically gives you exactly what it says on the tin. You give it a name of a property, and it searches for everything in a very consistent fashion.

[1:37] The more tooling in the JavaScript ecosystem adopts this, the more users of those tooling are going to be able to be familiar with these config options and be able to write the configs exactly the way they like.

[1:53] We, on the CLI author side, can parse them exactly the way that we want. This seems like a very useful middle ground. Installing `cosmiconfig` is pretty easy. We're going to do it for our `init` command. We're going to `yarn add cosmiconfig`.

#### Terminal Input
```
yarn add cosmiconfig
```

[2:13] We're going to use it inside of the `init` command, pasting in the example from the docs. We can customize the module, so I'm going to say that this is the `mycli` config. That's the name and the key that we're going to search for. We can put that in our code over here. Since this is asynchronous, we can log it out.

#### init.ts
```typescript
import { Command, flags } from "@oclif/command";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const { cosmiconfig } = require("cosmiconfig");
const explorer = cosmiconfig("mycli");

class Mycli extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: "n",
      description: "name to print"
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);
    const config = await explorer.search()
    debug("parsing config", config);

    if (typeof flags.name === "undefined") {
        flags.name = await prompt({
          type: "input",
          name: "name",
          message: "What is your name?"
        })
          .then(({ name }: { name: string }) => name)
          .catch(console.error)
          .finally(() =>
            console.log("You can specify this with the --name flag in future")
          );
      }
    }
    const name = flags.name || "world";
    this.log(`hello egghead ${name} from ./src/index.ts`);
  }
}

export = Mycli;
```

[2:44] By default, when we run this code, it's not going to find anything, because we haven't specified anything with that field. It's going to return `null` for the config value. If we specify in a `package.json` a `mycli` field, and then we run it again, it's actually going to find this field in `package.json` and parse it into a config that we can use.

#### package.json
```json
{
  "name": "mycli",
  "version": "0.0.0",
  "author": "swyx @sw-yx",
  "bin": {
    "mycli": "./bin/run"
  },
  "mycli": {
    "foo": 123,
    "bar": 456,
    "name": "Squirtle"
  },
  ...
}
```

[3:11] We can then use this config object inside of our code. For example, if `config` is available, and `config.name` is available, then we can assign a `flags.name = config.name`. If not we can continue our prompting.

#### init.ts
```typescript
import { Command, flags } from "@oclif/command";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const { cosmiconfig } = require("cosmiconfig");
const explorer = cosmiconfig("mycli");

class Mycli extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: "n",
      description: "name to print"
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);
    const config = await explorer.search()
    debug("parsing config", config);

    if (typeof flags.name === "undefined") {
      if (config && config.name) {
        flags.name = config.name
      } else {
        flags.name = await prompt({
          type: "input",
          name: "name",
          message: "What is your name?"
        })
          .then(({ name }: { name: string }) => name)
          .catch(console.error)
          .finally(() =>
            console.log("You can specify this with the --name flag in future")
          );
      }
    }
    const name = flags.name || "world";
    this.log(`hello egghead ${name} from ./src/index.ts`);
  }
}

export = Mycli;
```

[3:30] Notice how we've made this overriding internal within this null check for `flags.name`, and this is because of a subtle preference order that you might want to establish for your CLIs. Generally, you'll probably want to design this experience that environment variables override flags, override configs, and they might override stored settings.

[3:57] This is because the higher the specificity the user's applying, the higher the likelihood that that's the value that they actually want to resolve for. That's something to think about when resolving configuration.

[4:09] In any case, I can now run my code. Because I have the name specified in my `config`, I don't need to be prompted, nor do I have to fill it in the flags, and it resolves accordingly. Of course, sticking everything into `package.json` might be a little bit unseemly, so I might move that out into standalone `.myclirc` file.

#### .myclirc
```
{
  "foo": 123,
  "bar": 456,
  "name": "Squirtle"
}
```

[4:35] That will work perfectly fine, or I might call it `.mycli.config.js` file and `module.exports` this. That would also work completely equivalently. Or I might have a mono repo set up, and I'm running the CLI from within one of these mono repos. I might want to place it in an ancestor folder. That should also work equivalently.

#### mycli.config.js
```js
module.exports = {
  "foo": 123,
  "bar": 456,
  "name": "Squirtle"
};
```

[5:06] Once you have the ability to configure particular flags, don't forget to also document this. Because it's potentially confusing where the config is resolving from, it's actually a fairly good idea to always destructure the `filepath` of the `explorer.search()` results, as well as the `config`, and to log this alongside the `config` itself.

#### init.ts
```typescript
import { Command, flags } from "@oclif/command";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const { cosmiconfig } = require("cosmiconfig");
const explorer = cosmiconfig("mycli");

class Mycli extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: "n",
      description: "name to print"
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);
    const { config, filepath } = await explorer.search()
    debug("parsing config", { config, filepath });

    if (typeof flags.name === "undefined") {
      if (config && config.name) {
        flags.name = config.name
      } else {
        flags.name = await prompt({
          type: "input",
          name: "name",
          message: "What is your name?"
        })
          .then(({ name }: { name: string }) => name)
          .catch(console.error)
          .finally(() =>
            console.log("You can specify this with the --name flag in future")
          );
      }
    }
    const name = flags.name || "world";
    this.log(`hello egghead ${name} from ./src/index.ts`);
  }
}

export = Mycli;
```

[5:30] This way, when your users run into problems with resolving where their configuration comes from, you can always just tell them to run a special debug module for your module, and it would show up in the debug results. They will be able to figure out where the config is coming from.

#### Terminal Input
```
DEBUG=mycli* yarn mycli init
```

#### Terminal Output
![Yarn Debug Output](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/javascript-create-highly-configurable-node-js-clis-with-cosmiconfig-and-oclif-debug-output.jpg)

[5:48] A final piece of advice has to do with shared logic. This command does the config parsing internally inside of the run command, but it might be shared logic between serve, build, and any of the other commands that you might possibly be building.

[6:05] This is a good occasion to extract this logic into a standalone class and extend from that. We're going to create a `base.ts` class and copy over the commands that might be used in this CLI. I'm going to call it a `Base` command, even though it doesn't really matter what to call it.

#### base.ts
```typescript
import { Command, flags } from "@oclif/command";
export default class Base extends Command {
}
```

[6:28] We're going to extract the `cosmiconfig` code and just isolate it within the shared base class. Inside of the base class, we're going to parse the `cosmiconfig` results. This base class is meant to be extracted, so if you're a TypeScript user, you have to write that as an `abstract` class. Otherwise, you're forced to implement a `run()` method.

#### base.ts
```typescript
import { Command } from "@oclif/command";
const { cosmiconfig } = require("cosmiconfig");
const explorer = comsiconfig("mycli");

export default abstract class Base extends Command {
}
```

[6:55] You're only going to implement an `init()` method. This is a life cycle that runs at the start of every command. We're going to extract the relevant `config` code from that individual command into the base command.

#### base.ts
```typescript
import { Command } from "@oclif/command";
const { cosmiconfig } = require("cosmiconfig");
const explorer = comsiconfig("mycli");

export default abstract class Base extends Command {
  async init() {
    const { config, filepath } = await explorer.search();
    debug("parsing config", { config, filepath });
  }
}
```

[7:10] We're also going to copy over the debugger, because that's extremely helpful. We're also going to try to attach `this.config` onto the instance of that command. Whatever command is extending this will receive that `config`.

#### base.ts
```typescript
import { Command } from "@oclif/command";
const { cosmiconfig } = require("cosmiconfig");
const explorer = comsiconfig("mycli");
var debug = require("debug")("mycli:base");

export default abstract class Base extends Command {
  async init() {
    const { config, filepath } = await explorer.search();
    debug("parsing config", { config, filepath });
    this.config = config;
  }
}
```

[7:24] You might choose to statically type this, because that would help give some certainty as to what types this is. It's either a `null` or a `ConfigType`. You can specify your `ConfigType` anywhere you usually specify config types.

#### base.ts
```typescript
import { Command } from "@oclif/command";
const { cosmiconfig } = require("cosmiconfig");
const explorer = comsiconfig("mycli");
var debug = require("debug")("mycli:base");

type ConfigType = {

}

export default abstract class Base extends Command {
  async init() {
    const { config, filepath } = await explorer.search();
    debug("parsing config", { config, filepath });
    this.config = config;
  }
}
```

[7:42] You might insist, for example, on a `name?:` field. Everything should be optional, because your user might make it optional. This way, when you import the `Base`...Let's go ahead and refactor our `init` command to import the `Base` command.

#### base.ts
```typescript
import { Command } from "@oclif/command";
const { cosmiconfig } = require("cosmiconfig");
const explorer = comsiconfig("mycli");
var debug = require("debug")("mycli:base");

type ConfigType = {
  name?: string;
};

export default abstract class Base extends Command {
  async init() {
    const { config, filepath } = await explorer.search();
    debug("parsing config", { config, filepath });
    this.config = config;
  }
}
```

[7:58] I'm going to `import Base from '../base'`. Now, instead of extending the command from `@oclif/command`, I'm using my intermediate thing over here. Now, when I am checking `this.config`, I can actually have some type safety as to what types these properties are and to check them as I go along.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from '../base'
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");

class Mycli extends Base {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: "n",
      description: "name to print"
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);
    const { config, filepath } = await explorer.search()
    debug("parsing config", { config, filepath });

    if (typeof flags.name === "undefined") {
      if (this.config && this.config.name) {
        flags.name = this.config.name
      } else {
        flags.name = await prompt({
          type: "input",
          name: "name",
          message: "What is your name?"
        })
          .then(({ name }: { name: string }) => name)
          .catch(console.error)
          .finally(() =>
            console.log("You can specify this with the --name flag in future")
          );
      }
    }
    const name = flags.name || "world";
    this.log(`hello egghead ${name} from ./src/index.ts`);
  }
}

export = Mycli;
```

[8:22] Now, this shared config parsing can be shared among all my other commands, and that seems like a very good way to dry up your code. That about wraps it up for this configuration lesson. Of course, you might not want the full power of `cosmiconfig`, particularly the extensive number of `searchPlaces`.

[8:41] You're definitely able to modify or even extend them if you so choose. There are a bunch of other advanced options that you might want with regards to period-nested paths that could be fairly helpful to you.

[8:56] Configuration is a very deep subject. The only consideration that I would ask you to make is that, once you have a configuration that you release, it's very hard to unrelease them, because you have to document migrations, so plan it out.
