import express from "express";
import {
  addBook,
  deleteBook,
  detailBook,
  getBooks,
  searchBooks,
  updateBook,
} from "../controllers/book.controller.js";

import login from "../controllers/adminAuth.controller.js";
import validate from "../middleware/book-middleware.js";
import bookSchema from "../validator/books-validator.js";

const router = express.Router();

router.route("/").get(getBooks);
router.route("/search").get(searchBooks);
router.route("/new-book").post(validate(bookSchema), addBook);
router.route("/update-book").patch(validate(bookSchema), updateBook);
router.route("/delete-book").delete(deleteBook);
router.route("/book-detail").get(detailBook);

router.route("/login").post(login);


export default router;
