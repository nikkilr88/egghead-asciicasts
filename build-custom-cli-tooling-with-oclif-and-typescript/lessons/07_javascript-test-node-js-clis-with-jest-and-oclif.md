Instructor: [0:01] CLIs need to be extremely reliable for us to have faith in them, so we should probably test them. I'm going to choose using Jest as our testing framework in this scenario. I'm going to install Jest. I'm also going to add `@oclif/test` as a dev dependency.

#### Terminal
```bash
yarn add jest
yarn add -D @oclif/test
yarn add jest-diff
yarn add -D @types/jest ts-jest
```

[0:22] Because I'm using TypeScript, I'm also going to install the relevant types for these items. Feel free to ignore them if it doesn't apply. I'm also going to specify a reasonable Jest config. Obviously, feel free to customize that how you like.

#### jest.config.js
```js
module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["<rootDir>/tests/jest/**/*.ts"],
  transform: { "\\.ts$": "ts-jest/preprocessor" },
  coverageReporters: ["lcov", "text-summary"],
  // collectCoverage: !!`Boolean(process.env.CI)`,
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["/templates/"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
```

[0:40] In particular, I'm going to specify that I'm running inside a `test/jest` folder. This seems like it's a little bit overkill, but you probably want to run other tests in future. I'm just going to put everything inside of a Jest folder for now.

[0:57] Of course, the fastest way to test your Node.js logic is to just test the Node.js logic. If I have `foo.ts` and I import some particular function -- I can just write test on that function -- this is obviously going to execute really quickly, but it doesn't do a full integration test with the command line to make sure that the command input and output is exactly what the users expect.

[1:25] For a more robust CLI test, we probably want to import the CLI testing framework from oclif. Here we can actually run commands and see what it looks like from the outset. Here is test init command works OK for example. This is our test from the Jest describe block.

[1:47] Over here, I'm going to say that I'm going to run the `init` command and hopefully name it correctly. I expect this test to fail because we haven't customized what the standard out should look like. 

#### foo.ts
```ts
import { test } from "@oclif/test";

describe("init command works ok", () => {
  test
    .stdout()
    .command(["init"]) // the command
    .it("runs init", ctx => {
      expect(ctx.stdout).toBe("hello egghead people from ./src/index.ts\n");
    });

  test
    .stdout()
    .command(["init", "--name", "jeff"])
    .it("runs init --name jeff", ctx => {
      expect(ctx.stdout).toBe("hello jeff");
    });
});
```

Either way, I should be able to run `yarn jest` and it should run my test accordingly.

[2:06] As expected, the output is differing from what I have written here. I'm just going to copy and paste it over just to bootstrap my initial test. Obviously, feel free to make these expect assertions as complex as you need them to be.

[2:24] Instead of running tests repeatedly, you can also run `yarn jest` with the `--watch` flag. This would also run tests in a watch mode so you don't have to keep refreshing. 

[2:39] You're going to run into some issues with regards to new lines because your console might actually add new lines for you. You should know that the best way to resolve them is just manually add new lines at the end of any strings that you might expect. This way, your test will pass.
