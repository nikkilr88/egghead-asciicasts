Install the **Angular CLI** with `npm install -g`, for globally, `angular-cli`. 

**Terminal**
``` bash
$ npm install -g angular-cli
```
Give that some time to install, and then you'll have a command called `ng`, where you can say `ng new` and the name of your project. I'm going to name mine `angular2-fundamentals`. Once that has run, you can change into that directory, `angular2-fundamentals/`. Once you're in this directory, if you type `ng serve` and hit enter, that's the Angular CLI command to start up a server with the project you just installed.

Once this is ready, you'll see that the bundle is now `VALID`. So this server is available on `localhost:4200`. So let that run, and you'll see `app works`. 

**Browser**
``` 
app Works
```
To change this, you can go into your project. Just open it in any editor. This angular 2-fundamentals directory, go into `src/app/app.component.ts`, and you'll see this `app works`. You can change this to whatever you want. I'm going to change it to `Let's get started!`

Hit save, and you'll see the browser will automatically refresh, and you'll see `Let's get started!`

**Browser**
``` 
Let's get started!
```