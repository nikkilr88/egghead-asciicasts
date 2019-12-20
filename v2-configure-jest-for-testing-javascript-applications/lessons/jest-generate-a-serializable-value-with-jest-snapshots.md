Instructor: [00:01] Here, I have a list of superheroes from "The Incredibles." I have this getflyingsuperheroes function that's going to take that list, filter it down to the heroes whose powers include fly. Then, I export getflyingsuperheroes.
```js
function getFlyingSuperHeros(){
  return superHeros.filter(hero => {
    return hero.powers.includes('fly')
  }
}

export {getFlyingSuperHeros}
```

Now I want to test this function. I'm going to verify that it returns the superheroes that can fly.

[00:17] In `__test__/super-heros.js`, I've got my flying heroes, and I'm going to expect the flying heroes to equal an array of all the heroes that can fly. How do I get that array? I can go to the super-heros.js file and manually figure out which ones are going to be returned or I can come in here Or, I can console.log(flyingHeros).

```js
import {getFlyingSuperHeros} from '../super-heros'

test('returns returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros()
  console.log(flyingHeroes)
  expect(flyingHeros).toEqual([
  ])
})
```


[00:33] With that, I'm going to `npm t` to run my tests. I'll get that log in the terminal. I'm going to copy the log. We'll paste it in our `toEqual` assertion right there. Get rid of that console.log now. Let's go ahead and run our test to make sure that assertion passes. 

```js
import {getFlyingSuperHeros} from '../super-heros'

test('returns returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros([
  expect(flyingHeros).toEqual([
    {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
    {name: 'Apogee', powers: ['gravity control', 'fly']},
  ])
})
```

Indeed, it does, so now, we're going to look at the git status.

[00:52] We've got a new test in here. Let's `git add` all the things, `git status`. There it is, our Superhero test. We'll `git commit -am add assertion'`. With that, I can move on with my day. Life is good. Later on, somebody finds out that, "Jack-Jack, he does have powers. He can shapeshift, he can fly, and who knows what else that kid can do."

[01:14] Now we're going to run `npm t` again because of that change. Our test is going to pass. This is the output we're going to get in the terminal. We have this object that has the name Jack-Jack and the powers here.

[01:25] We need to add Jack-Jack to our output. To do this, of course, we're going to come back into `__test__superheros.js`. We'll add a console.log(flyingHeroes) again. We'll run our tests again with that console.log, `npm t`. Run those tests.

```js
import {getFlyingSuperHeros} from '../super-heros'

test('returns returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros()
  console.log(flyingHeroes)
  expect(flyingHeros).toEqual([
    {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
    {name: 'Apogee', powers: ['gravity control', 'fly']},
  ])
})
```

[01:40] We've got our console.log. I can now come in here, copy the new output with Jack-Jack, and we'll paste it right insid e of `toEqual([])`. We'll get rid of the console.log, and `npm t` again. Our assertion is passing, awesome. We'll `git status` there. We'll `git commit -am "jack-jack can fly!"` because we're super excited about this.

```js
import {getFlyingSuperHeros} from '../super-heros'

test('returns returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros()
  console.log(flyingHeroes)
  expect(flyingHeros).toEqual([
    {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
    {name: 'Apogee', powers: ['gravity control', 'fly']},
    {name: 'Jack-Jack', powers: ['shapeshift', 'fly']},
  ])
})
```

[02:03] Now, when we make a pull request, here's our diff of the last commit we just made. 
```bash
git diff HEAD^HEAD
```

In the terminal, we can see that we made this change to our test. This is the reason that change was made. Seeing the change and then the impact of our change is one of the values of the test that we're getting right here.

[02:21] This manual process of console logging this, copy/pasting the assertion is pretty arduous. It would be nice if we could make the computer do all of that for us. That's exactly what snapshots do. Let's go backward in time a little bit and see what this would be like with snapshots.

[02:35] We have that list of heroes. We have then `getFlyingSuperheroes`. Here's our test file. Now, instead of console logging this and copy/pasting it, what I'm going to do is I'm going to say, `expect(Flying Heroes).toMatchSnapshot()`.

```js
import {getFlyingSuperHeros} from '../super-heros'

test('returns returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros()
  console.log(flyingHeroes)
  expect(flyingHeros).toMatchSnapshot()
})
```

[02:46] We're going to make that assertion there. We'll run `npm t`. That runs our test. We're going to get this output, "One snapshot written." It gives us a summary of all the snapshots for our whole test suite.

[02:57] Let's take a look at what happened here. This snapshot I was talking about is this snapshots directory that appears right next to the file that has the toMatchSnapshot assertion in it. That file ends in .snap.

[03:09] Here, we have an export for return superheroes that can fly 1. It's our test name, and then the first snapshot that is in that test. Here is the output for that snapshot. What Jest is doing is it takes the object that we pass to the assertion, and it serializes it into a string and saves that string into this file.

[03:31] Part of the serialization process is giving a label to these. It's not like a JSON stringify. It's giving a label to each one of these objects so that it's more clear what these things are. We have basically the same output that we had when we copy/pasted, except we didn't have to do this manually.

[03:47] Let's go ahead and add all of the things and commit all of them with add assertion. 

```bash
git add .
git commit -am 'add assertion'
```


Now we go on with our day, but then somebody comes around and says, "Hey, Jack Jack can fly." Let's enable that by uncommenting.

[03:59] We go back in here. We run `npm t` again. We're going to get a similar output as we had before with a copy/paste solution, except here it says that the snapshot and the received value do not match. It gives us a pretty similar output that we had before where this is the new stuff.

[04:17] Down here is a difference. It says, "Inspect your code changes or run npm test - - - u to update them." Them is referring to the snapshot. Because our code changes are correct, we actually want to do the updating of the snapshot. We'll run npm tests - - -u to update all of our snapshots.

```bash
npm tests -- -u
```

[04:37] That simply runs Jest with a -u flag which will update the snapshots. Now our tests are passing. It says, "One snapshot updated." Let's take a look at our snapshot.

[04:47] In super-heroes,js.snap, Jest updated this for us. A snapshot is an assertion that lives in two places, the assertion living in the `test()`, and then the actual snapshot value living in the .snap file. You're going to want to commit this file to src control.

[05:01] One of the problems with snapshots though is that they can get very long and, having them live in a separate file, makes it harder to review. What I'm going to do is, instead of `toMatchSnapshot()`, I'm going to run `toMatchInlineSnapshot()`.

[05:14] With that, I'm going to run `npm t`. Here, I'm actually going to get a test failure. We'll take a look at that in a second. The snapshot now appears right inside my code. Jest actually updates my test code for me automatically, so I can get that assertion right in here.

[05:30] Almost like I copy-pasted the output except I don't have to do that myself and I have the -U flag that I can use to keep this updated as things change. The nice thing about having an inline is that I don't forget about the snapshot and I'm naturally encouraged to keep that snapshot smaller, which is a good thing.

[05:46] The reason that our test failed is because we have an obsolete snapshot, and that's this snapshots directory in this snap file. It's saying, "Hey, there's no longer a two-match snapshot assertion, but there was before." You either need to add that snapshot assertion back or remove this. Jest will help us remove it.

[06:03] If we run `npm test -- -u`, that will actually automatically delete this snapshot. We can manually delete the snapshot directory as well. With that, we have a assertion that we can keep updated really easily with the `-u` flag and we get the same benefits of a nice git div as if we were maintaining this assertion manually.

[06:23] Let's see how snapshots apply to DOM nodes. I'm going to test this calculator display component(in the calcualtor-display.js file). I'm going to stick the test right here, by creating calculatordisplay.js. I'll just paste in the test right inside that file. I've got my container that I'm getting back from the render of calculator display. The container's a dominode, so I can go console.log(container.innnerHTML).

```js
import React from 'react'
import {render} from '@testing-library/react'
import CalculatorDisplay from '../calculator-display'

test('renders', () => {
  const {container} = render(<CalcualtorDisplay value="0" />)
  console.log(container.innerHTML)
})
```


[06:46] With that, I can run `npm t` here. I'm going to get that HTML output. I could take a snapshot of this, but this is actually all a single line. Any change and any attribute or anything on this dominode will invalidate the entire line of the snapshot, which isn't very nice.

[07:02] What's cool is that jest has built in the capability of snapshotting and serializing dominodes. In `__test__/calculator-display.js`, we can just say, "expect(container)toMatchInlineSnapshot." 

```js
import React from 'react'
import {render} from '@testing-library/react'
import CalculatorDisplay from '../calculator-display'

test('renders', () => {
  const {container} = render(<CalcualtorDisplay value="0" />)
 expect(container).toMatchInlineSnapshot()
})
```

Now, I can run `npm t`. That will take the snapshot of the dominode and serialize it into well-formatted HTML.

[07:23] Because we're using inline snapshots, that's going to get stuck right into our test file automatically by jest. I should add here that when you're using `toMatchInlineSnapshot()`, you are required to have Prettier installed in your project because jest is updating the code in your test file and it wants to make sure that it doesn't change more than it has to with regard to your formatting. If you don't have Prettier installed, then you have to use  `toMatchSnapshot()` 

In shared/calculator-display.js, let's take a look at what a failure would be like. I'm going to add an ID of calculator display. Now, if we run `npm t`, we're going to get a failure because we've added this attribute to our div.

```return
<div
{...props}
id="calculator-display"
css={{
  position: 'relative',
  .
  .
  .
  flex: '1',
}}
```

[07:59] Your output in the termianl is going to be simply snapshot and received. Anything with a plus and that is red is going to be the new received value. If we want to get this updated, then we'll come down here, run `npm t -u`. That will update our snapshot automatically with that new attribute.

[08:20] Run review to make this work. We simply take that container that we get from react testing libraries render. We pass that to expect and call  `toMatchInlineSnapshot()` and just automatically adds the serialized version of that dominode to our assertion.
