Let's say I have two interfaces, one for `Admin` and another for a normal `User`. I have a `function redirect`, that accepts an object as an argument that can be either an `Admin` or a `User`.

#### index.ts
```ts
interface Admin {
  id: string;
  role: string: 
}
interface User {
  email: string;
}

function redirect(usr: Admin | User) {
  if(/**)
}
```

Now, if the user is an `Admin`, I want to redirect to a specific `routeToAdminPage` on my page and pass in this admin-only property. Otherwise, I want to use the normal route and pass in just the `email`, which is a `usr`-only property.

```ts
function redirect(usr: Admin | User) {
  if(/*user is admin*/) {
    routeToAdminPage(usr.role);
  } else {
    routeToHomePage(usr.email);
  }
}
```

Now, what can we write in here to have it pass only if the `usr` is an `Admin`? We can ask TypeScript to assume that the `usr` is an `Admin` and then check if a specific admin-only property is defined on it -- in this case, the `role`.

```ts
function redirect(usr: Admin | User) {
  if((<Admin>usr).role !== undefined) {
    routeToAdminPage(usr.role);
  } else {
    routeToHomePage(usr.email);
  }
}
```

Even though we can tell visually that this line of code will only get executed if the `usr` is an `Admin`, TypeScript can't make that inference, and it's throwing an error because it still can't be sure that our object is an `Admin`. It thinks it might still be a `usr`, and `usr` doesn't have a role property on it.

![image of the error message on role](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473670/transcript-images/typescript-use-the-javascript-in-operator-for-automatic-type-inference-in-typescript-error.png)

I can also create a custom type guard right below our `redirect` function. If this returns true, then the `user` is an `Admin`. That fix our problem.

```ts
function redirect(usr: Admin | User) {
  if((<Admin>usr).role !== undefined) {
    routeToAdminPage(usr.role);
  } else {
    routeToHomePage(usr.email);
  }
}

function isAdmin(usr: Admin | User): usr is Admin {
  return (<Admin>usr).role !==undefined
}
```

If I hover over `usr` in `routeToAdminPage`, you can see TypeScript knows it's an `admin`. But that might become a bit too much if we start creating these functions every time we need TypeScript to infer types based on simple properties.

There is, of course, a third option. The JavaScript `in` operator is useful for checking if specific properties exist on objects. In this case, all I want to check if the property role exists on my argument.

```ts
function redirect(usr: Admin | User) {
  if("role" in usr) {
    routeToAdminPage(usr.role);
  } else {
    routeToHomePage(usr.email);
  }
}
```

Since TypeScript 2.7, the compiler will now start to infer the type of an object in a block that wraps a condition containing the `in` operator. In this case, TypeScript will essentially think, "OK, so my input can only be of type admin or user."

If it passes that `if` condition, that means it has the `role` property on it. Out of `Admin` and `user`, the only type that includes the `role` property is `Admin`. That means in this `routeToAdminPage` block, it must be `Admin`. We can confirm that by hovering over it.

![image of the hover showing parameter and usr](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473671/transcript-images/typescript-use-the-javascript-in-operator-for-automatic-type-inference-in-typescript-hoverin.png)

This is great. All of the errors went away now, both in the first block and in the second else block. If I want to use `usr` for something else here, you can see I only get suggestions for admin properties, which is `id` and `role`. 

![screenshot showing the ID and role suggestions](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473668/transcript-images/typescript-use-the-javascript-in-operator-for-automatic-type-inference-in-typescript-suggestions.png)

Also, because I marked my argument as either an admin or a user, and since we confirmed that if it goes in the `if` block it's an `Admin`, that means that it's only going to go in the `else` block if it's a `usr`.

We can confirm this by trying to access some properties on it. We can see that I now only get user properties. 

![image of the hover showing email (property)](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473669/transcript-images/typescript-use-the-javascript-in-operator-for-automatic-type-inference-in-typescript-hoverinemail.png)

I only get `email`. TypeScript will keep making this intelligent inference in all of our logic branches.

To recap, we've seen how TypeScript can confer the type of an object based on conditions. While custom type guards work great for that purpose, they might add unnecessary indirection to our code, so we can use the JavaScript `in` operator to both check if a property exists on an object and to hint to the TypeScript compiler about the type of that object.
