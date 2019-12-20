For this lesson, I already added an `AddRecipe` component to our application. It contains two input fields, one for the title and one to indicate if the recipe is a vegetarian recipe. Let's add a pumpkin soup.

![image showing the pumpkin soup being entered into the form](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953767/transcript-images/react-update-data-using-the-apollo-mutation-component-initialform.png)

To simplify this tutorial, we don't provide an instructions text input, which would make a lot of sense for our recipe. If you click on the add button, nothing will happen at the moment, other than the fields being reset.

![image showing the forms reset](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953768/transcript-images/react-update-data-using-the-apollo-mutation-component-formreset.png)

Let's fix this by adding a mutation to send the new recipe information to our GraphQL back end. At first, we need to `import { mutation } from "react-apollo"`. 

#### src/AddRecipe.js
```js
import { mutation } from "react-apollo";
```

Then we wrap our form with this component. It has one mandatory prop, which is `mutation`. In our case, we want to add an `addRecipeMutation`. 

```js
render() {
  return (
    <Mutation mutation={addRecipeMutation}>
    ...
    </mutation>
  )
}
```

Since we yet don't have such a mutation, we need to create it. Like with queries, we're going to use the `gql` template tag.

```js
import gql from "graphql-tag"
```

We create the name mutation, since it allows us to declare the arguments, which in our case is a `recipe` of type `recipeInput`. Using the exclamation mark, we indicate that that's a mandatory argument. Inside, we use the `addRecipe` mutation. Pass the `recipe` as an input, and regress its `ID` and `title`. 

```js
const addRecipeMutation = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe)
 {
      id
      title
    }  
}
`
```

Now that we have our mutation ready, let's use it. The mutation component's child must be exactly one function. It's a so-called render prop. It is called with the mutate function, which we name `addRecipe`. The second argument is an argument containing a `mutation` result, as well as the `loading` and `error` state. 

```js
render() {
  return (
    <Mutation mutation={addRecipeMutation}> {(addRecipe, { loading, error })
    
    ...
```
Once the form is submitted, we can use our `addRecipe` function to trigger the `mutation` and pass in the recipe object, containing the property's `title` and `vegetarian`.

```js
{(addRecipe, { loading, error }) => (
  <form
    onSubmit={evt => {
      evt.preventDefault();
        addRecipe({
          variables: {
            recipe: {
              title: this.state.title,
                vegetarian: this.state.vegetarian
                  }
            }
        });
      this.resetFields();
    }}
```

Are we done? Not yet. In favor of good UX, we should also indicate the `loading` state, and inform the user, in case an `error` occurred. This is all we need to implement the mutation. 

```js
<div>
<button>Add Recipe</button>
  {loading && <p>Loading...</p>}
  {error && <p>Error :( Please try again</p>}
</div>
```

We give it a try by entering our recipe, pumpkin soup, and click on the add button to submit the form. While I'm confident that our mutation succeeded, we don't see the pumpkin soup in our list. 

![image of the list without any pumpkin soup](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953767/transcript-images/react-update-data-using-the-apollo-mutation-component-nosoup.png)

This is the case because the query fetching the list of recipes is located in another component. In no way we did indicate that this list should be updated once the mutation finished. Let's quickly verify that our mutation succeeded by refreshing the page. 

![image of the page refreshed with punpkin soup](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953768/transcript-images/react-update-data-using-the-apollo-mutation-component-yessoup.png)

Now, we want to update the list with the mutation. Therefore, we can use the prop `refetchQueries` on the `Mutation` component. It accepts an array of queries, which will be rerun once the mutation succeeded. Let's provide our `recipes` query.

```js
render() {
  return (
    <Mutation mutation={addRecipeMutation}
    refetchQueries={[
      {
        query: gql`
          query recipes {
            recipes {
              id
              title
            }
          }
      } `
    ]}> 
    {(addRecipe, { loading, error })
...
```

Unfortunately, this won't work, because the query in the `Recipes` component accepts a `vegetarian` variable, and therefore, it's different. 

![image of the request not working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953767/transcript-images/react-update-data-using-the-apollo-mutation-component-notworking.png))

This means we need to pass in the exact same query, with exactly the same variables.

While we could copy and paste it now, at this point, it's probably best if we extract the query from the other component, and import it in this file, as well as in the recipes one. 

We copy the query from the recipes component, paste it into a new `recipesQuery.js` file. 

#### src/recipesQuery.js
```js
import gql from "graphql-tag";

export default gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;
```

Then we can import the query in the `recipes.js` file.

#### src/recipes.js
```js
import recipesQuery from "./recipesQuery";
```

Next, we `import` the same query inside `addRecipes.js`. 

#### src/addRecipes.js
```js
import recipesQuery from "./recipesQuery";
```

Then we use the recipe queries inside the refetch queries, where we pass in one's vegetarian's set to `false`, and one's set to true. 

```js
<Mutation
  mutation={addRecipeMutation}
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
> 
```

Let's give this a try. We add a new recipe. Then we will see the `refetchQueries` getting triggered after mutation successfully finished.

![image of the succesful refetch](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953766/transcript-images/react-update-data-using-the-apollo-mutation-component-successrefetch.png)

This, though, might not be the desired user experience you're looking for. I personally prefer if the loading indicator stays active until the `refetchQueries` are updated.

Fortunately, this behavior's trivial to implement by simply adding a prop, `awaitRefetchQueries`, and setting it to true. 

```js
<Mutation
  mutation={addRecipeMutation}
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

Let's refresh the page. Then we add another vegetarian dish, a potato casserole. As you can see, the potato casserole showed up in the list at the same time as the loading indicator disappeared. 

![image of the potato casserole showing up on the list](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953768/transcript-images/react-update-data-using-the-apollo-mutation-component-immediaterefetch.png)

If we switch on the vegetarian filter, the list is instantly rendered, since we already updated the cache by using the `refetchQuery`.

![image showing the instant rendering of vegetarian options](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953767/transcript-images/react-update-data-using-the-apollo-mutation-component-immediaterenderrefetch.png)

Now, you should have quite a good overview about how to implement mutations, as well as related gotchas you need to be careful with. That's it. While this use case is manageable, since we only have one Boolean variable, it becomes quite tricky once you have more complicated use cases, that include multiple variables.

Unfortunately, there is no magic bullet on how to tackle these, but rather multiple solutions, each coming with their own trade-offs. For example, you could only refetch the queries currently shown on the page, and remove all other caches queries that are potentially impacted by a mutation.

If you want to start simple, and I've seen developers doing this a couple of times, you could turn off the Apollo cache by default, and only use it explicitly, in case your optimizations have large impacts on the user experience.
