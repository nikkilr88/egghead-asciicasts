Instructor: [00:01] Let's start with a clean graph. Rather than take the next step and insert some data manually, we're going to leverage the mutations that `neo4j-graphql-js` has put together for us. We can spin up our API and take a look in the `schema` tab to see what's available to us.

[00:16] In here, we'll find a set of `create` `node` type, `delete` `node` type, `add` relationship, and `remove` relationship mutations. Let's take a look at fetching some data from Swappy directly and programmatically creating these nodes and relationships through our API's mutations.

[00:32] We'll use Axios to make res `request`s against Swappy and `GraphQL` `request`s to make `GraphQL` queries and mutations against our API. Let's start by fetching the first of a list of `people` from Swappy. In the same way, let's fetch the person's `homeworld` and their first film and `species`. Can a person have more than one `species`?
#### scrape.js
```js
const { get } = require('axios')
const { request } = require('graphql-request')

const api = 'http://0.0.0.0:8000'
const swapi = 'https://swapi.co/api'

async function main () {
  const { data: { results: [ person ] } } = await get(swapi + '/people')
  const { data: homeworld } = await get(person.homeworld)
  const { data: species } = await get(person.species[0])
  const { data: film } = await get(person.films[0])

  return Promise.all([ person, homeworld, species, films ])
}

main()
  .then(console.log)
  .catch(console.error)
```

![ GraphQL queries](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/egghead-create-data-in-neo4j-through-a-graphql-api-GraphQL-queries.png)

[00:58] Great. We've got all the data we need. Let's take a look at our `schema `tab and see what we need to fulfill or `create` `node` type mutations. It looks like all we'll need is the `name` or `title` properties. Let's write these using `GraphQL` `request`. The `request` function accepts a `GraphQL` endpoint, a query or mutation, and some optional input params.

```js
const { get } = require('axios')
const { request } = require('graphql-request')

const api = 'http://0.0.0.0:8000'
const swapi = 'https://swapi.co/api'

async function main () {
  const { data: { results: [ person ] } } = await get(swapi + '/people')
  const { data: homeworld } = await get(person.homeworld)
  const { data: species } = await get(person.species[0])
  const { data: film } = await get(person.films[0])

  return Promise.all([ person, homeworld, species, films ])
}

const createPerson = ({ name }) => request(api, `mutation  createPerson($name: String) {
  CreatePerson(name: $name) { name }
}`, { name })

const createPlanet = ({ name }) => request(api, `mutation  createPlanet($name: String) {
  CreatePlanet(name: $name) { name }
}`, { name })

const createSpecies = ({ name }) => request(api, `mutation  createSpecies($name: String) {
  CreateSpecies name: $name) { name }
}`, { name })

const createFilm = ({ title }) => request(api, `mutation  createFilm($title: String) {
  CreateFilm(name: $title) { title }
}`, { title })
```

![Name & Titles added too GraphQL query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831940/transcript-images/egghead-create-data-in-neo4j-through-a-graphql-api-name-titles-added-too-GraphQL-queries.png)

[01:25] Let's apply the data we got from Swappy to these functions in main, start our API, and run the code to execute these mutations. 

![Data from swappy added to GraphQL query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/egghead-create-data-in-neo4j-through-a-graphql-api-data.from-swappy-added.png)

It looks like these were all created successfully.

![Mutations executed and created](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831940/transcript-images/egghead-create-data-in-neo4j-through-a-graphql-api-mutations-created.png)

Let's go back to the GraphQL playground and see what we can get back.

![GraphQL playground](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/create-data-in-neo4j-through-a-graphql-api.png)

[01:47] This is a good start, but still lacking are the relationships between these nodes. Let's take a look at the `schema `tab to see what we need to fulfill our add `relationship` mutations. It looks like these need a from and to that are defined in the input types that were generated for us. These input types need a `name` or a `title` property.

![Name & Title properties added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/create-data-in-neo4j-through-a-graphql-api-name-title-properties.png)

[02:10] Let's add some GraphQL `request` functions to add some relationships.

![GraphQL request functions added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/create-data-in-neo4j-through-a-graphql-api-request-functions-added.png)

We'll also comment out our earlier `create` `node` calls to avoid creating these nodes again. These functions are ripe for abstraction, but we'll just call that a take-home exercise.
 
![Commenting out Nodes](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/create-data-in-neo4j-through-a-graphql-api-commenting-nodes-out.png)
 
Now, we can call our mutations as our results and see what we get back.

![Mutations changed to results](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/create-data-in-neo4j-through-a-graphql-api-mutations-results.png)

[02:37] Fantastic. It looks like all five relationships were created. We can even see the statements that were executed against Neo4j in our API output. Let's go back to the playground and see if we can get back all of our nested data.

![Relationships created](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/create-data-in-neo4j-through-a-graphql-api-relationships-created.png)

[02:53] Amazing. There's one huge caveat in these mutations, relating to the vocabulary in Neo4j's Cypher query language. As we can see in our API output, these mutations all use the `create` clause. Executing a single `create` statement multiple times will result in the same `node` or `relationship` being created over and over.

[03:17] This is most definitely not what we want. We'll need to learn how to `create` our own custom mutations to support the merge clause. First though, we'll need to learn how to use the Cypher directive in our schemas.

![Luke Skywalker graph created](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831938/transcript-images/create-data-in-neo4j-through-a-graphql-api-Luke-graph.png)
