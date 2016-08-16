Typically in **JavaScript** if you have an **object** with a **property** and a **value**, and you want to log out this **value**, you would do some sort of **assignment**. Let's say `obj`. Then when you log it out, you would say that `obj`, and then the property name. You could run it and you would see the value in the log.
```javascript
var obj = {
  color: "blue"
}
console.log(obj.color);
```
**Destructuring** allows you to do this in a little bit different way where, instead of doing this sort of assignment, I would say look up the `color` **property** and make that available so that I can just log out `color` and when I run this again, I'll just get `blue` again. Meaning that this says find this guy and assign it to...so I have `blue` here available, and now `color` is available for me wherever I want to use it.

Now this also works if I have **multiple properties** and I want to get the `color` and the `position`. I could just say `color`, then `position`. Then I can log out the `color` and the `position` and they're both available now, so I can log out `blue` and `forward`.
```javascript
var {color, position} = {
  color: "blue",
  name: "John",
  state: "New York",
  position: "Forward"
}

console.log(color);
console.log(position);
```
A very common scenario where you will see **destructuring** come into play is when you have a **function** which returns an **object** but you only want the `name` and the `state` off of that return, so I'll just say `var` and then I'll say `{name, state}`.
```javascript
function generateObj() {
  return {
    color: "blue",
    name: "John",
    state: "New York",
    position: "Forward"
  }
}
var {name, state} = generateObj();
```
Then I can simply use the `name` and I can use the `state`. I can run this and I can get `John` and `New York` because name was found here, which was John, and state was found here, which was New York. Once I logged them out, I got only those things that I wanted.
```javascript
console.log(name);
console.log(state);
```
If you want these named something else, you can actually just put a colon in here. I'll say `first name` and I'll say `location`. This means still look up the `name`, but instead assign it to `first name`. Look up the `state`, but instead assign it to `location`. So that when I go `first name` here and I go `location` here and I run this, I'll still get `John` and `New York`.
```javascript
var {name:firstname, state:location} = generateObj();

console.log(firstname);
console.log(location);
```
Now where this gets crazy, and also a little awesome, is when you have an **array** and you only want the **first item** and the **fifth item** and you don't care about the second, third or fourth. I can do the **array** syntax, so `var` and then assign an array.

I'll say `first` and then the second item, don't care about. Third, don't care about. Fourth, don't care about. But I do want the `fifth`, and I'll just name it `first` and `fifth`. I'll log out the `first` item, then I will log out the `fifth` item.
```javascript
var [first,,,,fifth] = ["red", "yellow", "green", "blue", "orange"]
```
Then when I run this, you can see I get `red`, because `first` is assigned to `red`, and `orange`, because `fifth` is assigned to `orange`. If I wanted to start putting in second, third, fourth, I could, but right now they're not accessible, because there's just empty commas in there.

For this example we have an **array of people** which are just **objects** with some people `firstName`, `lastName`, et cetera on them. I want you to watch very carefully as we do this, because I'm going to take the people.

I'll go through them with a `forEach()`, and then we'll pass on a **function**. I'll use the **arrow syntax**, so that's the **arrow syntax** for a function, and I'm going to **destructure the parameter** that comes in. This would typically be the `person`.
```javascript
var people = [
  {
    "firstName": "Skyler",
    "lastName": "Carroll",
    "phone": "1-429-754-5027",
    "email": "Cras.vehicula.alique@diamProin.ca",
    "address": "P.O. Box 171, 1135 Feugiat St."
  },
  {
    "firstName": "Kylynn",
    "lastName": "Madden",
    "phone": "1-637-627-2810",
    "email": "mollis.Duis@ante.co.uk",
    "address": "993-6353 Aliquet, Street"
  },
]

people.forEach(({firstName})=> console.log(firstName))
```
I'll say I only want the `firstName` off of it, so that when I log this out I can get the first name. I can run this and I can log out all of the first names of those `people`, because what happened is this function took in the **destructured version** of this, saying only give me the first name of all of these people that come in. Then I can log out just the `firstName`.

Lastly, to combine a couple of these concepts, if I want to get `Skyler`, I can actually use that **array syntax**, and I'll just say `[, "Skyler"]` and assign that to `people`, meaning that this is going to skip the first one, look up the second one and name it `Skyler`. Then I'll make a **function** which I'll call `logEmail()`, which will take a **destructured** of that object of just the `email property`, and we'll say log email.

Then when I say log the email of `Skyler`, and I run this, it logs out Skyler's email, which is right here, because it looks up the second item, names it `Skyler`. This is not looking up the name `Skyler`, it's just naming it `Skyler` from `people`. I'm logging Skyler's email, which is **destructuring** that `Skyler` object, and only taking the `email` off of it and logging out the email string, which is this.