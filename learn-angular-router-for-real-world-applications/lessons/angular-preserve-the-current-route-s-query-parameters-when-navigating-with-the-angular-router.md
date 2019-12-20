In this example here, we have this list of people, which allows us to navigate to the detail page, and back again to that list. Assume we have some global token here, or some query parameter, for instance, `123`.

![Token](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-preserve-the-current-route-s-query-parameters-when-navigating-with-the-angular-router-token.png)

What we would like to have is that whenever I click that detail page, we carry along that `token` along when we navigate from one step to another. Right now, if you pay attention to the URL, whenever I click to that detail page, that URL gets completely replaced, and our `token` gets lost.

Let's see how we can change that behavior. If you take a look at this `template` in our `people-list.component.ts` file, which generates this list of people, we use here the `routerLink` and pass on simply the `id` of the `person` which we would like to see. 

#### people-list.component.ts
```html
@Component({
  selector: 'app-people-list',
  template: `
    <h3>People</h3>
    <ul>
      <li *ngFor="let person of people | async">
        <a [routerLink]="[person.id]">{{ person.name }}</a>
      </li>
    </ul>
  `,
  styles: []
})
```

Interestingly here, we have another parameter, which is called `queryParams`, which allows us here to add a `token`.

For instance, we could say `abc` here. 

```html
<a [routerLink]="[person.id]" [queryParams]="{ token: 'abc'}">{{ person.name }}</a>
```

If we try that out, whenever we click somewhere, we see that the `token` gets added to our URL here, and we get `token=abc`. 

![abc Token](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-preserve-the-current-route-s-query-parameters-when-navigating-with-the-angular-router-abc.png)

We want something different, however. We want to take an existing `queryParam` and carry that onto the next page.

What we could do is, first of all, grab an instance here off that `activatedRoute`, which we got out of the dependency injection mechanism. 

```javascript
constructor(
  private peopleService: PeopleService,
  private activatedRoute: ActivatedRoute
) {}
```

Then what we could of course do is here in the `ngOnInit` register on that `activatedRoute` and the `queryParams`, `subscribe` to that. Then one by one, expose those values to our template, and then basically map them here on our queryParams directive.

```javascript
ngOnInit() {
  this.activatedRoute.queryParams.subscribe()
  this.people = this.peopleService.getAll();
}
```

`queryParams` is an observable, and Angular templates play well with observables. What we can do here is to directly expose that `activatedRoute` to our `template`, by changing that `private` to a `public` identifier. 

```javascript
constructor(
  private peopleService: PeopleService,
  public activatedRoute: ActivatedRoute
) {}
```

Then we can use here the `async` pipe. We can say `activatedRoute.queryParams`.

I can use the `async` pipe to register that observable and get that value bound to the `queryParams` directive here. 

```html
@Component({
  selector: 'app-people-list',
  template: `
    <h3>People</h3>
    <ul>
      <li *ngFor="let person of people | async">
        <a [routerLink]="[person.id]" [queryParams]="activatedRoute.queryParams | async">{{ person.name }}</a>
      </li>
    </ul>
  `,
  styles: []
})
```

If we save that, and we add here some `token`, `1234`, if we click now to the details page, you can see how that token gets carried on.

Here we have another navigation. In the `person-detail.component.ts` file, we have some code navigation that whenever we click the save button, we use here the `router` to navigate manually to another route. In this case, we move one level up, again to our people list. 

#### person-detail.component.ts
```javascript
onSave(personName) {
  this.person.name = personName;
  this.peopleService.save(this.person).subscribe(() => {
    // redirect back people list
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute
    });
  });
}
```

Again, if we click that save button, you can see how we still lose the `token`, `queryParam`.

Similarly, also here, we have to give the router the according information and tell him to preserve our queryParams. This is a simple flag, which you can set to `true`.

```javascript
onSave(personName) {
  this.person.name = personName;
  this.peopleService.save(this.person).subscribe(() => {
    // redirect back people list
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
      preserveQueryParams: true
    });
  });
}
```

Let's again try. Let's add here that `token`, `123`. If we navigate to that detail page, we see the `token` remains there. Then we click, and we see we get redirected. The `token` still is there and gets carried on to the next page.
