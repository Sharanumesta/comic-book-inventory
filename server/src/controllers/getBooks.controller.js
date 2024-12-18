const Book = require('../db/book.model');

// Get all the books from inventory with filtering, sorting, and search functionality
const getBooks = async (req, res) => {
  try {
    const { sort, filterType, filterValue, searchType, searchInput } = req.query;
    let sortOrder = {};
    let searchCriteria = {};

    // Set up sort order based on the sort query
    switch (sort) {
      case 'name':
        sortOrder = { bookName: 1 };
        break;
      case 'author':
        sortOrder = { authorName: 1 };
        break;
      case 'price':
        sortOrder = { price: 1 };
        break;
      case 'priceDesc':
        sortOrder = { price: -1 };
        break;
      default:
        sortOrder = { bookName: 1 }; // Default sorting by book name
    }

    // Apply filter logic
    if (filterType && filterValue) {
      if (filterType === 'author') {
        searchCriteria.authorName = { $regex: new RegExp(filterValue, 'i') }; // Case-insensitive author filter
      } else if (filterType === 'condition') {
        searchCriteria.condition = filterValue; // Exact match for condition filter
      }
    }

    // Apply search logic
    if (searchType && searchInput) {
      const searchRegex = new RegExp(searchInput, 'i'); // Case-insensitive regex for search
      if (searchType === 'bookName') {
        searchCriteria.bookName = searchRegex;
      } else if (searchType === 'authorName') {
        searchCriteria.authorName = searchRegex;
      } else if (searchType === 'isbn') {
        searchCriteria.isbn = searchInput; // Exact match for ISBN
      }
    }

    // Fetch books based on combined filters, search, and sorting
    const books = await Book.find(searchCriteria, { _id: 0 }).sort(sortOrder);
    if (!books.length) {
      return res.status(404).json({ message: "No books found matching the criteria" });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books: ", error);
    res.status(500).json({ message: "An error occurred while fetching books", error: error.message });
  }
};

module.exports = getBooks;
