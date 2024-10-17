import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sort, setSort] = useState();

  // Fetching the all the Books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books/',{
          params: {
              sort: sort
          }
        });
        setBooks(response.data);

        const resLength = response.data.length;
        if(resLength == 0){
          Swal.fire({
            title: 'No book found',
            text: 'Do you want to add a new book?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Add a new book',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/new-book');
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load books. Please try again later.");
      }
    }
    fetchBooks();
  },[sort, navigate]);

  // Calculate the current items to display
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Total pages
  const totalPages = Math.ceil(books.length / itemsPerPage);

  // handle function function for Sort
  const handleSortChange = (e) => {
    const selectSort = e.target.value;
    setSort(selectSort);
  }
  
  return (
    <>
      <section>
        <div className="container text-center p-5">
          <h2 className='p text-primary'>All Comic Books</h2>
          <div className="row d-flex justify-content-center">
            <div className="col-10">
              {error && <div className="alert alert-danger">{error}</div>}
              <ul className="list-group mt-4 d-block">
                  {/* Sorting data */}
                  <div className="d-flex justify-content-end">
                    <label htmlFor="sort" className="form-label fw-semibold d-block">
                      <p className='fs-5 fw-semibold m-0'>Sort</p>
                      <select
                          className="form-select"
                          id="sort"
                          name="sort"
                          onChange={handleSortChange}
                          value={sort}
                      >
                          <option value="options">Sort</option>
                          <option value="name">Name</option>
                          <option value="author">Author</option>
                          <option value="price">Price(Low to High)</option>
                          <option value="priceDesc">Price(High to Low)</option>
                      </select>
                    </label>
                  </div>


                <div className="row">
                  <li className='list-group-item d-flex justify-content-between align-item-center border rounded-3 text-success mb-2'>
                      <div className="col-8 d-flex">
                        <h5 className='col-3'>ISBN</h5>
                        <h5 className='col-3'>Name</h5>
                        <h5 className='col-3'>Author</h5>
                        <h5 className='col-3'>Price</h5>
                      </div>
                      <div className="col-4 d-flex justify-content-around">
                        <h5 className='text-success text-decoration-underline '>Edit</h5>
                      </div>
                  </li>
                </div>
                <div className="row">
                    { currentBooks.map( book => (
                      <li key={book.isbn} className='list-group-item d-flex align-item-center justify-content-center rounded-3'>
                        <div className="col-8 d-flex align-item-center justify-content-center">
                              <h6 className='col-3'>{book.isbn}</h6>
                              <h6 className='col-3'>{book.bookName}</h6>
                              <h6 className='col-3'>{book.authorName}</h6>
                              <h6 className='col-3'>{book.price}</h6>
                        </div>
                        <div className="col-4 d-flex justify-content-around">
                          <Link to={`/book-detail/${book.isbn}`} type="button" className="btn btn-success">Details</Link>
                          <Link to={`/update-book/${book.isbn}`} type="button" className="btn btn-warning">Update</Link>
                          <Link to={`/delete-book/${book.isbn}`} type="button" className="btn btn-danger">Delete</Link>
                        </div>
                      </li>
                    ))}    
                </div>
              </ul>
            </div>
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
        </div>
      </section>
    </>
  )
}

export default Home;