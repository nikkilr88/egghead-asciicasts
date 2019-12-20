[00:01] Let's make a `npx-node` folder, and add some `Javascript`. 

#### Terminal
```
mkdir npx-node && cd $_
```

Here, we'll create an object `literal` with two properties, `one` and `two`. Then we'll console a new object, spreading the contents of `a`, and adding a `three` property. Then we'll redirect this to an `index.js` file.

```javascript
echo "let a = { one: 1, two: 2 }; console.log( { ...a, three: 3 } );" > index.js
```

[00:21] If we use `Node` at this point to execute our `Javascript`, we'll get an object with properties `one`, `two`, and `three`. Now, I am using a newer version of `Node` that understands the `object spread` feature, but we can use `NPX` to alter the version of `Node` that we use when running our script.

```
node index.js
{ one: 1, two: 2, three: 3}
```

[00:38] Let's run `npx -p node@8.2.1`, and tell it to execute our `index.js` file. 

```
npx -p node@8.2.1 -- node index.js
```

Now, `Node` version 8.2.1 did not yet have support for `object spread`. It makes sense why we would get an unexpected token error at the `...a` location.

[00:55] However, we could try that command again, but this time, we'll update the `Node` version to 8.3.0 which is when `object spread` was added. Sure, indeed, it works as expected. 

```
npx -p node@8.3.1 -- node index.js
{ one: 1, two: 2, three: 3 }
```

This particular trick could come in handy if you need to try out code with various versions of `Node`.
