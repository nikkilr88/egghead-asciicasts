Instructor: 00:00 We have the list of blog posts on our front page, and when we click to each one of them, they're showing up. In order to keep people from having to navigate, let's go ahead and add forward and backward links to each post.

00:11 To do this, we're going to pass additional data into the context when we call `createPage` in `gatsby-node.js`. Inside of `gatsby-node.js` where we're calling `createPage`, we're going to include some additional data.

00:23 Let's include a new variable for `posts`, because we're going to need to know where we're at in the list in order to link back and forth. We'll do `const posts = result.data.allMarkdownRemark.edges`, and then we can just update the line below to be `posts.forEach`.

#### gatsby-node.js
```jsx
).then(result => {
  const posts = result.data.allMarkdownRemark.edges
  
  posts.forEach(({node}) => {
    ...
  })
})
```

00:39 Inside of the `forEach`, we destructure the node to get each post, but we also need to add the `index`, so we know where we are in the total list. Underneath `pathSlug`, we're going to add a key for `prev`, short for previous.

00:52 If our `index === zero`, we won't have anything for previous, because if it's zero, it's the first one. We can't go backwards. Otherwise, we're going to do `posts`, and we'll get the one at `[index - 1].node`, which will be the post that comes before it.

01:09 `next` will be almost the same thing. This time, we'll look at `index === posts.length - one`. If it's the last one, there is no next. Otherwise, it'll be posts at `posts[index + 1].node`. 

```jsx
context: {
  pathSlug: path, 
  prev: index === 0 ? null: posts[index - 1].node,
  next: index === (posts.length - 1) ? null : posts[index + 1].node
}
```

Since we've updated `gatsby-node.js`, we need to restart Gatsby develop.

01:26 I've got my blog post template open, and let's open up my first post. When we add keys to the context part of the createPage call, it ends up in our template under a key called `pageContext`. Let's go ahead and `console.log(pageContext)`.

```jsx
const Template = ({data, pageContext}) => {
  console.log(pageContext)
}
```

01:41 When our page reloads, we can see our path slug, which is what was used to build this page. We can see that our previous link has a link to the second post, and our next link has a link to the third post. We're getting links to next and previous, but they're in the wrong order.

![links in dev tools](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224332/transcript-images/gatsby-add-next-and-previous-links-to-a-gatsby-blog-links-in-dev-tools.png)

01:57 Our first post shouldn't have a previous. This means that we need to add a sort parameter to the `allMarkdownRemark` query in `gatsby-node.js`. Inside of `gatsby-node.js`, we're going to add a sort to the allMarkdownRemark query.

02:13 We'll add a couple parentheses here, and we'll use the `sort` keyword. `sort` takes an object. We will sort in ascending `order`, based on `front matter___date`. 

```jsx
query {
  allMarkdownRemark (
    sort: {order: ASC, fields: [frontmatter___date]}
    ...
  )
}
```

In order to see that this in fact what we want to do, we can open our GraphQL browser, and see that inside of query allMarkdownRemark, we have the sort here.

02:34 We can click that. The order is ascending or descending, ASC OR DESC, and the fields, of course, are the frontmatter things that we've added in our posts. We save this file, we restart Gatsby develop, and then when we reload our page, we can now see that there is no previous, because we're on the first post. Next comes our second one.

![No previous post in dev tools](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224331/transcript-images/gatsby-add-next-and-previous-links-to-a-gatsby-blog-no-previous-dev-tools.png)

02:55 Since we now that we're getting next and previous passed through the page context, let's add some links. We'll delete the `console.log`, and then we will destructure `next` and `prev` from `pageContext`. We'll `import { Link } from Gatsby`.

```jsx
import { graphql, Link } from 'gatsby'

const Template = ({data, pagecontext}) => {
  const {next, prev} = pagecontext
}
```

03:10 We'll add a couple curly braces, because we're going to do a conditional. We'll do `next && <Link to={next.frontMatter.path}>`. We'll just make this the word `Next`, and reformat this a little bit. What the double ampersand does here is checks for the truthiness value of next. If it is true, it will render this link.

03:32 We can see that in our first post, that we have a link to next. We can now copy and paste this just for the sake of saving time, and replace next with prev. 

```jsx
const Template = ({data, pageContext}) => {
  const {next, prev} = pageContext

  const {markdownRemark} = data
  const title = markdownRemark.frontmatter.title
  const html = markdownRemark.html
  return (
    <div>
      <h1 style={{fontFamily: 'avenir'}}>{title}</h1>
      <div className='blogpost'
        dangerouslySetInnerHTML={{__html: html}}
        style={{
          fontFamily: 'avenir'
        }}
      />

      <div style={{marginBottom: '1rem', fontFamily: 'avenir'}}>
        {next &&
          <Link to={next.frontmatter.path}>
            Next: {`${next.frontmatter.title}`}
          </Link>
        }
      </div>
      <div style={{fontFamily: 'avenir'}}>
        {prev &&
          <Link to={prev.frontmatter.path}>
            Prev: {`${prev.frontmatter.title}`}
          </Link>
        }
      </div>
    </div>
  )
}
```

Now, we don't see a previous link here, like we expect, because it's our first one.

03:49 We have next. We have the next and previous on the second post, and a previous only on post C. Now that we know that this works, let's add a little bit of styling. Thanks to the magic of editing, we now have some style.