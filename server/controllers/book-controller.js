const Book = require('../db/model');

// Get all the books from inventory
const getBooks = async ( req, res ) => {
    try {
        const { sort, filterType, filterValue } = req.query;
        // Determine the sort order based on the query
        let sortOrder = {};

        // Determine sort order based on the sort query
        switch (sort) {
            case 'name':
                sortOrder = { bookName: 1 }; // Ascending order
                break;
            case 'author':
                sortOrder = { authorName: 1 }; // Ascending order
                break;
            case 'price':
                sortOrder = { price: 1 }; // Ascending order (Low to High)
                break;
            case 'priceDesc':
                sortOrder = { price: -1 }; // Descending order (High to Low)
                break;
            default:
                sortOrder = {}; // No sorting
        }

        // Build the filter object based on the filterType
        const filter = {};
        if (filterType && filterValue) {
            if (filterType === 'author') {
                filter.authorName = { $regex: new RegExp(filterValue, 'i') }; // Case-insensitive search
            } 
            // else if (filterType === 'genre') {
            //     filter.genre = { $regex: new RegExp(filterValue, 'i') };
            // }
             else if (filterType === 'condition') {
                filter.condition = filterValue; // Exact match
            }
        }
        
        const books = await Book.find(filter, { _id: 0 }).sort(sortOrder); // Apply sorting
        res.status(200).json(books);
    } catch (error) {
        console.log("Error fetching books: ", error);
        res.status(500).json({ message: "An error occurred while fetching books" })
    }
}

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

        const newBook = new Book(bookData);
        await newBook.save();

        res.status(201).json({message: "New book added successfully" })
        
    } catch (error) {
        console.log("Error while Adding a book: ", error);
        res.status(500).json({ message: "An error occurred while Adding book" })
    }
}

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

const detailBook = async (req, res) => {
    try {
        const { isbn } = req.query;
        const book = await Book.findOne({isbn : isbn}, {_id : 0, __v : 0});
        if(!book){
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log("Error while finding details of book: ", error);
        res.status(500).json({ message: "An error occurred while finding details of book" })
    }
}

module.exports = { getBooks, addBook, updateBook, deleteBook, detailBook } ;