Instructor: [00:00] (Tip: to get full use of this lesson, you are going to want to watch the video.) Xstate-viz is an online tool for visualizing our state machines. Here, I have already made the light ball machine. It allows you to write any state machine, the code panel on the right, and see it visualizes on the left.

[00:12] Not only is the visualization helpful, but it's interactive. We're able to test out our machine manually by clicking the various events on the left. I can click toggle from the unlit state to go to the lit state, toggle to go back, and break to go to broken.

[00:27] I can hit reset at any time to reset the machine. As we go further in the course, we'll discover other features of the visualization as well. There're two other tabs on the right panel that are useful to us.

[00:39] The first is the state tab. This tab gives us information regarding the current state of our machine. It provides us an object with a value. If we had context, actions, and more, it would say that information as well.

[00:52] The second tab is the event tab. We're able to call events here as well. Anything available to the current state notice made into a button here on the bottom right. Notice that there's break and toggle for the unlit and the visualization and break and toggle down here.

[01:08] What is useful about the event panel is that we can pass along extra information on our events, then we can with just a string represent a transition target.

[01:16] For example, I might want to send the break event, but I also might want to indicate what location, the light ball was in when it broke. We can send the event by clicking the send button and it'll get added to the history of events called.

[01:29] We can actually toggle this open and we can see that we call the type break and we added the information location leaving room. We're able to replay or edit any event that we want and we could see timestamps of when they were called.

[01:41] Lastly, if we're logged in like I am, we can save our machine definition as a gist. Notice that the URL has been appended with a gist query prem. The string is the ID of our gist. We could see it by going to gist.githug.com/klyeshevlin in the ID.
