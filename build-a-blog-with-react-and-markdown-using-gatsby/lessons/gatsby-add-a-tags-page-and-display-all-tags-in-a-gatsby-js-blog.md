Instructor: [00:00] We have a list of tags, but they're not being shown on our index page. Let's fix that. Inside our source/templates directory, we're going to create two new files, one template that lists all of our tags and another template that displays the posts that match a single tag.

[00:14] We'll bring in React and . We'll destructure pathContext from our props. We'll pull tags out of our pathContext. If there are tags, we'll map over them to create a bullet list. Each bullet item will be a link to tags/ the tag. The link itself will just be the word of the tag.

[00:30] The tags template will be essentially the same thing. We'll pull posts and the tag name out of the pathContext. If there are posts that match the tag, we'll display them as a list. We'll display a header. For each post, the link will go to the post's frontmatters path. We need to update gatsby-node.js to actually generate the pages.

[00:47] After we've declared the posts' variable, we'll call a new function that we're going to write called createTagPages. We'll pass in the createPage action and the posts. We'll go ahead and write the createTagPages function at the top of the file.

[01:01] The first thing we'll do is we'll bring in our tag templates. We'll also set up an empty object called postsByTags. We'll do posts for each and destructure out each node. We're only going to do something if there are tags. Then, for each tag, we're going to look and see if it's already in the object. If it's not, we'll add it. Then we'll push the node into the tag.

[01:21] We'll go ahead and create a tags variable that will be a list of every tag present in our marked-down blog. We'll call createPage to build our index of all the tags where the path will be /tags. The component will be the allTags template. For context, we'll pass a sorted list of all of our tags.

[01:38] Now we'll build the individual tag pages. We'll do this with the tags.forEach. Our posts array will be pulled from the posts by tags. We'll call createPage for each, putting the tags/ tag name as the path. The component will be the tag page template. For context, we'll pass all of the posts and the tag name for the specific tag.

[01:57] This is everything we need to do in the createTagPages function, although I realize that I have a typo down here. This needs to be plural. Let's look over this. Our tags template is actually at tags.js. These need to be plural -- posts by tags, not post.

[02:16] Now that we're processing all of our tags, we need to update our index page in order to show the tags. We'll add a pages/index.js. Below the frontmatter excerpt, we'll set up an unordered list where we'll map over post.frontmatter.tags. We'll return a list item that will be a link to tags/ and then the current tag. The link will be our tag text.

[02:37] We'll restart gatsby develop. Inside Chrome, it looks like we have a tags list. When we click one, if I navigate to /tags, these are all the tags we have in use.