Let's type in a random short query that will match with a lot of results, "do", for example. By default, each query returns the best 20 hits. How can we access the following ones?

That's what pagination is here for. Thankfully, the JSON response comes with everything necessary to paginate. With the pagination widget, you can add that functionality without any configuration.

In the HTML page, we add a `<div>` container in our `right-column`, just below the `hits`. We give it an `id` of `pagination`. 

#### index.html
```html
<main>
  <div id="left-column"></div>
    <div class="filter-widgets" id="clear-all"></div>
    <h5 class="filter-title">Brands</h5>
    <div class="filter-widgets" id="brands"></div>
    <h5 class="filter-title">Categories</h5>
    <div class="filter-widgets" id="categories"></div>
    <h5 class="filter-title">Price</h5>
    <div class="filter-widgets" id="price"></div>
  <div id="right-column">
    <div id="hits"></div>
    <div id="pagination"></div>
  </div>
</main>
```

In our `app.js` file, we add the widget, same as always. `Search.addWidget`, `instantsearch.widgets`, and `pagination`.

#### app.js
```js
// add widget

search.addWidget(
  instantsearch.widgets.pagination({
    
  })
)

search.start();
```

Then we simply provide the `container` to target, the ID `pagination`. That's it. 


```js
// add widget

search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);

search.start();
```

Refreshing the page and scrolling down to the bottom, we now have our pagination widget, allowing us to access the results way further in the set.

![Pagination Widget](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498342/transcript-images/algolia-paginate-large-sets-of-algolia-data-with-instantsearch-js-pagination-widget-displayed-in-browser.jpg)