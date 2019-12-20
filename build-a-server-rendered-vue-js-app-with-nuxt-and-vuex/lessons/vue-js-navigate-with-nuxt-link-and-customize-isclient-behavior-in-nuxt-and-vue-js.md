To navigate to another page, let's say we add a `<nav>` up here, and then toss in some `nuxt-links`. This will go `to/completed`. We'll call this `completed`.

#### index.vue
```html
<template>
  <div>
    <nav>
      <nuxt-link to="/completed">Completed</nuxt-link>
    </nav>
    <article class="pa3 pa5-ns">
      <h1 class="f4 bold center mw6">Todos</h1>
      <ul class="list p10 m10 center mw6 ba b--light-silver br2">
        <li v-for="todo of todos" class="ph3 pv3 bb b--light-silver">{{todo.task}}</li>
      </ul>
    </article>
  </div>
</template>
```

I'll create a completed page, new file, `completed.vue`, and then basically just copy and paste this entire thing in here.

#### completed.vue
 ```html
<template>
  <div>
    <nav>
      <nuxt-link to="/completed">Completed</nuxt-link>
    <article class="pa3 pa5-ns">
      <h1 class="f4 bold center mw6">Todos</h1>
      <ul class="list p10 m10 center mw6 ba b--light-silver br2">
        <li v-for="todo of todos" class="ph3 pv3 bb b--light-silver">{{todo.task}}</li>
      </ul>
    </article>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'

export default {
  async fetch ({store, redirect}){
    try{
    const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')
    store.commit('init', res.data)
    }catch(error){
      redirect('/error')

    }
  },
```

The behavior we want is if I go to 'localhost:3000/completed' and it loads the data fine and I refresh, it should load the data fine. The unexpected behavior here is if I go back to Home. Let me open up the dev tools to see the network. I'll go to 'localhost:3000/completed', and you'll see it actually makes this request to load the todos again.

We don't need that because we already have the todos stored in our store. In our fetch, I'm going to add from the context the `isClient`, and `if` this is Client, I'm just going to `return` out of fetch, meaning it'll just skip over all of this stuff.

```js
export default {
  async fetch ({store, redirect, isClient}){
    if(isClient) return 

    try{
    const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')
    store.commit('init', res.data)
    }catch(error){
       redirect('/error')
```

Now when I save and go to Home, I clear out the network. I go to 'localhost:3000/completed' and you'll see it doesn't make that request in the network to this service, but it still has the todos from the store.

This way, I can navigate through my site without reloading the data each time, and I can even refresh. When I refresh, it makes that request on the server, but it never has to make that load on the client.

What I can do because this fetch function is being used across multiple pages now, the home and the 'localhost:3000/completed', is I can cut it out of my completed.vue, and in my pages create a new file. I'll just call it `shared.js`. I'll paste my code in shared.js. I'll just `export` an `async function` and rename this from fetch to `init` just so it doesn't collide with the fetch library.

#### shared.js
```js
export async function init ({store, redirect, isClient}){
  if(isClient) return 

  try{
  const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')
  store.commit('init', res.data)
  }catch(error){
    redirect('/error')
  }
},
```


I'll format that a bit. Now in completed.vue, I can say `import init from shared` and `fetch:init`, and just do the same thing in my index.vue where I `import init from shared`, and now `fetch:init`.

#### completed.vue 
```js
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
import {init} from './shared'

export default {
  fetch:init,

  computed:{
    ...mapState({
      todos: state => state.todos
    })
  },
```

#### index.vue 
```js
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
import {init} from './shared'

export default {
  fetch:init,

  computed:{
    ...mapState({
      todos: state => state.todos
    })
  },
```

When I go Home, you'll see I start redirecting to my error, and right away I notice that I haven't imported Axios here. I can grab Axios, drop that in my shared.js, hit save, and now I navigate back to Home. Now Home is using this shared.js, and completed.vue is using this shared.js, as well.

#### shared.js
```js 
import axios from 'axios'

export async function init ({store, redirect, isClient}){
  if(isClient) return 

  try{
  const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')
  store.commit('init', res.data)
  }catch(error){
    redirect('/error')
  }
}
```

Let's go ahead and delete the import axios from index.vue. Fetch is using init. Fetch is using init.  

#### index.vue
```js 
import {mapState, mapMutations} from 'vuex'
import {init} from './shared'

export default {
  fetch:init,

  computed:{
    ...mapState({
      todos: state => state.todos
    })
  },

  methods:{
```

As I navigate on my 'localhost:3000/completed' page, I'll navigate back to Home.

#### completed.vue 
```html
<nav>
  <nuxt-link to="/">Home</nuxt-link>
</nav>
```

On my index.vue page, I'll navigate to Completed.

#### index.vue
```html
<nav>
  <nuxt-link to="/completed">Completed</nuxt-link>
</nav>

```

You'll see that as I refresh, clear this out,I'll go to 'localhost:3000/completed', Home,'localhost:3000/completed'. I never actually make another request to load this data. It's only loaded before the initial server render, and from there on out, we're operating on it on the client.

![Dev Tools](../images/vue-js-navigate-with-nuxt-link-and-customize-isclient-behavior-in-nuxt-and-vue-js-dev-tools.pn)

From there on out, we've stored the data in the store, so we can just grab it from there instead of having to request it again.