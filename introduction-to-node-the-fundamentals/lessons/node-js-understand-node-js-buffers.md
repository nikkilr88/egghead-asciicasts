Many times, the data that you receive is going to be either from a file from the file system or a TCP stream, both of which represent octet streams and can't be natively used by JavaScript. In this lesson, we're going to explore the global buffer object and learn how to use it to convert your incoming data into a usable format.
The raw data is stored in an instance of the buffer class, which is similar to an array of integers but actually corresponds to raw memory outside of the V8 engine. Because this is outside of the V8 engine, a buffer can't be resized.
Let's start once again by entering the node REPL interface, which we get into by typing the node command with no additional arguments. We're just going to read a file off of the hard drive. I've got a file called zork.txt. We're going to provide a callback here.
Then just log that out to the screen. You can see the output here is the actual raw buffer. It's not really useful to us if we wanted to manipulate the contents of that file.
Let's do that one more time. This time, instead of writing it out directly to the screen, we're going to call the toString method. Now when it prints out, you can actually see the text of the file that could actually be in a usable format for us.
There's another way to do this. To illustrate it, we're going to supply the name of our file. This time we're going to provide an optional parameter that specifies the encoding of the characters in that file. Then we move on to our callback.
Now, like in the first example, we're just going to write the data object out to the console. You can see, now we get the benefits of both. Our data has been converted from the buffer into its native text because we specified the encoding when we called the readfile function.

The buffer object also has a byteLength method that will return the actual byte length of a string. If we create a string object here and then just paste in some random text from my clipboard, you can see that my random text actually was the encoded characters for the string "Hello, world." If we do a string.length on that, the result is 12 because there are actually 12 characters in our string.

Now if we take a look at the byte length of that same string, we call the byteLength method. We pass in our string object. Then we specify the encoding. The result comes out to be 12 as well.

There is an easy mistake you can jump to here in assuming that the string length and the buffer byte length are the same. Let's do another quick example here to show how that's not always the case.

We're going to modify the contents of our string object here. This time our string is equal to the text of one-half plus one-quarter is equal to three-quarters. If we do string.length, it comes out to nine because there are nine characters inside of our string here, remembering to include the spaces. If we do our buffer.byteLength, passing in our string object and our code encoding of UTF-8, the result is 12.

The reason is because our fraction characters inside of our string of one-half, one-quarter and three-quarter are actually two bytes in length. The reason the string length and the buffer byte length were the same in our first example is because each of the characters in our string were one byte in length, but that's not always true for the characters that you're going to receive in any encoding outside of the ASCII format.

We'll come back to that in just a second. I'll show you why that's important to distinguish between those two. First, I need to introduce the buffer write method. Let's create a new buffer called "Buff." We're going to create it, and five bytes in length. Then we can write to that using the write method.

Let's write the string "Hello, world" into that buffer. Now if we use our toString method, you can see that the buffer accepted the first five bytes, the word "hello," and then it dropped the rest of our string.

Now you can understand the importance of being able to determine the byte length of your string when writing back to a buffer, because it can mean the difference between writing all of your data back to a buffer or truncating your data and not being able to catch that until later when you have errors in your application.

The write method also has an optional parameter for the offset. If we specify an offset of two here, and then we write out our toString method, you can see that the first two bytes of our buffer were skipped as specified by the offset. It started writing at the third byte.

There is a third optional parameter for the buffer write method as well. If we specify our offset and then the optional length parameter when we write that, you can see that, once again, it's specified by the offset. We skipped the first two bytes and then we wrote one byte, starting at the end of the offset.

The final optional parameter for the write method, after the offset and after the length, is for the encoding, when you can specify the type of encoding for your string. It defaults to UTF-8 if you don't specify anything. You can see, we wrote a single character of Y because we specified an offset of two and a length of one with an encoding of UTF-8.

The buffer object has two different methods for measuring or checking the quality of buffers. There's compare and equals. To see how those work, let's create some buffers here. We'll create a new one with the text contents of "one, two, three, four." We'll create a second one that we're going to fill with "one, two, three," and a third that we'll fill with "one, two, three, four."

Now we can do buff one .compare and compare it to buff two, and we get a one, indicating that those two are not equal. Then if we compare it to three, we get a zero, indicating that they are the same.

We can use the equals method as well. That returns true or false rather than an integer. The .compare method is also useful for sorting buffers. If we have an array that contains buff one and buff two, we can use the array sort method and specify the buffer .compare in there and get the sorted results of that array.

We've been using the .toString method to write our buffers out as a string. There is also a .Sign method that will return your buffer in a properly formatted Jsign object, indicating the type as buffer and then the contents of the buffer object as a data array.

The last method we're going to discuss here is the slice method. Let's create a buffer object, and let's put the string "Hello, world" inside of it. Now let's create a new buffer using the slice method.

It requires two parameters. The first is the offset. Then the second is the length of the new buffer. If we take a look at buff two as a string, you can see we got the first three characters of our original array that we used as the source.

One thing to note about this is it doesn't create a new independent buffer. It's only a memory reference to the source buffer. If we were to do something like a write operation on buff two, we can see that buff two now contains our characters XXX. If we go look at buff one, you can see that the first three characters of our original buffer were replaced because buff two is just a pointer to a specific location in buff one.