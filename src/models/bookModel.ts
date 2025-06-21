import mongoose, { Schema } from "mongoose";

export enum BookStatus {
  OCCUPIED = "occupied",
  AVAILABLE = "available",
}

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    status: {
      type: String,
      default: BookStatus.AVAILABLE,
      enum: Object.values(BookStatus),
      required: [true, "Price is required"],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
