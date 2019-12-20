Now, one thing that may be concerning you right now is if when you refresh, you'll see what's called a flash of unstyled content, where it goes from the unstyled font to the styled font and the unstyled list to the styled list. I just want to reassure you that this only happens in dev mode, where the server is injecting the styles after the page loads.

To prove that, I can deploy this site now using `now`. The URL for that deployment is automatically added to the clipboard. I can just paste it in here, and you can see when I refresh here that the styles never change.

#### Terminal
```
$ now
```

[00:35] We get the styles immediately on page load or before the page loads, whereas on my dev server, if I start that up again, you'll see this little bit of unstyled content flashing, which is fine, because this is dev mode. Then, this is production mode,and you never see those styles flash.