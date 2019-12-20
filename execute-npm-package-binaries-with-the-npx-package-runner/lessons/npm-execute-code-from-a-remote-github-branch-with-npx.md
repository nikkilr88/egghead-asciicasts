[00:01] I have a `cli` package on `npm` called `elijahmanor` that prints out information about myself. It's like a really geeky digital business card. Anyway, if I run `elijahmanor`, you'll notice that I don't have it installed globally.

[00:15] I can temporarily install it and run it with `npx elijahmanor`. 

```
npx ElijahManor
```

However, the output is somewhat boring. It's just `json` written to the console. Let's go to our local repo, and navigate to `GitHub` with `npm repo`, where you'll see that I've been working on a separate branch called `interactive` that I'd like to run locally with `npx`.

```
npm repo
```

[00:42] `Npx` will recognize repos from `GitHub`, and you even execute individual branches. If I type `npx elijahmanor/elijahmanor#interactive`, it'll now temporarily download my branch, and run it locally. 

```
npx elijahmanor/elijahmanor#interactive
```

As you could tell, this version looks a bit more interesting, and you could interact with the options in order to visit various URLs, like my Twitter, for example.

![CLI example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1560799657/transcript-images/07-npm-execute-code-from-a-remote-github-branch-with-npx-CLI-example.jpg)

[01:07] Since I had the repo cloned locally on my computer, I could have run the project from that directory. Using `npx`, I could run this experimental branch on any computer, even if the code wasn't already on that machine. Pretty cool.
