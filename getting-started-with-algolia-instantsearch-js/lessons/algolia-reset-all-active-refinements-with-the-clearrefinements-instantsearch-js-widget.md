We need to provide an easy way for our users to reset their search refinements. That's the `clearRefinements` widget's mission. Extremely simple to add. The `container` in our HTML file first. Let's add it to the top of our refinement `column` on the `left` and give it an `id` of `clear-all`. 

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
  </div>
</main>
```

Then, in `app.js`, `search.addWidget`, `instantsearch.widgets`, and `clearRefinements`.

#### app.js
```js
// add widget

search.addWidget(
  instantsearch.widgets.clearRefinements({
    
  })
)

search.start();
```

Configuring the `container`, the `ID` is `clear-all`. We refresh the page. Nothing changes yet. Then, if we refine on the brand facet, for instance, we now have a "Clear all" link that appears on top. Clicking it will clear all the active refinements.

```js
// add widget

search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: "#clear-all"
  })
);

search.start();
```

Note that as the name implies, this widget clears all refinements, not only the facets, but also numerical values like the range input down there.

![Clear Refinements Widget](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498343/transcript-images/algolia-reset-all-active-refinements-with-the-clearrefinements-instantsearch-js-widget-clear-refinements-widget-displayed-in-browser.jpg)