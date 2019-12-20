Instructor: [00:00] Once again, we're looking at our Nuxt.js application. In this case, we're looking at this JSON representation of the data that's above. As we can see it's an object. The keys are the students' IDs. The value are sub-objects representing the student's name, their average, the teachers, and their grade.

[00:19] How is this JSON generated? The JSON computed property is ultimately responsible for displaying this data. It takes the entries of `records.Map` and takes an empty object and takes each of the `key` of the `records.Map` and says `json[key]` equals the value of the `records.Map` and then takes that and stringifies it, pretty printing it to a depth of `2`.

[00:43] In order to understand this, we need to know what `recordsMap` is. `recordsMap` itself is a computed property which returns `recordMap`. `recordsMap` gets populated by the `transformRecord` routine.

[00:56] As you could see on line 50, `recordsMap` itself is a map, 

#### Scores.vue
```vue
const recordMap = new Map()
```

which is an ES6 data structure that allows for arbitrary keys with arbitrary values, whereas regular objects only allow string or integer keys with arbitrary values. As we build up and transform our records, we will call the set function on our map with the `record.id` as the key and the `result` of our transformation as the value.

[01:20] By the time we're done transforming all our records, `recordMap` is populated with the keys being `record.id` and the `results` being the values. We technically don't need a map here because we're not using a complex key. We're using just a numeric key.

[01:37] However, for the purpose of this exercise, it's important to be able to show how you could turn a map into an object. Whereas if our map's keys were truly complex and they were objects or something other than an integer or a string, we wouldn't be able to turn them back into an object.

[01:51] By the time we got to building up this `json` object, if the key itself isn't a string, it's not going to work. That is, any key that isn't an integer or a string will get coerced to a string before being populated.

[02:05] If you're trying to do something like `json[{1: 1}] = 1;`, making JSON have an object key, we can `console.log` that value and see that the key isn't the actual object. The key is the string object, which is what you get whenever you coerce an object to a string.

#### Scores.vue

```js
json() {
  const json = {};
  // for(const [key, val] of this.recordsMap.entries()) {
  //   json[key] = val;    
  // }
  json[{1:1}] = 1;
  console.log(json;)
  return JSON.stringify(json, null, 2)
}
```

[02:27] For the purpose of this exercise, that doesn't matter. We know that all of our keys actually are integers. If we `console.log` that, we see that it's given us an object where the keys are the IDs and the values are the students.

```js
json() {
  const json = {};
  for(const [key,val] of this.recordsMap.entries()) {
    json[key] = val;
  }
  console.log(json);
  return JSON.stringify(json, null, 2)
}
```

![console.log is working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845425/transcript-images/create-an-object-from-a-map-or-key-value-pairs-in-javascript-with-es2019-fromentries-console.log.jpg)

[02:46] The reason this works is because maps has an `entries` function which returns an iterator. Each of those `entries` is an array that has two values, the first value being `key`, second value being `val`.

[03:02] You may not have seen this type of destructuring before, although now with React hooks being popular, people are starting to see what's known as a tuple being used more and more. `entries` itself can be thought of as an array whereas each entry of that array is an array that contains two values, the `key` and the `val`.

[03:21] ES2019 gives us a built-in function that can do this for us. Instead of having to do this loop, we can simply say, `Object.fromEntries(this.records.map)`. Because `Object.fromEntries` is so new, we can first detect if it even is available in our environment.

[03:48] This isn't calling the function `Object.fromEntries`. It's checking for the presence of `Object.fromEntries`. If that function isn't even available in our environment, we're going to `return` the string `'loading...'` rather than returning the JSON stringified version of the `Object.fromEntries` of the `recordsMap`.

```js
json() {}
  if (!Object.fromEntries) {
    return 'loading...';
  }
  return JSON.stringify(Object.fromEntries(this.recordsMap), null, 2)
  }
```

[04:07] If I save this and we reload -- we open up our JSON -- we still see that still prints out the right thing. 

![JSON stll printing correctly](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/javascript-create-an-object-from-a-map-or-key-value-pairs-in-javascript-with-es2019-fromentries-json-still-printing-correctly.jpg)

The way this works is `Object.fromEntries` can take in an actual array of arrays of values, something that might look like `[[1, 'a'], [2, 'b]]`.

[04:27] Then that would get converted into something that looks like an object with a property of `one` with a value of `a` and a property of `two` with a value of `b`, `{ 1: 'a' , 2: 'b' }`. You could see that these two map to each other.

```js
json() {}
  if (!Object.fromEntries) {
    return 'loading...';
  }
  // [[1, 'a'], [2, 'b]]
  // { 1: 'a' , 2: 'b' }
  return JSON.stringify(Object.fromEntries(this.recordsMap), null, 2)
  }
```

[04:42] It's also worth noting that this style of array, where it's an array of array of entries, can be passed to a map constructor in order to turn this entries array into a map. Again, we save this. We refresh. We see that it works.

[05:01] If we get rid of this guard clause and we save and we refresh, we see `Object.fromEntries is not a function`.

![Object from entries error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845428/transcript-images/create-an-object-from-a-map-or-key-value-pairs-in-javascript-with-es2019-fromentries-object-entries.jpg)

This is a really nice feature of Nuxt. Nuxt will never just not work. If it discovers that you have an error in your code, it will print it out to the screen and tells us exactly where it's happened.

[05:20] It's saying, "I don't know about Object.fromEntries." This is because we're using Node 11. Again, if I come back out to my terminal and type `node --version`, I could see that I'm on `11.14.0`. `Object.fromEntries` is so new that it's only available in Node 12.

[05:40] It's available in the latest Chrome, as we saw before when we were guarding for it on the server side. It was still printing out the JSON on the client side, which was Chrome, but if we can update our server to the latest Node, we can get rid of that guard clause that we had over here completely.

[05:57] I'm going to go ahead and use NVM again, which again can be installed from Brew or however else you get command line utilities. In this case, I'm going to say, `nvm use 12`. This will get me the latest Node, Node 12, which just came out at the end of April.

#### Terminal 

```bash
nvm use 12
```

[06:14] I'll start back up my server. I'll do `npm run dev` again.

```bash
npm run dev
```

I'll refresh. Everything again is working. Again, `Object.fromEntries`, it either takes in that array of tuples, or it can take in a map or a set or anything that has the `entries` function on it. It will detect that and call the entries function itself and iterate over that.

![Server is working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/create-an-object-from-a-map-or-key-value-pairs-in-javascript-with-es2019-fromentries-server-working.jpg)