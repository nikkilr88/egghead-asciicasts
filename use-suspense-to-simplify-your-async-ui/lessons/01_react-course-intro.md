Kent C. Dodds: [0:00] Hey, folks. My name is Kent C. Dodds, and I am super excited that you're joining me on this journey to learn all about React Suspense.

[0:06] It is pretty experimental, so there are some rough edges that you're going to be working through. But there's so much material in here of new things that you're going to want to learn about, to prepare yourself for when Suspense is stable.

[0:19] There's some really, really awesome features and things that Suspense enables, because it is so cool. It's the result of years of research and work by the React team. I am super excited for you to play around with some of these things, and get some experience with what we have coming.

[0:35] The React team has given us this experimental version of React so we can play around with things, poke it a little bit, and come up with some bugs and some use cases that they may not have thought of before.

[0:46] One of the things that I love about React in general, is that they're always applying the things that they're presenting to us internally at Facebook first, so they get some of the quirks worked out. This experimental version of React is awesome. There are some cool things that Suspense is going to enable you to do.

[1:05] In here, I show you how to get Concurrent Mode set up on your app, and how to use Suspense features like very fundamentals, like APIs you don't want to deal with, and then we build an abstraction around that to make it a little bit more palatable.

[1:20] That's the thing, nobody has shipped this stuff to production, except for Facebook. Then they had their Relay thing, and it's awesome, but not all of us can use Relay. There's no implementation for Suspense, nothing that's production-ready.

[1:34] We're playing around with things, we're making little abstractions from things. Some of these things might be a bad idea, some of them might be good ideas. This is the whole point of this course, is to experiment with this, get familiar with the ideas and the concepts and the things that it enables, and then let you run off and play around with it, give feedback back to the React team.

[1:53] I'm excited for you to join me on this journey. We're going to have a ton of fun. Let's go ahead and look at the code base here quick so you get a lay of the land, and then we'll get into the course.

[2:04] It's totally cool if you want to follow along. If you want to just watch, that's fine too, but I thought it would be useful for you to get an idea of what this project looks like. If we run npm, run start, then that's going to get the development server up and running. Let's get that window over here to where you can see it.

[2:24] We've got a bunch of exercises. You have the exercise version and the final version that you can compare. If you click on this, then it'll show you that component, in total isolation from the rest of the app. It's literally the only thing rendered on the page, pretty much. That can be useful.

[2:43] We've got extra credits for some of these as well. You can see what the extra credit is for some of these. There are lessons for each one of these extra credits that you can work through. Most of these work on this example here, where you can select a Pokémon here. The very last one of these, right here, is where we get into an actual application.

[3:06] On this one, I strongly advice you avoid the page here, because as you might be able to tell, it is a full-on app. You've got two full-on apps being rendered on a single page, and they're too big for a single page. I definitely recommend that you go to the final version of this page, and then you should be good to go.

[3:28] There are also a couple lessons where we don't go through the exercises. Instead, we go through the examples here. Here we have a preload image example. There's a link right up here. If you're running on the normal port, then you should be able to click on this link and it'll open right up in your browser.

[3:47] You can play around with these examples. We also have the fetch approach's examples in here that you can play around with, which can be useful.

[3:56] In the code here, there are a couple of things that you might want to be aware of. First of all, we have this fetchPokemon. This is where we're doing pretty much all of our work here.

[4:07] FetchPokemon, by its name, there's this arbitrary delay that you can add as another argument to fetchPokemon. You can play around with the timings of things. The delay, it makes sure that the request takes at least that long.

[4:22] Even beyond that, we are using a third-party API, but so that you can work with this totally locally if you want to, and we're not dependent on the GraphQL API, we hijack window.fetch so that we can serve everything locally. Even though we're making requests to the GraphQL API, we can serve things locally.

[4:42] The way that works is in this hacks directory here. We have this fetch.js, where we override fetch with our hacked version of fetch. This overrides any time you make a request to a URL that includes Pokemon, then it's going to parse that GraphQL request and return the specific Pokemon data.

[5:07] We've got this pokemon.json that has all of the data that we'd get from the GraphQL API. The limitation here, of course, being that we don't have all of the Pokemon, just a select few, but it's enough for our purposes here.

[5:21] That applies to most of the exercises, not all of them. There's some really nice logs in here to show you, "Hey, if you had been hitting a real server, this is the request that would have happened," or if it was a rejection, or whatever.

[5:36] Just be aware of that. If you want to restore the original fetch, then you can say, "Window.fetch.restore original fetch." It will restore fetch to its original implementation and you can make actual requests. There are a couple of our exercises where that makes a lot of sense.

[5:54] Then we also have in our fetchPokemon this fetch user. This is for the app at the very end. It also has a delay. It allows you to fetch data for a particular Pokémon. The data is right in here, you just have users by their name. It gives us their name and their color.

[6:13] Then we also have transactions for the app. Those are all stored in here. It's not actually a back end, it's just kind of simulated for the purposes of this material. Other than that, you should be good to go with this.

[6:26] All right, so now that you have an understanding of the code base where things are, let's go ahead and jump into the course material and enjoy learning all about this experimental React Suspense.
