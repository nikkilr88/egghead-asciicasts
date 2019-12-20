Instructor: [00:00] Let's say I have a `log` file in this format. 

#### log
```json
{"level":"warn", "message":"this is just a warning"}
{"level":"log", "message":"hi there"}
{"level":"error", "message":"error occurred!"}
```

This is line-delimited JSON. Each line represents a different chunk of JSON. There's a `level` with an `error`, or a `log`, or `warn`. Let's say that I want to write a **NodeJS** script that I can pipe to in **Bash** that will filter out all these other lines, and leave me with just the `error` lines.

[00:20] I've already created my file `filter-ldjson.js`, and I've given this execute permissions. The first thing we want to do is have a **NodeJS** shebang at the top. This tells the shell to use the Node binary in your environment to execute this file.

#### filter-ldjson.js
```javascript
#!/usr/bin/env node
```

[00:35] Next is to require `Transform` from the **NodeJS** `stream` module, because we'll be using a transform stream. 

```javascript
const { Transform } = require('stream');
```

We'll create our class here, and it'll implement the `_transform()` method. 

```javascript
class FilterLogs extends Transform {
  _transform() { }
}
```

We'll also go ahead, and we'll set up our pipes.

[00:49] A standard in is a stream. We'll `.pipe` that to our `FilterLogs` stream, and then we'll `.pipe` the output of that back to `process.stdout`. 

```javascript
process.stdin
  .pipe(new FilterLogs())
  .pipe(process.stdout);
```
Let's go ahead and implement this. This method takes three parameters. We have the `chunk`, `encoding`, and then the done `callback`.

[01:09] `chunk` is always going to be a buffer. We're going to want to convert that to just a normal JavaScript string. Then we're going to `split` that on new lines, because we might get multiple lines at a time. From there, we'll do a reduce.

[01:22] In our `.reduce` callback, we'll implement the logic that checks each line's level, of whether or not it's an error. Then when that's done, we'll join it back together, with new lines separating them. Let's implement our `.reduce`.

```javascript
class FilterLogs extends Transform {
  _transform(chunk, encoding, callback) {
    let jsonChunk = chunk.toString()
        .split('\n')
        .reduce((aggr, line) => {} ,[])
  }
}
```

[01:35] We check if the `line` is empty. We only want to work with non-empty lines. Then we're going to `parse` it. Then in here, we'll check the `level`. If it is an `error` `level`, we'll push it into our aggregator, but we'll `stringify` it first. Then we'll always `return` our aggregator.

```javascript
.reduce((aggr, line) => {
  if (line) {
    let json = JSON.parse(line);
    if (json.level === 'error') {
      aggr.push(JSON.stringify(json));
    }
  }
  return aggr;
```

[01:52] If this `jsonChunk` is not empty, it's defined here. We could get lines that are just all `log` lines, for example. Then this would be just an empty string. We'll call the stream's `push` method. `push` is the stream method that queues our string or our buffer to be consumed by the next stream in the pipeline.

[02:11] Then we add a new line to the end of every chunk, because that last line won't have a new line under. Then we call the `callback`, which means that this transformation is done. 

```javascript
class FilterLogs extends Transform {
  _transform(chunk, encoding, callback) {
      let jsonChunk = chunk.toString()
        .split('\n')
        .reduce((aggr, line) => {
          if (line) {
            let json = JSON.parse(line);
            if (json.level === 'error') {
              aggr.push(JSON.stringify(json));
            }
          }
          return aggr;
        }, [])
        .join('\n');

      if (jsonChunk) {
        this.push(jsonChunk + `\n`);
      }

      callback();
  }
}
```

Last thing we want to do is, we'll wrap the whole thing in a try-catch block.

[02:27] Let's move all this into the `try`. Then in our `catch` here, we'll call the `callback` with that error. 

```javascript
class FilterLogs extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      let jsonChunk = chunk.toString()
        .split('\n')
        .reduce((aggr, line) => {
          if (line) {
            let json = JSON.parse(line);
            if (json.level === 'error') {
              aggr.push(JSON.stringify(json));
            }
          }
          return aggr;
        }, [])
        .join('\n');

      if (jsonChunk) {
        this.push(jsonChunk + `\n`);
      }

      callback();
    } catch (error) {
      callback(error);
    }
  }
}
```

Then we'll just implement some more error handling here. We'll listen to `uncaughtException`. Basically, if this callback is invoked with an error, it'll end up in this `uncaughtException` handler.

[02:46] Here, we'll write out the standard error with the error message, and then exit with a `1` status. 

```javascript
process.on('uncaughtException', err => {
  process.stderr.write(`Uncaught exception: ${err.message}\n`);
  process.exit(1);
});
```

Now, to test it out, I have a written a script that'll test it for us. It's a little hard to test just on its own. What I have in here is I have a `push_to_log` function that'll get run in the background.

[03:03] In here, this is an infinite loop that every second will append another line of JSON to that `log` file. Every time it appends, it alternates between either being an `error` or a `log` level. Then this line will `tail` the log file.

[03:20] I use the `f` option here. That tells it to follow it, so it'll update it in real time. Then I pipe it to our JavaScript file. 

#### run-test.sh
```bash
#!/bin/bash

# trap runs the cleanup function when the script completes
# it stops the bash process that's running the push_to_log function
cleanup() {
  kill $(jobs -p)
}
trap cleanup EXIT

push_to_log() {
  local level="error"
  while true; do
    sleep 1
    echo "{\"level\":\"$level\", \"message\":\"$(date)\"}" >> log
    # flip it from error to log after every iteration
    if [[ $level == "error" ]]; then
      level="log"
    else
      level="error"
    fi
  done
}

# append to log file once a second in the background
push_to_log &

# tail it in realtime and pipe it to our JS file to filter it
tail -f log | ./filter-ldjson.js
```

Let's jump to the terminal and test it out. I'll run `run-test`. That was the first line in the log file.

[03:36] Then I'm seeing only the error line show up here. It looks like that's working. Let's double check our log file. Yeah, you can see that first, it got these three lines, and it only showed this last one there. From there, it's been alternating between error and log, but we're only seeing the error lines here. Awesome, it's working.

![Result](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-transform-piped-data-from-bash-using-a-node-js-transform-stream-result.png)
