In our simplification here, we have defined a couple of `routes` which we have registered to the `RouterModule`'s `forRoot` method. 

#### app.module.ts
```javascript
const routes: Route[] = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
```
If we refresh our application, we can see that none of our components gets actually shown.

![None Shown](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-create-a-redirect-rule-with-the-angular-router-none-shown.png)

They only get loaded if we navigate directly to the `\about` route, or the `\home` route. What we would rather like to have is that whenever we come to the root of our application, it automatically redirects to our `\home` route.

To achieve this, we can specify a redirect route. First of all, we define here the `path`, which will be the empty string, and then rather than define a component here, we can use the `redirectTo` property and specify `home`.

There's another thing we need to do here, which is to define a path matching strategy, which in this case will be `full`. 

```javascript
const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
```

The default is `prefix`. What `prefix` means is that Angular is going to analyze the route here and match it incrementally.

The problem is that whenever we have another route down below, it will never go and invoke that route because every route starts with an empty string. Therefore, always this route here will be matched.

If we specify the `full` matching strategy, this means that this route will only be matched if the route is empty, so it matches 100 percent this definition here.

Now let's save this and test whether this works. Let's remove the route definition up there, and as you can see, it correctly redirects now to our home route.

![Redirect](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-create-a-redirect-rule-with-the-angular-router-redirect.png)