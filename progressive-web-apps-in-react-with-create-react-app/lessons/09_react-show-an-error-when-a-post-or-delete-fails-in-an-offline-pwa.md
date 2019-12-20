In `src/sw.js` we have registered a route to cache the JSON coming from the server, but HTTP post requests aren't cached by the service worker. Let's `addEventListener` here to listen for any `fetch` requests coming from the app. The `event` callback takes an event as an argument.

Now get requests are handled by other routes. Let's just check if the request is a `POST` or a `DELETE`. We have to have a response here, so let's call `event.respondWith`. 

#### src/sw.js
```js
self.addEventListener('fetch', event => {
  if(event.request.method === "POST" || event.request.method === "DELETE") {
    event.respondWith()
  }
})
```

Inside of that we can do something with the request. In the normal case where the network is available we will just call `fetch` here and pass the `event.request` directly from the event, when we're offline though that will fail. We can have a `catch` here and now we're able to respond with anything that we'd like. We could pull something from the cache like an offline error message or we could generate a `new Response` and pass in some `JSON` with an `error` message. 

```js
self.addEventListener('fetch', event => {
  if(event.request.method === "POST" || event.request.method === "DELETE") {
    event.respondWith(
      fetch(event.request).catch(err => {
        return new Response(
          JSON.stringify({ error: "This action disabled while app is offline" }), {
            headers: { 'Content-Type': 'application/json' }
          }
        )
      })
    )
  }
})
```


In a real app we could do some other things here as well. Like store the post data in a local storage for later or have more advanced error messages based on a type of action that the user is trying to do.

Now back in `src/app.js` we're expecting that for many items that JSON call we'll get an array of items back. Now it's possible to get an array of items in the OK case or an object with an error in the network offline case. Let's add an `if` statement for the `items.error` case and just use an `alert` to show the `error` message for now in both the post and delete methods. 

#### src/app.js
```js
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
      if(items.error) {
        alert(items.error)
      } else {
        this.setState({ items })        
      }
    })
```

```js
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
      if(items.error) {
        alert(items.error)
      } else {
        this.setState({ items })        
      }
    })
  }
```

Now we can build and serve that. 

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```

In the browser when the app is online, online posts and delete still work.

![image of the application working online](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582334/transcript-images/react-show-an-error-when-a-post-or-delete-fails-in-an-offline-pwa-appworking.png)

If we switch to offline and try a post or a delete, we get the alert that the functionality isn't available while offline. 

![image of the error message while offline](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582336/transcript-images/react-show-an-error-when-a-post-or-delete-fails-in-an-offline-pwa-erroroffline.png)

We could have also handled this in the `fetch` code itself, but doing it in the service worker allows us to respond the same way across all posts and deletes in our entire application.

![image of the fetch code itself](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582339/transcript-images/react-show-an-error-when-a-post-or-delete-fails-in-an-offline-pwa-fetch.png)
