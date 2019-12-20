In this lesson, we're going to set up the Cypress dev environment in order to make learning Cypress as easy as possible. To get started, check out the O2 Cypress Dev Environment branch. 

### terminal 
```bash
$ git checkout 02-cypress-dev-environment
```

If you use VS Code, and you used `npm install` to install Cypress, then you already have IntelliSense set up.

The reason this works is because of what VS Code calls automatic type acquisition. This can work in one of two ways. The most common way is to use this triple slash directive, `///`, which describes which types are defined in this file.

The triple slash directive isn't limited to VS Code, and works in any editor that uses IntelliSense. If want to prove that the triple slash directive is what's loading this up for us, we can comment it out. 

### actions.spec.js
```js
// /// <reference types="Cypress" />
```

Once we save it and hover over `cy.visit` it has no idea where the type definitions are found.

Let's dive in a little deeper to see where these come from. Let's comment that back in.

```js
/// <reference types="Cypress" />
```

Hover over `cy.visit` again, click Go To Definition, and see this `index.d.ts` file which we can see is located in this directory under the node_modules folder, under `cypress/types/index.d.ts`. We can also see this in the side bar.

What would happen if we moved this file from `node_modules/cypress/types/index.d` to the root of our project? 

### terminal 
```bash
$ mv node_modules/cypress/types/index.d.ts .
```

Will the IntelliSense still work? We reopen our editor and see that the file we opened before has been deleted from the disc because we moved it to the project root. If we reopen and look this up, IntelliSense is still working. Let's go to definition and see what happens now. VS Code is still able to find the typescript definition file.

As I look at it, I can tell that this installed in my `global/node_modules` folder, which means that VS Code is able to resolve either a global installation of Cypress or a local installation of Cypress to give us these typescript definitions.

Now that we've learned where the file comes from, let's go ahead and move this back to our `node_modules/cypress/types` folder. 

```bash
$ mv index.d.ts node_modules/cypress/types
```

In many editors the triple slash directive is the only way we can find type information for our Cypress files. However, in VS Code we have a global way to look these up. I'll comment this out, and we know that this means the `///` directive is no longer going to be used.

### actions.spec.js
```js
// /// <reference types="Cypress" />
```

Now let's create a `tsconfig.json` file in the root of the `cypress` directory. If you visit the Cypress docs located in the show notes, you can copy this tsconfig and paste it in. 

### tsconfig.json
```json
{ 
    "compilerOptions": {
        "allowJs": true,
        "baseUrl": "../node_modules",
        "types": [
            "cypress"
        ]
    },
    "include": [
        "**/*.*"
    ]
}
```

Now that we've configured the `ts.config`, we can still look up the `cy.visit` method, even without our triple slash directive.

There's just one more config file that we're going to want to add to the root of our project. Cypress itself accepts a lot of different configuration options. For instance, we can configure what the root URL is of our project.

If we close this out, go into our project root and add a new file called `cypress.json`, we can configure this here. We can add `baseURL` for instance, `http://localhost:5000` which is the root of our project. 

### cypress.json
```json
{
    "baseURL": "http://localhost:5000",
}
```

VS Code can even be configured to tell us which options are accepted by the cypress.json file, or if we hover over, to tell us a little bit more about what option we're configuring.

To configure this, we can go to the user settings under `json.schemas`, edit in `settings.json`, and we can see that I've already configure my editor here to do this. 

### settings.json
```json
{
    "workbench.editor.enablePreview": false, 
    "json.schemas": [
        {
            "fileMatch": [
                "cypress.json"
            ],
            "url": "https://on.cypress.io/cypress.schema.json"
        }
    ],
...
}
```

This is another configuration that's available on the Cypress documentation, and is included in the show notes.
