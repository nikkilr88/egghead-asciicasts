Instructor: [00:00] We have this app that loads Star Wars characters and planets. We've handled the case where the server responds with an error, **but what if the server responds with an empty array?** It was a successful response, **but there's still nothing to show.** Our UI should do something smarter than just display nothing.

[00:19] Let's **add a couple of new states inside of the successful state**. We'll call them `withData` and `withoutData`. We'll define them here (*inside `successful`*) with `states`. Let's see what this looks like in the Visualizer.

**fetch.ts**
```js
interface FetchStates {
	states: {
		idle: {};
		pending: {};
		successful: {
			states: {
				withData: {};
				withoutData: {}
			}
		}; 
		failed: {}
	}
}

... 

	successful: {
		on: {
			FETCH: 'pending' 
		},
		states: {
			withData: {},
			withoutData: {}
		}
	}

... 
```

[00:37] When we're in the `pending` state and the `fetchData` service returns a done response, **we need to decide at that point whether to transition** to the `withData` state or the `withoutData` state, depending on the value that comes back from the server.

[00:51] **Let's do this by making an array of possible transitions** here and change the target from the first one to `successful.withData`. Now you see our done transition goes directly to `successful.withData`, instead of staying on the successful state.

[01:07] **We can add a second transition.** Now our visualizer shows that we could transition to either `withData` or `withoutData`. **What would actually happen is the first transition would always take place. We need to add something called a condition (**`cond`**) to this transition that will check a** `guard` **called** `hasData`**.**

**[xstate.js.org/viz/](http://xstate.js.org/vix/) (visualization of `fetch.ts`)** 
```js
... 

pending: {
	invoke: {
		src: 'fetchData',
		onDone: [{ target: 'successful.withData', actions: ['setResults'], cond: 'hasData' }. { target: 'successful.withoutData', actions: ['setResults'] }], 
		onError: [{ target: 'failed', actions: ['setMessage'] }]
	}
},

... 
```
[01:30] If `hasData` returns `true`, it'll go to `withData` and if `hasData` returns `false`, it will go to the next transition, which will send us to `withoutData`. We can define the `hasData` `guard` in this second object down here in the `guards` object. `hasData`, it takes a context (`ctx`) and `event` parameter.

[01:52] In our case, we'll just `return true`. When the done event fires, it always goes to `withData`. If we change our `guard` to `return false`, when the done event fires, it always goes to `withoutData`. Let's use this code in our application...

```js
... 

actions: {
	... 
}, 
guards: {
	hasData: (ctx, event) => {
		return true 
	}
}

...
```

[02:09] I've placed it in this array of transitions on the `onDone` event and we'll define the `hasData` guard and we'll return `event.data` and `event.data.length > 0`. Let's update our UI to account for this new state. This state should be `successful.withData` and for `successful.withoutData`, we'll say no data available. When we fetch our data and there's no data available, it will display a message.

**fetch.ts** 
```js
... 

actions: {
	... 
}, 
guards: {
	hasData: (ctx, event) => {
		return event.data && event.data.length > 0;
	}
}

...
```
**App.tsx**
```js
... 

return (
	<div className="App"> 
		<button onClick={() => sendToPeopleMachine({ type: 'FETCH' })}>
			Fetch
		</button>
		{ fetchPeopleState.matches('pending') ? <p>Loading</p> : null }
		{ fetchPeopleState.matches('successful.withData') ? (
			<ul> 
				{fetchPeopleState.context.results &&
					fetchPeopleState.context.results.map((person, index) => (
						<li key={index}>{person.name}</li>
					))}
			</ul>
		 ) : null }
		{ fetchPeopleState.matches('successful.withoutData') ? (
				<p> No data available.</p>
			) : null }
		{ fetchPeopleState.matches('failed') ? <p>{fetchPeopleState.context.message}</p> : null } 
	
... 
```

[02:54] The way we set up the state machine, **the `pending` state has to know about all the sub-states inside of successful and ease to route the appropriate one**. We could rewrite this machine so that the `successful` state is in charge of its own sub-states. **We'll add a third state to** `successful` **called** `unknown`**.**

[03:18] When we create this state, we'll set it up with **a special kind of transition called an automatic or transient transition**. **It's denoted by this empty string**. This automatic transition will be executed as soon as you enter this state and keeping executed every time an event happens if for some reason you stay inside of this state.

**fetch.ts** 
```js
interface FetchStates {
	states: {
		idle: {};
		pending: {};
		successful: {
			states: {
				unknown: {};
				withData: {};
				withoutData: {}
			}
		}; 
		failed: {}
	}
}

... 

	successful: {
		on: {
			FETCH: 'pending' 
		},
		states: {
			unknown: {
				on: {
					'': []
				}
			},
			withData: {},
			withoutData: {}
		}
	}

... 
```

[03:40] Now we can take this logic here and move it into our transient transition. **We can remove `successful.` from these transitions since we're already inside of the successful state**. **We need to tell** `successful` **that its initial state is unknown.**

```js
... 

		states: {
			unknown: {
				on: {
					'': [
						{ 
							target: 'withData',  
							cond: 'hasData' 
						}, 
						{ target: 'withoutData'} 
						]
					}
				},

... 
```

[03:55] `onDone` can set its target directly to `successful` and it still needs the set results action. `setResults` can be removed from these transitions down here. Let's see what this looks like in the visualizer. Now the done event transition directly to `successful`, then the `unknown` state transitions to `withData`, since the has data guard always returns true. If we change this to false, unknown will always transition to `withoutData`.

```js
... 

pending: {
	invoke: {
		src: 'fetchData',
		onDone: { target: 'successful', actions: ['setResults'] }, 
		onError: { target: 'failed', actions: ['setMessage'] }
	}
},

... 
```

[04:27] Both of these state machine designs exhibited the same behavior in the application.