Instructor: [00:00] SSH supports a number of functions through the use of an escape character, which by default is a tilde, `~`. Escape sequences are created by using the escape character, followed by another character that comes from a list of supported sequences.

[00:15] One of the most common escape sequences is a tilde-period. Sometimes an SSH connection will become frozen or stuck. If you type `~.`, it will automatically execute from the frozen terminal window.

(see example at `00:24` in the lesson)
![Tilde period](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/learn-use-ssh-escape-sequences-and-codes-tilde-period.png)

[00:29] Another popular escape sequence is a `tilde-control-z`. Say you wish to keep an SSH connection open, but you don't want to occupy a terminal window. You can issue a `tilde-control-z`,and that will send the SSH session into the background. When it comes time for you to reconnect to the open SSH connection, type `fg` enter.

(see example at `00:40` in the lesson)
![tilde-control-z](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630066/transcript-images/learn-use-ssh-escape-sequences-and-codes-tilde-control-z.png)