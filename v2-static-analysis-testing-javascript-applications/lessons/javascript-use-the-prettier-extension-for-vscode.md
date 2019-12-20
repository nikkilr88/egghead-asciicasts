Instructor: [00:00] As cool as it is that Prettier can format some really weird looking code here. I ran `npm run format`, Prettier format said, "Magic, it's so cool." It would be really nice if I didn't have to actually run that format script.

[00:14] VS Code has a really great Prettier plugin and most editors do. We're going to go ahead and go to our extensions in a search for Prettier here. I already have it installed, but I need to enable it, so we'll enable that.

### VS Code
![search extension example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890640/transcript-images/javascript-use-the-prettier-extension-for-vscode-search-example.jpg)

[00:27] With that enabled, then I can format this stuff, but we need to configure a few things first. I'm going to go to my settings, and I like to use the `JSON` version of the settings here. A few things that I need to configure here.

[00:40] First off, I need to configure the editor default formatter. The formatter that I want is this `"esbenp.prettier-vscode"`. That's the formatter that the Prettier VS Code extension exposes to VS Code so that it can format my code.

### settings.json
```json
{
  "editor.defaultFormatter": "esbenp.pretter-vscode",
  ...
}
```

[00:57] The next thing I need to add to my configuration is the `editor.formatOnSave` option. This, I'll just set to `true`. If I go to this file and I do some weird stuff in here and hit Save, it automatically formats my code. That's just awesome.

### settings.json
```json
{
  "editor.defaultFormatter": "esbenp.pretter-vscode",
  "editor.formatOnSave": true,
  ...
}
```

[01:14] I can also have it format without saving. If I hit `command` + `shift` + `p` and do format document, then that will also automatically format my code for me as well.

[01:24] In review, all that we needed to do here was we searched in the extensions in VS Code for the Prettier extension. Then we opened up our settings, and you configure the default formatter to be the Prettier VS Code and `formatOnSave` to be `true`.

[01:39] With all that configured, now I can make all kinds of weird formatting choices, and Prettier will just fix it for me like magic.
