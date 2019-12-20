Taylor Bell: [00:00] Inside of our `gatsby-node.js` file, we make a `query` that finds all of our files and then gets the `path` from the `frontmatter`. Then we cycle through all of them and call `createPage`, which creates a page for each of them using the `blogPostTemplate` component. It passes this `context`and `pathSlug` through to it. Over in our template, to see this in action, let's go ahead and `console.log(props)`.

#### src/template/blogPost.js
```jsx
const Template = (props) => {
  console.log(props)
```

[00:29] When we reload our page, we can see that our `props` have been logged out. Look at this. We have `history`, `location`, `match`, `pageContext`, which has a `pathSlug` that matches what we passed through in Gatsby.

![Template Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224331/transcript-images/gatsby-build-a-blog-post-template-with-graphql-and-gatsby-template-example.png)

[00:43] In order to get the `HTML` for our blog post, we're going to write a graphql query that will search `markdownRemark` for the file that has a `path` of `third-post`.

[00:53] Over in our `blogPost.js` template, we'll do `export const query = graphql`. This will be with a tagged template. Use the `query` keyword. When we write a `query`, we can then get our path slug variable by doing `$pathSlug`. This is a `String!`. The exclamation point means that it's required.

```jsx
export const query = graphql`
  query($pathSlug: String!) {

  }
`
```

[01:13] What we'll be looking for inside of here is we're going to look for `markdownRemark` instead of `allMarkdownRemark` since we're only looking for one file. These are the parameters that we can use in our search.

![MarkdownRemark Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224332/transcript-images/gatsby-build-a-blog-post-template-with-graphql-and-gatsby-markdownRemark-frontmatter-example.png)

[01:27] We want `markdownRemark`. We're looking for `frontmatter` where the `path` is `eq` to `$pathSlug`. We will want the `html`. We want the `frontmatter`. From the `frontmatter`, we want to get the `title` out. Save this.

```jsx
export const query = graphql`
  query($pathSlug: Sring!) {
    markdownRemark(frontmatter: { path: {eq: $pathSlug} }) {
      html
      frontmatter {
        title
      }
    }
  }
`
```

[01:42] This all looks the same so far, but we now have `data`. Remember, `data` gets passed in as a `prop` to the `component` from the `query`. In the dev tools, we can see our `html`. The `frontmatter`'s `title` was "Post C".

[01:53] Now that we know that this stuff made it over okay, we can pull them out as variables. We can do `const title = props.data.markdownRemark.frontmatter.title`, a mouthful, and `const html = props.data.markdownRemark.html`.

[02:14] We can replace our placeholder text with a `<div>`. For now, we'll give it a `className='blogPost'` so we know that it shows up. What's interesting about this `<div>` is this will be self-closing.

[02:25] We're going to use React's `dangerouslySetInnerHTML` API. We pass in an object of `__html`. Its value will be `html`. This is going to `render` the HTML from the `query`.

```jsx
const Template = (props) => {
  console.log(props)
  const title = props.data.markdownRemark.frontmatter.title
  const html = props.data.markdownRemark.html
  return (
    <div>
      <div className='blogpost'
      dangerouslySetInnerHTML={{__html: html}}
      />
    </div>
  )
}
```

[02:36] Back in the dev tools, we can see that this is a `<p>` of blah, blah, blah that's been transformed from our remark file. If we inspect this, we can see that we have our `<div>` of `'blogPost'` and our `<p>` tag of blah, blah, blah.

![Output Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224333/transcript-images/gatsby-build-a-blog-post-template-with-graphql-and-gatsby-BlahBlahBlah-Output-Example.png)

[02:47] Let's refactor this to clean it up a little bit. We'll destructure `data`. We'll destructure `markdownRemark` from our `data`. Obviously, you could go further if you want to, but that's fine for now.

[02:57] Let's add a `title`. We have our `title` and our post showing up. We can click back to the home page. We see that all of our posts have pages now. Added a little bit of style. We're good to go.

```jsx
const Template = ({data}) => {
  const {markdownRemark} = data
  const title = markdownRemark.frontmatter.title
  const html = markdownremark.html
  return (
    <div>
      <h1>style={{fontFamily: 'avenir'}}>{title}</h1>
      <div className='blogpost' 
        dangerouslySetInnerHTML={{__html: html}} style={{
          fontFamily: 'avenir'
        }}
      />
    </div>
  )
}
```
