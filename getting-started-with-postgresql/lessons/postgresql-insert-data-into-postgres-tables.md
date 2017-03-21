Now, we're going to `INSERT` some data into the `directors` table. We're going to insert into the name column. We only have an ID and a name. We're going to insert Quentin Tarantino.

```sql
INSERT INTO directors (name) ('Quentin Tarantino');
```

Hopefully, you didn't insert any data before. If you did, just look ahead to the "Deleting" episode, and make sure you delete that data, and you have a clean slate here.

We can run this a bunch of times. We'll see, we just keep inserting Quentin Tarantino, because we don't have any kind of constraint on the table that says, "Quentin can't be in there multiple times." That's what is allowed right now.

We can also insert Judd Apatow. If I want to `INSERT` multiple at the same time, I can do that. I can insert Judd and Mel. Again, that will keep going if we keep running that.

```sql
INSERT INTO directors (name) VALUES ('Judd Apatow'), ('Mel Brooks');
```

Let's see what else happens, though, if we do some weird things. We want to see what happens. We can insert nothing. 

```sql
INSERT INTO directors (name) VALUES ();
```
*error:*
```error
ERROR: syntax error at or near ")"
LINE 1: INSERT INTO directors (name) VALUES ();
```

That will return in a syntax error. We can't `INSERT` `null`, because we have a constraint on our column that says it cannot be `null`. If we remember, from our director's field, we see name not `null`, that's part of our table definition.

```sql
INSERT INTO directors (id, name) VALUES (200, 'M. Night Shamalyan');
```

For good measure, I'll show you what it looks like if you want to `INSERT` into multiple columns. We could say 200, and we could say M. Night Shyamalyan. `INSERT` that guy. It will actually give us the ID 200. But I just want to stress that **we never actually want to do this**, because as we get up to the number 200, we're going to run into a key conflict.

There's something under the hood that is going to tell us what the next `ID` is. We don't really want to mess with this ourselves. I'm just letting you know. Don't mess with it if you have a serial column.

If we really want to see what it's like to `INSERT` a bunch of values, let's `INSERT` into the `movies` table. Again, we going to leave off the ID. We'll add the `title`, the `release_date`, the `count_stars` and the `director_id`. Another `VALUES` statement here. This is going to be a list of fields.

```sql
INSERT INTO movies (title, release_date, count_stars, director_id) VALUES ();
```

Remember, if you don't remember all the columns on it you can take a look at what your table definition is, all the different Postgres editors have different ways of doing this. You have to look at your particular one. These are going to go in the order that I specify them in.

The `title` will be `"Kill Bill"` and the release date was October 10th 2003. `count_stars`, I haven't seen it, you can hate on me later, I'll assume it was a `3`. Then a `1`. We'll also do a `SELECT * FROM movies`, just so we see what that's about. Here's our movie, here's `"Kill Bill"`, our `count_stars`, and our `director_id`. This should be linked up with the first `Quentin Tarantino`.

```sql
INSERT INTO movies (title, release_date, count_stars, director_id) VALUES (
  'Kill Bill',
  '10-10-2003',
  3,
  1
);
```

Let's just see here. Let's switch up the `title` and `release_date`, just to prove that we can do these in any order that we want to. We'll flip this, and this. It's not aligned, but our editor will understand either way. Just doing that so it's easier for us to read as humans.

Let's also `INSERT` a second movie, to show what that's like. Remember, we put the comma, and then, we open up another parenthesis to put this in. Let's say, this was the movie "Funny People." That is a Judd Apatow movie. We have to go look for his `ID` 11. Let's say that's five stars, because any movie I've seen is five stars.

```sql
INSERT INTO movies (release_date, title, count_stars, director_id) VALUES (
  '10-10-2003',
  'Kill Bill',
  3,
  1
), (
  '07-20-2009',
  'Funny People',
  5,
  11
);
```

There we go. That will happen there. We see that we did still give the next "Kill Bill" three stars, director `ID` one, and the title and the release date go in the right column. Nothing got messed up by us moving these around.

I just want to show you here something else that is nice. Postgres will save us if we make some really obvious errors. If our date, time doesn't make any sense, then, it will fix that. But in other cases it's not going to fix this for us.

If we try to `INSERT` a number for "Kill Bill," it will figure out a way to parse that to a string. The number five is parsable. It will do that. These are things to watch out for and things to notice. You can play around with that a little bit yourself.

That's the basic way that you're going to `INSERT` data into a table.