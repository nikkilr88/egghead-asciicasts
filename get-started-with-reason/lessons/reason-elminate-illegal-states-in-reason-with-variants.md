Instructor: [00:00] To demonstrate how to make illegal states impossible, we're going to build a simplified version of an app fetching and rendering the current user info. We start out using pseudo code to define the UI states. We need three of them. 

[00:15] First, we want to print a loading text while we're waiting for the data. Next, in case of a successful request, we want to print, `"Your name is <name>"`. In case of an error, we print, `"Something went wrong"`.

#### Terminal
```javascript
Reason # 
/*
loading => "Loading..."
success => "Your name is <name>"
error => "Something went wrong"
*/
();
- : unit = ()
``` 

[00:30] Let's start by declaring your record `type request`. First, we add a field `loading` of type `bool` to indicate if the request is currently loading. We do the same for `error`. Finally, we add the field `name` of type `string`. 

```javascript
Reason #
type request = {
  loading: bool,
  error: bool,
  name: string,
};
type request = { loading: bool, error: bool, name: string, };
```

[00:48] Right away, we create the first legal state. While `loading` is set to `true`, `error` is set to `false`, and `name` an empty string. 

```javascript
Reason #
type request = {
  loading: true,
  error: false,
  name: "",
};
type request = { loading: true, error: false, name: ""};
```

The print logic is pretty straightforward. If my request is currently loading, we return `loading`. In case it fails, we print `"Something went wrong"`. The only other option is `name` is available, and we print the name. 

```javascript
Reason #
if (myRequest.loading) {
  "Loading...";
} else if (myRequest.error) {
  "Something went wrong";
} else {
  "Your name is " ++ myRequest.name;
};
- : string = "Loading..."
```

[01:16] The second legal status, when the request finished loading but failed, works as expected. 

```javascript
Reason #
type request = {
  loading: false,
  error: true,
  name: "",
};
type request = { loading: false, error: true, name: ""};
Reason #
if (myRequest.loading) {
  "Loading...";
} else if (myRequest.error) {
  "Something went wrong";
} else {
  "Your name is " ++ myRequest.name;
};
- : string = "Something went wrong"
```

Last but not least, the legal state for loading finished, and the field name is filled. We covered all three cases and fulfilled the requirements. 

```javascript
Reason #
type request = {
  loading: false,
  error: false,
  name: "Anna",
};
type request = { loading: false, error: false, name: "Anna"};
Reason #
if (myRequest.loading) {
  "Loading...";
} else if (myRequest.error) {
  "Something went wrong";
} else {
  "Your name is " ++ myRequest.name;
};
- : string = "Your name is Anna"
```

[01:39] Wait a minute. Did you notice there's a lot that possibly could go wrong? By accident or on purpose, someone could create a state that should never be possible. For example, we could set `loading` to `true` and `error` to `true`. 

[01:58] When reevaluating our `if/else` expression, it's really interesting. It renders loading but by definition, this is a state that should never happen. Due to the way our data is structured, it opens up the question, what should our UI code do in such a case? Maybe show the error instead of loading? Maybe ignore this at all, because it should never happen? Clearly, it can. 

[02:22] It might not be you, but someone else might come in who didn't know about the initial requirement and create states that aren't legal. What's even more troublesome is not one combination, but even in this simple example, there are more illegal states. For example, `loading: true`, `error: false`, but the name set. Or `loading: false`, `error: true`, and the name set. 

[02:47] There is one case I'm especially concerned about if the request succeeded but the assignment of the name didn't happen and therefore stayed empty. In this case, the user would see a broken UI, a bug that leads to a bad user experience. 

```javascript
Reason #
type request = {
  loading: false,
  error: false,
  name: "",
};
type request = { loading: false, error: false, name: ""};
Reason #
if (myRequest.loading) {
  "Loading...";
} else if (myRequest.error) {
  "Something went wrong";
} else {
  "Your name is " ++ myRequest.name;
};
- : string = "Your name is "
```

[03:03] Of course, this is in a simple example, and you probably would have identified the issue quickly, but even this simple example requires additional cognitive overhead for developers and in worst case leads to bugs like the one I just described. Believe me or not, but it doesn't get better the more complex your state becomes. 

[03:22] What now? There is a better way how to deal with this problem. This is exactly where variants come in. Let's start from scratch and recreate the type request with a variant. Each constructor represents one of the states, `loading`, `error`, `success`. Success was an additional string for the name. 

```javascript
Reason # 
type request = 
  | Loading
  | Error
  | Success(string);
type request = Loading | Error | Success(string);
```

[03:42] We set our state to the `Loading` constructor and write a switch expression for a text to be rendered. 

```javascript
Reason # let state = Loading;
let state: request = Loading;
Reason # 
let ui =
  | Loading => "Loading..."
  | Error => "Something went wrong"
  | Success => "Your name is " ++ name
  };
let ui: string = "Loading...";
```

We can change the state and rerun our switch expression. All cases work as expected. What's fascinating about this, with a `request` variant, we can never have loading, error a success at the same time. 

[04:19] Also, using the `switch` expression in combination with the variant, we can't forget a state. For example, if we forget about the loading state, the compiler will warn us. 

```javascript
Reason # 
let ui = 
  switch (state) {
  | Error => "Something went wrong"
  | Success(name) => "Your name is " ++ name
  };
Characers 12-113:
Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
Loading
let ui: string = "Your name is Anna";
```

There is one more edge case, though. 

[04:32] What if you can't trust the backend and, for some users, it might return an empty string? This would lead to the same broken UI as I described earlier as a bug. Fortunately, since we can match for exact values, we can even match for an empty string and return an appropriate case. 

```javascript
Reason # 
let ui =
  switch (state){
  | Loading => "Loading..."
  | Error => "Something went wrong"
  | Success("") => "Your name is missing"
  | Success => "Your name is " ++ name
  };
let ui: string = "Your name is missing";
```

[04:51] Isn't it fascinating? One additional concept to represent states, and suddenly, we eliminated a whole range of bugs. I don't know about you, but I was super excited and mind blown the first time I realized this. To me, this is one of the most critical reasons why I'm using Reason. 

[05:09] Last move on because I want to demo you one more thing. In a real-world case, the constructor, success, most likely will contain another data structure like another variant, record, or list. For example, a user response record that would contain the `id`, `name`, and `age` of a user. This is exactly what we can use in a success constructor. Pretty cool. 

```javascript
Reason # 
type userResponse = {
  id: string,
  name: string,
  age: int,
};
type userResponse = { id: string, name: string, age: int, };
Reason #
type request = 
  | Loading
  | error
  | Success(userResponse);
  type request = Loading | Error | Success(userResponse);
Reason # let state = Sucess({ id: "abc', name: "Anna", age: 42 });
let state: request = Sucess({ id: "abc', name: "Anna", age: 42 });
```

[05:45] Before we move on to the next lesson, let me remind you that a type system doesn't magically eliminate bugs. Properly leveraged, though, it points out the unhandled conditions and asks you to cover them. The ability to model this or that correctly is crucial to avoid bugs.