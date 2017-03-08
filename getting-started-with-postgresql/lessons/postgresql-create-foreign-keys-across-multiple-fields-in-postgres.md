We're going to look at creating **Multi Foreign Keys**. Those are Foreign Keys across multiple fields. To do this, we're going to create a bunch of tables that we're going to need for owning a movie rental store. The table that we're going to reference, ultimately, is going to be called `rentable_movies`.

```sql
CREATE TABLE rentable_movies (
  movie_id INTEGER NOT NULL REFERENCES movies(id),
  store_id INTEGER NOT NULL REFERENCES stores(id),
  copy_number INTEGER NOT NULL,
  PRIMARY KEY (movie_id, store_id, copy_number)
);
```

You can see that we have a bunch of Foreign Keys already on it. `rentable_movies` has a unique `PRIMARY KEY` that represents three different columns. It doesn't have an `id` field like all the other ones are. Generally, I do recommend that you use a unique `id` field so that you don't have to do complicated joins like this.

However, if we do happen to have this Multi `FOREIGN KEY`, we can still create it on another table that references `rentable_movies`. I'm going to go ahead and paste in the basic definition for the `rentings` table. This will link a particular rentable movie to a guest who has rented it.

```sql
CREATE TABLE rentings (
  guest_id INTEGER REFERENCES guests(id),
  movie_id INTEGER NOT NULL,
  store_id INTEGER NOT NULL,
  copy_number INTEGER NOT NULL,
  due_back DATE,
  returned BOOLEAN,
);
```

Here is where we're actually going to define this new `FOREIGN KEY`. We can't just use the word references, because not one specific column references another.

We start with `FOREIGN KEY`, and then, we say the `FOREIGN KEY` is the combination of the `movie_id`, the `store_id` and the `copy_number`, because those were the fields that represented the `PRIMARY KEY` on the other table.
`REFERENCES rentable_movies`. It references the same columns on that table. 

```sql
CREATE TABLE rentings (
  guest_id INTEGER REFERENCES guests(id),
  movie_id INTEGER NOT NULL,
  store_id INTEGER NOT NULL,
  copy_number INTEGER NOT NULL,
  due_back DATE,
  returned BOOLEAN,
  FOREIGN KEY (movie_id, store_id, copy_number) REFERENCES rentable_movies(movie_id, store_id, copy_number)
);
```

Here, I will also create some mock data for these other tables.
I'll take a look at what this looks like real quick. We have directors, we have a couple of movies, we have a couple of store locations; San Francisco and Philadelphia, and finally, we have a couple of `rentable_movies` that link up all of these individual things to `store_id`s and copies that they have in those stores.

![Mock Data Tables](../images/postgresql-create-foreign-keys-across-multiple-fields-in-postgres-tables.png)

Here, what's important to point out is that we can't `INSERT` a rentable movie renting that doesn't exist. We'll `INSERT` into the `rentings` table. This guy has `guest_id`, `movie_id`, `store_id`, `copy_number`; it has `due_back`, and it has whether or not it was `returned`.

```sql
INSERT INTO rentings (guest_id, movie_id, store_id, copy_number, due_back, returned)
```

Let's look at our `VALUES` here. We don't have a `movie_id` `3`, `store_id` `1` copy `1`, that doesn't exist. We do have a guest `1`. `due_back` will be a date, we'll pick an arbitrary date, way in the past for some reason. It hasn't been returned, we'll try to `INSERT` this.

```sql
INSERT INTO rentings (guest_id, movie_id, store_id, copy_number, due_back, returned) VALUES (
  1,
  3,
  1,
  1,
  '01-01-1999'.
  false
);
```

This violates the `FOREIGN KEY` constraint on the `rentable_movies` table, because we didn't have this combination anywhere.

![Error](../images/postgresql-create-foreign-keys-across-multiple-fields-in-postgres-error.png)

We do however have the combination of `movie_id` `1`, and `store_id` `1`, and `copy_number`. We insert that and that works fine.

![Success](../images/postgresql-create-foreign-keys-across-multiple-fields-in-postgres-success.png)

We can `SELECT * FROM rentings;` and see that. In fact, we have created that renting now.

![Renting Table](../images/postgresql-create-foreign-keys-across-multiple-fields-in-postgres-renting.png)