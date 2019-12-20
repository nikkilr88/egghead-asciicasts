Instructor: [0:00] To publish our package on the npm registry, the first thing we're going to do is log in. We're going to run npm login. **You'll need to log in with the credentials from your npm registry account.** If you don't have one, you can go to npmjs.com and click on join to create a free account.

[0:16] You want to type in your username, your password, and your email that's associated with your account. If all is successful, you'll see logged in as your username on registry.npmjs.org. **Since we already have the prepared scripts in place, we don't need to run yarn build because npm will automatically run it when we run npm publish.**

[0:36] Now what we'll do is run npm publish. You'll see that it's automatically found our prepared script. I'll fast forward through this. **You'll notice that it ran our post publish git push --tags**. Great. Now if we head over to the npm website, click on your avatar, click on packages, you should see your package. There it is, published a few seconds ago.

[0:59] Just like we said in the last video, **The docs on usage on the npmjs site are generated from the README.** It has a link to the repository and it will show your avatar under collaborators. That's all you need to do to publish your custom React hook as an npm package.
