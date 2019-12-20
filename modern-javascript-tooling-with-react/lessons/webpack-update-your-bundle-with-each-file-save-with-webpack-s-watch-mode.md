Right now, if I want to make a change to this file and see it reflected in my web application, I need to make my change, save my file. Then I have to go into my terminal, `npm run build` to run a webpack build. Once that build is complete, I have to come back to my webpage and refresh and see if my changes worked.

We can run webpack in watch mode so that every time we save a file, it'll automatically rebuild so that we can save ourselves the trouble of going into the terminal to run the build ourselves.

To do that, I'm going to open up the `package.json` file. Right after the `build` script, I'm going to add a second script called `dev`. `dev` is going to also run webpack, but this time I'm going to pass in the `watch` flag.

#### package.json
```javascript
"scripts": {
    "build": "webpack",
    "dev": "webpack --watch ",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```


I'd also like this `dev` script to optimize my builds for build speed during development. I'm going to come back in here. I'm also going to add the `mode` flag. I'm going to set that to `development`.

```javascript
"scripts": {
    "build": "webpack",
    "dev": "webpack --watch --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
Now I'm going to save our `package.json`. In the terminal, I'm going to run `npm run dev`. We'll see as part of the output, it'll tell us that webpack is watching the files. 

![Watch Mode](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/webpack-update-your-bundle-with-each-file-save-with-webpack-s-watch-mode-watch.png)

Then we have our initial build output. If I come into `App.js` here and I make some changes -- I'll capitalize that, I'm going to save that -- we'll see in the terminal that it's done and rebuilt.

If I switch to my browser and I refresh, we'll see that our updates are reflected. When I'm done with watch mode, I can hit 'Ctrl-C' in the terminal to quit that process.
