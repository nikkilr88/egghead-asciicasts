If we look at the scripts in our `package.json` file, we have a `"dev"` and a `"dev:hot script"`. If we look at those, we'll notice that those are pretty much identical.

#### package.json
```json
"scripts": {
  ...
  "dev": "webpack-dev-server --open --config webpack.config.dev.js",
  "dev:hot": "webpack-dev-server --open --hot --config webpack.config.dev.js"
}
```

We're calling `webpack-dev-server`. We're passing at the `--open` flag. We're doing that in both. Then we're specifying a `--config`. We're using the same config for both. We're using our dev config.

The only difference is, the `"dev:hot"` option passes in this `--hot` flag. If we ever wanted to make an additional change that applied to both, we'd have to do that in two scripts. That's just going to get cumbersome, and we're likely to leave something out.

Let's see how we can remove this duplication. **Good news is, we can call npm scripts from npm scripts.** I'm going to come into this `"dev:hot"`, because this is the one where I'm basically using everything the `"dev"` has, and I'm adding a flag.

I'm going to take this entire script and remove that. Then in here, I'm just going to do an `npm run dev`. The only difference is, I needed to pass that `--hot` flag in. I'm going to pass in a double dash, followed by my flag. This is going to tell npm to pass that flag through to the CLI that's run in the other command.

#### package.json
```json
"scripts": {
  "build": "webpack --config webpack.config.prod.js",
  "dev": "webpack-dev-server --open --config webpack.config.dev.js",
  "dev:hot": "npm run dev -- --hot",
  "test": "echo \"Error: no test specified\" && exit 1"
```

We can save this. Now I can come down into the terminal. I can just confirm that this works by doing an `npm run dev --hot`.

#### Terminal
```bash
$ npm run dev --hot
```
That's going to run `webpack-dev-server` with the `--open` flag, which is why we got a new browser tab. It's going to use our `dev-config`.

![image of the screen opening within the browser](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654412/transcript-images/npm-avoid-duplicate-commands-by-calling-one-npm-script-from-another-appopening.png)

We just need to verify that it's passing in that `--hot` flag and everything's still working properly. I'll come in here and I'll make a change to this. We'll just make sure that our browser reflects the change without a full reload.

After I make a change to my local state, we'll save the file. We'll see that our exclamation mark has gone away, but our local state remained the same.

![image of the app change with the state remaining the same](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654415/transcript-images/npm-avoid-duplicate-commands-by-calling-one-npm-script-from-another-hotload.png)

Our `--hot` flag is successfully being passed in, and everything's working as it was before.
