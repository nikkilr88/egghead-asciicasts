Displaying relativism simply won't work for our users. A simple way to render `hits` is to use the Mustache template system. 

Let's show the product names first. Let's add the `item` template. As a value, we'll have a string that will hold two curly braces, where we will be able to access the `name` value. Good. We now have the names of every `hit`.

#### app.js
```js
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits"
    templates: { 
      item: "{{name}}"
    }
  })
);
``` 

Another way to build templates is by using a function, passing it the `item: data`, and writing it as a string literal. Let's modify our item to make it more interesting. Let's add an `image`, the `price`, the `description`, and have that on separate lines for now to see how it looks. 

```js
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits"
    templates: {
      item: data => `
        ${data.image}<br>
        ${data.name}<br>
        ${data.price}<br>
        ${data.description}<br>
      `
    }
  })
);
```

Everything appears correctly, but that doesn't look great.

![Hits displayed in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498342/transcript-images/algolia-display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-item-data-function-hits-displaying-in-browser.jpg)

Let's tweak those `hits` a little. The `image` value is a URL string. We can use it directly in an `<img>` tag as its source attribute. Then the `name` and `price` will be in a container `<div>` with a class of `hit-title`, the product `name` inside an `<h4>` tag, and the `price` in its own `<div>` with a `class` of `price`. We'll add the `description` in a `<p>` tag right below.

```js
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits"
    templates: {
      item: data => `
        <img src="${data.image}" />
        <div>
          <div class="hit-title">
          <h4>
            ${data.name}
          </h4>
          <div class="price">$${data.price}</div>
        </div>
        <p>${data.description}</p>
      </div>
      `
    }
  })
);
```

Let's check our page. We now have some good-looking hits displayed. Of course, if we type in some queries, everything is updated. The final touch we can add to those hits, and a search best practice, is to provide some feedback when no results are found for a given query.

![Hits now show image, price & description](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498343/transcript-images/algolia-display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-updated-hits-shown-with-images-prices-and-descriptions.jpg)

When we type in a query that doesn't return any match, we only get a "no result" label. To make this a bit more user-friendly, we can leverage the `empty` template. Here, we'll simply add an `<h1>` suggesting another `query`. 

```js
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits"
    templates: {
      item: data => `
        <img src="${data.image}" />
        <div>
          <div class="hit-title">
          <h4>
            ${data.name}
          </h4>
          <div class="price">$${data.price}</div>
        </div>
        <p>${data.description}</p>
      </div>
      `,
      empty:"<h1>No results... Please consider another query</h1>"
    }
  })
);

search.start();
```

This is pretty basic, but you can of course make something much more interesting as an original template.

!["No results... Please consider another query"](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498339/transcript-images/algolia-display-rich-results-with-templates-in-the-hits-widget-for-instantsearch-js-empty-template-suggest-a-new-query.jpg)