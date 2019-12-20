Once we have our PWA ready to deploy, we can run an audit on it with Chrome's DevTools. 

![image of the audit button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629727/transcript-images/react-do-a-pwa-audit-with-lighthouse-using-chrome-dev-tools-audit.png)

The audit tool is called **Lighthouse**. 

![image of the lighthouse interface](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630128/transcript-images/react-do-a-pwa-audit-with-lighthouse-using-chrome-dev-tools-lighthouse.png)

It can test many different aspects of a web application. We're only concerned with the `Progressive Web App` test right now. Then we'll run it, as if it were a mobile browser. We'll leave the defaults for throttling and check `Clear Storage`. Then we can run the audit. It will test the app, as if it were a mobile device. You can see it cycling through multiple modes.

![image of the cycling through modes](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630127/transcript-images/react-do-a-pwa-audit-with-lighthouse-using-chrome-dev-tools-cycle.png)

Once it's done, we get a report. First, let's look at the errors. It says that we don't redirect from http to https, which is true while we're in develop mode here. It's very important to do that in production. Most of the PWA features won't work at all on mobile devices if the site's not served through https.

![image of the audit report](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630131/transcript-images/react-do-a-pwa-audit-with-lighthouse-using-chrome-dev-tools-report.png)

Next, it mentions we don't have a background color set in the `manifest.json`. Well, we did. Create React App actually ships with the background color line there. We had to remove it, in order to make the iOS splash screen work. We'll have to skip that one for now.

The additional items to manually check and passed audits are good to review, as well. 

![image of the additional items to manually check](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630128/transcript-images/react-do-a-pwa-audit-with-lighthouse-using-chrome-dev-tools-manual.png)

You can click on one for more information. You'll get more detail and a link to even more, which links to the Google documentation about PWAs, which is quite thorough.

![image of the more detail upon clicking](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630129/transcript-images/react-do-a-pwa-audit-with-lighthouse-using-chrome-dev-tools-detail.png)

Finally, even though we ran and passed the audit, one of the really big things to remember about PWAs is that iOS, Android, and all the various desktop browsers can still behave quite differently for some of the PWA features. It's always a good idea to test your app on each browser where you plan to support it.
