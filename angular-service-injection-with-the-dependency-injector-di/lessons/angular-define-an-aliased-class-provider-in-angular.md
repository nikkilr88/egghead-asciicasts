Instructor: [00:00] In this example here, we have defined a `LoggerService`, which is quite simple. It has a `log` method, which gets a `msg` as a string, and then it logs into the console. 

#### logger.service.ts
```javascript
@Injectable()
export class LoggerService {
  constructor() {}

  log(msg: string) {
    console.log(`Logger: ${msg}`);
  }
}
```

We registered this service here in the `AppModule` in the `providers` section.

#### app.module.ts
``` javascript
@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [BrowserModule],
  providers: [LoggerService],
  bootstrap: [AppComponent]
})
```

[00:16] We have basically that `PersonComponent`, which gets an instance here via the dependency injection mechanism. Whenever you press that button, it uses that `LoggerService` to log to the console. If you dig here, you can see the message is being printed out here in our devtools console.

#### person.component.ts
``` javascript
@Component({
  selector: 'app-person',
  template: `
    <div>
    Logging component:
    <button (click)="doLog()">Log to console</button>
  </div>
  `,
  styles: []
})
export class PersonComponent implements OnInit {
  constructor(private logger: LoggerService) {}

  ngOnInit() {}

  doLog() {
    this.logger.log('Message from PersonComponent');
  }
}
```

[00:34] Imagine we define a new `LoggerService`. We have quite a large application, let's call this `new-logger.service.ts`. We can simply, for now, copy that over. We call that `NewLoggerService`, and here, we say "New Logger", and print out the message. The API stays exactly the same.

#### new-logger.service.ts
``` javascript
@Injectable()
export class NewLoggerService {
  constructor() {}

  log(msg: string) {
    console.log(`New Logger: ${msg}`);
  }
}
```

[00:56] We might change some implementation internally, and we will like then to refactor our application to use that new logging service. First of all, we obviously need to register that in that `providers` section here. We have to wire in here that `NewLoggerService`. That needs to get imported here for us.

#### app.module.ts
``` javascript
@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [BrowserModule],
  providers: [NewLoggerService, LoggerService],
  bootstrap: [AppComponent]
})
```

[01:19] We would like that our entire application now uses that `NewLoggerService` wherever we have that loggerService defined. Our `PersonComponent` should now pick up the `NewLoggerService`, without us having to change the entire application.

[01:31] There's a mechanism called **aliasing**. What we can do here is to write this in its full form. We can say here `provide` a `LoggerService`, but use an existing, which would be our `NewLoggerService`.

``` javascript
@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [BrowserModule],
  providers: [
    NewLoggerService, 
    { provide: LoggerService, useExisting: NewLoggerService}
  ],
  bootstrap: [AppComponent]
})
```

[01:48] Obviously, the API here of that `NewLoggerService` and that `LoggerService` have to be the same. For that reason, it's also probably convenient in a real application to use an interface, which then, at compile time, would alert you in terms of compilation errors.

[02:06] We can click that log to console button, and you can see now that the new logger is being picked up instead of that old logger. We actually didn't have to change any kind of implementation, but we did wire it up with this `useExisting`.

[02:19] At this point, you might ask yourself, "Why not use the `useClass` basically, and override, basically, that `LoggerService` with the `NewLoggerService`. That would work perfectly, but there's one key difference here.

[02:33] When using `useClass`, we will get two different kind of instances for those components or services which use that `LoggerService` as an import and those that `NewLoggerService` as in import. Instead, if we use `useExisting`, we will use the exact same instance and have just a single one for the entire application.