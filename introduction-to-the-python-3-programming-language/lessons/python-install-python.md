There are several different ways to download and install Python. If you're not really familiar with the operating system you're working on, you may find it easiest to go [here](https://www.python.org/downloads/). Download the binary, and follow the instructions. You can find downloads here for OS X, Windows, Linux, and several other operating systems as well.

If you're using OS X, like I am, you may find it easiest to use `Homebrew` to install it. It's the package manager that OS X doesn't have, so you would install Homebrew by copying and pasting this command, `brew install python3`, into your terminal. 

#### Terminal
```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then installing Python comes as easy as typing `brew install python3`. I already have it installed, so that's not going to do a whole lot, but you get the idea.

```bash 
$ brew install python3
```

You'll notice that I installed `Python 3` there, and I also just glossed over the fact that there's versions available for Python 3 and Python 2 on the Python download page. I really want to encourage you to use Python 3 over Python 2. Python 3's been around since 2008, and they've released five stable versions, but it's slow to adopt because of the widespread use of Python 2 everywhere.

As a matter of fact, about any Linux distribution you fire up, or your OS X -- if that's your OS of choice -- already has Python 2 installed on it. So, it becomes really easy to just continue using Python 2, but I want to encourage you to use Python 3 unless you have a specific reason to stick with Python 2.

If you're using a Debian-based distribution, which includes Ubuntu, Python 2 is installed by default, and Python 3 is available as well, using the Python 3 alias. So you don't have to do anything to get out-of-the-box support for Python 2 or Python 3.

```bash
$ cat /etc/*release
PRETTY_NAME="Debian GNU/Linux (jessie)"
NAME="Debian GNU/Linux"
...
$ python -V
Python 2.7.9
$ python3 -V
Python 3.4.2
```

If you're using one of the Red Hat based distributions, which includes CentOS and AWS Linux, Python 2, again, is installed by default, but Python 3 is not. So, to install that, the easiest way to do it is to use the inline upstream stable package.

We'll start by installing that package with `yum install`, and then the path to the IUS package, and then we can install Python with `yum install -y`, and specify the name of the Python package which includes the release number. At the time of this recording the latest version is Python 3.6, so we'll install Python 3.6 u.

```bash
$ yum install https://centos7.iuscommunity.org/ius-release.rpm
$ yum install -y python36u 
```

After that's installed, we can access Python using the `python3.6` command. We can see that it's installed, and Python 2 is still available using the `python` alias. 

```bash
$ python3.6 -V
Python 3.6.1
$ python -V
Python 2.7.5
```

Windows users are going to want to go to the [downloads page](https://www.python.org/downloads/), check the link for Windows, and then download the latest binary here, which is an executable installer. You'll just double-click it and follow the prompts.

One of the things you'll notice across all of these different environments is that `python` command refers to the Python 2, and then there was a separate command, called `python3`, that refers to Python 3.

There are some different tricks you can do to create aliases so that the alias refers to Python 3, versus Python 2. Personally, I don't do that. The reason is because I switch around to a lot of different systems, whether it's my local development environment, my staging servers, or my production servers, and that alias doesn't follow with me.

I just built the habit early on of typing python whenever I'm on Python 2, and python 3 whenever I'm on Python 3, which eliminates any possibility, or reduces the possibility for me of running the wrong version of Python whenever I'm not on a system I'm familiar with.