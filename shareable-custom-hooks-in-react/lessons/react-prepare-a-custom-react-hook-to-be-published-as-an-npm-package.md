## Essential Questions

- What scripts are run when you publish a package to npm?

---

Instructor: [00:00] To prepare a custom hook to be published as an npm package, we're going to walk through a few things we need to do, **the first of which is make a few changes in the package.json.** **We'll start with the version key.** You'll notice that, right now, it says 1.00 That's because that's how the boilerplate set it up for us.

[00:17] However, we're going to change that to 000The reason that we're doing that is because, instead of manually bumping the version, **we're going to use an npm CLI command called npm-version.** Npm version is a handy utility provided by the npm CLI to bump a package version.

[00:35] You're probably wondering, "What's the point of using a CLI tool to bump a version? Can't you just do it manually?" You could, but you'll notice here it says, "**If run in a git repo, it will create a version commit in tag,**" and that's what we want.

[00:49] You'll notice the npm version takes one argument of new version, which can be any of the following. **It'll automatically update the package.json, the package-lock.json, and if you have it in in npm-shrinkwrap.**

[01:01] Before we can use the npm version command, we need to make sure that we have a clean git working directory. I'm going to commit this change we made to the package.json. Now let's go ahead and run npm version major. You'll notice that it printed the version, and it updated it in our package.json as it said it would. If we run git tag, we'll see that we have a new commit tagged, v1.00The next thing we're going to do is take a look at the scripts section. **One thing I want to point out is a script that was set up by the boilerplate called prepare. What it does is it runs this command before it goes through with the npm publish.**

[01:39] What happens is **we run npm publish. The npm CLI checks your scripts. It looks for a prepare script. If it sees one, it'll run this before publishing your package.** In our case, it's running yarn builds, which builds our project using rollup. This is handy because it prevents you from accidentally making changes and forgetting to run yarn build before publishing your package.

[02:01] We're going to add in one more script at the bottom. We're going to add the script postpublish. What it's going to do is run git push --tags. **As you can imagine, this will run after the publish command has finished.** We add this because we're going to use the npm version CLI to bump the version, which will create a new tag. **Then when we run publish, after it's done, it will push our tags to version control.**

```js
"scripts": {
  "test": "cross-env CI=1 react-scripts test --env=jsdom",
  "test:watch": "react-scripts test --env=jsdom",
  "build": "rollup -c",
  "start": "rollup -c -w",
  "prepare": "yarn run build",
  "predeploy": "cd example && yarn install && yarn run build",
  "deploy": "gh-pages -d example/build",
  "postpublish": "git push --tags"
},
```

[02:28] Another change we'll make is here in the peer dependencies. **The peer dependencies are the packages that are required by our package in order to make sure it works properly.** Since our package is a custom React hook, we want to make sure that the user has React in their project.

```js
"peerDependencies": {
    "react": ">=16.8.6"
},
```

[02:44] We don't necessarily need this exact version so we're going to change this and instead, use the "greater than or equal to" which says, "Hey, we want a version that's greater than or equal to 16.8.6." The last thing we'll do in our package.json, scroll down to the bottom. We're going to **add a new key called publish.config.**

[03:05] It's going to have a **key called access = public**, with a lowercase p. **The reason that we add this in is because there's two types of packages. There are public packages and private packages.** Private packages are a paid feature of the npm registry. By default, scoped packages, so ones that start with the "and" sign in the username are private by default.

```js
"publishConfig": {
  "access": "public"
}
```

[03:31] We need to tell nmp, "Hey, this is a public package." We do that by adding this in. That's all for the package.json. The last thing we're going to do is update our README that's at the root. You'll notice that the boilerplate filled out most of this for us. The one section that needs to be updated is the usage section.

[03:49] You'll notice that it still has the boilerplate code from when we initialized the project. What we're going to do is go inside the act.js inside of example/source. We're going to copy this and paste it in in this JSX block. **This is important because after we publish the package, npm will look at the root and use the README on the package detail page.**

[04:12] That's all you need to do to prepare your package to be published on npm.
