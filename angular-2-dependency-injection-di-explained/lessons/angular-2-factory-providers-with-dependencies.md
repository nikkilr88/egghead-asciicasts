A factory provider in Angular 2 often has its own dependencies to construct an object. On this component, we have a factory provider that creates an instance of `LogDebugger` without the need of additional dependencies, except the `Boolean` value that we can add straight to the constructor.

**list/list.component.ts**
``` javascript
providers: [
  DataService,
  {
    provide: LogDebugger,
    useFactory: () => {
      return new LogDebugger(true);
    }
  }
]
```
Let's say we want to swap out this console log code in our `LogDebugger` with a reusable service, so we don't have to make changes if needed at several different places in our application where this function is called.

We add a new file in source app and call it `console.service.ts`, in which we create a service class `ConsoleService`. It has a method `log` that simply takes a `message` and calls `console.log` with it.

**app/console.service.ts**
``` javascript
export class ConsoleService {
  log(message) {
    console.log(message);
  }
}
```
Next we go back to our `LogDebugger` and import `ConsoleService`. 

**app/log-debugger.service.ts**
``` javascript
import { ConsoleService } from './console.service';
```
Now we want to make it a dependency of `LogDebugger`, so we add a new constructor parameter `consoleService` of type `ConsoleService`, and make sure it's used in the `debug` method instead. 

**app/log-debugger.service.ts**
``` javascript
export class LogDebugger {
  constructor(private consoleService, private enabled: boolean) {}

  debug(message) {
    if (this.enabled) {
      this.consoleService.log(`DEBUG: ${message}`);
    }
  }
}
```
We now go back to our `ListComponent` and import `ConsoleService` here as well. Next, we add a provider for `ConsoleService`.

**list/list.component.ts**
``` javascript
import { ConsoleService } from '../console.service'

@Component({
  moduleID: module.id,
  selector: 'list-component',
  template: ` ... `,
  providers: [
    DataService,
    ConsoleService,
    {
      provide: LogDebugger,
      useFactory: () => {
        return new LogDebugger(consoleService, true);
      }
    }
  ]
})
```
If we take a look at the factory provider for `LogDebugger` now, we realize that the call site of `LogDebugger` constructor doesn't match the constructor signature anymore, because `LogDebugger` now asks for a `ConsoleService` dependency.

To get an instance of `ConsoleService` in the factory function, we can add a property `deps` to the provider configuration. Deps is a list of provider tokens that map to the dependencies we want to inject. In our case, we want to inject an instance of `ConsoleService`. All we have to do is to add a token for `ConsoleService`.

**list/list.component.ts**
``` javascript
providers: [
    DataService,
    ConsoleService,
    {
      provide: LogDebugger,
      useFactory: () => {
        return new LogDebugger(consoleService, true);
      },
      deps: [ConsoleService]
    }
  ]
```
The cool thing is that all dependencies which are declared through their tokens on the `deps` property will now be injected into our factory function in the same order.

In other words, since we've added the `ConsoleService` token to deps, we now get an instance of `ConsoleService`, which we can then pass to the `LogDebugger` construction accordingly. We save the file, and see that we get the same output as before, but now `ConsoleService` is used to log the message.

**Browser Output**
``` 
DEBUG: Getting Items...
```
To wrap it up, we add a provider for `ConsoleService`, so it can be constructed when we asked for it here in the `deps` property for our factory function, which then gets the actual instance injected, so we can pass it to our `LogDebugger`'s constructor.