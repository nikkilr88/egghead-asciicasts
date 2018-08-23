# Using Angular 2 patterns in Angular 1.x Apps

![course image](https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/189/full/EGH_AngularServicesDI-2.png)

Asciicasts for [Lukas Ruebbelke's](https://github.com/simpulton) course, Using Angular 2 Patterns in Angular 1.x Apps on [egghead.io](https://egghead.io/courses/angular-service-injection-with-the-dependency-injector-di).

## Description

Services and registering service providers are an inherent part of an Angular application. It is where you should define your application logic, they keep the state of the application and allow to share that among different components.

That said, components can ask for instances of services by specifying them as parameters of their constructor functions which will then provided at runtime by Angular’s dependency injection mechanism. While services themselves are mostly just plain ES2015 classes, there are some interesting things to discover, especially when it comes to dependency injection.

We can define services at various levels within our application, which allows us to control the scope and visibility of a given service. We can furthermore alias old service definitions to new, existing services which is handy for refactoring scenarios and we also have the possibility to define so-called factory functions for fully taking control of how a given service is being constructed.

In this course we will take a closer look and walk step by step through all of these scenarios.