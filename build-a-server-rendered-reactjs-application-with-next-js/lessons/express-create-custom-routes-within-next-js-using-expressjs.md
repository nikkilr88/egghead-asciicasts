Instructor: [00:00] At the moment, we have these card components being rendered to the page for us, but not much else is going on. Our goal is to have these buttons to take us to each post. To do this, we're going to set up a custom server configuration within Next. This code is going to live inside of a `server.js` file.

[00:20] In here, we see that I've already imported `express` as well as `next`. 

####  server.js
```javascript
const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare().then(() => {

});
```

All the code for our server is going to live inside of this `app.prepare` wrapper function. This is so we can still utilize all of Next's awesome features during development, even though we're no longer using the built-in server. Inside this `app.prepare` statement, we can create a `server` constant and set it to the value of our Express instance.

```javascript
const server = express();
```

[00:47] From there, we can then use this `server` variable to define routes within our application. The first route I'm going to define is the blog route. At the moment, our application is rendering when there's no appending text to our URL. I'm going to change this so that this `'/blog'` route will load the code inside of the `index.js` file in our pages directory.

[01:12] To successfully do this, I'm making a `get` `req` to that blog route, and then passing in our `req` and `res` objects so it can handle this. 

```javascript
server.get('/blog', (req, res) => app.render(req, res, '/'));
```

Following this, we can call `app.render` and pass in our `req` and `res` objects along with the template that we want to render, which as we know, is this `index.js` file.

[01:36] To ensure that users are taken to this new blog URL, I'm going to set up this URL `redirect` to enforce that any users navigating to the old index route will be taken to the `/blog` route. 

```javascript
server.get('/', (req, res) => res.redirect(301, '/blog'));

```

The last route we're going to set up is going to use that `handle` constant to find the top of the page. By using an asterisk. `*`, we're setting up a wildcard route.

[02:03] This will ensure that our application handles any and all requests that are made to our server. 

```javascript
server.get('/*', (req, res) => handle(req, res));
```

Now that our routes are set up, we need to do one last thing and set up our `server.listen` method so that our application listens on our specified `port`, which in this case is `3,000`. 

```javascript
app.prepare().then(() => {
    const server = express();

    server.get('/blog', (req, res) => app.render(req, res, '/'));

    server.get('/', (req, res) => res.redirect(301, '/blog'));

    server.get('/*', (req, res) => handle(req, res));

    server.listen(port, err => {
        if(err) throw err
        console.log(`> Read on Http://localhost:${port}`)
    });
})
```

Now, we can move forward and go into our `package.json` file, where we're going to modify our `scripts` objects.

[02:32] Now at the moment, we're using Next internal command when we run `npm run dev`. We need to modify this so it runs that server file that we just set up. 

#### package.json
```javascript
"dev": "node server.js"
```

One thing to keep in mind is that whenever we make any changes to our custom server configuration, we're going to need to manually restart Next.

[02:54] Now that we've got that out of the way, we can run `npm run dev` and see our custom server running for us. 

[03:25] Now if we visit our application, we should see our home page being rendered for us on this blog route. Inside here, we have cards that we set up for each blog post.