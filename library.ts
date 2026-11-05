import { z } from "zod";

// 1. Book title schema
export const BookTitleSchema = z.enum(["dune", "neuromancer", "foundation"]);

// 2. Book schema
export const BookSchema = z.object({
  title: BookTitleSchema,
  copiesAvailable: z.number().int().nonnegative(),
});

// 3. Book - Zod
export type Book = z.infer<typeof BookSchema>;

// 4.catalogue

const catalogue = {
  dune: {
    title: "dune",
    copiesAvailable: 3,
  },
  neuromancer: {
    title: "neuromancer",
    copiesAvailable: 1,
  },
  foundation: {
    title: "foundation",
    copiesAvailable: 0,
  },
};

// 5. Find book
export const findBook = (title: unknown): Book => {
  const bookTitle = BookTitleSchema.parse(title);

  return BookSchema.parse(catalogue[bookTitle]);
};

// 6. checkoutBook

export const checkOutBook = (book: unknown): number => {
  const validBook = BookSchema.parse(book);

  if (validBook.copiesAvailable === 0) {
    throw new Error("No copies available");
  }

  const loanId = Math.floor(Math.random() * 9000) + 1000;

  return loanId;
};

// 7. LoanSchema

export const LoanSchema = z.object({
  loanId: z.number().int().positive(),
  title: BookTitleSchema,
  memberId: z.number().int().positive(),
});

export type Loan = z.infer<typeof LoanSchema>;

export const registerLoan = (
  loanId: unknown,
  title: unknown,
  memberId: unknown,
): Loan => {
  return LoanSchema.parse({
    loanId,
    title,
    memberId,
  });
};
