Hello, and welcome to the series on how to build an Angular 1 application in an Angular 2 style. Angular 2 introduced a lot of new approaches and ideas on how to write Angular applications, which quite frankly, caught a lot of developers off-guard.

Angular 2 simply did not look like anything that Angular 1 developers were used to writing. With new tooling, syntax, and even a new language, via TypeScript, a lot us had to go back to the drawing board, and learn Angular all over again.

The upside is that the majority of these changes were architectural in nature, and the main pieces have been back-ported to Angular 1. My favorite part is how Angular 2 really brought *component-driven development* to the forefront of how we architect applications.

It is the cornerstone for building large, non-trivial apps that are not only predictable, but scalable. This approach works really nicely in Angular 1.x with the introduction of module.component.

In this series, we are going to revisit our old friend, Eggly -- the trusty bookmark manager -- and build it from the ground up using a component-driven approach.

We are going to learn how to load modules and assets using Webpack. We'll see the basic structure of a component, how to build components using the new .component syntax, how to approximate inputs and outputs using isolated scope to create smart and dumb components, how to use component lifecycle hooks within our controllers, and what that means.

We'll also see how dependency injection works in ES6, and how to test components using the new component controller, provided by [?] Mocks. Now I'm going to start at the `00-start branch` and build our application from there.

**terminal**
```bash
git checkout 00-start
```

You can follow along. Or if you want to jump to a specific lesson, then you can check out the corresponding lesson branch and you'll be immediately caught up to wherever we are. You can see these branches here.

**terminal**
```bash
git branch
```

By approaching our Angular 1 applications in an Angular 2 style, we immediately reap the benefits of best practices and a better architecture. It also sets the stage for a streamlined upgrade in the future, which is a nice side effect indeed