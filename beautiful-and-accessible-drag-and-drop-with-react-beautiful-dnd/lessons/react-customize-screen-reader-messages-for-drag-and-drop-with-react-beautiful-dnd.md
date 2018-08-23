`react-beautiful-dnd` enables users with visual impairments to perform drag and drop operations using only a keyboard and a screen reader. I have turned on voice over, which is the screen reader that is built into Mac OSX.

Automated Voice: 00:15 Take out the garbage. Draggable item. Press spacebar to lift. You have lifted an item in position one. Use the arrow keys to move, spacebar to drop, and escape to cancel. You have moved the item to position two. You have moved the item to position three. You have dropped the item. It has moved from position one to three. Voice over off.

We were able to drive our application using only a keyboard and a screen reader without having to make any additional changes. `react-beautiful-dnd` ships with English messaging for screen reader out of the box. All of the messaging that is read out by the screen reader is able to be controlled by you.

You can do this if you wanted to make the messaging more specific to your application, or if you wanted to support languages other than English. We can use the `aria-roledescription` prop on a drag handle to control the messaging that occurs when a drag handle is focused on.

In this message, we advise that you instruct a user on how to start a drag.

#### task.jsx
```html
<Container
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  innerRef={provided.innerRef}
  isDragging={snapshot.isDragging}
  aria-roledescription="Press space bar to lift the task"
  >
```

You can control the screen reader messages during a drag and drop interaction by using the drag drop context callback functions.

I will now wire up an `onDragStart` and `onDragUpdate` callback. 

```javascript
 <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
```
All of the drag drop context callback functions are supplied with a second argument called `provided`. This object contains a property called `announce`, which is a function.

```javascript
onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`,
    );
  };
```

The `announce` function can be called with a string to `announce` messages to the screen reader. If the `announce` function is not called, then `react-beautiful-dnd` will use its default English messaging. In our `onDragStart` function, we are announcing the `position` that the `task` is started in.

In our `onDragUpdate` function we are announcing the current `position` of the draggable, if there is one, or we're letting the user know that they are not over a droppable area. 

```javascript
onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  };
```

In our `onDragEnd` function, we are letting the user know what `position` the drag was started in and what `position` it finished in.

We are also providing a fallback messaging for when there was no drop target. 

```javascript
 onDragEnd = (result, provided) => {
    const message = result.destination
      ? `You have moved the task from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of
        ${result.source.index + 1}`;

    provided.announce(message);
```

Let's take a look at the impact of our changes.

> Automated Voice: 02:51 Press spacebar to lift the task. You have lifted the task in position one. You have moved the task to position two. You have moved the task from position one to two. Voice over off.

We have created a screen reader guide on the `react-beautiful-dnd` [repo](https://github.com/atlassian/react-beautiful-dnd), which contains suggestions for the tone of your messages and their content throughout the drag and drop life cycle.
