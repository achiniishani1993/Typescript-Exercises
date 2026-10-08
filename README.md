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
