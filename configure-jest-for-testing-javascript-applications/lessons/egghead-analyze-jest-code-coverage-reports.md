You might be wondering how Jest can generate this report. How can it know which one of these statements are being run, which one of these branches is being taken, and which one of these functions and lines are being run during our tests?

![image of the Jest generated report](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907431/transcript-images/egghead-analyze-jest-code-coverage-reports-initial.png)

`Jest` actually uses a tool under the covers called `Istanbul`, which uses a Babel plugin to instrument this code for coverage. Then when our code is run, it takes that instrumentation and generates a report out of it. Let's take a look at what that Babel plugin does to our code.

This is that `utils.coverage.js` file, instrumented with coverage. There's not a whole lot that's the same, until you get down here to the very bottom. Then we have that `getFormattedValue` function, but even that looks a little bit different.

### utils.coverage.js
```js
function getFormattedValue(value) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (cov_2e1x39rbgn.b[0][0]++, 'en-US');
  cov_2e1x39rbgn.f[0]++;
  var formattedValue = (cov_2e1x39rbgn.s[0]++, parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  })); // Add back missing .0 in e.g. 12.0
```

Here, we have this `cov_2e1x39rbgn` all over the place, and this `.f`, a `.s`, and a `.b`. We have another `.b` over here, and we're using these comma and all of these `++` operations. What's going on here?

```js
 var match = (cov_2e1x39rbgn.s[1]++, value.match(/\.\d*?(0*)$/));
  cov_2e1x39rbgn.s[2]++;

  if (match) {
    cov_2e1x39rbgn.b[1][0]++;
    cov_2e1x39rbgn.s[3]++;
    formattedValue += /[1-9]/.test(match[0]) ? (cov_2e1x39rbgn.b[2][0]++, match[1]) : (cov_2e1x39rbgn.b[2][1]++, match[0]);
  } else {
    cov_2e1x39rbgn.b[1][1]++;
  }

  cov_2e1x39rbgn.s[4]++;
  return formattedValue;
}

export { getFormattedValue };
```

Up here at the top of the file, we're creating this variable this `cov_2e1x39rbgn`. Then inside of this function, which is an immediately invoked function expression, we're creating this closure to the store the `path`, a `hash`, and a bunch of other coverage information.

```js
var cov_2e1x39rbgn = function () {
  var path = "/Users/kdodds/Developer/jest-cypress-react-babel-webpack/src/utils.js",
    hash = "11d29cc5894ffec96585bad5b940d9b13baa3ea3",
    Function = function () {}.constructor,
    global = new Function('return this')(),
    gcv = "__coverage__",
```

This coverage data is particularly of note. It stores the `path` to our file, as well as this `statementMap`, which will have an entry for every single one of our statements in our file.

```js
coverageData = {
    path: "/Users/kdodds/Developer/jest-cypress-react-babel-webpack/src/utils.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 23
        }
      }
    }
```

It also has a `fnMap`, which as an entry for every function in our file -- in our case, that's only one, the `getFormattedValue` -- and a `branchMap`, which will have an entry for every branch.

```js
fnMap: {
      "0": {
        name: "getFormattedValue",
        decl: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 26
          }
        },
        loc: {
          start: {
            line: 1,
            column: 54
          },
          end: {
            line: 14,
            column: 1
          }
        },
        line: 1
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 1,
            column: 34
          },
          end: {
            line: 1,
            column: 52
          }
        }
```

Branches are special, because it also has this `locations`, which is an array of the `start` and `end` of all the `locations` of these branches. We have a `default-arg`, which you can see right here. That's a branch.

```js
type: "default-arg",
        locations: [{
          start: {
            line: 1,
            column: 45
          },
          end: {
            line: 1,
            column: 52
          }
        }]
```

We also have this `if` statement, which in this case, has two `locations`.

```js
type: "if",
        locations: [{
          start: {
            line: 10,
            column: 2
          }
```

![image showing the two locations for the if statement](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907434/transcript-images/egghead-analyze-jest-code-coverage-reports-if-statement.png)

Because we have the `if` here, and then there's an `else` case, which doesn't exist. If this `if` doesn't run, then that `else` case will be taken automatically, and so on, and so forth, including condition expressions, which is this ternary right here.

#### Output
```js
formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0]
```

With that in place, that coverage object has the property `f` for functions. It will increment that first `function` in the `fmMap` any time this `function` is run.

### utils.coverage.js
```js
function getFormattedValue(value) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (cov_2e1x39rbgn.b[0][0]++, 'en-US');
  cov_2e1x39rbgn.f[0]++;
  var formattedValue = (cov_2e1x39rbgn.s[0]++, parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  })); // Add back missing .0 in e.g. 12.0
```

That's how it knows that this function is run three times, because this `f[0]++` will be incremented every single time this `getFormattedValue` is run.

![image showing the place where we see that the function is run thrice](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907435/transcript-images/egghead-analyze-jest-code-coverage-reports-run-3x.png)

The same goes for this `if (match)`. It adds an else case for us, so that it can keep track of the else case in this `if` statement. Then in this condition `ternary` expression, it's using a `comma operator` so that it can first increment this branch.

Then the completion value of this comma operator, `(cov_2e1x39rbgn.b[2][0]++, match[1])`, will be exactly what we had in our source, so that our tests work exactly as they would in production, but they can keep track of `coverage`. Understanding this will help you analyze this `coverage` report more accurate.

```js
if (match) {
    cov_2e1x39rbgn.b[1][0]++;
    cov_2e1x39rbgn.s[3]++;
    formattedValue += /[1-9]/.test(match[0]) ? (cov_2e1x39rbgn.b[2][0]++, match[1]) : (cov_2e1x39rbgn.b[2][1]++, match[0]);
  } else {
    cov_2e1x39rbgn.b[1][1]++;
  }
```

You can understand that here, we are missing some `coverage`, and how we can get that coverage in our `tests`.