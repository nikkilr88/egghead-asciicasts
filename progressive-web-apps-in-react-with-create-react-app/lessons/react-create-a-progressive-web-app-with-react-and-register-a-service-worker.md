Create a new app with `create-react-app todo-pwa`. 

#### Terminal
```bash
$ create-react-app todo-pwa
```

Then `cd todo-pwa` into the new directory and start the app with `yarn start`, which will automatically bring up the app in a new web browser.

```bash
$ cd todo-pwa
$ yarn start
```
![image of the app up on the browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541503/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-app.png)

I have a basic web server prepared, which includes a simple express app that can serve a list of to-do items, allows you to make a new item and also to delete an item from the list. That is running on localhost port 4567.

#### server.js
```js
const express = require('express')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')

const app = express()
const port = 4567

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods", 
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let items = [
  { id: uuidv4(), item: 'Learn about PWAs' },
  { id: uuidv4(), item: 'Make an awesome app' }
]

app.get('/items.json', (req, res) => {
  res.json(items)
})

app.post('/items.json', (req, res) => {
  items.push({
    id: uuidv4(),
    item: req.body.item
  })
  res.json(items)
})

app.delete('/items.json', (req, res) => {
  items = items.filter(item => {
    if(item.id !== req.body.id) {
      return item
    }
  })
  res.json(items)
})

app.listen(port, () => console.log(`Todo server listening on port ${port}!`))
```
![image of the app listening on localhost port 4567](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541503/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-server.png)

For the React app itself, I added `bootstrap`, which will come from a CDN, and have put the entire to-do list app in `app.js`. 

#### index.html
```html

<head>
  <meta charset="utf-8">
  <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
...
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
  
...

  <link rel="stylesheet" href="http://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

  <script src="http://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="http://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>


  <title>React App</title>
</head>
```

#### index.js
```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    items: [],
    loading: true,
    todoItem: ''
  }

  componentDidMount() {
    fetch('http://localhost:4567/items.json')
    .then(response => response.json())
    .then(items => {
      this.setState({ items, loading: false })
    })
  }

  addItem = (e) => {
    e.preventDefault()

    fetch('http://localhost:4567/items.json', {
      method: 'POST',
      body: JSON.stringify({ item: this.state.todoItem }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(items => {
      this.setState({ items })
    })

    this.setState({ todoItem: '' })
  }

  deleteItem = (itemId) => {
    fetch('http://localhost:4567/items.json', {
      method: 'DELETE',
      body: JSON.stringify({ id: itemId }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(items => {
      this.setState({ items })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
            <img src={logo} className="App-logo" alt="logo" />
            Todo List
          </span>
        </nav>

        <div className="px-3 py-2">

          <form className="form-inline my-3" onSubmit={this.addItem}>
            <div className="form-group mb-2 p-0 pr-3 col-8 col-sm-10">
              <input 
                className="form-control col-12"
                placeholder="What do you need to do?"
                value={this.state.todoItem}
                onChange={e => this.setState({ 
                  todoItem: e.target.value 
                })}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary mb-2 col-4 col-sm-2">
              Add
            </button>
          </form>

          { this.state.loading && <p>Loading...</p> }

          { 
            !this.state.loading && this.state.items.length === 0 && 
            <div className="alert alert-secondary">
              No items - all done!
            </div>
          }

          {
            !this.state.loading && this.state.items && 
            <table className="table table-striped">
              <tbody>
                {
                  this.state.items.map((item, i) => {
                    return (
                      <tr key={item.id} className="row">
                        <td className="col-1">{i+1}</td>
                        <td className="col-10">{item.item}</td>
                        <td className="col-1">
                          <button 
                            type="button" 
                            className="close" 
                            aria-label="Close"
                            onClick={() => this.deleteItem(item.id)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          }

        </div>

      </div>
    );
  }
}

export default App
```

In the browser, we have a working, regular to-do list app. This is just a regular web app so far.

![image of the working app](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541501/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-apppp.png)

A progressive web app is enabled by a service worker, which we can see in `index.js`. Old versions of Create React App turned on the service worker by default. Starting with Create React App 2.0, we have to manually enable the service worker by calling `serviceWorker.register`.

#### index.js
```js
reactDom.redner(<App /> document.getElementById('root'));
serviceWorker.register();
```

By default, that uses a cache-first strategy to serve all of our assets generated by the react app. If we open `serviceworker.js`, we can look at the register function that we just called.

![image of the serviceworker.js](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541511/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-serviceworker.png)

One really important thing to notice is that the `serviceworker` only registers in production mode. 

![image of the production mode location](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541510/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-prod.png)

You could change this file to work in dev mode too, but that's advised against in the documentation because of caching problems that can be frustrating during development. If you do decide to go that route, you'll also need to change the default `serviceworker.js` file name because of a default `serviceworker.js` file that is served from React scripts in development mode.

Instead, we'll test the service worker by building a production version of the app with `yarn build` and then serve that production version with `serve -s build` and then open `localhost:5000`, where we can see the app running.

#### terminal
```bash
$ yarn build
$ serve -s build
```

![image of the terminal output from running yarn build then serve -s build](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541504/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-termiinaloutput.png)

![image of app in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541503/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-app.png)

Since we've registered the service worker, if we refresh now and open the Chrome DevTools to the console, we can see the message from Workbox showing us that the pre-cache is responding to the static assets.

![image of the pre-cache in devtools and static assets](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541506/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-devtoools.png)

In the Network tab, we can see that the JavaScript and SVG assets are all being served now by the service worker instead of by the dev server. Since they come directly from the cache, your entire app will load faster than if it required a network call for each of those assets, which is one of the primary benefits of registering the service worker.

![image of the network tab showing the service worker service and the waterfall demonstrating fast load time](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541507/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-network.png)

In fact, we can now actually turn off the app server. 

![image showing the server turned off in the terminal window](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541507/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-network.png)

If we refresh the app in the browser, we can still see it. There's nothing serving on localhost port 5000, but the app still loads because the service worker has been registered and is serving a cached version of the production app assets.

![image showing the app still appearing based on cache](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541506/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-network3.png)

Notice though that the service worker is only serving the static assets. The to-do items are still being loaded from the network, from our express web server. If we turn off the server and refresh now, the list of items won't load because it's still trying to make a network call for that.

![image of the items not loading](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541507/transcript-images/react-create-a-progressive-web-app-with-react-and-register-a-service-worker-network5.png)

The default service worker implementation from Create React App will cache all the static assets, but not any of the dynamic network calls that your app makes.
