Here, I have a list of `superHeros` and I have this function called `getFlyingSuperHeros` that will take all the `superHeros` and `filter` them down to heroes whose powers include `'fly'`. Then, I'm going to `export` that function and I want to write a test for that.

#### super-heros.js
```js
const superHeros = [
    {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
    {name: 'Apogee', powers: ['gravity control', 'fly']},
    {name: 'Blazestone', powers: ['control of fire', 'pyrotechnic discharges']},
    {name: 'Froozone', powers: ['freeze water']},
    {name: 'Mr. Incredible', powers: ['physical strength']},
    {name: 'Elastigirl', powers: ['physical stretch']},
    {name: 'Violet', powers: ['invisibility', 'force fields'],
    {name: 'Dash', powers: ['speed']},
    // {name: 'Jack-Jack', powers: ['shapeshifting', 'fly']}
]

function getFlyingSuperHeros() {
    return superHeros.fliter(hero => {
            return hero.powers.includes('fly')
    })
}

export {getFlyingSuperheros}
```

I got one set up right here, where I'm importing `getFlyingSuperHeros`.

I'm calling that to get a list of `flyingHeros`, and now I want to write an assertion that will expect the `flyingHeroes` to equal an array of `superHeros`. How am I going to get that array of `superHeros`?

#### __tests__/super-heros.js
```js
import {getFlyingSuperHeros} from '../super-heros'

test('returns super heros that can fly', () => {
    const flyingHeros = getFlyingSuperHeros()
    expect(flyingHeros).toEqual()
})
```

I can just go in here and manually look for things, but what I'm going to do is, I'll just `console.log` the `flyingHeros`.

```js
const flyingHeros = getFlyingSuperHeros(
console.log(flyingHeros)
expect(flyingHeros).toEqual()
```

I'll pop up in on my test, and I'll run `npm t`.

#### Error Output
![Error Output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-generate-a-serializable-value-with-jest-snapshots-error-heroes.png)

That's going to fail here, but I'm going to get my `console.log` right there, and I'll copy that. I'll paste it right into the `toEqual` there.

#### __tests__/super-heros.js
```js
import {getFlyingSuperHeros} from '../super-heros'

test('returns super heros that can fly', () => {
    const flyingHeros = getFlyingSuperHeros()
    expect(flyingHeros).toEqual([
        {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
        {name: 'Apogee', powers: ['gravity control', 'fly']}
    ])
})
```

Now, if I pop up in my test and run `npm t` again, that test is going to pass.

#### Passing Test
![Passing Test](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907430/transcript-images/egghead-generate-a-serializable-value-with-jest-snapshots-screenshot-of-test-passing.png)

Cool. Now if I run `git diff`, you're going to see exactly what I did here.

I'll go ahead and commit that, and I `git commit -am 'add assertion'`.

#### Terminal
```bash
$ git commit -am 'add assertion'
[egghead-2018/config-jest-05 8b68b87] add assertion
  1 file changed 4 insertions(+)
```

Now, let's say later on down the line, we find out, "Oh hey, Jack Jack does have powers in fact," and those include shape shifting and fly.

#### super-heros.js
```js
{name: 'Jack-Jack, powers: ['shapeshifting', 'fly']}
```

Now, I'll save that. I'm going to run my `test` again. I'm going to see this error output that says, "Hey, here is the object that is in the received value and the expected did not include that object", and so the test fails, because we didn't expect it to include that value, but we actually do want it to include the values.

#### Terminal
```bash
$ npm t
...
    Expected value to equal:
        [{name: 'Dynaguy', powers: ['disintegration ray' 'fly']},{name: 'Apogee', powers: ['gravity control', 'fly']}]
    Recieved:
        [{name: 'Dynaguy', powers: ['disintegration ray', 'fly']},{name: 'Apogee', powers: ['gravity control', 'fly']}, {name: 'Jack-Jack', powers: ['shapeshifting', 'fly']}]
...
```

Let's go ahead and we'll update our test again. I'm going to `console.log(flyingHeros)`. We'll run our test and come up here, we'll copy that and paste it here.

#### super-heros
```js
expect(flyingHeros).toEqual([
    {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
    {name: 'Apogee', powers: ['gravity control', 'fly']},
    {name: 'Jack-Jack, powers: ['shapeshifting', 'fly']}
])
```

We'll run our test again with `npm t`.

Awesome. Our tests our passing. Let's go ahead and remove that `console.log` now. We'll run `git commit -am 'jack-jack can fly!'`.

```bash
$ git commit -am 'jack-jack can fly'
```

Now, if I look at the `git diff` of the `HEAD^` previous and `HEAD` current, I'm going to see that is the change I made, and that's the impact of my change, and reviewers can review that. They'll know exactly what's going on here.

```bash
git diff HEAD^ HEAD
```

#### git diff
![git diff](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907433/transcript-images/egghead-generate-a-serializable-value-with-jest-snapshots-git-diff-head.png)

This process of copy paste update the assertion. It's kind of arduous and a little bit more worth than necessary. Let's take things a couple of steps back and see how our snapshots with Jest can make things a little more straightforward.

We're back with our list of `superHeros` that does not include `'Jack-Jack'`, and we haven't need our assertion yet. Instead of console logging, I'm going to do `expect(flyingHeros).toMatchSnapshot`.

#### super-heros.js
```js
import {getFlyingSuperHeros} from '../super-heros'

test('returns super heros that can fly', () => {
    const flyingHeros = getFlyingSuperHeros()
    expect(flyingHeros).toMatchSnapshot()
})
```

We'll save that and pop up in our terminal, and run our test. We'll see that we have one snapshot written.

Let's take a look at that snapshot. This snapshot assertion actually creates a new file in our file system under a `__snapshots__` directory, and with the same name as the test file with the `.snap`.

This is actually just a regular JavaScript module that add some properties to `exports` and the property value is a string. The string contents is the serialized version of the object that we're snapshotting.

#### super-heros.js-snap
```json
exports[`returns super heros that can fly 1`] = `
Array [
    Object {
        "name": "Dynaguy",
        "powers": Array [
            "disintegration ray",
            "fly",
        ],
    },
    Object {
        "name": "Apogee",
        "powers": Array [
            "gravity control",
            "fly",
        ],
    },
]
`;
```

In our case, we're taking flying heroes and serializing that into this string. It pretty prints it, so we know exactly what type of objects these are and the values of these properties. So a snapshot is an assertion that lives in two places. It lives here while you write the assertion, and the actual value it lives in the snapshot file. For this reason, you need to make sure that you commit your `__snapshots__` directories to your source control. I'm going to open up my terminal here and I'm going to look at the `git diff`. We'll see that assertion here, but also if we look at the `git status`, we're going to see that were not tracking the snapshot file. I'm going to go ahead and `git add .` everything. Then I'll `git commit -am 'add assertion'`. Now, let's take a look what happens when we come down and say "Hey, Jack Jack can actually shape shift and he can fly."

#### super-heros.js
```js
{name: 'Jack-Jack', powers: ['shapeshifting', 'fly']}
```

Let's take a look at what happens to our snapshot when we run our test again with `npm t`.

This error output looks very familiar. It actually looks exactly like it did before when we're doing the actual `toEqual` assertion. It saying that the received value does not match the stored snapshot returns `superHeros` that can fly.

#### Received Value does not match snapshot
![Received Value does not match snapshot](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-generate-a-serializable-value-with-jest-snapshots-does-not-match-assertion.png)

We'll scroll down here and we can look right here the `Snapshot Summary`. "1 snapshot fail from one test suite. Inspect your code changes or run `npm test -- -u` to update them".

What it saying here is that your assertion is now breaking. You need to update your assertion or fix your code. That's the same thing that you'd have, if you had a normal assertion. In our case, this is an intended change. We're going to update our assertion, but instead of doing a `console.log` and a copy paste, I can actually do as it suggesting here to `npm test -- -u` to run Jest with the update flag, and that will update my snapshot for me.

```bash
$ npm test -- -u
...
PASS src/other/__tests___/super-heros.js
  > 1 snapshot updated.
...
```

Now if I look at that snapshot, I'll see it's adding this `'Jack-Jack'`. Now if I look at the `git diff`, this is what people are going to see when they see my pull request.

#### git diff
![git diff](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-generate-a-serializable-value-with-jest-snapshots-git-diff.png)

We'll see that the snapshot was updated to add `'Jack-Jack'`, and we'll see in the source code. This list was updated to add `'Jack-Jack'` as well. This change made this impact. That's one of the nice things about `snapshots` is its really easy to see this impact that your changes are making on the rest of the code base.

Let's go and write a test for this `CalculatorDisplay` React component and use a snapshot to verify its structure. I'm going to add a new file on here called `calculator-display.js`. I'll just go ahead and paste a test in here.

We're going to use `react-testing-library`, the `render` method here and we'll pull in the `CalculatorDisplay`, and we'll render `CalculatorDisplay` with a default `value` of `0`. That's the `value` that it will display. Then, our `container` is what we're going to be snapshotting. Let's go ahead and `console.log(container.innerHTML)`.

#### calculator-display.js
```js
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render} from 'react-testing-library'
import CalculatorDisplay from '../calculator-display'

test('mounts', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  console.log(container.innerHTML)
})
```

If I pull up my test and I run `npm t`, then we'll see that `console.log` HTML right here.

#### console.log
![console.log](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-generate-a-serializable-value-with-jest-snapshots-npm-t-result.png)

We could actually snapshot `container.innerHTML`, but the problem with that is any change to any of these attributes would negate the entire snapshot would be harder to read diffs of the snapshot.

It would be nice, if we could have them formatted. Well Jest has built in the capability of serializing and formatting DOM nodes. Let's go and take advantage of that. We're going to expect the `container` which is a DOM node `toMatchSnapshot`.

#### calculator-display.js
```js
expect(container).toMatchSnapshot()
```

Now, if I run my test again, I'm going to see that one snapshot was written.

```bash
$ npm t
...
    Snapshot Summary
        > 1 snapshot written from 1 test suite
```

Let's pull that up. Here, it's been serialized and formatted. If we make any changes to the `value` here, if we add another `span` in the JSX, we're going to see those updates right here. Let's go ahead and take a look at that.

I'm going to add a `span` right here. We'll put the `AutoScalingText` in there.

#### calculator-display.js
```js
<span>
    <AutoScalingText>{formattedValue}</AutoScalingText>
</span>
```

We'll run our test again, and we'll see a snapshot diff right here saying, "Hey, this is a little bit different. You're going to need to go and take a look at that."

#### Error Message
![Error Message](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-generate-a-serializable-value-with-jest-snapshots-import-snapshot.png)

Let's take a look at what happens, if I change this `div` to have an `id`. Here, I go down here, add a `id="hi"`,

#### calculator-display.js
```js
<div
    id="hi"
    {...props}
    css={{
        color: 'white',
        background: '#1c191c',
        lineHeight: '130px',
        fontSize: '6em',
        flex: '1'
    }}
>
    <AutoScalingText>{formattedValue}</AutoScalingText>
</div>
```

and we'll run our test again, and Jest sees that difference and shows us what's going on right here. The last step to this is our snapshot assertion is happening in two places. We need to make sure that we're adding test as well as the snapshot file to our git history, so that as changes are made, people can see those changes in git. `git add .` and we'll look at our `git status`. We have these two new files that we'll commit, `'test calculator-display'`. One last thing that specific to `react-testing-library` is the `container` is actually `div` and it will always be a div.

```bash
$ git add .
$ git status

$ git commit -am 'test calculator-display'
```

If you only have one child that you're rendering, then it doesn't actually make any sense to snapshot that diff. You could actually snapshot the `firstChild` which will be the root node of the thing that you're rendering. For us that's this `div` here.

#### calculator-display.js
```js
expect(container.firstChild).toMatchSnapshot()
```

That way your snapshot would be a little less nested. If I now run `npm t -- -u` to update my snapshot, I can take a look at my snapshot.

```bash
npm t -- -u'
```

Now, it's less nested, and only includes the stuff that's specific for my component that I care about.