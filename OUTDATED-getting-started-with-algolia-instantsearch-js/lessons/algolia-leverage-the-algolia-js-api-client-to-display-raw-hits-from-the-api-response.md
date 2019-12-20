Instructor: [00:00] Let's play with the API response and display some results on the page. The first step is to import the Algolia search library into our HTML page.

#### index.html

```hmtl
<head>
    <title>Raw Hits</title>
    <!-- import algolia JS client here -->
    <script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
</head>
```

Then, in the body tag, we'll add an empty `div` tag with an `id` of `app` that we will use to inject the results.

```hmtl
<body>
    <div id="app"></div>
    <!-- script goes here -->
```

[00:17] Below, we will open a `script` tag. We'll first need a reference to our `app` div tag, so we can insert the results there once we have them. Now, we can initialize the client with the `Algolia search` object that is available to us from the library we've imported.

```hmtl
<!-- script goes here -->
<script>
    const app = document.gotElementById("app");
    const algolia = algoliasearch()
```

[00:33] We pass it an app ID and an API key and assign that to an `algolia` constant. Our client is now ready and can communicate with its Algolia application.

```hmtl
const app = document.gotElementById("app");
const algolia = algoliasearch("latency","b37781ea260eea196da5b3346d5ff4c9");
```

Search queries are made at the `index` level, so we need access to a specific index from our app.

[00:49] To initialize our index, we'll use the `initIndex` method, passing it the index name I want to target, here `instant_search`.

```html
const algolia = algoliasearch("latency","b37781ea260eea196da5b3346d5ff4c9");
const index = algolia.initIndex("instant_search");
```

The final step is to perform a call to our Algolia index and display results to the page.

[01:04] For that, we'll use the `search` method on our `index` object, passing it the query, here an empty string. It returns to us a promise that, once fulfilled, will give us access to the API response. Here, let's call it `results`.

```hmtl
const index = algolia.initIndex("instant_search");

index.search("").then(results=>{

})
```

[01:19] Once we have the response object, we can do pretty much what we want with it. Let's first simply `console.log` the result and see how it looks like.

```hmtl
index.search("").then(results=>{
    console.log(results);
})
```

Heading back to our index page, reloading, and opening the console tab, we can see that our response is properly logged.

![Response properly logged](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324961/transcript-images/leverage-the-algolia-js-api-client-to-display-raw-hits-from-the-api-response-properly-logged.jpg)

[01:38] Let's actually do something useful with our results. We'll simply display the name of each product in a paragraph tag. To do so, we'll iterate over the `hits` array of our results object and assign the resulting array to a `hits` constant.

```hmtl
index.search("").then(results=>{
    console.log(results);
    const hits = results.hits.map()
})
```

[01:54] Then, for each `hit`, we return a simple string literal that consists of the `p` tag holding the `hit.name`. Finally, we'll use our ref to our `app` div tag and insert in the `innerHTML` the `hits` array using `join`.

```html
index.search("").then(results=>{ console.log(results); const hits =
results.hits.map(hit => `
<p>${hit.name}</p>
`); })
```

Back to our browser, we can now see our product's name displayed on the page.

![Product's name displayed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/leverage-the-algolia-js-api-client-to-display-raw-hits-from-the-api-response-products-names-displayed.jpg)
