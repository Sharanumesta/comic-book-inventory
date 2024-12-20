import Book from '../models/book.model.js';

// Updating the book details
const deleteBook = async (req, res) => {
    try {
        const { isbn } = req.query;
        const deletedBook = await Book.deleteOne({ isbn:isbn });

        if (deletedBook.deletedCount === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        res.status(200).json({message: "Book deleted successfully" })
    } catch (error) {
        console.log("Error while deleting a book: ", error);
        res.status(500).json({ message: "An error occurred while deleting book" })
    }
}

export default deleteBook;