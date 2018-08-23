In this sample application, we have here a people Angular module, which is a very simple Angular module, consisting here of a `PeopleListComponent`, which displays here a list of people, and a `PeopleService`, which exposes simply a static area of people, and gives also the possibility to add new people.

#### people.module.ts
```javascript
@NgModule({
  imports: [CommonModule],
  declaration: [PeopleListComponent],
  providers: [PeopleService],
  exports: [PeopleListComponent]
})
```

#### people.service.ts
```javascript
@Injectable()
export class PeopleService {
  people = [
    {
      name: 'Juri'
    },
    {
      name: 'Steffi'
    }
  ];

  getPeople() {
    return this.people;
  }

  addPerson(name) {
    this.people.push({
      name
    });
  }
}
```

#### Output
![Output](../images/angular-avoid-multiple-service-instances-in-lazy-loaded-modules-in-angular-output.png)

Now, that `PeopleModule` gets imported here in the `AppModule`, which allows us then in that `HomeComponent` to show a list of people, which we can just see here in the output.

#### home.component.ts
```javascript
@Component({
  selector: 'app-home',
  template: `
    <h1>Home</h1>
    <app-people-list></app-people-list>
  `,
  styles: []
})
```

Then we have that employees link here in the output. That employees link points to the `EmployeesModule`, which is a routing Angular module.

Which in turn, has also an `EmployeesComponent`, which uses the `<app-people-list>` from that `PeopleModule`. Now, obviously, in order to be able to use that component here, we have to import that `PeopleModule` in our `EmployeesModule` as well. Otherwise, it wouldn't recognize that `<app-people-list>` tag here in the `EmployeesComponent`.

#### employees.module.ts
```javascript
@NgModule({
  imports: [CommonModule, PeopleModule, EmployeesRoutingModule],
  declarations: [EmployeesComponent]
})
export class EmployeesModule
```

Now, the `EmployeesModule` here is a routed module. That means we have here a routing configuration, which defines a route path and the according `EmployeesComponent`, and exposes here that `EmployeesRoutingModule`.

#### employees-routing.module.ts
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
```

In turn, that same module is registered here at the `AppModule`. We import it inside here as well. Therefore, the router basically recognize that route, and we can switch back and forth between those two views.

#### app.module.ts
```javascript
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, PeopleModule, EmployeesModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Now, the `HomeComponent`, as well as the `EmployeesComponent`, share the same `PeopleListComponent` from the `PeopleModule`. Since both use the same Angular service, and that Angular service is registered to the `PeopleModule` here, it is globally available.

We also have only one instance in our application. That means, for instance, if we add here a new value, we switch then the `EmployeesComponent`, and we see that we have the same values inside here as well.

### Old Output
```
Angular Services

Home, Employees

Employees Route

- Juri
- Steffi
- Thomas
```

#### New Output
```
Angular Services

Home, Employees

Employees Route

- Juri
- Steffi
- Thomas
```

That's because both basically fetch the data from the same instance of the service, which in memory, has the same array. Now, let's make a change to our application, making that `employees-routing.module.ts` here a "lazy routed" module.

First of all, we remove here that employees path.

#### employees-routing.module.ts
```javascript
const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  }
];
```

Then we go to our `app-routing.module.ts`, and we have to define here a new route. We say `path:` will be now `'employees'`, and we `loadChildren`, pointing to our `EmployeesModule`.

#### app-routing.module.ts
```javascript
const routes: Routes = [
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
    path: 'employees',
    loadChildren: './employees/employees.module#EmpolyeesModule
  }
];
```

Once you have done that, we have also to go to the `AppModule`, and remove every reference here to that `EmployeesModule`, such that it can be lazily loaded.

#### app.module.ts
```javascript
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, PeopleModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

In fact, if we take a look at our compiler, we should now see here a separate `EmployeesModule` chunk. That tells us that it's now lazy loaded.

#### Compiler
```
Hash: 1134b8865ff5d9c353b0
Time: 284ms
chunk {employees.module} employees.module.chunk.js () 9.69.kb
```

Now, let's take a look what happens if we are in our `HomeComponent` here. We add a record here, Thomas. Then we click on the Employees link. You can see, we don't find the record here. In fact, if we add Peter here, for instance, and we switch back, we can see that we have now two different instances of our service, apparently.

#### Home Route
```
Angular Services

Home, Employees

Home
- Juri
- Steffi
- Thomas
```

#### Employees Route
```
Angular Services

Home, Employees

Employees
- Juri
- Steffi
- Peter
```


The reason for that behavior is that lazy loaded modules, like our `EmployeesModule`, have their own dependency injector. As a result, if such a lazy loaded module, as in our case, registers here to `PeopleModule`, which in turn, exposes here that `PeopleService`, that `PeopleService` will be registered to that lazy loaded dependency injector here.

Similarly also, our `AppModule` takes here a reference to that `PeopleModule`, and again, always that service gets exposed. That service will now be registered to the global dependency injector of our application.

Notice we have two different kind of instances of our `PeopleService`, one living in that employees dependency injector, and one living in the global app dependency injector. Now, there is a pattern for avoiding such behavior.

For instance, let's take our `PeopleModule`. If this a module that is intended to be shared across our applications, as well as across lazy loaded modules, we can open here that module definition, and we can implement here what is called a so-called full root pattern.

#### people.module.ts
```
@NgModule({
  imports: [CommonModule],
  declaration: [PeopleListComponents],
  providers: [PeopleService],
  exports: [PeopleListComponent]
})
export class PeopleModule {

}
```

We create here a `static` method `forRoot()`, which exposes a so-called `ModuleWithProviders` object. There, we expose the module, which is the `PeopleModule`, and then our `providers`. Now, `providers` is nothing else as our `providers` section above here. You can simply copy and paste it down here.

#### people.module.ts
```
@NgModule({
  imports: [CommonModule],
  declaration: [PeopleListComponents],
  providers: [PeopleService],
  exports: [PeopleListComponent]
})
export class PeopleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PeopleModule,
      providers: [PeopleService]
    }
  }
}
```

As you can see here, we export our components, which we still have to export, and with our modules, have to import our `PeopleModule` in order to be able to use those components. Then we expose our `providers`, which will be only available one instance for application in that provider section down here.

Now, if we go back to our `AppModule`, we should actually invoke here the `.forRoot()`. That will now fetch that `ModuleWithProviders` object, and register that service only once globally.

#### app.module.ts
```javascript
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, PeopleModule.forRoot(), AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

In our `EmployeesModule`, however, we can still leave the `PeopleModule` registration as it is.

This one won't register another service again, because there is no service registration on the top here.

#### people.module.ts
```javascript
@NgModule({
  imports: [CommonModule],
  declaration: [PeopleListComponent],
  exports: [PeopleListComponent]
})
```

Since we are not calling `forRoot()`, there is no service being registered. However, we still get the declarations for that `PeopleListComponent`, such that in our `EmployeesComponent`, we can still use that `<app-people-list>`.

Now, if we refresh our application again, If we add here Thomas, and we'll switch down to employees, we can see that we again have one single service registered per our application.