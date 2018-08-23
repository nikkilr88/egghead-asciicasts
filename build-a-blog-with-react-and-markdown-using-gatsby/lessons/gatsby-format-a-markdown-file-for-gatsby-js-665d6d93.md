Gatsby will look for Markdown files in `src/pages`, so let's go there.

I'm going to make a folder that's year, month, day, and then a slug, `2017-10-31-halloween`. We'll `cd` into the directory, and I'm going to a file `index.md`, which will be our blog post.

#### Terminal.
```html
~/my-blog >> cd src/pages
src/pages >> mkdir 2017-10-31-halloween
src/pages >> cd 2017-10-31-halloween
pages/2017-10-31-halloween >> vi index.md
```

So, the way Gatsby works is, it converts the front matter inside of a Markdown file into usable HTML data.

So, we do a seperation of 3 dashes: `---`, we'll do a `path`, which is going to be the URL we'll access the post at, and then we'll do a `date`, we'll just use a unix timestamp here, and a `title`, and we'll add an array of `tags`, and then an `excerpt`, which we'll be able to use on the homepage. And then we can write Markdown.

#### index.md
```js
---
path: "/happy-halloween"
date: "2017-10-31T03:15:59.165Z"
title: "Happy Halloween"
tags: ['holiday', 'fall', 'pumpkin']
excerpt: "Great Pumpkin, or Greatest Pumpkin?"
---

#ARRRROOOOOOOOO
It was a clear black night, a clear white moon...
```


