Instructor: [00:00] In this course, we're going to walk through many different aspects of Google's Puppeteer, and how we can use it to write in the end test. Puppeteer is a Node library which provides a high-level API to control Chromium over the DevTools Protocol.

[00:17] We'll start off our course by learning how to set up conditional testing with environment variables. This is helpful when wanting to run the test in headless mode or not. The raw power of Puppeteer comes from being able to have up-to-date browser to test the end results of your application.

[00:34] Within this course, there are a couple of lessons where we'll learn how to do something as basic as testing that the text within an h1 is correct, to actually stepping through a form and submitting it. We'll mimic user activity with mouse clicks, and use a library that will create random user info every time you run the test.

[00:54] We'll also test our application in an iPhone 6 view. In this view, instead of replicating mouse clicks, we'll use touchscreen events to make sure our application works in different contexts.

[01:06] Within the other lessons in this course, we will walk through situations where applications save and require document cookies for features. We'll log and test for console errors that might get thrown while stepping through different attributes, and intercept HTTP requests to test our application's error handling.

[01:25] The finale of this course is using pixelmatch, which is a pixel-level image comparison library. This entails rendering our application, taking a screenshot, and then comparing the screenshot with a previously accepted image of the application.

[01:40] Pixelmatch will compare the two and let us know how many pixels the images are off by.