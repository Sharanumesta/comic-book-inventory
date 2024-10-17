import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function BookDetail() {
    const { isbn } = useParams();
    const [book, setBook] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookDetails = await axios.get(`http://localhost:8080/api/books/book-detail?isbn=${isbn}`);
                setBook(bookDetails.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load books. Please try again later."); 
            }
        }
        fetchBook();
    },[isbn]);

  return (
    <>
        <section>
            <div className="container">
                <div className="row p-5 d-flex justify-content-center">
                    <div className="col-10">
                        <h2 className='text-center text-success mb-5'>Book Details</h2>
                        <div className="col">
                            <div className=" d-flex justify-content-around text-center flex-column">
                                <div className="row py-1">
                                    <div className="col-5 "><p cl><strong>ISBN:</strong></p></div>
                                    <div className="col-7"><p className='fw-semibold'>{book.isbn}</p></div>
                                </div>
                                <div className="row" py-1>
                                    <div className="col-5"><p><strong>Book Name:</strong></p></div>
                                    <div className="col-7"><p className='fw-semibold'>{book.bookName}</p></div>
                                </div>
                                <div className="row py-1">
                                    <div className="col-5"><p><strong>Author Name:</strong></p></div>
                                    <div className="col-7"><p className='fw-semibold'>{book.authorName}</p></div>
                                </div>
                                <div className="row py-1">
                                    <div className="col-5"><p><strong>Price:</strong></p></div>
                                    <div className="col-7"><p className='fw-semibold'>{book.price}</p></div>
                                </div>
                                <div className="row py-1">
                                    <div className="col-5"><p><strong>Year of Publication:</strong></p></div>
                                    <div className="col-7"><p className='fw-semibold'>{book.yearOfPublication}</p></div>
                                </div>
                                <div className="row py-1">
                                    <div className="col-5"><p><strong>Number of Pages:</strong></p></div>
                                    <div className="col-7"><p className='fw-semibold'>{book.numberOfPages}</p></div>
                                </div>
                                <div className="row py-1">
                                    <div className="col-5"><p><strong>Discount:</strong></p></div>
                                    <div className="col-7"><p className='fw-semibold'>{book.discount}</p></div>
                                </div>
                                <div className="row py-1">
                                    <div className="col-5"><p><strong>Condition:</strong></p></div>
                                    <div className="col-7"><p className='fw-semibold'>{book.condition}</p></div>
                                </div>
                                <div className="row py-1">
                                    <div className="col-5"><p><strong>Description:</strong></p></div>
                                    <div className="col-7"><p className='fw-semibold'>{book.description}</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mt-5">
                            <div className="col-4 d-flex justify-content-around">
                                <Link to={`/update-book/${book.isbn}`} type="button" className="btn btn-warning fs-5">Update</Link>
                                <Link to={`/delete-book/${book.isbn}`} type="button" className="btn btn-danger fs-5">Delete</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default BookDetail