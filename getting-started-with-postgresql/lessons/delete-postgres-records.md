Now we're going to talk about deleting data. I'm going to go ahead and paste in a bunch of inserts here for our movies and select all of our movies just so we can see that we have a bunch of "Kill Bills." 101 Kill Bills. I guess that's "101 Dalmatians" for Kill Bills.

Just like with `UPDATE`s, with `DELETE`s, it's helpful to run the `SELECT` statement first. Let's `SELECT` all `FROM movies WHERE` the `count_stars` is greater than 90. Actually, let's just `SELECT` the `COUNT` of that so we know how many we're going to be deleting here.

```sql
SELECT COUNT(*)
FROM movies
WHERE count_stars > 90;
/* => 10 */
```

For each of these, I just wanted to limit the data and partition it easily, so I added a star for every single movie. We know we're going to `DELETE` 10. We know that less than 90 should be 90 movies. We know that the total count then will be 101.

```sql
SELECT COUNT(*)
FROM movies
WHERE count_stars < 90;
/* => 90 */
```

We're going to `DELETE` where they are greater than 90 and we're going to check back at this again. Remember, there are 10 of those movies. We should expect that 91 movies are left. We're going to `DELETE` from Movies where the count stars is greater than 90. That's 10 movies. Now we're down to 91.

```sql
DELETE FROM
movies
WHERE count_stars > 90;
```

Let's remove this guy so where the count star is now greater than 70. That's 20, so we expect another 20 movies to be released. 71 movies should be left. That is, in fact, what we see.

```sql
DELETE FROM
movies
WHERE count_stars > 70;
```

These are idempotent operations. We can keep running it. We still have exactly 71 stars. There's nothing new. The 71 movies, nothing new that we're going to be inserting in the meantime. Of course, we can do this with any column.

We can say where the release date is less than 1984. See how many movies that is. That's another 50 movies. Where the release date is less than 1974. All right. We see that.

```sql
DELETE FROM
movies
WHERE release_date < '01-01-1974';
```

Then finally, in the same way, that `SELECT COUNT` for movies tells us there are 31. If we delete from Movies with no `WHERE` clause, we're going to delete everything. We do that. We have a zero. That's `DELETE`.