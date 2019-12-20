Instructor: [00:00] We have ourselves a little problem here. When I click on Pikachu, it shows me the loading state, and then it shows Pikachu. When I click on Charizard though, I want you to watch the input value here.

[00:09] You notice I click and it doesn't change instantly. Then it shows the loading state. Then it shows Charizard. Same with Mew. The loading state doesn't show instantly. It shows later. That's not exactly a terrific user experience, but this is actually intentional for React.

[00:24] What's happening here is as soon as I submit one of these Pokémon, I'm updating the `pokemonName` and setting the `pokemonResource`. This is going to trigger a rerender of our app component.

[00:35] That's where you would expect that the `pokemonName` and the input gets updated and it should immediately rerender these components as well. We should see the fallback instantly just like we see when we click on Pikachu in the first place.

[00:47] What happens this second time is we've already mounted this suspense component and so React is trying to be optimistic in hoping that the asynchronous request that we're making is going to resolve within the next 100 milliseconds or so.

[01:01] As React is coming through here, re-rendering our component because we updated the `pokemonResource`, it's going to get to the `pokemonInfo` component, it's going to get right here. It's going to suspend because the new `pokemonResource` hasn't been resolved yet.

[01:16] Then, React says, "OK. Let me just wait a little bit longer before I go ahead and try to update the DOM with the current state and to the fallback." Because based on research from the React team, they found that **showing an intermittent loading state actually makes the app seem slower**. Even though it does seem like it's not being very responsive in this case.

[01:37] It's still not super great. We actually have a better idea of what kind of interactions are going to take a little bit longer than others and so React can give us a little bit more control. Before I show you that, let me show you what this would look like if our request was a little bit faster.

[01:52] This `fetchPokemon` implementation actually accepts a second props. If I go into `fetchPokemon` here, the second prop is a delay. It's an arbitrary delay that we can fake things out a little bit. We can make the request happen instantly or we can make it take several seconds to actually go through.

```js
function createPokemonResource(pokemonName) {
  return createResource(() => fetchPokemon(pokemonName, 0))
}
```

[02:08] With that, I can come down here to my `fetchPokemon` and I can say, "Hey. Let's make this request take zero seconds." Boy, what I would give if I could just have a magical argument for all of my API calls to just take zero seconds.

[02:20] You'll notice that as we switch through this, it's not only instantaneously updating the input, but it's also instantaneously showing the data that has loaded. We're not getting any intermittent loading state. This is a little bit more pronounced for request that maybe take 100 milliseconds.

[02:35] Then I click on Pikachu. I get a loading state for the first time, but then for the rest of the times I don't get any intermittent loading state thanks to React's optimism. If we bump it up to 500 milliseconds, we're going to see a little bit of lag, and that's the experience that we want to improve.

[02:51] Let's restore this to its default of one and a half seconds, and we're going to use another new **experimental API**. This one is a hook. It's called `useTransition`. With this we get back a pair of values.

```js
//...
function App() {
  const [pokemonName, setPokemonName] = React.useState(null)
  const [startTransition, isPending] = React.useTransition()
  const [pokemonResource, setPokemonResource] = React.useState(null)
  //...
}
```

[03:06] We're going to de-structure it just like our use state. We get back a `startTransition` and an `isPending`, and this is going to take a `SUSPENSE_CONFIG`, which I'm going to create as an object. The configuration is going to accept a timeout ms for timeout milliseconds, and we're going to timeout after 4,000 milliseconds.

```js
const SUSPENSE_CONFIG = {timeoutMs: 4000}
//...

const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
```

[03:29] Then we're going to take this `startTransition`, and we're going to state update that triggers suspense, which is setting a new resource. That's going to trigger a component to suspend. We'll say `startTransition`. That accepts a function and will put that state update inside of that function.

[03:45] If we save this then I go back here, I click on Pikachu, I see that loading state right from the get-go, and that's the default. When you render a brand new suspense component it will show the loading state, but then when I click on Charizard, you'll notice that the Charizard input updates instantly, and we don't get any sort of loading state right here.

```js
//...
function handleSubmit(newPokemonName) {
  setPokemonName(newPokemonName)
  startTransition(() => {
    setPokemonResource(createPokemonResource(newPokemonName))
  })
}
//...
```

[04:03] The benefit of using `startTransition` through the `useTransition` experimental hook is it allows us to say, "Hey, React. I'm going to start a transition here. I want you to go ahead and **render the current state of all of the components based on the update that I'm going to make, and I'm going to manage the pending state**.

[04:21] Because we've configured suspense to timeout after 4,000 milliseconds, we're not actually going to see a loading state because our `fetchPokemon` only takes a second and a half. If we lower this down to 1,000 milliseconds, we'll see that initial loading state, and then we'll see a loading state for 500 milliseconds before the `fetchPokemon` resolves.

[04:42] If we bump this down to 750 milliseconds, then we'll see that loading state for 750 milliseconds before the `fetchPokemon` resolves. Let's put this back to 4,000 milliseconds because I don't want to see that loading state unless it's been a really long time.

[04:59] Instead I'm going to use this `isPending` variable here to give the user some feedback to say, "Hey, we're working on your request." Down here on this `pokemonInfo` DIV I'm going to add some inline styles, and we'll set the opacity if we're pending to 06, otherwise to 1.

```js
return (
  //...
  <div style={{opacity: isPending ? 0.6 : 1}} className="pokemon-info">
    {pokemonResource ? (
      <ErrorBoundary>
        <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
          <PokemonInfo pokemonResource={pokemonResource} />
        </React.Suspense>
      </ErrorBoundary>
    ) : (
      'Submit a pokemon'
    )}
  </div>
  //...
)
```

[05:17] This can give our users some feedback that we're working on the request, but they can continue to look at the stale data, while they wait for the new data to load. Then we click on Pikachu, we're going to get that loading statement from the get go.

[05:29] Now that we have an existing suspense component, when I click on Charizard, we're going to get that opacity, and Charizard is going to load, and we don't get an intermittent loading state. We just get some indication here that loading is taking place.

[05:41] In review, the problem that we were having is, we were clicking on each one of these, and **the input value wasn't getting updated right away**, and there wasn't any feedback to the user that we're working on the action that they took.

[05:52] To circumvent that, we have this `useTransition` API that we can use to `startTransition`s for state changes that are going to result in suspense. We wrap any of those state changes that are going to result in suspense.

[06:05] Then, not only will React update our components that are not being suspended, but **it will also allow us to show to the user that the information that they're looking at is stale**, and we're working on responding to their request. We configured `useTransition` with our `SUSPENSE_CONFIG` for a timeout that is reasonable for our use case.
