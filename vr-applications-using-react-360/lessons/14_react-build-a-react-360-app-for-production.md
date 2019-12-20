Instructor: [00:00] We have finished our React physics application. We would like to build it and enter this into production. In order to do that, I add `npm` on the bundle inside of your product directory. This is going to take a while.

```bash
npm run bundle
```

[00:10] Once this is done, we're going to get a new build folder inside of our product directory. If you have static assets inside of our application, and we do, we need to copy `static_assets` to the build directory.

```bash
cp -rf static_assets build
```

[00:22] Once this is done, we can run our production build. I'm going to create a new http server inside of the build directory.

```bash
http-serve build
```

I'm just going to copy this URL to the browser. We can see the result over here. We have a production version of our application.

`See 0:30 in the lesson`
![Running production](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/build-a-react-360-app-for-production-running-production.png)

[00:34] If you take a look inside of the console, we're going to see that it is a production build because development of the warning are off, and performance optimizations are on. We can safely go ahead and deploy this build to a production environment.
