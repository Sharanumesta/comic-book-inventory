import Book from "../models/book.model.js";

// Add a new book to inventory
const addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const bookISBN = req.body.isbn;

    // Checking for the new book whether is already exist in inventory or not
    const bookExist = await Book.findOne({ isbn: bookISBN });
    if (bookExist) {
      return res.status(500).json({ message: "This book is already exists" });
    }

    const newBook = await Book.create(bookData);

    res.status(201).json({ message: "New book added successfully" });
  } catch (error) {
    console.log("Error while Adding a book: ", error);
    res.status(500).json({ message: "An error occurred while Adding book" });
  }
};

// Updating the book details
const deleteBook = async (req, res) => {
  try {
    const { isbn } = req.query;
    const deletedBook = await Book.deleteOne({ isbn: isbn });

    if (deletedBook.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error while deleting a book: ", error);
    res.status(500).json({ message: "An error occurred while deleting book" });
  }
};

// Show the book details
const detailBook = async (req, res) => {
  try {
    const { isbn } = req.query;
    const book = await Book.findOne({ isbn: isbn }, { _id: 0, __v: 0 });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log("Error while finding details of book: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while finding details of book" });
  }
};

// Get all the books from inventory with filtering, sorting, and search functionality
const getBooks = async (req, res) => {
  try {
    const { sort, filterType, filterValue, searchType, searchInput } =
      req.query;
    let sortOrder = {};
    let searchCriteria = {};

    // Set up sort order based on the sort query
    switch (sort) {
      case "name":
        sortOrder = { bookName: 1 };
        break;
      case "author":
        sortOrder = { authorName: 1 };
        break;
      case "price":
        sortOrder = { price: 1 };
        break;
      case "priceDesc":
        sortOrder = { price: -1 };
        break;
      default:
        sortOrder = { bookName: 1 }; // Default sorting by book name
    }

    // Apply filter logic
    if (filterType && filterValue) {
      if (filterType === "author") {
        searchCriteria.authorName = { $regex: new RegExp(filterValue, "i") }; // Case-insensitive author filter
      } else if (filterType === "condition") {
        searchCriteria.condition = filterValue; // Exact match for condition filter
      }
    }

    // Apply search logic
    if (searchType && searchInput) {
      const searchRegex = new RegExp(searchInput, "i"); // Case-insensitive regex for search
      if (searchType === "bookName") {
        searchCriteria.bookName = searchRegex;
      } else if (searchType === "authorName") {
        searchCriteria.authorName = searchRegex;
      } else if (searchType === "isbn") {
        searchCriteria.isbn = searchInput; // Exact match for ISBN
      }
    }

    // Fetch books based on combined filters, search, and sorting
    const books = await Book.find(searchCriteria, { _id: 0 }).sort(sortOrder);
    if (!books.length) {
      return res
        .status(404)
        .json({ message: "No books found matching the criteria" });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books: ", error);
    res.status(500).json({
      message: "An error occurred while fetching books",
      error: error.message,
    });
  }
};

// Search books based on ISBN
const searchBooks = async (req, res) => {
  try {
    const { searchType: searchKey, searchInput: searchValue } = req.query;
    const filter = {};
    if (searchKey === "isbn") {
      filter[searchKey] = searchValue;
    } else {
      const trimmedSearchInput = searchValue.trim();
      const searchRegex = new RegExp(trimmedSearchInput, "i");
      filter[searchKey] = searchRegex;
    }

    const book = await Book.find(filter, { _id: 0, __v: 0 });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log("Error while finding details of book: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while finding details of book" });
  }
};

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


export { addBook, deleteBook, detailBook, getBooks, searchBooks, updateBook };
