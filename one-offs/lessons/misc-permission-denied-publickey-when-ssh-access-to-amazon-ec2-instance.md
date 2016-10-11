There are two main reasons that can cause this error message.
```bash
ssh 10.0.2.119
Permission denied (publickey)
```

Trying to use the wrong `SSH key` or trying to use the wrong `username`. I'm going to cover both scenarios in this lesson.

Let's start with the wrong `SSH key`. Each `EC2` instance has an `SSH key` that is authorized to connect. You can see which key by using the `EC2 console`. For example, the instance you see on the screen uses the key pair named will button. I have to have that key in order to connect.

If I don't have it, there's a couple of options. I can recreate this `EC2 instance` from scratch with a key pair that I do have. Or I can shut the instance down, move the `EBS volume` to an instance that I can access, and modify the Authorized Keys file to accept the key that I do have.

Most of the time though, this error is because you didn't specify the right key when you were trying to connect. By default, the SSH client uses a key named `ID_RSA` in `~/.ssh` directory of your home folder. As you can see in this case, that's not the correct key. I need to specify the correct key in my connection string.

I switch back to the console prompt and I can specify the right key using a `-i flag`. Specify -i and then the path to the key, followed by the IP address of the server. 

```bash
ssh -i ~/.ssh/willbutton 10.0.2.119
Permission denied(publickey)
```

I still got `Permission denied (publickey)`. That's because of the second common issue that causes this error.

I didn't specify the right username. If you don't specify otherwise, SSH assumes that the username is the one that you're logged in to the local computer as. We can see that I'm logged in as Will. 

```bash
whoami
will
```

That's not the correct username for my `EC2 instance`.

The question is, what is the right username? The answer is it depends. It depends on what distribution and AMI image was used to launch the instance.

If you launched an `Amazon AWS Linux instance`, the username is `EC2`. If you launched an `Ubuntu instance`, the username is `Ubuntu`. If you launched a `Debian instance`, the username is `admin`. If you launched a customized `AMI` from the `AWS marketplace`, you'll probably need to consult the documentation for that image to get the correct value.

If you're not sure, you can get a hint by clicking the `AMI ID link` for that image. In my case, you can see that it's an Amazon Linux instance, my username is going to be EC2. Let's try our SSH command again. We'll specify the -i, followed by the path to our private key. This time, specify the username and then the IP address of the server. 

```bash
ssh -i ~/.ssh/willbutton ec2-user@10.0.2.119
```

Boom, like magic, I'm in there.