Instructor: [00:00] The advanced Gatsby themes workshop code for  this course is setup into a set of branches. To start, we'll find the code URL, and we'll use that to clone the rebill. After cd-ing into the project directory, we can use ls to see our project setup.

#### Terminal
```bash
git clone https://github.com/ChristopherBiscardi/advanced-gatsby-themes-workshop-code.git
cd advanced-gatsby-themes-workshop-code
ls
```

[00:17] Note that this is a Gatsby project, so we have a number of `gatsby-` files as well as a `yarn.lock` indicating that we're using Yarn. This is important because we're about to use Yarn workspaces, which MPM does not have an equivalent for. You can run `yarn` to install the dependencies.

```bash
yarn
```

[00:33] After installing the dependencies we can take a look at the scripts in the `package.json`. Note that we have three scripts here, `develop`, `build`, and `clean` that are associated with `gatsby develop`, `gatsby build` and `gatsby clean` respectively. 

#### package.json
```json
{
  "develop": "gatsby develop",
  "build": "gatsby build",
  "clean": "gatsby clean"
}
```

We can use `yarn develop` to start our project.

#### Terminal
```bash
yarn develop
```

[00:48] Note that, while the project started up, we see a number of errors, including, `Unknown field 'allShopifyProduct' on type 'Query'`, `401 Unauthorized` errors for our WordPress plugin, and GraphQL query errors from the Shopify plugin.

[01:05] To fix these errors, we'll have to make two adjustments. Open up `gatsby-config.js`, find the location that has the `gatsby-source-shopify` plugin, and where it says `shopName`, replace it with your shop name that we got in the Shopify setup video. In my case, it's `corgi-supply-inc`.

```js
resolve: "gatsby-source-shopify",
options: {
  // ...
  // ... 
  // ...
  shopName: "your-shop-name",
}
```

[01:19] Scroll down and find the `gatsby-source-wordpress` plugin. You'll need the URL to your WordPress site. In this case, mine is `advancedthemescourse.home.blog`. Remember, this is the free domain that we chose when we were setting up our WordPress site. All the other configuration is included in `process.env` variables.

```js
resolve: "gatsby-source-wordpress",
options: {
  baseUrl: "your-url",
  protocol: 'https:,
  hostingWPCOM: true,
  ...
}
```

[01:34] After saving that, we have to create one more new file. This file will be called `.env.development`, and it will be in the root of our project.

[01:42] `.env.development` will include a number of our variables that we got from the previous setup videos for WordPress and Shopify, including the `WORDPRESS_CLIENT_SECRET`, the `WORDPRESS_CLIENT_ID`, the `EMAIL` and the `PASSWORD` for our wordpress account, and the `SHOPIFY_ACCESS_TOKEN`. Remember that `GATSBY_SHOPIFY_ACCESS_TOKEN` is storefront access token, and not the admin API token.

#### .env.development
```.env
WORDPRESS_CLIENT_SECRET={your-client-secret}
WORDPRESS_CLIENT_ID={your-client-id}
WORDPRESS_EMAIL={your-wordpress-email}
WORDPRESS_PASSWORD={your-wordpress-password}
SHOPIFY_ACCESS_TOKEN={your-shopify-access-token}
GATSBY_SHOPIFY_ACCESS_TOKEN={your-gatsby-shopify-access-token}
```

[02:03] If we save that file and run the site again with `yarn develop`, we can see that we have far fewer errors. Note that some of the 401 Unauthorized calls can be fixed, but they don't matter for us right now. Note that the Shopify calls all passed and we see times for each of them. The GraphQL query errors are now gone.

[02:20] If you open the site, you can test that the WordPress posts came in, by looking at the blog. You should have two posts, if you followed the WordPress setup guide. Note that also in the SWAG store, we'll see our Corgis, or whatever product you set up with the variance. You've now successfully set up the site.

[02:35] We'll gradually build this site into a set of themes over the course of this workshop.