
import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Book genre is required'],
      enum: {
        values: ['fantasy', 'dystopian', 'children', 'classic'],
        message:
          'Invalid genre: {VALUE}. Allowed genres are fantasy, dystopian, children, classic.',
      },
    },
    publishedYear: {
      type: Number,
      required: [true, 'Published year is required'],
      min: [0, 'Published year cannot be less than 0'],
      max: [
        new Date().getFullYear(),
        'Published year cannot be in the future',
      ],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'Book author is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
