All right, we're talking about selecting data from tables. We have our basic tables set up right here. They are in the show notes.

| id | name              |
|----|-------------------|
| 1  | Quinton Tarantino |
| 2  | Judd Apatow       |
| 3  | Mel Brooks        |

| id | title           |release_date| count_stars |director_id |
|----|-----------------|------------|-------------|------------|
| 1  | Kill Bill       | 2010-10-10 | 3           | 1          |
| 2  | Funny People    | 2009-07-29 | 5           | 2          |
| 3  | Blazing Saddles | 1974-02-07 | 5           | 3          |

Let's `SELECT` the title from our movies table, this will just `SELECT` an individual column. There we go. We see that we've got something totally different from the tables we saw before. This is, in fact, a new table that we are creating in memory, it just exists for the duration of our query.

```sql
SELECT title
FROM movies;
```
| id | title           |
|----|-----------------|
| 1  | Kill Bill       |
| 2  | Funny People    |
| 3  | Blazing Saddles |

We can `SELECT` multiple columns by separating them with commas. We can even rename them, because they are new temporary tables that we're creating.

```sql
SELECT title,
release_date AS release
FROM movies;
```

| id | title           |release     |
|----|-----------------|------------|
| 1  | Kill Bill       | 2010-10-10 |
| 2  | Funny People    | 2009-07-29 |
| 3  | Blazing Saddles | 1974-02-07 |

One of the most useful features of SQL, however, is the ability to limit the data that we're getting back. Here let's say that we want to limit to just the movies where the release date is greater than the first day of 1975. We expect that this will get rid of "Blazing Saddles," and it does.

```sql
SELECT title,
release_date AS release
FROM movies
WHERE release_date > '01-01-1975';
```

| id | title           |release     |
|----|-----------------|------------|
| 1  | Kill Bill       | 2010-10-10 |
| 2  | Funny People    | 2009-07-29 |

We can combine these. We can say `WHERE` the release date is greater than 1975, but also `WHERE` the count stars is equal to five, perhaps. Now we've just got "Funny People." Here we can also take a look at the count stars. We can see what that looks like. We see here that it's five. If we got rid of this "Kill Bill," we had a 3/4. That makes sense why this happened, because we had the release date greater than 1975, and the count stars were exactly equal to five.

```sql
SELECT title,
release_date AS release
FROM movies
WHERE release_date > '01-01-1975'
AND count_stars = 5;
```
| id | title        |release     |
|----|--------------|------------|
| 2  | Funny People | 2009-07-29 |

Another really common and useful thing to do is to use the clean star (`*`). This says select all of the columns. Here we see, we also got the `ID`, and we got the `director_id`. The clean star can be a little more complicated in different cases. But especially when we're selecting from just one table, like we are right now, it has this nice, simple meaning.

We can also perform some basic aggregations over the data. Let's select count star. 

```sql
SELECT COUNT(*)
FROM movies;
/* => 3 */
```


In this case, the clean star is just a stand-in for every individual row. We could have also represented that as the ID, really almost anything. Here, this wouldn't make too much sense to sum the IDs. Remember, we had 5, 5, and 3 for the count stars. That's 13.

```sql
SELECT SUM(count_stars)
FROM movies;
/* => 13 */
```

 We could also look at the average of those. It's 4.3, repeating. That makes sense.

 ```sql
SELECT AVG(count_stars)
FROM movies;
/* => 4.333 */
```

We can also even do things like saying let's select all of the columns. That's count star, but then we're also going to add another comma, which means we're going to add more columns to that. Let's find out what the Rotten Tomatoes score would be for the count stars. There's five possible stars. Let's just show what this looks like right now, just so we can build this up. Rotten Tomatoes score, this isn't going to work very well for us right now.

Right now we see that's 0 and 1. That's really funny, right? The reason here, we have to parse this to a float, so that it's going to handle this division properly, instead of an integer. We start to see what this is going to look like if we multiply that by 100. Now we see on Rotten Tomatoes three stars out of five. That's 60 percent five stars out of five, that's 100 percent. We see, with the clean star, we got all of these other columns additionally.

```sql
SELECT *,
(count_stars::float/5)*100 AS rotten_tomatoes_score
FROM movies;
```
| id | title           |release_date| count_stars |director_id | rotten_tomatoes_score |
|----|-----------------|------------|-------------|------------|-----------------------|
| 1  | Kill Bill       | 2010-10-10 | 3           | 1          | 60                    |
| 2  | Funny People    | 2009-07-29 | 5           | 2          | 100                   |
| 3  | Blazing Saddles | 1974-02-07 | 5           | 3          | 100                   |

We're starting to see just how powerful select statements can be to limit and project into different tables, to see exactly the view of the data that we want.