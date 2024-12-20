import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ currentBooks }) => {
  return (
    <ul className="list-group mt-4 d-block">
      <li className="list-group-item d-flex justify-content-between align-items-center border rounded-3 text-success mb-3">
        <div className="col-8 d-flex fw-semibold mt-2">
          <h5 className="col-3">ISBN</h5>
          <h5 className="col-3">Name</h5>
          <h5 className="col-3">Author</h5>
          <h5 className="col-3">Price</h5>
        </div>
        <div className="col-4 d-flex justify-content-around mt-2">
          <h5 className="text-success">Edits</h5>
        </div>
      </li>

      {currentBooks.map((book) => (
        <li
          key={book.isbn}
          className="list-group-item d-flex align-items-center justify-content-center rounded-3 mb-2"
        >
          <div className="col-8 d-flex align-items-center justify-content-center">
            <h6 className="col-3">{book.isbn}</h6>
            <h6 className="col-3">{book.bookName}</h6>
            <h6 className="col-3">{book.authorName}</h6>
            <h6 className="col-3">{book.price}</h6>
          </div>
          <div className="col-4 d-flex justify-content-around">
            <Link to={`/book-detail/${book.isbn}`} className="btn btn-success">
              Details
            </Link>
            <Link to={`/update-book/${book.isbn}`} className="btn btn-warning">
              Update
            </Link>
            <Link to={`/delete-book/${book.isbn}`} className="btn btn-danger">
              Delete
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
