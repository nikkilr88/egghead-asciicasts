Instructor: [0:00] One of the trademark features of Ruby on Rails is the `rails generate` command, which helps you scaffold out any number of very common Rails boilerplate. The value proposition is literally that, saving a large amount of time by printing out boilerplate code into your project.

[0:19] This makes template scaffolding a very good CLI use case for any sort of framework. It is such a big jump in developer productivity that I've actually compared it before to cheating at developer experience because you're literally copying and pasting working code into the user's project.

[0:40] The closest the JavaScript ecosystem has to anything like the Ruby on Rails `rails generate` command is Angular's `ng generate` command, which does a lot of the same things, but it also helps to modify files based on a particular schematic that a particular file conforms to. This can be very handy. It's a more advanced use case.

[1:02] For other frameworks, the primary player has been Yeoman, which is a generic tool for scaffolding new projects and apps. However, the developer experience is very much controlled by the Yeo CLI. You may wish to take matters into your own hands within your own CLI.

[1:19] There are many options to implement your own scaffolding, particularly writing your own in Node.js, but you can use some libraries for it. We're going to try out `copy-template-dir` today as something with a very, very simple API which we can just drop into a project. It has a very small footprint.

[1:39] Let's head back to our terminal. I'm going to create a dedicated folder just to hold our templates. I am going to imaginatively call it `templates`. I'm going to open it in finder because I plan to drag-and-drop in a pre-prepared template.

[1:53] I'm going to open another finder window where I have my pre-prepared template. I'm going to look for my pre-prepared template. I think it's called `rollup-react`. This is a running app that I wish to make into a project that I can just scaffold easily.

#### Template Pasting Windows
![Finder Window Preview Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/javascript-scaffold-out-files-and-projects-from-templates-in-a-node-js-cli-finder-cp-example.jpg)

[2:11] I can go into my `templates` folder over here and paste it in. Now, within my `templates` folder I have a fully working project. This has all the dependencies that I wish to scaffold out. Of course, this is a fully working app, in this case creating a `create-react-app` clone, but you may wish to just scaffold singular working files, for example.

[2:35] I want to tie this up together with my `init` command. First of all, I'm going to install `copy-template-dir`. I'm going to use it inside of my code, `const copy = require copy-template-dir`. The code for `copy-template-dir` has an `inDir` and `outDir` and a `vars`. We'll talk about those in turn. I'm also going to need the `path` module from Node.js.

#### Terminal Input
```
yarn add copy-template-dir
```

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from '../base'
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require('path');

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

[3:13] Let's assume that I have everything boiling down to `flags.name`. I'm just going to get rid of this log as well. Let's assume that my goal of my `init` command now is to scaffold out this new project. My in directory should be the sibling folder of this `commands` folder.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from '../base'
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require('path');

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
  }
}

export = Mycli;
```

[3:34] I'm going to type, "use path.resolve" and use the `__dirname` to refer to this specific file I'm working with. I'm going to tell it to get out of this folder, go into `templates` folder, and go into `rollup-react`. I expect it to copy everything within `rollup-react`. Inside of the `outDir`, I'm going to do `path.join`.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from '../base'
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require('path');

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

    const vars = { foo: "bar" };
    const inDir = path.resolve(__dirname, "../templates"););
    const outDir = path.join(process.cwd(), "dist");

    copy(inDir, outDir, vars, (err, createdFiles) => {
      if (err) throw err;
      createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
      console.log("done!");
    });
  }
}

export = Mycli;
```

[4:00] When the user runs this, this will be the value of the current working directory, `process.cwd`. I'm going to append to that the `name` that I've resolved. What is the folder name, for example? `copy-template-dir` has a standard Node.js callback API. We can just make sure that this is an instance of `Error`, as well as the creative files are an array of `String`. That should do the trick.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from '../base'
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require('path');

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
          message: "What is the folder name?"
        })
          .then(({ name }: { name: string }) => name)
          .catch(console.error)
          .finally(() =>
            console.log("You can specify this with the --name flag in future")
          );
      }
    }
    const name = flags.name || "world";

    const vars = { foo: "bar" };
    const inDir = path.resolve(__dirname, "../templates"););
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, (err: Error, createdFiles: String[]) => {
      if (err) throw err;
      createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
      console.log("done!");
    });
  }
}

export = Mycli;
```

[4:29] Now when I'm in my sample CLI, I can run `yarn mycli init`. I don't have any config set. It's going to ask me for the folder name. I can just say, `mynewapp`. It's going to copy out all these files into a new `mynewapp` folder. When I check out these files, this is all usable code which I just scaffolded out from my templates.

#### Terminal
![mycli Command Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/javascript-scaffold-out-files-and-projects-from-templates-in-a-node-js-cli-cli-input-example.jpg)


[4:54] Sometimes you may want to customize the app. `copy-template-dir` has very simple templating for you to do that. I'm going to delete this copied out app. We'll see this in action. Instead of the `init` command, we have this `vars` variable. This `vars` object is just a simple key-value mapping of what needs to be written into the template.

[5:17] I can take, for example, `projectName` and assign it the `name` of the directory. Now I have this `projectName` variable, I can use mustache templates to replace any particular string I might want to be dynamically injected.

#### init.ts
```typescript
import { flags } from "@oclif/command";
import Base from '../base'
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require('path');

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
          message: "What is the folder name?"
        })
          .then(({ name }: { name: string }) => name)
          .catch(console.error)
          .finally(() =>
            console.log("You can specify this with the --name flag in future")
          );
      }
    }
    const name = flags.name || "world";

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates"););
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, (err: Error, createdFiles: String[]) => {
      if (err) throw err;
      createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
      console.log("done!");
    });
  }
}

export = Mycli;
```

[5:34] For example, in the `projectName` field and maybe the repository field in `package.json`. Make sure there's no spaces around the mustaches. Now when I run `yarn mycli init`, it's going to prompt me again for a new folder name.

#### package.json
```json
{
  "name": "{{projectName}}",
  "version": "0.0.1",
  "private": true,
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  },
  "devDependencies": {
    "@fullhuman/postcss-purgecss": "^1.3.0",
    "@types/react": "^16.9.11",
    "@types/react-dom": "^16.9.4",
    "autoprefixer": "^9.7.1",
    "postcss-import": "^12.0.1",
    "postcss-nested": "^4.2.1",
    "postcss-preset-env": "^6.7.0",
    "rollup": "^1.27.0",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-livereload": "^1.0.4",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-postcss": "^2.0.3",
    "rollup-plugin-replace": "^2.2.0",
    "rollup-plugin-terser": "^5.1.2",
    "rollup-plugin-typescript": "^1.0.1",
    "sirv-cli": "^0.4.5",
    "tailwindcss": "^1.1.3",
    "tslib": "^1.10.0",
    "typescript": "^3.7.2"
  },
  "scripts": {
    "build": "rollup -c",
    "start": "rollup -c -w",
    "serve": "sirv public"
  },
  "repository": "https://github.com/sw-yx/{{projectName}}",
  "author": "sw-yx <swyx@swyx.io>"
}
```

[5:48] I can give it a new folder name, `fooapp`, that is going to scaffold out a new folder with all the stuff that I wanted but also the contents replaced accordingly to the variables that I've supplied. This can be very useful for simple templating.

#### Terminal
![Terminal mycli Example 2](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/javascript-scaffold-out-files-and-projects-from-templates-in-a-node-js-cli-mycli-init-example-2.jpg)

[6:03] You can absolutely keep going with more ideas. For example, imagine having a bunch of different templates at your disposal.

[6:10] In the `init` command, you're reading the `templates` folder to see what's available, sticking that into a `prompt({})` with an autocomplete field, asking the user what they want to scaffold out, then taking that result, and then copying out the correct folder into the destination that they desire.

[6:31] It really is only limited by your creativity as to the kind of productivity you want to have with your CLIs. For more complex templating solutions, you might wish to reach for some other tools, like Consolidate, EJS, and Pupa.

[6:45] There are a whole bunch of other custom-built tools that involve the Express templating ecosystem that you might want to look into as well. All in all, this is probably the highest-bang-for-your-buck activity that you can get right out the door to prove out the value of CLIs for your team.
