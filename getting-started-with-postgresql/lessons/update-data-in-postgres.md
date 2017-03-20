Now let's `UPDATE` our data. Let's say we're going to `UPDATE` our movies. We're going to set the count stars equal to one. Let's also select all from movies after that. 

```sql
UPDATE movies
SET count_stars=1;

SELECT *
FROM movies;
```
| id | title           |release_date| count_stars |director_id |
|----|-----------------|------------|-------------|------------|
| 1  | Kill Bill       | 2010-10-10 | 1           | 1          |
| 2  | Funny People    | 2009-07-29 | 1           | 2          |
| 3  | Blazing Saddles | 1974-02-07 | 1           | 3          |

We'll see every single movie got updated where its count stars are now one because we didn't limit this in any way. If we want to, we can use the `WHERE` clause here.

Let's say the name is "Kill Bill." I'm sure people were sad that I rated that solely before. Let's give it a five star. Name doesn't exist. That's a mistake I made here. Let's say where title equals Kill Bill.

```sql
UPDATE movies
SET count_stars=5
where title='Kill Bill';

SELECT *
FROM movies;
```
| id | title           |release_date| count_stars |director_id |
|----|-----------------|------------|-------------|------------|
| 1  | Kill Bill       | 2010-10-10 | 5           | 1          |
| 2  | Funny People    | 2009-07-29 | 1           | 2          |
| 3  | Blazing Saddles | 1974-02-07 | 1           | 3          |

It's important to notice that we did in fact get this error. `title` is Kill Bill. We have five stars now, that limited to just one movie and before we limit it to multiple movies or all of the movies. We can prove that we can limit to a subset of the movies here but more than one.

Where the count stars is one, let's give this a three maybe. We see "Funny People" and "Blazing Saddles" now have three stars. 

```sql
UPDATE movies
SET count_stars=3
where count_stars=1;

SELECT *
FROM movies;
```
| id | title           |release_date| count_stars |director_id |
|----|-----------------|------------|-------------|------------|
| 1  | Kill Bill       | 2010-10-10 | 5           | 1          |
| 2  | Funny People    | 2009-07-29 | 3           | 2          |
| 3  | Blazing Saddles | 1974-02-07 | 3           | 3          |

Obviously, we can use any field here. If we want it to say where the `release_date` is greater than, we keep using 1975, so this will be everything except Blazing Saddles.

We'll set the count stars equal to zero. Pretty simple. 

```sql
UPDATE movies
SET count_stars=0
where release_date > '01-01-1975;

SELECT *
FROM movies;
```
| id | title           |release_date| count_stars |director_id |
|----|-----------------|------------|-------------|------------|
| 1  | Kill Bill       | 2010-10-10 | 0           | 1          |
| 2  | Funny People    | 2009-07-29 | 0           | 2          |
| 3  | Blazing Saddles | 1974-02-07 | 3           | 3          |


That's a basic `UPDATE`. Remember we're always limiting to the where clause. Something that's helpful before you actually run an `UPDATE` is to look at what that's going to be. If we write this as a select statement, we can see which movies we're going to `UPDATE` before we actually issue the `UPDATE` command.