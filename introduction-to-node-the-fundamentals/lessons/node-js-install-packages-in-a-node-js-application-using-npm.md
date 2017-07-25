Node has one of the fastest growing registries of user-contributed packages. It's worth taking a little time to learn how to access and install these packages and take advantage of the codes being written by others. Npm is the default package manager for node. That's how you're going to get the packages installed. You can search and find modules to use via NPM using the npm website, npmjs.com. You can also use Google as well.

When you're choosing a module, you're going to be searching by keywords or phrases. You're going to find several that seem to meet your needs. Like all things open-source, you need to do a little bit of research to choose a stable module.

Here on the npmjs website, we're going to take a look at the express package real quick. Some of the things you want to look for whenever you're getting ready to choose a package are the current version, what version is this package on, as well as the number of downloads that the package has had. You're going to want to check the build status to see that it has passing builds and the code coverage.

We scroll down a little bit further. We can get some more detailed stats as far as downloads in the last day, week, and month. Another key thing to look at is the number of open issue on GitHub and a number of poor requests on GitHub. All of these are going to give you an indication of how strongly supported this package is. If you still have questions or concerns, just check out the GitHub link for that project.

In here, you can see whether or not the package is being updated frequently. You can also get an idea of how many contributors there are, how many releases they've had. If you take a look at the issues, you can get an idea through looking at the issues of how active the community supporting this package is.

Once you've chosen the package you want to install, you're going to install it using the npm install. A big source of confusion for a lot of people is whether or not to include the -g flag. The -g flag is going to install this package globally. If you do an npm install without the -g, it's going to get installed in the local node modules for your application. If you install it with a -g flag, it's going to install that module globally.

Knowing whether or not to use the -g flag can really be summarized with two simple rules. Install it locally if you're going to require this package using a require statement in your application. Install it globally if you're going to be using it from the command line, and that's something like Mocha or Grant.

Let's use npm to install a package called colors. We're going to include the save flag on there. Once the installation is completed, if we look in the node modules folder, we see that colors is there. Now, that save flag works inside of our package.json file.

What it does is it creates this dependencies section in the file and then it adds the colors package to it. That works so that anyone else who uses your application or develops against your application has a complete list of the dependencies that you've built against.

If we also want to install the testing framework, Mocha, we can do that. We can use -save. We can also use save-dev. Once the installation is completed, if we look in the node modules folder again, we see that Mocha has been installed there. If we go back inside of our package.json file, we scroll down here a little bit, you can see it that it has added a dev dependency section and listed Mocha as a dev dependency.

The reason you would want to do that is Mocha is your testing framework so when you push this code out to your production, there's absolutely no reason to have Mocha on your production servers. When you share this with other developers who are going to build functionality into your app, you want them to use the same test framework as you. You've listed it as a development dependency.

One other thing you'll notice here is that in addition to the name of the package, the version that we installed is also listed. We installed Mocha version 2.2.5. It's also got this little caret in front of it. What that caret does is it works as a wild card character that allows us some flexibility in which version gets installed. For the caret, the caret gives you a wildcard match on the minor version level.

In Semantic Versioning, this is your major version. This is your minor version. This is your patch level. Using the caret, it substitutes a wildcard for the minor version. Anytime anyone installs your application, they're going to get Mocha, but they can get anything within the two version 2 series of Mocha. They can get 2.2. They can get 2.3, 2.4, anything up to but not including version 3.0.

The other character that you'll see here is the tilde character. The tilde acts as a wildcard for the patch level. If you specify the tilde whenever someone runs an npm install against your package, they can get version 2.2.5, 2.2.6, all the way up to but not including version 2.3.

Those are pretty safe defaults because if you're using a Semantic Versioning system, any changes or updates against the minor or the patch level generally won't break compatibility. Most developers, if they do anything that breaks compatibility with the prior version will bump the major version number.

There's another wildcard you can use here. That's the star. It does exactly what you think it might do. It allows npm to install the latest version no matter what that version might be. If you have built your package or your application here against Mocha version 1.0 and the current version is Mocha 5.0 and you've specified star as your wildcard in here, anyone who runs npm install is going to get version 5.

You can almost guarantee that between major version changes, there's going to be some breaking changes. It's just going to cause you grief and heartache. I really recommend that you avoid using the star wildcard here.

We can also use GitHub as our source for our packages. If we've used the package Winston and we want to use GitHub as the source for that, we can use a Git url. You'd specify the url to the repo and then a pound sign and the branch that you want to be downloaded. In this case, we would get Winston from the master branch.

You can also get the Git packages from https so we could specify github.com and then the path to the repo. Specify that we want the tarball and then include the branch that you want to get there.