In this application here, I have a list of people. Whenever I click a name, a form opens, which allows me to modify that person and to save it again. Now, I've also implemented a mechanism that visualizes me whenever I have unsafe changes.

![Initial Application](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/egghead-notify-user-about-unsaved-data-when-leaving-a-component-using-the-angular-router-initial.png)

This is implemented very, very naively and very simple. In `person-detail.component.ts`, I have the form. Here, you can see that this `isDirty` flag is being visualized, and this is being calculated by simply registering on the `valueChanges` for that `name` field, which represents here for that field of the `name` of the person.

#### person-detail.component.ts
```javascript
this.form.get('name').valueChanges.subscribe(nameValue => {
  if (nameValue !== this.person.name) {
    this.isDirty = true;
  } else {
    this.isDirty = false;
  }
});
```

Whenever that changes that, we verify whether that name is different from the current `person.name`. If it is, we display that `isDirty=true`, otherwise `isDirty` is `false`. Also, if I change, the dirty flag gets set to true, but then I save it, which is down in our `onSubmit`.

Basically by submitting the form, and then I manually reset `isDirty` to `false` again. 

```javascript
onSubmit({ value, valid }) {
  if (valid) {
    value.id = this.person.id;
    this.peopleService.save(value);
    this.isDirty = false;
  }
}
```

Now usually, in a real-world application what you have is that whenever you change this here, and then you have unsafe changes basically, you now navigate to some other view.

You should be notified, telling you about the potential data loss because you didn't save the changes before leaving. The Angular router allows us to implement the so-called `canDeactivate` guard. Let me create here a new class, `can-deactivate.guard.ts`.

Let me paste in here some predefined template. 

#### can-deactivate.guard.ts
```javascript
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class CanDeactivateDirtyComponent implements CanDeactivate<any>{

}
```

This is a normal Angular service. I implement here the `CanDeactivate`, and the `CanDeactivate` usually takes an instance of a component. Now, we could generalize the part of having some dirty component concept as an interface, and implement it here.

However, in this specific example here, I'm implementing the `PersonDetailComponent directly`. Let's also import that. 

```javascript
import { PersonDetailComponent } from './person-detail.component';

@Injectable()
export class CanDeactivateDirtyComponent implements CanDeactivate<PersonDetailComponent> {
}
```

Then we have to implement the `canDeactivate` function. The `canDeactivate` function takes first of all the `component`, which in this case is a `PersonDetailComponent`. 

Then we have the `currentRoute`, which is an `ActivatedRouteSnapshot`, and the `currentState` of the router, as well as the `nextState`. This here returns a `boolean`, an observable of a boolean read, or even a promise. Right now, we need the `boolean`, so let's implement it in that way.

```javascript
canDeactivate(
  component: PersonDetailComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
): boolean {
  
}
```

Now we have the component that gets passed in here to the `component` instance; we can directly query it. Let's, first of all, determine whether it `isDirty`, and we can directly say `component.isDirty`, so we access here that property of our component. If it is dirty, we want actually to inform the user.

In the case, we do simply a `return confirm('You have unsafe changes, do you want to proceed?')` This will then return a Boolean value so we can directly `return` it. Otherwise, we can leave that form, so just `return true`, because we don't have any dirty changes. 

```javascript
canDeactivate(
  component: PersonDetailComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
): boolean {
  const isDirty = component.isDirty;

  if (isDirty) {
    return confirm('You have unsaved changes, do you want to proceed?');
  } else {
    return true;
  }
}
```

Now, we need to register that `canDeactivate` dirty component guard.

We directly go to the `people.module`. We have the `providers`, and we register it there. 

#### people.module.ts
```javascript
import { CanDeactivateDirtyComponent } from './can-deactivate.guard';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PeopleRoutingModule],
  declarations: [PersonDetailComponent, PeopleListComponent],
  providers: [PeopleService, CanDeactivateDirtyComponent]
})
```

Then we have to also go into the `people-routing.module`, and on the people detail component, on the `PersonDetailComponent`, we specify the `canDeactivate` property.

#### people-routing.module.ts
```javascript
const routes = [
  {
    path: '',
    component: PeopleListComponent,
    children: [
      {
        path: ':personId',
        component: PersonDetailComponent,
        canDeactivate: [CanDeactivateDirtyComponent]
      }
    ]
  }
];
```

Now, let's navigate to that `/people` module. Let's go here to some person. Let's modify that such that we have unsafe changes. Let's click on `contacts`.

Now, you can see 'You have unsafe changes, do you want to proceed?' Yes, I want to proceed anyway. It will let me continue out of the people detail component here. However, if, for instance, I have unsafe changes, I want to navigate the way in and click cancel, I remain inside here. I can save those changes, and then I can navigate away without any problems.

![Warning](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/egghead-notify-user-about-unsaved-data-when-leaving-a-component-using-the-angular-router-warning.png)