Instructor: [00:00] Connection attempts are logged to `/var/log/auth.log`.

#### Terminal

```bash
vi /var/log/auth.log
```
Open that file and you will be able to see authentication attempts to the server, including the user that tried to log in, the IP address of the connection attempt, the port used, and other information.

![Authentication attempts](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630066/transcript-images/monitoring-and-auditing-ssh-connection-attempts-authentication-attempts.png)

[00:20] Type `lastlog`.

```bash
lastlog
```

This command will show you the most recent login attempt for all users.

![Login attempts](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630066/transcript-images/monitoring-and-auditing-ssh-connection-attempts-login-attempts.png)

 To find the last login for a specific user, type `lastlog-u`, followed by the username.
 
```bash
lastlog -u mark
```

You can use a combination of monitoring rights to the `offlogfile`, along with the `lastlog` command, as tools in your arsenal to audit or monitor SSH connection attempts.

![Specific user logins](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630066/transcript-images/monitoring-and-auditing-ssh-connection-attempts-specific-user-logins.png)

[00:46] If you are concerned that someone has accessed the server with a specific username, you can log into that user account and view their Bash history file. This `.bash_history` file within a user's home directory will contain every command that was ever executed within a Bash prompt.

```bash
vi ~/.bash_history
```

 You can use this history of executed commands to further scrutinize any possible unauthorized SSH connection attempts.

![Bash history](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/monitoring-and-auditing-ssh-connection-attempts-bash-history.png)