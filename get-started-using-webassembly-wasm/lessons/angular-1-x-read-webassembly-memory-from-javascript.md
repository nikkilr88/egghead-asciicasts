Using functions in **WebAssembly**, we can pass individual numeric valuesz. We're restricted to integers and floats, either 32 bits or 64 bits. The standard [indecipherable 0:09] example, has a function that returns a number. When we build and run this, we can log that number. We're passing numbers through the interfaces. What if I wanted to deal with something like a string of characters?

In C, we define a sting using a character array. If I wanted this "Hello world" string to be passed into JavaScript, how might I do that? One option would be to create a function get_char that returns individual characters at a single offset. We're just still returning a number representing the character, but we can call it many times to get the whole string.

If I return the individual item of the string, we can then call this functions from JavaScript. Calling the get_char function in JavaScript with zero to get the first character of the string, we can then see the char code for the "H" being returned. We could then use some code to convert that into the correct string character, and we could read out the string, letter by letter.

Thankfully, there is a better way to do this. Instead of a get_char function, I'm going to create a char pointer returning a function called get_string_offset. What this function will do is it will return the memory address of the first character of the string. When we build this, we can see in the code below, get_string_offset is returning a single number which is a 32 bit integer.

It's a constant integer, 16, and this is the address of our string in the **WebAssembly** memory. If we look further up in this output, we can see that there's a data section, and the data section is used to create pre-allocated memory in our **WebAssembly** modules.

This data section is allocating, at address number 16, the content "Hello world." Then our memory is also being exported over here, so we've got this single piece of addressable linear memory that contains the data we want. Now we just have to write the JavaScript to read it.

The first thing I'm going to do is read out that memory export which is directly the instance that exports memory property. The way that we access raw memory in JavaScript is using typed arrays, so you want to create a typed array on top of the **WebAssembly** memory that represents our string.

Each character of the string is 8 bits. I'm going to use the Uint8Array typed array on top of the **WebAssembly** memory, the memory.buffer property, and then specify the offset within the **WebAssembly** memory that our string starts.

Calling the get_string_offset function, we can get this address, 16. The last argument for our typed array is the length of the buffer, in this case, 11 characters for this string.

Finally, to convert this raw buffer into an actual JavaScript string, we use the TextDecoder API. We pass the raw buffer, and it gives us back the string that we can then log in the console.