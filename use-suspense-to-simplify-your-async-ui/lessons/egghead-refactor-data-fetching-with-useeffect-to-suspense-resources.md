Instructor: 00:00 Now, we have a little app where we can choose different Pokemon. We could type out 'Mewtwo', and that will show us Mewtwo's information. There are little buttons are the top that are actually examples that we can click on, because I don't want to have to type that out every single time.

00:12 This is currently implemented using `useEffect`, which is basically what Suspense uses for data fetching is replacing. Let's go ahead and refactor this to Suspense for data fetching.

00:21 The first thing that we're going to need is we're going to got down to our `return`, and we need to wrap this `PokemonInfo` in a Suspense boundary and `ErrorBoundary` to handle when this component suspends and to handle when there's an error.

00:32 We already have an `ErrorBoundary`. We just need to import it from our utils here. I'll add `ErrorBoundary`. 

#### 02.js
```js
import {PokemonInfoFallback, PokemonForm, PokemonDataView, ErrorBoundary} from '../utils' 
```

Then we'll come down here and wrap this in our `ErrorBoundary`. Next, we're going to wrap this in a React Suspense component.

00:51 We'll specify our `fallback` to be the `PokemonInfoFallback`, and the `name` for this fallback is the `pokemonName` that the user entered. 

```js
<ErrorBoundary>
  <React.Suspense
    fallback={<PokemonInfoFallback name={pokemonName} />}
  >
    <PokemonInfo pokemonName={pokemonName} />
  </React.Suspense>
</ErrorBoundary>
```

With this, we're now ready for Pokemon info to suspend. Now, we can scroll up here, and you'll notice we have an 'error' state here, but that's now being handled by our `ErrorBoundary`, so we can delete that.

01:15 We have a 'pending' state, and that's now being handled by the Suspense boundary, so we can get rid of that. All that's left is the 'success' state, so we'll just get rid of this `if` statement, because by the time our code gets to here, we should have all the Pokemon all loaded.

01:28 Actually, we're not going to do any of the loading of the Pokemon directly in this component. Instead, we're going to create a resource when the user selects the Pokemon that they want, and we'll pass that resource to this component.

01:40 We can get rid of the `useEffect` entirely, get rid of our `state` management for that asynchronous interaction, and instead of accepting a Pokemon name, we'll accept a `PokemonResource`. Then we'll get our Pokemon from the `PokemonResource.read` method that we're going to call.

```js
function PokemonInfo({pokemonResource}) {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}
```

01:58 We need to manage that state in the component that's rendering our component, so we can pass it along. I'm going to add another `useState` in our `App` function for `pokemonResource`, and we'll have a `setPokemonResource`. We'll initialize that to `null`.

```js
const [pokemonResource, setPokemonResource] = React.useState(null)
```

02:13 Then instead of rendering this based on the Pokemon name, we'll render it based on the Pokemon resource. Instead of passing the Pokemon name, we'll pass the Pokemon resource to Pokemon info, so it can read that information from the Pokemon resource.

```js
<div className="pokemon-info">
  {pokemonResource ? (
    <ErrorBoundary>
      <React.Suspense
        fallback={<PokemonInfoFallback name={pokemonName} />}
      >
        <PokemonInfo pokemonName={pokemonResource} />
      </React.Suspense>
    </ErrorBoundary>
  ) : (
    'Submit a pokemon'
  )}
  ...
</div>
```

02:26 Now, when the user submits the form, I'm going to call `setPokemonResource`, and I'm going to call `createResource`. We'll import that here, and then we're going to use our `fetchPokemon` method again.

```js
import {
  PokemonInfoFallback, 
  PokemonForm, 
  PokemonDataView, 
  ErrorBoundary,
  createResource
  } from '../utils' 

function handleSubmit(newPokemonName) {
  setPokemonName(newPokemonName)
  setPokemonResource(createResource())
}
```

02:43 I'll call fetchPokemon with the new Pokemon name. 

```js
setPokemonResource(createResource() => fetchPokemon(newPokemonName))
```

This will trigger a re-render with a resource that actually hasn't loaded yet. When the app re-renders, we'll come down here. We say, "Oh, we do have a Pokemon resource, so a Pokemon info will get rendered with that Pokemon resource."

03:01 When we call `pokemonResource.read()`, this component will suspend, because that resource data isn't ready. When it suspends, React will catch it and find the nearest React Suspense boundary and render the fallback instead while it's waiting for the Pokemon resource to resolve.

03:15 When the Pokemon resource resolves, it'll trigger a re-render of the `PokemonInfo` component. This time, when the `PokemonInfo` component calls read, because the resource has resolved, it will have the data that it needs to continue to return the React elements to render the Pokemon information.

03:32 So, if we save this, and everything was done correctly, then we should be able to click on Pikachu, Charizard, and Mew and all of the correct information and picture show up. In review, basically, what we did here is we took all of the logic that was inside of this `PokemonInfo` component, completely removed it, and replaced it with a prop called `pokemonResource`, rather than accepting a prop called Pokemon name.

03:57 We manage that Pokemon resource in the same place where we manage the Pokemon name. As soon as the Pokemon name changes, we know we need to create a new Pokemon resource. We create that resource using the `createResource` utility that we built earlier, and then we render our Pokemon info based on the presence of that resource.

04:15 To make the `PokemonInfo` component suspendable, we had to wrap it with an `ErrorBoundary` and a `React.Suspense` component that has a reasonable fallback for the thing that we're waiting to load. Doing this makes our code way more declarative, which results in a code base that's a lot easier to manage.

04:30 One last thing I'm going to do here really quick is I'm going to take this `createResource` call, and I'm going to make a function called `createPokemonResource`. We're going to just do a little bit of composing here to create a resource specific for a Pokemon.

04:45 This, I'll pass the `newPokemonName`, and then I'll make a function called `createPokemonResource`. It'll take the `pokemonName`, and then it will simply `return` the same stuff that we just cut. We can clean that up a little bit here.

```js
function createPokemonResource(pokemonName){
  return createResource() => fetchPokemon(pokemonName)
}

function handleSubmit(newPokemonName) {
  setPokemonName(newPokemonName)
  setPokemonResource(createResource(newPokemonName))
}
```