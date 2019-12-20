Here, when we type this query, it's not instantly obvious why those results are there. By looking long enough, we can finally spot that the match occurred in the description. This is not optimal.

To fight that issue, a simple way to make results' relevance of use to your user is to implement highlighting. The goal is simple. Style differently parts of the hits that are matching the query so that they stand out from the rest of the hit's information.

Thankfully, Algolia does a big part of the job for us. Let's take a look at the JSON response, here typing A. For each query we get, in addition to hits and facet, the `_highlightResult` object. Highlighting can be enabled on a specific subset of searchable attributes. By default, it's activated on all of them.

![highlightResult object in JSON response](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498343/transcript-images/algolia-highlight-keywords-in-query-results-using-the-instantsearch-js-hits-widget-highlightResult-object-JSON-response.jpg)

Here in `_highlightResult`, we see all of our searchable attributes, `brand`, `categories`, `description`, `name`, and `type`. Let's look at how a single attribute is composed. Opening the `name` attribute, here we get four elements.

The one that really matters to us for the moment is the `value`. This is where the searchable attribute's initial value will be returned, but modified with the `ais-highlight` markers enclosing the matching parts. Those markers are then replaced by the library with a tag of your choosing. By default, the `<mark>` tag. We'll keep the default. 

To display highlighted results, there's a couple of things we need to do. First, we need to create a CSS rule for our `<mark>` tag. This has already been done in our `style.css` file. Let's first highlight the `name`. Instead of accessing them directly through the attributes, we'll leverage the `instantsearch.highlight` method, passing in the `attribute` and the `hit: data`.

#### app.js
```js
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits"
    templates: {
      item: data => `
        <img src="${data.image}"/>
        <div>
          <div class="hit-title">
          <h4>${instantsearch.highlight({
            attribute: "name", 
            hit: data
          })}</h4>
          <div class="price">$${data.price}</div>
        </div>
        <p>${data.description}</p>
      </div>
      `,
      empty: "<h1>No results... Please consider another query</h1>"
    }
  })
);

search.start();
```

Saving and reloading the page. Now typing a few queries. We have highlighting visible on the name. We can now tell immediately what results are matching and where. 

Let's repeat the same process for the `description`. 

```js
<p>${instantsearch.highlight({
  attribute: "description", 
  hit: data
})}</p>
```

Now we have a search page with fully functional highighting, simply by tweaking a little of our existing template. 