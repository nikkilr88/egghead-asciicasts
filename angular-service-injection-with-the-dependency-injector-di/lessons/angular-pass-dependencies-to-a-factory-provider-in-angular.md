Instructor: [00:00] Here, we have a `LoggerService` where we use so-called `useFactory` provider to instantiate that `LoggerService` manually. Now, let's consider our situation is a bit more complicated.

#### app.module.ts
```
const loggerFactory = () => {
  return new LoggerService(false);
};

@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [BrowserModule],
  providers: [{ provide: LoggerService, useFactory: loggerFactory }],
  bootstrap: [AppComponent]
})
```

[00:10] For instance, we might have something like a `ConsoleWriter`. A `ConsoleWriter` is nothing else than an Angular service. Let's `export` here to class `ConsoleWriter`, and it has a method. Which gets a message, and the `ConsoleWriter` will log it out to the console.

#### console-writer.service.ts
```javascript
@Injectable()
export class ConsoleWriter {
  public write(msg: string) {
    console.log(msg);
  }
}
```

[00:36] We need to go to the `AppModule` and define here our `ConsoleWriter`. And register it with the Dependency Injection mechanism of Angular. 

#### app.module.ts
``` javascript
@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [BrowserModule],
  providers: [
    ConsoleWriter,
    { 
      provide: LoggerService, 
      useFactory: loggerFactory
    }
  ],
  bootstrap: [AppComponent]
})
```

Then, let's go back to our `LoggerService` and assume that `LoggerService` is using that `ConsoleWriter`.

#### logger.service.ts
```javascript
@Injectable()
export class LoggerService {
  constructor(private isEnabled: boolean, private writer: ConsoleWriter) {}

  log(msg: string) {
    if (this.isEnabled) {
      this.writer.write(msg);
    }
  }
}
```

[00:54] Inside here, it says `this.writer.write(msg)`. We need to extend also here our factory function, because now, it doesn't take only that `Boolean` value whether that logging service is active or not. It also needs an instance of such a `ConsoleWriter`.

[01:12] We could again do something like the `ConsoleWriter` and instantiate the object here ourselves. 

#### app.module.ts
```javascript
const loggerFactory = () => {
  // not how we want to do this
  return new LoggerService(true, new ConsoleWriter());
};
```

But again, we would like to get that from the Dependency Injection mechanism. First of all, we can get it injected here.

```javascript
const loggerFactory = (writer: ConsoleWriter) => {
  // not how we want to do this
  return new LoggerService(true, writer);
};
```

[01:25] Let's say `ConsoleWriter`, and we pass it simply on to our `LoggerService`. In order to tell the Angular Dependency Injector to inject that dependency, we need to define that and that `deps` property, which we have below here.

``` javascript
@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [BrowserModule],
  providers: [
    ConsoleWriter,
    { 
      provide: LoggerService, 
      useFactory: loggerFactory,
      deps: [ConsoleWriter]
    }
  ],
  bootstrap: [AppComponent]
})
```

[01:43] We specify here the `ConsoleWriter`. What Angular does here is basically takes the number or arguments, and here we can specify an array of dependencies. Where it could be more, which should be passed into that factory function.

[01:58] Those are resolved based on other definitions of providers, which could also come from other modules, as well. If we save this and we now click to the log, we see that we get the log message printed out by our `ConsoleWriter`.