Here, you can see a very simple routing configuration, which is defined in this `people-routing.module.ts`. 

#### people-routing.module.ts
```javascript
import { PersonDetailComponent } from './person-detail.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes = [
  {
    path: 'people/path1',
    component: PersonDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}
```

Whenever our browser URL points to this `/people/path1`, our `PersonDetailComponent` will be visualized.

Now, one of the various ways of passing data via the URL to our `PersonDetailComponent`, or generally to our router components, is by indicating our query parameter. Now, a query parameter is usually added to the browser's URL bar by a question mark. Then, for instance, we could say `showChild = true`.

#### URL in Browser
```
http://localhost:3200/people/path1?showChilds=true
```

As you can see, even though we specified a different kind of URL by indicating that query parameter, our `PersonDetailComponent` still works, and it should visualize correctly. That's because query parameters can be added arbitrarily to any URL we define.

![Still works](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-define-and-read-query-parameters-with-the-angular-router-still-works.png)

We don't have to change our routing configuration for adding those parameters. For reading those, we can jump into our `PersonDetailComponent` in this case. We need to get hold of the `ActivatedRoute` object, which needs to be imported here always from `@angular/router`.

#### person-detail.component.ts

```javascript
import { ActivatedRoute } from '@angular/router';
```

Then either in our construction or also in our `ngOnInit`, we can access those query parameters. We do that by accessing `activatedRoute`, `queryParams`. It is an observable, so we can `subscribe` to it. Let's get that `data` printed out.

```javascript
ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
        console.log(data);
    });
  }
}
```

If we open up the console, we see here the log statement. You can see we get an object where the property matches here the key in our query parameter and the value below. Afterward, it is the value we specified here.

![Console Log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-define-and-read-query-parameters-with-the-angular-router-console.png)

These are always strings. Regardless of whether you pass a number, a Boolean, or whatever, these come in as strings. Make sure always to convert them, if you need to.

Now that we get the `data`, we could simply say something like `shouldShowChildren`. `false` is the default value. Then we can go inside our `template` and say something like, `<div *ngif="shouldShowChildren">`. 

```javascript
@Component({
  selector: 'app-person-detail',
  template: `
    <p>
      person-detail works!
    </p>
    <div *ngIf="shouldShowChildren">
      We should also load the children.
    </div>
  `,
  styles: []
})
```

Then here below, we need to set `this.shouldShowChildren` to `true`.

```javascript
ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
       this.shouldShowChildren = (data['showChilds'] === 'true')
    });
  }
}
```

We can see now it gets appropriately loaded. 

![Child True](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-define-and-read-query-parameters-with-the-angular-router-child-true.png)

If we change our URL to `false`, then it gets hidden, as it also gets when you don't specify anything. As always, if you know that your routed component gets reloaded every time your routing changes, we can also bypass the observable registration and directly access the `snapshot`.

We access the `snapshot`, `queryParams`, `showChilds`. We need to assign this also properly. 

```javascript
ngOnInit() {
    this.shouldShowChildren =
      this.activatedRoute.snapshot.queryParams['showChilds'] === 'true';
  }
```
Obviously, in a real-world scenario, it would then use this information, for instance, to query further data from your server.