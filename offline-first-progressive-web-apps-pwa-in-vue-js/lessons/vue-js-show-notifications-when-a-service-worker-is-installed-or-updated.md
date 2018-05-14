Instructor: [00:01] First, we need to access the registration variable that is available when the promise from the register method finishes. With it, we can not only register the service worker, but also have control over the service worker lifecycle.

[00:19] First, we need to check when there is an update on the service worker registration. We do that by using `onupdatefound`. This will trigger when the new service worker is different to the previous one. At this point, the service worker will start to install. We can access it by typing `const sw = reg.installing`.

#### main.js
```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
        re.onupdatefound = () {
            const sw = reg.installing
        }
    })
}
```

[00:47] Now we have to listen to the state. We want to be notified when it goes from installing to installed. We can do that by using the `sw.onstatechange`. Here we have to check that the state is installed.

```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
        re.onupdatefound = () {
            const sw = reg.installing

            sw.onstatechange = () => {
                if(sw.state === 'installed') {

                }
            }
        }
    })
}
```

[01:13] Still here there could be two cases, the case when the service worker is first installed, and the contents are cached, and the case where there was already a service worker, and it just gets updated with a new version. It all depends on if there is a controller on the service worker already.

[01:32] If there is in the `navigator.serviceWorker.controller`, if there is a controller, it's because there was a previous worker before. Here, we'll get a new version. If not, it's because this is the first service worker installed, so the contents are cached.

```javascript
sw.onstatechange = () => {
    if(sw.state === 'installed') {
        if (navigator.serviceWorker.controller) {

        } else {

        }
    }
}
```

[01:57] In both cases, we want to show a message. For that, let's use the vuetify’s snack bar component as a number component. Let's go to the app component, and here write `<v-snackbar>`, which will show a `{{message}}`. It will have some properties like `:absolute="true"`, so it doesn't depend on where in the tree it is.

```html
<v-snackbar
    :absolute="true"
    >
        {{message}}
</v-snackbar>
```

[02:22] It needs to have a `v-model` to be shown or hide. Let's say `show`. We'll write a `:timeout` variable, so after four seconds it hides automatically. 

```html
<v-app>
...
    <v-snackbar
        :absolute="true"
        v-model="show"
        :timeout="4000"
        >
            {{message}}
    </v-snackbar>
</v-app>
```

We'll get this show a message from the properties of the component. Let's define `'show'` and `'message'`. 

```javascript
export default {
    props: ['show', 'message'],
    components: {
        Toolbar
    }
}
```

[02:55] Now let's go back to the `main.js` file. in `app`, we'll pass the `message` property, and the `show` property, as well. We need to initialize them by typing `data: {message: '', show: false}`. Finally, we can sense it from the outside by using the app variable.

#### main.js
```javascript
const app = new Vue({
    el: '#app',
    components: { App },
    data: {message: '', show: false},
    template: '<app :message="message" :show="show"></app>',
    router
})

```

[03:28] Down here in the `if` statement, we could say `app.show = true`, and that's the same for the `else`. `app.message = 'Contents are now offline'` in the `else`. In the `if`, we'll show `'A new version is available'`. 

```javascript
...
sw.onstatechange = () => {
    if(sw.state === 'installed') {
        if (navigator.serviceWorker.controller) {
            app.show = true
            app.message = 'A new version is available'
        } else {
            app.show = true
            app.message = 'Contents are now offline '
        }
    }
}
...
```

Let's try this out now. First, I'm going to run `npm run build && http-server -c-1`, so there is no caching happening.

[04:04] In the meanwhile, this is executing, I'm going to go to the app and, just to show it from the beginning, in the dev tools, I'm going to unregister the service worker and delete the cache entry. Now that it's finished, if I reload, you'll see there is a "contents are now offline" message here.

![Contents offline](../images/vue-js-show-notifications-when-a-service-worker-is-installed-or-updated-contents-offline.png)

[04:24] If we reload more times, nothing is happening, because there is no new version of the service worker, and the first one has already cached the contents. Now let's stop this from executing, and let's send something here. For example, I'm going to remove the "is". 

```javascript
sw.onstatechange = () => {
    if(sw.state === 'installed') {
        if (navigator.serviceWorker.controller) {
            app.show = true
            app.message = 'A new version available'
        } else {
            app.show = true
            app.message = 'Contents are now offline '
        }
    }
}
```

Let's run it again, and let's reload the app. Now you see a new version is available.

![ner version available](../images/vue-js-show-notifications-when-a-service-worker-is-installed-or-updated-new-version-available.png)