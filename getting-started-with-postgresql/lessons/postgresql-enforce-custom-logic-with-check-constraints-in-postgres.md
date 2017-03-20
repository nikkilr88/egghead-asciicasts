We have a `movies` table. We don't have any kind of constraint that limits us on the data that we can actually put in here. Let's look at just a normal `INSERT` statement here, and we'll add in `"Barton Fink"` and we'll say it was released on this day. I don't think that's true.

Let's give it a `count_stars` of `6`, even though, we want `count_stars` to really just be `1` to `5`. We don't have any kind of constraint here yet. We're going to `INSERT` that. Now, we can see Barton Fink violates our constraint.

```sql
INSERT INTO movies (title, release_date, count_stars, director_id) VALUES (
  'Barton Fink',
  '01-01-1999',
  6,
  0
);
```

We could also have done it maybe even `count_stars` of `0`. That's a shame, isn't it? Why don't we go ahead and `DELETE FROM movies` where the ID is `4`, `5`, or `6`. 

```sql
DELETE FROM movies WHERE id IN (4,5,6);
```

We'll get rid of our Barton Finks and we'll add a constraint.

`ALTER TABLE movies`. We'll `ADD CONSTRAINT`. We have to name it, as always. We'll say `count_stars_greater_than_zero`. This is a `CHECK` constraint, and then, we have to put the check in parentheses, so we'll say `(count_stars > 0);`. That will force us to do that.

```sql
ALTER TABLE movies ADD CONSTRAINT count_starts_greater_than_zero CHECK (count_stars > 0);
```

We'll also say that it's `count_starts_less_than_six`, because we don't want six stars for anything.

```sql
ALTER TABLE movies ADD CONSTRAINT count_starts_less_than_six CHECK (count_stars < 6);
```

We'll back up a bit and just get ourselves to the point where we had run this.

```sql
INSERT INTO movies (title, release_date, count_stars, director_id) VALUES (
  'Barton Fink',
  '01-01-1999',
  6,
  0
);
```

Let's try it with `6` and that fails. Let's try it with `5`. That's OK. Let's try it with `0`. That fails.

Try it with `1`. That's OK. Let's try it with an arbitrarily high number. `10`. `-1`. We already have started to see that our constraints have fallen into place, and these are constraints that we define for our table.