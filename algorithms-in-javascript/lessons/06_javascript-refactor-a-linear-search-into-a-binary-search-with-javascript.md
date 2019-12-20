Instructor: [00:00] Let's say that we have an array of numbers anywhere between 1 and 12, and inside of our array, they're in no particular order. Let's say that we have been tasked to write a program that goes through this array, looking for one particular number.

[00:13] If it exists, then the program will return true. If not, it'll return null. Luckily, this isn't too hard to create. Let's make a search function that takes a list and the particular item we're looking for. We'll start off with a default value for our hasItem, which we'll return at the bottom.

[00:30] Let's create a counter that we can increment each time we loop over our items. We'll use the forOf to do the actually looping of our list. The first thing we'll do is increment our counter each time we loop over it.

[00:43] We'll have an if check in here where if our element matches the item we're looking for, then we set our hasItem to true, and we break the loop. Finally, let's console.log our counter to see how many times we've looped, and return hasItem.

[00:58] Down here, let's invoke our function inside of a console.log, so we can see the result of our function. Awesome. The number 12 is, in fact, inside of our items array. Our method we use here to search through the array is called simple search, or a linear search.

[01:16] The big O notation is O^n, which represents linear time. Big O represents the worst case scenario. With our current search function, because the number 12 was towards the end of the array, it took us six iterations until we found the number.

[01:30] This is relatively fast, with just a small sample size. What if our list had 1,000 items, or 10,000, or even a million? Worst case scenario is, our program would take one million loops until it found our item. This has some real performance issues as it grows larger.

[01:47] Again, our algorithm grows linearly, or big O notation O to the number of items, with each item added to the list. Let's begin to refactor our function. First thing we'll do is sort our items from lowest to greatest.

[02:03] We'll see that when we console.log, that our items are now in order from 1 to 12. Let's remove hasItem, and add let low of zero, and let high of list.length. We'll keep our let counter, but remove the forOf loop.

[02:17] Replace it with a while loop, where we say while low is less than or equal to high, we're going to loop over our list, updating our counter. I'll say let mid equals math.floor, low plus high divided by two. Let guess equals list at mid.

[02:35] If our guess is equal to item, then we found it, and return true. If our guess is greater than the item, then we need to update our high equal to mid minus one, else low equals mid plus one. At the bottom, we'll console.log our counter and return null.

[02:54] Perfect, our refactored search function gives us back true for the number 12. If we add a console.log before our return, we'll see that it took us three iterations to find this value. This refactored function is now using binary search.

[03:09] Let's walk through this again, and talk about what exactly is happening. First of all, binary search is an algorithm that has an input of a sorted list of elements. Instead of stepping through our list one element at a time, let's jump right to the middle of our sorted list, and see if our guess is correct, too high, or too low.

[03:28] If we guessed it, then we're done. If our guess is too high, then we know we could ignore everything after it in the list. We can continue on in the while loop, now repeating the exact same step, but we now have an updated high position.

[03:43] We get a new middle element, and do the same check. In the case that it's too low, we could ignore everything before the midpoint. We continue on until we guess the correct item. This process of jumping to the middle of our list, ignoring the smaller or larger values and repeating, gives us a big O notation of Olog(n), otherwise known as log time.

[04:05] Logs are the flip of exponential. When working with running time and big O notation, log always means log-two. Since we have eight items in our array, our search function will take at most just three iterations to find the answer. Though some might take four, because of our rounding down to a whole number is not exact.

[04:27] The true power of binary search and log time specifically is when our list grows. At 1,000 items, we only need about 10 iterations. At a million items, we only need around 20 at most.
