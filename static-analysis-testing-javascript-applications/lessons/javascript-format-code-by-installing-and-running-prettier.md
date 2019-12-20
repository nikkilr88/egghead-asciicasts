The first thing I'm going to do here is `npm install` as a dev dependency prettier, `npm install --save-dev prettier`.

#### Terminal Input
```
npm install --save-dev prettier
```

With that installed, I can now run `npx prettier src/example.js`. It will automatically format this file for me.

#### Terminal Input
```
npx prettier src/example.js
```

If I look at `example.js` and I do some really weird formatting here -- we'll just put things all over the place -- `prettier` can take that and turn it into something that looks reasonable. If I want to have `prettier` save this value, then I can add a `--write` flag. It will write the changes to disk.

#### Terminal Input
```
npx prettier --write src/example.js
```

With those changes, I'll go ahead and add another script here for `"format"`. We'll say `"prettier --write"`. I could say `src/example.js`, but I actually want prettier to format all the files in my project.

#### package.json
```json
"scripts": {
    "lint": "eslint src",
    "format": "prettier --write src/example.js"
},
```

Prettier is actually capable of formatting more than just JavaScript, but JSON and CSS and GraphQL even. Let's go ahead and provide prettier with a glob, `\"\"` to match any file in the project that it can format.

```json
"scripts": {
    "lint": "eslint src",
    "format": "prettier --write \"\""
},
```

Say, `**` any file that ends in `.` any of these extensions, `js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|mdx|graphql|vue`.

```json
"scripts": {
    "lint": "eslint src",
    "format": "prettier --write \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|mdx|graphql|vue)\""
},
```

I'm pretty sure that's everything that prettier can support at this moment, but keep a look out, because prettier keeps on adding support for more. Depending on your project, you may or may not care about all of these. So go ahead and just list the ones you care about.

With that now, I'll save `package.json`. Open up my terminal and I'll run `npm run format`.

#### Terminal Input
```
npm run format
```

Prettier will go through my whole project for all files that match the glob that I provided and attempt to format them.

![Prettier formatting files in the glob](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908123/transcript-images/graphql-install-and-run-prettier-glob-file-formatting.png)

Those that are gray needed no changes. If I make a change to the bug in `example.js` again -- and I'll just add a bunch of spaces and whatever else and save that.

Run `npm run format` again -- then we'll see that source example was changed.

#### Terminal Input
```
run npm format
```

![source example change](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908127/transcript-images/graphql-install-and-run-prettier-src-example-change.png)

In review, what we did here is we installed `prettier` as a dev dependency. Then we created a format `script` to use prettier with `--write` so that it would write it to the file. Then we provided a glob that matched all the files that prettier is capable of formatting for us.

In addition to this,many text editors do have support for prettier built in. I'm going to go ahead and find prettier.

Here, I already have it installed. I'll just enable it and reload.

Now if I open up my settings here and go to my `settings.json`, then I can enable `formatOnSave`. Then I can go back to this example file, and I can make all kinds of weird changes here and hit the save key, and it will automatically format for me.