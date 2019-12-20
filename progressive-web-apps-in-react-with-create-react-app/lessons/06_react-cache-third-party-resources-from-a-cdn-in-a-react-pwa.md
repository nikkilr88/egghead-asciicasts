We're getting Bootstrap from a CDN over the network. 

![image of the network tab with the app working over the network](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582332/transcript-images/react-cache-third-party-resources-from-a-cdn-in-a-react-pwa-network.png)

In offline mode it still looks like it's working, but we're getting it from the browser cache and not from the service worker. If we disable the browser cache and reload. 

![image of the network tab in offline mode](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582334/transcript-images/react-cache-third-party-resources-from-a-cdn-in-a-react-pwa-cache.png)

Now we don't have Bootstrap anymore. You can see that we've lost all our styling on the application. In the network tab you can actually see the failed CDN requests. 

![image of the failed requests](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582337/transcript-images/react-cache-third-party-resources-from-a-cdn-in-a-react-pwa-disabled.png)

In `src/sw.js` we can define and register a new route for the service worker. The first argument to `registerRoute` is either a string that matches the resource that we're trying to cache or a `RegExp` that matches it. Here we'll say that anything that starts with `https` and ends with `.*min\.(css|js)'` is what we want to cache. It's very important when registering a route that it matches the entire URL of the resource that we're trying to cache, otherwise it won't work. 

#### src/sw.js
```js
workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('https:.*min\.(css|js)')
)

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
```

The second argument to register a route tells `workbox` what strategy to use when caching that resource. Common strategies could be `cache` first or `network` first. For Bootstrap we'll use `staleWhileRevalidate`. This will serve Bootstrap as first as possible from the cache first. Then update the cache in the background by making the network call also.

#### src/sw.js
```js
workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('https:.*min\.(css|js)')
  workbox.strategies.staleWhileRevalidate()
)

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
```

This strategy is good for things that you want to be available quickly and also where it's not 100 percent critical to have the latest version all the time. 

Let's build and serve that new service worker. 

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```

If we reload, we can see Bootstrap came from the Web.

![image showing that bootstrap came from the web](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582334/transcript-images/react-cache-third-party-resources-from-a-cdn-in-a-react-pwa-builtandserved.png)

Then if we switch to offline mode and disable the cache, we can see that the application is still styled because Bootstrap was served from the service worker cache. 

![image showing that the application is styled](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582333/transcript-images/react-cache-third-party-resources-from-a-cdn-in-a-react-pwa-offlinestyles.png)

Also, on the application tab if we check the cache, we can see that it was put into the runtime cache and not the pre-cache because pre-cache is just for assets that were put into the pre-cache manifest.

![image of the runtime cache](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582334/transcript-images/react-cache-third-party-resources-from-a-cdn-in-a-react-pwa-runtime.png)

We can switch that from the runtime cache by adding a `cacheName` option to the Workbox strategy call. 

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

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

```

Now if we rebuild and serve that and reload it, we can check the application tab to see the new cache called CDN cache where those assets are stored.

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```

If we reload, we can see Bootstrap came from the Web.

![image showing that cdn cache in the app tab](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582334/transcript-images/react-cache-third-party-resources-from-a-cdn-in-a-react-pwa-cdn.png)