import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //For pagination
  const [itemsPerPage] = useState(10); // For pagination
  const [sort, setSort] = useState();
  const [filterType, setFilterType] = useState("author");
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");

  // Fetching books and authors
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books/", {
          params: {
            sort: sort,
            filterType: filterType,
            filterValue: filterValue,
          },
        });
        setBooks(response.data);

        if (response.data.length === 0) {
          Swal.fire({
            title: "No book found",
            text: "Do you want to add a new book?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Add a new book",
            cancelButtonText: "No, cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/new-book");
            }
          });
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books/", {
          params: { sort: "author" },
        });
        const uniqueAuthors = [
          ...new Set(response.data.map((book) => book.authorName)),
        ];
        setAuthors(uniqueAuthors);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setError("Failed to load authors. Please try again later.");
      }
    };

    fetchBooks();
    fetchAuthors();
  }, [sort, filterType, filterValue, navigate]);

  // Pagination logic
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  // Sorting handler
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // Filtering handlers
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue(""); // Reset filter value on filter type change
  };

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <section>
      <div className="container text-center p-5">
        <h2 className="p text-primary">All Comic Books</h2>
        <div className="row d-flex justify-content-center">
          <div className="col-10">
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group mt-4 d-block">
              <div className="row mb-3 align-items-end">
                {/* Filtering Section */}
                <div className="col-8 d-flex">
                  <div className="d-flex flex-column me-2">
                    <h6 className="d-block">Filter by:</h6>
                    <select
                      className="form-select"
                      onChange={handleFilterChange}
                      value={filterType}
                    >
                      <option value="author">Author</option>
                      <option value="condition">Condition</option>
                    </select>
                  </div>
                  <div className="d-flex mt-4 m-0 h-50">
                    {filterType === "author" ? (
                      <select
                        className="form-select"
                        id="authorSelect"
                        onChange={handleInputChange}
                        value={filterValue}
                      >
                        <option value="">Select Author</option>
                        {authors.map((author, index) => (
                          <option key={index} value={author}>
                            {author}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        className="form-select"
                        id="conditionSelect"
                        onChange={handleInputChange}
                        value={filterValue}
                      >
                        <option value="">Select Condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Sorting Section */}
                <div className="col-4 d-flex align-items-center justify-content-end">
                  <label htmlFor="sort" className="form-label fw-semibold me-2">
                    <h6 className="">Sort:</h6>
                  </label>
                  <select
                    className="form-select"
                    id="sort"
                    onChange={handleSortChange}
                    value={sort}
                  >
                    <option value="">Select Sort Option</option>
                    <option value="name">Book Name</option>
                    <option value="author">Author Name</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="priceDesc">Price (High to Low)</option>
                  </select>
                </div>
              </div>

              {/* Books List */}
              <li className="list-group-item d-flex justify-content-between align-items-center border rounded-3 text-success mb-2">
                <div className="col-8 d-flex">
                  <h5 className="col-3">ISBN</h5>
                  <h5 className="col-3">Name</h5>
                  <h5 className="col-3">Author</h5>
                  <h5 className="col-3">Price</h5>
                </div>
                <div className="col-4 d-flex justify-content-around">
                  <h5 className="text-success text-decoration-underline">
                    Edit
                  </h5>
                </div>
              </li>

              {currentBooks.map((book) => (
                <li
                  key={book.isbn}
                  className="list-group-item d-flex align-items-center justify-content-center rounded-3"
                >
                  <div className="col-8 d-flex align-items-center justify-content-center">
                    <h6 className="col-3">{book.isbn}</h6>
                    <h6 className="col-3">{book.bookName}</h6>
                    <h6 className="col-3">{book.authorName}</h6>
                    <h6 className="col-3">{book.price}</h6>
                  </div>
                  <div className="col-4 d-flex justify-content-around">
                    <Link
                      to={`/book-detail/${book.isbn}`}
                      className="btn btn-success"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/update-book/${book.isbn}`}
                      className="btn btn-warning"
                    >
                      Update
                    </Link>
                    <Link
                      to={`/delete-book/${book.isbn}`}
                      className="btn btn-danger"
                    >
                      Delete
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Home;
