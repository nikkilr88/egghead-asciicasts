Hierarchical menu will help the user navigate through categories and subcategories easily. To make it work, it needs a properly formatted attribute. Let's type in a random query and look at the JSON response.

Opening the first hit object, we can see that we have a categories key containing an array of strings. 

![Categories Key with Array of Strings in JSON Response](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498341/transcript-images/algolia-browse-results-based-on-a-hierarchy-of-facets-hierarchicalmenu-in-instantsearch-js-json-response-categories-key-with-array-of-strings.jpg)

That won't be enough for the hierarchical menu prior to indexing. We will use this array to build another attribute, the hierarchical categories. This is not an array, but an object. The keys are the depth level of categories and subcategories.

Note how in the sublevels, the root and parent levels are still present, separated by a special character, here the angle bracket. Now that we know the structure, let's add a widget. As always, the container in the HTML file first.

In the `left-column`, we add a `<div>` with an `id` of `categories`. 

#### index.html
```html
<main>
  <div id="left-column"></div>
    <h5 class="filter-title">Brands</h5>
    <div class="filter-widgets" id="brands"></div>
    <h5 class="filter-title">Categories</h5>
    <div class="filter-widgets" id="categories"></div>
  <div id="right-column">
    <div id="hits"></div>
  </div>
</main>
```

In our `app.js` file, we set up our widget, `search.addWidget`, `instantsearch.widgets`, `hierarchicalMenu`. The `container` is the `categories` id. Nothing new so far.

#### app.js
```js
// add widget

search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: "#categories"
  })
);

search.start();
```

Now, for regular menus or refinement list, we would add an attribute name which would be a string. Here, it's a little different. The key is `attributes` with an S. The value must be an array of strings. Remembering the structure of the `hierarchicalCategories` attributes of our records, we can add the root level like so, `hierarchicalCategories.lvl0`.

```js
// add widget

search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: "#categories",
    attributes: ["hierarchicalCategories.lvl0"]
  })
);

search.start();
```

Refreshing the page, we now have the root-level categories displayed. When clicking, it refines, but no subcategories show up. 

![Root-level categories displayed, no subcategories](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498342/transcript-images/algolia-browse-results-based-on-a-hierarchy-of-facets-hierarchicalmenu-in-instantsearch-js-root-level-categories-now-showing-up-in-browser.jpg)

Let's add them. Copying the `lvl0`, pasting it twice, and changing to `lvl1` and `lvl2`. Now refreshing again.

```js
// add widget

search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: "#categories",
    attributes: [
      "hierarchicalCategories.lvl0", 
      "hierarchicalCategories.lvl1", 
      "hierarchicalCategories.lvl2"
    ]
  })
);

search.start();
```

When refining on the root-level category appliances, we now have the chart level showing. If we refine further, the sublevel categories appear. We now have a hierarchical menu properly set up.
