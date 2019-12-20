Taylor Bell: [00:00] I'm in the My Blog directory, and I'm going to add a few posts. I'm going to do `cd src/pages`. Then, I like to do posts with the year, month, date, and a slug. I'll create a few of those. With those made, I'm going to create an `index.md` file in each one of the directories, which will be where our post is. With those made, let's go ahead and edit the first post.

#### Terminal
```
$ cd src/pages 
$ mkdir 2018-07-21-first-post
$ mkdir 2018-07-22-second-post
$ mkdir 2018-07-23-third-post
$ touch 2018-07-21-first-post/index.md
$ touch 2018-07-22-second-post/index.md
$ touch 2018-07-23-third-post/index.md
$ vi 2018-07-21-first-post/index.md
```

[00:24] At the top of each post, we'll create some front matter, which is what will be used to create our posts. We'll add a few dashes. We'll start with a `path: "/firstpost"`. Then, we'll do a `date:`.

[00:35] We'll do year, month, day. Add a `title`, add some `tags`, and a little excerpt. Then, close out our three dashes. Below this, we can start writing our post. Go ahead and follow this same pattern for all posts that you create.

#### index.md
```
path: "/first-post"
date: "2018-07-21"
title: "My First Post" 
tags: ['this', 'that']
excerpt: "A preview of my first post" 
---
Lorem ipsum. 
```