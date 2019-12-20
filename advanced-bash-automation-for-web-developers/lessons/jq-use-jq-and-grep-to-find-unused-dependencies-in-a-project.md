Instructor: [00:00] In my directory here, you can see I have a `package.json` already. I just `cat` that out. You can see I have two dependencies here. 

#### package.json
```json
{
  "name": "jq-lesson",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["jq", "egghead"],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4",
    "lodash": "^4.17.11"
  }
}
```

I just have one JavaScript file, this `index.js`. This is just a `hello world` for an Express app. 

#### index.js
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

There's no `lodash` in here, but there is `express`. I'm hoping that our script here will see that `lodash` is unused and will mark it for removal.

[00:26] Let's see how we do that. First, let's figure out what's our `jq` query going to look like. 

We're going to want to get the `dependencies` objects from `package.json`. It's going to look like this. 

We can pass `jq` a file as the second parameter. 

#### terminal
```bash
$ jq '.dependencies' package.json
```

We see that returns that object. 

```json
{
    "express": "^4.16.4",
    "lodash": "^4.17.11"
}
```

[00:47] We want to get this object as an array of these keys. Let's see how we do that. In our `jq` selector, we're going to pipe the `dependencies` object to the `keys` function. 


`jq` has a number of built-in functions. One of them is `keys`. It has this kind of piping syntax, just like Bash. This allows you to chain queries together.

```bash
$ jq '.dependencies | keys' package.json
[
    "express",
    "lodash"
]
```

[01:13] Next, what we're going to want to do is we're going to pipe that to our array value iterator. That's going to break it out into separate lines so that we could use it in a for loop. 

```bash
$ jq '.dependencies | keys | .[]' package.json
"express"
"lodash"
```

The last thing we're going to do is we're going to add the `-r` flag. The `r` stands for raw. 

```bash
$ jq -r '.dependencies | keys | .[]' package.json
express
lodash
```

[01:29] You can what it does is it drops the quotes from it, which just makes it easier to use in our scripts. Usually, in script, we don't need quotes around it, so it's awesome. This is just what we need. Let's copy this to use in our scripts.

[01:45] I'm going to open this directory in my code editor. I'll create a new file here. Here, I'm going to start with a `for` loop. I'm going to say `for dep in`, and then we're going to invoke our command in there. 

#### check-unused-deps.sh
```bash
for dep in $(jq -r '.dependencies | keys | .[]' package.json); do

done
```

In here, I'm going to do a `grep`. I'm going to say if we can't find a dependency, then mark it for removal. I'm going to do `require`, and then pass my dep here. 

[02:09] I'm doing wild cards around the dependency name just because it could have single quotes or double quotes. We want to capture all of those. Then we're going to do recursive and quiet. I'm going to exclude `node-modules`, and then have it search in the current directory. Then we'll say you can probably remove a dependency.

```bash
for dep in $(jq -r '.dependencies | keys | .[]' package.json); do
  if ! grep "require\(.*$dep.*\)" -Rq --exclude-dir="node_modules" .; then
    echo "You can probably remove $dep"
  fi
done
```

[02:32] As a side note, the way that this conditional syntax works, if this `grep` doesn't find any matches, it will return an exit status of one. If it does find matches, it will return an exit status of zero. Basically, what this is saying is if this `grep` returns unsuccessful -- and that's why we had the exclamation point to negate it -- then this if statement is true, and we enter in the if statement.

[02:57] If that's true, we know that we couldn't find any usages of this dependency, so we can probably remove it. Let's try this out. We'll give it execute permissions. Then let's run it. 

![Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/jq-use-jq-and-grep-to-find-unused-dependencies-in-a-project-example.png)

Cool, we see that works. I did not use `lodash`, and it's saying I can remove it.
