Just a recap of where we're at. We have this `handleSubmit` function that's going to run whenever someone clicks on this `<TouchableHighlight>` button. What we want this `handleSubmit` button to do is it's going to show a spinner as the data is getting fetched. It's going to get that data and then pass that data to another component or another route, and that data will get rendered, and we'll see that route. So, the very first thing we're going to do is create the external API file.

Let's go to our app folder, create a new folder called `Utils`, and in here, let's create a new file called `api.js`. All this file is going to be is it's going to be an object which has a few methods on it. Those methods are going to use fetch in order to get some information from GitHub.

Let's go ahead and export this. The very first method we're going to make is let's call it `getRepos()`.

####api.js
```javascript
var api = {
    getRepos(){

    }
};

module.exports = api;
```

This method is going to accept the `username` and we're going to format this `username` just a little bit, so let's do `.toLowerCase()` on it as well as `.trim()`. 

```javascript
var api = {
    getRepos(username){
        username = username.toLowerCase().trim();
    }
};
```

Then, let's set up our `url`. Notice that I'm using back ticks for the url, the reason for that is because back ticks allow us to do, or gives us the ability to use an ES6 template at the end of our url. 

```javascript
var api = {
    getRepos(username){
        username = username.toLowerCase().trim();
        var url = `https://api.github.come/users/${}/repos`
    }
};
```

What this allows us to do is, if we throw in `username` in the `{}`, this is the same thing as doing something like this, 

```javascript
var url = "https://api.github.come/users/" + username "+ "/repos"
```

where you're concatenating this string. It's just an easier way and it looks a lot cleaner to do that.

I'm a huge fan of using back ticks in this templating language, or templating ability in ES6, so we're going to use it all over the place in this app.

We are going to `return fetch(url)`, so we'll get a promise returned, and then this `fetch()` invocation is going to return us another promise, which will chain, and we'll get a response, and then we're going to return `res.json()` as we did before.

```javascript
var api = {
    getRepos(username){
        username = username.toLowerCase().trim();
        var url = `https://api.github.come/users/${username}/repos`
        return fetch(url).then((res) => res.json());
    }
};
```

Just one thing that's new here is we're using this ES6 `=>`, we'll get a few benefits from this. For one, we don't have to write `function`, it's less typing.

Another one, we don't have to worry, it doesn't really help us in this use case, but if we were using `this` keyword inside of our function, what usually happens is every time you create a new function and that function gets invoked, that function has its own context. If you use `=>` though, it will keep the context of the parent function, so you don't have to do like `.bind` or any of that crazy stuff.

But we don't really see that here, but we probably will in the future and I'll point that out when we get to it.

Now that we have this `getRepos()` method, let's add another one called `getBio()`. This is going to do a lot of the same thing, so I'm going to just copy `getRepos()`. We have our `username`, we're not going to do `/repos`, but we still have our url, and we're going to `return fetch(url)`, which returns us a promise, `.then` that we can chain, and we'll get a `res` back, and then we'll return another promise.

```javascript
var api = {
    getBio(username){
        username = username.toLowerCase().trim();
        var url = `https://api.github.come/users/${username}`
        return fetch(url).then((res) => res.json());
    },
    getRepos(username){
        username = username.toLowerCase().trim();
        var url = `https://api.github.come/users/${}/repos`
        return fetch(url).then((res) => res.json());
    }
};
```

All right, so there's our API, and it looks pretty good. Now, let's go back to our `Main.js` file. Inside the `handleSubmit()` function is where we're going to want to invoke our `getBio` function.

First, we need to require our API, so we're going to say `var api = require`, we're going to go into `Utils`, and then our `api`. 

####Main.js
```javascript
var api = require('../Utils/api');
```

Now, back down in `handleSubmit()`, we're going to write `api.getBio()`. We're going to pass in `this.state.username`. Remember we set up earlier this `handleChange` function that's updating the state whenever someone types into the input field.

So, when we invoke `getBio`, that's going to return us a promise, `.then` with this `res`, and so this response, ideally it's going to be something that we're getting from GitHub, and it's going to be basically an object with all of the username's property.

```javascript
handleSubmit(){
    this.setState({
        isLoading: true
    });
    api.getBio(this.state.username)
        .then((res) => {

        });
}
```

Then what we're going to do, if we try to look up a username that doesn't exist, then GitHub is going to populate this `.message` property on our response with `'Not found'`.

```javascript
...
.then((res) => {
    if(res.message === 'Not Found'){

    }
});
```

If we find that, what we'll do is we'll set our `state`, and have our `error: 'User not found'`, and then `isloading: false`, `else` what we'll do is we're going to use `this.props.navigator.push`. We're basically pushing a new route onto the stack.

```javascript
...
.then((res) => {
    if(res.message === 'Not Found'){
        this.setstate({
            error: 'User not found',
            isLoading: false
        })
    } else {
        this.props.navigator.push({

        });
    }
});
```

The reason we're able to do `this.props.navagator.push` is because if you remember back in `index.ios.js`, we created this `<NavgatorIOS>` component. What we're going to do is we're going to push this new object, or we're basically just going to change routes.

The `title` of this is going to be `res.name`, or if that person doesn't have a name on GitHub, let's just do `"Select an Option"`. The component we're going to use is a `Dashboard` component which we haven't made yet, but we'll make that in a second. Then the `passProps` we are going to pass to it is `userInfo: res`.

```javascript
...
} else {
    this.props.navigator.push({
        title: res.name || "Select an Option",
        component: Dashboard,
        passProps: {userInfo: res}
    });
}
```

After we do that, we're going to set the state. So if we go back, the state will be nice and clear for us, or nice and reset, `this.setState`. We're going to have `isLoading: false` and an `error: false`, and the `username: ''`.

```javascript
...
} else {
    this.props.navigator.push({
        title: res.name || "Select an Option",
        component: Dashboard,
        passProps: {userInfo: res}
    });
    this.setState({
        isLoading: false,
        error: false,
        username: ''
    })
}
```

This looks great. The only thing we need to do now is make the `Dashboard` component.