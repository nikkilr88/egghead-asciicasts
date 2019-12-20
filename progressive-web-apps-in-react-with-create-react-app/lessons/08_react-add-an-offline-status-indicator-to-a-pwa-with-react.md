Now that we can operate offline in `src/app.js`, let's add a bit of initial state called `offline`. For that, we'll check the status of `navigator.onLine` and take the opposite of it as our offline FLAC.

#### src/app.js
```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    items: [],
    loading: true,
    todoItem: '',
    offline: !navigator.onLine
  }
```

Note that `!navigator.onLine` will only tell you if there's a network connection present or not. It won't necessarily tell you if it can hit the server. In production, that probably means you'll want to do a network test, as well.

We'll also need a new method that can `setOfflineStatus` based on the navigator. Then we can listen for the `offline` and `online` events in the `window`. We'll add those `addEventListener` in the `componentDidMount`, and clean them up in `componentWillUnmount`.

```js
componentDidMount() {
    fetch('http://localhost:4567/items.json')
    .then(response => response.json())
    .then(items => {
      this.setState({ items, loading: false })
    })

    window.addEventListener('online', this.setOfflineStatus)
    window.addEventListener('offline', this.setOfflineStatus)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.setOfflineStatus)
    window.removeEventListener('offline', this.setOfflineStatus)
  }

  setOfflineStatus = () => {
    this.setState({ offline: !navigator.onLine })
  }
```

In the `render()` method, if we're offline, we'll just add a `badge` to the header that will say `Offline`. 

```js
render() {
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">
          <img src={logo} className="App-logo" alt="logo" />
          Todo List
          </span>

      {
        this.state.offline &&
        <span className="badge badge-danger my-3">
          Offline
        </span>
        }
      </nav>
```
Then we can `yarn build` and `serve -s build` that.

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```

In the browser we can see it works online. 

![image of the application working online](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582333/transcript-images/react-add-an-offline-status-indicator-to-a-pwa-with-react-online.png)

Then when we switch to offline mode, we can see the new badge and the header right away.

![image of the application in offline mode with the new badge](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582340/transcript-images/react-add-an-offline-status-indicator-to-a-pwa-with-react-offline.png)

We can also reload while offline. That offline label will still be correctly displayed.

![image of the badge still correctly displayed offline](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582340/transcript-images/react-add-an-offline-status-indicator-to-a-pwa-with-react-offline.png-again.png)

 Then as soon as we go back online, the label goes away, so our user knows that the app is back online.

 ![image of the application without the offline badge when back online](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582333/transcript-images/react-add-an-offline-status-indicator-to-a-pwa-with-react-online.pngagain.png)