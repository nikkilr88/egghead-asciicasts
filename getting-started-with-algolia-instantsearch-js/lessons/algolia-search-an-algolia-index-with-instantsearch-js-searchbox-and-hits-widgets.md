To add our `searchBox` and `hits` widgets, we first need to create containers on the HTML page. While doing so, we'll take care of structuring the layout of it. We'll add a `<header>` and a `<main>` tag. The `<header>` will contain the `searchbox`. The `<main>` tag will hold the rest of our UI.

#### index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>InstantSearch for Vanilla JS</title>
    <script src="https://cdn.jsdelivr.net/npm/algoliasearch@3.32/dist/algoliasearchLite.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@3.1.1/dist/instantsearch.production.min.js"></script>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.0/themes/reset-min.css"
    />
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>

  <body>
    <header>
      <div id="searchbox"></div>
    </header>
    <main>

    </main>
    <script src="app.js"></script>
  </body>
</html>
```

Adding the `<div>` with an `id` of `searchBox` in the `<header>`, then adding another `<div>` with an `id` of `hits` in the `<main>` tag. That's it for now on the HTML page. Let's move over to our `app.js` file.

```html
  <body>
    <header>
      <div id="searchbox"></div>
    </header>
    <main>
      <div id="hits"></div>
    </main>
    <script src="app.js"></script>
  </body>
```

We'll take care of our `searchbox` first. `search.addWidget`, `instantsearch.widgets`, and then the `searchBox` widget. As always, the first thing to configure is the `container`. Here, we've previously set a `<div>` with a `searchBox` ID. Let's add it in the config.

#### app.js
```js
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b334d5ff4c9'
);

const search = instantsearch({
  indexName:"instant_search",
  searchClient
});

//add searchbox widget
search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox"
  })
);
//add hits widget

search.start();
```

Loading the index page, we now have a nice search box where we can type in and clear content. 

![Searchbox Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498339/transcript-images/algolia-search-an-algolia-index-with-instantsearch-js-searchbox-and-hits-widgets-initial-searchbox-test.jpg)

One thing that is missing from this widget, though, and that is a best practice in search in general, is to give a hint to our user on what they can search for.

This can be easily done by providing a  `placeholder` in the `search` input. To do that, we'll leverage the `placeholder` attribute of our widget. As a string, we'll add `"Search for products, brands or categories"`.

```js
//add searchbox widget
search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search for products, brands or categories"
  })
);
```

Refreshing the browser, we now have a more helpful placeholder. Our search box is looking good. 

![Searchbox with Placeholder](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498339/transcript-images/algolia-search-an-algolia-index-with-instantsearch-js-searchbox-and-hits-widgets-searchbox-placeholder.jpg)

Let's take care of showing some results onto the page now with the `hits` widget. Same process, `search.addWidget`, `instantsearch.widgets`, and the `hits` widget.

```js
//add hits widget
search.addWidget(
  instantsearch.widgets.hits({

  })
)
```

We configure the `container`, `#hits`, as we previously added this `<div>` to our `index.html` page. 

```js
//add hits widget
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits"
  })
)
```

Now lets refresh our browser. We can now see individual hits displayed as raw JSON objects. Not particularly sexy yet, but it does help you confirm that the search works as expected. When typing in the search box, results are properly refreshed.

![Hits Widget](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498343/transcript-images/algolia-search-an-algolia-index-with-instantsearch-js-searchbox-and-hits-widgets-browser-displaying-hits-widget.jpg)