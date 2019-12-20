In this lesson, we want to extend our application to allow users starring their favorite recipes. Therefore, we want to add an `isStarred` field to the recipe. Since our schema doesn't support this field, we plan to keep this information solely on the client. Namely, store it in a local storage.

To query a field only on the client, we can leverage the `@client` decorator, and add it to a field in a query or a mutation. 

#### src/recipesQuery.js
```js
import gql from "graphql-tag";

export default gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
      isStarred @client
    }
  }
`;
```

Once added, this field is never queried on the remote endpoint, yet there is no resolver with `resolveTheField`.

We need to provide one. In our `app.js` file, we `const resolvers` object, and for the type, `recipe`, add an `isStarred` resolver. Temporarily `return` the value `false` for all recipes. 

#### src/app.js
```js
const resolvers = {
  Recipe: {
    isStarred: parent => {
      // return false;
    }
  }
}
```

We then can use the resolver's object, and pass it into the `clientState` property, during the `ApolloClient` initialization.

```js
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  clientState: {
    resolvers
  }
});
```


This is all we need to already being able to retrieve the `isStarred` value in our `recipes.js` list. We render a star next to each of the titles, and the `color` should change, depending on the state. `orange`, if the recipe is starred, and `grey` if it's not.

#### src/recipes.js
```js
return (
  <ul>
    {data.recipes.map(({ id, title, isStarred }) => (
      <li key={id}>
        {title}
        < span
          style={{ color: isStarred ?"orange" : "grey"}}
        >
          * 
        </span>
      </li>
```

Let's refresh the page, and verify that all stars are inactive. Great. 

![image of all the inactive stars](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953768/transcript-images/react-manage-local-state-using-apollo-by-extending-the-graphql-schema-on-the-client-inactivestars.png)

Next up, we need a mutation, allowing us to update the `isStarred` field of a recipe. Therefore, we extend our client-side resolvers with an `updateRecipeStarred` mutation. Our plan is to store a starred recipes array in the local storage. Before we update it, we retrieve the list.

#### src/app.js
```js
Mutation: {
  updateRecipeStarred: (_, variables) => {
    const starredRecipes =
      JSON.parse(localStorage.getItem("starredRecipes"))
  }
}
```

In case the variable `isStarred` is set to true, we append the current `ID`. In case it's set to `false`, we filled out existing `recipeId`. 

```js
Mutation: {
  updateRecipeStarred: (_, variables) => {
    const starredRecipes =
      JSON.parse(localStorage.getItem("starredRecipes"))
    if (variables.isStarred) {
      localStorage.setItem(
        "starredRecipes",
          JSON.stringify(starredRecipes.concat([variables.id]))
        );
  } else {
     localStorage.setItem(
        "starredRecipes",
          JSON.stringify(
          starredRecipes.filter(recipeId => recipeId !== variables.id)
          )
        );
      }
}
```

In the end, we return an object with the `__typename` and the `isStarred` value. This is useful in case a developer wants to query the updated value. 

```js
Mutation: {
  updateRecipeStarred: (_, variables, { getCacheKey, cache }) => {
    ...
    
    return {
      __typename: "Recipe",
      isStarred: variables.isStarred
    };
  }
}
```
Since we now have the mutation, and know how we store the starred recipes, you also can update the retrieving resolver. In the resolver, we check if the `starredRecipes` array includes the ID of the current `parent.id` recipe, and `return` the result. 

```js
const resolvers = {
  Recipe: {
    isStarred: parent => {
      const starredRecipes =
        JSON.parse(localStorage.getItem("starredRecipes")) || [];
      return starredRecipes.includes(parent.id);
    }
  },
```
At this point, we have everything we need to start using our mutation. Therefore, we add a new `mutation` to the `recipes.js` file.

The `mutation` accepts two variables, `ID` and `isStarred`. This matches what we implemented in our mutation. In our case, we won't query any data from the mutation, but we have to append the `@client` decorator to make sure this mutation is resolved only on the client. 

#### recipes.js
```js
import recipesQuery from "./recipesQuery";
import gql from "graphql-tag";

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;
```

After that, we import the `Mutation` component and wrap the star span with it. 

```js
import { Query, Mutation } from "react-apollo";
```

Then we pass in our `updateRecipeStarredMutation`. Since this mutation affects the result of our recipe query, we provide the two `refetchQeries`. 

```js
<Mutation
  mutation={updateRecipeStarredMutation}
  refetchQueries={[
    {
      query: recipesQuery,
      variables: { vegetarian: false }
      },
      {
      query: recipesQuery,
      variables: { vegetarian: true }
  }
  ]}
  awaitRefetchQueries={true}
>
```
Once again, set `awaitRefetchQueries` to `true`. After that, we replace the `<span>` with a `<button>` and add an `onClick` handler. Once clicked, we invoke the mutation with the current recipe `ID` and the reverse `!isStarred` value.

```js
<Mutation
  mutation={updateRecipeStarredMutation}
  refetchQueries={[
   ...
  ]}
  awaitRefetchQueries={true}
>
  {(updateRecipeStarred, { loading, error }) => (
    <button
      className="star-btn"
      style={{...}}
      onClick={() =>
        updateRecipeStarred({
          variables: {
            id,
            isStarred: !isStarred
          }
        })
      }
    >
      ★
    </button>
  )}
</Mutation>
```

Next, we add a class named `star-btn`. To make sure the star looks actually nice, I prepared this class name before the lesson, and added the stars to the `index.html` file. 

#### index.html
```html
<style>
  .star-btn {
    position: absolute;
    padding: 0;
    margin: 0 0 0 0.3rem;
    height: 1.4rem;        line-height: 1.4rem;
    background: none;
    border: 0;
    font-size: 1rem;
    outline: 0
  }
  ...
</style>
```

Depending on the `loading` state, we add in `animation`. Last, but not least, render text in case an `error` occurred. Now, we should be able to start our recipes.

```js
<Mutation 
  ...
>
  ...

  <button
      onClick={() =>
        updateRecipeStarred({
          variables: {
            id,
            isStarred: !isStarred
          }
      })
  }
  className="star-btn"
  style={{
    color: isStarred ? "orange" : "grey",
    animation: loading ? 
      "inflate 0.7s ease infinite alternate" : 
      "none"
    }}
  > 
    ★ {error && "Failed to update"}
  </button>
</Mutation>
```

We refresh the page and give it a try. Voila, works like a charm. 

![image of the application working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953768/transcript-images/react-manage-local-state-using-apollo-by-extending-the-graphql-schema-on-the-client-active.png)

It even works after checking the vegetarian filter. 

![image of the application working with vegetarian filter](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953766/transcript-images/react-manage-local-state-using-apollo-by-extending-the-graphql-schema-on-the-client-activewithfilter.png)

To verify that our stars were cached in the local storage, we refresh the page once again. Great, our two recipes are still starred.