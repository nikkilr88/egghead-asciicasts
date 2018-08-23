I'm in the source directory of `my-blog`, and we have and folder for `layouts` and `pages`. Let's go ahead and make one for `templates`. And now with the `templates` directory, I'm going to create `blog-post.js`.

So, we'll 

#### templates/blog-post.js
```js
import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

```

So, our `Template` is going to be a stateless functional component, and we're going to destructure `data` and `location` from props. We'll get `markdownRemark` and `post` from our `data`. We'll get `frontmatter` and `html` from our `post`. Inside of our `return` we'll use `Helmet` to get a dynamic title. And then inside of a `<div>` we'll do an `h1` with our `title`, and `h3` with our `date`. We'll do a self-closing `<div>` that will use react's `dangerouslySetInnerHTML` api, and when we use that, I have to pass in an object, and we'll do `__` for each html. And this will render the html that's been created from our markdown post.

Then `export default Template`.

```js
const Template = ({data, location}) => {
    const { markdownRemark: post } = data
    const { frontmatter, html } = post

    return (
        <div>
            <Helmet title={`${title} - My Blog`} />

            <div>
                <h1>{title}</h1>
                <h3>{date}</h3>

                <div dangerouslySetInnerHTML={{__html: html}} />
            </div>
        </div>
    )
}

export default Template
```

Now that we've written our `Template` component, we need to put together our grapql query that will get our post into the template. 

So we'll do `export const pageQuery = qraphql`. We'll call our `query BlogPostByPath`, and we're going to want the path to our actual file, which will be a `string`. Now for `markdownRemark`, we're going to look for the `path` that we specified in our `frontmatter`, and we'll want the `html`, and we'll pull out some stuff from the `frontmatter`.

```js
export const pageQuery = qraphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: {path: {eq: $path } }) {
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                path
                tags
                excerpt
            }
        }
    }
```

And our templates ready to go!