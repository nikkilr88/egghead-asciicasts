Instructor: [00:00] We'll start with installing the `parcel-bundler`, so add this as a dev dependency.

#### Terminal 

```bash
yarn add -D parcel-bundler
```
Then in my `package.json` I can define a script. Call this `dev` and say `parcel index.html`.

#### package.json

```json
{
  "scripts": {
    "dev": "parcel index.html"
  },
  "devDependencies": {
    "parcel-bundler": "^1.9.7"
  }
}
```

Create that `index.html` with the default template exclamation point then tab.

#### index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>


</body>

</html>
```

[00:22] Down in the body, we'll say "`Hello`" and run that script,

```html
<title>Document</title>
</head>

<body>
  Hello

</body>

</html>
```

`yarn dev`, and open this here and here.

#### Terminal
```bash
yarn dev
``` 

You can see "Hello" coming from our server.
![Hello message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/setup-greensock-as-a-module-with-parcel-hello-message.jpg)

[00:35] We'll stop the server real quick and create a `script` tag of `index.js`,

```html
</head>

<body>
  <script src="./index.js"></script>

</body>
```

create that file, `index.js`. Now we can restart the server. Right now, there's nothing. If I do `document.body.innerHTML` an `<h1>Hi</h1>` shows up.

#### index.js

```js
document.body.innerHTML = `<h1>Hi</hi>`
```
![Hi message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/setup-greensock-as-a-module-with-parcel-hi-message.jpg)

[00:59] From here, I can `import` from `gsap`. I'll import `TweenMax`.

```js
import { TweenMax } from "gsap"
```

When I hit save, you'll see Parcel installs it for me. In my HTML file, I'm going to create an `<h1>Hi</h1>` here.

#### index.html

```html
</head>

<body>
  <h1>Hi</h1>
  <script src="./index.js"></script>

</body>
```

Then I can say `TweenMax.to`, use a selector to find the `h1`, set the duration for `1` second, and set the props to `100`.

#### index.js

```js
import { TweenMax } from "gsap"

TweenMax.to("h1", 1, { x: 100 })
```

[01:28] Hit save here, and you'll see "Hi" slide across the screen. Refresh, and there it goes again.
