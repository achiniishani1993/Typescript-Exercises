# My Library API

A TypeScript Express + PostgreSQL library API with a simple frontend.

## Features

* Books: CRUD, search, filter, sort and pagination
* Authors and books
* Members and loans
* Book borrowing and returning
* Statistics
* Frontend UI

## Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Database

Start PostgreSQL with Docker:

```bash
docker compose up -d
```

`init.sql` creates the database tables.


# Skill 3: The Book model and CRUD -screenshots

<img src="/images/get.png" alt="Books API screenshot" width="600">

<img src="/images/get:id.png" alt="Books API screenshot" width="600">

<img src="/images/post.png" alt="Books API screenshot" width="600">

<img src="/images/patch.png" alt="Books API screenshot" width="600">

<img src="/images/delete.png" alt="Books API screenshot" width="600">