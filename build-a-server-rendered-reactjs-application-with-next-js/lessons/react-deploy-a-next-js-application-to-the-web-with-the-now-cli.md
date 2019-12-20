Instructor: [00:00] The first thing we're going to need to do to deploy our application is install the `now` CLI command tool. To do this, we can install it globally via `npm`, and then, we'll have access to the `now` command.

#### Terminal
```bash
npm install -g now
```

[00:14] Before we could deploy our code, we first need to create an optimized build of it. To do this, we'll run the `build` command. 

```bash
npm run build
```

Next will take care of this for us. As a result of the build process, Next is going to generate this `.next` directory for us, where our optimized code is going to live.

[00:39] One of the huge advantages to using Next.js is that it performs automatic code splitting for us. This helps us achieve maximum performance by ensuring that no unnecessary application code is being shipped. Rather, our optimized files only contain the code that they need to be fully functional.

[01:00] Now that we have our optimized build, we need to modify our `scripts` object inside of our `package.json` file. Specifically, we need to modify the `"start"` command so that it runs our application in production.

#### package.json
```javascript
"start": "NODE_ENV=production node server.js"
```

[01:16] Once that's set up, we can navigate back into our terminal and execute the `npm run start` script. Now, if we take a look back into our browser, we'll see that our application is running, but instead of the development version, we're seeing the production-grade version.

[01:35] This isn't really that big of a deal, because we've seen this all along. Let's finish this up and deploy it to a live URL. To do this, we're just going need to use the `now --dotenv` command. Because we're using environment variables through `dotenv`, we're going to need to parse in the `dotenv` flag at the end of our `now` command.

[02:00] If we forget to do this, our application isn't going to know where to get our API keys from, and it's going to end up not working. Now is going to generate a URL for us, and automatically copy it to our clipboard.

[02:13] Once that process is done running, we'll be able to paste this URL directly into our browser, and then load our live application. As you can see, we're no longer operating on local host, but instead this `https://nextjs-course-fjislhgxrv.now.sh/blog` URL we've been given, and our application works all the same, and we're able to navigate the post, and then back to our blogging home again.