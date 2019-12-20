Instructor: [00:00] Time to add our first refinement widget. Just before doing so, we have a little layout work to do so that everything displays nicely on the page.

[00:09] On the `index.html` page, we'll split the main area into two parts, the left column that will contain the refinement widgets and the right column for the hits and pagination. We add a `div` with an `id` of `left-column` and a `div` with an `id` of `right-column`, and copy-pasting the hits div in the right column.

#### index.hmtl

```html
<main>
    <div id="left-column"></div>
    <div id="right-column"></div>
        <div id="hits"></div>
    </div>
```

[00:31] Now, back to the left column, we can add our new widget container, a `div` with a class of `filter-widgets` and an `id` of `brand`.

```html
<main>
    <div id="left-column">
        <div class="filter-widgets" id="brands"></div>
    </div>
    <div id="right-column"></div>
        <div id="hits"></div>
    </div>
```

This is done. Let's head back to the `app.js` file to set up our new widget.

[00:45] Same process as the previous widget. `search.addWidget`, `instantsearch.widgets`. We'll add a `refinementList` widget. Refinement list allows us to filter on a given attribute, but unlike the menu widget, you can select multiple facets. This widget is typically displayed with check boxes.

#### app.js

```js
search.addWidget(instantsearch.widgets.refinementlist({}));

search.start;
```

[01:05] The `container` is the `"#brands"` id.

```js
search.addWidget(
  instantsearch.widgets.refinementlist({
    container: "#brands"
  })
);
```

Now, if we refresh the page, we'll get an error. Our refinement widget needs an attribute to filter on.

![Error message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/filter-datasets-with-facets-using-instantsearch-js-to-add-a-refinement-list-error-message.jpg)

We configure it with the `attributeName` key. Adding the attribute name for the value, you might have guessed it already, it's `brand`. Reloading.

```js
search.addWidget(
 instantsearch.widgets.refinementlist({
   container: "#brands"
   attributeName: "brand"
 })
);
```

[01:24] We now have a nice refinement list widget that allows us to select one or multiple brands.

![Refinement list widget](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/filter-datasets-with-facets-using-instantsearch-js-to-add-a-refinement-list-widget.jpg)

It's missing a header to let the user know what the refinement is about, so `templates`, `header`, and `"Brands"`.

```js
search.addWidget(
  instantsearch.widgets.refinementlist({
    container: "#brands"
    attributeName: "brand"
    templates: {
      header: "Brands"
    }
  })
);
```

That's better.

![Brand header added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/filter-datasets-with-facets-using-instantsearch-js-to-add-a-refinement-list-header-added.jpg)

[01:41] Another nice option of this widget is the ability it gives us to search for facet values. This comes very handy when a specific facet can have a large amount of different values, which makes it unpractical to display all of them.

[01:54] To solve that, when the search for a facet value is enabled, it will display a small search field in the widget itself. Let's add it, `searchForFacetValues` key, and we set it to `true`. Saving and reloading.

```js
search.addWidget(
  instantsearch.widgets.refinementlist({
    container: "#brands"
    attributeName: "brand"
    templates: {
      header: "Brands"
    },
    searchForFacetValues: true
  })
);
```

[02:08] We can now see the new search input. Let's type in A-M-A-Z, for instance. We now have facet values matching the query and even have some nice highlighting on them.

![New search input added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324960/transcript-images/filter-datasets-with-facets-using-instantsearch-js-to-add-a-refinement-list-new-search-input.jpg)

Pretty cool. To make it even more user friendly, we can specify a placeholder for the input. Let's add `Search for brands`.

```js
search.addWidget(
  instantsearch.widgets.refinementlist({
    container: "#brands"
    attributeName: "brand"
    templates: {
      header: "Brands"
    },
    searchForFacetValues: { placeholder: "Search for brands" }
  })
);
```

[02:32] A final point to cover for this widget is how the facets are sorted and displayed. By default, when none are selected, we can see that they are ordered by the number of results that would match this filter in descending order. If we refine on one value, it is then put at the top of the list.

[02:52] If we had facets with a similar count, then the two would be ordered alphabetically. To make changes to that order, we can use the `sortBy` option, passing it an array of strings. Here, to reproduce the default behavior, we would add the following.

```js
search.addWidget(
  instantsearch.widgets.refinementlist({
    container: "#brands"
    attributeName: "brand"
    templates: {
      header: "Brands"
    },
    searchForFacetValues: { placeholder: "Search for brands" }
    sortBy:["isRefined","count:desc","name:asc"]
  })
);
```

[03:06] First, on top, the refine value, so `isRefined`. Then the `count` in descending order. Finally, `name` in descending order from A to Z. When we reload the page, nothing changes.

[03:18] Now, let's tweak that setting to see how it behaves. If we remove the `isRefined` and reload the page, when we select a facet, it now stays in place. It's not pushed anymore to the top of the list. Adding the `name` in first position, the values are now ordered alphabetically.

```js
search.addWidget(
  instantsearch.widgets.refinementlist({
    container: "#brands"
    attributeName: "brand"
    templates: {
      header: "Brands"
    },
    searchForFacetValues: { placeholder: "Search for brands" }
    sortBy:["name:asc", "count:desc"]
  })
);
```

![Values are ordered alphabetically](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/filter-datasets-with-facets-using-instantsearch-js-to-add-a-refinement-list-values-are-in-order.jpg)
