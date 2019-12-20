Instructor: [0:00] Our first theme will be `gatsby-theme-marketing`. These are the pages that our marketing team will control whether through contracts or their own work. **By putting these files into a separate theme, we can enable the marketing team to have autonomy over the pages they control.**

[0:12] The relevant pages are the home page, which we're on now, the pricing page and the company page. First create a folder for the `gatsby-theme-marketing` package. 

```bash
$ mkdir -p packages/gatsby-theme-marketing
```

This will be a folder called `gatsby-theme-marketing` inside of the packages folder that we created. We can go into that folder using cd and initialize a new `package.json`.

```bash
$ yarn init -y
```

[0:38] Note that the dash Y flag skips all of the questions, but you can answer the questions if you want to. My package.json looks like this. **We're going to move three pages into our theme, company, index, and pricing.**

[0:51] To do that, we need to create the source and pages directory. 

```bash
$ mkdir -p src/pages
```

Now we can take our theme, company, index, and pricing files and move them into our theme. Remember to remove these files from the original site, as if they're in the original site, they will override the ones in your theme.

[1:14] Next, in `www`s `package.json`, we are going to add `gatsby-theme-marketing` as a dependency. 

#### www/package.json
```json
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
    "gatsby-transformer-sharp": "^2.2.23",
    "react": "^16.10.2",
    "react-dom": "^16.10.2",
    "shopify-buy": "^2.8.0",
    "theme-ui": "^0.2.44"
  },
```

In the Gatsby config for WWW, we also have to add `gatsby-theme-marketing`. Now that both files are saved, we can install our dependencies, which will link our package which is the Gatsby theme into our site WWW. Now we can run the site again.

#### www/gatsby-config.js
```js
module.exports = {
  plugins: [
    `gatsby-theme-marketing`,
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    ...
  ]
};
```

[1:48] Now that we run into an error here where Gatsby can't find `gatsby-theme-marketing` in the Gatsby config that we're using, even though we just added it. The problem here is that **nodes require algorithm, requires either an `index.js` file or main declaration in the `package.json`.**

[2:09] We can fix this issue by creating an empty `index.js` file in which I usually put a comment that says boop. That is more obvious that it's an intentionally empty file. The `index.js` file has to go in the root of our theme.

[2:22] Now we get further, but we see a new error. `Can't resolve ../components text in .../src/pages`. In this case, we're looking at the `company.js` file, but the index file also uses it as you can see here. We'll copy the entire `components` folder into our theme.

[2:43] **Note that we've copied the files and haven't moved them. This means we have a copy of the component in WWW or other pages that are using them, as well as a copy of the `components`folder in our theme, which we'll modify.** 

Note that when we view our site now, nothing has changed, even though the new files are coming from our theme and not the site itself.

[3:04] If we look at some of the components, we can see that we depend directly on theme UI, Gatsby, React, and a couple other libraries. If we go to the theme's packages adjacent, we can add theses dependencies.

#### components/header.js
```js
import { Link } from "gatsby";
import { jsx } from "theme-ui";

const NavItem = props => (
  ...
);

```

[3:16] This is important for anybody using our theme in the future, as **if we don't specify the dependencies here in the theme `package.json`, it won't install**. Note that we have the opportunity here to specify `gatsby`, `react`, and `react-dom` as peer dependencies.

[3:32] Since this is a Gatsby theme, it's guaranteed that `gatsby`, `react` and `react-dom` will be installed already. Then, we can actually skip that, unless we have a reason to block certain version of `gatsby`, `react` or `react-dom`.

```js
{
  "name": "gatsby-theme-marketing",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@theme-ui/presets": "^0.2.44",
    "theme-ui": "^0.2.44",
  },
```

[3:45] This is `@theme-ui/presets` and we'll use this package to show how the files in our theme and the themes different from the files in our site, without either of them conflicting. In the root of our site, we'll run yarn to install our dependencies.

[4:01] Right now, if we look at the `gatsby-ssr.js`, `gatsby-browser.js` and `wrap-root-elements.js` files, we see that we use a global theme provider, the provider tokens and MDX components to the entire site. This, currently, affects our theme and if we provided this in our theme, it would also affect the root site.

#### www/wrap-root-element.js
```js
const components = {
  ...H,
  ...Text
};

export default ({ element }) => (
  <ThemeProvider theme={deep} components={components}>
    <Global styles={{ body: { background: deep.colors.background } }} />
    {element}
  </ThemeProvider>
);
```

[4:20] **We'll copy the `gatsby-ssr.js`, `gatsby-browser.js` and `wrap-root-elements.js` files into our theme.** Note that in our theme, if we allow our theme to insert global styles, this will conflict with the site that uses them. Then, we'll remove the global styles declaration, as well as the correspondent import.

#### www/wrap-root-element.js
```js
import React from "react";
import { MyThemeContext } from "./src/context";
import { swiss } from "@theme-ui/presets";
import theme from "./src/theme";
import * as H from "./src/components/headings";
import * as Text from "./src/components/text";

export default ({ element }) => (
  <ThemeProvider theme={swiss} components={components}>
    {element}
  </ThemeProvider>
);
```

[4:44] We'll also change the tokens preset and pass it in to our theme provider with the `swiss` preset. This will make it more obvious that we're using the marketing theme to render these pages rather than the site itself, which uses the `deep` preset. Now, we can run the site again.

[5:00] After running the site, we refresh our page. We'll see that the colors for the navigation and our page changed but, also, all the colors in our blog, our dev blog and our swag site all changed as well.

[5:15] What's happening here? The problem of conflicting theme providers, conflicting React context or other global elements of your app, it's an easy trap to fall into when developing themes for general consumption.

[5:28] **We have a solution now and that's using our own React Context for our theme.** We'll add `isolated-theme-ui` to the dependencies list in `gatsby-theme-marketing`. 

#### gatsby-theme-marketing/package.json
```json
{
  "name": "gatsby-theme-marketing",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@theme-ui/presets": "^0.2.44",
    "theme-ui": "^0.2.44",
    "isolated-theme-ui": "1.0.1"
  },
  ...
}
```

Then we'll create a new file and source called, `src/context.js` This file imports a JSX pragma and an MDX pragma from the `isolated-theme-ui` package.

#### context.js
```js
import React from "react";
import { jsxPragma, mdxPragma } from "isolated-theme-ui";

export const MyThemeContext = React.createContext({
  theme: {},
  components: {}
});

// our custom pragmas, bootstrapped with our context
export const jsx = jsxPragma(MyThemeContext);
export const mdx = mdxPragma(MyThemeContext);
```

[5:54] If we look at our components, we can see that we're already using the JSX pragma from theme UI and we're about to replace that.

#### components/header.js
```js
/** @jsx jsx */
import { Link } from "gatsby";
import { jsx } from "../context";

```

We create our own React Context with theme and components keys and then we bootstrap our own pragmas using the functions from `isolated-theme-ui` and our own `MyThemeContext`.

[6:17] Because we're using our own `MyThemeContext`, nobody else we'll be able to conflict with the values that we set here without explicitly using our context to provide values. We'll also create a new file called, `theme.js`

[6:29] In this file, we'll take the import of our theme UI preset from our `wrap-root-elements.js` and export it as a default export. 

#### theme.js
```js
import { swiss } from "@theme-ui/presets";

export default swiss
```

We move this file into `src` because this allows any consumer of our theme to shadow this as we'll see later. We've provided a default set of tokens that can be changed out by the user.

[6:49] We're now going to get rid of the theme provider from theme UI because we're going to use our own. We'll Import `MyThemeContext` from the `context.js` file we just created as well as the `theme` from the token's file we just created.

[7:00] We will replace theme provider with `MyThemeContext.Provider` imported from our bootstrap context. We'll also set `theme` and `components` as their own keys and the values for the provider. Now that we've provided our tokens through own context, we can use them in our components.

#### gatsby-theme-marketing/wrap-root-element.js
```js
import React from "react";
import { MyThemeContext } from "./src/context";

import theme from "./src/theme";
import * as H from "./src/components/headings";
import * as Text from "./src/components/text";

const components = {
  ...H,
  ...Text
};

export default ({ element }) => (
  <MyThemeContext.Provider 
    value={{
      theme,
      components
    }}
  >
    {element}
  </MyThemeContext.Provider>
);
```

[7:18] In `header.js`, we'll replace the JSX import with an import from `context.js`. 

#### header.js
```js
import { jsx } from "../context";
```

We'll do the same in the other components' files, `heading.js`. Finally, we can re-introduce the global styles that we removed earlier from `wrap-root-elements.js` into each of the pages that we'll be rendering from our theme.

[7:42] We'll need `useContext` from React as well as the `Global` component from the motion core and `MyThemeContext` from the theme context we bootstrapped earlier. Then we can use the `useContext` hook to pull the `theme` out of our context and apply it using the Global component. We'll want to do this in each of the other pages as well (`pricing.js`).

#### company.js
```js
import React, { useContext } from "react";
import { Global } from "@emotion/core";
import { MyThemeContext } from "../context";
import Header from "../components/header";
import * as H from "../components/headings";
import * as Text from "../components/text";

export default props => {
  const { theme } = useContext(MyThemeContext);
  return (
    <div>
      <Global styles={{ body: { backgroundColor: theme.colors.background } }} />
      <Header />
      <H.h1>Company Page</H.h1>
      <Text.p>about us and stuff</Text.p>
      <H.h2>Employees</H.h2>
      <Text.p>hopefully they don't leave</Text.p>
      <H.h2>Investors</H.h2>
      <Text.p>Thanks for money yo</Text.p>
    </div>
  );
};
```

[8:02] **Note that using the `Global` component and page templates and pages that we control in our theme is OK because the `Global` component we'll mount and unmount when those pages mount and amount.** This means our global styles only affect pages that we control as opposed to pages that a user controls or another theme controls.

[8:23] Now that if we look at our site now, we can see that the home page, the pricing page and the company page have their own style while the blog page, the depth blog and the Swag store as well as our app all have the original site style.

[8:37] That's it. We've created a `gatsby-theme-marketing` that can be controlled completely by our marketing team. It comes with a default style and three pages. These pages can be extended by the team and when we integrate this back into our site, we can make sure it uses the token set that our site wants to use.

[8:56] To do this, we'll shadow the themes file we created earlier in WWW in source. We'll create a new file under `gatsby-theme-marketing/theme.js`. In this file, we'll import the `deep` theme from theme UI presets and exported it as the default export.

#### www/src/gatsby-theme-marketing/theme.js
```js
import { deep } from "@theme-ui/presets";

export default deep
```

[9:15] This `theme.js` file shadows the theme file in our theme and changes the tokens sets that the theme is going to use. If we rebuild the site, we can see that it changes the using the deep theme even though the token set that our theme uses is different than the token set that our site is using. We still have a unified experience across all of our pages.

[9:42] **This allows us to install our theme into any site without worrying about breaking anything on that site and without worrying about that site breaking us.** This is an important concept if you're going to create themes for public consumption.
