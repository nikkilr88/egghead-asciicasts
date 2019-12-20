Instructor: [00:00] To facilitate building themes, especially multiple themes that interact with each other, we're going to convert our project from it's typical Gatsby site, through Yarn works basis project. We'll make a directory called `www` and move all of the files into it.

#### Terminal
```bash
mkdir www
mv * www/
```

[00:21] If you use move, note that we can't rename www to a folder called www/www because it's a reference to the same folder. Note that all of the other files have moved. We can now remove the `yarn.lock` in the www folder, as well be using one of the root of our project.

```bash
rm www/yarn.lock
```

[00:42] We can also take the `README.md` and put it the root of our project, but it doesn't matter a whole lot. 

```bash
mv www/README.md .
```

This leaves us with a directory that is `README.md` and `www`, which includes our entire project. One thing to note that the `.env.development` file needs to be moved into the `www` folder.

[01:01] We use `ls`, a period, and then hit tab, we can see that the `.env.development` file is still in the root. 

```bash
mv .env.development www/
```

We'll also initialize a new `package.json` in the root of our project with `yarn init -y`. We need to add two fields to our `package.json` in the root of our project.

[01:21] The first field we've added is `private`. The root `package.json` in a yarn workspace's project will never be published, though it needs to have `"private": true`, which will prevent it from being published accidentally.

[01:33] We've also named a couple of workspaces. In this case, any folder inside of the packages directory or the package.json, is a valid package for our yarn workspaces. `www` itself is also a valid package. This is because our Gatsby site is a valid npm package.

#### package.json
```json
{
  ...
  "private": true,
  "workspaces": [
    "package/*",
    "www"
  ]
}
```

[01:50] We'll also go into `www` and rename the `package.json` `name`. This isn't strictly necessary, but it makes it easier for us when we're trying to run commands in the `www` workspace, to have it named as the same thing as the folder that contains it. 

#### www/package.json
```json
{
  "name": "www",
  ...
}
```

To make sure that we're set up correctly, we can run `yarn` in the root of our project.

#### Terminal
```bash
yarn
```

[02:12] Now that we've installed our dependencies again, we can see a `yarn.lock` in the root of our project. We run develop like we did before. We use `yarn workspace`, the name of the workspace -- in this case, `www` -- `develop`, which is the name of the script in the www package.

```bash
yarn workspace www develop
```

[02:38] After reloading the site, we can check the `Blog` to see our posts and check the `SWAG` store to see our Corgis. To recap, what we did is took our original Gatsby site and moved it into the `www` folder. We also set up `www` to work with Yarn workspaces so that we can run Yarn workspace `www` and then the name of a script in `package.json`.

[03:01] The final thing we'll do before moving on to the next less in create a `packages` directory. The packages directory is where we'll put all of our new themes.

```bash
mkdir packages
```
