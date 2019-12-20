Instructor: [0:00] When you have a CLI out and in the wild, you're going to find that versioning is actually a difficult problem as well. When you have published a new version of your CLI, it's not necessarily clear that people will know about it, particularly if they've done a global install of your CLI. They may be slow to receive patches or updated features and that might be a problem.

[0:27] Fortunately, there is a package for that. That package is called [update-notifier](https://www.npmjs.com/package/update-notifier). That is responsible for this square box, which you've probably seen in your CLIs but not really wondered where they came from. I'm going to implement it in this CLI that I already have published. We'll see how it works.

[0:48] I have this CLI available. I happen to know that the latest published version is 1.0.0. To simulate a CLI that is out of date, locally installed CLI that is out of date, I'm going to backdate this to 0.9.9. We're going to try to run this to see if there has been a version update detected.

#### package.json
```json
{
  "name": "eggheadcli-mynewcli1",
  "version": "0.9.0",
  "author": "swyx @sw-yx",
  "bin": {
    "eggheadcli-mynewcli1": "./bin/run"
  },
  "bugs": "https://github.com/sw-yx/mycli/issues",
  "dependencies": {
    "@oclif/command": "^1",
    "@oclif/config": "^1",
    "@oclif/plugin-help": "^2",
    "copy-template-dir": "^1.4.0",
    "cosmiconfig": "^6.0.0",
    "debug": "^4.1.1",
    "enquirer": "^2.3.2",
    "execa": "^3.4.0",
    "globby": "^10.0.1",
    "jest": "^24.9.0",
    "jest-diff": "^24.9.0",
    "tslib": "^1",
    "update-notifier": "^3.0.1",
    "yarn-or-npm": "^3.0.1"
  },
  "devDependencies": {
    "@oclif/dev-cli": "^1.22.2",
    "@oclif/test": "^1.2.5",
    "@types/jest": "^24.0.23",
    "@types/node": "^10",
    "ts-jest": "^24.2.0",
    "ts-node": "^8",
    "typescript": "^3.3"
  },
  "engines": {
    "node": ">=8.0.0"
  },
  "files": [
    "/bin",
    "/lib"
  ],
  "homepage": "https://github.com/sw-yx/mycli",
  "keywords": [
    "oclif"
  ],
  "license": "MIT",
  "main": "lib/index.js",
  "oclif": {
    "bin": "mycli",
    "commands": "./lib/commands"
  },
  "repository": "sw-yx/mycli",
  "scripts": {
    "prepack": "rm -rf lib && tsc -b",
    "test": "echo NO TESTS"
  },
  "types": "lib/index.d.ts"
}
```

[1:07] The best place to install `update-notifier` is inside of whatever my initialization code is. For me, that's `base.ts`. I'm going to import. I'm going to paste in my pre-prepared code. This basically requires `update-notifier` and then also reads in `package.json` of the project, which for the user is going to be the version of the CLI that they have installed.

#### base.ts
```typescript
import { Command } from "@oclif/command";
const { cosmiconfig } = require("cosmiconfig");
const explorer = cosmiconfig("mycli");
var debug = require("debug")("mycli:base");
type ConfigType = {
  name?: string;
};

const updateNotifier = require("update-notifier");
const pkg = require("../package.json");

export default abstract class Base extends Command {
  static config: null | ConfigType;
  async init() {
    const { config, filepath } = (await explorer.search()) || {};
    debug("parsing config", { config, filepath });
    this.config = config;
  }
}
```

[1:35] Inside of my `init` code, I'm going to paste in the boilerplate for using this `update-notifier`. Primarily there are three fields to take care of. There's the raw `package.json` field. There's a field for `updateCheckInterval`. This will basically debounce the number of times we're checking so we're not checking too often.

#### base.ts
```typescript
import { Command } from "@oclif/command";
const { cosmiconfig } = require("cosmiconfig");
const explorer = cosmiconfig("mycli");
var debug = require("debug")("mycli:base");
type ConfigType = {
  name?: string;
};

const updateNotifier = require("update-notifier");
const pkg = require("../package.json");

export default abstract class Base extends Command {
  static config: null | ConfigType;
  async init() {
    const notifier = updateNotifier({
      pkg,
      updateCheckInterval: 1000,
      shouldNotifyInNpmScript: true
    });
    notifier.notify();
    const { config, filepath } = (await explorer.search()) || {};
    debug("parsing config", { config, filepath });
    this.config = config;
  }
}
```

[1:56] We're also going to use this `shouldNotifyInNpmScript` field basically to get past the fact that we're using a framework and we're not directly invoking this `update-notifier` in a top-level script. Then we're going to call this `notifier.notify` command.

[2:10] This looks synchronous, but it actually is totally `async` and therefore doesn't have any performance impact on your initialization. That's very important. In fact, it's going to run that `update-notifier`, check the latest version and save it, and only tell you about it the next time you run it. That's a very important and interesting feature of update-notifier.

[2:31] Now let's test it out. I'm going to run `yarn eggheadcli-mynewcli1 name`. Remember, the latest version that I have is 0.9, but the published version is 1.0, so it is out of date. I'm going to cancel out of this. You can see because I've run this before that it's already cached the update. 

#### Terminal
![Update Check Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/node-js-prompt-users-to-update-your-node-js-clis-with-update-notifier-update-check-example.jpg)

[2:47] It's telling the user there's an update available. It looks like it's a major version. It leaves the power in the hands of the end user to decide if they really want to update that CLI. That's `update-notifier` in a nutshell. It's a very good thing to include by default in all your initialization code for your CLIs.

[3:07] In practice, you probably want to check for updates in a slightly longer interval, for example weekly. You can actually check out some of the other great options as well if you want to customize the behavior of how `update-notifier` works. It's a good library to incorporate by default.

#### Weekly Example
```typescript
const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24 * 7 // 1 week
});

if (notifier.update) {
  console.log(`Update available: ${notifier.update.latest}`);
}
```
