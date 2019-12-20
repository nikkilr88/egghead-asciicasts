Taylor Bell: [00:00] Now that we know that our `/tags` page is being created, we're going to go ahead and create an individual `/tags/other/this` URL and make this work, literally make this work. Now, in `gatsby-node.js` we will do a `tags.forEach`. Each one of these will be from the `tagName`.

[00:20] Then we need to grab our list of `nodes` or `posts`. We'll do `posts = postByTag` and `tagName`. Then, we'll have a similar call to `createPage`, so we'll `createPage` and we will pass it the `path` of, we're going to use a string template, so `/tags/` and we will interpolate `tagName`.

[00:41] Our `component` will be `singleTagIndexTemplate`. Our `context` will be the `posts` and the `tagName`. 

#### gatsby-node.js
```jsx
createPage({
  component: allTagsIndexTemplate, 
  context: {
    tags: tags.sort()
  }
})
tags.forEach(tagName => {
  const posts = postByTag[tagName]
  
  createPage({
    path: '/tags/${tagName}',
    component: singleTagIndexTemplate 
    context: {
      posts,
      tagName 

    }
  })
})
```

Similarly to what we did before, we're going to need to edit our `singleTagIndex.js` page. We'll come in here and we'll interpolate the `pageContext`.

[01:00] Now, we will `console.log(pageContext)`, save this. 

#### singleTagIndex.js
```jsx
const SingleTagTemplate = ({data, pageContext}) => {
  console.log(pageContext)  
  ...
}
```

Once again, I'll restart `gatsby` develop, reload the page. We can see that we have our `tagName: "this"` matches the URL here. These are the `posts` that have that `tag`.

![tagname URL Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805208/transcript-images/gatsby-use-pagecontext-to-display-tags-in-gatsby-Post-with-tags-example.png)

[01:19] Since we know that the `tags` are making it over from the `pageContext`, we can go ahead and update our template. The first thing we can do is destructure posts and the `tagName` from our `pageContext`. We'll delete our placeholder and we will write `Posts about`, and we'll interpolate our `tagName`.

[01:36] Let's add another `<div>` here. Let's do a `ul`. Inside of the `ul`, we will `map` over our `posts` and return an `li`. We'll do `posts.map`. We'll have a `post` and an `index`. We will `return` an `li`. We'll add a `key` that will be our `index`. We will `Link`. The to `prop` will be `post.frontmatter.path`, and it will be `post.frontmatter.title`.

#### singleTagsIndex.js
```jsx
const SingleTagsTemplate = ({data, pageContext}) => {
  const { posts, tagName } = pageContext
  return (
    <div> 
     <div> 
       Posts About {`${tagName}`}
       </div>
       <div> 
       <ul>
       {posts.map((post, index) =>{
         return (li key={index}>
         <Link to={post.frontmatter.path}>
         {post.frontmatter.title}
         </Link>
         </li> 
         )
       }
       )}
       </ul>
    </div> 
  )
}
```

[02:07] Close out the `Link`. Save this. We have a bulleted list of our `posts`. Let's give our `allTagsTemplate` a similar treatment. We'll `console.log(pageContext)`. 

#### allTagsIndex.js
```jsx
const AllTagsTemplate= ({data, pagecontext}) => {
  console.log(pageContext)
}
```

We can see that we just have an array of `tags`, so we will destructure `tags` from the `pageContext`.

![Array of tags example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224331/transcript-images/gatsby-use-pagecontext-to-display-tags-in-gatsby-Array-of-tags.png)

[02:24] We can delete our placeholder. We will do a `ul`, and inside, we'll do `tags.map`. This will have a `tagName` and an `index`. From here, we will `return` an `li`, where the `key` is our `index`. Each item will be a `link` to `tagName`.

[02:51] Then, `this` will just be the `tagName` will be the `link`. Close out the `Link` here. Save the template and we have.

#### tags.allTagsIndex.js
```jsx
const AllTagsTemplates = ({data, pageContext}) => {
  const { tags } = pageContext
  return (
    <div> 
     <div> 
     <ul>
       {tags.map((tagName, index) => {
         return (
           <li key={index}>
           <Link to={'${tagName}'}>
           </li>
           </Link> 
         )
       })}
       </ul> 
    </div> 
  )
}
```

[03:04] I don't need the extra `tag` right there. Let's go back, refresh this. There we go. Posts about `that`, posts about `this`, and posts about the `other`. Let's do that magic styling thing. Much better. Now, back on our home page, let's go ahead and add a `link` to browse all `tags`.

[03:24] After we map everything, we'll add another `div`. Then inside of the `div`, we'll do a `link` to `/tags`, and we'll say, `Browse by Tag`. Close the `link` out, save it. We got to `browse by Tag link`, click it, and we get to `/tags`.

#### index.js
```jsx
<div>
  <Link to='/tags'>Browse by Tag</Link>
</div>
```

[03:43] Our `links` are broken again, because we're missing `tags` this time. We'll go back to our `allTagsIndex`, and add a leading slash. 

#### allTagsIndex.js
```jsx
<li key={index}>
  <Link to={`/tags/${tagName}`}>
    {tagName}
  </Link>
</li>
```

Now it works.