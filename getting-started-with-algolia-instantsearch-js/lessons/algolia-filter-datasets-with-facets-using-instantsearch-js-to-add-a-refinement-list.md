Time to add our first refinement widget. Just before doing so, we have a little layout work to do so that everything displays nicely on the page.
 
On the `index.html` page, we'll split the `<main>` area into two parts,the left column that will contain the refinement widgets and the right column for the hits and pagination. We add a `<div>` with an `id` of `left-column` and a `<div>` with an `id` of `right-column`, and copy-pasting the `hits <div>` in the `right-column`.

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
      <div id="left-column"></div>
      <div id="right-column">
        <div id="hits"></div>
      </div>
    </main>

    <script src="app.js"></script>
  </body>
</html>
```

Now, back to the `left-column`, we can add our new widget container, a `<div>` with a `class` of `filter-widgets` and an `id` of `brands`. This is done. Let's head back to the `app.js` file to set up our new widget.

```html
<main>
  <div id="left-column"></div>
    <h5 class="filter-title">Brands</h5>
    <div class="filter-widgets" id="brands"></div>
  <div id="right-column">
    <div id="hits"></div>
  </div>
</main>
```

Same process as the previous widget. `search.addWidget`, `instantsearch.widgets`. We'll add a `refinementList` widget. `refinementList` allows us to filter on a given attribute, but unlike the menu widget, you can select multiple facets. This widget is typically displayed with check boxes. The `container` is the `brand id`.

#### app.js
```js
// add widget

search.addWidget( 
  instantsearch.widgets.refinementList({
    container: "#brands"
  })
);

search.start();
```

Now, if we refresh the page, we'll get an error. 

![Attribute required error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498343/transcript-images/algolia-filter-datasets-with-facets-using-instantsearch-js-to-add-a-refinement-list-uncaught-error-the-attribute-option-is-required.jpg)

Our `refinement` widget needs an attribute to filter on. We configure it with the `attribute` name key. Adding the `attribute` name for the value, you might have guessed it already, it's `brand`. Reloading.

```js
// add widget

search.addWidget( 
  instantsearch.widgets.refinementList({
    container: "#brands",
    attribute: "brand"
  })
);

search.start();
```

We now have a nice `refinementList` widget that allows us to select one or multiple brands. 

![RefinementList Widget](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498341/transcript-images/algolia-filter-datasets-with-facets-using-instantsearch-js-to-add-a-refinement-list-initial-setup-of-refinementist-shown-in-browser.jpg)

Another nice option of this widget is the ability it gives us to `search` for facet values. This comes very handy when a specific facet can have a large amount of different values, which makes it unpractical to display all of them.

```js
// add widget

search.addWidget( 
  instantsearch.widgets.refinementList({
    container: "#brands",
    attribute: "brand",
    searchable: true,
    searchablePlaceholder: "Search for brands"
  })
);

search.start();
```

To solve that, when the `search` for a facet value is enabled, it will display a small search field in the widget itself. 

A final point to cover for this widget is how the facets are sorted and displayed. By default, when none are selected, we can see that they are ordered by the number of results that would match this filter in descending order. If we refine on one value, it is then put at the top of the list.

If we had facets with a similar count, then the two would be ordered alphabetically. To make changes to that order, we can use the `sortBy` option, passing it an array of strings. Here, to reproduce the default behavior, we would add the following.

First, on top, the refine value, so `isRefined`. Then the `count` in descending order. Finally, `name` in ascending order from A to Z. When we reload the page, nothing changes.

```js
// add widget

search.addWidget( 
  instantsearch.widgets.refinementList({
    container: "#brands",
    attribute: "brand",
    searchable: true,
    searchablePlaceholder: "Search for brands"
    sortBy: ["isRefined, "count:desc", "name:asc"]
  })
);

search.start();
```

Now, let's tweak that setting to see how it behaves. If we remove the `isRefined` and reload the page, when we select a facet, it now stays in place. It's not pushed anymore to the top of the list. Adding the `name` in first position, the values are now ordered alphabetically.

```js
// add widget

search.addWidget( 
  instantsearch.widgets.refinementList({
    container: "#brands",
    attribute: "brand",
    searchable: true,
    searchablePlaceholder: "Search for brands"
    sortBy: ["name:asc", "count:desc"]
  })
);

search.start();
```
