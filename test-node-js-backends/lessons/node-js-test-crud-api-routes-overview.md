Instructor: [0:01] For this exercise, we're going to be doing some more integration testing for CRUD API Routes -- the Create, Read, Update, and Delete -- for the list item data in our application. This is going to be really similar to our previous exercise except with this one, our `axios` client will need to be authenticated for all of these requests.

[0:19] This will also highlight the value of having a single integration level test for the whole lifecycle of this unit of data, making it a lot easier to write and maintain this test. The test file for this one is in `list-items.exercise.js` under `src\__tests__` right here. Lots of the code that you're going to be testing lives inside of the `list-items-controller` right here.

[0:40] The router that sets this controller up is the `list-items` under the `routes` here. That router is set up in the `start`, under the `src` directory. The emoji is going to tell you all of the routes that you need to be hitting for each one of these requests. You shouldn't have to do any guesswork there. The exercise has been already set up for you to do a lot of the setup that we did in the previous exercise.

[1:03] To get this test going, you'll run `npm t` to start the test. Then we'll hit the `p` key, and we'll do `list-items`. You want the `list-items` under `src/__tests__`, not the `list-items-controller` test. Good luck.
