Let's create a table with SQL. Here, we're going to be using the `create` statement. We'll say `create table Users`, and then in open parentheses, we'll say `create_date`. There's going to be a `date`. `user_handle` is going to be a `uuid`. `last_name` will be a `text`. `first_name` will be a `text` as well. We'll close it off and then use a semicolon. Perfect. We've created our first table.

```sql
create table Users (
create_date Date,
user_handle uuid,
last_name text,
first_name text );
CREATE TABLE
```

![create table command with description of column type](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1556808032/transcript-images/CreateTable.svg)

The main principle to keep in mind here is the `create` statement. This tells your database that we'll be creating something new.

We'll use the `create` statement to add other components within our database. For this instance, we need to define what we're creating, which is a `table`. After we've established we're creating a table, we'll give it a name, `users`.

Inside the parentheses, we'll define all of the columns within our new table and list the type of data that will live within this column. For example, the `create_date` column holds date types of data. Each time data is inserted into this table, the data will need to match each data type or an error will be thrown.

`text` is referring to a string or a character type, and `uuid` is a universally unique identifier. Some other recognized types used in SQL are `boolean` and `int` for numbers. Each database such as Postgres and MySQL will have more granular and advanced types that can be used.

I will link to some popular databases that use SQL below in the video notes. I recommend taking some time to go through these because they can vary greatly between databases.

Here are the links:

[MySQL](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)

[Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.html)

[SQL Server](https://docs.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql?view=sql-server-2017)

[Postgresql](https://www.postgresql.org/docs/9.5/datatype.html)
