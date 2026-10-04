-- Skill 1: Rebuild the Relationships from the Video

-- 1. ONE-TO-ONE

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name TEXT NOT NULL, 
email TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE profiles(
id SERIAL PRIMARY KEY,
user_id INT UNIQUE,
bio TEXT, 
FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, email) VALUES ('Achini', 'achini@gmail.com');
INSERT INTO profiles (user_id, bio) VALUES (2, 'Loves SQL');

select * from users
select * from profiles

SELECT * from users JOIN profiles ON users.id=profiles.user_id

-- 2.One-to-many

CREATE TABLE authors (
id SERIAL PRIMARY KEY,
name VARCHAR(100)
);

CREATE TABLE books (
id SERIAL PRIMARY KEY,
title VARCHAR(100),
author_id INT,
FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO authors (name) VALUES ('Pramod');
select * from authors
INSERT INTO books (title, author_id) VALUES ('Loves SQL', 1);
INSERT INTO books (title, author_id) VALUES ('Basketball Life', 1);
select * from books

SELECT * from authors JOIN books ON authors.id=books.author_id;

SELECT authors.name,authors.id, books.title, books.author_id 
from authors 
JOIN books ON authors.id=books.author_id;

UPDATE books SET title = 'Coding Life' where id=1

-- 3.Many-to-many

CREATE TABLE students (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL
);

CREATE TABLE courses (
id SERIAL PRIMARY KEY,
title VARCHAR(100)
);

CREATE TABLE student_courses (
  student_id INT,
  course_id  INT, 
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

Select * from students
Select * from courses
Select * from student_courses

INSERT INTO students (name) VALUES ('Mark'), ('Benten');
INSERT INTO courses (title) VALUES ('SQL'), ('Docker');
INSERT INTO student_courses (student_id,course_id)VALUES (1,1), (1,2), (2,1);

SELECT students.name, courses.title
FROM students
JOIN student_courses ON students.id=student_courses.student_id
JOIN courses ON courses.id=student_courses.course_id

-- Try to break it!
INSERT INTO books (title, author_id) VALUES ('Backend Book', 56);

--Error 

-- ERROR:  insert or update on table "books" violates foreign key constraint "books_author_id_fkey"
-- Key (author_id)=(56) is not present in table "authors". 

--why

-- The books.author_id field contains a foreign key which should link to a valid id in the authors table. As there is no record for author_id = 56 in the authors table, the insertion is not accepted by PostgreSQL.