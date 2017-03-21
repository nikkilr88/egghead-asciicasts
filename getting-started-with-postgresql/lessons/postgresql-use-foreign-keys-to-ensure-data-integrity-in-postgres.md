We've created some tables in the past. But, before, we've never explained what this references. This references the `directors` table. It references the `ID` column of the `directors` table, this right here.

```sql
CREATE TABLE directors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  release_date DATE,
  count_stars INTEGER,
  director_id INTEGER REFERENCES directors(id)
);
```

 Those two things are supposed to be the same exact value. That's how we link the two of them. We can go ahead and create that. This will create a foreign key on the `movies` table.

Let's go ahead and `INSERT` some `directors`, as we've done before. That's pretty simple. Then let's also `INSERT` into `movies`. This is going to give us an error this time. That's what we want. We've got our count stars. We've got our `director_id`. Going to `INSERT` some values here. We've inserted some of these in the past, and they go OK.

We're going to `INSERT` three `movies` this time, though. Let's give ourselves "Kill Bill." This references `director_id` 1. We know Quentin Tarantino is in the database. That's going to be OK. We're going to try to put in "Funny People." That should go OK as well because we've done this in the past, and we know that we have Judd Apatow. He's in the database as well.

```sql
INSERT INTO movies (title, release_date, count_stars, director_id) VALUES (
  'Kill Bill',
  '10-10-2003',
  3,
  1
), (
  'Funny People',
  '07-20-2009',
  5,
  2
);
```

Then we're going to insert "Barton Fink." We don't have the Coen brothers in our database here. If I try to reference `ID` 3 right here, we know that `director_id` doesn't exist. This is going to fail because now we have a references column. We say there's no `director_id` 3 in the table `directors`. This is what we want.

```sql
INSERT INTO movies (title, release_date, count_stars, director_id) VALUES (
  'Kill Bill',
  '10-10-2003',
  3,
  1
), (
  'Funny People',
  '07-20-2009',
  5,
  2
)(
  'Barton Fink',
  '09-21-1991',
  5,
  3
);
```

This going to work wonders for us for making sure that our data is valid. We're going to insert into `directors`. We'll give the name values. We'll say Coen brothers, insert those. 

```sql
INSERT INTO directors (name) VALUES ('Coen brothers');
```

Now, for `movies`, we can see that Barton Think is in here with `director_id` 3.