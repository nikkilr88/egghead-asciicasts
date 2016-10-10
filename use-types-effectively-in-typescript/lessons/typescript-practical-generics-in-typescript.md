We have two regular interfaces and a generic interface. Generics make great containers because they can contain anything. We can have a `crocContainer` and a container of `Taxes`. Maybe we need a `RedCroc` container and a `BlueCroc` container.

**demo.js**
```javascript
interface Crocodile { personality: string; }
interface Taxes { year: number; }
interface Container<T> { unit: T; }

let crocContainer: Container<Crocodile> = {unit: { personality: "mean"}};
let taxContainer: Container<Taxes> = {unit: {year: 2011}};

interface RedCroc extends Crocodile { color: "red"; }
interface BlueCroc extends Crocodile { color: "blue"; }
```

If we want to be more specific about what we want to contain, we can use a generic constraint. The constraint changes the generic from accepting anything to accepting anything with these types.

**demo.js**
```javascript
interface CrocContainer<T extends Crocodile> { crocUnit: T; }
```

When we set the values, the IDE gives us auto complete and tells us the types for the values. We're getting auto complete for the property name and the value type. Again, auto complete for the property name and the value type. One more time, auto complete for the property name and the value type.

**demo.js**
```javascript
let blueCrocContainer: CrocContainer<BlueCroc> = {crocUnit: {personality: "cool", color: "blue"}};
```

You have to pass the type argument with an interface constraint, but if you forget, the IDE will let you know. Class generic constraints work a little differently. First, let's make a class with one property that is set after instantiation. Notice that we're not setting the constraint type. When we set the `classyCroc` unit properties, we get the type information from the constraint.

**demo.js**
```javascript
class ClassyContainer<T extends Crocodile> {
  classyCrocUnit: T;
}

let classyCrocContainer = new ClassyContainer();
classyCrocContainer.classyCrocUnit = {personality: "classy"};
```

As long as the property only has the constraint type, the compiler is cool with it. If we add a property that's not in the constraint, the IDE will let us know. If we do pass the type argument, we get the type information from the constraint and the type argument.

**demo.js**
```
let classyCrocContainer = new ClassyContainer<RedCroc>();
classyCrocContainer.classyCrocUnit = {personality: "classy", color: "red"};
```

Let's make another class that uses the constructor's shorthand for setting the value on instantiation. If we don't pass a type argument, we can add extra properties as long as the class instance has the constraint type. Cool, no complaints from the compiler.

**demo.js**
```javascript
class CCC<T extends Crocodile> {]
  constructor(public cccUnit: T) {}
}

let ccc = new CCC({personality: "ultra classy", likesCheetos: true});
```

If we want to be more specific, we can still pass a type argument. Now that we have passed a type argument, we're getting the same level of type information from the IDE. The IDE and the compiler will let us know that `likesCheetos` doesn't exist on a `BlueCroc`.

**demo.js**
```
let ccc = new CCC<BlueCroc>({personality: "ultra classy", likesCheetos: true, color: "blue"});
```

To review, generic types can contain anything, but a generic constraint can contain anything that has the constraint type. For class generic constraints, if we don't use the constructor shorthand for setting properties on instantiation, we can get away without passing the type argument but the property can only contain the constraint type.

When we pass the type argument, our property will have that value too.

If we do use the constructor shorthand for setting properties on instantiation and we want more specificity, we can pass the type argument. If we want less specificity, we don't have to. As long as the instance has the constraint, we can add extra properties.