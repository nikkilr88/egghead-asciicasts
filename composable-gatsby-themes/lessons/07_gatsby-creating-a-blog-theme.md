Instructor: 0:00 Our next themes will be a set of blog themes. Specifically, we're going to build a blog that supports multiple blogs from a core data abstraction. This is where we'll start to get into schema customization, as we will support both the product blog and the developer blog using the same core data theme by creating a set of child themes.

0:19 Let's start with `gatsby-theme-product-blog`. We'll make the directory, run `yarn init -y` in it. Then we have to look at which files we need to move into the theme. In this case, the product blog has `src/pages/blog.js` that lists all of the WordPress posts.

0:33 Also, for each individual WordPress post we have `wordpress-blog-post.js` in the templates folder of `www`. We'll move both of these files into our new theme.

0:44 Now that we've moved the files, we'll do the same thing we did in the marketing theme and the shopify theme, and move the components, `gatsby-ssr` and `gatsby-browser`, as well as the `wrap-root-element`. We'll also need the `context` file that we've created, as well as the `theme` file.

0:59 This should start to feel pretty familiar to you, as this scaffolding we're using here is a common scaffolding for building themes. We'll also copy over the empty `index.js` file.

1:09 Looking at the files we've moved over, we have the `wrap-root-element` and the associated `gatsby-browser` and `gatsby-ssr`. We have the blank `index.js` file that we'll allow node to find our package. We have a new `package.json` for our product blog.


1:24 We have `src/components` with all of our `components` in it, their `source/context` that are bootstrapped to context, we have the `pages/blog.js`, which shows the list of all of our WordPress blog posts, as well as the `templates`, which show each of our individual WordPress blog posts.

1:42 Finally, we have the `theme.js` file, which contains our theme UI presets that can be shadowed by the user. We have to go back into `www` and use the theme in the same way that we used our other themes. 

#### package.json
```json
"gatsby-theme-shopify": "^1.0.0",
"gatsby-theme-product-blog": "^1.0.0",
```

We also need to go into `www/gatsby-config.js` and do the same thing.

#### www/gatsby-config.js
```js
plugins: [
  `gatsby-theme-product-blog`,
  `gatsby-theme-marketing`,
  `gatsby-theme-shopify`,
  `gatsby-plugin-mdx`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`
  ...
]
```

2:07 Back in the `package.json` for our product blog, we'll add the same dependencies we've been adding to our other themes. This includes `@theme-ui/presets`, `theme-ui` and `isolated-theme-ui`. This brings us to the point that we've gotten to with each of our other themes as well. Now, we start taking WordPress specific logic from our gatsby-node and moving it over into our theme.

2:27 If we ran the project right now, remember to run `yarn` to link your packages in. If we run the project now, you can see that our site's `gatsby-node.js` created a page with a component that doesn't exist.

2:38 This is because we moved the template from `src/templates/wordpress-blog-post.js` out of `www` into our `theme`. We'll need to pull the `gatsby-node` logic into our `theme`, as well. Create a `gatsby-node.js` file in `gatsby-theme-product-blog`.

2:55 We can now copy over the contents of the `gatsby-node.js` in `www` and delete the things we don't care about. In this case, we're not going to handle the `blogPostTemplate`, but we can remove the template. We can remove the query. 

#### gatsby-node.js
```js
allMdx {
  nodes {
    id
    frontmatter {
      slug
    }
  }
}
```

We can remove the processing for mdx pages, the `result.data.allMdx.nodes.forEach(node => {})` block.

3:19 This leaves us with just the WordPress post creation logic. We'll also need to move the WordPress plugin from `www/gatsby-config.js` into our `themes/gatsby-config.js`. We'll create a `gatsby-config.js`.

3:33 In the `gatsby-config` for `www`, find the Gatsby source WordPress plugin, `resolve: "gatsby-source-wordpress"`. Move it into the `theme`. 

#### gatsby-config.js
```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "advancedgatsbythemescourse.home.blog",
        protocol: "https",
        hostingWPCOM: true,
        auth: {
          wpcom_app_clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
          wpcom_app_clientId: process.env.WORDPRESS_CLIENT_ID,
          wpcom_user: process.env.WORDPRESS_EMAIL,
          wpcom_pass: process.env.WORDPRESS_PASSWORD
        }
      }
    }
  ]
};
```

Make sure that you've removed the Gatsby source WordPress plugin from the www Gatsby-config. You can see that www's Gatsby-config is getting smaller and smaller.

3:58 We also need to take the `"gatsby-source-wordpress"` and move it from the `www/package.json` into our `themes/package.json`. Run `yarn` again, and we can build the site.

4:09 Now that plugin `gatsby-theme-product-blog` has created a page with a component that doesn't exist, which looks very similar to the error that we saw earlier with `www` looking for the WordPress blog post, except now, our `theme` is creating the issue instead of `www`.

4:24 The reason for this is that in Gatsby node we use `path.resolve` to get to the source template's WordPress blog post.js file. In this case, since we're using a JavaScript file, we can use `require.resolve` instead, and look for a relative path.

#### gatsby-node.js
```js
const wordPressPostTemplate = require.resolve(
  `./src/templates/wordpress-blog-post.js`
)
```

4:43 `require.resolve` is the same algorithm as the require for any other node module, and it'll return the path if it finds the module, or error if it doesn't. This means we won't have to wait until the `createPage` call gets used to find out that `wordPressPostTemplate` isn't defined, or we couldn't find it. This makes our errors easier to understand and fix.

5:04 Remember to remove all of the `allWordpressPost` logic from the `www/gatsby-node.js`. Once again, we can see that the marketing page is still functional. The swag store is still functional. Now, we have a product blog.

5:19 Notice however, that our product blog doesn't seem to be taking the styles from our theme. This is because we're still using the jsx pragma from theme UI.

5:28 We need to use it from our context. In the `templates/wordpress-blog-post.js`, `import { jsx } from "../context";`. Do the same in the `pages/blog.js` file. We'll also probably want to copy in the global logic.

5:41 You can look for something like the swag page, add the `MyThemeContext` your import, `import { Global } from "@emotion/core";`, and take advantage of it on your page. Make sure you also do this for the `blog.js` file.

5:53 Don't forget that while you're doing this, you'll also need to take advantage of the context using a hook. 

#### wordpress-blog-post.js
```js
export default ({ data }) => {
  const { theme } = useContext(MyThemeContext);
  (
    ...
  )
}
```

Now, when we take a look at our Blog, we can see that our entire theme is applied to the entire page.

6:03 Finally, we can shadow the `theme.js` file and use `deep` once again to bring the theme back in line with our site. Remember that while we are shadowing a site that we control, `www` is turning into an example application for our theme consumers.

#### theme.js
```js
import { deep } from "@theme-ui/presets";

export default deep;
```

6:18 Anybody who uses any one of these themes is going to be doing this in their site. We're just showing them how to do it here. Looking back at our site, we can see that we're still using the same theme that we were before, and that everything still works.

6:33 Now we've split out three themes. You should be getting a handle on what it takes to split out a theme, and make it so that it doesn't conflict with anything else that you're building.