In order to filter for vegetarian recipes, our `recipesQuery` accepts a Boolean argument, `vegetarian`. 

#### src/recipes.js
```js
const recipesQuery = gql`
  { 
    recipes(vegetarian: true) {
      id 
      title
    }
  }
`;
```

Once the page reloads, we can see that now, only vegetarian recipes show up.

![image of only the vegeterian recipes shown on-screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953767/transcript-images/react-provide-dynamic-arguments-in-a-apollo-query-component-with-graphql-variables-initialvegload.png)

In this lesson, we want to make the vegetarian argument dependent on a checkbox, which can be controlled by a user.

Before we do so, let's kick off with some basics. Using the `GQL` template tag, we can ensure that a `query` must be provided with certain variables. 

We first declare a name for a specific query, using the syntax query, and then the name. Then we indicate that the variable `vegetarian` is a `Boolean!`. By adding an exclamation mark, we declare this variable as mandatory. 

```js
const recipesQuery = gql`
  query recipes($vegetarian: Boolean! { 
    recipes(vegetarian: $ vegetarian) {
      id 
      title
    }
  }
`;
```

In order to provide the `query` component with `variables`, we simply add another prop, `variables`. It accepts an object with the `query` `variables` as key-value properties. In our case, we set `vegetarian: true`.

```js
export default class Recipes extends Component {
  render() {
    return (
      <Query query={recipesQuery} variables={{ vegetarian: true}}>
    )
  }
}
```

Now, we refresh the browser, and verify that we still only see vegetarian meals. 

![image of only the vegeterian recipes shown still to be on-screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953767/transcript-images/react-provide-dynamic-arguments-in-a-apollo-query-component-with-graphql-variables-secondvegload.png)

Next up, we want to implement the checkbox UI, and keep track of its state. To do so, we add `state` to our React component, and set the `vegetarian` property to `false` by default. 

```js
export default class Recipes extends Component {
  state = {
    vegetarian: false
  }

  render() {
    ...
  }
}
```

We then use the `this.state.vegetarian` for our query variable. 

```js
export default class Recipes extends Component {
  state = {
    vegetarian: false
  }

  render() {
    return (
      <Query query={recipesQuery} variables={{ vegetarian: this.state.vegetarian}}>
    )
  }
}
```
![image of only the browser showing all four recipes again](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953765/transcript-images/react-provide-dynamic-arguments-in-a-apollo-query-component-with-graphql-variables-allfourrecipes.png)

Then we use `React.fragment` component to wrap our existing UI.

```js
render() {
  return (
    <React.Fragment>
      <Query
        query={recipesQuery}
        variables={{ vegetarian: this.state.vegetarian }}
        >
         ...
      </Query>
    </React.Fragment>
  )
}
```
This way, we can keep our existing code and prepend the filter UI. We add a `checkbox` and a `label`. The check prop is again based on `this.state.vegetarian`, and on `onChange`, we're going to invoke `this.updateVegetarian`, which we yet have to implement.

```js
render() {
  return (
    <React.Fragment>
      <label>
        <input
          type="checkbox"
          checked={this.state.vegetarian}
          onChange={this.updateVegetarian}
        />
      <span>vegetarian</span>
    </label>
    ...
    </React.Fragment>
  );
 }
}
```

We implement our missing function, `updateVegetarian`. Here, we destructure the incoming event to extract the `checked` value, and use it to update the `this.setState`.

```js
 updateVegetarian = ({ target: { checked } }) => {
    this.setState({ vegetarian: checked });
  };
```

Let's verify our code. As you can see, we render the checkbox and the list. Depending if the checkbox is checked, we either see all meals, or only the vegetarian meals.

![image of only the browser showing all four recipes again with checkbock unchecked](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543953765/transcript-images/react-provide-dynamic-arguments-in-a-apollo-query-component-with-graphql-variables-allfourrecipes.pngunchecked.png)