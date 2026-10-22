import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./db.ts";
import Book from "./models/Book.ts";
import Author from './models/Author.ts';
import Member from './models/Member.ts';
import Loan from './models/Loan.ts';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the My Library API" });
});

function BookError(error: unknown, res: express.Response) {
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      error: Object.values(error.errors)
        .map((item) => item.message)
        .join(", "),
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      error: "Invalid field value",
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
}

// GET /books

app.get("/books", async (req, res) => {
  try {
    const { genre, sort } = req.query;

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);

    const allowedGenres = [
      "fantasy",
      "dystopian",
      "children",
      "classic",
    ] as const;

    type Genre = (typeof allowedGenres)[number];

    const filter: { genre?: Genre } = {};

    if (typeof genre === "string") {
      if (!allowedGenres.includes(genre as Genre)) {
        return res.status(400).json({
          error:
            "Invalid genre. Allowed genres are fantasy, dystopian, children, classic.",
        });
      }

      filter.genre = genre as Genre;
    }

    const total = await Book.countDocuments(filter);

    let query = Book.find(filter);

    if (typeof sort === "string") {
      query = query.sort(sort);
    }

    const data = await query
      .populate("author")
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      page,
      limit,
      total,
      data,
    });
  } catch (error) {
    console.error("Error fetching books:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

// POST /books

app.post("/books", async (req, res) => {
  try {
    const { title, genre, publishedYear } = req.body;

    const book = new Book({
      title: req.body.title,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      author: req.body.author,
    });

    const savedBook = await book.save();

    return res.status(201).json(savedBook);
  } catch (error) {
    return BookError(error, res);
  }
});

// GET /books/:id

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    return res.status(500).json({
      error: "Failed to retrieve book",
    });
  }
});

// PUT - Update a book
app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    // if (
    //   error instanceof mongoose.Error.CastError
    // ) {
    //   return res.status(400).json({ error: 'Invalid book ID' });
    // }

    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.status(400).json({
    //     error: error.message,
    //   });
    // }

    // return res.status(500).json({
    //   error: 'Failed to update book',
    // });

    return BookError(error, res);
  }
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    return res.status(500).json({
      error: "Failed to delete book",
    });
  }
});

// POST /authors

app.post("/authors", async (req, res) => {
  try {
    const author = new Author({
      name: req.body.name,
    });

    await author.save();

    return res.status(201).json(author);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: Object.values(error.errors)
          .map((item) => item.message)
          .join(", "),
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

// GET /authors

app.get("/authors", async (_req, res) => {
  try {
    const authors = await Author.find();

    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

// GET /authors/:id/books
app.get("/authors/:id/books", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "Invalid author ID",
      });
    }

    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({
        error: "Author not found",
      });
    }

    const books = await Book.find({
      author: author._id,
    }).populate("author");

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

// create members before they can borrow books

app.post('/members', async (req, res) => {
  try {
    const member = new Member({
      name: req.body.name,
      email: req.body.email,
    });

    await member.save();

    return res.status(201).json(member);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Email already exists',
      });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: Object.values(error.errors)
          .map((item) => item.message)
          .join(', '),
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});


// Add POST /loans

app.post('/loans', async (req, res) => {
  try {
    const { book, member } = req.body;

    if (
      !mongoose.isValidObjectId(book) ||
      !mongoose.isValidObjectId(member)
    ) {
      return res.status(400).json({
        error: 'Invalid book or member ID',
      });
    }

    const existingBook = await Book.findById(book);
    if (!existingBook) {
      return res.status(404).json({
        error: 'Book not found',
      });
    }

    const existingMember = await Member.findById(member);
    if (!existingMember) {
      return res.status(404).json({
        error: 'Member not found',
      });
    }


    const activeLoan = await Loan.findOne({
      book,
      returnedAt: { $exists: false },
    });

    if (activeLoan) {
      return res.status(409).json({
        error: 'This book is already borrowed',
      });
    }

    const loan = new Loan({
      book,
      member,
    });

    await loan.save();

    return res.status(201).json(loan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Add PATCH /loans/:id/return

app.patch('/loans/:id/return', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: 'Invalid loan ID',
      });
    }

    const loan = await Loan.findOneAndUpdate(
      {
        _id: id,
        returnedAt: { $exists: false },
      },
      {
        $set: { returnedAt: new Date() },
      },
      { new: true, runValidators: true }
    );

    if (!loan) {
      const existingLoan = await Loan.findById(id);

      if (!existingLoan) {
        return res.status(404).json({
          error: 'Loan not found',
        });
      }

      return res.status(409).json({
        error: 'This loan has already been returned',
      });
    }

    return res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// GET /members/:id/loans

app.get('/members/:id/loans', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: 'Invalid member ID',
      });
    }

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        error: 'Member not found',
      });
    }

    const loans = await Loan.find({ member: id })
      .populate('book');

    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});




connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
