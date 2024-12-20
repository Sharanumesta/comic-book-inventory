import express from 'express';
import getBooks from '../controllers/getBooks.controller.js';
import searchBooks from '../controllers/searchBooks.controller.js';
import addBooks from '../controllers/addBook.controller.js';
import updateBook from '../controllers/updateBook.controller.js';
import bookDetails from '../controllers/detailBook.controller.js';
import deleteBook from '../controllers/deleteBook.controller.js';
import validate from '../middleware/book-middleware.js';
import bookSchema from '../validator/books-validator.js';

const router = express.Router();

router.route('/').get(getBooks);
router.route('/search').get(searchBooks);
router.route('/new-book').post(validate(bookSchema), addBooks);
router.route('/update-book').patch(validate(bookSchema), updateBook);
router.route('/delete-book').delete(deleteBook);
router.route('/book-detail').get(bookDetails);

export default router;