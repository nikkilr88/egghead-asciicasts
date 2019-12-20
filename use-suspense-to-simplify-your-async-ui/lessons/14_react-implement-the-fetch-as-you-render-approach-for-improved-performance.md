Instructor: [00:00] It's great that we solved the problem of preloading images so that our data doesn't show until the image is ready as well. Let's remind ourselves of what the user experience is going to be like here.

[00:11] Let's go ahead, and empty cache hard reload. I'll clear all this network activity out. We'll go to a slow 3G connection. Then, if we go to Pikachu, then it's going to take a while before we see Pikachu's information because first, we have to load this graphQL request to get the Pikachu's data.

[00:29] Then, once that data shows up, then we know the URL for Pikachu's image, and we can load that. Whereas before, we could show some data as soon as that GraphQL request was finished. Now we have to wait to show the data and the image until after the image is finished.

[00:45] The same thing happens here with Charizard. It takes a while to get that GraphQL options request finished. Then, we get the post for the GraphQL request. Once that's finished, then we can jump in with getting Charizards image. Once Charizards image is loaded, then we can update the information to show Charizard.

[01:04] What would be even better is if we could **start preloading the image at the same time we make the GrpahQL request**. It just so happens that these URLs for these images are predictable. It just has the Pokémon's name in there and we happen to have the Pokémon name because the user entered that Pokémon name for us.

[01:22] We even have a special little utility for that called the `getImageUrlForPokemon`. 

```js
import fetchPokemon, {getImageUrlForPokemon} from '../fetch-pokemon'
```

Let's take advantage of this by coming down here to our `createPokemonResource`. We'll actually create an image resource as well as a data resource.

[01:38] I'm going to change this API a little bit. We're going to make this `createPokemonResource` be a data resource, we'll returning an object that has that `data` resource. We'll also create an `image` resource. I'll just come up here and we'll borrow some code from our `Img` component that we wrote earlier and we'll paste that right here.

```js
function createPokemonResource(pokemonName) {
  const data = createResource(() => fetchPokemon(pokemonName))
  const image = createResource(() => preloadImage(src))
  return {data}
}
```

[01:57] We'll create a resource that preloads the image for the `src`. We can get that source from `getImageUrlForPokemon` by the Pokémon's name. The user can type a capital C here and we need to lowercase that. What I'm going to do is I'll make it `lowerName` = `pokemonName.toLowerCase` and we'll pass the `lowerName`. Then we'll add our `image` resource to the object that we're returning.

```js
function createPokemonResource(pokemonName) {
  const lowerName = pokemonName.toLowerCase()
  const data = createResource(() => fetchPokemon(lowerName))
  const image = createResource(() =>
    preloadImage(getImageUrlForPokemon(lowerName)),
  )
  return {data, image}
}
```

[02:23] Now, when we call this `createPokemonResource`, this resource is actually an object of two resources together, a `data` and an `image`. Let's go to where this `getPokemonResource` is called, right here in our `handleSubmit` where we call `setPokemonResource`.

[02:38] This `pokemonResource` is that object of `image` and `data`. 

```js
function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
    startTransition(() => {
      setPokemonResource(getPokemonResource(newPokemonName))
    })
  }

  return (
    <div>
      <PokemonForm onSubmit={handleSubmit} />
      <hr />
      <div className={`pokemon-info ${isPending ? 'pokemon-loading' : ''}`}>
        {pokemonResource ? (
          <ErrorBoundary>
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </ErrorBoundary>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}
```

That's getting forwarded along to our `PokemonInfo` component. This `pokemonResource` is now going to have a `data` property where we can read the `data`, and then the image is going to be available from the `pokemonResource.image.read()`.

```js
function PokemonInfo({pokemonResource}) {
  const pokemon = pokemonResource.data.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemonResource.image.read()} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}
```

[02:59] Then we can just use a regular `img` here because we've already handled creating a resource for this particular source. We don't need this `Img` component anymore. It might be useful somewhere else, but we don't need it for this component.

[03:11] Now, let's go ahead...I'm going to change this back to online. We'll save this. Get a refresh here. I'm going to do a hard reload here emptying the cache. Clear that out. We'll go to slow 3G and see how this experience changes.

[03:26] We'll go to Pikachu. You'll notice that right from the get-go, the Pikachu image is actually the first thing that we start requesting. Immediately thereafter, we make the GraphQL Pokémon options request. Once that's finished, then we can make the actual post request to get the Pokémon's data.

[03:44] We've squeezed things over to the left side of the waterfall as closely as we possibly can. We can do the same thing with Charizard. We see Charizard is getting requested right away, right along with the GraphQL request so that Charizard's information gets loaded quicker.

[04:01] This is one of the core principles of React Suspense. **As soon as you have the information you need to get the data and resources you need, you should make the request for those resources rather than waiting for the component that will use those resources to fetch those things.** This will improve the performance of your application significantly.

[04:19] In review, what we did here is we edited our `createPokemonResource` to create not only a `data` resource for the Pokémon's data, but also an `image` resource for the Pokémon's image because our image URL is predictable and we don't have to wait for the data to come back for us to know what URL the image will be.

[04:39] Then we return both of those resources as `data` and `image` so that when our `createPokemonResource` is called that `resource` is now actually an object of two resources. When we set our `pokemonResource` to that object and forward it along to the `PokemonInfo` component, that `PokemonInfo` component can take that `pokemonResource`, read the `data`, and read the `image`.

[05:02] This `PokemonInfo` component can suspend while that data and image are being loaded. Again, the difference here is before we were suspending just for the data and we were waiting for the data to finish suspending before we could start suspending for the image.

[05:17] **Now, we start loading both of those resources at the same time so that they can get resolved a lot quicker, drastically improving the performance of our app.** I'll just add here that the reason that they're both being requested at the same time isn't because the read calls are happening in the same component but because we're creating the resource at the same time.
