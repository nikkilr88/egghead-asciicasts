Instructor: [00:00] What you see here in the browser is actually a web component which has been compiled down from Angular elements. It's quite simple. We created a custom element out of it.

[00:13] Then we used a custom build step, which does nothing else than basically leveraging the Angular CLI build for applications. Then we concatenate all the files into a single `demo/ngelements` file, which then in a normal `index.html` file, we have referenced.

[00:31] This allows us then to use that `do-greet` tag within every standard page, even if it is not an Angular application. As you can see, we used here a custom build command. This is because the Angular CLI right now does not support exporting Angular elements as standalone files, so as a single script tag.

[00:47] However, [Manfred Steyer](https://github.com/manfredsteyer/ngx-build-plus) here wrote a build tool which is ngx-build-plus, which extends the Angular CLI's default behavior without you needing to eject from it, and then do the whole webpack configuration yourself.

[01:03] Rather, you can use here Manfred Steyer's build. What we have to do is, first of all, you have to have a project which is comfort for add Angular elements, which we have already done. This would be these two steps.

[01:16] What we need to do here is to install here that `ngx-build-plus`. For this particular project here, I'm using `yarn`. Add here these `ngx-build-plus` as a dev tool. You can also use NPM, of course, and do an `npm install ngx-build-plus --savedev`.

#### Terminal
```
$ yarn add ngx-build-plus -D
```

[01:36] Once that installation completes, we have to open the `angular.json` file. That `angular.json` file defines how our project is being built. You should see a project which is configured and called `"ngelements"`, which is this one here.

[01:51] If you scroll a bit down, we have a different kind of steps. We have a step for `build`, `serve`, and so on. What we would like here to modify is that `"builder"`. That builder normally reference the `"@angular-devkit/build-angular:browser"`.

[02:05] We, however, change this line here and plug in the `ngx-build-plus:build` step. 

#### angular.json
```json
"build": {
  "builder": "ngx-build-plus:build"
  ...
}
```

We can then go to our build command in `buildWC.sh`, which we have created before, which is our custom one. We can now remove the whole concatenation of the files because that will be done now by ngx-build-plus.

#### buildWC.sh
```sh
#!/bin/sh
ng build ngelements--prod --output-hashing=none
```

[02:21] What remains here is to build our project with the production build, and also `--output-hashing=none`. Finally, this will produce us a single file, which is a `main.js` file. We also want to copy that over to our `demo` again, and call it `ngelements.js`, such that we can then reference it here, just as we did before.

#### buildWC.sh
```sh
ng build ngelements --prod --output-hashing=none
mv dist/ngelements/main.js demo/ngelements.js
```

[02:39] Let's now execute the build. 

#### Terminal
```
$ ./buildWC.sh
```

We again invoke that `./buildWC.sh`. Once that build step completes, we should have here in our `demo` folder an updated `ngElements.js`, which got produced now by the `ngx-build-plus`.

[02:58] Let's refresh here quickly. If we open up the console, you can see here an error message that says, "In this configuration, Angular requires zone.js." 

![zone.js error in devtools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834498/transcript-images/angular-use-ngx-build-plus-to-compile-angular-elements-zonejs-devtools-error.png)

That's because now, with this build step, with `ngx-build-plus`, zone.js is not being included within our build bundle.

[03:13] Rather, it is suggested to include that separately. We could go and copy over Zone, which is already in our Node module folders. Let's go to `node_modules/zone.js/dist/zone.js`, and copy that over to our `demo` folder.

```
$ cp node_modules/zone.js/dist/zone.js demo/
```

[03:28] Then in our `demo` folder, we reference that as well. 

#### index.html
```html
<do-greet></do-greet>
<script src="./zone.js"></script>
```

What it's also missing is a `scripts` files, which is the result of building our application. Let's copy over also that one. 

#### Terminal
```
$ cp dist/ngelements/scripts.js demo/
```

This contains a series of polyfills which will be needed for executing our application.

[03:46] Let's also reference that script files in `index.html`. 

```html
<do-greet></do-greet>
<script src="./zone.js"></script>
<script src="./scripts.js"></script>
```

We could also compile that into our ngelements once ship this in production. When we then save our application again, we see that the web component works correctly, and gets instantiated on our page.

![Web component is working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-use-ngx-build-plus-to-compile-angular-elements-web-component-is-working.png)

[04:01] Regarding `zone.js`, there are some considerations to make. `zone.js` is a way for Angular to detect when it has to execute its change detection mechanism. Therefore, `zone.js` basically patches the browser API.

[04:14] It sees when click events happen, when HTTP calls are being made, all of these kind asynchronous activity which could trigger an update of the UI. Therefore, `zone.js`, first of all, is a global thing, which is because it patches the browser API.

[04:28] Therefore, it should only be included once in our page, especially if you use multiple web components compiled with Angular. You should just have it once, and therefore, it makes sense to have it as an external file.

[04:39] Even more, it would be better to totally ignore it, to not use it. You can use that by simply going to your `main.ts` file, and then you can here provide some compiler options to our bootstrap module. Specifically, we want to say `ngZone: 'noop'`.

#### main.ts
```ts
platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZone: 'noop'})
```

[04:59] If we compile our web component now this way, you can see that once the compilation process finishes, "Hi there!" appears again. There's no need to use `zone.js`. Every time you need to change detection within your web component, you could always instantiate manually.

[05:15] If we go to `greeter.component.ts`, what you can do is to inject your change detector of Angular. Then within some event which you might have, you can always do change detection, detect changes.

#### greeter.component.ts
```ts
export class GreeterComponent implements OnInIt {
  constructor(private cd: ChangeDetectorRef) {

    cd.detectChanges();  
  }
```

[05:27] You can manually trigger that change detection whenever you have to update your UI from within your web component.