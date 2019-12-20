Instructor: [00:00] The simplest way to get data from a Node script is to invoke Node using the `p` option. `p` stands for print. Here, we pass the string. Let's see how many CPUs this system has.

#### Terminal
```javascript
$ node -p 'os.cpus().length'
8
```

[00:12] Note that we don't have to require a core Node.js module like `os` when it's invoked like this. We can store the result in a Bash variable easily as well, and then we'll echo CPUs.

```bash
$ cpus=$(node -p 'os.cpus().length')
$ echo cpus
8
```

[00:25] How do we send the command line parameters into a Node.js script? For example, let's say we want a script that can parse and check the value of a query string. Let's write a quick Node script with an API that looks like this.

[00:37] I'll call it `qscheck`, and then we'll pass a query string like this. 

```bash
$ qscheck 'abc=123&def=456'
```

Then, we'll tell it what property in here we want to check and then the expected value of it. 

```bash
$ qscheck 'abc=123&def=456' abc 123
```

Let's go ahead and implement that.

[00:48] I have my `qscheck` file here. Note that I've already given it execute permissions. You have to do that in order to invoke it directly. First of all, I add a Node shebang at the top. 

#### qscheck
```bash
#!/usr/bin/env node
```

This tells the shell to use the Node.js binary to invoke this script.

[01:04] Let's get the parameters passed to the script. All of the script's parameters are stored in the process `argv` array . What we're going to do is we're going to slice off the first two elements of it.

```javascript
const [] = process.argv.slice(2)
```

[01:16] The first element is always the path to the Node binary, and the second element is the file path to this script. We don't need those, so I sliced them off. Then in here is where we're going to have the parameters that we're interested in. 

I have the `queryString` that the user passed, their `queryString` property that they want checked, and then the expected value for that property.

```javascript
const [
  queryString,
  queryStringPropName,
  queryStringExpected
] = process.argv.slice(2);
```

[01:39] First off, down here we'll do a little bit of input validation. We'll say that all of these parameters have to be defined. If they are empty, we'll throw an error. First, we'll write to standard error, and then we'll exit with a 1 status.

```javascript
if (!queryString || !queryStringPropName || !queryStringExpected) {
  process.stderr.write(`ERROR! Must pass three args \n`);
  process.exit(1);
}
```

[01:55] Let's get the actual value. For that, I'll need the `parse` method from the `querystring` module. 

```javascript
const { parse } = require('querystring');
```

I'll run `parse` on the `queryString`, and then we'll grab the prop that the user passed. 

```javascript
let actual = parse(queryString)[queryStringPropName];
```

Then, let's do the actual comparison. We'll say if `actual` there is equal to the expected.

[02:18] We'll write that out and we'll exit with a `0` status. 

```javascript
if (actual === queryStringExpected) {
  process.stdout.write(`${actual} is equal to ${queryStringExpected} \n`);
  process.exit(0);
}
```

If they're not equal, we'll write to standard error and say they're not equal and exit with a `1` or error status. 

```javascript
if (actual === queryStringExpected) {
  process.stdout.write(`${actual} is equal to ${queryStringExpected} \n`);
  process.exit(0);
} else {
  process.stderr.write(`${actual} is not equal to ${queryStringExpected} \n`);
  process.exit(1);
}
```

Let's run this and try it out. Invoke our scripts. Let's check the exit code. It's a `0` 

![0 Status](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/javascript-send-and-receive-data-from-a-node-js-script-in-bash-using-the-process-object-0.png)

Let's change this so it's not true and check the exit status. It's a `1`. Cool, looks like it's working.

![1 Status](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/javascript-send-and-receive-data-from-a-node-js-script-in-bash-using-the-process-object-1.png)
