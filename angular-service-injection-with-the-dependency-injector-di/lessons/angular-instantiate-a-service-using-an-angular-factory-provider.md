Instructor: [00:00] Consider our `LoggerService` here, which we define in this ECMAScript class, which we use for logging out some messages. It's a bit more complicated.

#### logger.service.ts
```javascript
@Injectable()
export class LoggerService {
  constructor(private isEnabled: boolean) {}

  log(msg: string) {
    if (this.isEnabled) {
      console.log(`Logger: ${msg}`);
    }
  }
}
```

[00:09] For instance, it takes some configuration data, which could be `isEnabled`, which is a `Boolean`, and which controls whether the logger should print out messages or not. If we save that, you can immediately see that our dependency injector complains. He says, `There's no provider defined for Boolean`, so he basically is not able to resolve this constructor argument here.

[00:35] That's exactly where we can use a factory function. The factory function is defined as follows. First of all, we define that provider where we say, whenever there is the `LoggerService` injected to some constructor, `useFactory`. The factory -- let's call it `loggerFactory` -- is the function which we define up here.

#### app.module.ts
```
@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [BrowserModule],
  providers: [{ provide: LoggerService, useFactory: loggerFactory }],
  bootstrap: [AppComponent]
})
```

[01:02] This is a simple function, which then constructs our `LoggerService` here manually. As you can see here, we now have full control over how that object is being created. In fact, this way it still works. 

```javascript
const loggerFactory = () => {
  return new LoggerService(true);
};
```

If we switch this to `false`, then you can see that, if we click the button, it does not work anymore.

```javascript
const loggerFactory = () => {
  return new LoggerService(false);
};
```

[01:23] Suppose this variable here is not something static, but it comes from some environment configuration. It makes already a lot more sense.