Taylor Bell: [00:00] In order to take a look at what kind of stuff we can query from Gatsby, let's go ahead and run `gatsby develop` in our "My blog" directory. 

#### Terminal
```
$ gatsby develop
```

Once it spins up, you'll be able to see that we can view the GraphiQL browser at `http://localhost:8000/___graphql`.

[00:15] We've got the GraphiQL browser open and over on the side here, we can see the documentation explorer, which lets us go through our schema and look at what kind of stuff we can query for. We can click on the root query type.

![GraphiQL Example](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1542224333/transcript-images/gatsby-use-the-graphiql-browser-to-build-queries-for-gatsby-GraphiQL-Example.png)


[00:29] This gives us a list of all of the stuff that we can look for. Let's take a look at `site` and `siteMetadata`. We can start typing an s, and we'll see an autocomplete for site. We can see here that `siteMetadata` is one of the keys we can type in. Let's take a look at that.

[00:46] I'm going to hit command and enter to run it. Now, what we can see is from the `siteMetadata` that's located inside of our `gatsby-config.js file`, our `title` and `description` have come out.

#### GraphiQL Input
```
{
  site {
    siteMetadata {
      title
      description
    }
  }
}
```

#### GraphiQL Output
```
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "My Blog",
        "description": "This is my cool blog."
      }
    }
  }
}
```

[00:58] Let's try another query. Scrolling through our schema, we can see `allMarkdownRemark` and it looks like we have a `MarkdownRemarkConnection`. Let's click that. These are some of the fields that we can look at.

![MarkdownRemarkConnecion Fields](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805209/transcript-images/gatsby-use-the-graphiql-browser-to-build-queries-for-gatsby-markdown-remark-connection-fields.png)

[01:11] We can see edges here. Think about `edges` as the file paths. Let's type in `edges`. When we type that in, we can see that we have three different `edges`. This isn't super helpful right now.

![Edges](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805207/transcript-images/gatsby-use-the-graphiql-browser-to-build-queries-for-gatsby-edges.png)

[01:22] Let's see what other stuff we can find. We see `node`, which is each one of our files. Using the schema, we can see that each node has `frontMatter`. Let's erase the `id` and go with `frontmatter`. You can see that our `frontmatter` has been expanded to include all of the stuff that it has.

[01:40] If we're only interested in looking at titles, we can go ahead and try it like that. There's just the titles.

#### GraphiQL Input
```
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
        }
      }
    }
  }
}
```

![Frontmatter Titles](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1541805209/transcript-images/gatsby-use-the-graphiql-browser-to-build-queries-for-gatsby-frontmatter-titles.png)