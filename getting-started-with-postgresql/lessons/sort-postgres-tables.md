Today we're sorting data. We're going to sort some friends by the number of friends they have in our Facebook type app. 

```sql
SELECT *
FROM friends
ORDER BY friends_count;
```

By default, this is always `ascending`, so we're going to start with the lowest number of friends and move up to the highest number of friends.

If we want to change to `descending`, we will append the the `descending` descriptor here, but I like it ascending to start. We see here, though, that Sophia and Andrew have a tie for the number of friends they have. If they do, we can specify another way to sort them, because without it, we don't have that information. It's just going to default to using this `ID` column.

We might prefer to `SORT BY` the name. Now Andrew comes before Sophia, so Andrew will sort higher. We can also add `descending` to both of these to specify that we want it to go in the exact opposite order.

```sql
SELECT *
FROM friends
ORDER BY friends_count, name;
```

Now we'll start with the highest number of friends, move through to the lowest number of friends, and also, in name ties, we'll go in reverse alphabetical order. That doesn't seem to make sense, so we'll leave this. Now Andrew beats Sophia, but the person with the most friends is still going to be listed first in our list. That's orderized.