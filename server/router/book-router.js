const express = require('express');
const router = express.Router();
const getBooks = require('../controllers/getBooks.controller');
const searchBooks = require('../controllers/searchBooks.controller');
const addBooks = require('../controllers/addBook.controller');
const updateBook = require('../controllers/updateBook.controller');
const bookDetails = require('../controllers/detailBook.controller');
const deleteBook = require('../controllers/deleteBook.controller');
const validate = require('../middleware/book-middleware');
const bookSchema = require('../validator/books-validator');

router.route('/').get(getBooks);
router.route('/search').get(searchBooks);
router.route('/new-book').post(validate(bookSchema), addBooks);
router.route('/update-book').patch(validate(bookSchema), updateBook);
router.route('/delete-book').delete(deleteBook);
router.route('/book-detail').get(bookDetails);

module.exports = router;