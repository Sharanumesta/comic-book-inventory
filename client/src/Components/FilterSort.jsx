import React from "react";

const FilterSort = ({ setSort, filterType, setFilterType, setFilterValue, authors }) => {
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue(""); // Reset filter value on filter type change
  };

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="row mb-3 align-items-end">
      {/* Filtering Section */}
      <div className="col-8 d-flex">
        <div className="d-flex flex-column me-2">
          <h6 className="d-block">Filter by:</h6>
          <select className="form-select" onChange={handleFilterChange} value={filterType}>
            <option value="author">Author</option>
            <option value="condition">Condition</option>
          </select>
        </div>
        <div className="d-flex mt-4 m-0 h-50">
          {filterType === "author" ? (
            <select className="form-select" id="authorSelect" onChange={handleInputChange}>
              <option value="">Select Author</option>
              {authors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </select>
          ) 
          : 
          (
            <select className="form-select" id="conditionSelect" onChange={handleInputChange}>
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
        <select className="form-select" id="sort" onChange={(e) => setSort(e.target.value)}>
          <option value="">Select Sort Option</option>
          <option value="name">Book Name</option>
          <option value="author">Author Name</option>
          <option value="price">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
