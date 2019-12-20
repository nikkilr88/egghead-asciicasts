Instructor: [0:00] Let's look at two important ways to polish CLI output. The first is so ubiquitous that I often forget that there's some people who haven't heard of it. It's [chalk](https://github.com/sw-yx/egghead-cli-workshop/blob/lesson15-polish/guide/12-polish-CLI.md). Let's have a look at how to use chalk. I'm going to `yarn add chalk` to my library. I'm going to import it, `const chalk = require('chalk')`.

#### Terminal Input
```
yarn add chalk
```

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from "../base";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");
const { spawn } = require("yarn-or-npm");
const chalk = require("chalk");

class Mycli extends Base {
  static description = "describe the command here";

  static flags = {
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);

    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: "What is the folder name?"
      })
        .then(({ name }: { name: string }) => name)
        .catch(console.error)
        .finally(() =>
          console.log(
            "You can specify this with the --name flag in future"
          )
        );
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/rollup-react");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, async (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      process.chdir(outDir);
      await spawn(["install"]);
      console.log("done installing!");
    });
  }
}

export = Mycli;
```

[0:25] Chalk is a very simple builder-based API. For example, if you wanted to change a particular output to have some section of it involve `chalk`, you can use that. You can pick the color based on defaults that chalk provides.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from "../base";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");
const { spawn } = require("yarn-or-npm");
const chalk = require("chalk");

class Mycli extends Base {
  static description = "describe the command here";

  static flags = {
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);

    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: `What is the folder ${chalk.cyan("name")}?`
      })
        .then(({ name }: { name: string }) => name)
        .catch(console.error)
        .finally(() =>
          console.log(
            "You can specify this with the --name flag in future"
          )
        );
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/rollup-react");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, async (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      process.chdir(outDir);
      await spawn(["install"]);
      console.log("done installing!");
    });
  }
}

export = Mycli;
```

[0:44] Now when I run `yarn mycli init`, I get a prompt with color in it. There are a bunch of other default colors that ship with chalk. Here are some [guidelines](https://github.com/sw-yx/egghead-cli-workshop/blob/lesson15-polish/guide/12-polish-CLI.md) that you might want to think about. You want to save `red` for errors and `green` for success. `cyan` is a very good informational color. There's no `pink`. It's actually just called `magenta` for them.

#### Terminal Input
```
yarn mycli init
```

[1:09] A good rule of thumb is always to echo user input strings in a different color. This helps the user to scan. One pair rule about this is that every time you have, for example, a `flag`, you always want to put `chalk` around it. It's easy to put chalk around strings if they're already in template tags. You should just write everything in a template tag to begin with.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from "../base";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");
const { spawn } = require("yarn-or-npm");
const chalk = require("chalk");

class Mycli extends Base {
  static description = "describe the command here";

  static flags = {
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);

    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: `What is the folder ${chalk.cyan("name")}?`
      })
        .then(({ name }: { name: string }) => name)
        .catch(console.error)
        .finally(() =>
          console.log(
            `You can specify this with the --name flag in future`
          )
        );
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/rollup-react");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, async (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      process.chdir(outDir);
      await spawn(["install"]);
      console.log("done installing!");
    });
  }
}

export = Mycli;
```

[1:34] Then you can write something like `${chalk.yellow("")}`. Let's go with `magenta` on the `--name` flag. This draws the eye when you actually have to use it and tell the user something so that they don't miss out on important information. Potato. Now you can see that magenta logging, as advertised.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from "../base";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");
const { spawn } = require("yarn-or-npm");
const chalk = require("chalk");

class Mycli extends Base {
  static description = "describe the command here";

  static flags = {
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);

    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: `What is the folder ${chalk.cyan("name")}?`
      })
        .then(({ name }: { name: string }) => name)
        .catch(console.error)
        .finally(() =>
          console.log(
            `You can specify this with the ${chalk.magenta("--name")} flag in future`
          )
        );
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/rollup-react");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, async (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      process.chdir(outDir);
      await spawn(["install"]);
      console.log("done installing!");
    });
  }
}

export = Mycli;
```

#### Terminal
![Chalk Example 1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/javascript-polish-node-js-cli-output-with-chalk-and-ora-chalk-example-1.jpg)

[1:59] Some other advice you might want to think about is that some users definitely use light terminals, so yellow on white might be something that you want to avoid. Having things that are bright and bold can be easy visual wins. Some people may be color-blind, so don't just rely on colors to convey information. Have something else to back it up texturally. Don't use too many colors.

[2:25] That about sums it up as far as chalk goes. The other polish that we want to cover is spinners. Everyone loves a good spinner when something is going on in the background. Mostly, this serves to give some visual confirmation that some expensive task is happening in the background, particularly when you're messing with child processes.

[2:47] Because we have an example of that, we're going to try using it. I'm going to `yarn add ora`. That's the library that we're using. Ora has a very simple direct manipulation API. We're going to `require("ora")`. Then we'll start our `spinner` whenever we start doing expensive work.

#### Terminal Input
```
yarn add ora
```

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from "../base";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");
const { spawn } = require("yarn-or-npm");
const chalk = require("chalk");
const ora = require("ora");

class Mycli extends Base {
  static description = "describe the command here";

  static flags = {
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);

    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: `What is the folder ${chalk.cyan("name")}?`
      })
        .then(({ name }: { name: string }) => name)
        .catch(console.error)
        .finally(() =>
          console.log(
            `You can specify this with the ${chalk.magenta("--name")} flag in future`
          )
        );
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/rollup-react");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, async (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      process.chdir(outDir);
      await spawn(["install"]);
      console.log("done installing!");
    });
  }
}

export = Mycli;
```

[3:07] For us, that is when we start doing the `install` step. We'll start the `spinner` there. We can mark a `success()` when that `install` step is done. I have to modify this a bit to make sure that I only call this code after I'm done installing.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from "../base";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");
const { spawn } = require("yarn-or-npm");
const chalk = require("chalk");
const ora = require("ora");

class Mycli extends Base {
  static description = "describe the command here";

  static flags = {
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);

    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: `What is the folder ${chalk.cyan("name")}?`
      })
        .then(({ name }: { name: string }) => name)
        .catch(console.error)
        .finally(() =>
          console.log(
            `You can specify this with the ${chalk.magenta("--name")} flag in future`
          )
        );
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/rollup-react");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, async (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      process.chdir(outDir);
      const spinner = ora("Loading unicorns").start();
      const child = await spawn(["install"]);
      child.on("close", () => spinner.succeed());
    });
  }
}

export = Mycli;
```

[3:27] I'm going to get a `child` process back from this spawn. Then I'm going to wrap that in the `child.on("close"...`. That should work. I'm going to run this and test it out. `yarn mycli init`. `Bulbasaur`. Now it's loading. You can see that little spinner in there. While it's installing, we have that spinner. When it's successful, it changes to a tick.

#### Terminal
![Spinner Example 1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/javascript-polish-node-js-cli-output-with-chalk-and-ora-spinner-example-1.jpg)

[4:03] You're free to choose from a full range of spinners. There's a long demo with every single spinner that is built into ora. I particularly like the emoji-based ones. For example, you can choose the moon emoji. We can try using that.

[4:20] We'll change this API from the string-based API to an object-based API. Now when we run this for one last time, we can actually see that it's shrinking that moon. We can customize that message. By the end, it changes to a tick.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from "../base";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");
const { spawn } = require("yarn-or-npm");
const chalk = require("chalk");
const ora = require("ora");

class Mycli extends Base {
  static description = "describe the command here";

  static flags = {
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    // debug("parsing args", args);
    // debug("parsing flags", flags);

    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: `What is the folder ${chalk.cyan("name")}?`
      })
        .then(({ name }: { name: string }) => name)
        .catch(console.error)
        .finally(() =>
          console.log(
            `You can specify this with the ${chalk.magenta("--name")} flag in future`
          )
        );
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/rollup-react");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, async (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      process.chdir(outDir);
      const spinner = ora({
        text: "Installing dependencies",
        spinner: "moon"
      }).start();
      const child = await spawn(["install"]);
      child.on("close", () => spinner.succeed());
    });
  }
}

export = Mycli;
```

#### Terminal
![Moon Spinner Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/javascript-polish-node-js-cli-output-with-chalk-and-ora-spinner-example-2.jpg)

[4:42] These are just very nice polish steps that show that you've paid attention to the little details. It gives the user something interesting to look at in your CLIs. Definitely don't stop there. There are a whole range of other CLI polish tools, a bunch of different ways to add icons inside of your CLI as well as other coloring formats.

[5:08] There's ways to prettyPrint JSON so you can syntax highlight within your CLI. Printing tables is a very big use case, as well as having banners, and boxing for very important information that you might want to share, for example the `update-notifier` tooling.

[5:27] You can even have some fun ones. One of my favorites is sign-bunny. You can add sign bunny with sign `yarn add sign-bunny`. sign-bunny is a CLI as well as a library. You can import it and give a message. For now, I'm going to leave you with one final message, which is coming from sign-bunny. It's this. Go make CLIs.

#### Terminal Input
```
yarn sign-bunny go make clis!
```

#### sign-bunny's Message
![sign-bunny's message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769731/transcript-images/javascript-polish-node-js-cli-output-with-chalk-and-ora-sign-bunny-message.jpg)
