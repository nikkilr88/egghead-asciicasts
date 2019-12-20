Instructor: [00:00] We need to provide an easy way for our users to reset their search refinements. That's the `clearAll` widget's mission. Extremely simple to add. The container in our HTML file first. Let's add it to the top of our refinement column on the left and give it an `id` of `clear-all`.

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

Then, in app.js, `search.addWidget`, `instantsearch.widgets`, and `clearAll`.

[00:28] Configuring the `container`, the `id` is `"#clear-all"`.

#### app.js

```js
search.addWidget(
  instantsearch.widgets.clearAll({
    container: "#clear-all"
  })
);

search.start();
```

We refresh the page. Nothing changes yet. Then, if we refine on the brand facet, for instance, we now have a "Clear all" link that appears on top.

![Clear all link added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/reset-all-active-refinements-with-the-clearall-instantsearch-js-widget-clear-all-link-added.jpg)

Clicking it will clear all the active refinements.

[00:49] We can change the "Clear all" default string to add whatever we want. In `templates` `link`, let's add `"Reset everything"`.

```js
search.addWidget(
  instantsearch.widgets.clearAll({
    container: "#clear-all"
    templates: {
      link: "Reset everything"
    }
  })
);
```

Now, refining on a brand, the link displays `"Reset everything"` instead.

![Reset everything link added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/reset-all-active-refinements-with-the-clearall-instantsearch-js-widget-reset-everything-link-added.jpg)

Note that as the name implies, this widget clears all refinements, not only the facets, but also numerical values like the range input down there.
