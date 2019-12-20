Right now we have three tmux windows open. You can see this is zero, this is one, and this is two.

I could quit this tmux session by killing all of them, but that seems a little bit like overkill. I want to keep these around so that I can come back to this session later.

In order to detach from this session and leave it running in the background, I type `Control+B D`. That will detach. It says, "Detached from session 0 right here."

    (todomvc)$ tmux attach
    [detached (from session 0)]
    (todomvc)$

I can start tmux again with `tmux`. You'll see I'll be in a different session. If I want to get out of this session, I can also do `Control+B D`. Now it says, "Detached from session 2."

    (todomvc)$ tmux
    [detached (from session 2)]
    (todomvc)$

I've made a couple of tmux sessions and detached from them. They're still running in the background. In order to get back to them, I can type `tmux attach`. This will bring me back to my most recent session. If I detach from it again, we're back on my normal command line, not in a tmux session.

    (todomvc)$ tmux attach
    [detached (from session 2)]
    (todomvc)$

I can type `tmux ls`. This will tell me which sessions are currently running. These sessions are currently named session zero and session two. tmux ls will give us some useful information which will hopefully help jog our memory so we can remember what was actually going on in those sessions.

    (todomvc)$ tmux ls
    0: 3 windows (created Sun Dec 18 19:03:39 2016) [84x17]
    2: 1 windows (created Sun Dec 18 19:18:25 2016) [84x17]
    (todomvc)$

Session zero has three windows. We can see the date and time at which it was created. Session two only has one window, and was created at a different time. Now we can reattach to a specific session by typing `tmux attach -t` and then the session name. Let's go back to session 0. There we go. We've resumed this session.

One of the great things about tmux sessions is that they will persist even if you accidentally close out of them. For example, let's close the terminal window here. Now if I open a new terminal window and run `tmux ls`, you'll see that my sessions are still there. I can reattach and resume working, even though I accidentally closed the session.