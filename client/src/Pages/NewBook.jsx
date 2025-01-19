import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NewBook() {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/${
    import.meta.env.VITE_BOOK_ROUTE
  }`;

  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const [newBook, setNewBook] = useState({
    isbn: "",
    bookName: "",
    authorName: "",
    yearOfPublication: "",
    price: "",
    discount: "",
    numberOfPages: "",
    condition: "options",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "isbn" ||
      name === "yearOfPublication" ||
      name === "price" ||
      name === "discount" ||
      name === "numberOfPages"
        ? Number(value)
        : value;

    setNewBook({ ...newBook, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedBook = {
      isbn: Number(newBook.isbn), // Ensure ISBN is a number
      bookName: newBook.bookName, // String
      authorName: newBook.authorName, // String
      yearOfPublication: Number(newBook.yearOfPublication), // Ensure year is a number
      price: parseFloat(newBook.price), // Ensure price is a float
      discount: newBook.discount ? Number(newBook.discount) : 0, // Default to 0 if empty
      numberOfPages: Number(newBook.numberOfPages), // Ensure number of pages is a number
      condition: newBook.condition, // String
      description: newBook.description, // String
    };

    try {
      const res = await axios.post(`${baseUrl}/new-book`, formattedBook);
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Book added successfully",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.error("Error adding the Book", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response
          ? error.response.data.message
          : "Failed to add the book. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="py-5 d-flex justify-content-center"
      style={{ backgroundColor: "#B2BEB5" }}
    >
      <div className="col-5">
        <h2 className="text-center" style={{ color: "#2C3E50" }}>
          Add New Comic Book
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Book Name Field */}
          <div className="mb-3">
            <label
              htmlFor="bookName"
              className="form-label fw-semibold"
              style={{ color: "#2C3E50" }}
            >
              Book Name
            </label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              name="bookName"
              value={newBook.bookName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Author Name Field */}
          <div className="mb-3">
            <label
              htmlFor="authorName"
              className="form-label fw-semibold"
              style={{ color: "#2C3E50" }}
            >
              Author Name
            </label>
            <input
              type="text"
              className="form-control"
              id="authorName"
              name="authorName"
              value={newBook.authorName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Other Fields */}
          <div className="row d-flex justify-content-space-evenly">
            {/* ISBN */}
            <div className="mb-3 col-4">
              <label
                htmlFor="isbn"
                className="form-label fw-semibold"
                style={{ color: "#2C3E50" }}
              >
                ISBN
              </label>
              <input
                type="number"
                className="form-control"
                id="isbn"
                name="isbn"
                value={newBook.isbn}
                onChange={handleChange}
                required
              />
            </div>

            {/* Year of Publication */}
            <div className="mb-3 col-4">
              <label
                htmlFor="yearOfPublication"
                className="form-label fw-semibold"
                style={{ color: "#2C3E50" }}
              >
                Year of Publication
              </label>
              <input
                type="number"
                className="form-control"
                id="yearOfPublication"
                name="yearOfPublication"
                value={newBook.yearOfPublication}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div className="mb-3 col-4">
              <label
                htmlFor="price"
                className="form-label fw-semibold"
                style={{ color: "#2C3E50" }}
              >
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={newBook.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Discount, Number of Pages, Condition */}
          <div className="row d-flex justify-content-space-evenly">
            <div className="mb-3 col-4">
              <label
                htmlFor="discount"
                className="form-label fw-semibold"
                style={{ color: "#2C3E50" }}
              >
                Discount (if applicable)
              </label>
              <input
                type="number"
                className="form-control"
                id="discount"
                name="discount"
                value={newBook.discount}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-4">
              <label
                htmlFor="numberOfPages"
                className="form-label fw-semibold"
                style={{ color: "#2C3E50" }}
              >
                Number of Pages
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfPages"
                name="numberOfPages"
                value={newBook.numberOfPages}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 col-4">
              <label
                htmlFor="condition"
                className="form-label fw-semibold"
                style={{ color: "#2C3E50" }}
              >
                Condition
              </label>
              <select
                className="form-select"
                id="condition"
                name="condition"
                value={newBook.condition}
                onChange={handleChange}
                required
              >
                <option value="options" disabled>
                  Select condition
                </option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
          </div>

          {/* Description Field */}
          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label fw-semibold"
              style={{ color: "#2C3E50" }}
            >
              Description (optional)
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={newBook.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-5">
            <button
              type="submit"
              className="btn btn-success fw-semibold"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Comic Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewBook;
