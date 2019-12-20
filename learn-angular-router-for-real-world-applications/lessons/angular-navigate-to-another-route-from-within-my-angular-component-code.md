Here we have a list of people, which we have linked via that `routerLink`. Whenever we click on that button, we come to the detail page of that person, and we can go back and open another one, and see that visualized here in the detail part.

![People List](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-navigate-to-another-route-from-within-my-angular-component-code-list-people.png)

Not always is it possible to use the `routerLink` and statically link items to each other, because, for instance, in this detail page, here, what we would like to achieve is that we change the name, and we click that save button. Whenever that record has been saved successfully, we would want to redirect back to our people list.

In that case, the routing needs to happen programmatically, so whenever we click that save button, and we get a successful response from our server. Let's take a look at that `person-detail.component.ts` here. 

Here, we have a very simple `input` box, where we use a template variable to get access to that value. Whenever the user clicks that button, we invoke that `onSave` method, and we pass on the name of that person. 

#### person-detail.component.ts
```html
@Component({
  selector: 'app-person-detail',
  template: `
    <div style="padding-top: 15px;">
      <label>Id: {{ person.id }}</label>
    </div>
    <div>
      <label>Name:</label>
      <input type="text" #nameInput [value]="person.name">
    </div>
    <button (click)="onSave(nameInput.value)">Save</button>
  `,
  styles: []
})
```

Now, in that save method here, we can use the `peopleService`, invoke that `save` method there, and pass in the `person`, which we have modified. 

```javascript
onSave(personName) {
  this.person.name = personName;
  this.peopleService.save(this.person).
  });
}
```

That `save` method is just a very fake method which we have implemented for this demo here. 

What we do is, in our `people.service.ts` file, we grab the `person` with the same `id`, we set the `name`, then we return the observable, and simulate a delay which would usually happen when you call your backend API. 

#### people.service.ts
```javascript
save(person) {
  const p = this.people.find(x => x.id === person.id);
  if (p) {
    p.name = person.name;
  }

  return of(true).pipe(delay(1000));
}
```

Back in `person-detail.component.ts`, what we can do now is to actually `subscribe` to that observable. Whenever that observable terminates, we would like it to redirect back to the people list. 

#### person-detail.component.ts
```javascript
onSave(personName) {
  this.person.name = personName;
  this.peopleService.save(this.person).subscribe(() => {
    // redirect back people list
  });
}
```

To achieve that, we need to get an instance of the `router` injected into our component here. Let's grab an instance by the dependence injector to get the `Router`. 

```javascript
constructor(
  private activatedRoute: ActivatedRoute,
  private peopleService: PeopleService,
  private router: Router
) {}
```

Now, inside our method `onSave`, we can access that `router.navigate` properties. We have different kind of options here. One, we can `navigateByUrl`, basically indicating a fixed string. In this case, it would mean the path to that `'/people'` list.

```javascript
onSave(personName) {
  this.person.name = personName;
  this.peopleService.save(this.person).subscribe(() => {
    // redirect back people list
    this.router.navigateByUrl('/people');
  });
}
```

Let's try that out. Whenever I add a name, I'm saving the button, and I'm redirected back to the people list. The other possibility is the use of the router's `navigate` method, which expects the same segments we usually give our router link.

In this case, that would be `people`. 

```javascript
onSave(personName) {
  this.person.name = personName;
  this.peopleService.save(this.person).subscribe(() => {
    // redirect back people list
      this.router.navigate(['/people']);
  });
}
```

Similarly, we enter here, we change the name, then there's the delay, and then we come back to our people list again. We don't always have to indicate the full path to our component where we want to `navigate`.

In our case, for instance, the detail page can be seen as a sub-path, a child of that list path, which is simply one above the detail page. In that case, we can make use of the relative navigation.

Simply passing here the relative path is not enough, because we also needed to tell the router that this is a relative navigation, and this navigation is relative to this route here. Remember we get `activatedRoute` injected here as well in our constructor.

```javascript
onSave(personName) {
  this.person.name = personName;
  this.peopleService.save(this.person).subscribe(() => {
    // redirect back people list
  this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  });
}
```

We pass on that router access or navigation access property, where we specify that `relativeTo` property, and we pass in the instance of the current route. Again, if we try this out, if we navigate inside here, we can modify the record, save, there will be the delay, and then we will be redirected again to that people list.