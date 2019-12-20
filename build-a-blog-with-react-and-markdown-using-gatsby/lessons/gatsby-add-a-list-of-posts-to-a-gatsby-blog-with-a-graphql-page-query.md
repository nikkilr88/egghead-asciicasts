Taylor Bell: [00:00] Let's add a list of all of our posts. Since we're going to be writing a page-level `query`, we can start by removing the `StaticQuery` import. We'll write our `query` at the bottom of the file, above our `export`.

[00:10] We'll write `export const query` and then `graphql` with two backticks for our tag template. We'll use the `query` keyword because that's what we're going to get from GraphQL.

#### index.js
```jsx
Layout = () => {
  return (
    <div> 
      <Header />
    </div>
  )
}

export const query = graphql`
  query HomepageQuery 
`

export defualt Layout 
```
[00:19] Let's call our `query HomepageQuery`. Now we can use the GraphQL browser in order to help us write our `query`. We can browse through the `RootQueryType`. We're going to be doing posts. We want `allMarkdownRemark`.

![Making Posts](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224333/transcript-images/gatsby-add-a-list-of-posts-to-a-gatsby-blog-with-a-graphql-page-query-making-post-example.png)

[00:30] Remember that this is a `Remark connection`. We click that. Then we have `edges`, which is the paths in the file system. A `node` is going to be each file. We go through. We have the `frontmatter`. These are all of our `frontmatter` options.

![Mark down Edges Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224331/transcript-images/gatsby-add-a-list-of-posts-to-a-gatsby-blog-with-a-graphql-page-query-MarkdownRemarkEdges-example.png)


[00:45] To close this out, we'll move this over to have a little room. You can see that I've written the `query` here. If I click run, this is all the information that we have, which is what we would expect.

![Written Query Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224332/transcript-images/gatsby-add-a-list-of-posts-to-a-gatsby-blog-with-a-graphql-page-query-witten-query-example.png)

[00:55] Let's go ahead and add it to our file. Now that we've written our `query`, we need to bring it into our `Layout` component. Let's take a look at the props that get passed into our `Layout`.

#### index.js
```jsx
const Layout = (props) => {
  console.log(props)
  return (
    <div> 
      <Header />
    </div>
    
  )
}
export const query = graphql`
query HomepageQuery {
  allMarkdownRemark {
    edges {
      node{
        frontmatter{
          title
          path 
          date
        }
      }
    }
  }
}
,
export defualt Layout 
```

[01:04] Inside the `console` of our `localhost 8000`, we can see that our `query` is showing up under the `data` `key`. This means that we can ahead and destructure `data` from `props` inside of our `Layout` component.

![Destructing Data Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224335/transcript-images/gatsby-add-a-list-of-posts-to-a-gatsby-blog-with-a-graphql-page-query-destructing-data-example.png)

[01:15] We can get to our `edges` from `data.allMarkdownRemark`. Now let's try just `console.logging edges`. Dev tools has our `nodes` like we'd expect. Now let's map over our `edges` in order to display our post titles.

[01:27] Between a couple braces, we'll do `edges.map`. We'll pass each `edge` in. From each `edge`, we want to get to the `frontmatter`. We'll destructure it. Then we'll `return` a `div` with the `frontmatter title`.

[01:42] The first thing I notice is that I should add a `key`. Now we have a list of our posts on our local host, but you'll notice that they're not in order. Let's fix it.

#### index.js
```jsx
const Layout =({data}) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div> 
      <Header />
      {edges.map(edge => {
        const {frontmatter} = edge.node
        return (
          <div key={frontmatter.path}>
            {frontmatter.title}
          </div>
        )
      })}  
    </div>
  )
}
```

[01:50] Going back to the GraphQL browser, we can scroll back through to `allMarkdownRemark`. We can see that it will take some arguments, one of them being `sort`. We can sort on fields. We can provide an order.

[02:02] The fields include a `frontmatter_date`, which is a pretty solid choice, and an order. Makes sense that it would be ascending or descending.

![GraphQL Frontmatter Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805242/transcript-images/gatsby-add-a-list-of-posts-to-a-gatsby-blog-with-a-graphql-page-query-GraphQL-Frontmatter-Example.png)

[02:10] What we can do here is in our `query`, next to `allMarkdownRemark`, add a couple parens. We are going to sort and provide options here. Let's do `order DESC, fields`, we'll provide it with `frontmatter___date`.

#### index.js
```javascript
export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark (
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          frontmatter {
            title
            path 
            date
          }
        }
      }
    }
  }
,
export defualt Layout 
```

[02:28] Save it. Check it out. There they are, newest to oldest. 

![The Result of Editing](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224328/transcript-images/gatsby-add-a-list-of-posts-to-a-gatsby-blog-with-a-graphql-page-query-result-of-editing.png)

Now, through the magic of editing, I've added some styling.

```javascript
const Layout = ({data}) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'avenir'
      }}>
        {edges.map(edge => {
          const {frontmatter} = edge.node
          return (
            <div
              key={frontmatter.path}
              style={{marginBottom: '1rem'}}
            >
                {frontmatter.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```