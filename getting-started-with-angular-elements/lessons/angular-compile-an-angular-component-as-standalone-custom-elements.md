Instructor: [00:00] In this example here, we have that `greeter.component.ts`, which we have compiled basically as a custom element using the Angular elements API. We have referenced it in our entry components. We created in our `constructor` our `customElements` with the corresponding `do-greet` tag.

[00:15] Then within our `app.component.ts`, we dynamically inserted whenever someone clicks that `button`, we reference the `container` element, and we insert it into `container.innerHTML` dynamically. So far, as you can see, this works.

[00:27] We get here the `do-greet` inserted into the container, and you can see that ngVersion attached to it, which means that this component instantiates and bootstraps itself. What we would like to achieve, however, is to not only embed this within an existing Angular application but as a standalone component.

[00:45] Let's create a `demo` folder in the root of our application. In that `demo` folder, we simply create an `index.html` file. This is a plain `index.html` file. What we would like to have is that whenever insert a `do-greet` here, we get the same functionality as we get within the Angular application.

#### Index.html
```html
<html>

  <body>
    <do-greet></do-greet>
  </body>

</html>    
```

[01:04] As the first step, we could go into `app.module.ts`, and remove `AppComponent` from our `declarations`, because we don't need `AppComponent` anymore. The only thing which we are interested in is our `GreeterComponent`. We also remove `bootstrap` field, add in just below our `constructor`, a `ngDoBootstrap`, which indicates to Angular that this module should be auto-bootstrapped by itself.

#### App.module.ts
```ts
@NgModule({
  declarations: [GreeterComponent],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [GreeterComponent]
})
export class AppModuel{
  ...

  ngDoBootstrap() {} 
}

  
```

[01:25] With that, we can also remove those files which belonged to our app component from before, `app.component.css`, `app.component.html`, `app.component.spec.ts`, and  `app.component.ts`, which we don't need anymore. Once we have set up these components in this way, we can now establish a custom build process.

[01:39] The Angular CLI already configured the build process for our application, which is `ng build`. If you open up the console and execute that build, 

#### Terminal
```
$ npm run build
```

The Angular CLI now starts. Based on the configuration of angular JSON, it will compile our project.

[01:54] Once that process finishes, we can go to that `dist` folder, and we see here a series of files which get produced. 

![created files in dist](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834498/transcript-images/angular-compile-an-angular-component-as-standalone-custom-elements-created-files.png)

Now, what we want here is to concatenate all of these files, and to create one single script which we can then import in our index HTML file, which will then contain our component.

[02:14] For that purpose, let's create here a script file inside of `src`. I will get a root folder here. Call it `buildWC.sh`. Let me just quickly copy in here the actual command. 

#### buildWC.sh
```sh
#!/bin/sh
ng build ngelements --prod --output-hashing=none && cat dist/ngelements/runtime.js dist/ngelements/polyfills.js dist/ngelements/scripts.js dist/ngelements/main.js > demo/ngelements.js
```

It's not that difficult. What we want to do is to execute the ngBuild command always from our Angular CLI.

[02:33] We give it the name of our project, which in this case, it's named `ngelements`. We want to create a production build, and also want to disable the output hashing. That is important because in that way, the files that get produced, like `runtime.js`, `polyfill.js`, and so on, won't get the output hash attached to it, which in this case, we are not interested in.

[02:53] As you can see, what we do here is we use a simple cat command, we can concatenate all those variables' files into a single file, which we name here `ngelements`. What I also do is I already place it into that `demo` folder, where we have our `index.html` file.
 
[03:08] Let's save this here and execute build. We invoke `./buildWC.sh` command, which stands for web component. 

#### Terminal
```
$ ./buildWC.sh
```

Once that build process finishes, if we open up here our demo folder, now we have a `ngelements.js` file, which contains the compiled bundle, which has our web component inside.

[03:30] We can now go into that `index.html` file and reference it via a `script` tag, by simply using here `ngelements`. Now, we need also to instantiate that. That is something you can directly place on some web server.

#### index.html
```html
<body>
  <do-greet></do-greet>
  <script src="./ngelements.js"></script>
</body>
```

[03:45] We can here use a live server on that demo folder. 

#### Terminal
```
$ npx live-server demo
```

Live servers utility that allows us to point a web server on those static files, in this case, that demo folder. Once it is up, we can here go to `localhost:8080`.

[04:00] You can see here that 'Hi there!' is on our page. That means that our web component got instantiated and executed correctly. Again, you see having an R tag and a version number attached to it, which means it got bootstrapped successfully.