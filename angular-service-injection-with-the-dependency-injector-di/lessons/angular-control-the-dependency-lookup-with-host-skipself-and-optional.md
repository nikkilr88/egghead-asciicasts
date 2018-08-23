Instructor: [00:00] Here, we have an `AppComponent` which internally uses an `AppPerson` component. 

#### app.component.ts
``` javascript
@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Services</h1>
    <app-person></app-person>
  `
})
export class AppComponent {}
```

Our `AppPerson` component is actually very simple. It gets here a `LoggerService` injected. Then whenever we click on a button here, that method, `doLog`, is called, which then logs out to the console.

#### person.component.ts
```javascript
export class PersonComponent implements OnInit {
  constructor(public logger: LoggerService) {}

  ngOnInit() {}

  doLog() {
    if (this.logger) {
      this.logger.log('Message from PersonComponent');
    } else {
      console.log('sorry, no logger available');
    }
  }
}
```

[00:19] In fact, if you click here, we can see that we get the log message out here. 

#### output
```javascript
Logger (AppModule): Message from PersonComponent
```

Now, our `LoggerService` is actually quite simple here. We have a `prefix`, which gets passed into our `LoggerService`, and we have that `log` message, which logs out logger, then a prefix, and the message we passed in.

#### logger.service.ts
```javascript
export const loggerFactory = prefix => {
  return () => new LoggerService(prefix);
};

@Injectable()
export class LoggerService {
  constructor(private prefix: string) {}

  log(msg: string) {
    console.log(`Logger (${this.prefix}): ${msg}`);
  }
}
```

[00:36] In order to be able to construct this `LoggerService`, we have here a `loggerFactory`, which for instance, in the `AppModule`, we make use and we pass in here that this logger has been instantiated here by the `AppModule`.

#### app.module.ts
```javascript
@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: LoggerService,
      useFactory: loggerFactory('AppModule')
    }
  ],
  bootstrap: [AppComponent]
})
```

[00:47] Now, Angular has a hierarchical dependency injector. As a result, if we go into the `PersonComponent`, whenever that `PersonComponent` requests here a `LoggerService` or another service to be injected, it will walk up the component tree.

#### person.component.ts
```javascript
export class PersonComponent implements OnInit {
  constructor(public logger: LoggerService) {}

  ...

}
```

[01:01] Basically, it checks here whether this component itself defines a `LoggerService`, which it doesn't. It walks up in its tree to the app root component, which is in our case here, the `AppComponent`, which does nearly define the `LoggerService`.

[01:14] Ultimately, it finishes at the very global part here, which is our `AppModule`, which in fact, defines here a provider, which is our `LoggerService`. It passes in here that AapMmodule` prefix. That's exactly why we get here that `AppModule` prefix printed out on our console.

[01:28] What happens in that provider here is not defined, so if we don't have any `LoggerService`? Let's quickly comment out this section here. If you take a look now at our dev tools console here, we see that we get an error, because Angular tells us there is no provider for our `LoggerService`, which our `PersonComponent` on our high end here requests.

#### app.module.ts
```javascript
@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [BrowserModule],
  // providers: [
  //   {
  //     provide: LoggerService,
  //     useFactory: loggerFactory('AppModule')
  //   }
  // ],
  bootstrap: [AppComponent]
})
```

[01:48] Now, in some scenarios, we could actually totally live even if the service is not provided. In fact, here, if you watch in the `doLog` method, we already take care that whenever the logger's not defined, we handle it differently.

#### person.component.ts
```javascript
doLog() {
  if (this.logger) {
    this.logger.log('Message from PersonComponent');
  } else {
    console.log('sorry, no logger available');
  }
}
```
[02:01] What Angular offers us is a so-called `@Optional` decorator here, which we can import. We import that from the `@angular/core` package. What `@Optional` does is, whenever the `LoggerService` is not defined, it simply puts `null` into that variable here.

```javascript
export class PersonComponent implements OnInit {
  constructor(@Optional() public logger: LoggerService) {}

  ...

}
```

[02:18] We can check for that null value, and accordingly react. For instance, you can see how, "I don't have a logger method," is being printed out, because that logger is null, as well as when we write that log, there is, "Sorry, no logger available."

[02:31] Now, we just learned that the dependency injector is hierarchical. What we could actually do is, we could take that definition here of that `LoggerService` and define it here on our component. Let's comment it out here and add here `AppComponent`. Similarly, we could also define it on our `PersonComponent` here.

```javascript
@Component({
  selector: 'app-person',
  template: `
    <div style="border:1px;">
      <p *ngIf="logger === null">I don't have a logger</p>
      <button (click)="doLog()">write log</button>
    </div>
  `
  providers: [
    {
      provide: LoggerService,
      useFactory: loggerFactory('PersonComponent')
    }
  ]
})
```

[02:56] If you click that write log button here, we can see that we get the first logger the Angular independency injector can find, which in this case, is directly on our component here, so on the host itself. If we don't want to have that behavior, we can add another annotation here, which called `@SkipSelf`.

```javascript
export class PersonComponent implements OnInit {
  constructor(
    @SkipSelf()
    @Optional() 
    public logger: LoggerService) {}

  ...

}
```

[03:13] Again, imported from the Angular core, which will skip here the search on our own host, but rather we go up onto the pattern. In fact, if we click here, we see that we get now the logger, which we have defined here on our `AppComponent`.

[03:27] Very similarly, we can also tell that it should only search our host component. With that, we can basically specify here `@Host`. We'd search here now only on our host component here. In fact, we get again that `PersonComponent` logger.

```javascript
export class PersonComponent implements OnInit {
  constructor(
    // @SkipSelf()
    @Host()
    @Optional() 
    public logger: LoggerService) {}

  ...

}
```

[03:42] Also, if we don't define that person logger here (in `PersonComponent`) -- if we take out that definition here -- we won't get that add component logger now. We rather will get that there's no `LoggerService` available because we don't continue to search upwards. We rather concentrate the search only on our host component here.

[04:02] The `@SkipSelf`, `@Host`, and `@Optional` are actually very powerful constructs because they allow us to take very fine grain control over which dependency injector injects the service into our components.