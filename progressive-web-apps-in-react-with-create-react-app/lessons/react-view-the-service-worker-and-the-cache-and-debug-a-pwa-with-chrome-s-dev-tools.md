In the Chrome DevTools, click the Application tab. Here, we can see the service worker info. We can see the name of the current service worker and the date and time it was received. If you are running into caching issues, then check here first to make sure that you have the latest service worker running.

![image showing the applications tab](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541507/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools1.png)

We could also avoid some caching issues by clicking "Update on reload," which should now update the service worker if we reload, or you can update to a new version by clicking "Update" or even by unregistering the service worker altogether before reloading.

![image showing what happens when you have the update on reload button pressed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541505/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools2.png)

In production or when you really run into cache issues, make sure to close any and all tabs that are open to your app and reopen them to refresh the service worker.

![image of the browser after a refresh with the Upload on Reload checkbox clicked](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541505/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools3.png)

Without the "Upload on reload" checkbox clicked, it is not enough to just refresh the browser tab to update a service worker in production.

We can also click on the service worker name to see the contents of the currently running worker. 

![image of the service worker contents](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541508/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools4.png)

We can see here that "Create React App" uses Workbox from Google to build its service worker.

Back in the Application tab, we can force the browser into offline mode by clicking this Offline checkbox and refreshing the tab. 

![image of the offline checkbox](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541504/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools5.png)

We can see the Network tab with a caution icon showing us that we don't have a network connection, but our app still loads all the static assets.

![iamge of the app with the caution icon and loading symbol](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541506/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools6.png)

However, the item's HTTP call can't load because dynamic JSON calls aren't cached by default. We can see when it's cached by the service worker by opening the cache storage tree here and can select the Workbox cache and see all of the static assets that are cached by the service worker.

![image of the contents of the cache tree](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541506/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools7.png)

We can see the same information if we go to the Network tab. We can see the static assets being served from the service worker, but not the items JSON call. Even if we go back to the Application tab and turn off offline mode and reload, then in the Network tab we can still see the static assets being served from the service worker, which will generally be faster than a full network call, especially on a mobile network.

![image of the reload in the network tab serving static assets](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541506/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools8.png)

Even if we don't want to enable a full offline mode with our progressive web app, enabling the service worker can still increase the loading performance of your application. To turn off the service worker caching for developing, back in the Application tab you can click "Bypass for network," which will skip the service worker altogether for your assets.

![image of clicking the bypass for network button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541505/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools9.png)

If we reload and switch back to the Network tab, we can see all the assets being served directly from the web server now, and not from the service worker. This can help in development, but keep in mind that users will not have these tools available.

![assets served directly from the webserver](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541506/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools10.png)

Let's simulate a real user by disabling the "Update on reload" and "Bypass for network". 

![image of unchecking the Update for Reload and Bypass for Network buttons](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541506/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools11.png)

Then make a simple change to our application by just changing the header from "To-Do List" to "My To-Do List". 

![image of the small change made to the application](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541507/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools1.png)

Then `yarn build` and `serve -s build` that new version of the app.

### Terminal
```bash
$ yarn build

$ serve -s build
```

![image of serving and building the app in terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541507/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools1.png)

Back in the browser, it doesn't matter how many times we reload. We will always see the old version of the app because that's what's being cached by the old service worker.

![image of the browser loaded with the old version of the app](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541507/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools1.png)

Forced reloading with `command-shift-R` may work to get the new version of the app, but the only guaranteed way to get the new version of both the service worker and the app is to close all the Application tabs and reopen them.

![image of the new app loaded on the browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543541500/transcript-images/react-view-the-service-worker-and-the-cache-and-debug-a-pwa-with-chrome-s-dev-tools15.png)

That aggressive caching is one of the biggest potential downsides to using a service worker. You'll have to keep that in mind as you're developing your application.
