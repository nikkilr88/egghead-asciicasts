Instructor: [0:00] After running `yarn develop` the site will appear. Note that we have a number of different pages and a number of different pieces of functionality. We have a couple of marketing pages, which is the `Home` page, the `Pricing` page, and the `Company` page as well as a `Blog` that sources its content from WordPress, the individual WordPress blog post.

[0:17] A `DevBlog` that sources its content from MDX files and the individual pages for those, a `SWAG` store that sources its data from Shopify and contains functional `Buy Now!` buttons as well as an authenticated area but as a client-side Reach Router app, which could contain authenticated restricted content such as a dashboard.

[0:41] If we look at the code, we can see that our `gatsby-ssr.js` and `gatsby-browser.js` files contain a `wrap-root-element`. This wrap root element uses the theme UI `ThemeProvider`, applies a couple of global styles, and passes in a set of MDX `components`.

[0:56] We also use the `theme` UI preset `deep` for our tokens. Our `gatsby-node.js` is where all of our page creation happens. We have the `blogPostTemplate` for MDX and the `wordPressPostTemplate` for WordPress posts.

[1:09] We have a GraphQL query to get the content, and then we loop over the MDX nodes. We loop over the WordPress nodes to create each of the pages from our template file. Our MDX files are in a `content` folder at the root of the project. Inside of `dev-blog` in date prefixed folders we have `index.mdx` files. These have a `title` and a `slug` and some content.

[1:34] In our `src` folder we have both of the `templates`, one for MDX using the MDX renderer and Gatsby plugin MDX and one for WordPress. Note that the MDX and the WordPress templates both render content slightly differently, but later in the workshop we'll actually combine these.

[1:52] The marketing pages are plain JavaScript files that use our components. This includes the `index.js` page, `pricing.js` page, as well as the `company.js` page. The `blog.js` and `dev-blog.js` pages for our MDX and WordPress posts contain a query for all of the posts for the relevant product blog of Devblog.

[2:13] You can think of these as product announcement in the product blog or developer features on the engineering blog. Finally, we have the `app.js` file, this file contains a Reach Router application embedded inside of our Gatsby application.

[2:27] This is a client side only app, which means that we get to do whatever we want with Reach Router, in this case we're switching between rendering the `Home` as well as the `dashboard`. If you were going to use authenticated content this is where you would be authenticated restricted routes.
