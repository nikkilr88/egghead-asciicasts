The first thing we need to do is create our user on the npm registry, so we'll do npm add user. I'm going to specify my username, a password, and then my email address. If you'd like to confirm that your user account's been created, you can go to npmjs.com/~ and then the username that you selected.

There are actually two requirements to publish a package to the npm registry. If we take a look inside of our package.json file, the first requirement is that the package has a name. The second is that it has a version number.

So we've met both of those requirements, so we're ready to publish. We'll publish our module with the npm publish command, and if we want to verify that it was published we can go back to the npmjs.com website, reload the page, and you can see under my profile here that say hello world version 1.0 has been uploaded.

This also means that people are able to download it from the registry and install your package using npm install and the name of your package. Say hello world version 1.0 was installed.

If we make a change to our package, we can change this to say hello world from the npm registry. If we want to publish those changes to the npm registry, we get an error, because you can't overwrite the previously published version, which is why the version number is a required field.

We can run npm version patch, and that's going to bump our version from 1.0.0 to 1.0.1. With the npm version command you can supply patch, minor, and major as arguments, and it will bump the appropriate version number. Now let's try to publish that again, and we get confirmation that say hello world version 1.0.1 has been published.

If we run our npm install command again over here, you can see the updated version was installed. Then finally we can look on the npm registry site itself, refresh that page, and you can see that say hello world version 1.0.1 is live in the registry.

The last thing we want to do is clean this package out of the npm registry because it really serves no purpose and doesn't add any value to it. We can do an npm unpublish say hello world.

You're going to notice here that because we have different versions of it, it's going to request that we unpublish it version by version. Or, in this case, because we know that there's nothing out there in the wild that's using this for dependencies, we can actually just do npm unpublish say hello world with the --force flag, and it'll remove it from the registry forcibly.