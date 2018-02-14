Instructor: [00:00] We've created a blog post template and now when we click one of these, we get a 404 page because our page has not actually been built yet. In order to build our pages, we're going to use Gatsby's createPages Note API.

[00:11] Back in the root of the project, we're going to do a new file called gatsby-node.js. Since we need to access our local file system we'll require path. Gatsby processes every export from gatsby-node.js, so we'll write an export that takes advantage of the createPage action from the bound action creators and GraphQL. We'll pull out createPage from the bound action creators and we'll bring in our blog post template.

[00:36] The createPages export returns a promise that we'll start with our GraphQL query. Our query starts with allMarkdownRemark. Each node or post will have its generated HTML and ID and front matter keys matching what we have at the top of our markdown posts. After the query we'll add a dot then to actually process the results.

[00:54] If there's errors we'll reject the promise. To make this more clear we'll make a posts variable from our allMarkdownRemark edges. For each post we'll pull out the node and use that to call createPage. The path'll be the path to the blog post and the component will be the blog post template.

[01:09] Speaking of which, in the blog post template, title and date come from front matter. Now we'll restart Gatsby Develop, reload the page, and there's our posts.