Instructor: [00:00] Let's take our dynamically created `form` object here and make it more usable. As well, we would like to render different kind of `input` fields, so that I would like to have is something like a `type="number"`, which we could use, for instance, for displaying our age property here.

#### dynamic-form.component.ts
```html
<div *ngFor+"let prop of personProps">
  <input type="text" [formControlName]="prop">
  <input type="number">
</div>
```

[00:17] Basically, a number field doesn't allow to enter texts, but only numbers and test arrow down and up keys, as well. Let's see how that could work.

[00:25] First of all, let's take import an `Input` property, 

```ts
import { Component, Input, OnInit } from '@angular/core';
```

and we want here an `@Input` from the outside, such that our dynamic form component is more reusable. Now let's simply take this object here, which will then be passed from the outside.

```ts
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  @Input() formDataObj;
  personProps = [];
  ...
}
```

[00:41] Let's go to our `app.component.ts`, place it in there, and again connect it with our dynamic form. 

### App Component
```ts 
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Dynamic reactive forms in Angular</h1>
    <app-dynamic-form [formDataObj]="person'></app-dynamic-form>
  `
})
export class AppComponent {
  person = {
    firstname: 'Juri',
    age: 32,
    surname: 'Strumpflohner',
    twitter: '@juristr'
  };
}
```

You also need to make some adjustments in `dynamic-form.components.ts`, so basically, that person now is called `formDataObj`, and if we save again, we should be fine.

### Dynamic-Form Component
```ts
ngOnInit() {
  const formDataobj ={};
  for (const prop of Object.keys(this.formDataObj)) {
    formDataObj [Prop] =new FormControl(this.person[prop]);
    this.personProps.push(prop);
  }
```

[00:58] In order to render different kind of input fields, we need to expand a little our `person` object here. We cannot have a single value here, but rather, we have to describe how our `firstname` property of our person looks like.

### App Component 
```ts
export class AppComponent {
  person = {
    firstname: {
      'Juri'
    },
      age: 32,
      surname: 'Strumpflohner',
      twitter: '@juristr'
  };
}
```

[01:12] First of all, we will definitely have a `value`, which will remain just the same. Then we could also add a `label` which says something like `Firstname`, which we could display within our form. Finally, we have the `type` which defines which kind of input type we are going to render on our HTML.

```ts
export class AppComponent {
  person = {
    firstname: {
      label: 'Firstname',  
      value: 'Juri',
      type: 'text'
    },
      age: 32,
      surname: 'Strumpflohner',
      twitter: '@juristr'
  };
}
```

[01:30] Same thing holds here for our `age`, but this time, the `type` will no more be text, but it will be `number`. Let's simply cut out the other ones.

```ts
export class AppComponent {
  person = {
    firstname: {
      label: 'Firstname',  
      value: 'Juri',
      type: 'text'
    },
    age: {
      label: 'Age',
      value: 32,
      type: 'number'
    },  
  };
}
```

[01:42] As you can see, our input object here for our form changed, as we have now a sub-object, and no more flat object properties here. Let's jump inside `dynamic-form.component.ts`, and we need to slightly adjust how we process our `formDataObj`.

[01:58] First of all, you have to account here for the sub-object, so basically, this one will return as the inner object here. Rather than to accessing it directly, we have to access here the `value`, which will then now display again the `value` property on our form.

### Dynamic-Form Component
```ts
ngOnInit() {
  const formDataobj ={};
  for (const prop of Object.keys(this.formDataObj)) {
    formDataObj[Prop] = new FormControl(this.person[prop].value);
    this.personProps.push(prop);
  }
```

[02:15] After that, we need to take a look at our `personProps` array and adjust it slightly, as well. Right now, what we push in is the entire object, so we push in basically that inner piece, the `firstname` in `app.component.ts`, which, however, is hard to process within our template.

[02:30] Rather, what we would like to have is something like an array, where the properties are structured as follows. We need basically a `label` to create the HTML label inside our form.

```ts
formDataObj[Prop] = new FormControl(this.FormDataObj[prop].value);
/*
  firstname: {
    label: 'Firstname',
    value: 'Juri',
    type: 'text'
  }
*/ 
```

[02:43] We don't need the `value`, as it will be bound by the Angular data binding, but we also need the `firstname` property here, which we simply map as a `key`. That won't be needed in order to properly bind it to our form.

```ts
formDataObj[Prop] = new FormControl(this.FormDataObj[prop].value); /*
  firstname: {
    key: firstname,
    label: 'Firstname',
    type: 'text'
  }
*/ 
```

[02:57] This is the end result which we desire to have in our `personProps` here, so let's change this slightly, and basically map it to the `prop` structure which we'll like.

```ts
formDataObj[Prop] = new FormControl(this.FormDataObj[prop].value);
/*
  {
    key: firstname,
    label: 'Firstname',
    type: 'text'
  }
*/ 
         
this.personProps.push({
  key: prop,
          
});
```

[03:06] The `key` is simply the property which we are currently processing. Then we have the `label`, where we access the `label` property, and similarly for the `type`, we access the `type` property. Great.

```ts
this.personProps.push({
  key: prop,
  label: this.formDataObj[prop].label,
  type: this.formDataObj[prop].type
});
```

[03:20] Let's now jump into our `template` above here. What we can do as a first step is to render our `<label>`, as we now have the necessary information, so we can simply do `prop.label`. You also need to adjust here the binding to `prop.key`.

```html
<div *ngFor="let prop of personProps">
  <label>{{ prop.label }}</label>
  <input type= "text" [formControlName]="prop.key">
</div>
```

[03:35] As you can see, the label rendering property works, so we have it in front of our input field, but the type rendering doesn't yet work. That's because we also have to bind basically on the `input type` here, and simply specify `prop.type`.

```html
<div *ngFor="let prop of personProps">
  <label>{{ prop.label }}</label>
  <input [type]= "prop.type" [formControlName]="prop.key">
</div>    
```

[03:49] As you can see here, we have a number input field, and we can use the arrow keys to go up and down. Also, entering text won't work.