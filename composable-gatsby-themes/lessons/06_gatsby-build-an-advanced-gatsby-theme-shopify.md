Instructor: [00:00] Now that we've built our first theme, `gatsby-theme-marketing`, we'll take the concepts that we used building that theme and build a slightly more advanced theme. **The next theme we're going to build is Gatsby theme Shopify, which we use the Shopify source to go out and get our product variance from Shopify, and then render them on our Gatsby site.**

[00:19] We'll need to create a new directory for our Shopify theme, then `yarn init` to create the `package.json` file. We'll need to make the `src` and the `pages` directories again. We'll need to move the swag store into our theme.

#### terminal
```bash
$ mkdir packages/gatsby-theme-shopify
$ cd packages/gatsby-theme-shopify
$ yarn init -y
$ mkdir -p src/pages
$ mv ../../www/src/pages/swag.js src/pages/
```

[00:52] This leaves us with a `package.json` and `src/pages/swag.js`. We'll use the theme the same way we did for the marketing theme, by adding it to our `package.json` and the Gatsby config. 

#### www/package.json
```js
{
  "name": "www",
  "version": "1.0.0",
  "main": "index.js",
  "author": "christopherbiscardi <chris@christopherbiscardi.com> (@chrisbiscardi)",
  "license": "MIT",
  "dependencies": {
    ...

    "gatsby-source-wordpress": "^3.1.43",
    "gatsby-theme-marketing": "*",
    "gatsby-theme-shopify": "*",
    "gatsby-transformer-sharp": "^2.2.23",
    "react": "^16.10.2",
    "react-dom": "^16.10.2",
    "theme-ui": "^0.2.44"
  },
```
#### www/gatsby-config.js
```js

module.exports = {
  plugins: [
    `gatsby-theme-marketing`,
    `gatsby-theme-shopify`,
    `gatsby-plugin-mdx`,
    
    ...
  ]
};
```

Remember, we also need to create the `index.js` file to avoid the not found error.

#### terminal
```js
touch index.js
```

[01:18] We'll copy the components directory, the `gatsby-browser.js`, `gatsby-ssr.js`, theme context, and `wrap-root-element.js` files into our new theme, from the marketing theme. **Since we already did this work in the marketing theme, we can take advantage of that work by copying the files over from there instead of copying the files from www and having to modify them again.**

[01:42] Now that we've moved the files over, we'll change `swiss`, the `funk` in our `theme.js` file. This gives us a third set of tokens that contrast against our other theme and the tokens we used in www. 

#### gatsby-theme-shopify/src/theme.js
```js
import { funk } from "@theme-ui/presets";

export default funk;
```

Note that we'll copy over the dependencies that we introduced in `gatsby-theme-marketing` into our Shopify theme as well.

#### package.json
```js
{
  "name": "gatsby-theme-shopify",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@emotion/core": "^10.0.21",
    "@theme-ui/presets": "^0.2.44",
    "theme-ui": "^0.2.44",
  }
}
```

[02:09] Our `swag.js` page's still using the JSX Pragma from `theme-ui`. We'll change that to point to our context. We'll import `useContext` from React. We'll also import `MyThemeContext` from our context for some manual usage later.

#### gatsby-theme-shopify/src/pages/swag.js
```js
/** @jsx jsx */
import { useContext } from 'react';
import { MyThemeContext, jsx } from "../context";
import { graphql } from "gatsby";
import { Global } from "@emotion/core";
```

[02:28] Also, remember to import the `Global` component. This will take advantage of the same behavior as we did in our marketing theme. It introduces the global styles for our theme styles, per page, that we control. Inside the `default export`, get the `theme` from our `MyThemeContext` context and introduce the global styles.

```js
export default ({ data, ...props }) => {
  const { theme } = useContext(MyThemeContext);

  return (
    <div>
      <Global styles={{ body: { backgroundColor: theme.colors.background } }} />
      <Header />

      ...
    </div>
  )
}
```

[02:48] Back in www, we have a number of dependencies from our package.json that we can now move over to our Shopify theme. This includes dependencies like `gatsby-image`, `gatsby-source-shopify`, and `shopify-buy`.

[03:03] **Note that as you move the gatsby-source-shopify and `shopify-buy` dependencies over from www, we can remove them from the original `package.json`. Note that also, because we used gatsby-image in the rest of the site, we won't remove it from the original package.json.**

[03:20] This is also true for plug-ins like `gatsby-transformer-sharp` and `gatsby-plugin-sharp`, which are both used in other aspects of our site. Save both `package.json`s and we'll move on to the `gatsby-config.js`.

#### gatsby-theme-shopify/package.json
```js
{
  "name": "gatsby-theme-shopify",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@emotion/core": "^10.0.21",
    "@theme-ui/presets": "^0.2.44",
    "theme-ui": "^0.2.44",
    "isolated-theme-ui": "1.0.1",
    "gatsby-image": "^2.2.29",
    "gatsby-source-shopify": "^3.0.24",
    "shopify-buy": "^2.8.0",
    "gatsby-plugin-sharp": "^2.2.32",
    "gatsby-transformer-sharp": "^2.2.23"
  },
```

[03:32] Open the `gatsby-config.js` for www and also create a new `gatsby-config.js` in `gatsby-theme-Shopify`. We'll take the two sharp plug-ins and copy them over. We'll also move the `gatsby-source-shopify` plug-in over. The gatsby-config for www is now one plug-in shorter than it used to be.

#### gatsby-theme-shopify/gatsby-config.js
```js
module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-shopify",
      options: {
        // The domain name of your Shopify shop. This is required.
        // Example: 'gatsby-source-shopify-test-shop' if your Shopify address is
        // 'gatsby-source-shopify-test-shop.myshopify.com'.
        shopName: "corgi-supply-inc",

        ...
      }
    }
  ]
};
```

[03:52] As we build out more themes, we'll see fewer and fewer plug-ins in the www gatsby-config, as they will be moved into our theme. `gatsby-source-shopify` takes some options, which is `paginationSize` for both and `accessToken`.

[04:06] The way we have this setup, doesn't allow us to pass any options in. The one exception is `proccess.env.shopify` access token, which comes from the environment variables. If we wanted to allow the user to change the `shopName`, we have to change the module that exports declaration in gatsby-config to be a function.

```js
module.exports = options => ({
  
  ...
  
  })
```

[04:25] **Be sure to return an object from this function, as if you don't use the parenthesis around this opening bracket, the function will be treated as a function body, instead of an object return.** Using the options that come in, we'll spread any additional options for the `sourceShopify` into the option's object.

```js
module.exports = options => ({
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-shopify",
        options: {
        
          ...

          includeCollections: ["shop"],
          ...options.sourceShopify
      }
    }
  ]
});
```

[04:45] This allows the user to override the shop name, the access token or any of the other defaults that we've set for them, as well as passing any or their own. Since we already have the plug-in setup the way we wanted, we don't need to use the options in the gatsby-config in www.

[05:01] It's important to note that the options, if we were to use them in www, are passed in the same as any other plug-in's options.

[05:09] Finally, in `swag.js`, we have a hardcoded domain. Go on and change this domain to an environment variable. 

#### gatsby-theme-shopify/src/pages/swag.js
```js
const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN
});

```

While on gatsby Shopify domain, using the Gatsby prefix on an environment variable, means that the environment variable automatically gets injected into the client site bundle. If we don't prefix it with Gatsby, we would either have to manually pass the environment variable in, or it wouldn't be included at all. This would allow us to use secrets in gatsby-node without including them in our client site bundle.

[05:44] **It's important to note at this point, that if you pass secrets into the options of a theme and you have a gatsby-browser file, any option you pass in will be leaked to the client.** This is why it's important to use `process.env` to access any secrets in gatsby-node.

[06:05] We can now go into www and add the environment variable. Depending on how we want to access the environment variables or configuration options in gatsby-config, **there are a number of other options we can use to get values into either our client bundle or a gatsby-node file.**

[06:21] These include **static queries and custom configuration nodes** that take advantage of the create node API that Gatsby has for its GraphQL system, **manual usage of web packs define plug-in, or React context in a wrap root element.** There's a lot of flexibility in decision making here. Make sure you choose the approach that's best suited for your needs.

[06:45] Back in the root of our project, we'll run Yarn to link in `gatsby-theme-shopify`. Now, we can run the site and check out our Shopify theme. Note that our marketing theme still functions. We have both of our blogs.

[06:58] Then, when we go to the swag store, we get the new theme on the swag store. Finally, to use the www tokens applied to the Shopify theme, we can create a shadowed file, like we did for `gatsby-theme-marketing` or `gatsby-theme-shopify`.

[07:14] We'll copy the `deep` preset from our marketing theme, as that's the preset that we use in www. **Note that when creating new shadowed files for the first time, you may need to restart Gatsby developed to see them show up.** Now, we can see the swag store uses the `deep` preset again.

#### www/src/gatsby-theme-shopify/theme.js
```js
import { deep } from "@theme-ui/presets";

export default deep;
```
