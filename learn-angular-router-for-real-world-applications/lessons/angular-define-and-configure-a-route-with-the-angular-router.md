I have here a very simple Angular application where I'm having here two components. They are already registered within our `@NgModule`. 

#### app.module.ts
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Let's go back here to our `app.component.html` and quickly instantiate both of them. 

#### app.component.html
```html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<app-home></app-home>
<app-about></app-about>
```
You can see they get rendered on the page correctly.

![App Components](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-define-and-configure-a-route-with-the-angular-router-components.png)

Assume these represent different kind of states our application might be in. When the user navigates to the home part of our application, we want to show this component `<app-home>`. When he wants to get information about our application, we want to show this component, `<app-about>`. 

We could do this with some `ng-if` statements and then switch the components on and off, but that is not scalable when our application gets more and more components.

Instead, what we want to do is to use the routing mechanism. We have the router already installed. The first step is to import a `RouterModule` directly from `@angular/router`. 

#### app.module.ts
```javascript
import { RouterModule, Route } from '@angular/router';
```

Next, we can go down here in the module section and use the `RouterModule.forRoot`, where we then register different kind of routes.

```javascript
@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [BrowserModule, RouterModule.forRoot([])],
  providers: [],
  bootstrap: [AppComponent]
})
```

Obviously, those routes need to be defined. Let's create an array called `routes`. Let's also import here the correct types, always from the router package, and define our first `Route`. Let's say whenever the user navigates to `home`, we want to show the `HomeComponent`.

```javascript
const routes: Route[] = [
  {
    path: 'home',
    component: HomeComponent
  }
];
```

As you can see here, I am defining here a `path` which defines the URL, which the router has to verify. Once the URL is matched, he should activate this `component`. Similarly, whenever the user navigates to the `about`, we want to show the `AboutComponent`. 

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
```
Now, let's save this.

We also need to reference these `routes` here in the `RouterModule` configuration. 

```javascript
@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
```

From that point of view, the setup is done. We need to do a final part, which is to go in our app component and specify where those dynamic routing components should be inserted. For that purpose, we can use the `<router-outlet>`.

#### app.component.html
```html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<router-outlet></router-outlet>
```

Now, when we change the URL to go to `home`, you can see that the `HomeComponent` gets activated. 

If we inspect here, we can see here the `<router-outlet>`. Just below the `<router-outlet>`, the component will get inserted by the router dynamically. 

![Home](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355065/transcript-images/angular-define-and-configure-a-route-with-the-angular-router-home.png)

Similarly, if we change to `/about`, the `AboutComponent` gets inserted dynamically below the `<router-outlet>`.