const Book = require("../db/book.model");

const searchBooks = async (req, res) => {
  try {
    const searchBook = req.query;
    const searchKey = searchBook.searchType;
    const searchValue = searchBook.searchInput;

    const filter = { [searchKey]: searchValue };

    const book = await Book.find(filter, { _id: 0, __v: 0 });
    if(!book){
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log("Error while finding details of book: ", error);
    res.status(500).json({ message: "An error occurred while finding details of book" });
  }
};

module.exports = searchBooks;
