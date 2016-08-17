I am changing the toggle todo action creator to be a func action creator, so I'm adding dispatch as a carried argument. I'm calling the toggle todo API endpoint, and waiting for the response to come back.

When the response is available, I will dispatch an action with the type toggle todo success, and the response. However, I will normalize the response first by passing the original response as the first argument, and the todo schema as the second argument.

Now let's run the app. I will clear the console and toggle the todo. The UI updates when the toggle todo success action is dispatched because the action contains a normalized response in which the corresponding todo has a completed field set to true, so the ById reducer merges the new version of the todo into the current state of the lookup table.

This is the benefit of normalizing the API responses. Updates to the entities get merged automatically. I can switch to the completed tab to verify that the server state has indeed been updated.

I will clear the console, and then toggle the todo while I'm on the completed tab. After the toggle todo success action, the corresponding todo in the ById lookup table has been updated, and now has completed set to false. However, it is still visible in the completed list because we have not refetched it, and so its ID is still there.

I can force refetching by going to the active tab, and then going to the completed tab back again, and it will disappear. However, I would prefer if it disappeared immediately, so I'm opening the IDs reducer in createlist.js.

I will add a new case for the toggle todo success action. I will extract the code for this case into a separate function called handle toggle, to which I pass the state and the action.

I'm declaring a handle toggle function above the IDs reducer. It accepts the state and a ray of IDs, and the toggle todo success action.

I'm destructuring the result as the toggled ID and the entities from the normalized response. Next, I am reading the completed value from the todo, which I get by referencing entities todos by the toggled ID.

There are two cases in which I want to remove the todo from the list. The first case is when the completed field is true but the filter is active, so it shouldn't be there, and the other situation is when the completed is false but the filter is completed, so we want it to disappear.

When should remove is true, I want to return a copy of the list that does not contain the ID of the todo that was just toggled, so I filter the list by ID and only leave the ones that have a different ID. Otherwise, I return the original array.

If I run the app now and toggle the todo while I'm on the completed tab, it will disappear right after toggle todo success action, even though we have not refetched the todos since the last time.

Similarly, I can open the active tab and toggle a todo there. It disappears after the toggle todo success action even though the active todos have not been refetched.

Finally, I can open the all tab and toggle the todos back and forth, and since it doesn't have any special logic, they all stay there.

Let's recap how we handle the toggle todo success action. I extracted a function called handle toggle, and it makes sure that the toggle todo is immediately removed from the lists that shouldn't contain it.

I'm reading the ID of the toggle todo from the result field populated by a normalizer. Next, I'm reading the completed field from the updated todo inside the todos dictionary in the normalized response.

I want to remove the todo in two cases, if it's completed but we're looking at the list of active todos, or if it's not completed but we're looking at the list of the completed todos.

The handle toggle function is called from the toggle todo success case inside the IDs reducer. I did not need to change any code inside the ById reducer because any updated todos get merged into the new version of the lookup table automatically.

The only other place I needed to change is the toggle todo action creator. I change it to be a func action creator by adding a carried dispatch argument, and I made it call the toggle todo API endpoint.

When the response is available, it dispatches the toggle todo success action, with the normalized response that I get by calling normalized with the response, and a single todo schema.