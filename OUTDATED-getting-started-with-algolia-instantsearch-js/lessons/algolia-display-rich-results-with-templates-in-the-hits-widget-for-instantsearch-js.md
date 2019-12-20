Instructor: [00:00] Displaying relativism simply won't work for our users. We've previously seen how to use Mustache templates to access item values in our menu example. It's time to put that to good use for our hits.

[00:13] Let's show the product names first. Let's add the `item` template. As a value, we'll have a string that will hold two curly braces, where we will be able to access the `name` value.

#### app.js

```js
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: "{{name}}"
    }
  })
);
```

Good. We now have the names of every hit.

![Hits names displayed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-hits-names-displayed.jpg)

[00:29] Another way to build templates is by using a function, passing it the `item: data`, and writing it as a string literal. Let's modify our item to make it more interesting. Let's add an `image`, the `price`, the `description`, and have that on separate lines for now to see how it looks.

```js
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: data => `
      ${data.image}<br>
      ${data.name}<br>
      ${data.price}<br>
      ${data.description}<br>
    }
  })
);
```

Everything appears correctly, but that doesn't look great.

![Search query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324961/transcript-images/display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-search-query.jpg)

[00:53] Let's tweak those hits a little. The image value is a URL string. We can use it directly in an `image` tag as its `src` attribute. Then the name and price will be in a container `div` with a class of `hit-title`, the product name inside an `h4` tag, and the price in its own `div` with a class of `price`. We'll add the description in a `p` tag right below.

```js
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: data => `
      <img src="${data.image}"/>
        <div>
          <div class="hit-title">
            <h4>${data.name}</h4>
            <div class="price">${data.price}</div>
          </div>
        <p>${data.description}</p>
      </div>
      `
    }
  })
);
```

[01:16] Let's check our page. We now have some good-looking hits displayed. Of course, if we type in some queries, everything is updated.

![Hits display updated](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-hits-display-updated.jpg)

The final touch we can add to those hits, and a search best practice, is to provide some feedback when no results are found for a given query.

[01:34] When we type in a query that doesn't return any match, we only get a no result label. To make this a bit more user-friendly, we can leverage the `empty` template. Here, we'll simply add an `h1` suggesting another query.

```js
<p>${data.description}</p>
      </div>
      `,
      empty: "<h1>No results... please consider another query</h1>
    }
  })
);
```

This is pretty basic, but you can of course make something much more interesting as an original template.

![Query suggestion](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-query-suggestion.jpg)
