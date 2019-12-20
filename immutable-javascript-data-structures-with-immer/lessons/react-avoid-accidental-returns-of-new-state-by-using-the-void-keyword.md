Instructor: 0:00 You might have noticed that draft isn't just here in our handle or a set function. A producer should always do either of two things. Either it should modify the draft, or it should return an entirely new state, but it should never do both.

0:16 What happens if you're doing both? Let's remove the accolades over here. Now, the return of our recipe will be to return of push. If we save this, and we again add Lego boost, our application now horribly crashes. Why? Either a producer should return an new value, or it should modify a draft. It shouldn't be doing both.

0:37 What our recipe does over here, it's modifies a draft, it's as another gift. Also, it returns the length of the array because that is what pushed us by default as return. The new states will just be simply the number three which obviously doesn't work as three doesn't have users and gifts and etc.

0:58 However, in some cases, it's really nice to have those short, one-liner functions that take an expression without body to do some updates. For that, there's one neat, little trick, is to use the keyword void. Void is quite an unknown keyword in JavaScript. What it does is it takes expression on the right hand and it always returns and it finds.

1:19 Basically, it behaves the same as a function that doesn't return anything, and it fixes our problem. Now, in this specific example, it doesn't add that much, and I would give, for example, by using accolades.

1:29 However, if you have one-liner updates functions, it can be quite a new trick.

