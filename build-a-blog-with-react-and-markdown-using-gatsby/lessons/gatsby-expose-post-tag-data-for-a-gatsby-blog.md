Taylor Bell: [00:00] Let's add the ability to browse all of our posts by tag. We're going to create a couple of new templates. Inside of `src/templates`, we'll create an `allTagsIndex.js` and a `singleTagIndex.js`. 

#### Terminal 
```
$ cd src/templates
$ touch allTagsIndex.js
$ touch singleTagsIndex.js
$ cd../..
```

This file is our main home page index, which is this here.

![Home Page Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805207/transcript-images/gatsby-expose-post-tag-data-for-a-gatsby-blog-home-page-example.png)

[00:17] Just for the sake of simplicity, we're going to make basically a copy of this for a tags page. We'll open up our `allTagsIndex.js` template. We'll `import React from "react"` and `import { graphql, Link } from 'gatsby'`. We'll create a constant for our `ALLTagstemplate`.

[00:31] We'll go ahead and destructure `data` right now, because we know that we're going to eventually use it. For the time being, we'll just `return` a `<div>` with another `<div>` inside of it that will just say `tags here` for now.

[00:44] Close these out. We'll `export default AllTagsTemplate`. 

#### src/tags/allTagsIndex.js+
```jsx
import React form "react"
import { graphql, links } from 'gatsby'

const AllTagsTemplates = ({data}) => {
  return (
    <div> 
     <div> 
       tags here 
    </div> 
  )
}

export defualt AllTagsTemplate
```

Our `singleTagIndex.js` page will be pretty much the same. For the time being, we'll just copy that over to. Now, let's open up `gatsby-node.js`. We're going to write a new function called `createTagPages`.

[01:01] As parameters, `createTagPages` will take `createPage` which we'll pass in as well as the list of `posts`. Similar to what we did down here on line 11 where we bring in our `blogPostTemplate`, we're going to do that here. We'll do `const allTagsIndexTemplate = path.result`, and we'll aim this at our template.

#### gatsby-node.js
```jsx
const createTagPages = (createPage, posts) => {
  const allTagIndexTemplate = path.resolve('src/templates/allTagsIndex.js')
  const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js')
}

```

[01:27] Similarly, here we'll do our `singleTagIndexTemplate`. The technique that we're going to use here is, we're going to create an empty object called `postsByTag`, and the idea here is that we'll dynamically create a key for each of our tags. Each of those keys will have an array of the posts that use that tag.

[01:47] It will make more sense in a second. What we'll do is, we'll do `posts.forEach`. Like usual, we're going to destructure the `node`. If there are `tags` in the `node`, so if `node.frontmatter.tags`, we're going to process each of them. We'll do `node.frontmatter.tags.forEach`. Bring this in its `tag`.

[02:10] Now we're going to check, if `postsByTag` does not have this `tag` as a key. We'll create it. `if` there is not `postsByTag` with the `tag` as a key, we'll set it to be an empty array and we'll `push` on the `node`.

```jsx
const postByTag = {}

posts.forEach(({node})) => {
  if (node.frontmatter.tags.forEach(tag => {
    if(!postByTag[tag]) {
    postByTag[tag] = []
  }

  postsByTag[tag].push(node)
  })
}
```

[02:28] After we've called this `forEach` on all of our `posts`, we should have a built up object that has each of our `tags` represented with an array of `nodes` for each one. Now, we'll create a master list of all of the `tags`. We'll do `const tags = Object.keys(postsByTag)`.

[02:48] Now, we'll call `createPage`. Our `path` will be `'/tags'`. The `component` will be the `allTagsIndexTemplate`. The `context` that we're going to pass will be called `tags` and it will be `tags.sort`, so this will be a sorted list of all of our `tags`.

```jsx
const tags = Object.keys(postsByTag)

createPage({
  path: '/tags'
    component: allTagsIndexTemplate, 
    context: {
      tags: tags.sort()
  }
})
```

[03:05] At this point, with this `createPage` call in place, we need to actually call this function. Down here in our main `createPage` that we've written earlier, we have our variable for `posts`, which is all of our Markdown posts.

[03:18] Now before we process each of our `posts`, we're going to call our `createTagPages` function with our `createPage` action and all the `posts` that we created.

```jsx
const posts = result.data.allMarkdownRemark.edges

createTagPages(createPage, posts)
```

[03:28] Since I've updated `gatsby-node.js`, I need to restart `gatsby` develop. I have that running in a separate tab by the way. Now on our `/tags` page, I can hit reload, and we see 'tags here' from our `template`, which is good. That means that our `/tags` page is being created.

![tags example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805207/transcript-images/gatsby-expose-post-tag-data-for-a-gatsby-blog-home-page-example.png)

[03:44] Let's go ahead and open our `allTagsIndexTemplate.js`. Now let's `console.log` our `data`, actually this will be under `pageContext` is what this gets passed to from `gatsby-node.js`. 

#### allTagsIndex.js
```jsx 
const AllTagsTemplate = ({data,pageContext}) => {

console.log(pageContext)
  return (
    <div>
        <div> 
      tags here
      </div> 
    </div>

  )
}
```

`data` is what's used for a `query` that would be inside of this template and `pageContext` is what gets passed from `gatsby-node.js`.

[04:06] I need a `console.log(pageContext)`. We have `tags` with an empty array. That must mean that I don't have any `tags` coming through. Ah! The reason why I don't have any `tags` coming through is, because in my `markDown` `query` in `gatsby-node.js`, I'm only grabbing a `path` `title` and `text`.

#### gatsby-node.js
```jsx
edges {
  node {
    frontmatter {
      path
      title
      tags
    }
  }
}
```

[04:21] Since I have updated `gatsby-node.js`, I have to rerun `gatsby develop`. Reload this. Now we see that, we have some `tags` coming through here. The three `tags` that I have in my demo `markdown` files are `this`, `that`, and the `other` obviously in alphabetical order instead.

![Markdown File Example for Tags](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224331/transcript-images/gatsby-expose-post-tag-data-for-a-gatsby-blog-Markdown-file-tag-example.png)

[04:39] Just to recap what's going on here, in `gatsby-node.js` this is our main `createPages` export. What we're doing here is we're looking for all of the markdown files inside of the `src/pages` directory. I've added `tags` down here, that way we actually are returning `tags` from our `query` that we search for.

[04:57] The result of our `query` are passed down to this `.then`. We're calling our `createTagPages` function which is creating this index of all `tags`.