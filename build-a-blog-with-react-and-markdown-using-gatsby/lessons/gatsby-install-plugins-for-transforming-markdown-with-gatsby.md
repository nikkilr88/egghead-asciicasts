Taylor Bell: 00:00 In order to have Gatsby convert our markdown into our site, we're going to need to install a couple of plugins. Let's do `npm install --save gatsby-source-filesystem@next gatsby-transformer-remark@next`

#### Terminal
```
$ npm install --save gatsby-source-filesystem@next gatsby-transformer-remark@next
```

[00:15] Once that's installed, we're going to create a new file called `gatsby-config.js`, which contains some configuration for Gatsby in a .js file. 

```
$ touch gatsby-config.js
```

In that file, we'll do `module.exports`. We'll provide a `siteMetadata:` key, give it a title of `'My Blog`, and description of, `'This is my cool blog.'`.

#### gatsby-config.js
```javascript
module.exports = {
  siteMetadata: {
    title: 'My Blog',
    description: 'This is my cool blog.'
  },
}
```

[00:40] Now that we have the `siteMetadata` object created, we'll add an array of `plugins`. First, we'll do `gatsby-transformer-remark`. Now we'll use an object because we're going to need to pass some options.

[00:53] We'll `resolve` our plugin `gatsby-source-filesystem`. Then it can take an `options` object with a `name`. We'll call it `'pages'`. Its `path` will be in our current directory, so we'll do a string template with `${__dirname}/src/pages`.

```javascript
module.exports = {
  siteMetadata: {
    title: 'My Blog',
    description: 'This is my cool blog.'
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    }
  ]
}
```