Instructor: [00:01] The scp or secure copy command is very similar to the cp or copy command. It allows you to copy files to and from a remote host.

[00:11] Start by echoing `foo` to a file named `bar.txt`.

#### Terminal 

```bash
echo foo > bar.txt
```
To use the secure copy command to copy the file to the remote host, type `scp` followed by the file you wish to copy, in this case `bar.txt`. Then specify your username @remotehost connection string, and suffix it with a colon.

```bash
scp bar.txt mark@myhost.com:
```
[00:32] After the colon is where to tell scp where to copy the file to on the remote host. In this case, copy it to the home directory.

```bash
scp bar.txt mark@myhost.com:~/bar.txt
```
 By default, `scp` will use your default SSH key to connect to the remote host. To specify a different SSH key or identity, use the `-i` flag followed by the location of your SSH private key.

```bash
scp -i ~/.ssh/another bar.txt mark@myhost.com:~/
```
[00:56] If the remote SSH server is bound to a port other than the default port 22, you can specify a `-P ` flag, followed by the port number, in this case `2022`. You can also copy entire folders recursively with the `-r` flag.

```bash
scp -i ~/.ssh/another -P 2022 bar.txt mark@myhost.com:~/
```
[01:13] Let's make a `foo` folder, then create a `bar.txt` file within the `foo` folder. We can then recursively copy the entire `foo` folder with the `-r ` command.

```bash
mk dir foo

echo baz > foo/bar.txt

scp -r foo mark@myhost.com:~/bar.txt
```
 To copy a file or a folder from a remote host back to the local host machine, specify the remote connection string first followed by a colon, and then the location of the file or folder on the remote host you wish to copy.

```bash
scp mark@myhost.com:~/
bar.txt
```
[01:40] The second parameter is where on our local host machine you wish to copy the file to, with `./` being the current directory and a new file name if you wish.

```bash
scp mark@myhost.com:~/bar.txt ./new.txt
bar.txt
```