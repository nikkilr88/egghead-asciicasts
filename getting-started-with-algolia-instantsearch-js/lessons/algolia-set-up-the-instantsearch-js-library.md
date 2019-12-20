Here's our starter project. We have three files, `index.html`, `style.css`,and `app.js`. `index.html` will hold our mockup. For the moment, it's basic HTML5 boilerplate that also imports our two other files, `style.css` and `app.js`.

The `style.css` file is already completed, as it will not be the focus of this course. It simply holds the CSS rules that will take care of the layout and the custom look and feel of all of our widgets. The last file, `app.js`, is totally empty for now. It's where most of the fun will happen, where we will be playing with instantsearch and adding widgets.

The first step is to import two libraries, `algoliasearch`, the JavaScript API client, and `instantsearch`, our front-end widget library. There are a few ways to do it. If you use a build system, `npm` or `Yarn` will help you install the packages. Then you can require or import them in your file.

#### Terminal
```
npm install algoliasearch instantsearch.js
```

or 

```
yarn add algoliasearch instantsearch.js
```

Here, we'll keep things simple, no build system. We will load the two libraries via a CDN into our HTML page with two simple `<script>` tags. This will expose algoliasearch and instantsearch that we will be using in our `app.js` file. Last thing to add for the now on this page is the default style for the instantsearch widgets with this link.

#### index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>InstantSearch for Vanilla JS</title>
    <!-- import algolia search here -->
    <script src="https://cdn.jsdelivr.net/npm/algoliasearch@3.32/dist/algoliasearchLite.min.js"></script>

    <!-- import algolia Instant JS library here -->
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@3.1.1/dist/instantsearch.production.min.js"></script>

    <!-- import algolia Instant JS CSS styling here --> 
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.0/themes/reset-min.css"
    />

    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>

  <body>
    <script src="app.js"></script>
  </body>
</html>
```

Now let's head over to our `app.js` file. We'll create two variables. The first one, named `searchClient`, will hold the initialized API client. To do so, we need to pass it our application credentials, the app id and the API key.

#### app.js
```js
// initialize instantsearch
const searchClient = algoliasearch(
  "latency",

)
```

For the API key, make sure to enter a search on the API key, as this will be visible on the front-end source code. You don't want to expose an API key with write access to your indices.

```js
// initialize instantsearch
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b334d5ff4c9'
)
```

We can now create our second variable that we will simply name `search`. This will hold the initialized instance of our `InstantSearch` library where we'll play with widgets. To initialize it, we call the `instant_search` function, passing it the `indexName` we want to target and our previously created `searchClient`.

```js
// initialize instantsearch
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b334d5ff4c9'
)

const search = instantsearch({
    indexName:"instant_search",
    searchClient
});
```


The last step to finalize the setup of the lib is to call the `start` method on our search variable. Let's `log` our `search` object to check that everything is working fine.

```js
// initialize instantsearch
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b334d5ff4c9"
)

const search = instantsearch({
    indexName:"instant_search",
    searchClient
});

search.start();

console.log(search);
```

Let's open the index file in our browser. Nothing happens, which is totally expected for now. If we open the console tab, we can see our search object logged correctly. 

![Search Object Logged Correctly](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498341/transcript-images/algolia-set-up-the-instantsearch-js-library-search-object-logged-correctly.jpg)

If something went wrong, like an invalid API key or a missing parameter, you'll see an error message.

Let's remove the app ID to see what that would look like. There you go, a nice error. 

![Error After Removing App ID](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498341/transcript-images/algolia-set-up-the-instantsearch-js-library-error-upon-removal-of-app-ID.jpg)

Let's put it back, and we're all set to start adding widgets.
