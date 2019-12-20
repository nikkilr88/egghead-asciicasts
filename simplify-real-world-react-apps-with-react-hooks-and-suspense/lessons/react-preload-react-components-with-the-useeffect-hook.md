Instructor: [00:01] We're treating our users right by using `React.lazy` to dynamically import the JavaScript that the user is going to need, depending on the area of the app that they're going to go to. We only load the `Home` and only load the `User` when those are actually going to be rendered.

[00:17] This can lead to a bit of a problem for users on slow connections. If we go into the dev tools of our website, and we'll switch us down to a 'slow 3G', and then I input 'Kent C. Dodds', for example. We're going to load the application, and it's going to sit there for a little while before we start loading the data.

![no preload](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543803094/transcript-images/react-preload-react-components-with-the-useeffect-hook-no-preload.png)

[00:34] It'd be really nice if we could preload the `User` page when we're on the `Home` page, because we can assume with pretty good confidence that a user that's on the `Home` page is going to go to the `User` page next.

[00:45] One trick that we can do is if we go into our `screens/home/index.js` here, we can `import useEffect from 'react'`. Then I'll take that `useEffect` in my `Home`, and I'll have an effect that runs only one time, when the component mounts.

[01:05] When this component mounts, we'll preload the next page. 

### home/index.js
```js
function Home() {
  useEffect(() => {
    // preload the next page
  }, [])

  ...
}
```

How are we going to do that? With the way that webpack works, we could actually just do an `import` for that `../user` page. webpack will start loading that as soon as this `Home` page has been loaded.

```js
function Home() {
  useEffect(() => {
    // preload the next page
    import('../user')
  }, [])

  ...
}
```

[01:22] Let's take a look at what this does now. If I pop open my developer tools, and I refresh here, I'm going to see that I'm loading my bundle, my chunks, and then once this page is loaded, we're actually going to follow up with a request for our other chunks that we need for the `User` page.

![preloaded user page chunks](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543803276/transcript-images/react-preload-react-components-with-the-useeffect-hook-chunks-preloaded.png)

[01:39] If I go down to a slow connection again, we clear this out, and I click go, we're actually immediately going to be making that request for the GraphQL data, rather than having to make a request for the rest of the application, which works perfectly for our use case.

![graphql data immediately requested](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543803094/transcript-images/react-preload-react-components-with-the-useeffect-hook-graphql-requested.png)

[01:55] We know that users who are going to the `Home` page are going to go to the `User` page next. It makes a lot of sense to preload the JavaScript for the next page while the user is filling out this form.
