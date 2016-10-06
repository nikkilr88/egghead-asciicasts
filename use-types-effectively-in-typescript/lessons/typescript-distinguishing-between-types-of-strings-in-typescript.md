Annotating a variable as a `string` type looks like this. Annotating a variable as a `string literal` type looks like this. The `string` Type variable can be set to any string, but the `string literal` Type can only be set to the type value, as well as `null` and `undefined`, as of now.

**demo.ts**
``` javascript
let unit: string = "awesome";
let miles: "MILES" = "awesome";  // error TS2322: Type '"awesome"' is 
                                 // not assignable to type '"Miles"'
```
When we set the `string literal` type to a value that is incorrect, the IDE will alert us, as well as the compiler. Type `awesome` is not assignable to type `MILES`. This `string literal` type by itself isn't that useful, but when combined with **union** types and **alias** types, they help document your code, catch errors, and large concepts can be boiled down to one alias.

To demonstrate, I'm going to make a function that accepts a `number` and a `string`. When I call the function, I can pass any number and any string. When we run the compiler, no errors. When we run the code, that's what I was going for. 

**demo.ts**
``` javascript
function moveCharacter(distance: number, value: string) {
  console.log(`You moved ${distance} ${value}`);
};

moveCharacter(3, "feet");   // You moved 3 feet
```
However, I can also pass the wrong string value. Run the compiler, no errors because I said any string. When we run the code, this is not what I was going for.

Instead, lets make a type `alias` using `string literals` and `union` types. Now let's update our value argument to be a distance metric. 

**demo.ts**
``` javascript
type distanceMetric = "MILES" | "KILOMETERS" | "METERS" | "YARDS" | "FEET" | "INCHES";
function moveCharacter(distance: number, value: distanceMetric) {
  console.log(`You moved ${distance} ${value}`);  // error TS2345: Argument of type '"dragon"' is not 
                                                  // assignable to parameter of type '"MILES" | "KILOMETERS" | ... '
};
```
Already the IDE is alerting us that `"dragon"` is incorrect. If we run the compiler, it will say the same thing. `'"Dragon"'` is an unacceptable value for a type that can only be these values.

To review, `string literal` type values can only be set to its type, as well as Null and Undefined, for now. They're great for documenting your code, catching typos, and prevent assigning the wrong string. When combined with union types and alias types, string literals boil down large concepts to one alias.

For example, if our value requirement can only be specific string parameters, string literal types, union types, and alias types make that really easy.