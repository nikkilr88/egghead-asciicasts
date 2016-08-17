Sometimes API requests fail, and I will simulate this by throwing inside the fake API client so that it returns a reject promise. If I run the app the loading indicator gets stuck because isFetch and flag get set to two, but there is no corresponding receive todos action to set it to falls back again.

To fix this, I will start with the action creators file. First of all, I'll do a little cleanup. The request todos action is never used outside of fetch todos so I want to embed the object literal right inside fetch todos for clarity.

I will do the same for receive todos. I will copy the object literal for received todos action and paste it where I dispatch it inside fetch todos so it's easier to see the flow of fetch todos action. I want to tweak the indentation a little bit to prepare for adding the second argument to promise.then method, the rejection handler.

Now with fetch todos action creator dispatches quite a bit of actions, I want to rename them to a consistent name in scheme such as fetch todos request, for request in the todos, fetch todo success, for successful fetch in the todos and fetch todo failure for failing to fetch the todos.

I will pass two additional pieces of data, the filter and the error message, that I get the reading the error message field if specified or something went wrong as a fallback. The fetch todos action creator now handles all the cases.

I can also remove the old action creators that I have aligned into it. If I change the action types, I also need to change the corresponding reducers so I'm opening the IDs reducer and rather than handle receive todos it now needs to handle fetch todos success.

I also need to change the isFetch in reducer. I'm renaming the request todos the "fetch todos request" and receive todos "the fetch todos success." I also want to handle fetch todos failure and return of holds so that the loading indicator doesn't get stuck.

The last reducer I need to change is by ID, and I just replace receive todos with fetch todo success. If I run the app now the loading indicator does not get stuck, because a corresponding failure action fires and so isFetching gets reset back to false again.

Let's display the error to the user. I have created a new file where I import react. I'm declaring a new functional status component called fetch error that takes the message as a prop, which is a string, and on retry as a prop, which is a function.

The render deep will contain the children, an error saying that something bad happened including the message that is passed in the props, and a button that when clicked will invoke the on retry callback prop so that the user can retry fetching the data.

I am exporting this component as a default export from fetch error, and I'm going to the visible todo list where I want to use it. I'm adding fetch error as an import to the visible todo list, and I'm scrolling down to the render method.

I will need the error message which I'm de-structuring from the props of visible todo list component, and inside the render method I will add another condition saying that if we have an error message in our props and we have no todos to display then I'm going to return the fetch error component.

The fetch error component itself wants a message prop which I can pass the error message prop I just de-structured and an on retry callback prop for which I will pass an error function that calls this fetch data to restart the data fetching process.

In order to get the error message into the props I'll need to scroll down to my maps data props implementation and put it there. I will use the same pattern as I currently do with isFetching, and I will get the error message prop by calling a selector called get error message passing the state of the app and the filter.

The get error message selector does not exist yet so I need to scroll up to where I import the selectors from the root reducers file, and I will add a get error message alongside get isFetching. Inside the root reducers file I'm copy/paste in the get isFetching selector, and I'm changing the name to get error message. It will also delegate to a selector with a same name defined in the create List.js.

Inside create List.js, I'm adding a new exported selector called get error message that takes the state of the list and returns a property called error message. Finally, I need to add a reducer managing the error message field which I will add to the combined reducer later.

I'm declaring a new reducer called error message with the initial state of now. A reducer cannot have undefined initial state so I have to make its absence explicit. Like in the other reducers in this file, I want to skip any actions with the filter that doesn't match the filter specified as an argument to create list.

When the filter matches, I want to handle a few actions. I would like to display an error message whenever I get a failure so I handle a fetch todos failure by returning the message embedded the action.

If the user retries a request I want to clear the error message so I handle a fetch this request and fetch this success by returning null. Finally, for any other action, I'll just return the current state. The error message reducer needs to be added to the combined reducer for the list so that its state becomes available on the list state object.

Now I will change my API layer so it doesn't throw every time. This way I'll get a chance to test how well the retry button works. If I run the app now, I can see the failure action being omitted with the corresponding message.

Thanks to the new reducer, this message will now make its way into the next state inside list by filter all error message and so the component can display it. If I press the retry button, the request action will clear the error message and then the success action will populate the list of todos.

Let's recap how we handle errors for every list independently. Inside the fake API client, I randomly throw an error so fetch reduce returns a rejected promise once in a while. Having separate action creators for request success and failure cases seemed like overkill. I in-lined the corresponding action objects right inside the [inaudible 7:34] action creator.

I also renamed them to fetch this request, fetch todo success, and I added a new fetch todos failure action so that we can reset the loading indicator and display the error message.

I am passing the rejection handler as a second argument to the promise.then method. If the promise returned by the API gets rejected, this function will be called with the error as the argument.

You might have seen a different way of handling promise errors in some examples where only one argument is passed and then you call catch on the resulting promise. The downside of this approach is if one of your reducers or describe components throws while handling this action you'll get into the sketch block and so you'll display an internal error message to the user.

To avoid this error, I recommend that you don't use catch in this scenario and just pass the second argument so it catches only the errors from the underlying API promise. The error object usually comes with a message that we can wrap or display directly to the user with a fallback.

We make it available to the reducers as the message field on the action object. I renamed the action types so I also needed to update the reducer inside by ID js and the reducers inside create this js to use the new names.

We only want to update the IDs on a successful fetch. However, we want to update the indicator in all three cases. In particular, I reset the loading indicator both on success and on failure. I also added a new reducer that keeps track of the error message for the given tab.

When the request fails, its state becomes the message from the action. But if it succeeds or if a new request starts, it is reset to null. Like in other reducers in this file, we are only handling actions that have the same filter as the filter this list was created with.

The return combined reducer now manages both isFetching and the currently displayed error message. This lets me add a new selected call get error message that just reads the error message field from the combined state object.

I'm calling this selector from the top level reducer file, and I'm passing the slice of the state corresponding to the list for the specified filter. The top level get error message selector will be called inside maps state to props of the visible todo list component.

It receives the global state and the current filter as arguments, and the result will be available as error message prop inside the visible todo list components render function.

I'm de-structuring the error message from the props, and if I have an error message and no todo list to show I will render the fetch error component passing the error message and a function that refetches the data as the props.

Finally, I created a new component called fetch error that displays the message from the props and renders a button that lets the user retry the fetch action.