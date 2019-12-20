In this lesson, I am going to show you how to use the façade pattern to abstract out the implementation details of NgRx from your component. If we look at the projects component, you'll notice that there is a lot of NgRx stuff inside of the component class.

This is fundamentally OK, but there is a way to hide some of this or hide these implementation details into a façade so that if anything changes underneath in terms of your implementation detail, then your component is oblivious to those particular details.

I was a bit resistant to this pattern at first, until I needed to migrate an existing application to use NgRx. I realized that if I use the façade pattern to stand in between the component and the state management mechanism, that I was able to go through and upgrade this in piecemeal.

After using this once or twice to do a conversion on legacy code into NgRx, I am a pretty big fan of this. You'll also notice that we've had to export bits and pieces out of our barrel roll. With a façade, we only need to export the façade. Everything else is contained within the state module.

Let's start to build this out. Inside of the `ProjectsFacade`, we're going to go ahead and start to build out the façade service. We'll go ahead and `export class ProjectsFacade`. We are going to decorate it with our metadata.

#### projects.facade.ts
```ts
import { Injectable } from "@angular/core";

@Injectable
export class ProjectsFacade {

}
```

From here, what we're pretty much going to do is mimic whatever we were doing inside of our component in the `ProjectsFacade`. This provides a nice way to pull out our queries on the store, as well as our commands back to the store.

```ts
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectFacade } from "../../projects/project.model";

@Injectable({providedIn: 'root'})
export class ProjectsFacade {
  projects$: Observable<Project[]>;
  currentProjects$: Observable<Project>;
}
```

Again, one of the nice things with NgRx is this separation of command and query. Inside of our façade, we're going to define the properties or the state that we want to pull off of the store. We will define the queries to pull that state off. We will then move our dispatch action calls into standalone functions. We'll call those directly.

Within our `constructor()`, we're going to inject the `store` and give it an appropriate type. Within the constructor body, we're going to go ahead and hydrate the projects and `currentProjects$` observable stream.

```ts
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "../../projects/project.model";
import { ProjectsState, selectAllProjects } from "./projects.reducer";
import { Store, select } from "@ngrx/store";


@Injectable({providedIn: 'root'})
export class ProjectsFacade {
  projects$: Observable<Project[]>;
  currentProjects$: Observable<Project>;

  constructor(private store: Store<ProjectsState>) {
    this.projects$ = store.pipe(select(selectAllProjects));
  }
}
```

This is exactly how we did it in the component. Everything you see here is going to be something that we've already done. We are just moving it over. From the component level, it's only going to know about the `ProjectsFacade`.

```ts
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "../../projects/project.model";
import { ProjectsState, selectAllProjects } from "./projects.reducer";
import { Store, select } from "@ngrx/store";
import { selectCurrentProject } from ".."; 

@Injectable({providedIn: 'root'})
export class ProjectsFacade {
  projects$: Observable<Project[]>;
  currentProjects$: Observable<Project>;

  constructor(private store: Store<ProjectsState>) {
    this.projects$ = store.pipe(select(selectAllProjects));
  }
}
```

We will hydrate `currentProject`. Now that we have fulfilled our query obligation, we can then go ahead and build out our placeholders for the commands or `the.store.dispatch` calls. We're going to do `getProjects`. We'll also do a `selectProject`. We'll paste in `updateProject` and `deleteProject`. We'll go ahead and just clean these up. We just need to make sure that our imports are correct.

```ts
constructor(private store: Store<ProjectsState>) {
    this.projects$ = store.pipe(select(selectAllProjects));
  }
getProjects() {
  this.store.dispatch(new LoadProjects());
}

selectProject(project) {
  this.store.dispatch(new Select Project(project.id));

createProjects(project) {
  this.store.dispatch(new AddProjects());
}

updateProject(project) {
  this.store.dispatch(new Update Project(project.id));

deleteProject(project) {
  this.store.dispatch(new Delete Project(project.id));
  
  }
}
```

There we go. From here, let's go into our top-level barrel roll. We just need to `export` the `projectsFacade`. We'll set up this `export` here. Once we do that, then we will be able to remove the bits and the pieces of the project state that we've had to expose for consumption in our projects feature. This a way to just encapsulate that, tuck that away.

#### index.ts
```ts
export { CustomersFacade } from './lib/state/customers/customers.facade';
export { ProjectsFacade } from './lib/state/projects/projects.facade';
```
Within the projects component, instead of calling the store, we are going to instead inject the façade. Where there is a `store.pipe` and we're doing those selectors, those will get replaced by essentially mapping that to the appropriate properties on our façade class. We'll go into our methods here. 

#### projects.component.ts
```ts
constructor(
  private customerService: CustomersService, 
  private facade: ProjectsFacade,
  private ns: NotificationsService) {
  this.projects$ = this.facade.projects$;
  this.currentProjects$ = this.facade.currentProjects$;
  }
```

Anywhere that we're calling `this.store.dispatch`, instead we're going to call the appropriate method on our `facade`. We can go through and start to clean this up.

```ts
resetCurrentProject() {
  this.facade.selectProject(null);
  }

selectProject(project) {
  this.facade.selectProject(project);
}
```

We'll go down here to the `getProjects`. Let's go ahead and call `this.facade.getProjects`. We'll call `createProject` on the `facade` and send in the project as the payload. We'll do the same for `updateProject` and then as well `deleteProject`.

```ts
createProject(project) {
  this.facade.createProject(project);
  this.ns.emit('Project created!');
}

updateProject(project) {
  this.facade.updateProject(project);
  this.ns.emit('Project updated!');
}

deleteProject(project) {
  this.facade.deleteProject(project);
  this.ns.emit('Project deleted!');
}
```

If we go to the top of the class, then we can see that we have all these imports that we no longer need. Let's go ahead and just clean that up. 

```ts
import { Component, OnInit } from '@Angular/core';
import { Customer, CustomersService, NotificationsService, Project, ProjectsFacade } from '@Workshop/core-data';
import { Observable } from 'rxjs';
```

This just becomes a lot simpler to work with because everything is tucked behind the `facade`.

Essentially, the `facade` class itself is just handling the queries and then the commands, as well as we were able to clean up the barrel roll and just expose the projects `facade` and none of the underlying implementation details.

Now we have a component that you could pass in any `facade`. It has no idea that under the hood we are dealing with NgRx. This is how you use a `facade` pattern in NgRx within an Angular application.
