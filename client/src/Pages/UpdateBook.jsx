import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function UpdateBook() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    
    const { isbn } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
      isbn : "",
      bookName: "",
      authorName: "",
      yearOfPublication: "",
      price: "",
      discount: "",
      numberOfPages: "",
      condition: "options",
      description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

    useEffect(() => {
      const fetchBook = async () => {
        try {
          const response = await axios.get(`${baseUrl}/book-detail?isbn=${isbn}`);
          setBook(response.data);
        } catch (error) {
          console.error("Error fetching book data:", error);
        }
      }
      fetchBook();
    }, [isbn]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formattedBook = {
        isbn: Number(book.isbn), // Ensure ISBN is a number
        bookName: book.bookName, // String
        authorName: book.authorName, // String
        yearOfPublication: Number(book.yearOfPublication), // Ensure year is a number
        price: parseFloat(book.price), // Ensure price is a float
        discount: book.discount ? Number(book.discount) : 0, // Default to 0 if empty
        numberOfPages: Number(book.numberOfPages), // Ensure number of pages is a number
        condition: book.condition, // String
        description: book.description // String
    };

      try {
        const res = await axios.patch(`http://localhost:8080/api/books/update-book?isbn=${book.isbn}`, formattedBook);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Book updated successfully"
        })
        .then((result) => {
          if(result.isConfirmed)
            navigate('/')
        })
      } catch (error) {
        console.error("Error updating book:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response ? error.response.data.message : "Failed to update the book. Please try again."
        });
      }
    };

  return (
    <>
      <div className="py-5 d-flex justify-content-center " style={{backgroundColor: "#B2BEB5  "}}>
            <div className="col-5">
                <h2 className="text-center" style={{color : "#2C3E50"}}>Update Book</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div class="alert alert-info text-center" role="alert">
                      You can only change the Year of Publication, Price, Discount, and Condition.
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bookName" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
                            Book Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="bookName"
                            name="bookName"
                            value={book.bookName}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="authorName" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
                            Author Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="authorName"
                            name="authorName"
                            value={book.authorName}
                            readOnly 
                        />
                    </div>
                    <div className="row d-flex justify-content-space-evenly">
                        <div className="mb-3 col-4">
                            <label htmlFor="ISBN" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
                                ISBN
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="isbn"
                                name="isbn"
                                value={book.isbn}
                                readOnly 
                            />
                        </div>
                        <div className="mb-3 col-4">
                            <label htmlFor="yearOfPublication" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
                                Year of Publication
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="yearOfPublication"
                                name="yearOfPublication"
                                value={book.yearOfPublication}
                                readOnly 
                            />
                        </div>
                        <div className="mb-3 col-4">
                            <label htmlFor="price" className="form-label fw-semibold " style={{color : "#2C3E50"}}>
                                Price
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={book.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-space-evenly">
                        <div className="mb-3 col-4">
                            <label htmlFor="discount" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
                                Discount (if applicable)
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="discount"
                                name="discount"
                                value={book.discount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 col-4">
                            <label htmlFor="numberOfPages" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
                                Number of Pages
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="numberOfPages"
                                name="numberOfPages"
                                value={book.numberOfPages}
                                readOnly 
                            />
                        </div>
                        <div className="mb-3 col-4">
                            <label htmlFor="condition" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
                                Condition
                            </label>
                            <select
                                className="form-select"
                                id="condition"
                                name="condition"
                                value={book.condition}
                                onChange={handleChange}
                                required
                            >
                                <option value="options">options</option>
                                <option value="new">New</option>
                                <option value="used">Used</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
                            Description (optional)
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={book.description}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    <div className="text-center mt-5">
                        <button type="submit" className="btn btn-success fw-semibold">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default UpdateBook;