Instructor: [00:00] To set up your Shopify account, you'll want to go to the [Shopify Partners program](https://www.shopify.com/partners). Shopify Partner is what Shopify calls their developers.

[00:08] We'll create an account. We need to fill out the rest of our account information, which is our business name, which I'm going to call it `Corgi Supply Inc`, you'll have to chose something different. You have to read and agree to the Partner Program Agreement, and then you can view your dashboard.

[00:20] We'll go to Stores in the top left of the webpage. Note that you'll have to confirm your email address before you can create a store. After confirming your email address, you can add a store. In this case, we'll choose a `development` store. Use a store name. Unfortunately, your name cannot be Corgi Supply, Inc., so you'll have to choose a different name, and we'll save.

[00:38] We need to add our first product to our store. I'n the `Add product` tab, click on the `Add product` button. In this case, I'm going to sell Corgi stickers, which will be the title. The description will be, `Some colorful corgis`. I'll add an image. Note that if the image doesn't show up in the images, you can hit Preview to see the image.

[00:50] Next, scroll down to `Variants`. We're going to have multiple sizes, 1x1 stickers, 2x2 stickers, and 5x5 stickers. We will specify all of that in the `Option 1` section of `OPTIONS`. We'll set up the prices, $1.00 FOR THE 1x1, $2.00 for the 2x2, and $10.00 for the 5x5. and the quantities, 500 of the 1x1, 200 of the 2x2, and 100 of the 5x5, as well as the SKUs, but we won't use SKU later.

[01:04] Now that we've created a product, we can move on to getting our app together. In the left-hand side bar, we'll click `Apps`, look past the giant hero banner and click `Manage private apps` at the bottom. We'll create a new private app by clicking on the `Create a new private app` button. This is how we'll use our credentials to access our store.

[01:20] Give you private app a name. By default, you have most of the access that you need, but we'll also need to enable the store for an API at the bottom. After enabling the store for an API, make sure that you have `Read product tags` also enabled in the `Read products, variants, and collections` option and save.

[01:34] Now that a private app has been successfully created, we have an API key. Let me share the secret. We use the `Storefront access token` in our app but copy that for later.

[01:43] That's it. You are all set up. Note that later when we use our access token, if anything is going wrong, it's often good to make sure that you've enabled all of the access that the token needs.

[01:53] The plugin we'll be using is [Gatsby Source Shopify](https://github.com/angeloashmore/gatsby-source-shopify) and the permissions can be found in How to Use section of the Read Me.
