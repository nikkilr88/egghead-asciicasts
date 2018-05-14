# Optimistic UI Updates in React

![course image](https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/193/full/EGH_OptimisticReact_Final.png)

Asciicasts for [Erik Aybar](https://egghead.io/instructors/erik-aybar) course on [egghead.io](https://egghead.io).

There are 12 transcripts, one transcript for each video.

## Description
No matter what type of app you’re building, you're going to need to fetch data, display it to a user, and enable the user to interact with and update that data. This interaction and updating phase is often asynchronous by nature which presents you, the developer, an opportunity to provide a range of differing experiences depending on the scenario. In certain cases, you can leverage what is known as optimistic UI updates for an improved, snappier user experience compared to a traditional “loading/waiting” experience. They aren’t suited for every use case, but selectively making use of optimistic UI updates throughout your application can have a big impact on the quality of user experience for relatively little cost and complexity!

In this course, we’ll walk through implementing optimistic UI updates in the real world example of liking and unliking a tweet. We'll use React's built in state and make use of extracting setState updater functions to help manage and better define our setState usages. Next, we'll account for the failure case and revert state appropriately. Last, we'll look at a simplified strategy for preventing duplicate conflicting requests.

After that, we'll work through a different use case, developing a basic list UI that enables deleting list items via clicking a button that submits an HTTP request. We’ll begin with a bare-bones implementation that blindly doesn’t account for errors or give any indication of loading. Then, we’ll look at introducing the concepts of “loading” and handling failed requests. Finally, we will refactor towards a snappier, more polished feel using optimistic UI updates and address some challenges that come along with optimistic UI updates.

## Library Version
[React](https://github.com/facebook/react/blob/master/CHANGELOG.md): 16.2.0