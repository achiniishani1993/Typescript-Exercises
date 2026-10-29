* GET /authors/:id/books
Executing (default): SELECT "Author"."id", "Author"."name", "Books"."id" AS "Books.id", "Books"."title" AS "Books.title", "Books"."genre" AS "Books.genre", "Books"."published_year" AS "Books.published_year", "Books"."author_id" AS "Books.author_id" FROM "authors" AS "Author" LEFT OUTER JOIN "books" AS "Books" ON "Author"."id" = "Books"."author_id" WHERE "Author"."id" = 2;

# JOIN query

SELECT books.*
FROM authors
LEFT JOIN books ON authors.id = books.author_id
WHERE authors.id = 2;

* GET /members/:id/loans

Executing (default): SELECT "id", "book_id", "member_id", "borrowed_at", "returned_at" FROM "loans" AS "Loans" WHERE "Loans"."member_id" = 1;

# JOIN query

SELECT loans.*
FROM members
JOIN loans ON members.id = loans.member_id
WHERE members.id = 1;

## 1. Why did you choose that JOIN?

For authors and books, I chose `LEFT JOIN` because I want to retrieve the author even if they have no books.

For members and loans, I chose `JOIN` (`INNER JOIN`) because I want to retrieve members who have matching loans.

## 2. Does Sequelize use INNER JOIN or LEFT OUTER JOIN for `include`? Why do you think it chose that?

Sequelize uses `LEFT OUTER JOIN` by default for `include` because `required` defaults to `false`. This allows it to return the main record even when there are no associated records.


## 3. What is different between Sequelize's SQL and mine?

Sequelize uses table aliases, such as `"Author"` and `"Books"`, and prefixes associated columns with aliases like `"Books.title"`. It also selects specific columns and gives associated columns aliases so Sequelize can map the results to nested objects.

My SQL is simpler and uses `books.*` or `loans.*` to select all columns from a table. Sequelize generates more detailed SQL to support its model associations and structure the returned data.
