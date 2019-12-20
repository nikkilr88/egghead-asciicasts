00:00 Netlify will rebuild our website whenever we push new code, but we also want to trigger the rebuild whenever we do content changes. We can do that using what's called **webhooks**. Let's go to deploy settings, and in build hooks, you can click add build hook. Let's call this `Contentful` and hit save.

![Save web Hook as Contentful on master branch in Netlify](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190182/transcript-images/egghead-trigger-netlify-builds-when-content-changes-in-contentful-save-hook.png)

00:28 We grab this URL and go to Contentful. In there, we go into settings, webhooks, and we add webhook. This one, we'll call it `Netlify`. We will paste our URL in here, and we select specific events that will trigger this rebuild.

![Add Netlify Hook hook in Contentful](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/egghead-trigger-netlify-builds-when-content-changes-in-contentful-netlify-hook.png)

00:53 We want that whenever we publish a new `Entry`, a `Content Type`, or an `Asset`. We can go to `Publish` and check these. Also, for `Unpublish` and `Delete`. Let's hit save, and to test our webhook, we can go to the content. Go to this lesson.

01:23 Let's change something. Let's remove this question mark, and we hit publish.
Now, when we go back to Netlify, and go to deploys, you can see that here, it's triggered by Contentful. Now, it's rebuilding our website.

![Rebuilding website shown in netlify with "building" tag](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190184/transcript-images/egghead-trigger-netlify-builds-when-content-changes-in-contentful-rebuilding.png)

01:50 When we preview this, we should see the new content reflected in the website.

![Change Reflected in contentful production site](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/egghead-trigger-netlify-builds-when-content-changes-in-contentful-change-reflected.png)
