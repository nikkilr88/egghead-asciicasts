Taylor Bell: [00:00] We have our post title showing, but they're not clickable. Let's go ahead and make them links. To do that, we're going to `import { Link } from 'gatsby'`. We can come down here to our `frontmatter.title`. We can surround this with `Link` and our to prop will be `frontmatter.path` and save this.

#### Index.js
```jsx
import { graphql } from 'gatsby'
import Header from '../components/Header'

...
<div
  key={frontmatter.path}
  style={{marginBottom:'1rem}}
>
  <Link to={frontmatter.path}> 
    {frontmater.title}
  </Link>
</div>
```

[00:17] When this reloads, we can see that they're `Links` now. When we click it, we get a 404 page. That's because we don't actually have a URL built for our post. In order for Gatsby to create the pages that we need for each blog post, we're going to create a file `gatsby-node.js` inside of the root of the directory.

[00:37] Inside of our `src` directory, we're going to create `templates` directory and we will create a new file `src/templates/blogpost.js`. 

#### Terminal 
```
$ touch gatsby-node.js 
$ mkdir src/templates/
$ touch src/templates/blogPost.js
```

On the left hand side, I have `gatsby-node.js`, and on the right hand side, I have `blogpost.js`. Let's just knock out the blog post template first.

[01:03] We'll `import React`. We'll bring in `{ graphql } from 'gatsby'`. Now, we'll just create a new `const Template`. We'll bring in `props` for now. Just to keep it simple, we'll do a `return` of just a `<div>` with `Blog Post Here`.

#### src/blogPost.js
```jsx
import React from 'react' 
import { graphql } from 'gatsby'

const Template = (props) => {
  return (
    <div>
    Blog Post Here
    </div>
  )
}
export default Template
```

[01:19] We'll `export default template`  and that will be good enough for now. There are several API's that Gatsby gives us access to. In order to create pages, we will use the aptly named `createPages` API. To get started in `gatsby-node.js`, we'll create a new `export` function called `createPages`.

[01:35] We're going to destructure `graphql` for finding our files and `actions` which is where `createPages` lives. Now, we'll destructure `createPages` from our `actions`. Our `createPages` function will `return` a new promise due to the async nature of file creation.

[01:51] We'll do `return new Promise`, which will have a `resolve` and a `reject`. In order to create the page, we're going to need access to our blog post template. We'll create a new variable for it, `blogPostTemplate`. Since it's on the file system, we'll use `path.resolve` and send it to our directory `src/templates/blogPost.js.` We'll `require path` at the top of our file.

#### gatsby-node.js+
```jsx
const path = require('path')

exports.createPages = (({graphql, actions}) => {
  const { createPages } = actions

  return new Promise((resolve, reject)) => {
    const blogPostTamplate = path.resolve('src/templates/blogPost.js') 
    
  })
})
```

[02:15] Now we'll `resolve` the `Promise` with a call to `graphql`, and we'll pass in our query for `allMarkdownRemark`, `edges`, `node`, `frontmatter`, and the `path` where we want our posts to live at.

```jsx
resolve(
  graphql(
    `
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
  )
)
```

[02:27] Now we'll add a `then` where we pass the `result` into a function, and `result` contains a `data` object with a shape that matches our query. We'll look at `result.data.allMarkdownRemark.edges`, and remember the `edges` are a `path` to the file system `node`.

[02:45] With this in mind, we're going to do a `forEach`. `forEach` of our `edges`, we're going to extract the `path` from the `node`'s `frontmatter`. We can destructure the `node`. We know that our `path` will be at `node.frontmatter.path`.

```jsx
then(result => {
  result.data.allMarkdownRemark.edges.forEach(({node})=> {
    const path = node.frontmatter.path
  })
}
)
```

[03:05] Now, we can call the `createPage` action. The first parameter is a `path` for the page URL and will be the `component` to `render`, so in this case, the `blogPostTemplate`. The third parameter is the `context` object that will make its way into our `blogPostTemplate` component as a `prop`.

[03:22] We want our template to know what the `path` to our file is. We'll call it `pathSlug`, since `path` is a reserved keyword, and the value of `path` is what is supplied in our `node` `frontmatter`. After our call to `createPage`, we'll `resolve` that out of the `promise`. 

```jsx
createPage({
  path, 
  component: blogPostTemplate,
  context: {
    pathSlug: path
  }
})
resolve()
```

[03:37] Since we have updated `gatsby-node.js`, we need to restart `gatsby` develop, so we run that. We get an error, "Cannot read property allMarkdownRemark of undefined."

![Error Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224333/transcript-images/gatsby-build-gatsby-page-slugs-dynamically-from-markdown-with-gatsby-node-js-Error-Example.png)

[03:48] This would be on line 23. It's happening with `result.data`. There's something wrong with the `query`. Let's jump back over to our GraphiQL browser. It looks like the root query type. 

[04:06] We just need to wrap this with `query`. 

```jsx
resolve(
  graphql(
    `
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter{
                path
              }
            }
          }
        }
      }
    `
```

Let's rerun `gatsby` develop, refresh the page, click, and we now have `blogPostHere` matching our blog post template.

![Blog post here](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805208/transcript-images/gatsby-build-gatsby-page-slugs-dynamically-from-markdown-with-gatsby-node-js-blog-post-here.png)