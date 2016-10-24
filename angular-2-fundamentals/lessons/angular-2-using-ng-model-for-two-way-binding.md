Now that we have the `message` through in `@Input`, we can actually use `ngModel` on our `<input>` element. That will look like this, `[(ngModel)]` with the square brackets, the parens, and then `ngModel`. This is combining two things we've talked about already where the parens represent an Event, and the square brackets represents pushing values in on Inputs.

**simple-form.component.ts**
``` javascript
@Component({
  selector: 'app-simple-form',
  template: `<div>
{{message}}
<input #myInput type="text" [(ngmodel)]>
<button (click)="onClick($event, myInput.value)">Click Me!</button>
</div>`,
  styles:[]
})
```
You can think of the square brackets and parens in a combination as two-way binding, where if we give it this `message`, when the `message` changes from outside of this `<input>` it will push new value in. When the value changes from inside the `<input>`, it will pass the new value out to this `message`. You can think of the parens as out, and the square brackets as in.

You'll see that once I hit save, that if I change the value of this, I'll delete this and a couple of words, you'll see that the value above it changes as well. So this `{{message}}` and this `message` are staying in sync, because the value of this `<input>` element is changing.

![ngModel binding](../images/angular-2-using-ng-model-for-two-way-binding-ngModel.png)

From the other angle if were to in my constructor do a `setInterval`, and say every...We'll say `this.message` is `Math.random().toString()` every one second, and now I hit save. 

**simple-form.component.ts**
``` javascript
export class SimpleFormComponent implements OnInit {

  @Input() message;

  onClick(event, value) {
    console.log(event);
    console.log(value);
  }

  constructor() {
    setInterval(()=> this.message = Math.random().toString(), 1000);
  }

  ngOnInit(){ }
}
```
You'll see that every second these values are changing and being pushed in, but if I type things inside the Input it's pushing them out.

Changing this `message` from outside of the `<input>` updates it, changing the message from inside of the `<input>` updates it out. That's what these represent around the `ngModel`.