# Week 9 – MongoDB Library API

## Overview

This project is a REST API for managing a library using **Node.js, TypeScript, Express, MongoDB, and Mongoose**.

The API supports managing books and authors, registering library members, and borrowing and returning books.

## Technologies

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Docker and Docker Compose
- Postman for API testing

## Getting Started

### 1. Prerequisites

Make sure you have installed:

- Node.js
- Docker Desktop
- Postman

### 2. Install dependencies

Clone or download the project, open the project folder in your terminal, and run:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your MongoDB connection string and port.

Example:

```env
MONGO_URI=mongodb://localhost:27017/library
PORT=3002
```

Use the variable names expected by your `db.ts` and `index.ts` files. If your project uses a different MongoDB database name or port, update these values accordingly.

### 4. Start MongoDB

If your project includes a `docker-compose.yml` file, start the containers with:

```bash
docker compose up -d
```

### 5. Start the API

Run:

```bash
npm start
```

The API should be available at:

```text
http://localhost:3002
```

## API Endpoints

### Books

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books?genre=fantasy` | Filter books by genre |
| GET | `/books?sort=publishedYear` | Sort by publication year, oldest first |
| GET | `/books?sort=-publishedYear` | Sort by publication year, newest first |
| GET | `/books?page=1&limit=10` | Paginate book results |
| POST | `/books` | Create a book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

Allowed genres are `fantasy`, `dystopian`, `children`, and `classic`.

Example request body for creating a book:

```json
{
  "title": "The Hobbit",
  "genre": "fantasy",
  "publishedYear": 1937,
  "author": "AUTHOR_OBJECT_ID"
}
```

Replace `AUTHOR_OBJECT_ID` with an existing author's MongoDB `_id`.

### Authors

| Method | Endpoint | Description |
|---|---|---|
| POST | `/authors` | Create an author |
| GET | `/authors` | Get all authors |
| GET | `/authors/:id/books` | Get books written by an author |

Example request body:

```json
{
  "name": "J. R. R. Tolkien"
}
```

### Members

| Method | Endpoint | Description |
|---|---|---|
| POST | `/members` | Register a member |

Example request body:

```json
{
  "name": "Alex Smith",
  "email": "alex@example.com"
}
```

Each member must have a unique email address.

### Loans

| Method | Endpoint | Description |
|---|---|---|
| POST | `/loans` | Borrow a book |
| PATCH | `/loans/:id/return` | Return a borrowed book |
| GET | `/members/:id/loans` | Get a member's loans |

Example request body for borrowing a book:

```json
{
  "book": "BOOK_OBJECT_ID",
  "member": "MEMBER_OBJECT_ID"
}
```

Both values must be valid MongoDB document IDs for existing records.

A book cannot be borrowed again while it has an active loan. Returning a book records its return date.

## Testing with Postman

1. Start MongoDB and the API.
2. Create an author using `POST /authors`.
3. Create a book using `POST /books`, using the author's `_id`.
4. Register a member using `POST /members`.
5. Borrow the book using `POST /loans`, using the book and member `_id` values.
6. Try borrowing the same book again; an active loan should return a conflict response.
7. Return the book using `PATCH /loans/:id/return`.
8. Retrieve the member's loan history using `GET /members/:id/loans`.

For POST and PUT requests, select **Body → raw → JSON** in Postman and set the request header to `Content-Type: application/json`.

## Error Handling

The API handles common errors, including:

- Missing required fields
- Invalid genres
- Invalid MongoDB IDs
- Books or members that do not exist
- Duplicate member email addresses
- Attempts to borrow a book that is already on loan
- Attempts to return an already-returned loan

## Project Structure

```text
week9-mongodb/
├── models/
│   ├── Author.ts
│   ├── Book.ts
│   ├── Member.ts
│   └── Loan.ts
├── db.ts
├── index.ts
├── package.json
├── docker-compose.yml
├── .env
└── README.md
```

## Notes

- Do not commit your `.env` file or other secrets to version control.
- Make sure MongoDB is running before starting API requests.
- Use actual MongoDB `_id` values when connecting books, authors, members, and loans.
