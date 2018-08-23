Kent C. Dodds: 00:00 Hi. My name is Kent C. Dodds, and welcome to the Advanced React Component Patterns course. The goal of this Advanced React Component Patterns course is to give you the concepts and ideas you need to make your React component simpler, more flexible, and more enjoyable to work with.

00:13 For the whole course we'll center everything around a simple `<Toggle>` component, a component that manages the state of a boolean. We'll keep it as simple as possible so you can focus your attention on the incredible patterns that you'll be learning without being distracted by domain-specific knowledge of a complex example.

00:28 Even though the example is simple, what you'll be learning are powerful patterns that I've used to simplify and enhance reusable components that I have open-sourced and shipped to production for real-world applications.

00:39 Most of the patterns you'll learn are implemented in my popular open-source library, Downshift, which is the basis of my learning and experience of these patterns for building highly flexible and reusable components.

00:49 Some of the patterns we'll discuss enable UI flexibly and control like render props, compound components, and the provider pattern with React's official context API. Other patterns enable flexibility and control of component logic and state like controlled components and state reducers, just to name a few.

01:04 You can mix and match each of these patterns to give your components the level of flexibility that is required for your use cases. By working with the same basic `<Toggle>` component, you'll be able to quickly identify the differences and trade-offs of each of these patterns.

01:17 Having built and shipped components that implement each of these patterns in production, I can tell you, you have some really awesome stuff to look forward to in this course. The things you learn in this course aren't just useful for highly reusable open-source components.

01:29 I found these patterns to be great ways for separating concerns in my one-time-use application components as well. Many of these patterns allow you to build primitive building blocks with highly flexible APIs upon which you can build opinionated components with simpler APIs.

01:43 The benefit to this is that users of these components can often use the simpler API for common-use cases. If they need to have more flexibility, they can use the base primitive component, which is more capable of handling their use case.

01:55 I encourage you to take notes, think about the React components you are working on, and see how you could integrate these patterns into those components.

02:02 I can't wait to hear about the awesome things you build with this knowledge.