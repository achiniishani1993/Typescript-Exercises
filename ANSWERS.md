1. The video calls Sequelize a "translator". What does it translate, and from what into what?

Sequelize acts as a translator between JavaScript code and a relational database. It translates JavaScript code talk to our database without having to write complicated SQL queries directly. It make database interaction easier. 

2. What does ORM stand for? What is the "object" and what is the "relational" part?

ORM stands for Object-Relational Mapping. - This help us to work with database tables as if they were js objects.

Object: Refers to objects in programming, such as JavaScript objects that contain data and properties.
Relational: Refers to relational databases, which store data in tables with rows and columns.

3. Write the SQL that Book.findAll() runs. Then write the SQL for Book.findByPk(3).

SELECT * FROM Books;

SELECT * FROM Books WHERE id = 3;

4. In new Sequelize(...) , what does each of these do: host , port , dialect , logging ?

- host: Specifies the server address where the database is running (e.g., localhost).
- port: Specifies the port number used to connect to the database (e.g., 5432 for PostgreSQL).
- dialect: Specific type of database, such as MySQL, PostgreSQL, SQLite, or MariaDB.
- logging: Controls whether SQL queries are printed to the console. 

Why? These options tell Sequelize where the database is located, how to connect to it, which database system to use, and whether to display the SQL queries being executed.

5. What does sequelize.sync() do? What would sequelize.sync({ force: true }) do, and why
should you never use it on a database with real data?

sequelize.sync() synchronizes the database tables with the models defined in Sequelize application. It creates tables that do not already exist, but leaves existing tables unchanged by default. 

sequelize.sync({ force: true }) drops existing tables and recreates them based on the models.

Why should you never use it on a database with real data? Because it deletes existing tables and their data, which could result in losing important user information or business records.

Reference: Sequelize Official Documentation — https://sequelize.org/docs/v7/terminology/

6. Name one situation where writing plain SQL is better than using an ORM.

when performing complex queries that require high performance. Plain SQL gives the developer more direct control over the query and allows them to optimize it for the database.

# why does the loan date belong in the loans table, and not in books or members ?

The loan date belongs in the loans table because it describes the borrowing event, not the book or the member. A book can be borrowed by different members at different times, so each loan needs its own dates.