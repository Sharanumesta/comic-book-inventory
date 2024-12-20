import Book from '../models/book.model.js';
// Add a new book to inventory
const addBook = async ( req, res ) => {
    try {
        const bookData = req.body;
        const bookISBN = req.body.isbn;

        // Checking for the new book whether is already exist in inventory or not
        const bookExist = await Book.findOne({ isbn : bookISBN });
        if(bookExist){
            return res.status(500).json({ message: "This book is already exists" })
        }

        const newBook = await Book.create(bookData);

        res.status(201).json({message: "New book added successfully" })
        
    } catch (error) {
        console.log("Error while Adding a book: ", error);
        res.status(500).json({ message: "An error occurred while Adding book" })
    }
}

export default addBook;