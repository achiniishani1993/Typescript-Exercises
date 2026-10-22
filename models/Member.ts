
import mongoose, { Schema } from 'mongoose';

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Member email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model('Member', memberSchema);

export default Member;
