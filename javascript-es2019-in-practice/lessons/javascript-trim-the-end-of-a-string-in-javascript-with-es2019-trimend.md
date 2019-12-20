Instructor: [00:01] Once again, we're looking at our Nuxt application. This time, we want to see how we can print out the students' teachers. The first thing we'll notice, though, is that in the input data, there is some incorrect spacing with respect to the commas.

#### scores.json 

```js
"records": [
  {
    "student": "Alicia ",
    "id": 1,
    "teachers": "jim , bob",
    "scores": [97, 93, [93, 97]]
  },
  ...
]
```

[00:14] Alicia's teacher is `jim` and `bob`, and there should be no space between Jim and the trailing comma after his name. We can see in our output that, in fact, we've fixed this bug.

![Teachers output bug fixed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/trim-the-end-of-a-string-in-javascript-with-es2019-trimend-output-bug.jpg)

[00:27] We can see that the way that we have done this is, when transforming records, we would take the students' teachers and split the string by a comma, which will turn it into an array of the teachers' names, spaces and all.

[00:40] Then mapping the teachers' names to trim white space from before and after their name. Then add white space again before their name, and then join them again with a comma.

#### Scores.vue

```js
const avg = average(record.scores.flat(2))
  const grade = getGrade(avg)
  const result = {
    student: record.student.trim(),
    average: avg,
    teachers: record.teachers.split(',').map(teacher => ' ' + teacher.trim()).join(','),
    grade
  }
```

[00:52] The way this looks is, it takes something like "`jim , bob`" and then maps it, and splits it an array of `["jim ", " bob"]`, and then maps over that array, trimming the white space from the front and back, and adding white space to the front, giving us `[" jim", " bob"]` like that.

```js
const avg = average(record.scores.flat(2))
  const grade = getGrade(avg)
  const result = {
    student: record.student.trim(),
    average: avg,
    // jim , bob
    // ["jim ", " bob"]
    // [" jim", " bob"]
    teachers: record.teachers.split(',').map(teacher => ' ' + teacher.trim()).join(','),
    grade
  }
```

[01:22] Finally, joining them with a comma in-between. What we end up with is the string `" jim,  bob"`.

```js
const avg = average(record.scores.flat(2))
  const grade = getGrade(avg)
  const result = {
    student: record.student.trim(),
    average: avg,
    // jim , bob
    // ["jim ", " bob"]
    // [" jim", " bob"]
    // " jim, bob"
    teachers: record.teachers.split(',').map(teacher => ' ' + teacher.trim()).join(','),
    grade
  }
```

We can see, if we look at a JSON representation of our teachers, even though we have managed to remove that space in-between the comma and Jim's name, we've now got an erroneous space in front.

![Teachers JSON](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/trim-the-end-of-a-string-in-javascript-with-es2019-trimend-teachers-json.jpg)

[01:44] The problem here is, we only want to trim off white space from the right-hand side of Jim's name, rather than trimming white space off of both sides and then adding a space to the front. Thankfully, in ES2019, this couldn't be simpler.

[01:58] The function now exists called trimEnd, and we could, instead of having to add the white space, just call `trimEnd`, save again, and we'll see that it's now `jim, bob`, with no preceding space.

```js
 const avg = average(record.scores.flat(2))
  const grade = getGrade(avg)
  const result = {
    student: record.student.trim(),
    average: avg,
    teachers: record.teachers.split(',').map(teacher => teacher.trimEnd()).join(','),
    grade
  }
```

![Teachers JSON fixed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/trim-the-end-of-a-string-in-javascript-with-es2019-trimend-teachers-json-fixed.jpg)