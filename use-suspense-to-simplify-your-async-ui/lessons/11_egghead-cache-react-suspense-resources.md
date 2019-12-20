Instructor: [00:00] We've got another problem here, if I click on Pikachu, it's going to go and load all Pikachu's data. Then I click on Charizard and that will load all Charizard's data. If I go back to Pikachu, it actually loads all Pikachu's data again, but none of that data changed. It would be nice if I could just cache that on the client.

[00:17] Cache invalidation is a really difficult problem, but I wanted to show you a quick and simple example of how you might start out caching resources. What we're going to do here first is I'm going to take this `createPokemonResource` function call here and I'm going to cut it out.

```js
function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
    startTransition(() => {
      setPokemonResource(createPokemonResource(newPokemonName))
    })
  }
    ...
}
```

[00:30] I'm going to create a new function called `getPokemonResource` with a `newPokemonName`. 

```js
function handleSubmit(newPokemonName) {
  setPokemonName(newPokemonName)
  startTransition(() => {
    setPokemonResource(getPokemonResource(newPokemonName))
  })
}
```

Right up here, I'm going to make that `getPokemonResource`. It's going to accept a `name` and then we're going to return the `createPokemonResource` with that name.

```js
function getPokemonResource(name) {
  return createPokemonResource(name)
}
```

[00:47] So far, we haven't made any changes to our behavior. I'm going to go ahead and get our `resource` here and we'll return the `resource`. I'm going to restore that `resource` somewhere so I can retrieve it later. Where I'm going to store it is just in a variable right here, `pokemonResourceCache`.

[01:05] With my `pokemonResourceCache`, I'm going to take the `name` of the Pokémon and assign that to the `resource`. Then, when we call `getPokemonResource`, the first thing I'm going to do is we'll say if that resource already exist, so I'll grab this `pokemoneResourceCache[name]`, if that already exist in here, then we'll just simple return that.

```js
const pokemonResourceCache = {}

if (pokemoneResourceCache[name]) {
  return pokemoneResourceCache[name]
}

function getPokemonResource(name) {
  const resource = createPokemonResource(name)
  pokemoneResourceCache[name] = resource
  return resource
}
```

[01:24] That is actually enough to get us going. If I click on Pikachu and then Charizard and then Pikachu again and then Charizard and back and forth. I'm going to insert a really serious warning right here, cache invalidation is not something to be trifled with.

[01:40] Maybe you're OK with users leaving their browsers open on your application for weeks on end. Keeping that cached version of all the data around for that period of time, but if you're not OK with that, then you should probably implement some sort of cache invalidation strategy.

[01:55] I wanted to show you how you could get this caching working for the simple case, so that you could extrapolate from this and use a cache invalidation strategy or even NPM module that works well for your particular use case.

[02:07] I'm going to refactor just a few things here because if I were to type in Pikachu with a capital P and submit that, then we're actually going to get a loading state here. What I'm going to do is we're going to get a `lowerName`, `name.toLowerCase`. We're going to use the `lowerName` instead for all of this because our API is case insensitive.

```js
const pokemonResourceCache = {}

function getPokemonResource(name) {
  const lowerName = name.toLowerCase()

  if (pokemoneResourceCache[nalowerNameme]) {
    return pokemoneResourceCache[lowerName]
  }

  const resource = createPokemonResource(lowerName)
  pokemoneResourceCache[lowerName] = resource
  return resource
}
```

[02:30] Now if I go Pikachu, and then Charizard, and then Pikachu with a capital P, that loads instantly. I'm also going to refactor this a little bit so I don't have so much repetition. I'm going to get my `resource` from the cache.

[02:48] Then I'll say if there's not a `resource`, then I'll go ahead and do all of these stuff, which is reassign `resource` here. Then in any case, we're going to return that `resource`. Our caching strategy seems to be working for the simple case.

```js
function getPokemonResource(name) {
  const lowerName = name.toLowerCase()
  let resource = pokemonResourceCache[lowerName]
  if (!resource) {
    resource = createPokemonResource(lowerName)
    pokemonResourceCache[lowerName] = resource
  }
  return resource
}
```

[03:05] In review, all that we did here was we took the call here, in `handleSubmit`, where we were creating a new resource, and we put it into a `getPokemonResource` function. Then we took that `name` and look that name up in our cache, which is just an object in our module. If that resource does not exist, then we'll create a new one, put that `resource` into our cache. Whether it exists or not, we're going to return the `resource`.

[03:30] The reason all of this is working is because the resource maintains the state of the data that was returned. If we go to this `createResource` function, that state lives right here in this `result`. When we rerender with the `resource` that is already in the cache, the `status` of that `resource` is `success` and it can return the `result` immediately.

#### utils.js
```js
function createResource(asyncFn) {
  let status = 'pending'
  let result
  let promise = asyncFn().then(
    r => {
      status = 'success'
      result = r
    },
    e => {
      status = 'error'
      result = e
    },
  )
  return {
    read() {
      if (status === 'pending') throw promise
      if (status === 'error') throw result
      if (status === 'success') return result
      throw new Error('This should be impossible')
    },
  }
}
```

[03:51] That's why we can switch between these two so quickly, because the `status` of that `resource` doesn't change because we're not creating new resources. We're using cached resources.

[04:00] I'll just echo that warning one more time. Cache invalidation is a difficult problem, and you should definitely consider adding cache invalidation to any caching strategy that you implement.
