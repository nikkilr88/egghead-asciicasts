Instructor: [00:00] As cool as it is that ESLint is so customizable that I can configure every single one of the rules, ESLint has a lot of rules, like a ton of built-in rules. There're even rules that you can install from third-party packages.

[00:14] I don't want to have to configure every single one of these rules. It'd be really nice if somebody just gave me a configuration that was like a recommended configuration.

[00:23] ESLint does have that. Instead of configuring each one of these rules, we can say `"extends"`, and specify a rule set that we want to extend. ESLint ships with a rule set, and it's called `"eslint:recommended"`.

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
  "extends": ["eslint:recommended"],
  "rules": {
    "strict": ["error", "never"],
    "valid-typeof": "error",
    "no-unsafe-negation": "error",
    "no-unused-vars": "error",
    "no-unexpected-multiline": "error",
    "no-undef": "error"
  },
  "env": {
    "browser": true
  }
}
```

[00:38] With that, we don't need any of these rules here, except for the `"strict"` rule here. We want to override the recommended configuration because, in our case, we never want to have `'use strict'`. We'll leave that one in there. Our rule configuration that we specify in here will override anything that's in the extends array here.

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
  "extends": ["eslint:recommended"],
  "rules": {
    "strict": ["error", "never"]
  },
  "env": {
    "browser": true
  }
}
```

[00:58] If we wanted to extend multiple configurations, we just add more to the array here. The one that comes last will be the one that overrides the previous. That's how the configuration is merged across these different configurations.

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
  "extends": ["eslint:recommended", "...", "...", "...", "..."],
  "rules": {
    "strict": ["error", "never"]
  },
  "env": {
    "browser": true
  }
}
```

[01:11] With that, I can go ahead and save. Look at my example, and I'm still getting all of the same warnings that I was getting before except I didn't have to configure each one of these rules manually myself.

[01:23] Let's go ahead and we'll fix all these. I'll run `npx eslint . --fix`. You get all those auto fixes in there. Then we'll manually fix a couple of these other ones. That's going to be `'string'`. Let's get rid of those extra lines.

### example.js
```js
const username = 'freddy'
typeof username === 'string'

if (!('serviceWorker' in navigator)) {
  // you have an old browser :-(
}

const greeting = 'hello'
console.log('${greeting} world!')
[1, 2, 3].forEach(x => console.log(x))
```

[01:36] This one needs to be a template literal, that takes care of that one. This one needs just a `;` in front of it, so we make sure we avoid that unexpected multi-line. With that, now our code is looking much better and our configuration is looking better as well.

### example.js
```js
const username = 'freddy'
typeof username === 'string'

if (!('serviceWorker' in navigator)) {
  // you have an old browser :-(
}

const greeting = 'hello'
console.log(`${greeting} world!`)
;[1, 2, 3].forEach(x => console.log(x))
```

[01:50] In review, all that we did here was we used ESLint's built-in recommended configuration. Then we could override some of those rules ourselves in our own custom configuration.
