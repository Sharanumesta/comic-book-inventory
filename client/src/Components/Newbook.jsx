import React, { useState } from "react";
import axios from "axios";

function Newbook() {
    const [newBook, setNewBook] = useState({
        bookName: "",
        authorName: "",
        yearOfPublication: "",
        price: "",
        discount: "",
        numberOfPages: "",
        condition: "new",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(newBook);
            // Uncomment and modify the endpoint as necessary
            // const response = await axios.post('/api/new-book', newBook);
            // Handle the response (e.g., reset form, show success message)
        } catch (error) {
            console.error("Error adding the Book", error);
        }
    };

    return (
        <div className="py-5 d-flex justify-content-center " style={{backgroundColor: "#B2BEB5  "}}>
            <div className="col-5">
                <h2 className="text-center" style={{color : "#2C3E50"}}>Add New Comic Book</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="bookName" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
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
                    <div className="mb-3">
                        <label htmlFor="authorName" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
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
                    <div className="row d-flex justify-content-space-evenly">
                        <div className="mb-3 col-4">
                            <label htmlFor="yearOfPublication" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
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
                        <div className="mb-3 col-4">
                            <label htmlFor="price" className="form-label fw-semibold " style={{color : "#2C3E50"}}>
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
                        <div className="mb-3 col-4">
                            <label htmlFor="discount" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
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
                    </div>
                    <div className="row d-flex justify-content-space-evenly">
                        <div className="mb-3 col-6">
                            <label htmlFor="numberOfPages" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
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
                        <div className="mb-3 col-6">
                            <label htmlFor="condition" className="form-label fw-semibold" style={{color : "#2C3E50"}}>
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
                            value={newBook.description}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success fw-semibold">
                            Add Comic Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Newbook;