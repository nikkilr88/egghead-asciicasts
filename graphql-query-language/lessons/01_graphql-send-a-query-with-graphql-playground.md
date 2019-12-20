Instructor: [00:00] To get started sending GraphQL queries, we'll go to `https://pet-library.moonhighway.com`. When we go to this route, a tool called GraphQL Playground will pop up in the browser.

[00:12] GraphQL Playground is an in-browser IDE that lets you send queries to GraphQL endpoints. The endpoint for the pet library is here in the center of the screen. With GraphQL, there's only one endpoint, so I need to specify what data I want by writing a query.

[00:27] I'll write the query on the left-hand side of the screen starting with the `query` keyword. I am going to ask for `totalPets`. How many pets are at the pet library?

```graphql
query {
  totalPets
}
```

[00:35] When I click play, the data I requested will be returned to me as JSON. Notice that the shape of the query matches the shape of the response exactly. All of the fields are the same.

## Output

```graphql
{
  "data": {
    "totalPets": 25
  }
}
```

[00:46] We've sent our first query using GraphQL Playground. On the left, I wrote a `query` to describe what data I want to get from the pet library API. Then I click play which sends an http request, the post request to our GraphQL endpoint. I get the data back as JSON.
