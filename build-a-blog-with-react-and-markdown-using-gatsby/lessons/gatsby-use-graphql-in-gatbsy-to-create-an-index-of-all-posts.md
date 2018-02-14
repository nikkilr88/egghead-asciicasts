Instructor: [00:00] I'm in the My Blog directory, and I've run gatsby develop, which is running at localhost 8000. Inside my pages directory, I've got a few blog posts, but it'd be nice to display them on my blog.

[00:13] In order to do that, we're going to add a GraphQL query to index.js. Export const to query equals GraphQL, and then between a couple back ticks, we're going to call our query index query, so we're querying from all markdown remark. We'll want a total count, and then we'll set up edges, and then we'll add node.

[00:34] Each edge is the file system path to the node, which is our post. We'll give it an ID, and then from the front matter, we're going to want the title and have the date, pass it some formatting here, path, tags, and the excerpt we wrote.

[00:48] Now, that we have the GraphQL query written, let's update our component to actually display our data. We'll start by destructuring data into our index page component, and I'm going to reformat this so we can have a return statement.

[01:00] Now, we'll destructure edges and posts from data.allmarkdownremark. I'm going to clear out our existing markup, and we're going to map over our posts. We'll do posts.map, and then we'll get our post from our node, and then we'll destructure our front matter from our post. We'll return a div with an H2, and each H2 will have a link.

[01:24] We'll do a link to our frontmatter.path, and it will be called frontmatter.title. Then we'll have our date and our excerpt, save the file, and all of our posts are showing up.