import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: Number,
      required: true,
      unique: true,
    },
    bookName: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    yearOfPublication: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ["new", "used"],
      required: true,
    },
    description: {
      type: String,
      optional: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
