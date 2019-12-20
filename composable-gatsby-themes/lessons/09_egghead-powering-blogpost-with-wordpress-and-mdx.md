Instructor: [00:00] Now that we have a blog post interface, we can apply the same approach to MDX nodes. We won't pull this into a theme itself because at this point, **we can talk about themes, plugins, and Gatsby sites, and how they're all actually the same thing**.

[00:13] All of them allow us to use Gatsby star files, which is gatsby-ssr, gatsby-config, gatsby-node, or any of the others. All of them participate in shadowing, as we've been showing with the theme JS files, and all compose together, if they're using gatsby-configs, to create our final Gatsby site.

[00:31] **This insight lets us say that when we implement the parent theme in our site, it's the same as implementing it in our product blog theme**, the difference being that our site is not currently NPM installable, whereas the product blog theme is.

[00:45] This means that later if you used the product blog theme on its own, it wouldn't come with MDX logic, although you could put that logic in there as well. **This gives us a large amount of flexibility in where we put different node implementations or different types**.

[01:00] In the Gatsby node for our site, we'll create a new schema customization lifecycle. This schema customization lifecycle looks a lot like our blog post WordPress. We've named it blogPostMdxDev for our dev blog. It implements node in blogPost, just like before, as the child of the types MDX instead of being a child of the types wordpressPost. The types all match the blogPost, as we saw before.

```js
// www/gatsby-node.js
createTypes(`
    type BlogPostMdxDev implements Node & BlogPost
      @childOf(types: ["Mdx"]) {
      id: ID!
      title: String!
      slug: String!
      excerpt: String
      content: String!
    }
  `)
```

[01:25] Next, we'll take the `onCreateNode` lifecycle and do the same processing that we did before. The main difference between what we did for the WordPress post and what we're doing for the MDX post is that the title and the slug come from the `frontmatter` on the MDX node, which happens to be on the node already.

[01:43] When we go to look for excerpt and content, they're not on the node here. **This is because they're implemented through GraphQL resolvers**. Don't forget to require `crypto` at the top of the file.

[01:54] If we run the site now, we get an error that says we can't return null for non-nullable field blogPostMdxDev.content. This is one of the fields we couldn't implement because it was only through a resolver. This confirms it for us.

[02:07] To remedy this, we're going to take advantage of an advanced feature of schema customization called **field extension**s. A **field extension** is a custom directive defined by us that in this case taps deep into the node model and calls some very obscure APIs to be able to resolve the MDX parent as well as the body or the excerpt.

[02:31] If you're interested in this further, I suggest looking at `runQuery` first, which allows us to run queries on specific types in the Gatsby Node system with specific filters and as list or returning the first query only.

[02:45] After understanding the `runQuery` `nodeModel`, you might want to look into the other `nodeModel` functions. Prepare nodes is one the big behemoths in driving the resolution of fields in the Gatsby Node system.

[02:58] It typically won't need to touch this function so we won't cover it in this course, but know that we're using it here to enable us to resolve multiple fields in a row. Finally note that we've named our **field extension** proxy resolve.

[03:11] Because we don't have access to optional chaining, we're using Lodash to use `_.get` get a field. This means we'll have to import and install Lodash. We can add Lodash to the www work space by doing `yarn workspace www add lodash`.

```js
// ./www/gatsby-node.js
actions.createFieldExtension({
  name: 'proxyResolve',
  args: {
    from: {type: 'String!'},
  },
  extend: (options, previousFieldConfig) => {
    return {
      resolve: async (source, args, context, info) => {
        await context.nodeModel.prepareNodes(
          info.parentType, // BlogPostMdxDev
          splitProxyString(options.from), // querying for resolvable field
          splitProxyString(options.from), // resolve this field
          [info.parentType.name], // The types to use are these
        )

        const newSource = await context.nodeModel.runQuery({
          type: info.parentType,
          query: {filter: {id: {eq: source.id}}},
          firstOnly: true,
        })

        return _.get(newSource.__gatsby_resolved, options.from)
      },
    }
  },
})
```

[03:28] To take advantage of our new **field extension**, we'll replace the excerpt in the content declarations in the graphQL STL upgrade types with declarations that you used in a directive.

[03:39] In this case, all proxy resolve from the parent excerpt where parent is a field that is an idea on the node that needs to be resolved. Excerpt is a field on the parent node that also needs to be resolved, but we're actually resolving twice here.

[03:56] Our content will point it to `parent.body`. In this case, the parent for both is MDX. This is the mdx.excerpt field in the mdx.body field.

```js
// ./www/gatsby-node.js
//...
createTypes(`
    type BlogPostMdxDev implements Node & BlogPost
      @childOf(types: ["Mdx"]) {
      id: ID!
      title: String!
      slug: String!
      excerpt: String @proxyResolve(from: "parent.excerpt")
      content: String! @proxyResolve(from: "parent.body")
    }
  `)
//...
```

If we go back to graphical after running the site, we can now see that we have four results in `allBlogPost`s.

[04:13] Note that this is also true if we go to the product log. Hence, the product log is using the all blogposts query. We don't want post going on both product log and the dev blog even though either one will be able to be written in WordPress or MDX by the time we're done.

[04:30] To fix this, we'll create collections of content by adding a field to our blogpost. In the Gatsby Node inside of Gatsby theme blog data, add a collection or just a string. You could imagine that this is a field that we added after people in the wild have already been consuming our data theme.

```js
// ./packages/gatsby-theme-blog-data/gatsby-node.js
exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions
  createTypes(`interface BlogPost @nodeInterface {
      id: ID!
      title: String!
      slug: String!
      excerpt: String
      content: String!
      collection: String
    }`)
}
```

[04:49] Adding a field as an optional field means that we won't break them when we ship it. If this was required, anybody that wrote additional sources that match this interface would break if they didn't implement this field.

[05:01] In Gatsby theme product blog in our field data, we can hard code the collection as a product.

```js
// ./packages/gatsby-theme-product-blog/gatsby-node.js
// ...
const fieldData = {
  title: node.title,
  slug: node.slug,
  content: node.content,
  excerpt: node.excerpt,
  collection: 'product',
}
//...
```

In the Gatsby Node of www, we'll do the same for MDX. In this case, we've declared it to be in a developer collection.

```js
// ./www/gatsby-node.js
//...
const fieldData = {
  title: node.frontmatter.title,
  slug: node.frontmatter.slug,
  collection: 'developer',
}
//...
```

[05:16] The collection field will be the only feature that tells us whether to put a blog in the dev blog or to put a blog in the product's blog. This means that we'll be able to use WordPress posts on the dev blog if we want to and MDX posts on the product's blog, if we want to.

[05:33] Back in the product's blog Gatsby Node, we'll filter down the `allBlogPost` query but we're only creating pages or posts that are in the product collection. In blog.js we'll do the same, but the only links that are showing on the blog post's list page for the product blog, are product blog links.

```js
// ./packages/gatsby-theme-product-blog/gatsby-node.js and ./packages/gatsby-theme-product-blog/pages/blog.js
// ...
return graphql(
    `
      query loadProductBlogsQuery {
        allBlogPost(filter: { collection: { eq: "product" } }) {
          nodes {
            id
            slug
          }
        }
      }
    `
// ...
```

[05:55] We'll do the same thing for the MDX nodes in Gatsby Node of www, because we haven't changed `allMdx` to be `allBlogPost` yet. We'll do that now, as well. In this case, we've taken `allBlogPost` filtered by the collection equal to developer and return the ID in the slug for the node.

```js
// ./www/gatsby-node.js
// ...
const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
// Query for Mdx nodes to use in creating pages.
return graphql(
  `
    query loadPagesQuery {
      allBlogPost(filter: {collection: {eq: "developer"}}) {
        nodes {
          id
          slug
        }
      }
    }
  `,
)
// ...
```

[06:15] We're going to remove the front matter call, because the slug is now on the node. We also need to change the processing code from `allMdx` to `allBlogPost` and match the field returned in our GraphQL query.

```js
// ./www/gatsby-node.js
// ...
result.data.allBlogPost.nodes.forEach(node => {
  createPage({
    path: `/dev-blog/${node.slug}`,
    component: blogPostTemplate,
    context: {
      id: node.id,
    },
  })
})
//...
```

[06:27] In the blog post template, we'll have to do the same thing. We'll query for blog post and we'll get back title and content. We'll change our processing code to account for that.

```js
// ./www/src/templates/blog-post.js
export default ({data}) => (
  <div>
    <Header />
    <H.h1>{data.blogPost.title}</H.h1>
    <MDXRenderer>{data.blogPost.content}</MDXRenderer>
  </div>
)

export const query = graphql`
  query BlogPostQuery($id: String!) {
    blogPost(id: {eq: $id}) {
      title
      content
    }
  }
`
```

Finally, in `dev-blog.js`, which lists all of our posts, we'll replace the all file query with an `allBlogPost` query that looks for the collection.

```js
// ./www/src/pages/dev-blog.js
// ...
export const query = graphql`
  query AllDevBlogsPage {
    allBlogPost(filter: {collection: {eq: "developer"}}) {
      nodes {
        title
        slug
        excerpt
      }
    }
  }
`
```

[06:46] Notice better query is a lot smaller now because we don't have to filter on a bunch of extraneous fields like the extension. We'll change all file to `allBlogPost` in our template code and we'll remove the child MDX calls since we no longer need them. Our fields are directly on the node itself.

```js
// ./www/src/pages/dev-blog.js

export default props => (
  <div>
    <Header />
    {props.data.allBlogPost.nodes.map(node => (
      <div key={node.id}>
        <Text.Link to={`/dev-blog/${node.slug}`}>
          <strong>{node.title}</strong>
        </Text.Link>
        <Text.p>{node.excerpt}</Text.p>
      </div>
    ))}
  </div>
)
// ...
```

[07:01] If we go to our site now, we can see that the `allBlogPost` calls are segmented into the product blog from the product collection and the dev blog and the dev collection. We now have two distinct blogs running off the same data model.

[07:15] In fact, if we back up a little bit, we could render all the posts on one or both of the collections, and we could even dynamically create the collections or let our users dynamically create the collections.

[07:29] It doesn't matter what node types we back each collection with, as long as we have the logic to render them. One feature that can let us know which one to render is `__typename`, which allows us to access the underlying type name of the node that we're returning.

[07:44] One other option is inline fragments. We can insert inline fragments, or types that we know we can get back, and return the type name of the parent, if we want to. This allows us a lot of flexibility when considering what we're going to render and where we're going to render it. In the future, we could even automate this type name selection and return a component directly from the scrap dual query.
