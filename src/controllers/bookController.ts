import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// others
import Book from "../models/bookModel";

// @desc    Get books
// @route   GET /api/books
// @access  Private
const getBooks = asyncHandler(async (req: Request, res: Response) => {
  // pagination logic
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    // get books list with count
    const books = await Book.find()
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });
    const total = await Book.countDocuments();

    res.status(200).json({
      books,
      page,
      total,
      perPage: limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(400).json({ message: "No record found!" });
  }
});

// @desc    Create Book
// @route   POST /api/books/
// @access  Private
const createBook = asyncHandler(async (req: Request, res: Response) => {
  const { title, author, price, status } = req.body;
  // check if any field is missing
  if (!title || !author || !price || !status) {
    res.status(400);
    throw new Error("Fields are missing!");
  }

  //   create book
  const book = await Book.create({
    title,
    author,
    price,
    status,
  });

  res.status(201).json({
    bookDetails: book,
  });
});

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = asyncHandler(async (req: Request, res: Response) => {
  // get book by id
  const book = await Book.findById(req.params.id);

  // check if theres no book exist by id
  if (!book) {
    res.status(400);
    throw new Error("Book not found!");
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ bookDetails: updatedBook });
});

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  // get book by id
  const book = await Book.findById(req.params.id);

  // check if theres no book exist by id
  if (!book) {
    res.status(400);
    throw new Error("Book not found!");
  }

  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Book successfully deleted!" });
});

export { getBooks, createBook, updateBook, deleteBook };
