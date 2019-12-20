It's quite possible that this initial request to load data could return an error, or is the wrong URL or something, which would then cause our website to completely blow up because this is trying to server render this data.

If you try and server render improper data, then it simply can't render it and will throw a terrible error for your users. What we can do here with async await is actually just `try` catch it. We can try this, and if that fails like it's doing right now, we can `catch` the `error`.

#### index.vue
```js 
export default {
  async fetch ({store}){
    try{
    const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')
    store.commit('init', res.data)
    }catch(error){

    }
  },
```

A graceful way of handling it is just to say `store.commit`, and initialize the data with an empty array. When I save and refresh here, you'll see our main page with an empty todos dataset. 

```js
export default {
  async fetch ({store}){
    try{
    const res = await axios.get('https://odos-cuvmolowg.now.sh/todos')
    store.commit('init', res.data)
    }catch(error){
      store.commit('init', [])

    }
  },
```

If I add this back so it succeeds and refresh, you'll see we get our data.

```js
const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')
```

If this fails, I'll save and refresh. You'll see that we get no data, we just get this empty array. Or, we can just add a new page in our pages called something like `error.vue`. Make sure we have a `<template>`, `<div>`. `Oops, our services are down!`

#### error.vue
```html
<template>
  <div>
    Oops, our services are down!
  </div>
</template>
```

Then in our index.vue, along with the store, we also get `redirect`. Redirect can just say, well, it's not even worth coming to our site right now, so just send them over to the `error` page. With this, when I refresh, they'll see, "Oops, our services are down!"

#### index.vue
```js
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

If I fix the URL, hit save, and refresh...well, I mean if I refresh on the base URL and not on the error page, you'll see we have our data again. You have your choice of either requesting and storing initial data before the server render, and then making sure that you catch it if it fails.

Or instead of using fetch, you could wait until the component is `created`. I'll grab this, copy, paste, comment my fetch out, and make sure I use `this.$store`, because the context isn't passed into created, and this.$store wasn't ready at the time fetch was ready, so that's why it's passed in to fetch.

```js 
export default {
 //   async fetch ({store, redirect}){
 //      try{
 //      const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')
 //      store.commit('init', res.data)
 //       }catch(error){
 //           redirect('/error')
 //       }
 //   },

  created(){
      const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')      this.$store.commit('init', res.data)
  },

  computed:{
    ...mapState({
      todos: state=> state.todos
    })
  },
```

Now the experience, oh and you'll see I need to make sure this is `async`. Now, the experience when I refresh is you see "Todos" and then you see the data loaded. We'll see that again, "Todos", and then the data loaded.

```js
async created(){
  const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')      
  this.$store.commit('init', res.data)
},
```

Or, the experience with fetch is when I refresh, everything is ready. Refresh, everything is ready, and remember that flash of un-styled content goes away when you deploy to production. 

```js
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

One last note, there is a default error page here. If I navigate to something that doesn't exist, I'll say no, hit enter, you'll see we get this 404 error page. That's defined in the layouts.error, and you can come in here and customize anything you need to for this default error page. 

You can also use it from this context, so store, redirect. Another thing that's passed in is an `error` function. Instead of saying redirect, you could just say `error` with a `statusCode` of, we'll just say `500` for the internal server error.

#### index.vue
```js
export default {
  async fetch ({store, redirect, error}){
    try{
    const res = await axios.get('https://todos-cuvmolowg.now.sh/todos')
    store.commit('init', res.data)
    }catch(error){
      error(statusCode: 500, )
    }
  },
```

Then a `message` of, `"Oops, try again"` or something like that. I need to name this something else if I'm going to pass in an error function, so we'll just call that `err`. Now if I break my service, hit save, I'll come back and reload the root route, it looks like I didn't make this an object, so I'll save that again, and now refresh.

```js
export default {
  async fetch ({store, redirect, error}){
    try{
    const res = await axios.get('https://todos-cuvmolowg.now.sh/odos')
    store.commit('init', res.data)
    }catch(err){
      error({statusCode: 500, message: "Oops, try again"})
    }
  },
```

You'll see we get the 500, "Oops, try again" which is that error layout that you can customize. However you want to, you can handle that error. I'm going to use my redirect.

```js
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