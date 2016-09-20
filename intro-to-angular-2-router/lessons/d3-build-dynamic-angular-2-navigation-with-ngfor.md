Now this `<nav>` has gotten very repetitive, so it looks like something that would be a candidate for `ngFor`, because on an `<a>` tag, I can just say `ngFor`, then create some nav variables. We'll say nav of navs. Then set up a `navs` array inside of our `AppComponent`.

**app/app.component.ts**
```html
<nav>
  <a *ngFor="let nav of navs"
    ...
    >
  </a>
  ...
</nav>
```

`navs` is an array, and these little objects will be our nav objects. We'll have a `url`, and `content` of "Home", then just make a couple more of these. A `url` of "contacts", `content`, "Contacts", and a `url` of "contacts/one", `content`, let's say, "One`.

**app/app.component.ts**
```html
  template: '
<nav>
  ...
</nav>
<router-outlet></router-outlet>
'
})
export class AppComponent{
    navs = [
        {url: "", content: "Home"},
        {url: "contacts", content: "Contacts"},
        {url: "contacts/1", content: "One"},
    ];
}
```

With these navs, we now have an `ngFor`-led `nav of navs`. We'll loop in through these. We can go ahead and take this home, and call this `{{nav.content}}`. Hit save, and you'll see each of these change. The home, contacts, and one, just like we have home, contacts, and one.

**app/app.component.ts**
```html
<nav>
  <a *ngFor="let nav of navs"
    routerLink=""
    routerLinkActive="active"
    [routerLinkActiveOptions]="{exact:true}"
    >
    {{nav.content}}
  </a>
  ...
</nav>
```

In our `routerLink`, this now has to be `nav.url`. Let's see what happens now is that if I had to click on home, this would try and take me to nav.url, and you'll see an error show up saying, "Cannot match any routes, nav.url."

![Error](../images/d3-build-dynamic-angular-2-navigation-with-ngfor-error.png)

That's because it's evaluating this as a string. We have to make sure that this is an object that needs to be evaluated, and get the string off of that .url. **Always remember to use the square brackets around an attribute where you need the right side to be evaluated**

**app/app.component.ts**
```html
<nav>
  <a *ngFor="let nav of navs"
    [routerLink]="nav.url"
    routerLinkActive="active"
    [routerLinkActiveOptions]="{exact:true}"
    >
    {{nav.content}}
  </a>
  ...
</nav>
```

You never use the curly braces in here. You use the brackets on the left side. Now these will be evaluated properly so that when I click on home, I go home. When I click on contacts, I go to contacts. When I click on one, I go to one, because nav.url matches no path, the path of contacts, and the path of contacts/one.