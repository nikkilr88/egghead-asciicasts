Instructor: [00:00] For many editors, you have an ESLint plugin that you can install. That improves your experience using ESLint. I'm going to go ahead and look in the extensions for ESLint. I actually already have it installed. I'm just going to enable it here.

[00:15] With that enabled, I can go to this file. Now I'm going to get rid of underlines for all of the places where I'm breaking these rules, which is really nice. I don't actually have to run the script to before I see that I've made an error here. I can just get it fixed automatically.

### example.js
![eslint plugin error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890652/transcript-images/eslint-use-the-eslint-extension-for-vscode-eslint-plugin-error.jpg)

[00:28] Another cool thing about this plugin is if I hit `command` + `.`, then I can say fix this strict problem. ESLint will actually automatically fix the problem for me so I don't have to worry about it, which is great.

### example.js
![plugin fix suggestion](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890636/transcript-images/eslint-use-the-eslint-extension-for-vscode-plugin-suggestion.jpg)

[00:39] Incidentally, I can also run `npx eslint . --fix`. That will apply the same thing across my code base updating as much as ESLint can possibly fix for me. It can't fix all of the broken rules, but it can fix many of them. That can be really helpful if you're adding ESLint to an existing project.

### Terminal Input
```
npx eslint . --fix
```

[00:57] With this, I can also have it `Disable strict for this line`, and it will disable that rule for this line, so I can leave that code in as it is, or I can `Disable it for the entire file`. Lots of really cool features from the ESLint extension. With this, ESLint can help me focus on developing my software and less on worrying about typos like this.

### example.js (disable strict for this line)
```js
// eslint-disable-next-line strict
'use strict'
```

### example.js (disable strict for the entire file)
```js
/* eslint-disable strict */
'use strict'
```
