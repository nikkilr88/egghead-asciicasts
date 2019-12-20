Instructor: [00:00] Here's our starter project. We have three files, `index.html`, `style.css`, and `app.js`. `Index.html` will hold our mockup. For the moment, it's basic HTML5 boilerplate that also imports our two other files, `style.css` and `app.js`.

[00:19] The `style.css` file is already completed as it will not be the focus of this course. It simply holds the CSS rules that will take care of the layout and the custom look and feel of all of our widgets. The last file, `app.js`, is totally empty for now. It's where most of the fun will happen, where we'll be playing with instant search and adding widgets.

[00:41] To get started, the first step is to import the library. There are a few ways to do it. If you use a build system, then NPM or Yarn will help you install the package. After that you can require or import it directly into your file.

#### Terminal

```bash
npm install instantsearch.js --save
```

OR 

```bash
yarn add instantsearch.js
```

[00:57] Here, we'll keep things simple. No build systems. We'll load the library with a CDN into our HTML page with a simple `<script>` tag. This will expose an instant search object that we'll be using in our `app.js`. Last thing to add for the moment on this page is the default style for the instant search widgets with this link.

#### index.html

```hmtl
<head>
    <title>InstantSearch for Vanilla JS</titel>
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@2.10.1"></script>
     <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.10.1/dist/instantsearch.min.css">

    <link rel="stylesheet" type="text/css" href="style.css">
</head>
```

[01:20] Now, let's head over to our `app.js` file. We'll create a constant named `search` that will hold the initialized instant search. To initialize it, we need to pass it a configuration object containing three mandatory elements, the `appId`, the `apiKey`, and the `indexName` we want to target.

#### app.js

```js
// initiliaze instantsearch
const search = instantsearch({
  appId: "latency",
  apiKey: "b37781ea260eea196da5b3346dff4c9",
  indexName: "instant_search"
});
```

[01:41] For the API key, make sure to enter a search from the API key, as this will be visible on the front end. You don't want to expose an API key with write access to your indices. The last step to finalize the setup of the lib is to call the `start` method on our `search` variable. Let's log our `search` object to check that everything is working fine.

```js
const search = instantsearch({
  appId: "latency",
  apiKey: "b37781ea260eea196da5b3346dff4c9",
  indexName: "instant_search"
});

search.start();
console.log(search);
```

[02:04] Let's open the index file in our browser. Nothing happens, which is totally expected for now. If we open the console tab, we can see the search object logged correctly.

![Search object logged](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/set-up-the-instantsearch-js-library-console-search.jpg)

If something went wrong, like an invalid API key or a missing parameter, you'll see an error message.

[02:23] Let's remove the app ID to see what that would look like. There you go, a nice error. Let's put it back, and we're all set to start adding widgets.

![App Id error message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/set-up-the-instantsearch-js-library-error-message.jpg)
