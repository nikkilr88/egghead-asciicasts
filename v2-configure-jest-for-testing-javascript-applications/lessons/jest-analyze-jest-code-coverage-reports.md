Instructor: [00:01] As you're reviewing a coverage report, you might wonder to yourself, "OK. How in the world does Jest know that this part of the code is not being run in my test? That's just some magic going on here."

```js
if (match) {
  formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0]
}
```

[00:13] It's not magic. This is actually using a tool called `babel-plugin-istanbul` to instrument your code for coverage. I want to show you how this works. Here is our utils file that has that match that's not being covered.

```js
function getFormattedValue(value, language = 'en-US') {
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6,
  })

  // Add back missing .0 in e.g. 12.0
  const match = value.match(/\.\d*?(0*)$/)

  if (match) {
    formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0]
  }
  return formattedValue
}

export {getFormattedValue}
```

[00:26] This is what the file looks like in your source, but Jest doesn't run this file when it's running your test under coverage. It actually transforms this file using Babel into something that looks more like this.

```js

var cov_2k0r47ewe = function () {
  var path = "/Users/kentcdodds/Desktop/tmp/utils.js";
  var hash = "797a9fb26f3bf326cd604591b0f8e666e1afc48e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/kentcdodds/Desktop/tmp/utils.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 23
        },
        end: {
          line: 5,
          column: 4
        }
      },
      "1": {
        start: {
          line: 7,
          column: 16
        },
        ...
```

[00:39] Not a whole lot of this looks the same until we get down here to line 205 where it starts looking kind of the same.

```js
function getFormattedValue(value, language = (cov_2k0r47ewe.b[0][0]++, 'en-US')) {
  cov_2k0r47ewe.f[0]++;
  let formattedValue = (cov_2k0r47ewe.s[0]++, parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  }));
  const match = (cov_2k0r47ewe.s[1]++, value.match(/\.\d*?(0*)$/));
  cov_2k0
```

We've got that get formatted value, but we also have all of this other extra stuff going on in here.

[00:52] What is all this plus, plus nonsense? Well, what's going on here is we have this `var cov_2k0r47ewe` stuff here going on, whatever that is. It's this variable that's being declared through this immediately invoked functioning expression. Here we have a path, we have a file hash and a whole bunch of other information.

[01:11] What's particularly of note is this `coverageData` object.

```js
var coverageData = {
  path: "/Users/kentcdodds/Desktop/tmp/utils.js",
  statementMap: {
    "0": {
      start: {
        line: 2,
        column: 23
      },
    ...
```

This is going to have a map for all the statements. It's going to have a map for the functions and branches. Branches are interesting because each one of them is going to have a start and an end and any location as well for each one of the branches, the left and the right side of our branch.

[01:34] We have if statements and we also have our conditional expressions or the ternaries. The ternary is the part that we're not getting coverage on. If we come down here to our code, we're going to see we have this `getFormattedValue`, we have a `value` here and then our `language`.

```js
function getFormattedValue(value, language = (cov_2k0r47ewe.b[0][0]++, 'en-US')) {
  cov_2k0r47ewe.f[0]++;
  let formattedValue = (cov_2k0r47ewe.s[0]++, parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  }));
```

[01:52] The default expression here is actually a branch. The first array is the first branch in our code (`cov_2k0r47ewe.b[0][0]++`). This is the first side of the branch and that is going to be incremented one time and then the completion value of this entire expression, which is using the comma operator right there is going to be this `en-US`.

[02:10] It's not actually changing the behavior of your code, it's just adding some instrumentation so that it can keep track of the side of the default value expression run. Here (`cov_2k0r47ewe.f[0]++;`), we are incrementing the function because we know now OK if this line runs, we know that the function has been run.

[02:27] Now, this is an expression here with `formattedValue` where we're assigning a value to a variable, so we're going to keep track of that statement.

```js
let formattedValue = (cov_2k0r47ewe.s[0]++, parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  }));
```

We also have a statement here, so we're going to keep track of that one.

```js
const match = (cov_2k0r47ewe.s[1]++, value.match(/\.\d*?(0*)$/));
  cov_2k0r47ewe.s[2]++;
```

Here we have a conditional expression, so it's a branch. This is our second branch. The first side of the branch and our second branch on this side and that's the second side of the branch.

```js
if (match) {
    cov_2k0r47ewe.b[1][0]++;
    cov_2k0r47ewe.s[3]++;
    formattedValue += /[1-9]/.test(match[0]) ? (cov_2k0r47ewe.b[2][0]++, match[1]) : (cov_2k0r47ewe.b[2][1]++, match[0]);
  } else {
    cov_2k0r47ewe.b[1][1]++;
  }
```

[02:48] What's interesting about this is in our original code, we actually don't have an `else` case of this `if`. For them to make sure that we cover a situation where the `if` statement actually isn't run, they add an `else` case for us.

[03:00] Again, not changing the actual behavior of the code, just instrumenting it so they can keep track of what is going on as our code is being run in the test. The interesting part here is in our code coverage report we're not hitting this match at one, we're actually only hitting the match at zero.

```js
formattedValue += /[1-9]/.test(match[0]) ? (cov_2k0r47ewe.b[2][0]++, match[1]) : (cov_2k0r47ewe.b[2][1]++, match[0]);
```

[03:18] What we're getting right here is this match at one. What's happening is because this, `(cov_2k0r47ewe.b[2][0]++, match[1])`, expression is never evaluated, this branch, our third branch, the first side of that branch is never getting incremented. That's how it knows that we're never running this code because that entry for this branch is never getting incremented.

[03:36] Understanding this can really help you analyze this report. It can also help you in determining how you can ignore certain parts of your code from coverage because babel-plugin-istanbul actually allows you to ignore some of this.

[03:49] If we add an `/* istanbul ignore next */`, then it basically says, "Hey, istanbul. This isn't actually all that important, so I'm just going to ignore this part of coverage."

```js
function getFormattedValue(value, language = 'en-US') {
  ...

/* istanbul ignore next */
  if (match) {
    formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0]
  }
  return formattedValue
}
```

With that, we wind up with this kind of situation where it leaves that part of the code alone.

[04:05] It keeps our comment in here, but it doesn't add the branch, it doesn't add any of the instrumentation here. What you're left with is 100 percent code coverage for this because no coverage is being recorded for this branch.

```js

function getFormattedValue(value, language = (cov_2k0r47ewe.b[0][0]++, 'en-US')) {
  cov_2k0r47ewe.f[0]++;
  let formattedValue = (cov_2k0r47ewe.s[0]++, parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  }));
  const match = (cov_2k0r47ewe.s[1]++, value.match(/\.\d*?(0*)$/));
  /* istanbul ignore next */

  if (match) {
    formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
  }

  cov_2k0r47ewe.s[2]++;
  return formattedValue;
}
```

[04:18] I typically recommend against using these kinds of comments because you're basically lying to yourself about how much coverage you're getting, but sometimes it can be useful.

[04:27] Hopefully understanding how your code is being instrumented for coverage will help you interpret these reports better, so that you can improve that code coverage of your application.
