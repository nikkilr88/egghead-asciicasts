Instructor: [00:00] To add our `searchBox` and `hits` widgets, we first need to create containers on the HTML page. While doing so, we'll take care of structuring the layout of it. We'll add a `header` and a `main` tag. The header will contain the search box. The `main` tag will hold the rest of our UI.

[00:18] Adding the `div` with an id of `searchbox` in the header, then adding another `div` with an ID of `hits` in the main tag. That's it for now on the `index.html` file, so let's move over to our `app.js` file.

#### index.html

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

</html>
```

[00:33] We'll take care of our search box first. `search.addWidget`, `instantsearch.widgets`, and then the `searchBox` widget. As always, the first thing to configure is the `container`. Here, we've previously set a `div` with a `searchBox` id. Let's add it in the config.

#### app.js

```js
//add searchbox widget
search.addwidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox"
  })
);
```

[00:52] Loading the index page, we now have a nice search box where we can type in and clear content.

![Searchbox added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/search-an-algolia-index-with-instantsearch-js-searchbox-and-hits-widgets-search-box-added.jpg)

One thing that is missing from this widget, though, and that is a best practice in search in general, is to give a hint to our user on what they can search for.

[01:07] This can be easily done by providing a nice placeholder in the search input. To do that, we'll leverage the `placeholder` attribute of our widget. As a string, we'll add "`Search for products, brands, or categories`."

```js
//add searchbox widget
search.addwidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox"
    placeholder: "Search for products, brands, or categories"
  })
);
```

[01:21] Refreshing the browser, we now have a more helpful placeholder.

![Placeholder added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324957/transcript-images/search-an-algolia-index-with-instantsearch-js-searchbox-and-hits-widgets-placeholder-added.jpg)

Our search box is looking good. Let's take care of showing some results onto the page now with the `hits` widget. Same process, `search.addWidget`, `instantsearch.widgets`, and the `hits` widget.

[01:39] We configure the `container`, `'#hits'`, as we previously added this `div` to our `index.html` page.

```js
//add hits widget
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits"
  })
);
search.start;
```

We can now see individual hits displayed as raw JSON objects.

![Hits being displayed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324961/transcript-images/search-an-algolia-index-with-instantsearch-js-searchbox-and-hits-widgets-hits-displayed.jpg)

Not particularly sexy yet, but it does help you confirm that the search works as expected. When typing in the search box, results are properly refreshed.
