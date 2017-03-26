In order to update the is complete status on a todo we need to be able to do a couple of things. First we need to get the existing todo from an array of todos. Then we need to toggle the is complete property on that todo and finally we need to update the list to reflect the change todo item. When we do this we also need to be sure to avoid mutating the existing todo object with the original array.

I've added some prewritten unit tests for the functions we need to create. Let's start with finding a todo by ID. This test starts with an array of todo objects followed by an object that matches the second item in the array. We get a result by calling find by ID with an ID of two and the array of todos as input. Finally, the expectation states that our result should match the expected object.

Before we run the test I'm going to update the four tests so they're skipped. This will allow us to focus on one test at a time. In gist you can follow the test keyword with .skip to keep those tests from being executed. I'll select these four tests and follow them each with .skip and save the file. Now we should be good to go.

I'll jump over to the terminal, run npm test, and we'll see that we have one failing test and four skip test. If I scroll up we can see that we have a reference error, "Find by ID is not defined." It's going to our source code and we'll import find by ID and we'll save it. When our test run again we'll see that this time we have type error that find by ID is not a function.

We need to go into todo helpers and we need to export a constant find by ID. For now we'll just set that to be a nohup. When our test run again now we're expecting an object and we're receiving undefined. We need to fill out our find by ID function. If we look at our test we'll see that find by ID here is being called with the ID, followed by the list that we want to find the item in.

We can setup our arguments here with ID and we'll refer to the ID as list, and for the implementation we can refer to list.find just using the build in array method. Then we compare a set of predicate where it's going to receive the item from the list and we're going to compare item.id and make sure it equals the passed in ID.

When we save that our test will run again and now our test is passing. Now that we have find by ID to find let's jump back into our test file. We'll get that out of the way. I'm going to take the skip off of this first test for toggle todo. We'll see that we have two objects -- our starting todo and our expected todo -- and the only difference between them is the is complete flag that goes from false to true.

We do that by calling toggle todo and passing in our starting todo object. This doesn't exist yet, so I'm going to come up to the top of the file here and I'm going to import toggle todo from todo helpers. I'll save that and our test will still fail, because type error, toggle todo is not a function.

I can come over here and just like we did before I'll export const toggle todo and just to get the test a little further along I'll set it to a nohup. I'm not getting my expected results.

As we saw from the way toggle todo is being used in our test, it takes in a single argument that represents a todo object. We're going to update this to take in a todo object, and then from my result I'm going to return an object. To get that object, I'm going to spread the passed in todos properties into this new object.

I'm going to overwrite the is complete with the opposite of the existing todos is complete property. When I save that, our test will pass.

The other thing we want to ensure is that by doing this we don't mutate the passed in todo but we get a brand new object back. I'm going to jump back into the test file and I'm going to unskip the second test for toggle todo. We'll take a look at it and we'll see that all we're doing here is making sure that whatever we get back from toggle todo is not a reference to the same object that was passed in.

If I save this our test suit will run again and we'll see that we have one more passing test. With toggle todo defined let's get these tests out of the way. I'm going to remove the skip from both of these and we'll take a look at these tests.

Update todo should update an item by ID is going to take in a starting list in updated todo where we are changing the is complete flag from false to true.

We expect to get our list back with the update reflected. We do that by calling update todo with our list followed by the updated item to put back into that list and then we set our expectation.

Our final test is just making sure that when we do this we're not mutating the original array.

We have our starts todos, our updated todo, and our expectation is just making sure that whatever we get back isn't a reference to the original array. I'm going to jump up to the top of this file and I'm going to import our update todo function from todo helpers. We'll save that.

Our test will run again. Of course we're going to fail because I don't actually have that type to find.

We'll jump back over todo helpers and we'll export const update todo. Now we just need to implant this, so we can get back our expected result. Let's start by defining our arguments.

First argument we're going to take in is our list of todos, followed by the item that we want to update the list with. We want to make sure we replace the existing item with the updated item that corresponds to that ID.

We're going to start by finding that item in our list and figuring out where it is. We're going to define the updated index and we're going to set that to equal a call to list.find index with a predicate that's going to take in list items and tell us if item.id matches our updated items ID and now that we have our index let's define a return array.

We're going to return a new array and I'm going to take the existing list with a call to slice starting at zero up to the updated index. That's going to take all the items before the item that we want to update and spread them out into this array followed by the updated item, followed by whatever is left of the array.

We're going to get that again using the spread operator or the call to list.slice. This time we're going to slice from the updated index plus one. That's going to take from whatever that point is to the end of the array. We'll save this. Our test will run and now all of our test should be passing.