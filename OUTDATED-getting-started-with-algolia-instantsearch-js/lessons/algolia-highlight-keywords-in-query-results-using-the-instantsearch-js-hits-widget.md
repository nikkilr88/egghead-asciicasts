Instructor: [00:00] Here, when we type this query, it's not instantly obvious why those results are there. By looking long enough, we can finally spot that the match occurred in the description. This is not optimal.

[00:12] To fight that issue, a simple way to make results' relevance of use to your user is to implement highlighting. The goal is simple. Style differently parts of the hits that are matching the query so that they stand out from the rest of the hit's information.

[00:27] Thankfully, Algolia does a big part of the job for us. Let's take a look at the JSON response, here typing `a`. For each query we get, in addition to hits and facet, we'll highlightResult object. Highlighting can be enabled on a specific subset of searchable attributes. By default, it's activated on all of them.

[00:48] Here, we see all of our searchable attributes, `brand`, `categories`, `description`, `name`, and `type`.

![Searchable attributes](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-searchable-attributes.jpg)

Let's look at how a single attribute is composed. Opening the `name` attribute, here we get four elements.

[01:02] The one that really matters to us for the moment is the `value`. This is where the searchable attribute's initial value will be returned, but modified with tags enclosing the matching parts.

![Name attribute](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-name-attribute.jpg)

By default, these tags are em tags. This is customizable in the index settings.

[01:21] To display highlighted results, there's a couple of things we need to do. First, we need to create a CSS rule for em tag. This has already been done in our `style.css` file. Instead of accessing the name value through data.name, we'll access it through the `data._highlightResult.name.value`. Don't forget that is the `value` attribute of the name that we need to access.

#### app.js

```js
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: data => `
      <img src="${data.image}"/>
        <div>
          <div class="hit-title">
            <h4>${data._highlightResult.name.value}</h4>
            <div class="price">${data.price}</div>
          </div>
        <p>${data.description}</p>
      </div>
      `
    }
  })
);
```

[01:46] Saving and reloading the page. Now typing a few queries. We have highlighting visible on the name. We can now tell immediately what results are matching and where.

![Highlighting visible](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-highlighting-visible.jpg)

Let's repeat the same process for the `description`.

```js
     <h4>${data._highlightResult.name.value}</h4>
     <div class="price">${data.price}</div>
   </div>
 <p>${data._highlightResult.description.value}</p>
```

Now, we have a search page with fully functional highlighting simply by tweaking a little our existing template.

![Search page with full highlighting](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-search-page-highlight.jpg)
