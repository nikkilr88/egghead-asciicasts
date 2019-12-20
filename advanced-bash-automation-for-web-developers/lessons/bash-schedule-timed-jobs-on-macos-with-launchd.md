Instructor: [00:00] First, let's write our script to be run on a schedule. I'll create that. Note that I'm just in my users home folder here. You can put your script wherever you want. I'll go ahead and give execute permissions. Let's open that script. 

[00:16] The first thing we'll want to do in here is do the Bash shebang at the top. If we don't have that, then `launchd` won't know how to execute our scripts. 

#### empty-trash.sh
```bash
#!/bin/bash
```

I'll use AppleScript to empty the trash. This is the equivalent of opening the trash folder and clicking that Empty button.

```bash
#!/bin/bash

osascript -e 'tell app "Finder" to empty'
```

[00:33] Let's configure our job now. I'll create a new file and call it `local.empty-trash.plist`. There's some reasoning behind that name, which I'll explain shortly. A `.plist` file is an XML-formatted file. It's an XML format that Apple came up with. There's quite a bit of boilerplate involved in it. I'm going to go ahead and paste that. 

#### local.empty-trash.plist
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
   
</dict>
</plist>
```

[00:50] Our main configuration is going to go in this `dict` or dictionary element here. I'll do a `key` here. We'll do our `Label` first. The way that these plist files work is that there's a `key` elements followed by the value below it. The value specifies the type.

[01:10] For our `Label` here, I'm going to do the same as our file name. Technically, the `Label` and the file name can be anything. It just has to be unique across your system. By convention, it's in this reverse domain name syntax, which is a common convention in a lot of Mac OS things.

```xml
<dict>
    <key>Label</key>
    <string>local.empty-trash</string>
</dict>
```

[01:27] Next, let's add the `<key>ProgramArguments</key>`. That's value will be an `array`. In that `array`, we're just going to have a `string`, which is the file path to the script that we're going to execute. 

```xml
<dict>
    <key>Label</key>
    <string>local.empty-trash</string>
    <key>ProgramArguments</key>
    <array>
      <string>/Users/cameronnokes/cron_empty-trash.sh</string>
    </array>
</dict>
```

[01:40] Next, we'll do the scheduling. For that, we're going to do `StartCalendarInterval`. The value of that is going to be a `dict`. We'll do `Weekday`. I want my script to run every Monday, so Monday is a `1`, Sunday is a zero, etc. I want it to run at 10:00 AM. Note that these are integer types.

```xml
<dict>
    <key>Label</key>
    <string>com.cameronnokes.personal.empty-trash</string>
    <key>ProgramArguments</key>
    <array>
      <string>/Users/cameronnokes/cron_empty-trash.sh</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
      <key>Weekday</key>
      <integer>1</integer>
      <key>Hour</key>
      <integer>10</integer>
    </dict>
</dict>
```

[02:04] Let's jump back to our terminal. In your home folder, there's the `Library`, and there's a `LaunchAgents` folder. If we list it out, we can see there's some other applications, job configurations in here. We're going to move our file into this folder. 

![Library](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-schedule-timed-jobs-on-macos-with-launchd-library.png)

[02:22] All agents in this folder are loaded at start-up automatically. To manually load it and activate our job, we'll call the `launchctl` commands. We'll say `load`, and we'll pass our `.plist` file here. 

#### Terminal
```bash
$ launchctl load ~/Library/LaunchAgents/local.empty-trash.plist
```

Now our job is loaded and active. To verify that, I'll call the `list` commands, and this lists out all active jobs. There'll be a lot of jobs in that list, so I can `grep` for our local string there. Cool. 

![List](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-schedule-timed-jobs-on-macos-with-launchd-list.png)

[02:50] When you see here's our job, and it's loaded and active. I still have a few days before it's Monday, so let's kick it off manually. First I'll bring up my trash. You can see there's just one image file in there. Let's kick off our job manually. 

[03:03] To do that, we'll use the `kickstart` subcommands. Then we have to pass our job's identifier, which is a weird string. We do `gui`. We'll use the `$UID`, global environment variable. This is our user's ID. Then we'll pass the label of our job. 

```bash
$ launchctl kickstart gui/$UID/local.empty-trash
```

We run that, and then let's check our trash. It's empty, so it works. Awesome.

[03:26] If we decide that we don't like our job anymore and we want to unload it, we use `launchctl unload`, and we pass our `.plist` again. Then if we list out them all and we'll grep for it, we'll see it's not there. Our job is unloaded and it won't ever be run. We can always reload it again and see that it's back.

[03:46] `launchd` has lots of possibilities and configuration options. We just scratched the surface of what it's capable of. Check the `launchd` documentation to see what they all are.
