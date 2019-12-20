So far, we used `data`, `loading`, `error` from the render prop function of a `Query` component. There are a couple more utilities coming with this object. One of them is `refetch`. 


#### src/recipes.js
```js
<Query
  query={recipesQuery}
  variables={{ vegetarian: this.state.vegetarian }}
  pollInterval={3000}
>
  {({ data, loading, error, refetch }) => {
    if (loading) return <p>Loading…</p>;
    if (error) return <p>Something went wrong</p>;

    return (
      ...
    )
  }
</Query>
```
Once invoked, it will rerun the query. Let's give this a try by adding a `<button>` to refresh to recipes.

```js
<React.Fragment>
  ...
  
  <button onClick={() => refetch()}> Refresh Recipes</button>
</React.Fragment>
```
Once implemented we add a new item in another browser, switch back to our previous one, and execute the refetch by pressing the button.

![image of adding new item in another browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953765/transcript-images/react-refetch-data-with-the-apollo-query-component-either-manually-or-on-timed-intervals-adding.png)

![image of the new item showing up in the previous browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953767/transcript-images/react-refetch-data-with-the-apollo-query-component-either-manually-or-on-timed-intervals-added.png)

As expected, we now see the new recipe being added. Other examples of useful utilities coming inside the render prop, a network status, fetch more for pagination, or start and stop polling.

That said, the easiest way to achieve polling for new results is using the `pollInterval` prop on the `query` component itself. By default, it's deactivated, but if you provide a number like `{3000}`, the component will rerun the query every third second. 

```js
<Query
  query={recipesQuery}
  variables={{ vegetarian: this.state.vegetarian }}
  pollInterval={3000}
>
```

Again, you want to verify it by adding get another recipe.

![image of adding new recipe in another browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953764/transcript-images/react-refetch-data-with-the-apollo-query-component-either-manually-or-on-timed-intervals-recipeadding.png)

As you can see, the banana muffin was added. Without web sockets being available, polling can be a simple and effective tool to provide an almost real time experience.

![image of the new recipe showing up in the previous browser on timed interval](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953768/transcript-images/react-refetch-data-with-the-apollo-query-component-either-manually-or-on-timed-intervals-recipeadded.png)
