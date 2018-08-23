# Progressive Web Applications with Angular Universal

![course image](https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/173/full/EGH_Angular-Universal_1000.png)

Asciicasts for Bram Borggreve's course on [egghead.io](https://egghead.io/courses/seo-friendly-progressive-web-applications-with-angular-universal).

There are 13 transcripts, one transcript for each video.

## Description
In this course we will create an Angular application that will serve as a public website. Normally there are quite a few trade-offs by using a Single Page Application for a public website. For instance, they are hard to index by search engines and if you link to them on social media you get a generic preview. Also, the initial rendering can take a while (especially on mobile devices) as the browser has to pull in all the JavaScript in order to render a working app.

By adding and configuring Angular Universal we add Server Side Rendering capabilities to our application. This helps prevent the issues mentioned above by pre-rendering the application on the server and serving this out to the user when she requests the app. Once the JavaScript has been loaded the app will seamlessly switch over to a ‘normal’ web application.

For good measures and to modernize our application we will add and configure a Service Worker that will allow for a native-like experience in the browser (splash screen, desktop icon, fast load, cached data, etc).
