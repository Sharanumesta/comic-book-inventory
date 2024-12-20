import Book from '../models/book.model.js';

// Updating the book details
const updateBook = async (req, res) => {
    try {
        const bookData = req.body;
        const isbn = bookData.isbn;
        const updatedBook  = await Book.findOneAndUpdate({isbn:isbn},{
            $set: {
                price : bookData.price,
                discount : bookData.discount,
                condition : bookData.condition,
                description : bookData.description
            }
        });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({message: "Book updated successfully" })
    } catch (error) {
        console.log("Error while Adding a book: ", error);
        res.status(500).json({ message: "An error occurred while updating book" })
    }
}

export default updateBook;