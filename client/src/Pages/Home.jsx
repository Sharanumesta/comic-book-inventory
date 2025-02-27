import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BookList from "../Components/BookList";
import FilterSort from "../Components/FilterSort";
import SearchBooks from "../Components/SearchBooks";

function Home() {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BOOK_ROUTE}`;

  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  // Filtration and Sort
  const [sort, setSort] = useState("name");
  const [filterType, setFilterType] = useState("author");
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");

  // search section
  const [searchData, setSearchData] = useState({
    searchType: "bookName",
    searchInput: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/`, {
          params: { sort, filterType, filterValue },
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
        const response = await axios.get(`${baseUrl}`);
        const uniqueAuthors = [
          ...new Set(response.data.map((book) => book.authorName)),
        ].sort();
        setAuthors(uniqueAuthors);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setError("Failed to load authors. Please try again later.");
      }
    };

    fetchBooks();
    fetchAuthors();
  }, [sort, filterType, filterValue, navigate]);

  const handleSearch = async (data) => {
    try {
      const response = await axios.get(`${baseUrl}/search`, { params: data });
      if (response.data.length === 0) {
        setError("Book not found !!");
        setBooks([]);
      } else {
        setBooks(response.data);
        setError("");
      }
      setSearchData(data);
    } catch (error) {
      console.error("Error fetching Books:", error);
      setError("Error fetching Books");
    }
  };

  return (
    <section>
      <div className="container text-center">
        <h2 className="p text-dark pt-5">All Comic Books</h2>
        <div className="row d-flex justify-content-center">
          <div className="col-10">
            {error && (
              <div className="alert alert-danger fw-semibold">{error}</div>
            )}
            <FilterSort
              setSort={setSort}
              filterType={filterType}
              setFilterType={setFilterType}
              setFilterValue={setFilterValue}
              authors={authors}
            />
            <SearchBooks searchData={searchData} onSearch={handleSearch} />
            <BookList currentBooks={currentBooks} />
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
