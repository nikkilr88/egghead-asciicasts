We'll start by adding `messages` to our `MailService`, and this will just be an array. One message can be, `You're now friends with John.` Next one can be, `John liked your tweet.` The last one will be, `You'll never believe what John said.`

**mail.service.ts**
``` javascript
@Injectable()
export class MailService {

  messages = [
    `You're now friends with John.`,
    `John liked your tweet.`,
    `You'll never believe what John said.`
  ]

  constructor() { }
}
```
With these `messages` in our `MailService`, I can hop over to my `app.component`. I'm going to delete everything in this `template`, and I'll even clear up some of this stuff as well. We don't need that. We don't need that. All we're doing is injecting this `mail` service.

**app.component.ts**
``` javascript
@Component({
  selector: 'app-root',
  template: ``
})
export class AppComponent {

  constructor(
    @Inject('mail') private mail
  ){}
}
```
I'm going to create an unordered list with list elements inside of it. We want to create a list element for each `message` that we have. To do that we'll add `*ngFor`. Make sure it's an uppercase F. Then inside of the value here we'll say `let message of mail.messages`. `mail` is the `mail` service. `message` is the property we created here.

**app.component.ts**
``` javascript
template: `<div>
<ul>
  <li *ngFor="let message of mail.messages">
    {{message}}
  </li>
</ul>

</div>`
``` 
Now this `message` variable that we're creating for each of these messages can be used inside of the list element like so. I'll just say `{{message}}` inside of the curly braces, and I'll hit save. You'll see each of these messages show up as a list element inside of this unordered list.

You might be wondering about this asterisk here. That just represents that this list element is considered a `template` that can be regenerated and reused based on the information passed in. `ngFor` is a **structural directive**. It will take this list element, use it as a `template`, and do something with it. In this case this `ngFor` directive is saying, "Hey, take all these messages and then create one for each message. Then let us use this message variable inside of it."