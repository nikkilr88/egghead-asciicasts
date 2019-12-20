Instructor: [0:00] One of the design considerations to think about when designing stateful CLIs is the tradeoff between frequency and recency. Let's illustrate with an example. I have here the project that I've been working on. At the top level, I have a `packages` folder. Inside of it, I have a `mycli` folder.

[0:24] I've been going back and forth between this all day. It's pretty natural that I will want to go back and forth between that and `packages/mycli`. Maybe I want to head out as well and maybe go to the `example` folder. We have that in there as well, or I'll just back out again.

[0:51] There is a CLI that I use and love called `z`. This just tracks the folders that you've visited and helps you jump straight there. I don't have to type the full file path. I can just type the folder name. It just jumps me right to that file path.

#### Terminal Input
```
z mycli
```

[1:06] I can jump right back. That jumps me to the correct folder. I can jump to the `example` folder. All of it works. I don't even have to spell out the entire thing. I can just type partial matching. It also works as advertised.

[1:30] The problem comes when I have a new folder. Let's say I'll just call this `mycli2`. I go into that. I have an extended history of going back and forth between my root directory and `mycli` folder, I've most recently gone into `mycli2`.

[1:54] What happens when I type, `z mycli`? What should happen? Should I go to the most recent entry, which maybe is the current thing that I'm working on so I want it to guess the most recent, or should I go to the most frequent entry, which more often than not I'm probably going, independent of anything else going on?

[2:19] In this case, it actually goes to the most frequent directory because the most recent directory is still new. The amount of times I've visited the most frequent directory hasn't outweighed there.

[2:32] You can see how there might have to be an algorithm to trade off frequency and recency, especially if you're guessing from a single input. You only have a history of inputs. You don't have any other context to work with. That's frequently what we're dealing with in a lot of our inputs and our suggestions.

[2:53] The [frecency algorithm](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Frecency_algorithm) was invented by Mozilla and implemented by rupa/z as well. That's the CLI that I was using. Probably the most famous implementation of it is going to be in the [Slack search box](https://github.com/sw-yx/egghead-cli-workshop/blob/lesson13-state/guide/11-frecency.md).

[3:10] Imagine there are give people called Matt in your company. All of them are sorted by alphabetical order by default. You don't talk to some of these Matts. You only want to talk to your best buddy Matt Hodgkins, who's all the way down there.

[3:26] Sorting by frequency makes sense in that you're always talking to this guy. You probably should have him up top so it's easier to select. If there's a new Matt that came along and suddenly was your buddy and you'd have to be paired with him, you probably want that to rise up faster even though maybe you've been speaking to Matt Hodgkins for the past 20 years.

[3:48] There's some nuance to that tradeoff. Fortunately, this has been formalized mathematically as frecency. There is a [npm library](https://www.npmjs.com/package/frecency) that implements this algorithm. The only thing to be aware of is that this library was designed to work in the browser. It uses the local storage API.

[4:05] In order to save files in Node, you're going to have to use an adapter that implements local storage API, like `node-localstorage`. Then you have the same behavior as well. Essentially, this frecency algorithm, once you wrap it inside of a local storage provider like `node-localstorage`, it acts exactly like conf.

#### node-localstorage Example
```javascript
const storageProviderFrecencyFilePath = path.join(app.getPath('userData'), 'frecency');
const storageProvider = new LocalStorage(storageProviderFrecencyFilePath);
new Frecency({
  key: 'people',
  storageProvider
});
```

[4:28] You `save` whenever some successful selection has been selected. Then you get, or in this case you're sorting a list of results based on whatever partial entry of a `searchQuery` that the users input. This gives you the frecency ranked list of selections.

#### Frecency Example ([Source](https://www.npmjs.com/package/frecency))
```javascript
onSearch: (searchQuery) => {
  ...
  // Search results received from a search API.
  const searchResults = [{
    _id: '57b409d4feea972a68ba1101',
    name: 'Brad Vogel',
    email: 'brad@mixmax.com'
  }, {
    _id: '57a09ceb7abdf9cb2c35818c',
    name: 'Brad Neuberg',
    email: 'neuberg@gmail.com'
  }, {
    ...
  }];

  return peopleFrecency.sort({
    searchQuery,
    results: searchResults
  });
}
```
