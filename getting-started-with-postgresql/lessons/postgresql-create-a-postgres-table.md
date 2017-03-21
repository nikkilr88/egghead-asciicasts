We're going to start with a `CREATE TABLE` statement and Create Directors table, some movie directors for us. Nice ID column here. *Serial* says that it's going to be *auto-incrementing*, so it would go one, two, three automatically. We don't have to worry about that.

```sql
CREATE TABLE directors (
  id SERIAL PRIMARY key,
  name VARCHAR(200)
);
```

We'll get a name for our `directors`. This is going to be a string up to 200 characters long. We can just see here that the `directors` table is in fact created. There's no data in it. Name, ID -- that's what we expect to see.

```sql
SELECT *
FROM directors;
```

`directors` don't really matter unless we have movies. Let's give it another ID column. We've seen that before. Again, these are kind of arbitrary. We'll give it a title. We probably want the title to be there, so we're going to say that it's not null. It can never be null.

Let's give it a `release_date`. We haven't seen the `DATE` definition before. [`count_stars`] It's going to be the number of stars they can have, maybe one, two, three, four, five. Let's give it a `director_id` to reference the directors table.

```sql
CREATE TABLE movies(
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  releas_date DATE,
  count_stars INTEGER,
  director_id INTEGER
);
```

We saw `directors` before. Let's see `movies`. There we go. A little empty table. That's what we expect.

```sql
SELECT *
FROM movies;
```

Just for good measure, I'm going to `INSERT` some data here. Don't worry about what these things say. I just want to take a look at what this means to have some data in our tables now, so we can have a sense of what these tables are about.

| id | name              |
|----|-------------------|
| 1  | Quinton Tarantino |
| 2  | Judd Apatow       |

| id | name         |release_date| count_stars |director_id |
|----|--------------|------------|-------------|------------|
| 1  | Kill Bill    | 2010-10-10 | 3           | 1          |
| 2  | Funny People | 2009-07-29 | 5           | 2          |

Now we have our `directors` table up here. We see `ID`s were inserted for us, because we only inserted some names up here. The same thing happens for us down here in the `movies` table. We inserted a couple `movies`, and this is what those tables look like when we fill in some more data.