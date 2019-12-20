Instructor: [00:00] I love that ESLint has my back when I make some sort of typo mistake. I really love that Prettier has my back when I do some weird formatting stuff. There's one situation where these two tools can clash. That is if there's an ESLint rule that prevents something like having an extra semicolon, but Prettier would automatically fix that for me anyway.

### example.js
![interfering example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890639/transcript-images/javascript-disable-unnecessary-eslint-stylistic-rules-with-eslint-config-prettier-interfering-example.jpg)

[00:20] One thing that I could do is we'll take a look at that rule. We'll know that it's not really possible for us to break that rule, so we can just disable it, no-extra-semi. If we'll go to our `.eslintrc` here, and we'll say, `no-extra-semi`, and we'll set this to `off`. Now we're not going to get an underline for that particular rule. If I save that, it just fixes the code. It's exactly what I want.

### .eslintrc
```json
"rules": {
  ...
  "no-extra-semi": "off"
}
```

[00:48] I don't want to have to worry about doing that for every single one of these rules. I'd rather have a configuration that's already been configured to disable any rules that Prettier renders useless. That's why I'm going to `npm install` as a `--save-dev` `eslint-config-prettier`.

### Terminal Input
```
npm install --save-dev eslint-config-prettier
```

[01:08] With this installed and in my `package.json` as a `devDependency`, I can go to my `.eslintrc`. After the `"eslint:recommended"`, and pretty much after any other configurations I'm extending, I'm going to add `"eslint-config-prettier"`.

### .eslintrc
```json
  "extends": ["eslint:recommended", "eslint-config-prettier"],
  ...
```

[01:25] I don't have to add that disabling of the `no-extra-`semi rule. I can just get rid of that, and `"eslint-config-prettier"` will take care of that one as well as several others. I can go to my `example.js` file here again. I add those two semicolons. It's not giving me any red underline. When I save the file, that just goes away, thanks to Prettier.

### .eslintrc
```json
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": ["eslint:recommended", "eslint-config-prettier"],
  "rules": {
    "strict": ["error", "never"]
  }
}
```

[01:45] In review, to make this work. I just installed, in my `package.json` as a `devDependency`, ESLint config Prettier. In my `.eslintrc`, I added `"eslint-config-prettier"` to my `"extends"` option after `"eslint:recommended"`. That disables any `"rules"` that Prettier renders useless making my experience editing my code beautiful.

[02:06] I want to mention also that the `"eslint-config-prettier"` project also disables `"rules"` for other configurations that you might be installing, for example, Babel, Flowtype, React, Standard, so on and so forth. If you are using some other configurations, you can disable some of those using `"eslint-config-prettier"` as well.
