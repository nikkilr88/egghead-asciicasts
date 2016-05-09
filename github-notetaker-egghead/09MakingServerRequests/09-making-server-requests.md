Our app is coming together very nicely, but one thing we need to do now is we need to go and **fetch the data** from **github** in order to **populate** both of these components. What we're going to use is this tool called **Axios**. Axios allows us to make **http requests** or network requests in its problem space, so it's really nice. If you're coming from an **Angular** background it's very similar to **$HTTP** in Angular. Head over to your terminal and go ahead and run `npm install axios`.

Now once that is done, let's go ahead and we're going to make a helper file for us that is going to handle our network request. So let's go ahead and make a new folder called `utils`, inside this `utils` folder go ahead and make a file called `helpers.js`. In this file we're going to go ahead and `require Axios`,

### helpers.js
``` javascript
var axios = require('axios');
```

and we're really concerned about two things, we're concerned about **getting** the **users repos**, and getting **their profile**.

So let's go ahead and make two functions, the first one let's called `getRepos`, it takes in a `username` and it's going to return whatever `axios.get` returns us, and we're going to hit this **endpoint** and get that user's repos.

### helpers.js
``` javascript
function getRepos(username){
  return axios.get('https://api.github.com/users/' + username + '/repos');
};
```

So if you're not familiar with promises, don't worry about it too much right now, we'll talk a little bit more about promises here in a little bit. For now, let's just create another function called `getUserInfo` that takes in a username and it's going to return us whatever `axios.get` returns us, and we're going to append `username`.

### helpers.js
``` javascript
function getuserinfo(username){
  return axios.get('https://api.github.com/users/' + username);
};
```

In a nutshell this is how promises work. If I were to invoke the `getRepos` function, let's say I pass in my github username, that's going to return us this **promise** object, OK? This promise object then has a `.then` property on it, and the function that we pass to `.then`, the **callback** function, is going to get invoked whenever this **promise** gets **resolved**.

### helpers.js
``` javascript
var promisObj = getRepos('tylermcginnis');
promisObj.then(function(data){
  console.log(data);
});
```

So basically the way this will work is we call `getRepos`, that returns us a promise that says, "OK, when we go and we **fetch the data** from this **API**, when that data is back, go ahead and **invoke this callback** function and then `console.log(data)`." So it's really convenient, it kind of gets around the idea of having callbacks and callback hell and all that stuff. But the way we're going to use this is actually a little bit more advanced.

We're going to **create** an **object** that we're going to **export**, and a property on this object is going to be called `getGitHubInfo`, because if you think about what we're doing, we basically need both of these **functions** to be **invoked** at the **same time**, and when we get the data back from both of them, when we have the `repos` and when we also have the user information, we then need to **render** the component and show all that **data** to the **view**.

What we're going to do is we're going to use a feature of Axios called `axios.all`. Let's make sure we passed in our `username` here first. All right, so what `axios.all` does is it takes in an array of promises, so let's invoke `getRepos`, and let's also invoke `getUserInfo`.

### helpers.js
``` javascript
var helpers = {
  getGitHubInfo: function(username){
    return axios.all([getRepos(username), getuserinfo(username)])
    .then(function(arr){

    });
  }
};
```

So then what we can do is that will **return** us a **promise** which we pass a callback function to, and now what's going to happen is instead of just waiting for one promise to be resolved and then this function will be invoked, what happens is `axios` will wait for both of these **promises** to be **resolved**, and then it will pass us an **array of data** we got back from both of these invocations.

So it's really convenient because we can **make** these **requests** the **exact same time**, and when both of them are ready, this function will run passing us that array. So let's go ahead from here all we want to do is **return an object** that has a `repos` property and it returns us an array, the very first property in this array is going to be the repository, the **users repositories** because that's the first item in the array that we passed axios, and the second property in this object is going to be **bio** and it's going to be at the first index.

### helpers.js
``` javaScript
.then(function(arr){
  return {
    repos: arr[0].data,
    bio: arr[1].data
  }
});
```

So again, to recap what's going to happen here is when we invoke `getGitHubInfo` we pass it a `username`, we then will invoke `axios.all` and pass it two **promises**. When both of these promises **resolve**, or when this data has gotten back from github, both of these pieces of data, this function's going to run and it's then going to **pass** us back an **object** with our `repos` and with our `bio`.

So now let's go ahead and head over to our `profile` view or profile component and let's utilize this. So let's go ahead first and we're going to require helpers, and I believe we need to go back a folder and then into utils, and then to helpers,

### Profile.js
``` javaScript
var helpers = require('../utils/helpers.js');
```

and then let's go ahead and make it so when this **component mounts**, after it sets up the Firebase stuff, let's go ahead and **invoke** `helpers.getGitHubInfo`.

We're going to pass it the `username` from the **route params** and that will return us a **promise** which we then can pass a function which will get **invoked** when our **data** object is **ready** or when our github data is ready. Once it's ready we can call `this.setstate` and we set the `bio` to the bio object and we set the `repos` property to the repos object.

### Profile.js
``` javaScript
componentDidMount: function(){
  this.ref = new Firebase('https://github-note-taker.firebaseio.com/');
  var childRef = this.ref.child(this.props.params.username);
  this.bindAsArray(childRef, 'notes');

  helpers.getGitHubInfo(this.props.params.username)
    .then(function(data){
      this.setState({
        bio: data.bio,
        repos: data.repos
      })
    }.bind(this))
},
```

All right, so there's one little gotcha in here, if you're familiar with the `this` keyword in JavaScript you already know that `this` keyword is different than `this` keyword, and that sounds a little bit weird, but basically whenever you go **inside** of a **new function** a **new context** is created, and so `this` keyword is going to be a little bit **different** than `this` keyword.

So what we need to do as our goal is to basically make it so `this` keyword is the **same** as `this` keyword because if it's not, then this one isn't going to have a `setState` property. So one trick you can do is here, you can use `.bindThis` and in a nutshell what `.bind` does, it **returns** you a new **function** and you're allowed to **specify the context** of that new function, so all this is doing is it's saying, "Hey, return me a new function with a context, or with the `this` keyword inside of that function referring to this keyword instead of `this` keyword inside of that."

That sounds confusing, I know, but if that's still confusing go ahead and look up how the `this` keyword works and you will be entertained for days. One note really quick about the this keyword, if you're still confused I've made three lessons and they're actually my favorite Egghead lessons I think I've made on the `this` keyword. So if you're still confused go ahead and check out this playlist, and it should help you out a little bit.

All right, so if this worked correctly what's going to happen is when the component mounts it does some Firebase stuff, it goes and gets our github information, gets the data resets the state and changes our bio and our repos property. We can clear these out now too, and then as of React .14 we can no longer just get `JSON` and show it to the view so what we're going to do is instead of just spitting that all in the view, let's go ahead and just `console.log(this.props.repos)` so we can see what that is.

Make sure everything's working, and then same thing in our `userProfile` component let's go ahead and remove `bio` and instead just `console.log('BIO: ',this.props.bio)`. All right, webpack is running, let's see if this works. So we should see here is **two responses**, we also have `propType`, that's fine for now. So `bio.data`, we have all our data and then `repos.data` here are all our repositories.

![Finished](./images/Finished.png)

So now one more thing, let's go ahead and make it so we don't get the whole response object, but we just get the data. So inside of our `helpers` instead of returning just the **first item**, let's go ahead and return the **first item with data** then `.data` here as well. So that should give us just this data properties Check it out, and there we go, there's our `bio` and there are our `repos`.
