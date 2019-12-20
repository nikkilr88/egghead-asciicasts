Instructor: [00:00] Let's type in a random short query that will match with a lot of results, DO, for example. By default, each query returns the best 20 hits.

![Hits query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/paginate-large-sets-of-algolia-data-with-instantsearch-js-pagination-widget-query-hits.jpg)

How can we access the following ones?

[00:12] That's what pagination is here for. Thankfully, the JSON response comes with everything necessary to paginate. With the `pagination` widget, you can add that functionality without any configuration.

[00:26] In the HTML page, we add a `div` container in our right column, just below the hits. We give it an `id` of `pagination`.

#### index.html

```html
<main>
  <div id="left-column">
    <div id="clear-all"></div>
    <div class="filter-widgets" id="brands"></div>
    <div class="filter-widgets" id="categories"></div>
    <div class="filter-widgets" id="price"></div>
  </div>
  <div id="right-column">
    <div id="hits"></div>
    <div id="pagination"></div>
  </div>
</main>
```

In our `app.js` file, we add the widget, same as always. `search.addWidget`, `instantsearch.widgets`,and `pagination`.

[00:45] Then we simply provide the container to target, the id `"#pagination"`. That's it.

#### app.js

```js
search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);

search.start();
```

Refreshing the page and scrolling down to the bottom, we now have our pagination widget, allowing us to access the results way further in the set.

![Pagination widget added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/paginate-large-sets-of-algolia-data-with-instantsearch-js-pagination-widget-added.jpg)
