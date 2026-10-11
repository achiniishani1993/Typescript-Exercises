import { z } from "zod";
// bookSchema
export const bookSchema = z.object({
  title: z.string().trim().min(1, "A book needs a title"),
  genre: z.string().min(1, "A book needs a genre"),
  published_year: z.number().int("Published year must be a whole number"),
  author_id: z.number().int().positive(),
});

export type Book = z.infer<typeof bookSchema> & { id: number };

// Validate URL params

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});


// book schema for patch
export const bookPatchSchema = bookSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be sent",
  });

// 6: validate query params
export const bookQuerySchema = z.object({
  genre: z.string().optional(),
  sort: z
    .enum(["title", "genre", "published_year"])
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).default(10),
});

export const authorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Author name must be at least 2 characters")
    .max(50, "Author name must be at most 50 characters"),
});

export type Author = z.infer<typeof authorSchema> & {
  id: number;
};

export const memberSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z
    .email("Please provide a valid email address")
    .toLowerCase(),
});

export type Member = z.infer<typeof memberSchema> & {
  id: number;
};

export const loanSchema = z.object({
  book_id: z.number().int().positive(),
  member_id: z.number().int().positive(),
});

export type Loan = z.infer<typeof loanSchema> & {
  id: number;
  borrowed_at: Date;
  returned_at: Date | null;
};