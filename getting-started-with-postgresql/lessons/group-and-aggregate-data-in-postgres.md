For this episode, we're talking about aggregation. If we care a lot about aggregation, we're going to have a ton of data. There's a big example file for this episode. You can grab it online.

Then, what I would do is I would just drop the database that we have. 

```bash
dropdb postgres_101
```

You would obviously never do this to a production database, because you're going to lose everything that you have, but since it's just easy to recreate things this way, we'll create the database. I've been calling mine `postgres_101`

```bash
createdb postgres_101
```

Then, you can use the `psql` command line. We can tell it what database to use. That database is `postgres_101`. We can tell it to read a file. 

```bash
psql -d postgres_101 -f insert.psql
```

Just link to wherever you have that [file downloaded](https://gist.githubusercontent.com/brettshollenberger/e3e04b72d0efa03e90754481d6e338ec/raw/101600b7fa8da396be864c40b7f5c5ba8b3a0837/create.sql) and this will run those statements in Postgres. This is a really nice way to share commands with people quickly.

We can see this copied in almost 59,000 rows. We can see a lot of the data here that was inserted. Now that we've hopped back into our SQL program, we're going to select the count from the `movies`. We see that's the same thing. We can take a look at what they look like, but since we have this many `movies`, I really strongly encourage you to enforce a pretty strict limit on this.

```sql
SELECT *
FROM movies;
LIMIT 100
```

This is going to cause the query to return pretty fast. It returned within less than half a millisecond. Not too bad. This will let us look at the data without causing a lot of contention on the database, which is really important so long as it's not a production database.

This is just something you're messing around with. By all means, do whatever you want with it. The limits are very important when you're working with a lot of data and that data is mission critical data.

An aggregation is defined by the `GROUP BY` clause. We can `GROUP BY` the `rating`. For instance, we see the `rating` is going to be from zero to 10 and it's a decimal. The first thing we're going to see is this error. It says we need the movies that `ID` column to appear in the `GROUP BY` clause. We didn't `GROUP BY` the `ID`, but we selected everything. That's what it's mad about.

Instead, what we're going to do is select the `rating`. We're just going to select the `rating`. 

```sql
SELECT rating
FROM movies
GROUP BY rating;
```

This is...oh my, it's in all kinds of a crazy order. We don't love that. Let's also add an `ORDER BY` clause. We can say `ORDER BY` one, which is the first column. This is the same as saying `ORDER BY rating`, but we'll say `ORDER BY` one. These will now be in order.

We can see that basically what this did, despite the fact that there were so many records here, this essentially limited to all of the distinct values. There's only one record for each of these values here. That's an important thing to note about aggregations, that the `GROUP BY` clause is limiting to distinct values.

We want to ask questions about each individual distinct value. What we're going to do here is say we want to see maybe for the `rating` how many `movies` are there for each `rating`. This gives us the list.

```sql
SELECT rating,
COUNT (*)
FROM movies
GROUP BY rating
ORDER BY 1;
```

Honestly, even for me, this is a little bit too much information. I want to just see a histogram of the information roughly. Now, we're going to `GROUP BY` round `rating`. `ORDER BY` one is even better used now, because we don't have to type this everywhere.

We could even do `GROUP BY` one, just FYI in case you don't want to have to use that everywhere. Now, what we're going to see is more of the actual picture of the data, the histogram of it. There are 272 movies here that have one star, 1,200 almost 1,300 that have two stars, etc.

```sql
SELECT ROUND(rating),
COUNT (*)
FROM movies
GROUP BY 1
ORDER BY 1;
```
| round | count |
|-------|-------|
| 1     | 272   |
| 2     | 1298  |
| 3     | 2685  |

What this is doing is it's allowing us to aggregate on a particular distinct field and ask some question about all the underlying data there. Aggregations are really nice when all of the information is in a single field like this.

Let's take a look at what happens though when they're spread across different fields. We see here we have a Boolean column for each of these fields that determine whether it's an action, animation, comedy, drama, documentary, etc.

What's the genre? Basically, we could boil this down into a single column that says which genre it is. This isn't something that the group by clause is going to let us do right now. Ultimately, we want to see a histogram of that data, as well.

What I want to introduce you to now is a case statement. You're probably familiar with a case statement from elsewhere, but we say `WHEN action=true THEN 'action' ELSE 'other'`.

```sql
SELECT title,
CASE
WHEN action=true THEN 'action'
ELSE 'other'
END
FROM movies
LIMIT 100;
```

Right now, just to show you what this looks like, and let's also select maybe the `title`. This is a little obvious. Yeah, this makes sense. We have a bunch of different other columns in here, because we simply haven't mentioned them yet. We could also say when `animation` is `true`, then it's `animation`. We can see we've got some `animation` ones now.

I'm just going to go ahead and paste in the rest of these values for us here. We can see that some of them still IMDB didn't give any kind of ranking to, we don't have that information. Some of them are in fact other, but for most of these, we see this.

```sql
SELECT title,
CASE
WHEN action=true THEN 'action'
WHEN animation=true THEN 'animation'
WHEN comedy=true THEN 'comedy'
WHEN drama=true THEN 'drama'
WHEN documentary=true THEN 'documentary'
WHEN romance=true THEN 'romance'
WHEN short=true THEN 'short'
ELSE 'other'
END
FROM movies
LIMIT 100;
```

What we have here is this case column, which is weird. Remember, we can rename it. We're going to rename this as `genres`, so now we have a `genres` column. This is kind of an unwieldy table to deal with, so I also want to introduce you to the `WITH` statement. This is going to create another temporary table for us to use.

We'll say `WITH genres AS`, and we'll take our select statement here and we'll just indent it, it's obvious that this is different. We'll back up here. Now, we have this new `genres` table to play with and a new query below here.

```sql
WITH genres AS (
  SELECT title,
  CASE
  WHEN action=true THEN 'action'
  WHEN animation=true THEN 'animation'
  WHEN comedy=true THEN 'comedy'
  WHEN drama=true THEN 'drama'
  WHEN documentary=true THEN 'documentary'
  WHEN romance=true THEN 'romance'
  WHEN short=true THEN 'short'
  ELSE 'other'
  END
  FROM movies
  LIMIT 100
);
```

Let's say `SELECT` * from `genres`. We'll say we're going to group by the genre column, which is right here. Let's say `genre` and `COUNT`. We'll `ORDER BY 1`, as well. Now, we have a histogram of our `genres`. Pretty cool.

```sql
SELECT genre,
COUNT (*)
FROM genres
GROUP BY 1
ORDER BY 1
```

Here, we see we still have the limit 100, which is why these numbers are so low, but if we remove that, now, we start to see a histogram of this data.

| genre       | count |
|-------------|-------|
| action      | 4688  |
| animation   | 3606  |
| comedy      | 14269 |
| documentary | 3183  |
| drama       | 16952 |
| other       | 12786 |
| romance     | 1298  |
| short       | 272   |