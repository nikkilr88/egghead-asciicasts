Taylor Bell: [00:00] Now that we're done building our blog, we can run `gatsby build`. 

#### Terminal
```
$ gatsby build
```

While this does its thing, we'll come over to GitHub, and we'll create a new repository. We'll copy our `add origin`. Inside of our `myBlog` directory, we have a new `public` directory.

![Github Commands](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805208/transcript-images/gatsby-deploy-a-gatsby-site-with-netlify-github-commands.png)

[00:14] We'll go in there, and we can see that these are all of our built files. 

![Built Files](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224333/transcript-images/gatsby-deploy-a-gatsby-site-with-netlify-built-files.png)

I'm going to initialize an empty Git repository with `git init`, and we'll paste our `remote add origin`, add everything in the directory, do a new `commit`, do a `git push origin master`, and then now, we can see our built files have ended up in GitHub.

```
$ git init
$ git remote add origin git@github.com:taylorbeii/gatsby-demo-blog.git
$ git add .
$ git commit -am "initial commit" 
$ git push origin master
```

[00:33] Now, over Netlify, I've logged in, and I'm going to use the new site from Git, 

![New Site on Netlify](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224330/transcript-images/gatsby-deploy-a-gatsby-site-with-netlify-netlify-new-site.png)

connect to GitHub here, and find our demo blog. Our branch will be `master`. We don't have any build commands or publish directories because we've uploaded it into the route, and clicked the deploy button.

[00:50] After it's done deploying, we can open it in a new tab, and our blog is live.

![blog is live](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805208/transcript-images/gatsby-deploy-a-gatsby-site-with-netlify-blog-is-live.png)