Instructor: [00:00] First, let's set up a few variables that we'll need. We need the `current_branch` that we're on. For that, we'll use the `git rev-parse` command. Then we're going to do the `username`. I'm just going to initialize that to an empty string.

[00:14] We're going to do the same for `title` and `password`. 

#### open-pr.sh
```bash
current_branch=$(git rev-parse --abbrev-ref HEAD)
username=''
title=''
password=''
```

Then I'm going to create a `usage` function. I'll use this to output the usage of this script, with all of its options. I'll use this in several locations, so it makes sense to encapsulate this in a function.

[00:30] Do `echo Usage`, and then our script's name is `open-pr`. We do `username`, and then `password` or an access token. Next, we have `t`, which would be the `title` of the PR, and the rest of the arguments passed to the scripts will become the body of the PR.

```bash
current_branch=$(git rev-parse --abbrev-ref HEAD)
username=''
title=''
password=''

usage() {
  echo "Usage: open-pr [-u <username>] [-p <password/token>] [-t <title of the PR>] <body of the PR>"
}

```

[00:48] Now, let's set up our `getopts`. Do `while getopts`, and then I'm going to disable the default error handling that `getopts` gives you for an unknown option. We start with a colon, and then we'll do `u` for the username, like we have here, and that expects a value, a `p` for password, which also expects a value. The title of the PR, there.

[01:10] Lastly, I'm going to add an `h` option, which will be used to get help. 

```shell
while getopts ':u:p:t:h' opt; do
```

Now, let's set up handlers for each of our options. For the `username`, we will just set the `username` variable that we created up here to the `$OPTARG` variable. The value that's passed to this `u` option will be set in the `$OPTARG` variable, and we just copy it over to `username`, here. We do the same for `password` and `title`.

[01:37] Now, for our `help` option, we'll `echo` out the `usage`. We'll just invoke this `usage` function, and then we'll `exit`. Then, for our unknown option case, we'll `echo` out `invalid option` with the `$OPTARG` that was passed. Then we'll direct that to standard error. 
We'll `echo` out `usage` again, and we'll also direct that to standard error. We'll `exit` with a one status, which is an error status.

[02:03] OK, let's close this `case` statement. 


```bash
while getopts ':u:p:t:h' opt; do
  case "$opt" in
    u) username="$OPTARG";;
    p) password="$OPTARG";;
    t) title="$OPTARG";;
    h)
      usage
      exit
    ;;
    \?)
      echo "Invalid option $OPTARG" >&2
      usage >&2
      exit 1
    ;;
  esac
done
```

Then we'll want to shift off all of our processed options. We'll do `shift` `OPTIND` minus one. 

```bash
shift $((OPTIND - 1))
```

Now, let's do some input validation. First off, for the sake of convenience, I'm going to enforce that you have to be on the branch that you want to open a PR for.

[02:21] Right here, I'm going to make sure that the `current_branch` is not `master`. If it is equal to `master`, we're going to throw an error. If you're already on `master`, we're going to say, create a new branch, push it, and then run the script.

[02:35] Then we're going to `echo` that out to standard error, and then exit with an error status.

```bash
if [[ $current_branch == 'master' ]]; then
  echo "You're already on master, create a new branch, push it, and then run this script" >&2
  exit 1
fi
```
Next, we want to make sure our `username`, `password`, and `title` are all set, that they're all not empty. I'm going to write a quick helper function to do that.

[02:50] Here, I'm going to say, if empty, so if it is empty we're going to say error when you say it `must be set`. We're going to `echo` that out to standard error again. `usage` is going to get echoed out to standard error, as well, and then exit with a one status here.

```shell
check_is_set() {
  if [[ -z $2 ]]; then
    echo "ERROR: $1 must be set" >&2
    usage >&2
    exit 1
  fi
}
```

[03:05] Let's use this `check_is_set`. Through the `check_is_set`` username`, and then our `username` variable. I'm going to do the same thing for `password` and `title`. 

```shell
check_is_set "username" $username
check_is_set "password" $password
check_is_set "title" $title
```

We can see this first parameter here is just for the string in here that goes right here. It's just a formatting thing. The `username` variable is what is actually checked here.

[03:31] Now, lets put together our `curl` against the GitHub API. I'm going to do `curl`, we'll do silence, and then for the credentials that we passed through the request we're going to use the `user` option here. This is going to do basic authorization. All we have to do is pass it the `username` and `password` in this format. 

[03:52] Then `curl` will handle basic C forwarding it and putting it in the right header. We're going to do a `POST`, and then our URL here. This is a GitHub repository that I've already set up. That goes in the URL here. Then it's the `pulls` resource.

```bash
curl -s --user "$username:$password" -X POST "https://api.github.com/repos/ccnokes/git-automation-sandbox/pulls" 
```

[04:09] Now, we're going to pass our `data`, and let's set up that variable now. This is going to be a JSON string. For that, I'm going to use a Bash trick to get a multi-line string. Here goes our JSON string. The first parameter we'll do is `title`. That's just going to be the `title` that the user passed to our script.

[04:29] Next, we have `base`. This is the base branch that the PR is going into. We're just going to set that to `master`. The `head` is the branch that we are PRing. That's going to be the `current_branch` that we're on. Lastly, we have the `body`. This is just the body text of the PR. For that, we're going to do the rest of the input passed to this script, the rest of the parameters passed.

```shell
data=$(cat <<-END
{
  "title": "$title",
  "base": "master",
  "head": "$current_branch",
  "body": "$@"
}
END
)
```

[04:55] This works because all the flags, all of the options, have to come first. After we're done processing them, we shift them off. Whatever's left just becomes the body. 
Next, we're going to tell it to write out just the `http_code`. This tells `curl` to return the HTTP status code. We'll see how this is used better in just a second.

[05:20] Lastly, we're going to tell it to take the output and send it to `dev/null`, because we don't want to see any of the output. Lastly, we're going to store the return value of this in a variable, called `status_code`. This `curl` is simply going to return this. Just the HTTP code will be stored in this variable. 

```bash
status_code=$(curl -s --user "$username:$password" -X POST "https://api.github.com/repos/ccnokes/git-automation-sandbox/pulls" -d "$data" -w %{http_code} -o /dev/null)
```

[05:42] That allows us to check it and make sure it's what we expect. In here, we're going to say, if the status code is `201`, then everything worked, and then, if not, we have an error. Here. we'll say, error occured, and then we'll exit with an error status.

```bash
if [[ $status_code == "201" ]]; then
  echo "Complete!"
else
  echo "Error occurred, $status_code status received" >&2
  exit 1
fi
```

[06:01] Let's go back, got to fix a typo. OK, that's it. Now, let's test it out. I'm going to jump over to my terminal here, I'm already on a new branch. I'm just going to commit my changes, push that to the origin.

[06:15] Also, my project here, my script is in this `bin` folder, so I'm going to say, `bin/open-pr`, and I'm going to pass my `username` on GitHub, and then my `password`. I have an environment variable, which is a GitHub access token. For the `title` I'll say, `add pr script`, and then the body.

[06:37] OK, let's run our script and see if it works. 

![Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-create-a-bash-script-to-open-a-pull-request-on-github-using-getopts-example.png)

Now, let's check GitHub. OK, cool, and we can see our PR was opened here, with our title, and that was the body we passed. Awesome, looks like it worked.

![Github](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-create-a-bash-script-to-open-a-pull-request-on-github-using-getopts-github.png)