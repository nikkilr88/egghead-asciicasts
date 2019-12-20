Instructor: [00:00] Let's remove this hard-coded list of `restaurants` and add a `componentDidMount` lifecycle method, where we want to make an HTTP call. We can use `fetch` in React Native just like on the web. I'll make a call to a small local server that I have running that will return a list of restaurants.

#### App.js
```javascript
componentDidMount() {
    fetch('http://localhost:3000/restaurants')
}
```

[00:19] On the iOS simulator, I can use `localhost`, but on the Android emulator, it has its own IP address, so `localhost` will not refer to my PC. Instead of `localhost` here, you will need your computer's IP address on your local network.

[00:33] The restaurant's return is JSON, so just like on the web, we have to parse that response as JSON. Then we can use the result. In this case, that means by setting local state.

[00:45] Let's make sure that `state` starts as an empty array. Then we can use the `state`, instead of the old hard-coded list, as the data for `FlatList`.

```javascript
state = {
    search: null,
    restaurants: []
}

componentDidMount() {
    fetch('http://localhost:3000/restaurants')
      .then(response => response.json())
      .then(result => this.setState({ restaurants: result}))
}

<FlatList
  data = {
    this.state.restaurants.filter(place => {
      return !this.state.search ||
        place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
    })
  }
```

[00:55] When we reload that, we see the HTTP call being made and then the list of `restaurants` pop into place. `fetch` is built in and works great in most cases, but you may want an additional option. In particular, I've had trouble with how fetch handles cookies on React Native.

[01:12] Let's `npm install axios`, which is an alternative to `fetch`. We can `import axios from 'axios'` and use it instead of fetch to make an HTTP request. 

axios parses the response as JSON by default, so we don't need to parse the results anymore. The result comes back as an object. To get the restaurants here, we'll have to access the `data` key on that object.

```javascript
componentDidMount() {
  axios.get('http://localhost:3000/restaurants')
    .then(result => this.setState({ restaurants: result.data }))
}
```

[01:39] When we reload now, we're using Axios to do the HTTP get request.
