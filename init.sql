CREATE TABLE books (
id SERIAL PRIMARY KEY,
title VARCHAR(100) NOT NULL,
genre VARCHAR(50),
published_year INT
);

INSERT INTO books (title, genre, published_year)
VALUES
('The Hobbit', 'fantasy', 1937),
('1984', 'dystopian', 1949),
('Pippi Longstocking', 'children', 1945),
('The Hunger Games', 'dystopian', 2008);

-- 1. Get one book by id

What happens /books/abc? 

-- {
--     "error": "invalid input syntax for type integer: \"abc\""
-- }

-- 2. Use the right status codes and validate input

-- {
--     "error": "ID must be a number"
-- }

-- status - 400 bad request

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

ALTER TABLE books
ADD COLUMN author_id INTEGER REFERENCES authors(id);

-- 7. Borrowing books (many-to-many)

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(id),
    member_id INTEGER NOT NULL REFERENCES members(id),
    borrowed_at TIMESTAMP DEFAULT NOW(),
    returned_at TIMESTAMP
);