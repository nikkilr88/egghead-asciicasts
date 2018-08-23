I'm going to get started by doing `npm install -g gatsby-cli`. And then after it's done doing it's thing, I'll do `gatsby new my-blog` and when it's done, I'll `cd my-blog`.

And then I'm going to install a couple plugins to convert Markdown into HTML. I'll do `yarn add gatsby-source-filesystem gatsby-transformer-remark`.

Okay, now that the plugins are installed, we need to add them into our `gatsby-config` file. I'll reformat this file a little bit. Now, under plugins we'll add `gatsby-transformer-remark`, and then we can feed a configuration object that will setup `gatsby-source-filesystem` for us.

#### gatsby-config.js
``` js
plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`
    {
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `src`,
        path: `${__dirname}/src`
}
```

And now we're set up!