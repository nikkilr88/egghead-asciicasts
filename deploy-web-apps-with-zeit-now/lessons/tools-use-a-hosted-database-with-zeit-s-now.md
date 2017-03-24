A lot of times when people start playing with **Now** and getting excited about deploying their applications, there comes this crucial moment. They're like, "This is awesome. Where do I put my database?"

That's actually a little bit tricky because this is all your Now stuff gets served up on servers that are abstracted out from under you. You can't run a local **MySQL** database the way you might be doing if you were running your own, say, like a Lamp Stack.

There's no **Mongo** instance that's running concurrently with your server because you don't have access to the server. Right now, what the Now team has been recommending to people is that they use a third party database, like just a hosted database solution.

One way to do that is to use a company called **mLab** over here, [mlab.com](https://mlab.com/home). They actually offer a free MongoDB database for 500 megabytes or less. This is great. We can play with this. I just created a new account. I'm going to create a new database.

![New Database](../images/tools-use-a-hosted-database-with-zeit-s-now-new-database.png)

I'm going to make a Single-node database Sandbox. This is free. This costs me nothing.

![Single-node](../images/tools-use-a-hosted-database-with-zeit-s-now-single-node.png)

My database name is going to be `egghead-now-lesson`. My price per month is zero. I'm going to go ahead and create that. The only thing we have to make sure we do is create a user. We're going to create a user. Username's going to be `egghead`. Password's going to be `egghead`.

![Create User](../images/tools-use-a-hosted-database-with-zeit-s-now-create-user.png)

I'm going to delete this before I publish this so you can't steal my database. Then we're going to use MongoDB. There's a MongoDB driver we can install for **Node**. This is what we care about here, this connection string.

```
mongodb://<dbuser>:<dbpassword>@ds145997.mlab.com:45997/egghead-now-lesson
```

![Connection String](../images/tools-use-a-hosted-database-with-zeit-s-now-connection-string.png)

Let's go to our application. Let's do `npm install --save mongodb`. Then let's do `touch database.js`. Here's the functionality that we're going to add to our application. Every time somebody goes to the root URL here and gets the greeting and the timestamp, we're going to write that into the database.

####index.js
```javascript
var express = require('express');
var app = express();

var getGreeting = require("./getGreeting");
var getDate = require('./getDate');

app.get('/', (req, res) => {
    res.send('<h1>${getGreeting()}</h1>
        <h2>The current time is: $getDate{}!</h2>
        <p>This is a new paragraph of content!</p>');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});
```

Then we're going to count up the total number of times that's happened and include that number in our result. Here's how we're going to do it. First, we're going to here to `database.js`. I've got over here some code pre-written that's going to make this work.

Let's just step through it. We're going to import the `MongoClient` from `"mongodb"`. Then we're going to read the `MONGO_USER` and `MONGO_PW` from our environment. The URL string then is going to be new based on the one I just created.

####database.js
```javascript
var MongoClient = require("mongodb").MongoClient;
var username = process.env.MONGO_USER;
var password = process.env.MONGO_PW;
var url = 'mongodb://${username}:${password}@ds145997.mlab.com:45997/egghead-now-lesson'
```

You with me so far? This is all just bootstrap Mongo configuration. Then we're going to write a function which is going to be our primary interaction with the database.

In this function, this is the way Mongo works if you've never used it, you're going to write these functions which perform operations on your behalf. They get the database injected into them as well as any arguments that you're going to take.

In the database, we're going to look up or create the `collection` called `'visits'` Then we're going to insert an object. That object is just going to say here's the `greeting` that I used and here's the `timestamp`. The second argument it takes is a callback which checks to see if there was an error writing it and, if not, performs some other operations.

Here we're just going to take the `'visits'` collection that we just mutated. We're going to `count` it and then that returns a promise. Then we call `.then`, then that gets us our actual count. Then we call the `callback` that was passed in all the way at the top.

####database.js
```javascript
var logRequest = function(greeting, timestamp, db, callback) {
    db.collection('visits')
        .insertOne({
            greeting: gretting,
            timestamp: timestamp
        }, (err, result) => {
            if (err) { return callback(err); }
            db.collection('visits')
                .count()
                .then(function(visits) {
                    callback(null, visits);
                });
        });
}
```

It's a lot going on there. If you're not 100 percent up to speed on this, don't worry about it. The important things is we now have a function. `module.exports` has a function called `logRequest` which takes a `greeting`, a `timestamp`, and a callback / `cb`.

####database.js
```javascript
module.exports = {
    logRequest: function(greeting, timestamp, cb) {
        MongoClient.connect(url, function(err, db) {
            logRequest(greeting, timestamp, db, function(err, result) {
                db.close();
                cb(err, result);
            });
        });
    }
};
```

Let's go over to our `index.js`. Let's say `var database = require("./database");`. Now every time that comes in, first thing we need to do, let's abstract out our calls to `getGreeting` and `getDate`. `var greeting = getGreeting();`, `var date = getDate();`, and then this'll just take the variable.

####index.js
```javascript
var express = require('express');
var app = express();

var getGreeting = require("./getGreeting");
var getDate = require('./getDate');
var database = require("./database");

app.get('/', (req, res) => {
    var greeting = getGreeting();
    var date = getDate();
    res.send('<h1>${greeting}</h1>
        <h2>The current time is: ${date}!</h2>
        <p>This is a new paragraph of content!</p>');
});
```

What we want to do is say `database.logRequest()`, we're going to give it the `greeting`, the `date`, and then a function. Going to stick this inside of our callback function here. The result of this callback function's actually going to be a `count` of the length of that visits collection, so let's call that `count`

Let's make a quick update to our copy. That's going to say `"<p>There have been ${count} visits to this page.</p>"`. I think that should do it if I haven't typoed anything too egregiously.

####index.js
```javascript
var express = require('express');
var app = express();

var getGreeting = require("./getGreeting");
var getDate = require('./getDate');
var database = require("./database");

app.get('/', (req, res) => {
    var greeting = getGreeting();
    var date = getDate();
    database.logRequest(greeting, date, (err, count) => {
        res.send('<h1>${greeting}</h1>
            <h2>The current time is: ${date}!</h2>
            <p>There have been ${count} visits to this page.</p>');
    });    
});
```

Let's go ahead and run it locally first. Got to make sure we get these environment variables named correctly first.

`MONGO_USER=egghead MONGO_PW=egghead GREETING=hi NAME=egghead node index.js`. Let's see if that all worked. Let's go here `localhost:3000`. Cool. We got our greeting in here, `hi, egghead!!` You can see there have been two visits to this page.

![Hi Egghead Local](../images/tools-use-a-hosted-database-with-zeit-s-now-hi-egghead-local.png)

I'm going to refresh and now there's `3`, `4`, `5`, etc. This keeps going up. Great. We've got our database working locally. How do we use it remotely? This is actually super simple because remember we configured all of this to run using environment variables.

All that means is that we need to go over here into `package.json`. When we deploy, we need to add two more arguments here. We've got `GREETING` and we've got `NAME`. What we need now is `-e MONGO_USER=@mongouser -e MONGO_PW=@mongopw`.

####package.json
```json
"scripts": {
    "start": "node index.js",
    "now-start": "node index.js",
    "build": "echo 'BUILD STEP GOES HERE'",
    "now-build": "echo 'NOW BUILD STEP WENT HERE!",
    "deploy": "now -e GREETING=@greeting -e NAME=@name -e MONGO_USER=@mongouser -e MONGO_PW=@mongopw"
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

We still have to create those two secrets. We say `now secret add mongouser egghead` and `now secret add mongopw egghead`. Those secrets are in place. Let's go ahead and `now secret add greeting HIYA`. I think I have already added this.

Yes, so `now secret remove greeting`. Just to change up our greetings. `now secret remove name`, `now secret add greeting HIYA`, and `now secret add name FRIEND`. We've got our `greeting`. We've got our `name`. We've got our `MONGO_USER`. We've got our `MONGO_PW`.

All that's left to do now is to run `npm run deploy`. Now we're deploying. We've got our URL. There we go. `https://zeit-now-egghead-kcppnvrzxw.now.sh`

Now we're live on the Web. There have been six visits to this page because, remember, we're using a hosted database. This is not storing anything locally. This gets written out to the database that's hosted by mLab.

![Hosted Webpage](../images/tools-use-a-hosted-database-with-zeit-s-now-hosted-webpage.png)

If we go over here to our `mlab.com` database, we should be able to see collections. Let's refresh this page. There we go. We've got a collection called visits with six documents. You can see first five documents here all say, `"hi, egghead!!"` The last one says, `"HIYA, FRIEND!!"` The timestamps all vary.

![Collection](../images/tools-use-a-hosted-database-with-zeit-s-nowtools-use-a-hosted-database-with-zeit-s-now-collection.png)

That should get you started. That's how you use a remote hosted database with a Node.js application running on Now.