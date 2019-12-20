Instructor: [0:00] Sometimes, taking in arguments and flags from the command line is not good enough. Your user still has to remember what commands and arguments to type in. It might be better to just interactively prompt for input.

[0:13] There are a number of libraries available that help you with this task, and Oclif also provides a simple library with some utilities, like [cli.prompt](https://oclif.io/docs/prompting). There are some nuances to choosing the correct library, so let's explore what you should think about when choosing an input library.

[0:36] Consider this `login.js` file I've created. I'm going to paste in some sample CLI UX code, and this code is just going to prompt for a name, prompt for a token with a mask attribute, as well as prompt for a password with the hide attribute.

#### login.js
```js
#!/usr/bin/env node
const cli = require('cli-ux').default;
(async function() {
  // just prompt for input 
  const name = await cli.prompt('What is your name?');

  // mask input after enter is pressed
  const secondFactor = await cli.prompt('What is your two-factor token?', {
    type: 'mask
  });

  // hide input while typing
  const password = await cli.prompt('What is your password?', {
    type: 'hide'
  });

  console.log(`You entered: ${name}, ${secondFactor}, ${password}`);
})();
```

[0:54] I've already set the permissions for this file, so I'm going to go ahead and run it. It's going to ask me for my name, so I'm going to type in my name. It's going to ask me for token. I will type in some random token. Notice that, while I type, it's still showing up. Only after I hit enter, it's going to be masked.

[1:12] Then it's going to ask me for my password, which I can type in, and it's always going to be masked, even while I type. Notice that you can tell exactly how long it is. These aren't very secure defaults. These are some of the user interface decisions that you're going to have.

[1:29] For example, if I were type in a token while live streaming, someone could steal that token and use it right away. Probably, I just want it to be masked all the time, or I want it to be hidden all the time. Let's compare to the NPM login example.

[1:44] If I typed `npm login`, I'm asked for my name. It also asks for my password, but no matter what I type, nothing shows up. That's probably the right level of security for your password. The best-in-class library for doing general purpose user prompting is [Enquirer](https://github.com/enquirer/enquirer#invisible-prompt).

[2:01] This is a fork of the more popular Inquirer project with a lot more user-friendly and intuitive prompts. Enquirer has a range of great built-in prompts, which are probably everything that you need to do the stuff that you want to do.

[2:16] Enquirer gives you all of the basic prompts that you're probably going to need to build an application, and you can extend it to build custom prompts, if you want. For example, if we hit the invisible prompt, this takes the user input, hides it from the terminal, and returns a string.

[2:31] I'm going to copy and paste this example, and we'll see what happens with it. 

#### login.js
```js
const { Invisible } = require('enquirer');
const prompt = new Invisible({
  name: 'secret',
  message: 'What is your secret?'
});

prompt.run()
  .then(answer => console.log('Answer:', { secret: answer }))
  .catch(console.error);
```

First off, I should install Enquirer. 

#### Terminal
```bash
yarn add enquirer -W
```

I'm installing it at the root. I'm going to paste in the example from the docs, and we'll see how that works in practice.

[2:50] I'm going to run `./login.js` again. What is my secret? I'm typing in right now, but nothing shows up on the screen. That's probably the right approach. Enquirer has two different ways to run custom prompts. You can import a specific built-in prompt and use it as a class, or you can just import the general prompt function and specify a type corresponding the built-in prompt that you want.

[3:19] In general, I recommend using the second option, as it more flexible, and you don't have to memorize as much of this specific built-in prompt API. You can use the exact same interface for custom prompts, as well as using arrays of prompts.

[3:37] That seems like a better approach. To refactor, you just have to change what you import. You're importing the `prompt` function, take this objects field, and just specify that inside as a `type`. I'm going to specify the `'invisible'` type and will paste in the rest that are required fields for this particular prompt type.

[4:02] We also don't need to invoke the `.run` method anymore, as prompt just returns a promise. 

#### login.js
```js
const { prompt } = require('enquirer');

prompt({
  type: 'invisible',
  name: 'secret',
  message: 'What is your secret?'
});
  .then(answer => console.log('Answer:', { secret: answer }))
  .catch(console.error);
```

Now, when I run this again, I get back the exact same behavior. That is a much more amenable way to do things. A common usage of prompting is to replace any missing fields that might be required.

[4:23] Let's say, for example, in my `init.js` command over here, my name field is actually required, I don't want to have a default, and I don't want to hard error, even though I can, the framework lets my specify that this field is `required`.

[4:38] I could have a nicer user experience by prompting for it. I'm going to paste in the prompt that I've been working on. Note that all Oclif command run methods are async by default, so you can `async await` syntax in your code.

[4:57] Over in the run code, I can write an `if` block for `flags.name`, and if it's undefined, I can assign to it something out of my prompt. Here, I'm running a prompt. I'm going to change the type of this to an `input` type, and I'm going to name it.

#### init.js
```js
const { prompt } = require('enquirer');

class Mycli extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: "n",
      description: "name to print",
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    debug("parsing args", args);
    debug("parsing flags", flags);
    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: "What is your name?"
      })
        .then(answer => console.log("Answer:", { secret: answer }))
        .catch(console.error)
    }
    const name = flags.name || "world";
    this.log(`hello egghead ${name} from ./src/index.ts`);
  }
}
```

[5:15] There's a slight nuance here, where the result that comes back is actually going to be an object with a key of `name`. You're just going to have be careful enough to destructure this correctly. If you're using TypeScript, you can specify the type of that, and you can just return that `name` variable for the ultimate resolution of that function.

```ts
.then(({ name }: { name: string }) => name)
```

[5:39] Now, when I run my CLI, and I didn't specify a name, even though it's required, I can still prompt for a name. It's going to proceed on, instead of erroring, and requiring the user to rerun your code again.

[5:57] One final design element to consider is that a lot of your CLIs are going to be used in continuous integration bots, so there's no actual opportunity for user input. A very good practice is tell your user how to skip your prompting, if you relied on it, so that you don't insist on user input and make your CLI unusable in continuous integration.

[6:22] The best way that do this is with a `finally` tag, where you can always say `console.log`. `"You can specify this with a --name flag in future"`. 

```ts
.finally(() => console.log("You can specify this with a --name flag in future"));
```

Run it again. Let's see how it looks. That actually tells you a little bit about how to get rid of this prompting in the future. That's an ideal CLI developer experience.

[6:49] Enquirer gives you a fantastic toolbox to build CLI user experiences with things that you're going to want, like a 'Confirm prompt', where you have yes and no, with default arguments that parse a Boolean, a 'Form prompt', where your users can type in independent fields individually and submit them all at once.

[7:07] You also have fancier prompts, like 'Lists' that parse into arrays, or 'MultiSelect prompts', where you can pick and choose between an array, and not have to go and loop. You can even take more graphical license.

[7:23] For example, the 'Scale prompt' lets you do surveys really easily within the CLI. This might be great for a user survey or NPS survey. The 'Sort prompt' even lets you sort within an array of different values. A 'Snippet prompt' even lets you do snippet injection before you scaffold out a particular project.

[7:47] This may be very helpful in certain use cases. More generally, I also want to highlight the 'AutoComplete prompt', as that is something that offers a really good user experience in CLIs. The goal of an autocomplete is still picking from a long list of available options, but in terms of the string matching, you have some amount of substring matching available here.

[8:08] You can even tap into the matching algorithm to do fuzzy matching. In case the user has typos, you might still be resistant to typos. These are all really good ideas at the margin for improving CLI user experience.

[8:24] It starts with using a very flexible tool base, like Enquirer. You can even build custom prompts. All of these are using the custom prompt API, so you can study their source code to see how to build your own.
