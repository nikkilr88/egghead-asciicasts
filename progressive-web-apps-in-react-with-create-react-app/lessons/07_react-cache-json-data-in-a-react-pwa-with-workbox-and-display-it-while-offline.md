In the `src/sw.js` file, let's register another route, this time for any JSON network call from our back-end server. We'll pick a `networkFirst` cache strategy, which will always try to hit the network first and only reach into the cache if it can't get to the server or the network.

#### src/sw.js
```js
workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('https:.*min\.(css|js)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-cache'
  })
)

workbox.routing.registerRoute(
  new RegExp('http://.*:4567.*\.json'),
  workbox.strategies.networkFirst()
)

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
```

This is important for things like API calls, where we always want to have the very latest information. Then we can `yarn build` and `serve -s build` that and reload in Chrome with the network tab open. 

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```
![image of the browser with the app loaded and the network tab open](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582337/transcript-images/react-cache-json-data-in-a-react-pwa-with-workbox-and-display-it-while-offline-loadedonline.png)

If we go off-line now and reload, the list works. We can see that network request tried but failed first. 

![image of the list loaded offline, with failed network request shown](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582338/transcript-images/react-cache-json-data-in-a-react-pwa-with-workbox-and-display-it-while-offline-loadedoffline.png)

Then it went to the old cached results from the service worker.

Back in the `src/sw.js` file, we matched the entire local host URL. But in production, that might be `/*.json`, for example, depending on how we call it from our application.
