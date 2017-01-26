Inputs are often used on `@Components`. Let's set up a component we can use in our app. We'll give this a `selector` of `basic`, and its `template` is just going to be a `<div>`. Then `export class` of `BasicComponent`.
#### app.component.ts
``` javascript
@Component({
  selector: 'basic',
  template: `<div>Hi</div>`
})
export class BasicComponent
```

Now just make sure to add this `BasicComponent` to my declarations. 
#### app.module.ts
``` javascript
const imports = [BrowserModule]
const boostrap = [AppComponent]
const declarations = [
  AppComponent,
  FirstDirective,
  BasicComponent
]
```

Then I'll just add a little message of `Hi` in here. In my template, I'll use my `BasicComponent`.
#### app.component.ts
``` javascript
@Component({
  selector: 'app',
  template: `
<basic></basic>
`
})
```

When I hit save now, you'll see we got this tiny little `Hi` I'll make this a little bit bigger. If I wanted to change this `Hi` based on the input in the component, we would say `@Input`, make sure to `import` that, and I'll say `message`, then I can bind this to the `message`. In here, I can say `message` is a string. You see these single quotes inside of the double quotes, so that this is the string. It's a string of `'Something'`.. I'll hit Save.

``` javascript
@Component({
  selector: 'basic',
  template: `<div>{{message}}</div>`
})
export class BasicComponent{
  @Input() message
}

@Component({
  selector: 'app',
  template: `
<basic [message]="'Something'"></basic>
`
})
```

Now we're rendering out something. This string is `Something`. It's being passed into the message in the input and rendered out here. 
#### Browser output
``` 
Something 
``` 
We can actually use inputs on directives as well. If I were to try and say, instead of `message`, that this was `first`. I'd hit Save. This will error out, saying that it can't bind the `first` since it's not a known property.

``` javascript
@Component({
  selector: 'app',
  template: `
<basic [first]="'Something'"></basic>
`
})
```

We have to make `first` be an input on `first` before it'll even work. If I'd just say `@Input() first`, then hit Save, that error will go away. 

``` javascript
@Directive({
  selector: '[first]'
})
export class FirstDirective{
  @Input() first
  @HostBinding() innerText = `I'm a directive!`
}
```
Now it's overriding the entire thing in here with `I'm a directive!`, because `first` is here. Now, if I want to take this value, this `Something`, and assign it to this inner text, I need to flip this inner text to a getter or I say, `get InnerText` and then return `this.first`.

``` javascript
export class FirstDirective{
  @Input() first
  @HostBinding() get innerText{
    return this.first
  }
}
```

Just delete that extra code there. Now, I when I hit save, you'll see we're back to `Something` -- I'll delete all of these just so it's not confusing -- where this directive `first` is reading in this value of `Something`, assign it to this `@Input`, and then my `HostBinding` is saying hey, whatever I'm on, change the inner text to this `@Input` so it's on its `BasicComponent`. I could duplicate these and say `Another`, `Third`. Hit Save. 

``` javascrip
@Component({
  selector: 'app',
  template: `
<basic [first]="'Something'"></basic>
<basic [first]="'Another'"></basic>
<basic [first]="'Third'"></basic>
`
})
```

You'll see that each of these values being passed in will override those inner text of each of these components.
#### Browser output
``` 
Something
Another
Third
```