I've already created a script file called `functions.sh` and I've given that execute permissions using the `chmod` commands.

Defining a function in Bash is somewhat similar to other programing languages. We give it a name. We'll create a `greet` function, and we give it two parentheses and an opening and closing curly brace. In the function's block is where we define commands that we want to run.

#### functions.sh
```sh
greet(){

}
```

We'll do an `echo "hello world"` here. 

```sh
greet(){
echo "hello world"
}
```

Then to invoke that function, we invoke it just like we invoke any Bash command. 

```sh
greet(){
echo "hello world"
}

greet
```

Let's run this. 

#### Terminal
```bash
$ ./functions.sh
hello world
```

Cool, we can see that's working. Let's see how we pass arguments to a function.

This works just like passing arguments to a script from the command line. In fact, you can think of functions as mini scripts. 

If I wanted to pass a different greeting here, we'll say `howdy` instead of `hello world!`.

Replace `hello` with the `$1` variable. Just like a script, this `$1` is set to the first parameter that is passed to the command or the function in this case.

#### functions.sh
```sh
greet(){
echo "$1 world"
}

greet "howdy"
```

Let's run that. 

#### Terminal
```bash
$ ./functions.sh
howdy world
```

We can see that it works as expected. It might be tempting to want to name the parameters between these parentheses, but the parentheses don't serve any purpose other than to indicate to the Bash compiler that it's a function definition, not a command invocation.

To store the value that is outputted from the function, we can use the command substitution syntax. If I wanted to save this `howdie world` as a string in the variable, we'll give the variable a name, and then I'll use the command substitution syntax here, which is the dollar sign with the two parentheses.

To verify it works, I'll `echo "the greeting is $greeting"`. Let's run that now. 

#### functions.sh
```sh
greet(){
echo "$1 world"
}

greeting=$(greet "howdy")
echo "the greeting is $greeting"
```

#### Terminal
```html
$ ./functions.sh
the greeting is howdy world
```

Cool, we see that it's working.

Note that anything that's echoed in this function will be captured in this variable when you use the command substitution syntax. If you echoed something else up here, like `hey`.

#### functions.sh
```sh
greet(){
    echo "hey"
    echo "$1 world"
}

greeting=$(greet "howdy")
echo "the greeting is $greeting"
```

We run that again, we can see that it's going to do `hey` new line, `howdie, world`

#### Terminal
```bash
$ ./functions.sh
the greeting is hey
howdy world
```

Something to keep in mind when you're trying to return values from a function. You want to be careful with how you use your echo. Let's clear everything.

Functions can access variables from the outer scope, as well as to clear variables that are local to their inner scope. 

For example, let's create a variable that's at the top level here. This will be accessible to everything within this script.

Let's call it `global`. We'll give it the value of `123`.

#### functions.sh
```sh
global=123
```

Let's create a function here. We'll call it `test`. In here, let's access that `global`. We'll say `global` is equal to `$global`. 
 
```sh
global=123

test(){
    echo "global = $global"    
}
```

And then let's do clear a local variable. 

We'll use the `local` keyword for that, and I'll call my `local` variable `local_var`. I'll make this a string. Let's echo that out as well.

```sh
global=123

test(){
    echo "global = $global"    
    local local_var="i'm a local"
    echo "local_var = $local_var"
}
```

Now let's run our `test` function. To verify that the scoping rules work as expected, let's run this again `echo "global = $global" `, which should work. 

```sh
global=123

test(){
    echo "global = $global"    
    local local_var="i'm a local"
    echo "local_var = $local_var"
}

test

echo "global = $global" 
```

Let's try echoing out our `local_var` again, which should not work. This should be an empty value right here.

```sh
global=123

test(){
    echo "global = $global"    
    local local_var="i'm a local"
    echo "local_var = $local_var"
}

test

echo "global = $global" 
echo "local_var = $local_var"
```

Let's run the `functions.sh`. 

```bash
$ ./functions.sh
global = 123
local_var = i'm a local
global = 123
local_var =
```

We can see our `global` is working. The local variable is working as expected in the `test` function. Outside of it, we echoed out the `global`, which this still has access to. The local variable there is empty, like we expect.