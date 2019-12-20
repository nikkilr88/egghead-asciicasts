We have here a straightforward route defined here in our `people-routing.module`. 

#### people-routing.module.ts
```javascript
const routes = [
  {
    path: 'people/path1',
    component: PersonDetailComponent
  }
];
```

Whenever we point our browser's URL bar to this path here, we get the person detail component here visualized. 

![Hardcoded](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-define-and-read-route-parameters-with-the-angular-router-hardcoded.png)

What we would like to look at now, is how we can add variable parts to that route, which help us transport data in our URL.

One way to do that is by using so-called router parameters. You can define them by starting with a colon, and then by giving them some name, like ID, but in our case, we'll make it `personId`. In this example here, this could be from the whole list of people -- show me the person with that kind of ID.

```javascript
const routes = [
  {
    path: 'people/:personId',
    component: PersonDetailComponent
  }
];
```

This is just the first step, basically to define that variable part. The next step is then to go into our `person-detail.component.ts` and to read that information to display the person that matches that ID onto our component. The first step here is to get ahold of an instance of the `ActivatedRoute`.

Let's inject that here, and we need to import that from `@angular/router`. 

#### person-detail.component.ts
```javascript
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-detail',
  template: `
    <p>
     person-detail works!
    </p>
  `,
  styles: []
})
export class PersonDetailComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute) {}
}
```

Then within in our `constructor`, or directly within our `ngOnInit`, we can then access `this.activeRoute` member variable here. We can then query the `params` part, which is an observable, and `subscribe` to it.

Inside here, we will get the object which contains our parameters. Let's quickly log that to our console. 

```javascript
 ngOnInit() {
    this.activeRoute.params.subscribe(data => {
       console.log(data);
    });
  }
```

![Console Log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355065/transcript-images/angular-define-and-read-route-parameters-with-the-angular-router-console.png)

You can see now we get an object with `personId`, which is the parameter we specified in our routing. Its according value, in this case, is `path1`, because we have specified this as our current URL.

You could add to the url, `1234`, `localhost:4200/people/1234`. Then printed out to the console, we'll have that parameter, correctly displayed in this object. As a result, we could go here -- into our detail components `template` -- and say, `Displaying person with id {{ personId }}`. 

```html
template: `
    <p>
      Displaying person with id {{ personId }}
    </p>
  `
```


We can add this as a member variable here, `personId`.

Below here, we could say `this.personId` is equal to data. Let's add it here, `personId`. 

```javascript
export class PersonDetailComponent implements OnInit {
  personId;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(data => {
      this.personId = data['personId'];
    });
  }
}
```

You can see it gets appropriately displayed in our template. 

![PersoniD displaye](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-define-and-read-route-parameters-with-the-angular-router-display-personid.png)

As always, you can access this in different kind of manners. Like here, we directly subscribed to our parameters observable.

However, if you know for sure that your component gets reloaded each time your route changes, you can also access the value via the `snapshot`. We could simply do something like `this.personId = this.activeRoute.snapshot.params`. Then again, indicate the `personId`, and that will work as well, just as we expect.

```javascript
export class PersonDetailComponent implements OnInit {
  personId;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.personId = this.activeRoute.snapshot.params['personId'];
  }
}
```

We can say here, 222, and it would correctly refresh in our template.
