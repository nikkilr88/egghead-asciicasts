Here, we have an application that will read a `config.json` file, then replace some contents, and write out a new one. It's really not that complicated, but it's full of all these error handling cases, and asynchronous callbacks, and whatnot.

#### 2.js
```javascript
const Task = require('data.task')
const fs = require('fs')

const app = () => 
    fs.readFile('config.json', 'utf-8', (err, contents) => {
        if(err) throw err

        const newContents = contents.replace(/8/g, '6')

        fs.writeFile('config.json', newContents, (err, _) => {
            if (err) throw err
            console.log('success!')
        })
    }) 
```

What we want to do is convert it to use tasks. We can compose these lines together. Let's go ahead and do that. What we need to do is wrap both `readFile` and `writeFile`, the two asynchronous actions that have side effects. We want to wrap those in `Task`.

We can automate this. There are a lot of libraries, such as **Futurize**, that will do this for us. Let's do it manually so we can learn here. We have a `readFile` that will take the same arguments as `readFile` here, except for the callback.

Let's just copy and paste this here. We want to take a `filename` and `enc`. Then, we don't care about the callback here. We'll pass in the `enc` here and the `filename` here. To make this lazy and give us a `Task`, we have to use our `Task` constructor around it.

```javascript
const readFile = (filename, enc) =>
    new Task((
    fs.readFile(filename, enc, (err, contents) =>
```

Here's where our callbacks come in. We have our `rej` case and our `res` case. In here, we can basically call, if there's an error, we'll reject it. If there is a `success`, we'll respond with the `contents`, just like that.

```javascript
const readFile = (filename, enc) =>
    new Task((rej, res) => 
    fs.readFile(filename, enc, (err, contents) =>
        err ? rej(err) : res(contents)))
```

That's all there is to it. We just put this `Task` wrapper around our actual functionality here and pass our arguments into it. Now, let's do the same for `writeFile`. We use these as templates, and so it's pretty much the same.

We have `writeFile`. We have to take our file names and `contents` here. Then, instead of `readFile`, we just `writeFile`. We take the `filename`, the `contents`, and the result here will be `success` or not. It will just return that.

```javascript
const writeFile = (filename, contents) =>
    new Task((rej, res) => 
    fs.readFile(filename, contents, (err, success) =>
        err ? rej(err) : res(success)))
```

That's all there is to it. It's the same idea, the same template. We can do this for HTTP, and logging, and all sorts of side effect-y things that don't really compose well. Now that we have atomic pieces, our `readFile` and our `writeFile` in task form, let's go ahead and attempt to rewrite `app` here. We'll leave this here, so we can look at it. We'll start with a new one.

We have `app` where we will read the `config.json` -- there it is. Then, we'll pass in the `utf-8`, so it knows the coding. Then, we can just go ahead and `map` over that file since we have the `contents` here now, when we `map` over it, `contents`. Here, we want to replace the `contents` just like this line. Let's grab this piece and `contents` are placed.

```javascript
const app = () =>
    readFile('config.json', 'utf-8')
    .map(contents => .replace(/8/g, '6'))
```

We're just going to take the `8`s out and put `6`s in. If we want to look at what we're doing here, we have our little `config.json` here. Again, let's just `{"port": 8888}`, and we're just going to replace those `8`s with `6`s. That's not the point, the point is that we are going to read and write Files and compose all these together in a pure way.

Down here, with the `writeFile`, we have to do the same thing. Instead of mapping, because we're going to return another `Task`, we want to `chain`. Now that we have the new `contents` here, we'll just go to `writeFile` with the `config1.json`, and those `contents`.

```javascript
const app = () =>
    readFile('config.json', 'utf-8')
    .map(contents => .replace(/8/g, '6'))
    .chain(contents => writeFile('config1.json', contents))
```

That's all there is to that. That will write the file and return us a new `Task`. Then, at the end of it all, we want to just `fork` it with a success. Why don't we do that outside of our application, because we don't want to log `success` buried somewhere deep in our function.

We would never do that in a real application to pass logs somewhere deep in a library there. What we're going to do here is `fork` our `app` with the `e` case, with this `console.log` our error, and a `success` case which will be `x`, we'll say `console.log('success')`. That's it. It's all there is to it.

```javascript
const app = () =>
    readFile('config.json', 'utf-8')
    .map(contents => .replace(/8/g, '6'))
    .chain(contents => writeFile('config1.json', contents))

app().fork(e => console.log(e),
           x => console.log('success'))
```

Now, this will read the file, change the contents, write a new one out. We don't call it till down here. Now, one thing to notice is this whole thing is wrapped in a function, but it doesn't need to be. We could just remove that.

And `app` is just a `Task` that will go do all of this for us. You can use that as your discretion. Either one is fine. One creates a new `Task` and the other one just re-uses the same old `Task` here.

```javascript
const app = 
    readFile('config.json', 'utf-8')
    .map(contents => .replace(/8/g, '6'))
    .chain(contents => writeFile('config1.json', contents))

app.fork(e => console.log(e),
           x => console.log('success'))
```

Let's go ahead and call this. This is our `task/2.js`. Then, it's a `success` here. That's great if we can `$ cat config1.json`. It has replaced the `8`s with `6`s. It's nice and clean, composable, easy to read, and all of that.

#### Terminal Output
```bash
{"port": 6666}
```