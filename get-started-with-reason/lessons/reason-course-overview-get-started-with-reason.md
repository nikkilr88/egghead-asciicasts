Instructor: [00:00] The goal of this course is to provide a good overview of the syntax, and even more importantly, the semantics of the programming language Reason. Each lesson is focusing on a specific feature, concept, or best practice, and can be watched independently. 

[00:14] Still, the whole course is carefully crafted to get someone from zero knowledge about Reason to a state where they're ready to use it. In case you're even undecided if you should explore Reason, let me share my top three reasons why I care about it. 

[00:27] The language is statically typed, which provides more safety and clarity while evolving a code base. Instead of writing all the types all the time, a large portion of it can be inferred by the compiler. 

[00:39] To me, this is the best of both worlds. For once, you can move fast, but you don't lose any of the benefits and guarantees that come with static types. 

[00:48] My second reason is that `let` bindings, as well as most of the built-in data structures, are mutable by default. In the last couple years, I started to appreciate immutable data structures more and more, as they helped the teams I was working with to avoid bugs. 

[01:03] Nevertheless, if declared explicitly, Reason offers escape hatches for mutability. To me, again, the best of both worlds. 

[01:11] My third, and to me, probably the most exciting reason is the usefulness of variants in combination with pattern matching. Variants allow us to express multiple options that are exclusive as a data structure. 

[01:28] Pattern matching allows us to do exhaustive checking on these results. With both of them in combination, we can make states that should never happen impossible to exist. 

[01:39] Of course, neither of these magically eliminate bugs. Properly used, though, they can be of great assistance when programming. I hope this course is helpful to you, and I'm looking forward to hearing what you build with Reason.