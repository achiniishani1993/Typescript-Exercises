import express from "express";
import pool from "./db.ts";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the My Library API" });
});

app.get("/books", async (req, res) => {
  const { genre, sort, search } = req.query;

  const allowedSorts = ["title", "published_year", "genre"];

  // sort
  if (sort && !allowedSorts.includes(String(sort))) {
    res.status(400).json({
      error: "Invalid sort column",
    });
    return;
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page < 1 ||
    limit < 1
  ) {
    res.status(400).json({
      error: "Page and limit must be positive numbers",
    });
    return;
  }

  const offset = (page - 1) * limit;

  try {
   
    const conditions: string[] = [];
    const values: string[] = [];

    if (genre) {
      values.push(String(genre));
      conditions.push(`genre = $${values.length}`);
    }

    if (search) {
      values.push(`%${String(search)}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

   
    let query = `SELECT *
                 FROM books
                 ${whereClause}`;

    if (sort) {
      query += ` ORDER BY ${String(sort)}`;
    }

    query += ` LIMIT $${values.length + 1}
               OFFSET $${values.length + 2}`;

    values.push(String(limit));
    values.push(String(offset));

    const result = await pool.query(query, values);

   
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM books
      ${whereClause}
    `;


    const countValues = values.slice(0, -2);

    const countResult = await pool.query(countQuery, countValues);

    const total = Number(countResult.rows[0].total);

    res.status(200).json({
      page,
      limit,
      total,
      data: result.rows,
    });
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred",
      });
    }
  }
});

app.post("/books", async (req, res) => {
  const { title, genre, published_year, author_id } = req.body ?? {};

  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO books
       (title, genre, published_year, author_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, genre, published_year, author_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);

    // Foreign key violation
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      err.code === "23503"
    ) {
      res.status(400).json({
        error: "Author does not exist",
      });
      return;
    }

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    res.status(400).json({ error: "ID must be a number" });
    return;
  }

  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

app.patch("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, genre, published_year } = req.body ?? {};

  // Validate ID
  if (!Number.isInteger(Number(id))) {
    res.status(400).json({ error: "ID must be a number" });
    return;
  }

  // Validate body
  if (Object.keys(req.body ?? {}).length === 0) {
    res.status(400).json({ error: "Request body cannot be empty" });
    return;
  }

  try {
    const result = await pool.query(
      `UPDATE books
       SET title = COALESCE($1, title),
           genre = COALESCE($2, genre),
           published_year = COALESCE($3, published_year)
       WHERE id = $4
       RETURNING *`,
      [title ?? null, genre ?? null, published_year ?? null, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// exercise 6 authors

app.get("/authors", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors");

    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

app.post("/authors", async (req, res) => {
  const { name } = req.body ?? {};

  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING *",
      [name],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

app.get("/authors/:id/books", async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    res.status(400).json({ error: "ID must be a number" });
    return;
  }

  try {
    const result = await pool.query(
      `SELECT books.*
       FROM books
       JOIN authors ON books.author_id = authors.id
       WHERE authors.id = $1`,
      [id],
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// 7. Borrowing books (many-to-many)

app.post("/members", async (req, res) => {
  const { name, email } = req.body ?? {};

  if (!name || !email) {
    res.status(400).json({
      error: "Name and email are required",
    });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO members (name, email)
       VALUES ($1, $2)
       RETURNING *`,
      [name, email],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    // email exit already
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      err.code === "23505"
    ) {
      res.status(409).json({
        error: "Email already exists",
      });
      return;
    }

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred",
      });
    }
  }
});

app.post("/loans", async (req, res) => {
  const { book_id, member_id } = req.body ?? {};

  if (!book_id || !member_id) {
    res.status(400).json({
      error: "book_id and member_id are required",
    });
    return;
  }
  try {
    const borrowedBook = await pool.query(
      `SELECT * from loans
  WHERE book_id = $1
  AND returned_at IS NULL`,
      [book_id],
    );

    if (borrowedBook.rows.length > 0) {
      res.status(409).json({
        error: "Book is already borrowed",
      });
      return;
    }
    const result = await pool.query(
      `INSERT INTO loans (book_id, member_id)
       VALUES ($1, $2)
       RETURNING *`,
      [book_id, member_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred",
      });
    }
  }
});

app.patch("/loans/:id/return", async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    res.status(400).json({
      error: "ID is a number",
    });
    return;
  }

  try {
    const returnBook = await pool.query(
      `UPDATE loans
       SET returned_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (returnBook.rows.length === 0) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    res.status(200).json(returnBook.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred",
      });
    }
  }
});

app.get("/members/:id/loans", async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    res.status(400).json({
      error: "ID is a number",
    });
    return;
  }

  try {
    const result = await pool.query(
      `SELECT
         loans.id,
         loans.book_id,
         books.title,
         loans.borrowed_at,
         loans.returned_at
       FROM loans
       JOIN members
         ON loans.member_id = members.id
       JOIN books
         ON loans.book_id = books.id
       WHERE members.id = $1`,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred",
      });
    }
  }
});

app.get("/stats", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT genre, COUNT(*) AS count
      FROM books
      GROUP BY genre
      ORDER BY count DESC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred",
      });
    }
  }
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    res.status(400).json({ error: "ID must be a number" });
    return;
  }

  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred",
      });
    }
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
