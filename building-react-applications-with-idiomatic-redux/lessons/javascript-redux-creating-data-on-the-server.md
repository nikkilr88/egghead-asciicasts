I added a couple of new functions to the fake API client, in addition to fetch todos, to prepare for this and the next lessons.

The first new fake API endpoint is called add todo. It simulates a network connection, and then it creates a new todo object. It puts the todo with the given text into the fake database, and it returns the todo object, just like rest endpoints normally do.

The second fake API endpoint I added is called toggle todo. It also simulates a network connection, and it finds the corresponding todo in the fake database and flips its completed field, also returning the todo as the response.

In this lesson, we will make the add todo button called the add todo fake API endpoint. I'm opening the file with action creators, I will no longer need the V4 function because the ID generation now occurs on the server, and instead, I will call the API to add the todo.

I'm changing the add todo action creator to be a func action creator, so I'm adding dispatch as a carried argument. The func will call the API add todo endpoint with the given text, and wait for the response to come back.

When the response is available, it will dispatch an action with the type add todo success, and the server response. The newly added todo will be part of the server response, so I need to change the byId reducer to merge it into the lookup table that it manages.

I am adding a new case for the add todo success action. I'm using the object spread operator to create a new version of the lookup table, where under the action response ID key, there is a new todo object that I read from action response.

If I run the app now and add a todo, it will not appear in the list immediately. I can see the add todo success action in the log, and if I inspect the next state, I will see that the byId lookup table now contains all four todos.

However, we have not updated the list by filter, so all still only has three IDs in the list. If I go to another tab, the new todo appears because its ID is now included in the list of fetched IDs, and similarly, if I go back to the previous tab, it appears now because the data has been re-fetched.

The list of IDs for each tab is managed by a reducer defined inside createlist.js. I will change the IDs reducer to handle the add todo success action.

When I receive a confirmation that the todo has been added on the server, I can return a new list of IDs with existing IDs in the beginning, and a newly added ID at the very end. Unlike the other actions, add todo success does not have a filter property on the action object, so our initial check would fail.

I am removing the top level check, and I will replace it with different checks in different cases. I want to replace the fetched IDs if the filter in the action matches the filter of this list. However, I want the newly added todo to appear in every list except the completed filter, because a newly added todo is not completed.

If I run the app now, I can see that if I add a new todo, it appears in the list as soon as add todo success action is dispatched, even though the last time todos were fetched, the new item wasn't there yet.

It will also appear immediately in the active list, before the active todos are even fetched. It will not, however, appear in the completed list because we know that newly added todos are not completed.

If I add a new todo while I'm looking at the completed list, it will not appear there even though the add todo success action has been dispatched, because new todos are not completed. However, if I switch to active or all, I will see it immediately, even before the corresponding list has been fetched.

Let's recap the changes necessary for adding todo asynchronously. We handle fetch todo success only if the action filter matches the filter that the list was created with, and in this case, we replace the fetched list of todos. Otherwise, we just return the current state.

However, to handle add todo success, we want to check if the filter is not completed, because if we add a todo, it will not be completed, and we want it to appear at the end of the all and the active filter lists.

I also updated the byId reducer that manages the lookup table to handle add todo success action. We read the add todo from the action response, and we return a new version of the lookup table that contains it under its ID.

Finally, the add todo action creator is no longer synchronous, and instead, it returns a func that calls add todo API endpoint and dispatches an action with the type add todo success and the response from the server.