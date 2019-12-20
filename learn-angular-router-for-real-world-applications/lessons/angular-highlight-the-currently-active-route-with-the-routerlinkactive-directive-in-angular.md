We have here an Angular app which uses the `router` to successfully move between different kind of routes when we click those hyperlinks at the very top, which is our navigation bar. However, what is missing a bit here is some highlighting signaling to the user at which point an application currently is.

In Angular, this is quite easy to apply, primarily if you use the `routerLink`. 

#### app.component.html
```html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Angular router
  </h1>
</div>

<nav>
  <a [routerLink]="['/home']" >Home</a>
  <a [routerLink]="['/contacts', 'list']" >Contacts</a>
  <a [routerLink]="['/people', 'list']" >People</a>
  <a [routerLink]="['/about']" >About</a>
</nav>

<router-outlet></router-outlet>
```

What you can do is add the `routerLinkActive` directive and specify a CSS class which you would like to have applied. For instance, `"active-route"`.

```html
<a [routerLink]="['/home']" routerLinkActive="active-route">Home</a>
```

Let's copy this over to our remaining routes below, here. Now let's quickly refresh our application and switch to the `about` screen. If we click here on the inspect button, we should see that in our hyperlink, the class has been changed to `active-route`.

![CSS Class](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-highlight-the-currently-active-route-with-the-routerlinkactive-directive-in-angular-css-class.png)

If we switch to the people list, you see that the `active-route` has been removed. It has moved to our `People` button here. What's missing now is to go to our `styles.css`, which is our global styles for our application, and add that `active-route` class. For simplicity, let's add here `bold` for our font.

#### styles.css
```css
.active-route {
  font-weight: bold;
}
```

Now you can see how the point of our application gets highlighted correctly in the application bar. 

![Bold](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355065/transcript-images/angular-highlight-the-currently-active-route-with-the-routerlinkactive-directive-in-angular-bold.png)

Of course, this could be much more sophisticated if you have some or side menu with a nice background. A nice thing is this also works if you directly jump to that route of course.