When the data is fetched asynchronously, we want to display some kind of visual cue to the user. I'm adding a condition to the render function that says that if we're fetching data, and we have no to-dos to show, we're going to return something like a loading indicator from the render function.

I will grab to-dos and is fetching from the props. In fact, to-dos is the only extra prop we need to pass to the list. Instead of using the spread operator, I'll just pass the to-dos directly. My maps data props function already calculates the visible to-dos, and it includes the to-dos in the props.

I need to do something similar for is fetching. Get is fetching accepts the current state of the app, and the filter for which we want to check if the to-dos are being fetched. It is declared alongside other top level selectors in the top level reducer file.

I am now switching to the root reducer file to add another exported named function, which is the new selector called get is fetching. It accepts the state of the app and the filter as our commands. It delegates to another selector to find and create list that gets whether this list is currently being fetched.

I am passing the state of this list, which I get from state list by filter. I am using a selector that I have not created yet. I will go to createthis.js and add it. First, I need to modify the state shape of the list. Rather than assume the state is the array of IDs, I will assume it is an object that contains this array as a property.

Now I can add another selector called get is fetching that reads another property from the state object, which is a built-in flag called is fetching. I want my reducer to keep track of both of these fields. Rather than complicate the existing reducer, I will rename it to IDs, because it manages just the IDs.

I will create a separate reducer called is fetching that manages just the state of the fetching flag. Its initial state is false, and it looks just like any other reducer. I am now scrolling up to add an import for the combine reducers utility from Redux.

Now I can return a combined reducer from create list that manages both IDs and is fetching. The is fetching reducer implementation is very simple. We switch on the action type, and if it is request to-dos, we'll return true because we started fetching.

If it's received to-dos, we'll return false because the operation has finished. For any unknown action, we'll return the current state. Now I'm scrolling back up to the IDs reducer, and I will copy the condition that tells it to ignore any actions with a filter that does not match the filter argument to create list.

Finally, I'm handling the request to-dos action, but I'm not dispatching it anywhere. In the file where I define the action creators, I am adding a new exported function called request to-dos that takes the filter and returns an action object describing the request to-dos action with the corresponding filter.

Every exported action creator from this file will be available on the props of the visible to-do list component. I can just structure request to-dos from the props, and I can call it right before starting the asynchronous operation with fetch to-dos.

If I run the app now, I will see not one, but two actions, request to-dos, and receive to-dos. If I look at the state after the request to-dos action, I will see that inside the all list state, is fetching flag is set to true.

When the corresponding receive to-dos action fires, the flag gets reset back to false, and the IDs are not an empty array anymore. As I navigate the tabs for the first time, I see the loading indicator show up. However, if I visit them again, I already have cached data. I prefer to show that to a loading indicator.

Let's recap. In the component, I dispatch an action called request to-dos before fetching them. The request to-dos action creator returns an action object with a type of request to-dos, and the filter that I passed.

I handle the request to-dos action inside is fetching reducer, where it returns true if we began fetching. As soon as we receive the to-dos, it returns false, so that the loading indicator can reset. The is fetching reducer is combined with the IDs reducer into a single reducer that is returned from create list.

The state shape of the combined reducer contains both IDs and is fetching. We can use these fields in the corresponding selectors. State is fetching is returned by get is fetching selector inside create list. Every list is independent.

The top level selector calls it with a slice of the state corresponding to the list for the given filter. The top level get is fetching selector is called from the component in maps data props.

Finally, we use the is fetching prop inside the render function of our component to render a loading indicator if we are fetching, and there are no cached to-dos to show.