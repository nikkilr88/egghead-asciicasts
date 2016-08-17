In the current implementation, we keep all these in memory at once. We have an array of all IDs ever and we get the array of to-dos that we can filter according to the filter passed from React router.

However, this only works correctly if all the data from the server is already available in the client, which is usually not the case with applications that fetch something. If we have thousands of to dos on the server, it would be impractical to fetch them all and filter them on the client.

Rather than keep on big list of IDs, we'll keep a list of IDs for every tab so that they can be stored separately and filled according with the actions with the fetch data on the corresponding tab.

I'm removing the get alt to-do selector because we won't have access to all to dos. We also don't need to filter on the client anymore because we will use the list of to-dos provided by the server.

Rather than read from state all IDs, I will read the IDs from state IDs by filter. Then I can use the same technique as before and map the IDs to state by ID look up table to get the actual to-dos.

My selector now expects by IDs and IDs by filter to be part of the combined state of the to-dos reducer. The to-dos reducer used to combine the look of table and a list of all IDs which I'm replacing with the list of IDs by filter. IDs by filter is a new combined reducer that I'm creating.

It combines a separate list of IDs for every filter. So it's all IDs for the all filter, active IDs for active filter, and completed IDs for the completed filter.

The existing all IDs reducer manages an array of IDs, but it handles at to-do action which we don't want to handle anymore, at least not yet, because for now we want to teach it to respond to the data fetched from the server.

To handle the receive to-dos action, we want to return a new array of to-dos that we get from the server response. I map the response which is an array of to-dos to a function that just selects an ID from the to-do. We decided to keep all IDs separate from active IDs and completed IDs, so they are fetched completely independently.

I'm adding a new reducer called active IDs that also keeps track of an array of IDs, but for to-dos on the active tab. If we think about which actions it needs to handle, we'll realize that it also needs to handle received to-dos action in exactly the same way as all the IDs before it. Both active IDs and all IDs need to return a new state when the received to-dos action fires.

However, we need to have a way of telling which ID array we should update.

If you recall the receive to-dos action, you might remember that we passed the filter as part of the action. This lets me compare the filter inside the action with a filter that corresponds to the reducer. The all IDs reducer is only interested in the actions with the all filter.

Similarly, the active IDs reducer only wants to replace the state when the filter in the action is equal to active. Finally, I can copy and paste my active IDs reducer to get a stub for my completed IDs reducer. I'll just place the word active with the word completed.

Now that I wrote all the reducers managing the IDs, I need to update the by ID reducer to actually handle the new to-dos from the response. I'm removing the existing cases because the data does not live locally anymore. Instead, I'll handle the received to-do action just like I do in the other reducers.

I'm creating a shallow copy of the state object which corresponds to the lookup table. For every to do object in the response, I want to take it and put it into the next version of the lookup table. I'm replacing whatever is in the next state by to-do ID with the new to-do I just fetched.

Finally, I can return the next version of the lookup table from my reducer. Normally the assignment operation is a mutation. However it's fine because next state is a shallow copy, and we're only assigning one level deep. So we're not modifying any of the original state objects. The function itself stays pure.

As the last step, I can remove the existing to-do reducer because the logic for adding and toggling to-dos will be implemented as API calls to the server in the future lessons.

Let's run the app and inspect how the state changes. Before the action, the original state object contains the to-dos object with an empty lookup table and empty arrays of IDs for every filter. The action object contains the filter and the server response corresponding to this filter with to-do objects inside of it.

After handling the action, the to-dos object contains the updated lookup table that has every to-do by its ID, as well as an updated list of IDs by filter where we only have fetched the old to-dos so far, so we have the IDs for all to-dos, but the other filters are amped in.

If I change the tab now, it will make another API request and store these IDs separately from the all IDs. Inside the action object, the filter is active now. The response contains only one active to-do.

Inside the next state object, the to-dos by ID lookup table is essentially the same because we have not received any new to-dos. However, the IDs by filter object now contains an array of IDs for all filter and a separate array of IDs for the active filter.

We have filter and logic to the server, so switching a tab for the first time will take some time for the answers to load. However the next switch is filled instantaneous because we have cached the array of the fetched IDs. Even though we refresh them by fetching them again, the UI can already render the previous version of the array.

Let's recap how we updated this state in response to the action with the fetch data. The state shape of the by ID reducer stayed the same. It's still a mapping of to-do IDs to the to-do objects. However, now it handles the received to-dos action when they are fetched from the server.

It creates a shallow copy of the current mapping so that it can efficiently reassign its fellows inside a loop. It is a shallow copy. The assignment is only one level deep. So while this is limitation, it does not modify any of the original state objects. So the reducer function stays pure.

The action response field is an array of to-dos fetched from the server, so they get merged into the lookup table managed by by ID.

Next, I created a separate reducer for every collection of IDs. They all handle the received to-dos action, but to make sure that they handle only the IDs they're interested in, we check the filter.

The action response field is an array of to-dos, so we map them to their IDs. The reducers handling to-do IDs handle received to-dos action in the same way but check for different filters. We have the all IDs for the all filter, the active IDs reducer for the active filter, and the completed IDs reducer for the completed filter.

Finally, I'm using combine reducers to combine all of them into single IDs by filter reducer. I use the filter values as the keys so that the corresponding state appears under those keys.

For example, to read the IDs corresponding to all filter, I can read state IDs by filter and pass all as a dynamic key. In order for IDs by filter to be in the state, I combine the to-dos reducer from by ID and IDs by filter combined reducer.

This last my get visible to-do selector read the IDs for the corresponding filter and map them to the lookup table to get an array of to-do objects that we can return to the components.