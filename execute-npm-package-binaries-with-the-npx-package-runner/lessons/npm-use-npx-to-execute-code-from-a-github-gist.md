[00:02] Npx can actually run code that is stored in a [Github gist](https://gist.github.com/). Let's get started and make one.

[00:08] We'll call our gist `"Run JavaScript in the terminal from a gist with npx."` We'll create an `index.js` file with a shebang pointing to `node`. Then we'll console.log, `"Look, Ma. I'm executing JavaScript from a gist inside the terminal with npx."`

![index.js on gist.github.com](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1560799657/transcript-images/npm-use-npx-to-execute-code-from-a-github-gist-indexjs-on-gist.jpg)

[00:26] Then we'll create a `package.json` file and include a name for our project, `"JS from terminal with npx."` We'll give it a version of `1.00` and point to the `index.js` file from above. 

#### package.json
```
(
  "name": "js-from-terminal-with-npx",
  "version": "1.0.0",
  "bin": "./index.js"
)
```
Now we'll save our new gist and grab the URL from the address bar.

[00:49] If we go over to our terminal and type `npx` followed by the gist URL that we just copied, then wham, the code from the gist will execute. Your gist could be much more complex than just a `console.log`.

![console log output example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1560799657/transcript-images/08_npm-use-npx-to-execute-code-from-a-github-gist-console-log-output.jpg)

[01:01] Here, I have a [gist](http://gist.github.com/elijahmanor/7f9762a4c2296839ad33e33513e88043) that I created previously that exports all the `VS Code` extensions you have installed into a `Markdown` list. The following `JavaScript` code uses the `exec` function from the required `child process` module to execute a `shell` command and return the results as a `string`.

[01:17] At that point, the returned `string` is split into an `array`. Empty lines are filtered out. The remaining items are mapped into `Markdown`. Then the `array` is joined back together. Finally, the results are console.logged at the end.

[01:31] As before, if we grab the URL and come over to our terminal, we can `npx` and paste our URL. Voila, here is a list of our installed `VS Code` extensions. I could come back in and pipe the results to `pbcopy` to store that in my copy/paste buffer and open up a `Markdown` editor.

[01:51] Here, I'm using `Macdown` to verify that sure enough the content is valid `Markdown`. Here on the right, you could see the list of extensions I have installed.

![markdown file example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1560799658/transcript-images/08_npm-use-npx-to-execute-code-from-a-github-gist-markdown-file-example.jpg)

[02:02] Keep in mind, if you're using a gist URL to run via `npx`, you need to trust the source you're about to run in case there is any malicious code. Other than that, it's pretty cool.