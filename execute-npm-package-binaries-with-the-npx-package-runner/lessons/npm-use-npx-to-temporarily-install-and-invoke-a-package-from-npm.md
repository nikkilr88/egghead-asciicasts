[00:01] I want to create a new `React` app, but I don't have it installed globally. We could show this by trying it, and sure enough, the command is not found. 

#### Terminal
```
create-react-app
```

We could also verify with `NPM` that it's not listed globally, with the `npm ls create-react-app -- global`.

```
npm ls create-react-app --global
```

[00:18] Nope, it's not there. Finally, we could prove that we don't have it installed in a local `Node` module with `npm ls create-react-app`. Again, it's not installed. 

```
npm ls create-react-app
```

Instead of installing `create-react-app` globally, we could use `npx` instead to temporarily install the package from `npx` and execute it.

[00:40] Let's create a playground `React` application by typing `npx create-react-app playground`. 

```
npx create-react-app playground
```

At this point, the latest version of the `create-react-app` is temporarily downloaded. Then it starts to generate the structure of our new `React` app, and installs all of its necessary dependencies.

[00:59] Now, we could change directories to our new app and type `npm start`, and it'll kick up a dev server. 

```
npm start
```

Voila, our new web app is running on localhost. 

![react example website](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1560799657/transcript-images/npm-use-npx-to-temporarily-install-and-invoke-a-package-from-npm-react-example-webpage.jpg)

Using `NPX` in this way can be very handy if you'd rather not keep programs installed globally, or if you use them so infrequently that you'd rather just use the latest version whenever you need them.

[01:21] Also, it could be handy if you just want to play around with some new tools or ideas before committing to them. For example, let's take a look at `devpun`. We don't have it installed, but we could start using it with `npx devpun`.

[01:35] We'll go ahead and pass `-t react` to filter jokes related to `React`. 

```
npx devpun -t react
```

Now, we see a joke, even though we don't have `devpun` installed globally. 

![devpun example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1560799657/transcript-images/03-npm-use-npx-to-temporarily-install-and-invoke-a-package-from-npm-devpun-example.jpg)

However, let's continue to play around. Let's pipe the input of `devpun` to `cowsay`, with the Vader Cow file.

```
npx devpun -t react | npx cowsay -f vader
```
![cowsay example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1560799658/transcript-images/03-npm-use-npx-to-temporarily-install-and-invoke-a-package-from-npm-cowsay-example.jpg)

[01:52] Now, things are getting interesting. Let's continue to play around a bit, and this time, pipe the output to `lolcat.js`. Wow, colorful. 

```
npx devpun -t react | npx cowsay -f vader | npx lolcatjs
```
![lolcatjs example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1560799657/transcript-images/03-npm-use-npx-to-temporarily-install-and-invoke-a-package-from-npm-lolcatjs-example.jpg)

Using `NPX`, we're able to play around and experiment with various `Node` modules without even installing them globally. Pretty cool.
