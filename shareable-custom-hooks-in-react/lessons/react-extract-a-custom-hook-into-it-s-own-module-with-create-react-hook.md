## Essential Questions

- Why do you scope your hook under your npm username?
- How does using create-react-hook allow for easy testing?

---

Instructor: [00:00] The first thing we're going to do is check our npm version with npm --version. We're going to be using npx, which comes with npm versions 5.2 and above. Now we're going to run npx create-react-hook. This is going to ask us a few questions to get our boilerplate set up for our custom hook package.

[00:21] For the package name, we're going to use @ and then your npm registry username. Mine in this case is jsjoeio and then we're going to put a slash and then we're going to call it useStarWars quote. **The reason that we're prefixing this with our npm registry username is because then the package is scoped to our account.**

[00:42] **By doing this, we don't have to worry about any name conflicts if the package name useStarWars quote was already taken.** For description, we're going to write a custom React hook that provides a random. For GitHub handle, you should just put your GitHub. For the repo path, I'm just going to call it useStarWars quote so jsjoeio because that's my GitHub handle/useStarWars quote.

[01:07] MIT for license, and I'm going to use yarn, and for templates, select default. **Now that will run, it will install our dependencies, it will set up the boilerplate. It will also set up an example folder and it will also set up yarn link so that we can test our custom hook in the example folder, which comes with a create React app.**

[01:27] Once the CLI finishes, you should see something like this. Now let's open this up in our editor and **take a look at what create React hook set up for us.** If you take a look, we've got a lot of different files, a few different folders. We're just going to briefly talk about them. As you see, **there's a roll-up config** so this is using roll-up.

[01:48] We don't need to touch any of that. There's a **ReadMe, package json, Travis CI**, etc., etc. Where we're actually going to be adding our hook is in the source directory inside of Index. **dist is where roll-up is going to put our bundled output.** You can see some examples. **Then the example directory is actually a place for us to test our hook locally.**

[02:12] It's a create React app, and we'll look at the package json. **It's using yarn link to link to our local package and that's all been set up for us automatically so that we can then go into app.js and use our hook.** Use my hook is just the one that comes at the boilerplate. We're going to refactor that in one second.

[02:31] Now that you have an overview of what this CLI tool gives us, let's go ahead and add our hook. I'm going to go back to where we wrote our useStarWars quote, and I'm just going to copy this.

[02:45] Like I said before, we're going to be working sourceindex.js.

[02:49] We're going to delete all of this and paste in our custom hook from the previous example. **We're going to export that and we need to make sure at the top that we're importing useState and useEffect.** Cool. That should be good to go.

```js
import { useState, useEffect } from 'react'

export function useStarWarsQuote() {
  const [quote, setQuote] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getStarWarsQuote() {
      setLoading(true)
      // Get initial text
      const response = await fetch(
        'http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote'
      )
      const data = await response.json()
      const quote = data.starWarsQuote
      setQuote(quote)
      setLoading(false)
    }
    getStarWarsQuote()
  }, [])

  return { quote, loading }
}
```

[03:03] Now what we're going to do is go into the example directory, go into source, go into app, and then we're going to change this to useStarWars quote. **We know that useStarWars quote returns an object with quote and loading**, and so we'll do what we did before. If loading return paragraph tag with loading.

[03:25] If quote will return this and change that to say quote and otherwise return null. Two things we want to do. Let's go back. Go into the package json. Notice how we have this start script which will run roll-up, and then we'll run it in watch mode. We're going to run that. Open up your terminal, and we're going to run yarn-start. Cool.

[03:49] You'll see that it's bundled. We're going to open up a new terminal window. We're going to see into example and from here we're going to run yarn-start. This will start up the create React app. Now if we go into the browser, to localhost 3000, we'll see that our custom hook is working. Great. That's it. That's all you need to do to extract your custom hook.
