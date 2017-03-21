I'm going to talk about enforcing uniqueness constraints today. We're going to insert into Movies...Actually, let's just insert into `directors` because it's going to be easier. Name and we'll see the values Quentin Tarantino. We saw this in the past.

```sql
INSERT INTO directors (name) ('Quintin Tarantino');
```
| id | name              |
|----|-------------------|
| 1  | Quinton Tarantino |
| 2  | Judd Apatow       |
| 3  | Mel Brooks        |
| 4  | Quinton Tarantino |

Oh, no, we have two Quentin Tarantinos in the database and that seems like a mistake, doesn't it? We already have the table. We're going to perform an alter table statement to add the uniqueness constraint.

We're going to add a constraint with this uniqueness is a constraint. We are going to alter the `Directors` table actually, so the constraint is going to have a name as well. We'll name this `directors_name_unique`. We're going to be unique over the name.

```sql
ALTER TABLE directors ADD CONSTRAINT directors_name_unique UNIQUE(name);
```

We'll run that and it will tell us that we can't create the syntax because we already have a duplicate key name like Quentin Tarantino. We're going to delete from the `directors` table where and equals four because that's the second Tarantino.

```sql
DELETE FROM directors WHERE id=4;
```

I can see that he's gone now. If we add the constraint everything is going to go OK. It didn't report anything special to us. To really see this in action we're going to insert into `directors` name values Quentin Tarantino.

```sql
INSERT INTO directors (name) ('Quintin Tarantino');

/* ERROR: duplicate key value violates unique contraint 'directors_name_unique' */
```

Now, we get this scary error, "Duplicate key violates this constraint." That's great. It tells us Quentin Tarantino already exists and we can't insert him into the database no matter how many times we try to do that.

We can also do this constraint on table creating. I like to live on the wild side, so we'll drop the `directors` table. Remember we should never do this in a production setting. Now, we can do a `CREATE TABLE directors_id SERIAL PRIMARY KEY` and our name is going to be `VARCHAR`. It's going to be unique, awesome.

```sql
CREATE TABLE directors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) UNIQUE
);
```

Let's `INSERT INTO directors (name) VALUES ('Quentin'), ` and we'll try to `INSERT` two `Quentin`s in this time. Already the second one is going to fail us, so we can't do that. We'll try doing it one time. That works fine. Second time doesn't work. `SELECT * FROM directors;`. It's going to show us just one Quentin Tarantino.

The `movies` table will probably be a little different because there are some movies that have the same title. We don't really want to enforce this constraint on the `movies` table instead we want to say, `ALTER TABLE movies ADD CONSTRAINT`

Let's say, `unique_title_and_release` The combination of these two fields is what's going to be `UNIQUE`. We'll say its `UNIQUE` constraint and it's going to be `title, release_date`.

```sql
ALTER TABLE movies ADD CONSTRAINT unique_title_and_release UNIQUE(title,release_date);
```

That's really the primary key, so again it doesn't complain because we don't have any violations right now.

If we `INSERT INTO` the `movies` table `(title, release_date, count_stars, director_id)`. We're just going to give it the same thing `'Kill Bill'` and '`10-10-2003`'. It doesn't matter what these other ones are. That's going to be upset because it violates this combination uniqueness constraint.

```sql
INSERT INTO movies (title, release_date, count_stars, director_id) VALUES (
    'Kill Bill',
    '10-10-2003',
    1,
    1
);

SELECT *
FROM movies;
```