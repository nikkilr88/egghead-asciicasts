Instructor: [00:00] First, we need to install `sw-precache`. Open a console and type `npm install sw-precache`. Let's save it globally.

#### Terminal
```bash
$ npm install sw-preache -g
```

[00:18] Then we need to create a configuration file for `sw`. Let's call it `sw-config.js`. Then type `module.exports`, and here is where we can define the configuration for the service worker precache plug-in.

#### sw-config.js
```javascript
module.exports = {

}
```

[00:36] At least what we need is to define the files that will be cached by the service worker. For that, write `staticFileGlobs`, which is an array of paths.

[00:48] At least we need to cache the `index.html`, then `manifest.json`, and all the Java scripts which are in this folder. We can use global paths to define multiple files, `dist/**.js`. Let's save it.

```javascript
module.exports = {
    staticFileGlogs: [
        'index.html',
        'manifest.json',
        'dist/**.js'
    ]
}
```

[01:04] Then we need to run `sw-precache --config`, and then the path to the config file in the terminal. 

#### Terminal
```bash
$ sw-precache --config sw-config.js
```

This will generate our service worker file. Understanding a service worker in detail is out of the scope of this course because it can take a course of its own, but at least, let's skim it over.

[01:28] The service worker adds a hash to the files that we define. Then it has a bunch of utility functions.

[01:39] The most important thing is that it has three events. `install`, which, as you can guess, is called when the service worker gets installed. What it does is to `cache` all the files that we define.

[01:55] Then we have the `activate` event. This is called when the service worker gets updated, and there is a new version. This event will remove all the entries from the cache, so in the next install event, the new files get updated.

[02:11] Finally, we have the `fetch` event. Since this service worker uses a cache-first strategy, that means that if a file is found in the cache, it will be loaded. If not, it will load it from the URL.

[02:27] It opens it from the cache. If not, it will perform the fetch request.