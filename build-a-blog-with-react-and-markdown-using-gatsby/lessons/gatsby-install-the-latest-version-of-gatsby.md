Taylor Bell: [00:00] To get started, we're going to run `npm install --global gatsby@next gatsby-cli@next`. 

#### Terminal
```
$ npm install --global gatsby@next gatsby-cli@next
```

This ensures that we get our latest versions. We'll let npm do its thing. Once npm is done installing, we'll run `gatsby -v` to make sure that we're running greater than version 2.

```
$ gatsby -v
```

[00:17] Now that we've confirmed that, we can run `gatsby new`. I'm going to call it `my-blog`. I'm going to pass it the Github repo of the Gatsby starter "Hello world," which is the minimum viable Gatsby. 


```
$ gatsby new my-blog  
$ htps://github.com/gatsbyjs/gatsby-starter-hello-world\#v2
```

Once that done installing, we'll go into the `my-blog` directory, and we'll run `yarn` to install all of the dependencies.

```
$ cd my-blog
$ yarn  
```

[00:37] With the dependencies installed, we can run `gatsby develop`. Once it loads up, we'll see that it's running a "Hello world!" on `localhost:8000`.

```
$ gatsby develop
```