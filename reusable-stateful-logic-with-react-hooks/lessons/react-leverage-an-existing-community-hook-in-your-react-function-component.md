Instructor: [00:00] We'll start up our dev server and run a little React app. It uses the deprecated battery status API. That still exists in Chrome at the moment. Let's take a look at the code. We'll open the playground function component. The majority of the code has been extracted out in a custom React hook called `useBattery`.

[00:21] With the announcement of the hook's proposal, several sites have cropped up that keep a list of community-developed custom hooks that have been created so far. One such site, called [Collection of React Hooks](http://nikgraf.github.io/react-hooks), created by Nik Graf, lists hooks from various sources in a searchable.

[00:37] If we search for battery, there's a community custom hook already created that we could use. You could also find ones for local storage, for document title, and much more.

[00:47] In this case, let's replace our custom hook with the one listed here from `react-use`.

![Collection](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-leverage-an-existing-community-hook-in-your-react-function-component-collection.png)

If we come back into our code and open the integrated terminal, we could `npm install react-use`. Once installed, we can `import { useBattery } from "react-use"`.

[01:07] As long as our APIs are the same, we should be able to delete our custom hook. It should just work. We could also delete the import for `useState` and `useEffect` since those are now encapsulated in the community hook. 

#### Playground.hook.js
```javascript
import React from "react";
import Battery from "./Battery";
import { useBattery } from "react-use";

export default function Playground() {
  const battery = useBattery();
  return (
    <section>
      <Battery {...battery} />
    </section>
  );
}
```

Now, if we kick back up our dev server, we'll see on the right that, sure enough, it works as it did before.

[01:30] Next, let's see if we could find a community hook for our to-do list app. We'll switch our app to run our to-do list. Do you see how the title updates if there are incomplete to-dos? Let's see if we could replace our custom `useDocumentTitle` hook with one from the community.

[01:47] The code for this is in the `TodoList.hook.js` file. Let's try `importing useTitle as useDocumentTitle` so that it matches what we already had from react-use. 

#### TodoList.npm.js
```javascript
import { useTitle as useDocumentTitle } from "react-use";
```

Then we could go down and delete our version of the custom hook. If all goes well, title should still update as we mark off items. Sure enough, it does. Yay for community reuse!
