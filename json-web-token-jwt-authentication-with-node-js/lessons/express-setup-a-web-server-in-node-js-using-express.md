Instructor: 00:00 To build your first Express server, the first thing you need to do is to `require express`. 

#### index.js
```javascript
const express = require("express");
```

In order for your code to be able to use it, you need to `install` it using `npm`. 

#### Terminal
```bash
$ npm install express
```

We can open a terminal to `npm install express`, and all the files should be included now.


00:16 We'll go back to our code. We'll declare a new `constant app` which will use the `express` library that we've just included. We'll also declare a new `constant` for the `PORT` number. We'll use `8888` for now.

#### index.js
```javascript
const app = express();
const PORT = 8888;
```

00:30 Then we can do our first `route`. We'll use `app.get`, and we'll specify the name of the `route`. In this case, we're using `status`, and it takes a callback which has a `request` and a `response` as parameters.

00:44 For this `route`, we will return to `localTime`. We'll start by declaring the `localTime` in a `constant`. We'll just use a `new Date`, and we'll use the `.toLocalTimeString`.

00:57 Now we can start building our `response`. We'll give it a `status` of `200`, which is a success code. We'll `send` simply a `string` which says, `Server time is`, and we'll use the `localTime` which we've just defined.

```javascript
app.get("/status", (req, res) => {
    const localTime = (new Date()).toLocaleTimeString();

    res
    .status(200)
    .send(`Server time is ${localTime}.`);
});
```

01:13 Let's also add a `catchall route`. We'll just use `star`, which means any route that wasn't defined already.

01:19 It also takes a `callback` with a `request` and `response`. We can build our `response` here, and it will simply sense that as `404`, or page not found.

```javascript
app.get("*", (req, res) => {
    res.sendStatus(404);
});
```

01:30 Finally, we'll use `app.listen` to initialize our server. It'll take a `PORT` -- which we've defined earlier -- as a parameter, and a callback for on success.

01:42 We'll simply say `Server is running on port`, and we'll specify the `PORT` number here. You now have your first express server.

```javascript
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
```

01:53 If we go back to our terminal, we can start the server by using Node. We've got our server running.

02:02 Now if we go through our browser window, we can type in the `localhost:8888`. We'll get a page not found because that route was not defined.

02:10 We can use `/status` to get the server time, and any other page will give us a 404 error. That's it. You've got your first Express server up and running.