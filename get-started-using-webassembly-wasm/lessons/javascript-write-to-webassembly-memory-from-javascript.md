In this example application, I'm calling a `consoleLog()` function within the `main` function of my **C** application. This function takes two arguments and offsets into the **WebAssembly** memory, which is the first character of the string that I have defined, `char str[] = "Hello World";` and then the length in that memory, the length of the string.

```
void consoleLog (char* offset, int len);

char str[] = "Hello World";

int main () {
	consoleLog(&str[0], 11);
}
```

When run, this function is defined in JavaScript, where it creates a typed array buffer on top of **WebAssembly** memory for that `offset` and `len`. It then uses the `TextDecoder` to decode the string and `log` the output JavaScript string.

```
var wasmModule = new WebAssembly.Module(wasmCode);
var wasmInstance = new WebAssembly.Instance(wasmModule, {
	env: {
		consoleLog (offset, len) {
			const strBuf = new Uint&Array(mem.buffer, offset, len);
			log(new TextDecoder().decode(strBuf));
		}
	}
});
const mem = wasmInstance.exports.memory;
wasmInstance.exports.main();
```

We're reading raw data from **WebAssembly** memory. What if we wanted to write into **WebAssembly** memory? As an example, I'm going to consider a function `toLowerCase`, where we take an input string and we then output an output string that is the lowercase version of it.

We're going to have two strings here and I'm going to say that they're both 20 characters long. 

```C
char inStr[20];
char outStr[20];
```

In the `toLowerCase` function, we can now loop over each character of the string. We read the character value from the input string, and we can then check if it's a capital letter based on the ASCII range.

This is much faster with bitwise arithmetic, but for clarity we can just check if it's between the 65 to 90 range in ASCII. If it's in that range, we then just shift it. Once we've got the results in lowercase character, we set that into the output string.

```C
void toLowerCase () {
	for (int i = 0, i < 20, i++) {
		char c = inStr[i];
		if(c > 64 && c < 91) {
			c = c + 32;
		}
		outStr[i] = c;
	}
	consoleLog(&outStr[0], 20);
}
```

To make this really easy to run, I'm then just going to run the `consoleLog()` function on the address of the out string, with the total length, and remove the `main` function. To be able to write to the input string in JavaScript, I'm going to create a `getInStrOffset` function, just like we have before, that returns the address of the input string in the **WebAssembly** memory.

```
char* getInStrOffset () {
	return & inStr[0];
}
```

With this built successfully, what we're then going to do in JavaScript is populate that input string by writing **WebAssembly** memory from JavaScript. We're then going to call the `toLowerCase` function and that'll then go ahead and log the lowercase output for us.

```
const mem = wasmInstance.exports.memory;
wasmInstance.exports.toLowerCase();
```

What we'd like to have here is a function that allows us to write a string from JavaScript into that **WebAssembly** memory. We could then provide an offset of where to write that memory, which we can then get from our `getInStrOffset` function that we wrote.

To create this `writeString` function, we're going to take its `str` and `offset` inputs. The first thing you want to do is generate the raw byte buffer from the string. To do that, we can use the `TextEncoder` interface to convert the JavaScript string into a typed array Uint8 buffer just like we have above.

```
function writeString (str, offset) {
	const strBuf = new TextEncoder().encode(str);
}
```

To write to the **WebAssembly** memory, we're going to create another buffer, which represents that input string, "**WebAssembly** memory." We're going to generate it from the **WebAssembly** `mem.buffer` at the `offset` of that `inStr` that was passed.

```
function writeString (str, offset) {
	const strBuf = new TextEncoder().encode(str);
	const outBuf = new Uint8Array(mem.buffer, offset); 
}
```

We're also going to set it to the `length` of the buffer that we've just created, that we're going to write into it. Looping through each byte index in the `strBuf`, we can then set into the `outBuf`, which represents that `inStr` in **WebAssembly** memory, set each byte from that string buffer.

```
function writeString (str, offset) {
	const strBuf = new TextEncoder().encode(str);
	const outBuf = new Uint8Array(mem.buffer, offset, strBuf
		.length);
	for (let i = 0; i < strBuf.length; i++) {
		outBuf[i] = strBuf[i];
	}	 
}
```

By writing directly into the **WebAssembly** typed array, we're writing directly into **WebAssembly** memory. Running this, we can see that it's correctly lowercasing the `inStr` that we've set from JavaScript, including some null bytes at the end because we've padded it up to 20 characters.

It's worth noting here, there's quite a bit of performance overhead to this copying of memory that's going on between JavaScript and **WebAssembly**. For this reason, it's worth thinking about where a piece of memory belongs, as its source of truth, quite carefully, and letting it always stay there as the `main` source of truth to minimize the copying operations.