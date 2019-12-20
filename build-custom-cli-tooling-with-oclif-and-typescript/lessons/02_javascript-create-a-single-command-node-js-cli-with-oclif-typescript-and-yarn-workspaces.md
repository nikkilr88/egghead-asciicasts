Instructor: [0:00] Start with an empty folder. You can scaffold a new `oclif` command with `npx oclif`. We'll choose a single command for now. We'll name it `mycli`. `oclif` gives you a few prompts, most of which you can just use the defaults. Feel free to customize if you wish.

#### Terminal
```bash
npx oclif single mycli
```

[0:26] Once you're done installing and scaffolding out, you'll have a new folder called `mycli`, which contains your new CLI. This is all the required fields for a Node CLI like a `bin` field on your `package.json` as well as the shebang that you might want to execute a script from.

[0:47] Then the rest of it dives into the `oclif` framework specifically. Over here, we're just running a single index.ts file. That just runs the `oclif` framework for you. To execute this CLI locally, you could CD into a new directory and then run that new file with `./bin/run`.

[1:12] That would give you the basic `'hello world'` message that is scaffolded from within the `oclif` app, but this isn't exactly how your user would run your CLI. They would actually run your CLI like `mycli` and expect something to be able to run.

[1:30] There are two ways to simulate this locally. You can actually `yarn link --global`, or you can use a yarn workspace. For this lesson, we're going to use a yarn workspace because it's the more advanced use case and it's a little bit harder to set up.

[1:47] I'm going to create a separate folder called `packages`. Then I'm going to use my finder window to move mycli into the packages. This is to prevent VS Code from renaming everything inside of it.

[2:04] To enable the workspace, I need to define a `package.json`. Inside of it, I need to set two fields. The first field is the `private` field. I need to set that to `true`. The second field is the `workspaces` field. I need to tell yarn what packages folder I'm using.

#### packages/package.json
```json
{
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

[2:28] That should be sufficient for installing these workspaces. We can go ahead and run `yarn` in the terminal. Now yarn is aware of this mycli package. For example, I can run `yarn mycli` and get back the same result.

[2:51] The reason you might want to use a yarn workspace is in case you have an `example` demo package, we will create that. You can just add that example folder inside of our `package.json`. Inside of this example demo project, which you can fill out, 

```json
{
  "private": true,
  "workspaces": [
    "packages/*",
    "example"
  ]
}
```

you can use the CLI from within the packages folder as though it was an installed binary but still edit the code and see it run live, which is very nice.

[3:23] In our terminal, I can run `yarn workspace` example. I do need to define the `package.json` as well. Over in `example/package.json`, I can run name example. 

#### example/package.json
```json
{
  "name": "example",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

Then I can run `yarn workspace example mycli`, which chooses the example workspace. Then within that context of the example workspace, I can run mycli within it.
