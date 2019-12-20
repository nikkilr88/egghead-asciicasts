Instructor: [00:01] Our scraper is currently executing `mutations` using the `add` relationship `mutations` provided by `neo4j-graphql-js`. Because these use the create clause under the hood, applying the same mutation multiple times will result in identical nodes or relationships being created.

![Identical nodes and realtionships created](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831938/transcript-images/create-custom-graphql-mutations-with-the-cypher-directive-in-neo4j-graphql-js-identical-nodes-relationships.png)

[00:20] The Cypher directive can help us solve this problem by allowing us to define custom Cypher queries in our `mutations`. For instance, ones using the `merge` clause. We can add some `mutations` to our `schema` for `node `creation using this Cypher directive.

#### index.js
![Mutations added to our schema](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831940/transcript-images/create-custom-graphql-mutations-with-the-cypher-directive-in-neo4j-graphql-js-mutations-added-to-schema.png)

![Mutations added to our schema](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/create-custom-graphql-mutations-with-the-cypher-directive-in-neo4j-graphql-js-mutations-added-to-schema-pt2.png)

[00:41] If we were interested in doing a little more work, we could define a more robust input type and create a more complex Cypher statement. Let's keep our implementation as simple as possible for now though.

[00:57] We can run the `node` creation section of the scraper we used before and still expect to have only one instance of each node. 

#### scrape.js
![Running node creation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831942/transcript-images/create-custom-graphql-mutations-with-the-cypher-directive-in-neo4j-graphql-js-running-node-creation.png)

![Graph created](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831938/transcript-images/create-custom-graphql-mutations-with-the-cypher-directive-in-neo4j-graphql-js-running-node-creations-pt2.png)

The relationship `mutations` can be overridden in the same way, unlike the generated relationship `mutations`. We'll just return the `from` part of each relationship to keep our Cypher statement simple.

#### index.js
![Mutations being overridden](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831941/transcript-images/create-custom-graphql-mutations-with-the-cypher-directive-in-neo4j-graphql-js-mutations-being-overridden.png)

[01:28] Because the output data type is changing, we'll need to update the scraper script to return the correct properties. We can run our scraper as many times as we'd like and still have an intact and coherent graph after every run.

![Custom graph created with GraphQL](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/create-custom-graphql-mutations-with-the-cypher-directive-in-neo4j-graphql-js-custom-graph-created.png)
