In this example, we have our app wrapper and then we have the elements that make up this user card. Now when we look at this, there are two pieces of potentially dynamic data here, the image source and the user name.

####App.js
```html
export function App() {
	return (
		<div class="app">
			<div class="user">
				<figure class="user__image">
					<img src="https://avatars0.githubusercontent.com/u/1643522?v=3" />
				</figure>
				<p class="user__name">Shane Osbourne</p>
			</div>
		</div>
	);
}
```

Everything else about this user information here can be considered to be static content. This makes it a prime candidate for being extracted out into a functional component. To do that, we'll copy this code,

```html
<div class="user">
	<figure class="user__image">
		<img src="https://avatars0.githubusercontent.com/u/1643522?v=3" />
	</figure>
	<p class="user__name">Shane Osbourne</p>
</div>
```

and we'll create a new file called `User.js`. We'll import 'h' from preact as we do on any file that contains JSX, and then we can export function called `User`. This will return the JSX we copied from the other file. Then we'll also export as the default. 

####User.js
```html
import { h } from 'preact';

export function User() {
	return (
		<div class="user">
			<figure class="user__image">
				<img src="https://avatars0.githubusercontent.com/u/1643522?v=3" />
			</figure>
			<p class="user__name">Shane Osbourne</p>
		</div>
	);
}

export default User;
```

Now back in our app file, we can remove this,

####App.js
```html
<div class="user">
	<figure class="user__image">
		<img src="https://avatars0.githubusercontent.com/u/1643522?v=3" />
	</figure>
	<p class="user__name">Shane Osbourne</p>
</div>
```

completely, and use the user component. We need to import `User`, and when we save, you can see that we still get the same result.

![The Result](../images/react-define-functional-components-in-preact.png)

Now, let's tackle those two pieces of potentially dynamic data, the image source and the user name. If we go back to the user component, where we were providing a hard-coded string here, 

###User.js
```html
<img src="https://avatars0.githubusercontent.com/u/1643522?v=3" />
```

we can remove this url including the double quotes, and we can instead provide an expression.

```html
<img src={} />
```

Functional components receive props argument, and then we can decide what we want to call this field. Perhaps we'll say `props.image`. We can do the same thing for the name, so get rid of this text, two curlies, and that's a `props.name`.

```html
<img src={props.image} />

...

<p class="user__name"> {props.name}</p>
```

OK, so now we have a user component that accepts some properties and returns some JSX. This is why we call it a functional component, it doesn't maintain any internal state, it just takes props in and gives JSX back.

Now we need to actually pass these properties in when we use this component. Back in the app file, you pass them in like any other HTML attribute. We can say `image` is equal to, paste that image in there, and `name` is equal to `James Osborne`. 

####App.js
```html
<User image="https://avatars0.githubusercontent.com/u/1643522?v=3",
	name: 'Shane Osbourne' />
	```

Let's break this onto multiple lines, and as you can see, we now have the same results.

Now we have this reusable user component that encapsulates everything it needs to do with styling, or class names, or how it uses data, all within its own component and it allows similar components pass in this data. The benefits of splitting your code up into functional components like this becomes really clear when you need to reuse them.

Let's say we wanted to add a second user, then we can just change the image source and the name, 

```html
<User image="https://avatars0.githubusercontent.com/u/1643522?v=3",
      name: "Shane Osbourne" />
<User image="https://avatars2.githubusercontent.com/u/170270?v=3",
      name: "Sindre Sorhus" />
```

and there you see we've managed to reuse all of the code inside this component and just provide the dynamic parts when we actually call it.

![The Result with Two Users](../images/two-users-react-define-functional-components-in-preact.png)

In reality you probably won't be hard-coding these strings anyway, but rather you'll have some sort of data source that has these values in it. Let's say we have this array of users where I've just extracted the image and the name from each of these. 

```javascript
const users = [
  {
    image: 'https://avatars0.githubusercontent.com/u/1643522?v=3',
    name: 'Shane Osbourne'
  },
  {
    image: 'https://avatars2.githubusercontent.com/u/170270?v=3',
    name: 'Sindre Sorhus'
  }
]
```

Now we want to provide a user component for each user. The way we do that is that we map over that data.

We could say `users.map` and we'll have access to each user, and we can return from this that user component then if the property names of your data match up with the properties inside this component, you could just spread the `user` into the component and then add a `key`. We'll use the `user.name`, save that, 

```html
export function App() {
  return (
    <div class="app">
      {users.map(user => <User {...user} key={user.name}/>)}
    </div>
  );
}
```

and we get the same result.

![The Result](../images/two-users-react-define-functional-components-in-preact.png)

Now no matter how many items we had in this array, everything will still work. Just for clarity, this here,

```html
...
	{users.map(user => <User {...user} key={user.name}/>)}
...
```	

is exactly the same as providing user.image there and name = user.name.

```html
...
	<User image={user.image} name={user.name} key={user.name}/>
...
```

Finally, we use this key attribute which is something that preact uses internally to keep track of the elements that it's rendering, so we can just set it to something that's unique to this user object.