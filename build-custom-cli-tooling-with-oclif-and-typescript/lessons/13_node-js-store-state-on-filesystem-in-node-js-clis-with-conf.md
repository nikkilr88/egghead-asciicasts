Instructor: [0:00] Most Node CLIs are stateless scripts, but this undersells the potential of CLIs. [update-notifier](https://www.npmjs.com/package/update-notifier) is one example of a library that takes advantage of leaving state in the machine so that they can optimize performance but also that they can store memory for subsequent runs for developer experience.

[0:22] In general, there's a lot of opportunity in storing state in filesystem with CLIs. For example, you can store authentication tokens so people don't have to log in repeatedly. You can store user preferences so that your CLI adapts to user preferences. You can store prior selections from a list so that you can rank things that have been chosen recently higher up so that it's easier to access.

[0:49] You can cache things for performance or sync actions offline to be synced again later when you're online and basically whatever else you want. In other words, where possible, your CLI should have memory, and it should be easy to store that memory.

[1:05] Let's take a look at a simple prompt example that I've mocked up. Here I have a small inline CLI with an inquirer `prompt` that just asks for a name. I can run it with `prompt.js` over here. It's going to say, "Where is Harvey Dent?" I can write, "Uptown." It's done.

#### prompt.js
```javascript
#!/usr/bin/env node
const { prompt } = require('enquirer');

(async function() {
  await prompt({
    type: 'input',
    name: 'name',
    message: 'Where is Harvey Dent?'
  })
    .then(console.log)
    .catch(console.error);
})();
```

[1:25] The next time I run it, it's going to ask me the exact same question again. No, the fact still hasn't changed. It's still uptown. The CLI completes. There's no memory in this CLI. It's just a stateless script. That's OK, not too great. It would be nice if it just remembered what my previous answer was and if it doesn't change I could just hit enter and keep going.

[1:51] One way to achieve this is to save the result in a file. I can use the `fs` module from Node. I can say something like, `fs.writeFileSync`. I'll specify a file path like `prompt-history.json`. I'll pass in the `result`. I also need to remember to `JSON.stringify()` the `result`, or it's just going to print a stringified object for me.

#### prompt.js
```javascript
#!/usr/bin/env node
const { prompt } = require('enquirer');
const fs = require('fs')(async function() {
  await prompt({
    type: 'input',
    name: 'name',
    message: 'Where is Harvey Dent?'
  })
    .then((result) => {
      fs.writeFileSync('prompthistory.json', JSON.stringify(result));
      return result;
    })
    .then(console.log)
    .catch(console.error);
})();
```

[2:20] Now when I run `prompt.js` and I give the result, it's actually going to behave the exact same way, but it's going to write my past answer to `prompt-history.json`. Then at the start of my CLI code, I can check for the existence of `prompt.json`. `if (fs.existsSync("prompthistory.json"))`. If it does, I can load a default. I can, for example, declare default over here.

#### prompt.js
```javascript
#!/usr/bin/env node
const { prompt } = require('enquirer');
const fs = require('fs')
let default
if (fs.existsSync("prompthistory.json")) {
}

(async function() {
  await prompt({
    type: 'input',
    name: 'name',
    message: 'Where is Harvey Dent?'
  })
    .then((result) => {
      fs.writeFileSync('prompthistory.json', JSON.stringify(result));
      return result;
    })
    .then(console.log)
    .catch(console.error);
})();
```

[2:51] I can load the default. For example, `const {name} = fs.readFileSync("prompthistory.json")`. I can assign that name to the `default`. Now I can expose this `default` into my `prompt`. It looks like the name `default` isn't that great of a name. Actually, it's a reserved keyword in JavaScript, so I'm going to change that to `defaultName`.

#### prompt.js
```javascript
#!/usr/bin/env node
const { prompt } = require('enquirer');
const fs = require('fs')
let defaultName
if (fs.existsSync("prompthistory.json")) {
  const { name } = fs.readFileSync('prompthistory.json');
  defaultName = name;
}

(async function() {
  await prompt({
    type: 'input',
    name: 'name',
    message: 'Where is Harvey Dent?',
    default: defaultName
  })
    .then((result) => {
      fs.writeFileSync('prompthistory.json', JSON.stringify(result));
      return result;
    })
    .then(console.log)
    .catch(console.error);
})();
```

[3:19] I also need to remember to `JSON.parse()` the result. Now when I run `prompt.js` again, I get a nice hint that there is some prior memory of my previous answer. I can just hit enter to answer the same question, or I can type a new answer in case that answer has changed. Now when they run the CLI again, that new answer persists.

#### Terminal (Part 1)
![Default Example 1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769731/transcript-images/node-js-store-state-on-filesystem-in-node-js-clis-with-conf-default-example-1.jpg)


#### Terminal (Part 2)
![Default Example 2](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/node-js-store-state-on-filesystem-in-node-js-clis-with-conf-default-example-2.jpg)


[3:47] This is a very simple example of persistence. This may be the right solution for you depending on the context. It's certainly not suitable for every input that you can imagine, but it can definitely offer a better user experience when appropriate.

[4:02] One problem with doing it this way is the very non-standard naming conventions. The storage, the amount of boilerplate code required to read and write and store all this data. It would be nicer if this was all wrapped up in a library. That's why we should explore some libraries to help with persisting state in our CLIs.

[4:26] One particular standard to note of is the XDG spec. This helps to standardize where to store data in CLIs based on user preferences. As a CLI author, you actually have free rein to stick this file wherever you want in the user's operating system. This could lead to a lot of random files popping up every which way if it's not really well-standardized.

[4:53] Fortunately, there is a standard. It's something that you should probably respect. As a bonus, it's also cross-platform. It's called the [XDG spec](https://github.com/sw-yx/egghead-cli-workshop/blob/lesson13-state/guide/10-store-state.md). There are three main environment variables that you should be aware of.

[5:07] One for user-specific configurations that should be persisted. One for user-specific cache, maybe for performance. One for user-specific data files, for example for analytics. Another for temporary user-specific files, which doesn't get used that often.

[5:27] [Conf](https://www.npmjs.com/package/conf), the library that we're going to look at today, is building all of this in by default and storing everything to the cache. It uses a simple get and set API. Notice that it completely abstracts away from you the question of where to store your data.

[5:46] You can customize it if you want, but it's not encouraged because it's just standards-compliant by default. You should just follow along with this. Let's have a look at how much easier this could be with conf. We're going to install conf with `yarn add conf`.

#### Terminal Input
```
yarn add conf
```

[6:03] We're going to delete a vast majority of the code that we just wrote. I don't need to read and write from `prompt-history` anymore. I can just import conf from conf. The `conf` that is exported here is actually a class. We need to initialize it. You can pass in options here.

#### prompt.js
```javascript
#!/usr/bin/env node
const { prompt } = require('enquirer');
const fs = require('fs')
const Conf = require('conf');
const config = new Conf();
// config.path // see the path to the config file

config.set('unicorn', '🦄');
console.log(config.get('unicorn'));

(async function() {
  await prompt({
    type: 'input',
    name: 'name',
    message: 'Where is Harvey Dent?',
    default: defaultName
  })
    .then((result) => {
      fs.writeFileSync('prompthistory.json', JSON.stringify(result));
      return result;
    })
    .then(console.log)
    .catch(console.error);
})();
```

[6:24] For us, we're just going to config.get name and put that in the appropriate field inside of the defaults. We're going to config.set name whenever we have a successful response, so config.set. I think this is it.

#### prompt.js
```javascript
#!/usr/bin/env node
const { prompt } = require('enquirer');
const fs = require('fs')
const Conf = require('conf');
const config = new Conf();
// config.path // see the path to the config file

(async function() {
  await prompt({
    type: 'input',
    name: 'name',
    message: 'Where is Harvey Dent?',
    default: config.get('name')
  })
    .then((result) => {
      config.set('name', result.name);
      return result;
    })
    .then(console.log)
    .catch(console.error);
})();
```

[6:41] I'm also, for good measure, going to log out `config.path` so we can actually have some visibility into what `configPath`, into where the data is being stored. Now I'm going to run the CLI, `./prompt.js`. Now it's asking me the question.

#### prompt.js
```javascript
#!/usr/bin/env node
const { prompt } = require('enquirer');
const fs = require('fs')
const Conf = require('conf');
const config = new Conf();

console.log({ configPath: config.path });

(async function() {
  await prompt({
    type: 'input',
    name: 'name',
    message: 'Where is Harvey Dent?',
    default: config.get('name')
  })
    .then((result) => {
      config.set('name', result.name);
      return result;
    })
    .then(console.log)
    .catch(console.error);
})();
```

[6:57] It's also logged out the `configPath`. We'll check that later. I'm going to run that same question-answer again. Now if I run it again, it should seamlessly get that name because I set it. That's how it works. Let's have a quick look at this `config.json` library. Notice that it's stuck inside of `/Library/Preferences/mycli-nodejs/`.

#### Terminal
![Config Path Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/node-js-store-state-on-filesystem-in-node-js-clis-with-conf-config-path-example.jpg)

[7:23] This is something that draws itself from the name of my `package.json`, `mycli`. conf by default attaches `-nodejs` to avoid all conflict with other ecosystems. It sticks everything in a `config.json` file. If I click over here, it's literally just a JSON object over here. It takes care of all the parsing that you might want to do.

#### config.json
```json
{
  "name": "downtown"
}
```

[7:47] All of this is configurable in the options for conf, but you're probably not going to need it for most use cases. I'm going to cap off this section with a more realistic scenario where you can introduce state into your CLIs. Here I have an enquirer prompt. I also required conf as well. I have a preset array of strings. The task is to write a prompt that chooses from this array of strings.

#### prompt2.js
```javascript
#!/usr/bin/env node
const { prompt } = require('enquirer');
const Conf = require('conf');
const config = new Conf();
const colors = require('ansi-colors');
const presets = [
  'apple',
  'grape',
  'watermelon',
  'cherry',
  'strawberry',
  'lemon',
  'orange'
];
const priorChoices = config.get('choices') || [];
const separator = priorChoices &&
  priorChoices.length && { role: 'separator', value: colors.dim('────') };
const choices = [
  ...priorChoices,
  separator,
  ...presets.filter((x) => !priorChoices.includes(x))
].filter(Boolean);

(async function() {
  await prompt({
    type: 'select',
    name: 'color',
    message: 'Pick your favorite color',
    choices
  })
    .then((result) => {
      config.set('choices', [result.color, ...priorChoices].slice(0, 3));
      return result;
    })
    .then(console.log)
    .catch(console.error);
})();
```

[8:11] However, the twist on this is that I want to remember the past three selections and place them higher up in my presentation of the options available. I'm going to get those options from my conf `config`, if I have any. If not, I'm going to default to an empty array.

[8:31] If this empty array is non-zero, then I'm going to add a `separator`. That's a special syntax for enquirer to add a separator. Then I'm going to concatenate it. I'm going to add these together into a `choices` array. I'm going to use a `filter` of the `presets` to make sure that I leave out anything that is already included in the `priorChoices` that have been saved to the filesystem.

[8:55] Now I write a `prompt` that is a `select`. I can pass in those process `choices` that include `priorCboices`, a `separator`, and the remainder of whatever else is in the `preset` array. Once I have a successful selection, I can then set that choice and make a new array, now with the new choice as well as the `priorChoices`.

[9:18] I'm going to `.slice()` it off so I can always keep to a maximum of three in that array. Then I can do whatever other business logic I want with that choice.

[9:28] Here's how it looks in practice. I have this prompt here, `./prompt2.js`. It's going to run. This is the first time it's running. It's just going to present these selections in order. I'm going to choose `strawberry`. I like strawberries. I'm going to run it again.

#### Terminal
![Preset Example 1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/node-js-store-state-on-filesystem-in-node-js-clis-with-conf-preset-example-1.jpg)

[9:47] This time, there is some state. I persist and highlight that this is the previous choice from last time. I can obviously modify the separators a bit to reflect that informational choice. This time, I'm feeling more like `grape`. I'm just going to choose that. Next time, I'm going to choose something more like a `lemon`. I'm going to choose that.

#### Terminal
![Preset Example 2](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/node-js-store-state-on-filesystem-in-node-js-clis-with-conf-preset-example-2.jpg)

[10:09] This is the first time we now see our CLI fill up with the maximum of three. These are all the remaining choices. Now if I choose an `orange`, it's going to pop this out from the bottom because I no longer like `strawberry` anymore.

#### Terminal
![Preset Example 3](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576769732/transcript-images/node-js-store-state-on-filesystem-in-node-js-clis-with-conf-preset-example-3.jpg) 

[10:24] It's just always going to persist in reverse order what I have in terms of command history. Then everything else is just going to be whatever's left over from the commands. This is a really common scenario, especially in CLIs and prompting. I hope you keep looking for this and other opportunities to persist state to your CLIs.
