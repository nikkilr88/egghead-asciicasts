Here, I have a `class Library`, with a single property `titles`, that's of type array of `string`. Right below `Library`, I am creating a `new` instance of that class. This very simple, it's quite obvious that the title's array has not been initialized and it's undefined.

#### index.ts
```ts
class Library {
  titles: string[];

  constructor() {}
}
const library = new Library();

// sometime later & elsewhere in our codebase..

const shortTitles = library.titles.filter(
  title => title.length < 5
);
```

However, let's assume that our app is a lot more complex, and somewhere else in my codebase, I am trying to use my library instance to get the titles from it, and then `filter` through them.

Now, if I open up my terminal and I try to run the generated JavaScript, I get the type error saying, "Cannot read property filter of undefined." 

#### Terminal
```bash
$ node index.js
```

![image of the error in terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473672/transcript-images/typescript-make-typescript-class-usage-safer-with-strict-property-initialization-terminaloutputerror.png)

I'll close the terminal and go to my `tsconfig.json` options.

In TypeScript 2.7, there's a new flag called `strictPropertyInitialization`, that will warn us about these types of problems at compile time. For it to work, we'll also need to enable the `strictNullCheck` flag.

#### tsconfig.json
```json
{
  "compilerOptions": {
    "strictPropertyInitialization": true,
    "strictNullChecks": true
  }
}
```

If I go back to my file now, we'll see there's a problem on our `titles` array. What TypeScript is saying now is I can see the title's array as of type array of `string`, but the type array of `string` is different from the type `undefined`. It cannot be `undefined`.

#### index.ts
```ts
class Library {
  titles: string[]; // string[] ! == undefined

  constructor() {}
}
```

Because I don't see it being initialized anywhere, I'll have to throw an error. This is why we need to enable the `strictNullChecks` flag for this to work because it essentially enables the separation between `undefined`, or `null`, and all other types.

For a simple fix, I can add or undefined, `| undefined`, to the type declaration. Now, the error has moved to this usage point below. Because I've said `titles` might be undefined, it's not 100 percent safe to let the developer call the `filter` function on it. To fix this, I'll need to guard against undefined, and I can wrap it in an `if`.

```ts
class Library {
  titles: string[] | undefined; // string[] ! == undefined

  constructor() {}
}

// sometime later & elsewhere in our codebase..

if(library.titles) {
  const shortTitles = library.titles.filter(
  title => title.length < 5
  );
}
```

Now, this is great. By simply enabling this flag, I'm now guarded against so many potential runtime errors, but adding `undefined` checks everywhere we use instances of this class might become cumbersome. Another option is to initialize the property directly in the class to some default value. Now, I can remove the `undefined` because I know it's going to be initialized from the beginning. 

```ts
class Library {
  titles: string[] = [
    "What if?",
    "Flow"
  ];

  constructor() {}
}

// sometime later & elsewhere in our codebase..

  const shortTitles = library.titles.filter(
  title => title.length < 5
  );

```

I can also initialize it in the `constructor()`. This will also make the error go away, as we are still guaranteeing that upon initialization, all properties of this class will have been assigned.

```ts
class Library {
  titles: string[] 

  constructor() {
   this.titles = ["What if?",
    "Flow"];
  }
}
```

If there is the slightest possibility that titles might not be initialized, say for example the libraries `underRenovation`, TypeScript will notice and break compilation again. To fix this, we can make sure it gets the value in every possible branch.

```ts
class Library {
  titles: string[] 

  constructor(
    underRenovation: boolean
  ) {
    if (!underRenovation) {
    this.titles = [
      "What if?",
      "Flow"
    ];
  } else {
    this.titles = [];
    }
  }
}
```

Finally, we might be using a dependency injection `library` that we know will initialize all of these classes' properties at runtime. In that case, we can start an exclamation mark, `!`, after the properties' name. This is called the definite assignment operator. It's a way of telling TypeScript that this property will be initialized.

```ts
class Library {
  titles!: string[] 

  constructor() {}
}
```

Keep in mind that now we are back to square one regarding the compiled time protection we get from TypeScript. This is still going to throw an error. Still, at least by having to add the `!` to each property explicitly, it does make developers think extra carefully about potential unsafe usages of properties they add.

To recap, we've had to look at how enabling the `strictPropertyInitialization` flag gives us more confidence when using instance properties and eliminates a lot of potential runtime errors.

Once enabled, we can start writing classes by either initializing the properties directly, initializing them in the constructor or by adding the definite assignment operator.

```ts
class Library {
  titles: string[];
  address: string = "1 Duck Lane";
  isPUblic: boolean; 

  constructor() {
   this.isPublic = true;
  }
}
```
