const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book-controller');
const validate = require('../middleware/book-middleware');
const bookSchema = require('../validator/books-validator');

router.route('/').get(bookController.getBooks);
router.route('/new-book').post(validate(bookSchema), bookController.addBook);
router.route('/update-book').patch(validate(bookSchema), bookController.updateBook);
router.route('/delete-book').delete(bookController.deleteBook);
router.route('/book-detail').get(bookController.detailBook);

module.exports = router;