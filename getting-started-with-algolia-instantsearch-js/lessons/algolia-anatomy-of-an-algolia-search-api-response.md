Instructor: [00:00] This is the final state of the project we are going to be building throughout this course. As you can see, it's a simple instant search page containing a variety of widgets.

![final state of project](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324960/transcript-images/algolia-anatomy-of-an-algolia-search-api-response-final-project-state.jpg)

[00:11] In order to display all that, the instant search library interacts with Algolia servers, sending queries and receiving responses. With each API response comes all the information necessary for instant search to build all those widgets. That's what we'll dig into.

[00:27] To take out what the response looks like, let's open the developer console, click on the network tab, filter on XHR. Then we'll simply perform a query on the website. This is what the API response looks like. It's a simple JSON object containing a dozen attributes referring to the hits, the facets, the query, and some stats.

![Browser query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/anatomy-of-an-algolia-search-api-response-browser-query.jpg)

[00:52] The main one is the hits array. This is what is holding the actual hits that will be displayed on-screen. Here, the setting is set to send 20 hits per page.

![Hits array](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/anatomy-of-an-algolia-search-api-response-hits-array.jpg)

[01:02] Let's open the first one. What it contains will obviously depend on how your records are structured and what you've set as retrievable attributes. Here, to name a few, we have a mix of arrays for categories, strings for brand or name, numeric values for popularity, price, and rating, and a Boolean for free shipping.

![Arrays Categories](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/anatomy-of-an-algolia-search-api-response-array-categories.jpg)

[01:25] If highlighting is enabling, it is by default. For each results matching the query, we will return the records attribute where it matched in this highlight result object. We will cover highlighting in more details in the following video.

[01:40] If enabled, snippeting works in a similar fashion to retrieve only part of a long text attribute. It is not in this example.

[01:49] Other notable attributes from our API response are number hits, number of page, hits per page, and page. That gives us information about the volume of hits for that query. It is helpful for pagination, for instance. Processing time and number hits are also used for stats.

[02:08] The query attribute refers to the actual text query, whereas params contains the whole query and refinements passed to the engine to retrieve those results. Finally, we have attributes related to facets that are returned for each query as well. These gives us the available facets and some stats. That's pretty much all we need to build a nice search front end.

![Query attribute](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324959/transcript-images/anatomy-of-an-algolia-search-api-response-query-attribute.jpg)
