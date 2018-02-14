Instructor: [00:00] Gatsby's build all our posts, but in order to navigate between them, I have to go back home and choose a new one. It'd be easier to add next and previous links to each post. We can do this inside of gatsby node js.

[00:11] First, let's add the index to our For-each loop. It will add the context object after the component. Let's create a key called, "Prev." If it's zero, there is no previous ones, so we'll make it null. Otherwise, we'll look for the node or post at index-1.

[00:24] We'll do a similar check for next. If the index is equal to post start link-1, that means it's the last one, otherwise it would be the same as above, but with index+1. We need to update our blog post template to actually make links.

[00:37] When we define our template, we'll also destruct a path context. We'll destruct a next end prev from the path context. Let's add the links below our post. We'll display a previous link, if it exists. This is our link from gatsby-link, and our two prop would be prev.frontmatter.path and our link will be prev.frontmatter.title.

[00:59] Just to make this simple, we'll do the same thing. We'll just copy and paste it, and just change it to next. [laughs] Although, next js doesn't really work. I also noticed that, I had an extra comma after the month, so we'll go into deep there from our GraphQL Query. Now, we'll restart gatsby develop, reload our page, and there we go.