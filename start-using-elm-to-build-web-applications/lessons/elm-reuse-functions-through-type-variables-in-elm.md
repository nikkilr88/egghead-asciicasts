Let's make a function that'll allow us to print these numbers to the screen. It's going to take an int and it's going to return HTML message. Don't really worry about what message means right now. That's there for building interactive applications.

Let's define the body of this function. Print numbers is going to take in an integer and it's going to return NUL with no attributes and then we'll put a text note in here, and we'll pass in two string of the int that we get in. Now down here, instead of this list of children, we can put in some parens and call it list.map print numbers, numbers.

OK, so we've got a list of numbers in the browser. Now, let's say we wanted to print out the fruits instead of the numbers. We can't call print numbers with fruits because it's expecting an integer and fruits is a list of objects, but we look at the code inside of here, and this should all be pretty generic. All we're doing is doing a two string and then putting that into a text note.

This actually should be adaptable between numbers and objects. Let's make adaptable by changing this upper case int type to a lower case thing. It doesn't matter what word I use here. What matters is that it's lower case. When Elm sees a lower case word inside of a type signature, it knows that that's a variable, that that can change depending upon the context.

Just to make things make sense, let's change print numbers now to be instead print thing, and let's change this int argument to be thing. Down here we'll have to change the reference to print thing. Let's make sure it still works in the browser. It does. What if we pass in fruits? It works. Here we've defined a function called print thing that takes in any type and does something to it.

We know it can take in any type because it's got a lower case word instead of an upper case word as its type, and we've been able to call it with both a list of integers and a list of objects.