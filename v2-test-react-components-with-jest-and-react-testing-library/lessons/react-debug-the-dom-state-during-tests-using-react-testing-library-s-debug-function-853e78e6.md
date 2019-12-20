Instructor: [00:01] One of the things that I really love about DOM testing library and React testing library are the error messages that you get when a query fails.

[00:07] Here, it's saying, "Hey, I couldn't find a label with the text of favrite number, and here's the DOM that I'm running this query against." Often when I'm running my test, it would be really nice if I could get a view of what that looks like at any point in time.

[00:20] Let me fix my typo. I'm going to pull in debug. 

#### react-testing-library.js
```js
const {getByLabelText, debug} = render(<FavoriteNumber />)
debug()
```

Debug is going to let me do just that. My tester continues to pass, but I can see what the DOM looks like at this point in time. I can move it down to the bottom of my test and see what it looks like at that point in time.

[00:33] If I want to look at a specific DOM node, then I can pass it as an argument to debug and get only the output for that particular dumb node, `debug(input)`. To do this, we simply bring in the debug method from the object that's returned from calling render, and then we can call debug at any point in time with or without an argument.

[00:51] It defaults to the container where all of our queries are bound to, or it will print out the DOM node that we pass to it, making it much easier to develop our tests. It's not something that I would keep in my code base, so I'm going to get rid of that. It's really just something that you're going to be doing while you're developing your tests.
