A partial application occurs whenever a curried function has some but not all of its function applied. To demonstrate this, we'll create a curried `getFromAPI` function. It'll receive a `baseURL`, an `endpoint`, and a callback, `cb`, to be called once we've received our data from the request.

#### index.js
```js
// Partial Application

const fetch = require('node-fetch')

const getFromAPI = baseURL => endpoint => cb 
```

We'll use node `fetch` to fetch our data. Our URL will be a combination of the `baseURL` and the `endpoint`. We'll turn our response into `JSON`. After that, we'll call our callback on our `data`, and we'll `catch` any `errors` for good measure.

```js
// Partial Application

const fetch = require('node-fetch')

const getFromAPI = baseURL => endpoint => cb 
  fetch(`${baseURL}${endpoint}`)
    .then(res => res.json())
    .then(data => cb(data))
    .catch(err => { 
      console.error(err.message)
    })
```

Now let's partially apply a `baseURL`. One public API we can use is the GitHub API. Now we have a partially applied `getGitHub` function that we can pass different endpoints to. Let's create functions to the `users` endpoint and the `repositories` endpoint.

```js
// Partial Application

const fetch = require('node-fetch')

const getFromAPI = baseURL => endpoint => cb 
  fetch(`${baseURL}${endpoint}`)
    .then(res => res.json())
    .then(data => cb(data))
    .catch(err => { console.error(err.message )})

const getGithub = getFromAPI(
  'https://api.github.com'
)

const getGithubUsers = getGithub('/users')
const getGithubRepos = getGithub('/respositories')
```

Now we have two new functions each that have partially applied the same `baseURL`, but have partially applied different endpoints. The last thing we can supply to them is a callback which will trigger the `fetch`. Let's use the `getGithubUsers` function and supply different callbacks to each one.

```js
getGithubUsers(data => {

})
```

For the first one, let's `log` out the `user.login` names. The main benefit of partial application is our ability to delay the evaluation of a function while still supplying some of the arguments to be stored and reused throughout our application. For the second one, let's `log` out the `user.avatar` URLs. 

```js
getGithubUsers(data => {
  console.log(data.map(user => user.login))
})

getGithubUsers(data => {
  console.log(data.map(user => user.avatar_url))
})
```

You can see we have avatar URLs and we have user names.

![Avatar URLs and user names in Terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554156189/transcript-images/javascript-create-reusable-functions-with-partial-application-in-javascript-user-logins-and-user-avatar-urls-in-terminal.jpg)