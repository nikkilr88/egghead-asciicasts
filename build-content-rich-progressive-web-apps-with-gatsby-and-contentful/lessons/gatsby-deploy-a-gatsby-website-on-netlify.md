00:00 In GitHub, let's create a new repository. Here, we will name it `jamstacktutorials`. We can create the repository. Now, let's follow these instructions. Mainly, we'll add this remote.

00:30 Go to the command line. Here, we will paste this. Hit enter.

```bash
git remote add origin git@github.com: Khaledgarbaya/jamstacktutorials.git
```

Now that we have the remote added, let's add everything and commit.

```bash
git add
```
```bash
git commit -m 'initial commit'
```

Now, let's push.

```bash
git push -u origin master
```

00:51 Let's go back to our repository. Refresh. Now, we have all the code in here committed.

![Github Repo created with all the code shown](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/gatsby-deploy-a-gatsby-website-on-netlify-github-repo.png)

Let's go to Netlify. After you log in, this is your main dashboard. You click new site from Git. Here we click GitHub.

![Dashboard in Netlify with mouse hovering new site from git button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/gatsby-deploy-a-gatsby-website-on-netlify-dashboard.png)

01:15 After I am authorized, I can look for the repository that they have. If we type just JAMstack, it will be more than enough.

01:29 This is our repository. You can see here that it's a Gatsby project. It will run this Gatsby build command from my server. Let's deploy the site.

![Deploy Site from github master branch](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190182/transcript-images/gatsby-deploy-a-gatsby-website-on-netlify-deploy-site.png)

You can see the logs. This is our website being built.

![Logs showing the website being built](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/gatsby-deploy-a-gatsby-website-on-netlify-logs.png)

01:55 Now, our site is live. We can click on the preview button. You can see here this is our website.

![Production Site shown with lessons](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190184/transcript-images/gatsby-deploy-a-gatsby-website-on-netlify-site.png)

 We can navigate and go to the lessons and read everything. That's how you deploy your Gatsby website to Netlify.


