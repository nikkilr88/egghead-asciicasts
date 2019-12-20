When a user searches on our website or app, it's always good to provide instant feedback on what is going on. The stats widget adds a small layer of information about queries that are made. It's not a critical widget, but it does bring a bit of value without any configuration necessary.

To add it, as always, we first create the container in the `index.html`, giving it an `id` of `stats`. 

#### index.html
```html
<body>
  <header>
    <div id="searchbox"></div>
    <div id="stats"></div>
  </header>
```

Then, in the `app.js` config, the same process as for all widgets -- `search.addWidget`, `instantsearch.widgets`. We want the `stats` widget. We provide it the `container`, the ID `stats`. Then we reload the page.

#### app.js
```js
// add widget
search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats"
  })
);

search.start();
```

Right below the search bar, we now have displayed the total number of hits for the current query and how much time it took for the server to process that query, in milliseconds.

![Stats Widget Displayed in Browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498342/transcript-images/algolia-inform-users-about-the-current-result-set-with-instantsearch-js-stats-widget-displayed-in-browser.jpg)