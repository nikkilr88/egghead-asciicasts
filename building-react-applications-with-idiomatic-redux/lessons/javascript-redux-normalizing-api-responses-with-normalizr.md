In the by ID reducer, I currently have to handle different server actions in a different way, because they have different response shape. For example, the fetch to-do success action has a response, which is an array of to-dos.

I have to iterate over them and merge them one by one into the next state. Add to-do success is different. The response for adding a to-do is the to-do itself. I have to merge a single to-do in a different way.

Instead of adding new cases for every new API call, I want to normalize the responses so the response shape is always the same.

I'm running NPM install, save Normalizer, which is a utility library that helps me normalize API responses to have the same shape. I'm creating a new file in the actions directory called "schema.js." I'm importing a schema constructor, and a function called array of from Normalizer.

I will export two schemas from this file. I create a schema for the to-do objects, and specify to-dos as the name of the dictionary in the normalized response. I also create another schema called array of to-dos that corresponds to the responses that contain arrays of to-do objects.

Next, I am opening the file where I define action creators, and I am adding a named import for a function called "normalize" that I import from Normalizer. I also add a namespace import for all the schemas I defined in the schema file.

I'm scrolling down to the fetch to-do success callback, and adding a normalized response log so that I can see what the normalized response looks like. I'm calling the normalize function with the original response as the first argument, and the corresponding schema -- in this case, array of to-dos -- as the second argument.

Next, I'm scrolling down to the add to-do success handler. When the response comes back, I want to log the normalized response by calling the normalize function with the original response as the first argument, and the corresponding schema -- in this case, a schema for a single to-do -- as the second argument.

If I run the app now and look at the response in the action, I will see an array of to-do objects, however, a normalized response for fetch to-do success action looks differently. It contains two fields called entities and result.

Entities contains a normalized dictionary called "to-dos" that contains every to-do in the response by its ID. Normalizer found these to-do objects in the response by following the array of to-dos schema. Conveniently, they are indexed by IDs, so they will be easy to merge into the lookup table.

The second field is the result. It's an array of to-do IDs. They are in the same order as the to-dos in the original response array. However, Normalizer replaced each to-do with its ID, and moved every to-do into the to-dos dictionary.

Normalizer can do this for any API response shape. For example, let's add a to-do. The original action response object will be the to-do itself, as returned by the server. The normalized response will contain two fields, just like before, entities and result.

Like before, the entities object will contain the to-dos dictionary, this time with a single item. In the result field, we will see just the ID of the to-do, because the original response is just the single to-do, and Normalizer replaced it with its ID in the result field.

I will now change the action creator so that they pass the normalized response in the response field, instead of the original response.

As a reminder, we have to pass the schema as the second argument, and its schema to-do for the single to-do, and its schema array of to-dos for the array of to-do objects in the response.

Now, I can open the by ID reducer, and I can delete these special cases, because the response shape is going to be very similar. Rather than switch by action type, I will check if the action has a response object on it.

I will return a new version of the lookup table that contains all existing entries, as well as any entries inside entities to-dos in the normalized response. For other actions, I will return the lookup table as it is.

Now, I need to switch to the IDs reducer to amend it to understand the new action response shape. For fetched to-dos, it used to be an array of to-dos. For add to-do, it used to be the to-do itself.

Now, the action response has a result filled, which is already an array of IDs, in case of fetch this success, and our single ID of the fetched to-do in case of add to-do success.

I can run the app now, and inspect the action response. I can see that, for fetched to-do success, the response contains the entities which contains the to-dos by their IDs, and the result is an array of IDs in the same order as they were in the original response.

I can also add a to-do, and the action response will also contain the entities and the result, where the entities contains the to-dos by their IDs, in this case, a single to-do. The result is the ID of the added to-do.

Let's recap how to work with normalized responses. Fetch to-do success original response contained an array of to-dos. Normalizer replaces them with an array of their IDs in the result field. The add to-do success original response was a single to-do, so action response result becomes its ID.

Inside the by ID reducer, I removed all the special cases for different action types. I just check if the action contains a normalized response. The entities field will contain different dictionaries. In this example, I only have a single to-dos dictionary, which corresponds to the objects with a to-do schema.

I use the object spread operator to merge the old lookup table and the newly-fetched to-dos. The name of the dictionary inside entities corresponds to the string argument that I passed to the schema constructor when I created the to-do schema.

I have two kinds of API responses in my app, a single to-do, and an array of to-dos. I use the array all function from Normalizer to create a corresponding array schema.

Finally, in the action creators, I call the normalize function to get the normalized response from the original response, and the schema that I know corresponds to this API endpoint.

I know that the original response from fetch to-dos is an array of to-do objects. I pass the array of to-dos schema. The add to-do response shape is a single to-do item. I pass the schema for a single to-do to the normalize function that I import from Normalizer.