import "./instrument.ts";
import { reportError } from "./src/utils/reportError.ts";
import express from "express";
import pool from "./db.ts";
import { validate } from "./src/middleware/validate.js";
import * as Sentry from "@sentry/node";
import {
  Book as BookSequelize,
  Author as AuthorSequelize,
  Member as MemberSequelize,
  Loans as LoansSequelize,
} from "./models/Associations.ts";
import {
  bookSchema,
  bookPatchSchema,
  bookQuerySchema,
  type Book,
  idParamSchema,
  authorSchema,
  memberSchema,
  loanSchema,
  type Author,
  type Member,
  type Loan,
} from "./src/schemas.ts";
import { z, ZodError } from "zod";


import dotenv from 'dotenv';
import sequelize from './sequelize';

dotenv.config();

// async function testDatabaseConnection(): Promise<void> {
//     try {
//         await sequelize.authenticate();

//         console.log('Database connection established successfully');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

//testDatabaseConnection();



const app = express();

app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

app.get("/debug-sentry", (req, res) => {
throw new Error("My first Sentry error!");
});



app.get("/books", async (req, res) => {
  const parsed = bookQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({
      errors: z.flattenError(parsed.error),
    });
    }

  const { genre, sort, search, page, limit } = parsed.data;
  const offset = (page - 1) * limit;
  const allowedSorts = ["title", "published_year", "genre"];

  // sort
  if (sort && !allowedSorts.includes(String(sort))) {
    res.status(400).json({
      error: "Invalid sort column",
    });
    return;
  }

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
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

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
  
   // const result = await BookSequelize.findAll();// pool.query(query, values);
    const books = await BookSequelize.findAll({
      include: [
        {
          model: AuthorSequelize,
          attributes: ["name"],
        },
      ],
    });


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
      data: books,
    });
  } catch (err) {
    Sentry.addBreadcrumb({
  message: "Fetch all books route",
  level: "info",
  });
  reportError(err, "books");
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

app.post("/books", validate(bookSchema, "body"), async (req, res) => {
  // const result = bookSchema.safeParse(req.body);
  const book = res.locals.validated;
  // if (!result.success) {
  //   return res.status(400).json({
  //     errors: z.flattenError(result.error),
  //   });
  // }
  // const { title, genre, published_year, author_id } = result.data;

  try {
    // const result = await pool.query<Book>(
    //   `INSERT INTO books
    //    (title, genre, published_year, author_id)
    //    VALUES ($1, $2, $3, $4)
    //    RETURNING *`,
    //   // [title, genre, published_year, author_id],
    //   [book.title, book.genre, book.published_year, book.author_id],
    // );
    const result = await BookSequelize.create(book);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: "Invalid request body",
        details: err.issues,
      });
    }

          Sentry.addBreadcrumb({
  message: "Save books route",
  level: "info",
  });
  reportError(err, "books");
    console.log(err);

   return res.status(500).json({
      error: err instanceof Error
        ? err.message
        : "An unknown error occurred",
    });
      }
});

app.get("/books/:id", validate(idParamSchema, "params"), async (req, res) => {
  // const parsed = idParamSchema.safeParse(req.params);

  // if (!parsed.success) {
  //   return res.status(400).json({
  //     errors: z.flattenError(parsed.error),
  //   });
  // }
  // const { id } = parsed.data;
  const { id } = res.locals.validated;
  try {
    // const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
      const result = await BookSequelize.findByPk(id);

    if (!result) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
      Sentry.addBreadcrumb({
  message: "Fetch books by id route",
  level: "info",
  });
  reportError(err, "books");
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

app.patch("/books/:id", async (req, res) => {
  const parsed = bookPatchSchema.safeParse(req.body);
  const parsedId = idParamSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      errors: z.flattenError(parsed.error),
    });
  }

  if (!parsedId.success) {
    return res.status(400).json({
      errors: z.flattenError(parsedId.error),
    });
  }

  const { id } = parsedId.data;
  const { title, genre, published_year } = parsed.data;

  if (Object.keys(req.body ?? {}).length === 0) {
    return res.status(400).json({
      error: "Request body cannot be empty",
    });
  }

  try {
    const book = await BookSequelize.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (title !== undefined) book.title = title;
    if (genre !== undefined) book.genre = genre;
    if (published_year !== undefined) {
      book.published_year = published_year;
    }

    await book.save();

    return res.status(200).json(book);
  } catch (err) {
          Sentry.addBreadcrumb({
  message: "Patch books route",
  level: "info",
  });
 reportError(err, "books");
    console.error(err);

    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(500).json({
      error: "An unknown error occurred",
    });
  }
});


// exercise 6 authors

app.get("/authors", async (req, res) => {
  try {
    const result = await pool.query<Author>("SELECT * FROM authors");

    res.status(200).json(result.rows);
  } catch (err) {
          Sentry.addBreadcrumb({
  message: "Fetch authors route",
  level: "info",
  });
 reportError(err, "authors");
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

app.post("/authors", validate(authorSchema, "body"), async (req, res) => {
  // const { name } = req.body ?? {};

  // if (!name) {
  //   res.status(400).json({ error: "Name is required" });
  //   return;
  // }
  const author = res.locals.validated;

  try {
    const result = await pool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING *",
      [author.name],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
          Sentry.addBreadcrumb({
  message: "Save authors route",
  level: "info",
  });
  reportError(err, "authors");
    console.log(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

app.get(
  "/authors/:id/books",
  validate(idParamSchema, "params"),
  async (req, res) => {
    // const parsed = idParamSchema.safeParse(req.params);

    // if (!parsed.success) {
    //   return res.status(400).json({
    //     errors: z.flattenError(parsed.error),
    //   });
    // }
    // const { id } = parsed.data;
    const { id } = res.locals.validated as { id: number };

    try {
      // const result = await pool.query(
      //   `SELECT books.*
      //  FROM books
      //  JOIN authors ON books.author_id = authors.id
      //  WHERE authors.id = $1`,
      //   [id],
      // );

       const author = await AuthorSequelize.findByPk(id, {
        include: [
          {
            model: BookSequelize,
          },
        ],
      });

      if (!author) {
        return res.status(404).json({
          message: "Author not found",
        });
      }

      return res.status(200).json(author);
    } catch (err) {
            Sentry.addBreadcrumb({
  message: "Fetch authors by id route",
  level: "info",
  });
 reportError(err, "authors");
      console.log(err);

      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
);

// 7. Borrowing books (many-to-many)

app.post("/members", validate(memberSchema, "body"), async (req, res) => {
  // const { name, email } = req.body ?? {};

  // if (!name || !email) {
  //   res.status(400).json({
  //     error: "Name and email are required",
  //   });
  //   return;
  // }
  const { name, email } = res.locals.validated as Member;
  try {
    const result = await pool.query(
      `INSERT INTO members (name, email)
       VALUES ($1, $2)
       RETURNING *`,
      [name, email],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
          Sentry.addBreadcrumb({
  message: "Save members route",
  level: "info",
  });
 reportError(err, "members");

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

app.post("/loans", validate(loanSchema, "body"), async (req, res) => {
  // const { book_id, member_id } = req.body ?? {};

  // if (!book_id || !member_id) {
  //   res.status(400).json({
  //     error: "book_id and member_id are required",
  //   });
  //   return;
  // }

  const { book_id, member_id } = res.locals.validated as Loan;

  try {
  //   const borrowedBook = await pool.query(
  //     `SELECT * from loans
  // WHERE book_id = $1
  // AND returned_at IS NULL`,
  //     [book_id],
  //   );

    // if (borrowedBook.rows.length > 0) {
    //   res.status(409).json({
    //     error: "Book is already borrowed",
    //   });
    //   return;
    // }
    // const result = await pool.query(
    //   `INSERT INTO loans (book_id, member_id)
    //    VALUES ($1, $2)
    //    RETURNING *`,
    //   [book_id, member_id],
    // );

   // res.status(201).json(result.rows[0]);
   const loan = await LoansSequelize.create({
        book_id,
        member_id,
        borrowed_at: new Date(),
        returned_at: null,
      });

      res.status(201).json(loan);
  } catch (err) {
     Sentry.addBreadcrumb({
  message: "Save loans route",
  level: "info",
  });
 reportError(err, "loans");
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred",
      });
    }
  }
});

app.patch(
  "/loans/:id/return",
  validate(idParamSchema, "params"),
  async (req, res) => {
    // const parsed = idParamSchema.safeParse(req.params);

    // if (!parsed.success) {
    //   return res.status(400).json({
    //     errors: z.flattenError(parsed.error),
    //   });
    // }
    // const { id } = parsed.data;

    const { id } = res.locals.validated as { id: number };

    try {
      const returnBook = await pool.query(
        `UPDATE loans
       SET returned_at = NOW()
       WHERE id = $1
       RETURNING *`,
        [id],
      );

      if (returnBook.rows.length === 0) {
        res.status(404).json({
          message: "Not found",
        });
        return;
      }

      res.status(200).json(returnBook.rows[0]);
    } catch (err) {
       Sentry.addBreadcrumb({
  message: "Patch loan return route",
  level: "info",
  });
  reportError(err, "loans");
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({
          error: "An unknown error occurred",
        });
      }
    }
  },
);

app.get(
  "/members/:id/loans",
  validate(idParamSchema, "params"),
  async (req, res) => {
    // const parsed = idParamSchema.safeParse(req.params);

    // if (!parsed.success) {
    //   return res.status(400).json({
    //     errors: z.flattenError(parsed.error),
    //   });
    // }
    // const { id } = parsed.data;

    const { id } = res.locals.validated as { id: number };

    try {
      // const result = await pool.query(
      //   `SELECT
      //    loans.id,
      //    loans.book_id,
      //    books.title,
      //    loans.borrowed_at,
      //    loans.returned_at
      //  FROM loans
      //  JOIN members
      //    ON loans.member_id = members.id
      //  JOIN books
      //    ON loans.book_id = books.id
      //  WHERE members.id = $1`,
      //   [id],
      // );

      // res.status(200).json(result.rows);
       const loans = await LoansSequelize.findAll({
        where: {
          member_id: id,
        },
      });

      res.status(200).json(loans);
    } catch (err) {
       Sentry.addBreadcrumb({
  message: "Fetch members loan",
  level: "info",
  });
 reportError(err, "members");
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({
          error: "An unknown error occurred",
        });
      }
    }
  },
);

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
     Sentry.addBreadcrumb({
  message: "Fetch stats route",
  level: "info",
  });
  reportError(err, "stats");
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
app.delete(
  "/books/:id",
  validate(idParamSchema, "params"),
  async (req, res) => {
    const { id } = res.locals.validated as { id: number };

    try {
      const book = await BookSequelize.findByPk(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      await book.destroy();

      return res.status(200).json(book);
    } catch (err) {
       Sentry.addBreadcrumb({
  message: "Delete books route",
  level: "info",
  });
  reportError(err, "books");
      console.error(err);

      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      }

      return res.status(500).json({
        error: "An unknown error occurred",
      });
    }
  },
);

// I DIDN'T CHANGE items and name here

app.get("/items/:id", async (req, res) => {
  Sentry.addBreadcrumb({
    message: `Fetch item ${req.params.id}`,
    level: "info",
  });

  try {
    const id = z.number().int().positive().parse(
      Number(req.params.id)
    );

    const item = await BookSequelize.findByPk(id);

    if (!item) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    res.json({
      ...item.toJSON(),
      title: item.title.toUpperCase(),
    });

  } catch (error) {

    // returns 400
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Invalid ID",
      });
    }


    reportError(error, "items");

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
