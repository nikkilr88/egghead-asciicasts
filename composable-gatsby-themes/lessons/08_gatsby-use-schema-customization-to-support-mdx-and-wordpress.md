Instructor: [00:00] Now that we created three themes, a marketing theme, a Shopify theme, and the product blog, we'll take a dive into **schema customization**. We can turn our attention to how to abstract this theme into a data structure that can support our product blog sourced from WordPress and our deaf blog sourced from MDX files.

[00:17] We're going to start a new theme to abstract the WordPress blog we already created. This theme will be `batsby-theme-blog-data`, and we'll start off with the MD index file. Run your `yarn init` to get your `package.json`, and then we can take a look at the data that we're using in each.

```bash
# ./packackes
mkdir gatsby-theme-blog-data
cd gatsby-theme-blog-data
yarn init
touch index.js
```

[00:30] If we look at the WordPress blogpost template and we scroll down to the query we can see that we're creating for the title and the content. If we go to www and we look at the blogpost query or the blogpost template, we can see that we use title and body.

[00:46] Note that we should also take a look at the `devblog.js` file and the `blog.js` file in our product blog. Together, this gives us a set of fields that we should use if we intend the data structure that we build to be able to support the whole structure, that is, the ID, the title, the slug, the excerpt, and the content.

[01:05] Create a `gatsby-node.js` file. We'll take the types we just looked at, and create a blog post interface. We use the interface keyword, and we use `@nodeInterface`. The ID is required, as are most other fields. The excerpt isn't, however. This is going to be most of what we have in our data theme.

```js
// packages/gatsby-theme-blog-data/gatsby-node.js
exports.createSchemaCustomization = ({actions, schema}) => {
  const {createTypes} = actions
  createTypes(`interface BlogPost @nodeInterface {
    id: ID!
    title: String!
    slug: String!
    excerpt: String
    content: String!
  }`)
}
```

[01:22] Now we're going to take the familiar step of using our theme, except that, instead of using our theme in www, we're going to be using our theme in `gatsby-theme-product-blog`. This is going to create a parent-child relationship between `gatsby-theme-blog-data` and `gatsby-theme-product-blog`, where blog-data is the parent, and product-blog is the child that uses the parent and extends it.

[01:44] Gatsby-config or `gatsby-theme-product-blog` add `gatsby-theme-blog-data`,

```js
// packages/gatsby-theme-product-blog/gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-theme-blog-data`,
    // ...
  ],
}
```

in the package.json, add `gatsby-theme-blog-data` at a version of 1.00.

```json
// packages/gatsby-theme-product-blog/package.json
{
  //...
  "dependencies": {
    //...
    "gatsby-theme-blog-data": "^1.0.0"
  }
}
```

Now we can go back to the root of our project, and run `yarn` to link our packages together. We can run the site now.

[01:58] Instead of viewing the site this time, we're going to view the GraphQL graphical explorer. We can see a set of types that are included in our Gatsby site on the left. We can see types like `allMDX`, `allShopify`, `allWordPressPage`, or `allWordPressPost`, as well as a number of other types. These are being added either by our themes, our plugins, or come with Gatsby itself.

[02:19] What we just did is added this `allBlogPost` type. **Note that we don't have any data that is considered a `BlogPost`, or satisfies this interface, so we don't get any results, but we also don't get any errors if we query it**. This is one of the powerful features of **schema customization** and defining our types up front.

[02:37] By declaring `allBlogPost`s as an interface, our templates can now rely on the fact that `allBlogPost`s exist with a set of predefined fields, which is title, blog, excerpt, and content. **This means we can source our data from anywhere, and as long as it fits the blogpost interface, our templates can handle it**. Leading to more robust sites, but are resilient against content existing or not existing.

[02:59] To be able to query WordPress posts, we need to create a set of **concrete nodes** that implement a blogpost interface. In our case, we'll take a look at the WordPress post type. The WordPress post type includes all the fields we need, including title, blog, excerpt, and content. We can see that we've returned a fully formed node under WordPress post.

[03:20] In the Gatsby theme product blog Gatsby Node, we're going to introduce another create **schema customization** lifecycle.

```js
// packages/gatsby-theme-product-blog/gatsby-node.js
exports.createSchemaCustomization = ({actions, schema}) => {
  const {createTypes} = actions
  createTypes(`interface BlogPostWordPress implements Node & BlogPost 
    @childOf(types: ["wordpress__POST]) {
    id: ID!
    title: String!
    slug: String!
    excerpt: String
    content: String!
  }`)
}
//...
```

In this case, we've created a new type of blogpost WordPress. We've declared that it implements Node, which means that it has an ID, and it also implements blogpost, blogpost being the interface we defined earlier.

[03:40] We also declared to be a child of a specific type. In this case, we've declared it to be a child of WordPress post. Though if we ever need to, we can actually access a blogpost WordPress as a child of any WordPress post, allowing us to make more intricate queries if we ever need to break outside the blogpost interface.

[03:59] Even if we need to make these more intricate queries, we can always return the blogpost data because the WordPress post satisfies the interface. Note that all the fields that are required match exactly the ones in our blogpost interface earlier.

[04:12] Since we've used **schema customization** to define the blogpost WordPress type, the type exists just like the interface exists. Note that we don't have any data in it yet. To create **concrete nodes**, we'll require `crypto` at the top of the file. Then we'll introduce an `onCreate` node lifecycle call.

[04:28] The `onCreate` node lifecycle call takes a `node`, gives us some `actions`, and allows us to use the `createNodeID`. `createNode` is the main API we'll use to create the **concrete nodes** to fill in the blogpost WordPress type.

[04:42] If the type we're operating on in `onCreate` node isn't a `wordpress__POST`, we don't want to do anything, so we just return.

```js
// packages/gatsby-theme-product-blog/gatsby-node.js
exports.onCreateNode = ({node, actions, createNodeId}) => {
  const {createNode} = actions

  if (node.internal.type !== 'wordpress__POST') {
    return
  }

  //...
}
```

If it is a `wordpress__POST`, we can take each of the fields off of the `wordpress__POST` and assign them to each of the fields that we want that satisfy the blogpost interface.

[04:59] In this case, all the fields exist on the node and none of them need to be resolved. When we go over MDX, we'll cover what it looks like to resolve fields that aren't on the node already. Then we call `createNode`.

```js
// packages/gatsby-theme-product-blog/gatsby-node.js
exports.onCreateNode = ({node, actions, createNodeId}) => {
  const {createNode} = actions

  if (node.internal.type !== 'wordpress__POST') {
    return
  }

  const fieldData = {
    title: node.title,
    slug: node.slug,
    content: node.content,
    excerpt: node.excerpt,
  }

  createNode({
    id: createNodeId(`${node.id} >>> BlogPostWordPress`),
    ...fieldData,
    parent: node.id,
    children: [],
    internal: {
      type: `BlogPostWordPress`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
      content: JSON.stringify(fieldData), // optional
      description: `BlogPostWordPress: "implements the BlogPost interface for WordPress posts"`, // optional
    },
  })
}
```

[05:13] `createNode` inserts a concrete node of type blogpost WordPress into the Gatsby Node system. It takes the field data, redeclare the parent ID, and a couple of internal types. This is why we imported `crypto` before to create a content digest.

[05:29] Note that even though we've already created the nodes that implement blogpost interface, we still don't get any in either of the `allBlogPost` query, or the `allBlogPost` WordPress query. That's because from here on out, `rm -rf .cache` or `gatsby clean` are your friend, especially when we're working with the `onCreate` node lifecycle call.

[05:50] If you make changes to the logic that creates nodes, you will have to remove the cache because the nodes get cached and don't get recreated or some type. Now we can see that `allBlogPost` WordPress and `allBlogPost` both return objects.

[06:05] We can see that the IDs of these nodes are the same, indicating that they're the same backing node. This is because `allBlogPost` is an interface and returns nodes of different types, such as blogpost WordPress, which is the concrete implementation.

[06:19] Now that we know we can query for `allBlogPost`, we'll change the query that constructs our pages. We're not querying `allBlogPost` instead of `allWordPressPost`. We'll change our logic to iterate over `allBlogPost`, and we'll still pass in this node slug and the node ID.

```js
// packages/gatsby-theme-product-blog/gatsby-node.js
exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions
  const wordPressPostTemplate = require.resolve(
    `./src/templates/wordpress-blog-post.js`,
  )
  // Query for Mdx nodes to use in creating pages.
  return graphql(
    `
      query loadProductBlogsQuery {
        allBlogPost {
          nodes {
            id
            slug
          }
        }
      }
    `,
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allBlogPost.nodes.forEach(node => {
      createPage({
        path: `/blog/${node.slug}`,
        component: wordPressPostTemplate,
        context: {
          id: node.id,
        },
      })
    })
  })
}
```

[06:33] Next, we also have to change the query that we're making in our page template. Instead of querying for WordPress post, we're going to query for `blogPost`. We can leave the rest of the query the same.

```js
// ./packages/gatsby-theme-product-blog/src/templates/wordpress-blog-post.js
//...
export const query = graphql`
  query WordPressBlogPostQuery($id: String!) {
    blogPost(id: {eq: $id}) {
      title
      content
    }
  }
`
```

Note, however, that we do have reference to WordPress post in our page logic. We'll have to change that to `blogPost`. This will happen for the title and also for the content.

```js
export default ({ data }) => (
  <div>
    <Header />
    <h1
      sx={{ variant: "textStyles.display", color: "primary" }}
      dangerouslySetInnerHTML={{
        __html: data.blogPost.title
      }}
    />
    <div
      sx={...}
      dangerouslySetInnerHTML={{
        __html: data.blogPost.content
      }}
    />
  </div>
);
```

[06:54] One last place we need to make this change is in the `pages/blog.js` file. You'll no longer want to query for `allWordPressPost`, so we'll query for all `blogPost`. The fields that get returned are the same, but we can leave that. We do need to change the logic or any place that references it inside of our component.

```js
// ./packages/gatsby-theme-product-blog/src/pages/blog.js
export default props => {
  const {theme} = useContext(MyThemeContext)

  return (
    <div>
      <Global styles={{body: {backgroundColor: theme.colors.background}}} />

      <Header />
      {props.data.allBlogPost.nodes.map(node => (
        <div key={node.id}>
          {
            //...
          }
        </div>
      ))}
    </div>
  )
}

export const query = graphql`
  query AllProductBlogsPage {
    allBlogPost {
      nodes {
        id
        title
        slug
        excerpt
      }
    }
  }
`
```

[07:11] After rerunning the site, we can check out our product blog and see that our blog posts are still there. The interface that we've just created in apparent theme and implemented in a trial theme access query any node, including MDX, WordPress, Contentful, JSON, or YAML files. In fact, any concrete node you can think of that you can get to implement this interface can be returned here.
