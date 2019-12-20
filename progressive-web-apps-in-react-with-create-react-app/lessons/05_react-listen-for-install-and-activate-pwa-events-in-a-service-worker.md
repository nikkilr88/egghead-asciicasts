In the `src/sw.js` file we can add a couple of listeners for the service worker life-cycle events, one for the `('install', event =>` and one for the `activate` event. 

#### src/sw.js
```js
workbox.skipWaiting()
workbox.clientsClaim()


self.addEventListener('install', event => {
  console.log("install.")
  })

self.addEventListener('activate', event => {
  console.log("activate")
})


workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
```

Let's `yarn build` and `serve -s build` that. 

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```

If we open a new tab to the console and load the app. They're the `install` and `active` events. 

![image of the install and activate events](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582332/transcript-images/react-listen-for-install-and-activate-pwa-events-in-a-service-worker-show.png)

Now if we reload again, notice that they don't show up.

![image of the events not showing up](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582334/transcript-images/react-listen-for-install-and-activate-pwa-events-in-a-service-worker-noshow.png)

That's because the service worker is already installed and activated for this app, so those hooks won't fire again. We could go to the application tab and force unregister the service worker. 

![image of the force unregister](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582329/transcript-images/react-listen-for-install-and-activate-pwa-events-in-a-service-worker-forceunregister.png)

Now when we reload, we can see the new service worker was installed. 

![image of the new service worker installed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582332/transcript-images/react-listen-for-install-and-activate-pwa-events-in-a-service-worker-show.pngingup.png)

In the console we can see the install and activate messages again, since a new service worker was installed.

![image of the messages showing up again](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582333/transcript-images/react-listen-for-install-and-activate-pwa-events-in-a-service-worker-console.png)

In these callbacks we could do actions like cleaning up old cached values or interacting with local storage or indexedDB. For now, we'll just put a set time out here to signify some `async` action. To make sure that `asyncInstall` waits for the `setTimeout` to be complete however, we need to wrap it in a promise. Then we'll call a function or an event called `waitUntil`, and then pass in that `Promise`. 

#### src/sw.js
```js
workbox.skipWaiting()
workbox.clientsClaim()


self.addEventListener('install', event => {
  const asyncInstall = new Promise(resolve => {
    console.log("Waiting to resolve...")
    setTimeout(resolve, 5000)    
  })

  event.waitUntil(asyncInstall)
})


self.addEventListener('activate', event => {
  console.log("activate")
})


workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
```

It's very important that whatever promise you pass in to `waitUntil` actually resolves or rejects. If we didn't resolve in the timeout here, it would wait forever to install the service worker. Then it would never activate. The service worker would never work.

Let's `yarn build` and `serve -s build` that. 

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```
In the application tab we can make sure the service worker is unregistered. 

Then if we switch to the console tab and reload, we'll see the install event. 

![image of the install event loading](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582328/transcript-images/react-listen-for-install-and-activate-pwa-events-in-a-service-worker-installing.png)

Then five seconds later we'll see the activate event.
 
![image of the activate event five seconds after](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582330/transcript-images/react-listen-for-install-and-activate-pwa-events-in-a-service-worker-loaded.png)