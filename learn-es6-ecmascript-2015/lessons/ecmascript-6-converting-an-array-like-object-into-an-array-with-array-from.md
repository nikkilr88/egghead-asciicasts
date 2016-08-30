Here we have a list of `prices` that belong to `products` inside of a `store`. We'd like to highlight the `prices` that are less than $10, and we don't have access to the server code to be able to do that on the server. So we're going to do it with **JavaScript** on the **client**. Let's grab our `products` and store them in a variable called `products`, and we'll do that by saying `document.querySelectorAll('')`, and we know that each of these has a class name of `.product`, so we'll use that to grab them.
```javascript
const products = document.querySelectorAll('.product');

console.log(products)
```
Then let's log these out, see what they contain. So we can see that we have our `products` and if we open this up, we can see that they are of the type **NodeList**, and the problem with the NodeList is that it's like an array but it's **not** an **array**, so it doesn't have all of the typical array **methods** that we want to use like `filter`, and `forEach`, and `reduce`. 

![NodeList](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/learn-es6-ecmascript-2015/ecmascript-6-converting-an-array-like-object-into-an-array-with-array-from-NodeList.png)

What we can do is we can convert this NodeList into an array, and then we'll be able to use the array methods on the lists.

In the past there's been a lot of hackey ways to do this, but now with **ECMAScript 2015** we have a **native way** to do it with the `array.from` method. So I'm going to go up here and wrap my NodeList here with `array.from`. 

If we log this out, we'll be able to see if we open this up again, that it's now of type array. Now we can use the array methods to solve our original problem of highlighting numbers that are less than 10 in the list.
```JavaScript
const products = 
Array.from(document.querySelectorAll('.product'));
```

![Array](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/learn-es6-ecmascript-2015/ecmascript-6-converting-an-array-like-object-into-an-array-with-array-from-Array.png)

What I'm going to do now is say `products`, and we'll `filter` those products, and we'll filter if the product, the number inside of that product, supply `parseFloat` and we'll grab the `product.innerHTML`, and we'll check if it is less than $10. Then when we get that list of the products that are less than $10, we're going to `forEach` over them, and for each of those products, we're going to say `product.style.color` and we'll set that equal to red.
```javascript
products
  .filter(product => parseFloat(product.innerHTML) < 10)
  .forEach(product => product.style.color = 'red');
```
Now we're highlighting the items that are less than $10. So you can see that being able to **convert a NodeList** or any other **type of iterable** collection into an array can be very useful.