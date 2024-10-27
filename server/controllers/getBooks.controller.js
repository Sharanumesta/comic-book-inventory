const Book = require('../db/book.model')

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


module.exports = getBooks;