Instructor: [00:01] As cool as it is that we're able to run all of our linting and all of our other projects in here, it might get a little bit noisy as we're working on and developing our code base. It'd be really nice if I could say, "Hey, I'm in the middle of watch mode. I only want to run the client test."

[00:15] We can do that with `npx jest --config test/jest.client.js`, but like, "No, I don't want to have to do that every single time." It'd be a lot cooler if I could just dwell in watch mode, say, which projects I want to have selected. The cool thing about watch mode is that it is plugable.

[00:35] We're going to NPM install and save as a dev dependency our Jest watch select projects module. 

```bash
npm install --save-dev jest-watch-select-projects
```

I bet you can guess what this does. We're going to go to jest-common.js. I'm going to add our watch plugins. Here, we're going to say Jest watch select projects. That module is a Jest watch mode plugin.

```js
moduleNameMapper: {
  '\\.module\\.css$': 'identity-obj-proxy',
  '\\.css$': require.resolve('.style-mock.js')
},
watchPlugins: ['jest-watch-select-projects'],
}
 ```

[00:57] Now, if I run `npm t` to run my test, I'm going to have a new command from that plugin. Press capital P to select projects. It's saying, "Currently, all of them are selected." Let me turn on A to run all of my tests, so I'll hit A.

[01:11] Now, we're going to hit a capital P and I'm presented with this UI where I can have these selected projects. Space disliked, return to submit. I'm going to say space to disable length and space to disable server. We're going to leave the client on.

[01:27] Now, I hit enter and it only runs my client project test, which is awesome. Now, if I want to say, "Hey, I want to run the utils file", I hit `P` then `utils`. I was only running the test for that utils and I can really focus in on what I'm working on at the time.

[01:44] In review, what I needed to do was I installed our plugin Jest watch select projects under package JSON. Then I configured that in our Jest common, which is being used by our Jest config and actually pretty much all of our other Jest configurations.

[02:00] I added watch plugins to our Jest common, which is being used by the Jest config, which is referencing these projects. We can enable and disable each one of these projects during our watch mode. To do that, we hit a capital P as noted here. It tells us how many of these are selected. I hit a capital P and I can enable and disable as many of these as I want.
