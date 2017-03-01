In this example, we have a `Db`. This is a mock database that will do a `find` with some `id`, some arbitrary `id`, and then, `setTimeout` for a small amount of time, and then, return as an object here. It's a project with an `id` and a `title`.

```javascript
const Task = require('data.task')

const Db = ({
    find: if =>
        new Task((rej, res) =>
            setTimeout(() =>
                res({id: id, title: 'Project ${id}'}), 100))
})
```

We would call a `reportHeader` with two different projects. That is we want to `Db.find` some `id`, let's say `20`. We also want to do `Db.find` let's say `8` This will `find` two different projects.

```javascript  
const reportHeader = (p1, p2) =>
    'Report: ${p1.title} compared to ${p2.title}'
```

If I were to call a `chain` to get `p1`, and then, `find` a second project, `p2`, and then, we call that `reportHeader` with both `p1` and `p2`. This would wait for the first `find` to finish, pass in our project, and then once that is done, call the second `find`.

```javascript
Db.find(20).chain(p1 =>
    Db.find(8).map(p2 =>
        reportHeader(p1, p2)))
```

This is good because we can depend on `p1`, if we want, in our second `find`. In this case, we don't care about `p1` and `p2` being dependent on each other's sequential finds here. What we could do is use applicatives to kick both off at the same time.

What we could do is go ahead, and let's put this in a `Task.of(reportHeader)`. Instead of altering our `reportHeader` to be curried here, why don't we go ahead and take `p1 => p2 =>` and then recall `reportHeader` with `p1` and `p2`, like that.

```javascript
Task.of(p1 => p2 => reportHeader(p1, p2))
```

We didn't alter the original function. We've made a little `Task` here that is curried. Then, we'll go ahead and `.ap` that to the first `find`. We'll `.ap` that to the second `find`. There we are. That's all we have to do. We've found the first thing and the second thing.

```javascript
Task.of(p1 => p2 => reportHeader(p1, p2))
.ap(Db.find(20))
.ap(Db.find(8))
```

Notice, these are both kicked off at the same time. It does not wait for one to resolve before it calls the second one.

Now, we can call `.fork(console.error, console.log)`. We have here our answer, which will be a report with `Project 20 compared to Project 8`.