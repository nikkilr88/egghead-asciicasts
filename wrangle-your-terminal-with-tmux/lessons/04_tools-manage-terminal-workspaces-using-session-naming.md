Managing your tmux sessions is a lot easier if they have sensible names. In order to rename a session while you're attached to it, we can do `Control+B` and then `$`. It'll tell you here, "Go ahead. Rename your session." I'm going to rename this to be `todomvc`.

    (rename-session) todomvc

Now you can see in the status bar, it tells me that I'm in the todomvc session.

    [todomvc] 0:bash* 1:bash 2:bash-

If I detach from the session with `Control+B D`, and then do `tmux ls` again, you can see that now, the todomvc session is properly named.

    todomvc: 3 windows (created Sun Dec 18 19:03:39 2016) [84x16]

That also means that now I can attach to it and call it with `-t` and then the session's current name.

    ~/Mucking/todomvc (master)$ tmux attach -t todomvc

 Now if I want, I can also view the list of sessions from within tmux. I do that by doing `Control+B` and then `S`. You can see right here, we now have this list.

    (0) + 2: 1 windows
    (1) + todomvc: 3 windows (attached)

 If I click zero, it'll switch me into that session. Now, I'll detach with `Control+B D`. You can also rename sessions from the command line, not from within a tmux session.

 I'm going to rename my session by typing `tmux rename-session -t`, and then the session name. I'm going to rename session two. I'm going to rename it to `scratch`. Now if I run `tmux ls`, you can see that we have the scratch session, as well as the todomvc session.

    scratch: 1 windows (created Sun Dec 18 19:18:25 2016) [84x16]
    todomc: 3 windows (created Sun Dec 18 19:03:39 2016) [84x16]

Lastly, we can create a new session with a name by typing `tmux new -s`, and then the session name. Now if we view the list of sessions with `Control+B S`, you can see we have all three of our newly named sessions available here.

    (0) + scratch: 1 windows
    (1) + third-session: 1 windows (attached)
    (2) + todomvc: 3 windows