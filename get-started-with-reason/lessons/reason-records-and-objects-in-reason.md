Instructor: [00:01] Records allow us to store various types of data into one structure and reference them by name. To create a record, we first have to define its structure. In our case, we define the record `type person`. The person can have a `name` of type `string` and then `age` of type `int`. 

[00:21] Once we defined the record type, we can create the person. For example, `Anna`, who is `28` years old. 

#### Terminal
```javascript
Reason # 
type person = {
  name: string,
  age: int,
};
type person = { name: string, age; int, };

Reason # 
{ 
  name: "Anna",
  age: 28,
}
```

As you can see, the type is inferred by default and we don't need to specify. Let's talk about how we can access a record field, like `name`. Therefore, we create a `let` binding `tim` and bind the person with the `name` of `"Tim"` and `age` of `52` to it. 

```javascript
Reason # 
let tim = { 
  name: "Tim",
  age: 52,
}
```

[00:46] Now, we can access the fields using the dot notation. For example, `tim.name`. 

```javascript
Reason # tim.name;
- : string = "Tim"
```

Let me briefly point out to you how all the auto-completion works through the type system. Auto reduces available options. Now, it's reduced to age. This also means if you try to access a field that doesn't exist for a person record, it will throw an error. 

[01:16] As an alternative to access a field, you can leverage structuring in combination with the `let` binding. To do this, we start with `let`, then open curly braces, describe how to map the fields, and place the record to be structured after the equal sign. 

```javascript
Reason # let {age: timsAge, name: timsName} = tim;
let timsName: string = "Tim";
let timsAge: int = 52;
```

[01:35] As you can see, Tim's age is now bound to his `age`, and name is bound to Tim's `name`. We don't have to restructure all the fields. In case of Tim, we could only pick Tim's name and bind it to the name `someName`.

```javascript
Reason # let {name: someName} = tim;
let someName: string = "Tim";
```

In case we want the `let` binding to have the same name as the field name, we can use a short ened syntax called punning. 

```javascript
Reason # let {name} = tim;
let name: string = "Tim";
```

[02:00] Next up, we explore how to update a record. There are two ways, immutable update and mutable update. First, we explore immutable update. We create anew `let` binding and a new record based on original `let` binding `Tim`. 

[02:17] Obviously, we can assign all the fields manually. This works fine but can get quite tedious once we have more fields on a record. 

```javascript
Reason #
let olderTim = {
  name: tim.name,
  age: tim.age + 1,
};
let olderTim: person = {name: "Tim", age: 53};
```

Luckily, a new record can be created with the spread operator by using three dots. 

[02:32] We overwrite `age`, we follow the side updates, but all the other fields are automatically expanded. 

```javascript
Reason #
let evenOlderTim = {
  ...olderTim, 
  age: olderTim.age + 1,
};
let evenOlderTim: person = {name: "Tim", age: 54};
```

In our case, this is only `name`. Keep in mind, during this whole process of creating new `let` bindings, neither `Tim`, not `olderTim`, have been mutated. 

[02:50] Let's see how we can do immutable update. By default, this isn't possible. Optionally, we can make a record field mutable. We create a new record `type animal` with an immutable field species, and mutable field scary. 

```javascript
Reason # 
type animal = {
  species: string,
  mutable scary: bool,
};
type animal = { species: string, mutable scary: bol, };
```

Next up, we create the `lion`, and set `scary` to `true`. 

```javascript
Reason #
let lion = {
  species: "Lion",
  scary: true,
};
let lion: animal = {species: "Lion", scary: true};
```

[03:15] On the other hand, thinking about it twice, a lion is just a big, fluffy cat and not that scary at all, we change `scary` to `false`. Since `scary` is a mutable field, we can update it with the equal sign operator. 

```javascript
Reason # lion.scary = false;
- : unit = ()
```

In referencing the let binding `lion` now, we can see the value of the field `scary` has changed to `false`. 

```javascript
Reason # lion: 
- : animal = {species: "Lion", scary: false}
```

[03:37] There is also this useful shortened syntax punning for record creation. When we bind the string `Bee` to the name species and create an animal, we can manually use the `species` and assign it. In case of `species`, the field name matches the name of the existing `let` binding, and therefore punning allows us to simply immute the second part. 

```javascript
Reason # let species = "Bee";
let species: string = "Bee";
Reason # 
{
  species: species,
  scary: true,
};
- : animal = {species: "Bee", scary: true}
Reason # 
{ 
  species,
  scary: true,
};
- : animal = {species: "Bee", scary: true}
```

[03:59] This also works with types. First, you define the record `coordinates`, then the record `circle` that contains `coordinates`. While we could write `coordinates` twice, punning allows us to immute the second part. 

```javascript
type coordinates = {
  x: int,
  y: int,
};
type coordinates = { x: int, y: int, };
Reason # 
type circle = {
  coordinates,
  radius: int,
};
type circle = { coordinates: coordinates, radius: int, };
```

On a side note, this example demonstrates how we can create deeply nested records. 

```javascript
Reason #
{
  coordinates: {
    x: 3,
    y: 0,
  },
  radius: 4,
};
- : circle = {coordinates: {x: 3, y: 0}, radius: 4}
```

[04:29] So far so good. What happens if you try to create a record without declaring a type beforehand? Let's give it a try. 

```javascript
Reason # {foo: 42};
Error: Unbound record field foo
```

As you can see, an error is thrown. For records, a record type matching all the fields always has to be declared beforehand. 

[04:49] Coming from a dynamic language, this might look limiting to you. In reality, most of the times, our data shape is fixed. Even in case it's not, it can potentially be better represented as a combination of variance and records instead. 

[05:04] However, in certain niche situations, we don't know the structure at hand. In such cases, we can create an object by declaring the public fields with `pub`, followed by the field name, and assigning the value. Be careful about .objects. Use equal signs and semicolons. To access a field, we can use a hashtag.

```javascript
Reason# 
let anna = {
  pub name = "Anna";
  pub eyecolor = "brown";
};
let anna: {. eyeColor: string, name: string} = <obj>;
Reason # anna#eyeColor;
- : string = "brown"
```