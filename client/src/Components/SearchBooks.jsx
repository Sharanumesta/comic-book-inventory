import React, { useState } from "react";

function SearchBooks({ searchData, onSearch }) {
  const [searchValues, setSearchValues] = useState(searchData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchValues({ ...searchValues, [name]: value });
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-8 bg-light bg-opacity-75 p-2 rounded-3 ">
          <form onSubmit={handleSubmit}>
            <div className="row d-flex align-items-center justify-content-start">
              <div className="col-3">
                <select
                  className="form-select focus-ring focus-ring-dark py-1 mx-2"
                  name="searchType"
                  value={searchValues.searchType}
                  onChange={handleInputChange}
                >
                  <option value="bookName">Name</option>
                  <option value="isbn" type="number">ISBN</option>
                  <option value="authorName">Author</option>
                </select>
              </div>
              <div className="col-6">
                <input
                  type={searchValues.searchType === "isbn" ? "number" : "text"}
                  className="form-control focus-ring focus-ring-dark py-1 px-2"
                  name="searchInput"
                  value={searchValues.searchInput}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  class="btn btn-outline-secondary w-100 fw-bold  py-2 me-2"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchBooks;