
import mongoose, { Schema } from 'mongoose';

const loanSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book is required'],
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: [true, 'Member is required'],
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    returnedAt: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true }
);

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
