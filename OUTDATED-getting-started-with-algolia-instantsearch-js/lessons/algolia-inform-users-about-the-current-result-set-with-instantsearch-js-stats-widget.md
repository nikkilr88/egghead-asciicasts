Instructor: [00:00] When a user searches on our website or app, it's always good to provide instant feedback on what is going on. The `stats` widget adds a small layer of information about queries that are made. It's not a critical widget, but it does bring a bit of value without any configuration necessary.

[00:17] To add it, as always, we first create the container in the HTML page, giving it an `id` of `stats`.

#### index.html

```js
<header>
    <div id="searchbox"></div>
    <div id="stats"></div>
</header>

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

Then, in the `app.js` config, the same process as for all widgets. `search.addWidget`, `instantsearch.widgets`. We want the `stats` widget. We provided the `container`, the id `"#stats"`.

#### app.js

```js
search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    conatiner: "#stats"
  })
);

search.start();
```

[00:38] Then we reload the page. Right below the search bar, we now have displayed the total number of hits for the current query, and how much time it took for the server to process that query, in milliseconds.

![Stats widget added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/inform-users-about-the-current-result-set-with-instantsearch-js-stats-widget-stats-widget-added.jpg)
