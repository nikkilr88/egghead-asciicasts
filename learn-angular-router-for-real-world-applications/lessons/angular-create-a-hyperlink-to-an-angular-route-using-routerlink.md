Here we have a very simple application which uses the Angular routing system. We have here the global `app-routing.module.ts` where we have already some `routes`, for instance, the `home` route, which you can see displayed or the `about` route.

#### app-routing.module.ts
```javascript
const routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
```

Then we have some sub-modules, which here is the `contacts-routing.module.ts` module with its own routings, for instance `contacts/list`. Let's give it a try so we can navigate to `/contacts/list`. Similarly also for the `people` module, we can navigate to `/people/list` or to a specific person actually with a given ID.

While this, of course, works perfectly we want to have some menu, which allows us to navigate between those different kinds of points. Let's open up the `app.component.html` where we have to find our `router-outlet`.

At the very top here, let's define here navigation, `<nav>`, bar. Here we will add a couple of hyperlinks, for instance for `home`, which would then point to the `/home` route. Let's say for the `about`, which points to the `/about` route and similarly also for the `/contacts/list`, `contacts`, and then also for the `/people/list`.

#### app.component.html
```html
<nav>
  <a href="/home">Home</a>
  <a href="/contacts">Contacts</a>
  <a href="/people">People</a>
  <a href="/about">About</a>
</nav>

<router-outlet></router-outlet>
```

If you save this, you can see there appears the navigation bar at the very top. 

![Initial Navigation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355065/transcript-images/angular-create-a-hyperlink-to-an-angular-route-using-routerlink-initial-nav.png)

We can now use that to navigate among our different routes. Rather than specifying these directly, there's a directive which gets exposed by the Angular router package, which is called `routerLink`.

We can use that one actually to improve here our routing experience. Here we specify directly the path, which in this case is `home`, and pass it ahead to that `routerLink`. Similarly, we can do, for instance, for the `about` page as well.

```html
<nav>
  <a [routerLink]="['/home']">Home</a>
  <a href="/contacts">Contacts</a>
  <a href="/people">People</a>
  <a [routerLink]="['/about']">About</a>
</nav>

<router-outlet></router-outlet>
```

If you refresh, you already notice a different behavior. Here we have at home. We jump to about. You can see how the URL gets updated. We, again, also get a new view. However, if we click the `contacts` part or the `people` part, the entire page gets refreshed.

That's something also that Angular router handles behind the scenes when we use the `routerLink`. Let's also quickly update the remaining parts. 

```html
<nav>
  <a [routerLink]="['/home']">Home</a>
  <a [routerLink]="['/contacts', 'list']">Contacts</a>
  <a [routerLink]="['/people', 'list']">People</a>
  <a [routerLink]="['/about']">About</a>
</nav>

<router-outlet></router-outlet>
```

If you save, we can see how we can navigate here between those parts without any kind of page refresh.

Note, the very same thing also works here, for instance, for our people list. If we navigate to that `people-list.component.ts`, we can add a hyperlink in our `<a>` tag just as we did before.

We again use the `routerLink` directive. Just that in this case, we specify `people` as the first segment. There is a second segment. We directly issue here the `person.id`.

#### people-list.component.ts
```html
@Component({
  selector: 'app-people-list',
  template: `
    <h3>People</h3>
    <ul>
      <li *ngFor="let person of people | async">
        <a [routerLink]="['/people', person.id]">{{ person.name }}</a>
      </li>
    </ul>
  `,
  styles: []
})
```

If we save that part again, we can see that we can click on it. The router will automatically update our URL. We can navigate them back and forth on those various IDs.

The advantage of specifying these segments is that we can specify hard-coded parts as well as variable parts just in-between, which get directly data-bound to that model, which we are processing here in the template.