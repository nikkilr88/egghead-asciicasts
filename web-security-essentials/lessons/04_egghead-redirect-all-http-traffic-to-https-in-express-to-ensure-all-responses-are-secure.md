Instructor: 0:00 Now we have our site running over HTTPS. You could see if I refresh the page here, the URL's indeed HTTPS and it is transmitting the session ID over HTTPS.

0:11 The problem is if I remove HTTPS from the URL and to leave off the particle of the URL such that I only type in `localhost.childproxy.com` and hit Enter, the site can't be reached. That's because we've added HTTPS without adding back in a redirect from HTTP to HTTPS.

0:32 In order to do that, we can go right back to our application. Right underneath where we're listening already on port 443, `app.listen(port)`, we have to add another express application. We could do this by instantiating another app, say `const readerApp = express()`. Then we'll add some middleware using `readerApp.use` and this takes in a `function`.

0:58 First function's, first parameter's the request, `req`. Second parameter is the response, `res`. What this application needs to do is it needs to return a response that is a `redirect` request to the `https` version of the same URL, taking our domain parameter and appending the request URL to it.

1:21 Then we'll listen on port 80, which is our HTTP port. 

#### index.js
```js
const redirApp = express();
redirApp.use(function(req, res) {
    return res.redirect(`https://${domain}${req.url}`)
});
redirapp.listen(80);
```

If we've done this correctly, when a request comes in on port 80, it will redirect to HTTPS with our domain, which is localhost.charlesproxy.com, followed by the rest of the URL.

1:39 If I now refresh, we can see that it has, indeed, loaded up the HTTPS version of the site. It does this by first hitting the HTTP URL, which sends back a 302 with the location of charlesproxy.com/login, which then instructs the browser to make a second request to the HTTPS version of the page.

2:01 However, we've now introduced another security vulnerability. If you go back to the HTTP request that we've made first, you'll notice that, even though it's a 302, we see that we still transmitted the session ID cookie over HTTP, making it vulnerable to man-in-the-middle attacks. We'll deal with this in the next lesson. 