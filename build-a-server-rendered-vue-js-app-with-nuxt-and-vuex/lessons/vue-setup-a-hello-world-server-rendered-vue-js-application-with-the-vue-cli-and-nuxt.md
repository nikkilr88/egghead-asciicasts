Install the `vue-cli` with `yarn global add vue-cli`. 

#### Terminal
``` 
$ yarn global add vue-cli 
```

Then once that's done, you can just use `vue init`. Pick a template. I'm going to use the nuxt/starter template and tell that to generate my current directory, which is this `egghead-nuxt` directory, in which my editor is open in. It prompts me if I want to do this, I'll say `yes`. 

``` 
$ vue init nuxt/starter .
```

It'll download it. I'll accept all the defaults, then you can see there are files and folders generated from that, but I still need to `yarn` to install everything defined in the package.json.

```
$ yarn
```

That took about 43 seconds for the initial setup, which I skipped. With that done, I can say `yarn run dev` to run the dev script of the package.json, which just tells it to run Nuxt. I'll go ahead and run that, you'll see some compilation output, and that it's running on port 3000.

```
$ yarn run dev 
```

I'll go head and open localhost:3000 in my browser and you'll see that Nuxt is up and running. I'll shrink it a little bit. 


I would like to reduce this to a "Hello world". I'm going to come into pages, index.vue, select everything, hit delete, and say `<template>`, then inside of your template you need a root element. I'll just call mine `<div>`. In there, I'll say `Hello world`. When I hit save, this auto-refreshes over here and you see Hello world. 

#### index.vue
```html
<template>
  <div>
    Hello world
  </div>
</template>
```

You still see this "Visit our website for more documentation", which means that our main layout in default.vue is adding this footer.

Just FYI, this footer is defined in components. I'm just going to change the layout itself and remove the footer and hit save. Now I'm truly at a Hello world here. 

#### default.vue 
```html 
<template>
  <div>
    <nuxt/>
  </div>
</template>
```

I'm also going to scroll down and you'll see a bunch of styling in here. I'm going to go ahead and delete all the styling and everything else, so there's no styles applied. Now my default layout is just a template with a div and my instance of nuxt. 

#### default.vue
```html
<template>
  <div>
    <nuxt/>
  </div>
</template>
```

Then my index page is just a template with a div and Hello world.

#### index.vue
```html
<template>
  <div>
    Hello world
  </div>
</template>
```

Lastly, the final things for configuration is I want to make sure that my title is inside of nuxt.config.js. I'll make sure my title is what I want it to be. I'll call it `'egghead todos'`,then if there's any other settings you want to change in here regarding your favicons or meta in the head, you can go ahead and do that in here.

#### nuxt.config.js
```js
head: {
  title: 'egghead todos', 
```

Now, when I hit save, I'll go ahead and refresh here. You see we now have 'egghead todos', Hello world, and a clean default layout, and a clean index page.