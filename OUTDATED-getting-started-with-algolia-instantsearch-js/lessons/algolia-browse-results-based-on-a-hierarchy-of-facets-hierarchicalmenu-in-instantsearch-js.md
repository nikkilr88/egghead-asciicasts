Instructor: [00:00] Hierarchical menu will help the user navigate through categories and subcategories easily. To make it work, it needs a properly formatted attribute. Let's type in a random query and look at the JSON response.

[00:13] Opening the first hit object, we can see that we have a categories key containing an array of strings.

![JSON response](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324960/transcript-images/browse-results-based-on-a-hierarchy-of-facets-hierarchicalmenu-in-instantsearch-js-JSON-response.jpg)

That won't be enough for the hierarchical menu prior to indexing. We will use this array to build another attribute, the `hierarchicalCategories`. This is not an array, but an object. The keys are the depth level of categories and subcategories.

[00:36] Note how in the sublevels, the root and parent levels are still present, separated by a special character, here the angle bracket. Now that we know the structure, let's add a widget. As always, the `container` in the HTML file first.

[00:53] In the `left-column`, we add a `div` with an `id` of `categories`.

#### index.html

```html
<main>
  <div id="left-column">
    <div class="filter-widgets" id="brands"></div>
    <div class="filter-widgets" id="categories"></div>
  </div>
  <div id="right-column">
    <div id="hits"></div>
  </div>
</main>
```

In our app.js file, we set up our widget, `search.addWidget`, `instantsearch.widgets.hierarchicalMenu`. The `container` is the `categories` id. Nothing new so far.

#### app.js

```js
search.addWidgets(
  instantsearch.widgets.hierarchicalMenu({
    container: "#categories"
  })
);

search.start();
```

[01:14] Now, for regular menus or refinement list, we would add an attribute name which would be a string. Here, it's a little different. The key is `attributes` with an S. The value must be an array of strings. Remembering the structure of the `hierarchicalCategories` attributes of our records, we can add the root level like so, `hierarchicalCategories.lvl0`.

```js
search.addWidgets(
  instantsearch.widgets.hierarchicalMenu({
    container: "#categories",
    attributes: ["hierarchicalCategories.lvl0"]
  })
);
```

[01:38] Refreshing the page, we now have the root-level categories displayed.

![Root-level categories](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/browse-results-based-on-a-hierarchy-of-facets-hierarchicalmenu-in-instantsearch-js-root-level-categories.jpg)

When clicking, it refines, but no subcategories show up. Let's add them. Copying the `lvl0`, pasting it twice, and changing to `lvl1` and `lvl2`. Now refreshing again.

```js
search.addWidgets(
  instantsearch.widgets.hierarchicalMenu({
    container: "#categories",
    attributes: [
      "hierarchicalCategories.lvl0",
      "hierarchicalCategories.lvl1",
      "hierarchicalCategories.lvl2"
    ]
  })
);
```

[01:57] When refining on the root-level category appliances, we now have the chart level showing.

![Sublevel categories](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324960/transcript-images/browse-results-based-on-a-hierarchy-of-facets-hierarchicalmenu-in-instantsearch-js-sub-level-categories.jpg)

If we refine further on dishwashers, the sublevel categories appear. We forgot to add the `header` of this widget, so `templates`, `header`, and `"Categories"`.

```js
search.addWidgets(
  instantsearch.widgets.hierarchicalMenu({
    container: "#categories",
    attributes: [
      "hierarchicalCategories.lvl0",
      "hierarchicalCategories.lvl1",
      "hierarchicalCategories.lvl2"
    ],
    templates: {
      header: "Categories"
    }
  })
);
```

We now have a hierarchical menu properly set up.

![Categories header added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/browse-results-based-on-a-hierarchy-of-facets-hierarchicalmenu-in-instantsearch-js-categories-header-added.jpg)
