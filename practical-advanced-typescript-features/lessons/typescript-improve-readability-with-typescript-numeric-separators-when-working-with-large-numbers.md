If we had a huge number such as the population of Africa, it would be tough to tell, at a glance, just how significant this number actually is.

#### index.ts
```ts
// population of africa: 1287269147
```
It would involve a bit of a mental effort.

Outside of programming, we usually use the comma separators to make it easier for other humans to read such large numbers. In our case, if we add commas in every third position, we can now instantly tell that it's approximately 1.2 billion.

```ts
// population of africa: 1,287,269,147
```

Since TypeScript 2.7, we can now add underscores as numeric separators to the numbers in our code. We'll assign the same number to this `const`, but this time I'll add underscores in every third position. 

```ts
// population of africa: 1,287,269,147

const africaPop = 1_287_269_147;
```

This not only makes the code more readable, but it also doesn't affect the final output at all. If we look at the result in JavaScript, we can see that all the underscores got compiled away.

#### index.js
```js
// population of africa: 1287269147
var africaPop = 1287269147;
```

TypeScript also doesn't force you to use this feature in a specific way. You can add an underscore after each number, and you can even add them after the decimal point. 

#### index.ts
```ts
// population of africa: 1,287,269,147

const africaPop = 1_2_8_7_269_147.123_456;
```

Compilation won't fail, but it might make the code less readable, so it's up to the developer to use this feature responsibly.

For a more real-life example, I'm now going to write an `AmountInput` class. I'll create a `private static` at the top to indicate the `MAX_ALLOWED` amount it supports and `amount:` field of type `number` to store the actual entered amount.

```ts
class AmountInput {
  private static MAX_ALLOWED = 99_999_999;

  amount: number = 0;

}
```

I'll also create a `showTooltip` method that creates a `tooltip` and then hides it after a few milliseconds. Finally, I'll add a `formatMillion` method that takes the current amount and returns the formatted string in millions.

```ts
class AmountInput {
  private static MAX_ALLOWED = 99_999_999;

  amount: number = 0;

showTooltip() {
  //show tooltip
  setTimeout(() => {
    //hide tooltip
  }, 2_500);
}

  formatMillion() {
    return this.amount / 1_000_000 + "M";
  }
}
```

Even though we've added just a few underscores to the numbers in this class, because we're working with such large numbers, we've made the overall reading experience a bit more pleasant and the total cognitive load of someone going through this much lower.
