Taylor Bell: [00:00] I'm inside `src/pages` inside the "My blog" directory. If I do an `ls`, we can see the different posts that I've created and the `index.js` file. Let's open the `index.js`. 

#### Terminal
```
$ ls
$ vi index.js
```

We can see that we have a really basic component here that will render our `Hello Sorld`.

[00:18] Our `Hello World` component has been refactored to be called `Layout`. In order to bring in data into our `Layout` component, we'll `import StaticQuery from 'gatsby'`. Let's create a new component called `Header`.

#### index.js
```jsx
import React from "react" 
import { StaticQuery } from 'gatsby'

const Header = () => {

}

const Layout =() => { 
  return (
    <div>
      Hello World
    </div>
  )
}
export default Layout
```

[00:30] Inside the `return` of `header`, we're going to `return` the `StaticQuery` component. One of the props that `StaticQuery` takes is our actual `graphql query`. I realize now that we need to `import graphql` also.

```javascript
import { StaticQuery, graphql } from 'gatsby'

const Header = () => {
  return (
    <StaticQuery
      query={}
    />
  )
}
```

[00:43] Inside of our `query` to prop, we're going to pass in a tagged template, which is the syntax we use to make a `graphql query`. Our `query` syntax is `graphql`, then two backticks. Then we use the `query` keyword. We already know what our `query` looks like by looking at our GraphiQL.

[00:59] We know that we need `site` and `siteMetadata`. We want the `title` and `description`. The next prop that we pass to static `query` is what we want to render. In this case, we'll just `render` a simple proof of concept. We're going to pass a function that takes `data`, which comes from right here.

[01:15] We'll just return a `div` and it will go `data.site.siteMetadata.title.` 

```jsx
const Header = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => <div>{data.site.siteMetadata.title}</div>}
    />
  )
}

```

Now we can replace `Hello World` with our `header` component. 

```jsx
const Layout = () => {
  return (
    <div>
      <Header /> 
    </div>
  )
}
```

Now that we know we can get `data` from static `query`, let's create a new subcomponent to clean up this `render` a little bit.

[01:35] We'll create a new component called `TitleAndDescription`. We'll destructure `data` from props. We'll pull our `TitleAndDescription` from `data`. Inside our `return`, for now, we'll just do an `h2` and a `p` tag.

```javascript
const TitleAndDescription = ({data}) => {
  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
```

[01:47] With our subcomponent created, we can now update the `render` prop of our static `query` component. 

```jsx
render={data => <TitleAndDescription data={data} />}
```

Now we can see that our page has been updated. With the magic of editing, I've added some inline styles and our header is complete.

```javascript
const TitleAndDescription = ({data}) => {
  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'avenir'
    }}>
      <h2 style={{marginBottom: 0}}>{title}</h2>
      <p style={{
        marginTop: 0,
        opacity: 0.5
      }}>
        {description}
      </p>
    </div>
  )
}
```