The **spread operator** allows you to take an **array** and **spread** it out into its **individual items**. If I log out an **array** with `[ 1, 2, 3]` you can see I get an **array**, so you have the **brackets** with `[ 1, 2, 3]`.
```javascript
console.log([ 1, 2, 3]);
```
If I put the three dots in front to say I want to **spread** this **array** and I hit run again, you can see I get `1, 2, 3` with no **brackets** around it. 
```javascript
console.log(...[ 1, 2, 3])
```
This actually allows us to **push elements** easily into other **arrays**. Before if I were to do first.push(second) and log this out, you'll see, I'll get one two three and then **another array inside of my array**, `[ 1, 2, 3,[ 4, 5, 6]]`.
```javascript
let first = [ 1, 2, 3];
let second = [ 1, 2, 3];

first.push(second);
```
But instead, if I **spread** out the **second array** and **push** that in, you can see I get the individual items pushed in. 
```javascript
first.push(...second);
```
I could actually duplicate that and save and you can see I get `[ 1, 2, 3, 4, 5, 6, 4, 5, 6]`. So I'm **pushing** in the **individual** items over and over **instead of pushing in arrays**.

This even works for doing things like **pushing** in an **array of parameters**. If I want to `addThreeThings` and then push in my `first` collection there, hit run, you can see I get `six`, which is one plus two plus three. 
```javascript
function addThreeThings( a, b, c){
  let result = a + b + c;
  console.log(result);
}

addThreeThings(...first);
```
I just passed in first and then I **spread** it out into one, two, and three and I can do the same thing for second and run this and you'll see I'll get `6` and `15`. 15 being 4 plus 5 plus 6, which is 4 plus 5 plus 6. Because, again, this, these **three dots**, are **spreading the array** out into its **individual** elements.