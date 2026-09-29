## Skill 1: Docker Setup

This project runs PostgreSQL and pgAdmin in Docker containers using Docker Compose.

- What's included
* compose.yml defines two services:
    * db: the official postgres image
    * pgadmin: the dpage/pgadmin4 image, which depends_on the database
* Both services use restart: always.
* Named volumes (pgdata, pgadmin-data) keep data safe when the containers stop.
* Usernames, passwords, database name and ports are stored in a .env file, which is listed in .gitignore and not pushed to GitHub.

<img src="/images/skill1.png" alt="screenshot">

## Skill 2: Connect pgAdmin to Postgres

Open pgAdmin at http://localhost:8080 and log in with the email and password from .env.

1. General tab: name it.
2. Connection tab:
3. Host: db (the service name) or the container IP from docker inspect my_database11
4. Port: 5432 (the container's port, not 5433)
5. Maintenance database: example
   Username: root
   Password: root
6. Click Save. The server should appear in the left panel.

<img src="/images/skill2.png" alt="screenshot">


## Skill 3: Load the Country Club Data


1. Downloaded `clubdata.sql` from https://pgexercises.com/dbfiles/clubdata.sql
2. Opened the Query Tool in pgAdmin on the `example` database.
3. Removed the psql-only lines above `CREATE SCHEMA cd;` and ran the rest.
4. Verified the data with:

   SELECT * FROM cd.facilities;

<img src="/images/skill3.png" alt="screenshot">

This created the `cd` schema with the tables `members`, `facilities` and `bookings`.

## Skill 4: The Basic Exercises

I worked through all 12 Basic exercises on PostgreSQL Exercises using the cd schema loaded in Skill 3. The answers are in cd.sql, each with a comment above it.

- Topics practiced
* SELECT and choosing columns
* WHERE with comparisons, AND, LIKE and IN
* CASE to sort results into buckets
* Comparing dates
* DISTINCT, ORDER BY and LIMIT
* UNION to combine two queries
* MAX and subqueries for aggregation