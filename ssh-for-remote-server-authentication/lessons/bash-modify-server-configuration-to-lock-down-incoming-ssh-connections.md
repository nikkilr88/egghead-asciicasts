Instructor: [0:01] SSH by default is fairly secure. However, there are a few configuration settings you can modify to make things even more secure. Open up the sshd configuration file located at `/etc/ssh/sshd_config`.

#### Terminal 

```bash
vi /etc/ssh/sshd_config
```
In this file, disable the ability to log in to the root user by toggling `PermitRootLogin` to `no`.

![Permit room login](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/modify-server-configuration-to-lock-down-incoming-ssh-connections-permit-root-login.png)

[0:28] If you would still like to be able to access the server with root, but don't want passwords to be used, you can also specify `prohibit-password` as the value, which will disable logins to root by password, but allow other connections with SSH keys.

![Prohibit password](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630066/transcript-images/modify-server-configuration-to-lock-down-incoming-ssh-connections-prohibit-password.png)

 You can also completely disable password authentication for the entire server by setting the value for `PasswordAuthentication` to `no`.

![Password Authentication](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/modify-server-configuration-to-lock-down-incoming-ssh-connections-Password-Authentication.png)

[0:54] Let's say you want to lock things down even further, and only allow SSH connectivity for specific users. Search for or create the `AllowUsers` directive. The value for this option is a space-delimited list of users, or user IP connection strings. In this manner, you can lock down SSH for only specific users.

![Lockdown ssh for specific users](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630066/transcript-images/modify-server-configuration-to-lock-down-incoming-ssh-connections-ssh-lock-down-users.png)

[1:17] You can also allow specific users only coming from specific IP addresses, or you can allow all users connecting from specific IP addresses. Be sure to restart the SSH service after applying updates to the configuration file by running `service ssh restart`.

![SSH ip adresses](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630066/transcript-images/modify-server-configuration-to-lock-down-incoming-ssh-connections-ssh-ip.png)