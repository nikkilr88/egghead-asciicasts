Instructor: [00:00] One of my favorite parts about **React is that we can take logic, put it into a custom hook, and use that logic all over the place.** What about all of my components that want a `pokemonResource` based on the `pokemonName`? What are we going to do with those?

[00:13] Let's go ahead and put all of this in a custom hook, so that we can use it in other components of our application. I'm going to make a function called `usePokemonResource`. This is going to take `pokemonName`. Here. Let's see. We've got our transition, our `pokemonResource`. Let's move those up.

[00:32] Then we're going to need our `startTransition` and our `setPokemonResource`. 

```js
function usePokemonResource(pokemonName) {
  const [pokemonResource, setPokemonResource] = React.useState(null)
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)

}
```

Any time the `pokemonName` changes -- let's use an effect for that. `useLayoutEffect`. -- the reason we're using `useLayoutEffect` is right now, with the experimental version of concurrent React, `useEffect` doesn't work properly, but `useLayoutEffect` does.

[00:51] **When concurrent mode is stable, `useEffect` will work just fine and I'd recommend that you use that.** Then, we'll move our `startTransition` in here, but we don't want to start a transition to create a new resource if the `pokemonName` is `undefined` like when our components first mounted.

[01:04] I'm going to say if not `pokemonName`, then we'll just `return`. We won't do anything there. Then, our `useLayoutEffect` is going to depend on the `pokemonName`. **Incidentally and actually it also depends on `startTransition`, but there's another bug with concurrent mode where `startTransition` in the dependency list will cause an infinite loop.** We're going to ignore this rule for this line, just for now.

```js
  React.useLayoutEffect(() => {
    if (!pokemonName) {
      return
    }
    startTransition(() => {
      setPokemonResource(getPokemonResource(pokemonName))
    })
    
    // https://github.com/facebook/react/issues/17273
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonName])
```

[01:31] I really don't recommend you make a habit out of doing that. When you're working with experimental technology, sometimes you got to do what you got to do. As soon as concurrent mode is stable, you can reliably put `startTransition` in the dependency list and you shouldn't have any trouble.

[01:45] Let's go ahead and update new `pokemonName` to be `pokemonName`. There are only two things left that we're not using in here and those indecently are the things that our users are going to need. Let's return `pokemonResource` and `isPending`.

```js
function usePokemonResource(pokemonName) {
  const [pokemonResource, setPokemonResource] = React.useState(null)
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)

  ...
  
  return [pokemonResource, isPending]
}
```

[02:01] We're the rulers of our hook, so **I'm returning an array here, but you could return an object or whatever it is that you want to return from your particular API.** Now we have our `usePokemonResource`, so I'm going to say `usePokemonResource`, we'll pass the `pokemonName` and we'll get back our `pokemonResource` and that `isPending`.

```js
function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  const [pokemonResource, isPending] = usePokemonResource(pokemonName)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  ...
}
```

[02:19] Anytime the `pokemonName` changes, that will trigger a re-render under a transition and `isPending` will be set to true. Our `pokemonResource` will be whatever new resource we created for that `pokemonName`. Then we can render this out based on that `pokemonResource`. That's all it takes. If we save this and try out our app, everything is working just as it was before.

[02:42] In review, what we did here was, we just took a couple of the things here that were dealing with the resource specifically. We extracted it out to a `usePokemonResource` hook that accepts the `pokemonName`. Whenever that `pokemonName` changes, we start a transition to update our `pokemonResource`.

[02:59] We're still using this get `pokemonResource` function, which is creating our `pokemonResource`. That's what we set the `pokemonResource` to. That triggers a re-render so that the component can use the `pokemonResource` and render the Pokémon info, which will suspend until that `pokemonResource` resolves, which will trigger another re-render and render out the resolve data from the `pokemonResource`.
