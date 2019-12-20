Instructor: 0:00 So far, we have kept all the logic of our components outside of our components and in a separate file, which is great because it makes testing easier. It's a great way to organize complicated stuff.

0:12 However, sometimes your components will just be straightforward. It might not make sense to move all the logic outside of your components. Can we use Immer also inside the components? The answer is yes, of course, we can use produce directly in an event handler of React components as well.

0:33 Again, we have produced a current state, and we give the recipe. Recipe doesn't need any further arguments because we can access all this stuff we need from the closure, and so it becomes quite straightforward.

0:57 Even better, as we've seen before, we can further simplify this by using the fact that we can use currying. Again, we eliminate state out of the equation. This trick, we can also repeat for toggle reservation.

1:17 This works. Now we have Immer-driven state data. But again, we have a repeating pattern. There's a small utility library called use-immer that provides us with React hooks to standardize this pattern. It's installed now. Let's use it.

1:40 We import use-immer from the use-immer packets. It basically provides a hook very similar to use state, except it always accepts a recipe as a data function. We can simply eliminate the produce calls. To make clear that this hook works with recipes, we call this function a data state rather than set state.

2:14 Use-immer packets must come in handy if you have a lot of components which use producers, but if you have only few of them, I'd skip it.

