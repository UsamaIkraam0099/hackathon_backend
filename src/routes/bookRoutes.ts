import express from "express";

// others
import { protect } from "../middleware/authMiddleware";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

const router = express.Router();

router.route("/").get(protect, getBooks).post(protect, createBook);
router.route("/:id").put(protect, updateBook).delete(protect, deleteBook);

export default router;
