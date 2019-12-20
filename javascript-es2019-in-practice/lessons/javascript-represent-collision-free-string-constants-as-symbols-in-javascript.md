Instructor: So lets look at how we generate letter grades for our students, based upon the scores they've achieved in the class. If we go back to our `transformRecord` function inside of `Scores.vue`, we see that once we generate the average for the student, we then pass out the `getGrade` function in order to get the letter grade for the student.

[00:17] What does the `getGrade` function look like? It's a pretty straight forward function that takes the numeric average in, and if it's greater than 95, returns an A. If it's greater than 85, returns a B. Otherwise, it returns a C. No students in this class ever get a D or an F.

#### Scores.vue

```js
function getGrade(average) {
  if (average >= 95) {
    return grades.a
  }
  if (average >= 85) {
    return grades.b
  }
  return grades.c
}
```

[00:33] Prior to ES2019, we would just use strings. However, ES2019 opens us up to use symbols instead. Prior to ES2019, if I made `a` into a `symbol`, there'd be no way to get just the string "A" back out. As you could see over here, when I go to print out `grades.a`, it will print out the string "`symbol(A)`" and no way to get A itself.

```js
const grades = {
    a: Symbol('A'),
    b: 'B',
    c: 'C',
    d: 'D',
    f: 'F',
}

const recordMap = new Map()
```

![Symbol A error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845427/transcript-images/represent-collision-free-string-constants-as-symbols-in-javascript-symbol-a.jpg)

[01:00] ES2019 adds a `description` property to `symbols` that returns the string that was passed to symbol creation.

```js
const recordMap = new Map()

function getGrade(average) {
  if (average >= 95) {
    return grades.a.description
  }
```

 If I go ahead and turn these [inaudible] into `symbols`, our work is complete.
 
 ```js
const grades = {
    a: Symbol('A'),
    b: Symbol('B'),
    c: Symbol('C'),
    d: Symbol('D'),
    f: Symbol('F'),
}

const recordMap = new Map()

function getGrade(average) {
  if (average >= 95) {
    return grades.a.description 
  }
  if (average >= 85) {
    return grades.b.description
  }
  return grades.c.description
}
 ```

You may want to ask yourself, "Why would I want to use a symbol here, rather than using a string?

[01:27] The answer is, prior to ES2019, I wouldn't have. However, now that I have symbol description, I would use symbols wherever I had a string constant that I wanted to be collision-free. By collision-free, I mean `Symbol('a') === Symbol('a')`. If I `console.log` this value, I can see that it returns false, whereas `('a' === 'a')` is true.

```js
const grades = {
    a: Symbol('A'),
    b: Symbol('B'),
    c: Symbol('C'),
    d: Symbol('D'),
    f: Symbol('F'),
}

console.log('a' === 'a');

const recordMap = new Map()
```
