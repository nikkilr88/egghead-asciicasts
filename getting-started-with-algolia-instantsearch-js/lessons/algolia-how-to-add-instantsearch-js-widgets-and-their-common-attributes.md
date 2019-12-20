In order to demo how to add widgets and their generic parameters, we're going to create a demi-menu that will not be part of the final project, but useful to understand the common mechanisms. Let's start by adding a `<div>` container to the HTML page and give it an `id` of `test-widget`. That's where our widget will be injected.

#### index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>InstantSearch for Vanilla JS</title>
    <!-- import algolia search here -->
    <script src="https://cdn.jsdelivr.net/npm/algoliasearch@3.32/dist/algoliasearchLite.min.js"></script>

    <!-- import algolia Instant JS library here -->
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@3.1.1/dist/instantsearch.production.min.js"></script>

    <!-- import algolia Instant JS CSS styling here --> 
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.0/themes/reset-min.css"
    />

    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>

  <body>
    <!-- add a div container for the widget here -->
    <div id="test-widget"></div>
    <script src="app.js"></script>
  </body>
</html>
```

Now, we move to the `app.js` file. We'll first declare a constant named `testWidget` that will hold our widget. We now need to create it. Widgets are accessible from the `instantsearch.widgets`, then the widget of your choice. Here, we'll use the `menu`.

#### app.js
```js
// initialize instantsearch
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b334d5ff4c9'
);

const search = instantsearch({
  indexName: "instant_search",
  searchClient
});

// add widget
const testWidget = instantsearch.widgets.menu()

search.start();
```

Then we need to configure it, passing it a configuration object. Configurable attributes of widgets can be different depending on the widget's purpose. For this video, we'll focus on the ones that are shared across most of them. We will discover the others as we implement them.

The first attribute to consider is the `container`. The `container` represents the location where the widget will be rendered in your HTML page. Its value can either be a CSS selector or a DOM element. When using a CSS selector, it's important that it identifies a single element. Otherwise, the widget factory will use the first one returned by the browser,  which may be unpredictable. Here, in our case, we'll add a string with `#test-widget` that refers to the `<div>` with an `id` of `test-widget` we've added before.

```js
// initialize instantsearch
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b334d5ff4c9'
);

const search = instantsearch({
  indexName: "instant_search",
  searchClient
});

// add widget
const testWidget = instantsearch.widgets.menu({
  container:"#test-widget",

})

search.start();
```

Then we need to add the `attributeName` for this widget. `attributeName` is common to all widgets targeting a facet or a filter attribute. In our e-commerce data set, each record contains a `type` attribute. Let's filter on `type`.

```js
// initialize instantsearch
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b334d5ff4c9'
);

const search = instantsearch({
  indexName: "instant_search",
  searchClient
});

// add widget
const testWidget = instantsearch.widgets.menu({
  container:"#test-widget",
  attribute: "type"
});

search.start();
```

Now that we have the `container` and the `attribute`, that's enough for the `menu` widget to do its job. Last step before our widget can be displayed on-screen, we need to pass our `testWidget` constant to the `search.addWidget` method. 

```js
// initialize instantsearch
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b334d5ff4c9'
);

const search = instantsearch({
  indexName: "instant_search",
  searchClient
});

// add widget
const testWidget = instantsearch.widgets.menu({
  container:"#test-widget",
  attribute: "type"
});

search.addWidget(testWidget);

search.start();
```

Refreshing the index page, we can now see that our widget displays correctly.

![Widget Displaying Correctly in Index Page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498340/transcript-images/algolia-how-to-add-instantsearch-js-widgets-and-their-common-attributes-widget-displaying-correctly-in-index-page.jpg)

The final note on adding widgets, the shorter way to write it is to omit the constant declaration and moving the widgets creation directly inside the addWidget's method, like so. 

```js
// initialize instantsearch
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b334d5ff4c9'
);

const search = instantsearch({
  indexName: "instant_search",
  searchClient
});

// add widget
search.addWidget(
  instantsearch.widgets.menu({
    container:"#test-widget",
    attribute: "type"
  })
);

search.start();
```