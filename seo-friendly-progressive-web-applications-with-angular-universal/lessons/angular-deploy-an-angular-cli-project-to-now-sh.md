Install [now.sh](https://zeit.co/now) to our project using `npm install now`

Then run `npx now login` to get an account if you haven't got one already.

Open our `package.json` we create a new key called `now` and inside that we set the property `name` with the name of our project, I will use `egghead-store`.

Next I will add an `alias` key which is an array of strings and we add the `egghead-store.now.sh`.  The last key is `files` where we define which files are going to be deployed to now. `dist`, `package.json`, `server.ts` and `tsconfig.js` which is all we need to run our server.

#### package.json
```javascript
"now":{
    "name": "egghead-store",
    "alias": [
        "egghead-store.now.sh"
    ],
    "files":[
        "dist",
        "package.json",
        "server.ts",
        "tsconfig.json"
    ]
}
```

Normally now will execute the build scripts because we will deploy an already built version of our app we can set `now-build` to `true` so it will not build the app when we deploy it to now.

We add a run script called `now` that invokes `now deploy && now alias`.

```javascript
"now-build": "true",
"now": "now deploy && now alias"
```

If we `npm run now` the project will be deployed and the alias will be linked up to our deployment.

The serverside rendered app can now be shared with others.

