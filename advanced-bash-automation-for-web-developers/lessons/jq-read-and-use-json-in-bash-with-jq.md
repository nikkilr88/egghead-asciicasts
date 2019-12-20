Instructor: [00:00] I'm going to `echo` out some JSON here. I'm going to pipe it to `jq`. I'm doing this because usually `jq` is used as a filter and usually you pipe JSON to it for processing. While you don't normally use echo with `jq`, it's useful for testing things out.

#### Terminal
```bash
$ echo '{ "foo":123 }' | jq
```

[00:14] Let's see how we access the property of `foo` here. How do we get this one, two, three? We just use this dot notation. `.foo` will access the `.foo` property. 

```bash
$ echo '{ "foo":123 }' | jq '.foo'
123
```

You can see that worked. The same works for nested values, so we can do `'.a.b'`

```bash
$ echo '{"a": {"b":123 } }' | jq '.a.b'
123
```

[00:33] Note that I'm wrapping this `jq` selector in single quotes. That's because there's sometimes special symbols in these that bash will interpret before `jq` gets a chance to see it. Let's combine `jq` with `curl` to extract the JSON value. I'm going to do a `curl` against the Github API and I'm going to see how many stars the react package has.

[00:55] First let's see what the JSON payload looks like. Actually, if you just pipe to `jq` without any selector it will just pretty print the JSON for you. 

```bash
$ curl https://api.github.com/repos/facebook/react | jq
```

We scroll up here we can see we have `stargazers_count`. 

![Stargazers](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/jq-read-and-use-json-in-bash-with-jq-stargazers.png)

That's what we're looking for. We just want to extract this value.

[01:11] Let's copy that. Then if we run this again we'll just do `.stargazers_count`. That should get it. Then I'm going to add the silent flag here to `curl` to silence some of its output. 

```bash
$ curl -s https://api.github.com/repos/facebook/react | jq '.stargazers_count'
```

Let's run that. We just get that number.

```bash
115081
```
[01:29] Let's see how we iterate through a list. For that we're going to do `.` and then `[]`. 

```bash
$ echo ['1,2,3'] | jq '.[]'
1
2
3
```

What this does is it takes each element in the array and separates it onto a new line, which may not seem very useful at first but it makes it useable by bash in a for loop or with a command like `xargs`.

[01:54] This array value iterator syntax can be combined with the property value access syntax like that. 

```bash
$ echo '[ {"id":1}, {"id":2} ]' | jq '.[].id'
```
That will get us just these `id` from that JSON. 

```bash
$ echo '[ {"id":1}, {"id":2} ]' | jq '.[].id'
1
2
```

Using the Github API again, let's do a search and pull the name property for each result.

[02:10] I have my `curl` here. For my query I'm going to look up service worker. We'll pipe that to `jq`. The JSON payload from that is going to return an object with an `items` property. That's going to be the array of the results. Then I'm going to get the `name` property from that. 

```bash
$ curl -s https://api.github.com/search/repositories?q=service+worker | jq '.items[].name'
```

Cool. We can see that these are the results for that query.

![Results](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/jq-read-and-use-json-in-bash-with-jq-results.png)